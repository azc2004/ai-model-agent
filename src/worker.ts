import { PROVIDERS, GPU_SPECS, TRENDING_TEMPLATES } from './data';
import { calculateTCO } from './tco';
import { recommendArchitecture, generateMarkdown } from './llm';
export interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
}

// ─── 키워드 기반 렌즈 분류기 (백엔드 classify_article_lenses와 동일 로직) ──────
function classifyLenses(title: string, summary: string, sourceName: string, category: string): string[] {
  const combined = (title + ' ' + summary + ' ' + sourceName + ' ' + category).toLowerCase();
  const scores: Record<string, number> = { developer: 0, agent: 0, pm: 0, business: 0, researcher: 0 };

  // 1. developer
  const devKws = ['code', 'coding', 'developer', 'fine-tuning', 'vllm', 'sdk', 'python', 'cuda',
    'open-weights', 'github', 'refactoring', 'swe-bench', '파인튜닝', '개발자', '코드',
    'llama.cpp', 'huggingface', 'inference', 'deployment', 'docker', 'api endpoint', 'openai api', 'claude api'];
  for (const kw of devKws) if (combined.includes(kw)) scores.developer += 2;

  // 2. agent
  const agentKws = ['agentic', 'autonomous', 'multi-agent', 'langchain', 'llamaindex',
    'automation pipeline', '에이전트', '자율', '자동화 워크플로', 'tool call',
    'function call', 'computer use', 'autogen', 'crew ai', 'swarm', 'agent framework'];
  for (const kw of agentKws) if (combined.includes(kw)) scores.agent += 3;
  if (combined.includes('agent')) scores.agent += 1;
  if (combined.includes('workflow')) scores.agent += 1;

  // 3. pm (전문 복합어만)
  const pmKws = ['ux design', 'user experience', 'product manager', 'product roadmap',
    'onboarding flow', 'ui/ux', 'human-computer', 'interaction design', 'prototype',
    '기획자', '서비스 기획', '사용자 경험', '인터페이스 디자인', '프로토타입'];
  for (const kw of pmKws) if (combined.includes(kw)) scores.pm += 3;
  if (combined.includes('ui') && ['ux','interface','design','user'].filter(w => combined.includes(w)).length >= 2) scores.pm += 2;

  // 4. business
  const bizKws = ['tco', 'enterprise cost', 'business roi', 'security breach', 'iam policy',
    'market share', 'aws bedrock', 'on-premise', 'cloud cost', 'telco',
    '비용 절감', '엔터프라이즈', '보안 사고', '기업 도입', '연간 계약'];
  for (const kw of bizKws) if (combined.includes(kw)) scores.business += 2;
  if (combined.includes('enterprise')) scores.business += 1;
  if (combined.includes('cost') && ['cloud','gpu','api','model','tco'].some(k => combined.includes(k))) scores.business += 1;

  // 5. researcher
  const resKws = ['paper', 'arxiv', 'sota', 'benchmark', 'mcts', 'dataset', 'evaluation',
    '논문', '연구', '학계', '벤치마크', 'ablation', 'mmlu', 'gpqa', 'swe-bench'];
  for (const kw of resKws) if (combined.includes(kw)) scores.researcher += 3;

  // 출처 가중치
  if (combined.includes('arxiv') || combined.includes('hugging face')) scores.researcher += 5;
  if (combined.includes('openai') || combined.includes('anthropic') || combined.includes('deepmind')) scores.developer += 2;
  if (combined.includes('nvidia') && ['gpu','cuda','training','inference'].some(k => combined.includes(k))) scores.developer += 2;
  if (combined.includes('techcrunch') || combined.includes('venturebeat')) scores.business += 2;
  if (combined.includes('wired') || combined.includes('mit tech')) scores.researcher += 2;

  // 임계값 3 이상 + 최대 2개
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const selected = sorted.filter(([, s]) => s >= 3).slice(0, 2).map(([k]) => k);
  if (selected.length === 0) {
    const top = sorted[0];
    return top[1] > 0 ? [top[0]] : ['developer'];
  }
  return selected;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    
    if (url.pathname === '/api/v1/providers') {
      return new Response(JSON.stringify(PROVIDERS), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    if (url.pathname === '/api/v1/gpus') {
      return new Response(JSON.stringify(GPU_SPECS), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    if (url.pathname === '/api/v1/recommend/trending') {
      return new Response(JSON.stringify(TRENDING_TEMPLATES), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    if (url.pathname === '/api/v1/simulate/tco' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { results } = await env.DB.prepare('SELECT * FROM models').all();
        const models = results.map(r => ({ ...r, api_pricing: JSON.parse(r.api_pricing || '{}'), quota: JSON.parse(r.quota || '{}'), benchmarks: JSON.parse(r.benchmarks || '{}'), hardware_requirements: JSON.parse(r.hardware_requirements || '[]'), modality: JSON.parse(r.modality || '[]') }));
        const tco = calculateTCO(body, models);
        return new Response(JSON.stringify(tco), {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } });
      }
    }

    if (url.pathname === '/api/v1/recommend/architecture' && request.method === 'POST') {
      try {
        const body = await request.json();
        const { results } = await env.DB.prepare('SELECT * FROM models').all();
        const models = results.map(r => ({ ...r, api_pricing: JSON.parse(r.api_pricing || '{}'), quota: JSON.parse(r.quota || '{}'), benchmarks: JSON.parse(r.benchmarks || '{}'), hardware_requirements: JSON.parse(r.hardware_requirements || '[]'), modality: JSON.parse(r.modality || '[]') }));
        const rec = await recommendArchitecture(body, models, env);
        return new Response(JSON.stringify(rec), {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } });
      }
    }

    if (url.pathname === '/api/v1/generate/markdown' && request.method === 'POST') {
      try {
        const body = await request.json();
        const md = await generateMarkdown(body, env);
        return new Response(JSON.stringify(md), {
          headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
        });
      } catch (err: any) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } });
      }
    }

    if (request.method === 'OPTIONS') {
      return new Response(null, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }

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
          let takeaways: any[] = [];
          let sources: any[] = [];
          let tags = ["#AITrend", "#DeepSeek", "#Anthropic", "#SOTA"];

          try { takeaways = JSON.parse(n.key_takeaways || '[]'); } catch {}
          try { sources = JSON.parse(n.original_sources || '[]'); } catch {}
          if (n.tags) { try { tags = JSON.parse(n.tags); } catch {} }

          // ✅ 항상 실시간 재분류 (DB 저장 렌즈 무시 → 탭 중복 방지)
          const summaryText = (Array.isArray(takeaways) ? takeaways.join(' ') : (typeof takeaways === 'string' ? takeaways : '')) || n.executive_summary || '';
          const matched_lenses = classifyLenses(
            n.title || '',
            summaryText,
            sources[0]?.title || n.source_name || '',
            n.report_type || ''
          );

          const is_synthesized = Boolean(
            n.is_synthesized === 1 ||
            n.is_synthesized === true ||
            n.report_type?.includes('융합') ||
            n.title?.includes('다중 소스 융합') ||
            n.title?.includes('다중소스') ||
            (n.id && String(n.id).includes('synth')) ||
            (sources && sources.length >= 2)
          );

          if (is_synthesized && !matched_lenses.includes('synthesized')) {
            matched_lenses.push('synthesized');
          }

          let multi_sources = undefined;
          if (sources && sources.length >= 2) {
            multi_sources = sources.map((s: any) => ({ name: s.title || s.name || "AI Source", url: s.url || "" }));
          } else if (n.multi_sources) {
            try { multi_sources = JSON.parse(n.multi_sources); } catch {}
          }

          return {
            id: n.id,
            title: n.title,
            source_name: sources[0]?.title || (is_synthesized ? "다중 미디어 교차 검증단" : "AI Engineering Lab"),
            source_url: sources[0]?.url || "https://ai-compass.org",
            published_at: n.created_at || new Date().toISOString(),
            category: is_synthesized ? "🔮 다중 소스 융합 블로그" : (n.report_type || "심층 리포트"),
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
            matched_lenses,
            is_synthesized,
            multi_sources,
            primary_topic: n.primary_topic || (is_synthesized ? "Multi-Source Synthesis" : undefined)
          };
        });

        if (targetLens && targetLens !== 'all' && targetLens !== 'new') {
          if (targetLens === 'synthesized') {
            articles = articles.filter(a => a.is_synthesized || a.matched_lenses.includes('synthesized') || a.category?.includes('융합'));
          } else {
            articles = articles.filter(a => a.matched_lenses.includes(targetLens));
          }
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

        let takeaways: any[] = [];
        let sources: any[] = [];
        let tags = ["#AITrend", "#DeepSeek", "#Anthropic", "#SOTA"];

        try { takeaways = JSON.parse(n.key_takeaways || '[]'); } catch {}
        try { sources = JSON.parse(n.original_sources || '[]'); } catch {}
        if (n.tags) { try { tags = JSON.parse(n.tags); } catch {} }

        // ✅ 항상 실시간 재분류 (DB 저장 렌즈 무시 → 탭 중복 방지)
        const summaryText2 = (Array.isArray(takeaways) ? takeaways.join(' ') : (typeof takeaways === 'string' ? takeaways : '')) || n.executive_summary || '';
        const matched_lenses = classifyLenses(
          n.title || '',
          summaryText2,
          sources[0]?.title || n.source_name || '',
          n.report_type || ''
        );

        const is_synthesized = Boolean(
          n.is_synthesized === 1 ||
          n.is_synthesized === true ||
          n.report_type?.includes('융합') ||
          n.title?.includes('다중 소스 융합') ||
          n.title?.includes('다중소스') ||
          (n.id && String(n.id).includes('synth')) ||
          (sources && sources.length >= 2)
        );

        if (is_synthesized && !matched_lenses.includes('synthesized')) {
          matched_lenses.push('synthesized');
        }

        let multi_sources = undefined;
        if (sources && sources.length >= 2) {
          multi_sources = sources.map((s: any) => ({ name: s.title || s.name || "AI Source", url: s.url || "" }));
        } else if (n.multi_sources) {
          try { multi_sources = JSON.parse(n.multi_sources); } catch {}
        }

        const article = {
          id: n.id,
          title: n.title,
          source_name: sources[0]?.title || (is_synthesized ? "다중 미디어 교차 검증단" : "AI Engineering Lab"),
          source_url: sources[0]?.url || "https://ai-compass.org",
          published_at: n.created_at || new Date().toISOString(),
          category: is_synthesized ? "🔮 다중 소스 융합 블로그" : (n.report_type || "심층 리포트"),
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
          matched_lenses,
          is_synthesized,
          multi_sources,
          primary_topic: n.primary_topic || (is_synthesized ? "Multi-Source Synthesis" : undefined)
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
