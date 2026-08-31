// e2e 용 최소 카탈로그. 예전에는 번들에 실려 배포되던 FALLBACK_MODELS(580개)를
// 테스트가 대신 썼다. 그건 API 가 죽으면 사용자에게 낡은 데이터를 보여주는 물건이라
// 걷어냈고, 테스트에 필요한 만큼만 여기에 둔다.
export const MODELS = [
  {
    id: 'gpt-4o', provider_id: 'openai', provider_name: 'OpenAI', name: 'GPT-4o',
    tier: 'Frontier', is_open_weight: false, license_type: 'Proprietary',
    parameter_count_b: 0, architecture: 'Dense', context_window: 128000, max_output_tokens: 16384,
    modality: ['text', 'vision'], description: 'Flagship multimodal model with vision and audio.',
    official_url: 'https://example.test/gpt-4o', source_docs_url: 'https://example.test/gpt-4o/docs',
    api_pricing: { input_price_per_1m: 2.5, output_price_per_1m: 10, currency: 'USD' },
    quota: {}, benchmarks: { arena_elo: 1340, mmlu_pro: 74.7, gpqa: 53.6, swe_bench: 33.2 },
    is_verified: true, litellm_id: 'gpt-4o', supports_reasoning: false, supports_web_search: true,
    is_deprecated: false, is_new: false, hardware_requirements: {},
  },
  {
    id: 'gpt-4o-mini', provider_id: 'openai', provider_name: 'OpenAI', name: 'GPT-4o mini',
    tier: 'Mid', is_open_weight: false, license_type: 'Proprietary',
    parameter_count_b: 0, architecture: 'Dense', context_window: 128000, max_output_tokens: 16384,
    modality: ['text', 'vision'], description: 'Small, fast and inexpensive multimodal model.',
    official_url: 'https://example.test/gpt-4o-mini', source_docs_url: 'https://example.test/gpt-4o-mini/docs',
    api_pricing: { input_price_per_1m: 0.15, output_price_per_1m: 0.6, currency: 'USD' },
    quota: {}, benchmarks: { arena_elo: 1273, mmlu_pro: 63.1, gpqa: 40.2, swe_bench: 16.8 },
    is_verified: true, litellm_id: 'gpt-4o-mini', supports_reasoning: false, supports_web_search: false,
    is_deprecated: false, is_new: true, hardware_requirements: {},
  },
  {
    id: 'claude-sonnet-4-5', provider_id: 'anthropic', provider_name: 'Anthropic', name: 'Claude Sonnet 4.5',
    tier: 'Frontier', is_open_weight: false, license_type: 'Proprietary',
    parameter_count_b: 0, architecture: 'Dense', context_window: 200000, max_output_tokens: 64000,
    modality: ['text', 'vision'], description: 'Strong coding and agentic tool use.',
    official_url: 'https://example.test/claude', source_docs_url: 'https://example.test/claude/docs',
    api_pricing: { input_price_per_1m: 3, output_price_per_1m: 15, currency: 'USD' },
    quota: {}, benchmarks: { arena_elo: 1371, mmlu_pro: 78.4, gpqa: 62.1, swe_bench: 49.0 },
    is_verified: true, litellm_id: 'claude-sonnet-4-5', supports_reasoning: true, supports_web_search: true,
    is_deprecated: false, is_new: false, hardware_requirements: {},
  },
  {
    id: 'llama-3-3-70b', provider_id: 'meta', provider_name: 'Meta', name: 'Llama 3.3 70B',
    tier: 'Mid', is_open_weight: true, license_type: 'Llama Community',
    parameter_count_b: 70, architecture: 'Dense', context_window: 128000, max_output_tokens: 8192,
    modality: ['text'], description: 'Open-weight model tuned for instruction following.',
    official_url: 'https://example.test/llama', source_docs_url: 'https://example.test/llama/docs',
    api_pricing: { input_price_per_1m: 0.59, output_price_per_1m: 0.79, currency: 'USD' },
    quota: {}, benchmarks: { arena_elo: 1257, mmlu_pro: 68.9, gpqa: 50.5, swe_bench: 26.0 },
    is_verified: true, litellm_id: 'llama-3.3-70b', supports_reasoning: false, supports_web_search: false,
    is_deprecated: false, is_new: false, hardware_requirements: { min_vram_gb: 40 },
  },
];

export const PROVIDERS = [
  { id: 'openai', name: 'OpenAI', website: 'https://example.test/openai', logo_url: '', description: 'OpenAI', official_docs_url: 'https://example.test/openai/docs' },
  { id: 'anthropic', name: 'Anthropic', website: 'https://example.test/anthropic', logo_url: '', description: 'Anthropic', official_docs_url: 'https://example.test/anthropic/docs' },
  { id: 'meta', name: 'Meta', website: 'https://example.test/meta', logo_url: '', description: 'Meta', official_docs_url: 'https://example.test/meta/docs' },
];

/** 테스트가 실제 카드를 렌더한 상태에서 돌도록 카탈로그 API 를 픽스처로 채운다. */
export async function stubCatalog(page: import('@playwright/test').Page) {
  await page.route('**/api/v1/models*', (route) => route.fulfill({ json: MODELS }));
  await page.route('**/api/v1/providers*', (route) => route.fulfill({ json: PROVIDERS }));
}
