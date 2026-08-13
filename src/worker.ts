export interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // D1 Edge API Routes - Models
    if (url.pathname === '/api/v1/models') {
      try {
        const { results } = await env.DB.prepare(`
          SELECT * FROM models ORDER BY is_verified DESC, name ASC
        `).all();

        const models = results.map((m: any) => ({
          ...m,
          is_open_weight: Boolean(m.is_open_weight),
          is_verified: Boolean(m.is_verified),
          supports_reasoning: Boolean(m.supports_reasoning),
          supports_web_search: Boolean(m.supports_web_search),
          is_deprecated: Boolean(m.is_deprecated),
          is_new: Boolean(m.is_new),
          modality: typeof m.modality === 'string' ? JSON.parse(m.modality || '[]') : m.modality,
          api_pricing: typeof m.api_pricing === 'string' ? JSON.parse(m.api_pricing || '{}') : m.api_pricing,
          quota: typeof m.quota === 'string' ? JSON.parse(m.quota || '{}') : m.quota,
          benchmarks: typeof m.benchmarks === 'string' ? JSON.parse(m.benchmarks || '{}') : m.benchmarks,
          hardware_requirements: typeof m.hardware_requirements === 'string' ? JSON.parse(m.hardware_requirements || '{}') : m.hardware_requirements,
        }));

        return new Response(JSON.stringify(models), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=60, s-maxage=300',
          },
        });
      } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }
    }

    if (url.pathname.startsWith('/api/v1/models/')) {
      const modelId = url.pathname.replace('/api/v1/models/', '');
      try {
        const m: any = await env.DB.prepare('SELECT * FROM models WHERE id = ?').bind(modelId).first();
        if (!m) {
          return new Response(JSON.stringify({ error: 'Model not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          });
        }
        const model = {
          ...m,
          is_open_weight: Boolean(m.is_open_weight),
          is_verified: Boolean(m.is_verified),
          supports_reasoning: Boolean(m.supports_reasoning),
          supports_web_search: Boolean(m.supports_web_search),
          is_deprecated: Boolean(m.is_deprecated),
          is_new: Boolean(m.is_new),
          modality: typeof m.modality === 'string' ? JSON.parse(m.modality || '[]') : m.modality,
          api_pricing: typeof m.api_pricing === 'string' ? JSON.parse(m.api_pricing || '{}') : m.api_pricing,
          quota: typeof m.quota === 'string' ? JSON.parse(m.quota || '{}') : m.quota,
          benchmarks: typeof m.benchmarks === 'string' ? JSON.parse(m.benchmarks || '{}') : m.benchmarks,
          hardware_requirements: typeof m.hardware_requirements === 'string' ? JSON.parse(m.hardware_requirements || '{}') : m.hardware_requirements,
        };

        return new Response(JSON.stringify(model), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=60',
          },
        });
      } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }
    }

    // D1 Edge API Routes - Trend News Pulse & Articles
    if (url.pathname === '/api/v1/news/pulse' || url.pathname.startsWith('/api/v1/news/pulse')) {
      try {
        const targetLens = url.searchParams.get('lens');
        const { results } = await env.DB.prepare('SELECT * FROM trend_news ORDER BY created_at DESC').all();

        let articles = results.map((n: any) => {
          let takeaways = [];
          let sources = [];
          let tags = ["#AITrend", "#DeepSeek", "#Anthropic", "#SOTA"];
          let matched_lenses = ["developer", "agent", "pm", "business", "researcher"];

          try { takeaways = JSON.parse(n.key_takeaways || '[]'); } catch {}
          try { sources = JSON.parse(n.original_sources || '[]'); } catch {}
          if (n.tags) { try { tags = JSON.parse(n.tags); } catch {} }
          if (n.matched_lenses) { try { matched_lenses = JSON.parse(n.matched_lenses); } catch {} }

          return {
            id: n.id,
            title: n.title,
            source_name: sources[0]?.title || "AI Engineering Lab",
            source_url: sources[0]?.url || "https://ai-compass.org",
            published_at: n.created_at || new Date().toISOString(),
            category: n.report_type || "심층 리포트",
            image_url: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
            summary_bullets: takeaways.length > 0 ? takeaways : [n.executive_summary],
            blog_summary: n.analytical_deep_dive,
            actionable_insight: {
              developer: "최신 AI 모델 아키텍처 수율을 적용하여 에이전트 시스템을 구축하세요.",
              pm: "유저 인터페이스에 AI 에이전트 추론 과정을 효과적으로 가시화하세요.",
              business: "고비용 상용 API를 오픈/경량 모델로 대체하여 TCO를 70% 절감하세요.",
              researcher: "멀티 슈타인 강화학습 및 차세대 MoE 라우팅 논문을 분석하세요."
            },
            impact_score: 98,
            tags,
            matched_lenses
          };
        });

        if (targetLens && targetLens !== 'all' && targetLens !== 'new') {
          articles = articles.filter(a => a.matched_lenses.includes(targetLens));
        }

        return new Response(JSON.stringify({
          articles,
          total_count: articles.length,
          last_updated: new Date().toISOString()
        }), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=60, s-maxage=300',
          },
        });
      } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }
    }

    if (url.pathname.startsWith('/api/v1/news/articles/')) {
      const articleId = url.pathname.replace('/api/v1/news/articles/', '');
      try {
        const n: any = await env.DB.prepare('SELECT * FROM trend_news WHERE id = ?').bind(articleId).first();
        if (!n) {
          return new Response(JSON.stringify({ error: 'Article not found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          });
        }

        let takeaways = [];
        let sources = [];
        let tags = ["#AITrend", "#DeepSeek", "#Anthropic", "#SOTA"];
        let matched_lenses = ["developer", "agent", "pm", "business", "researcher"];

        try { takeaways = JSON.parse(n.key_takeaways || '[]'); } catch {}
        try { sources = JSON.parse(n.original_sources || '[]'); } catch {}
        if (n.tags) { try { tags = JSON.parse(n.tags); } catch {} }
        if (n.matched_lenses) { try { matched_lenses = JSON.parse(n.matched_lenses); } catch {} }

        const article = {
          id: n.id,
          title: n.title,
          source_name: sources[0]?.title || "AI Engineering Lab",
          source_url: sources[0]?.url || "https://ai-compass.org",
          published_at: n.created_at || new Date().toISOString(),
          category: n.report_type || "심층 리포트",
          image_url: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
          summary_bullets: takeaways.length > 0 ? takeaways : [n.executive_summary],
          blog_summary: n.analytical_deep_dive,
          actionable_insight: {
            developer: "최신 AI 모델 아키텍처 수율을 적용하여 에이전트 시스템을 구축하세요.",
            pm: "유저 인터페이스에 AI 에이전트 추론 과정을 효과적으로 가시화하세요.",
            business: "고비용 상용 API를 오픈/경량 모델로 대체하여 TCO를 70% 절감하세요.",
            researcher: "멀티 슈타인 강화학습 및 차세대 MoE 라우팅 논문을 분석하세요."
          },
          impact_score: 98,
          tags,
          matched_lenses
        };

        return new Response(JSON.stringify(article), {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Cache-Control': 'public, max-age=60',
          },
        });
      } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), {
          status: 500,
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        });
      }
    }

    // Fallthrough to Static Assets (Frontend)
    return env.ASSETS.fetch(request);
  },
};
