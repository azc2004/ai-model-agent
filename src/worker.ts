export interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // D1 Edge API Routes
    if (url.pathname === '/api/v1/models') {
      try {
        const { results } = await env.DB.prepare(`
          SELECT * FROM models ORDER BY is_verified DESC, name ASC
        `).all();

        // Deserialize JSON text fields
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

    // Fallthrough to Static Assets (Frontend)
    return env.ASSETS.fetch(request);
  },
};
