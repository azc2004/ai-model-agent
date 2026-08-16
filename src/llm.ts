import type { RecommendationRequest, ArchitectureRecommendationResult, ModelCombo, ModelComboItem, HostingOption, SpecBundle } from '../frontend/src/types';
import { calculateTCO } from './tco';
import { APIPricing, ModelSpec } from '../frontend/src/types';

const LANGUAGE_NAMES: Record<string, string> = {
  ko: "Korean (한국어)",
  en: "English",
  ja: "Japanese (日本語)",
  zh: "Chinese (中文)",
  es: "Spanish (Español)"
};

export async function llmChatWithFallback(system: string, user: string, env: any): Promise<string | null> {
  const providers = [
    { url: 'https://api.groq.com/openai/v1/chat/completions', key: env.GROQ_API_KEY, model: 'llama-3.3-70b-versatile' },
    { url: 'https://api.cerebras.ai/v1/chat/completions', key: env.CEREBRAS_API_KEY, model: 'llama3.1-8b' },
    { url: 'https://openrouter.ai/api/v1/chat/completions', key: env.OPENROUTER_API_KEY, model: 'meta-llama/llama-3.3-70b-instruct:free' },
  ];

  for (const p of providers) {
    if (!p.key) continue;
    try {
      const res = await fetch(p.url, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${p.key}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: p.model,
          messages: [{ role: 'system', content: system }, { role: 'user', content: user }],
          temperature: 0.2
        })
      });
      if (res.ok) {
        const data = await res.json() as any;
        return data.choices[0].message.content;
      }
    } catch (e) {
      console.error('LLM Fallback error:', e);
    }
  }
  return null;
}

export async function recommendArchitecture(req: RecommendationRequest, models: ModelSpec[], env: any): Promise<ArchitectureRecommendationResult> {
  let service_title = "고객 맞춤형 AI 서비스";
  if (req.service_type === 'code_agent') service_title = "자율 코딩 에이전트 서비스";
  else if (req.service_type === 'rag') service_title = "기업용 RAG 챗봇 시스템";
  else if (req.service_type === 'multimodal') service_title = "멀티모달 고객지원 CS 봇";
  else if (req.service_type === 'translation') service_title = "글로벌 실시간 번역 API";
  else if (req.service_type === 'content_creation') service_title = "마케팅 콘텐츠 생성 코파일럿";

  if (req.custom_prompt) {
    const p = req.custom_prompt.toLowerCase();
    if (['코드', '코딩', '리팩토링', '개발', '에이전트', 'python', 'javascript', 'bug'].some(w => p.includes(w))) req.requires_coding = true;
    if (['이미지', '비전', '캡처', '영수증', '사진', 'pdf 이미지', '음성', 'multimodal'].some(w => p.includes(w))) req.requires_multimodal = true;
    service_title = `맞춤 분석: "${req.custom_prompt.substring(0, 30)}"`;
  }

  const total_input_m = (req.monthly_requests * req.avg_input_tokens) / 1000000;
  const total_output_m = (req.monthly_requests * req.avg_output_tokens) / 1000000;

  const getModel = (id: string) => models.find(m => m.id === id) || models[0];
  const calcCost = (m: ModelSpec, input_m: number, output_m: number, ratio: number) => {
    if (!m.api_pricing) return 0;
    return ((input_m * m.api_pricing.input_price_per_1m) + (output_m * m.api_pricing.output_price_per_1m)) * ratio;
  };

  const p_router = getModel(req.requires_coding ? "claude-sonnet-4-5" : req.requires_multimodal ? "gemini-2-5-flash" : "claude-sonnet-4-5");
  const p_primary = getModel(req.requires_coding ? "deepseek-reasoner" : "gpt-4o");

  const best_items: ModelComboItem[] = [
    { role: "분류 및 사전 가공 (Router)", model_id: p_router.id, model_name: p_router.name, provider_name: p_router.provider_name, allocation_percent: 30, monthly_estimated_cost: calcCost(p_router, total_input_m, total_output_m, 0.3) },
    { role: "메인 워크로드 추론 (Primary Engine)", model_id: p_primary.id, model_name: p_primary.name, provider_name: p_primary.provider_name, allocation_percent: 70, monthly_estimated_cost: calcCost(p_primary, total_input_m, total_output_m, 0.7) }
  ];
  
  const best_combo: ModelCombo = {
    id: "best_quality", name: "Frontier Premier Quality (최고 품질)", tag: "Frontier Quality",
    description: "복잡한 추론과 정확도가 최우선인 미션 크리티컬 서비스용 최상위 플래그십 조합",
    items: best_items,
    total_monthly_cost: best_items.reduce((a, b) => a + b.monthly_estimated_cost, 0),
    avg_arena_elo: ((p_router.benchmarks?.arena_elo || 1300) * 0.3) + ((p_primary.benchmarks?.arena_elo || 1350) * 0.7),
    key_advantages: ["업계 최고 수준의 지능", "정교한 멀티스텝 추론"]
  };

  const s_router = getModel(req.requires_multimodal ? "gemini-2-5-flash-lite" : "groq-llama-3-3-70b");
  const s_primary = getModel(req.requires_multimodal ? "gemini-2-5-flash" : "deepseek-chat");

  const smart_items: ModelComboItem[] = [
    { role: "초고속 분류기 (Router)", model_id: s_router.id, model_name: s_router.name, provider_name: s_router.provider_name, allocation_percent: 40, monthly_estimated_cost: calcCost(s_router, total_input_m, total_output_m, 0.4) },
    { role: "고성능 답변 생성 (Main)", model_id: s_primary.id, model_name: s_primary.name, provider_name: s_primary.provider_name, allocation_percent: 60, monthly_estimated_cost: calcCost(s_primary, total_input_m, total_output_m, 0.6) }
  ];

  const smart_combo: ModelCombo = {
    id: "smart_balanced", name: "Smart Balanced (가성비 최적화)", tag: "Recommended",
    description: "비용과 응답속도를 최적화한 실용적인 조합",
    items: smart_items,
    total_monthly_cost: smart_items.reduce((a, b) => a + b.monthly_estimated_cost, 0),
    avg_arena_elo: ((s_router.benchmarks?.arena_elo || 1200) * 0.4) + ((s_primary.benchmarks?.arena_elo || 1300) * 0.6),
    key_advantages: ["뛰어난 가성비", "빠른 응답 속도"]
  };

  const hosting_options = [
    { provider: "Cloudflare Workers AI", category: "Edge Serverless", estimated_monthly_cost: 0, description: "엣지에서 매우 저렴하게 구동 가능", recommended_for: "글로벌 유저 타겟 서비스" },
    { provider: "AWS Bedrock", category: "Managed Cloud API", estimated_monthly_cost: smart_combo.total_monthly_cost, description: "엔터프라이즈 보안 및 관리형 API", recommended_for: "엔터프라이즈 데이터 보안 필수 서비스" }
  ];

  const target_lang_name = LANGUAGE_NAMES[req.language || "ko"] || "Korean (한국어)";
  const system = `You are a Senior AI System Architect. Output valid JSON in markdown \`\`\`json format.`;
  const user = `Generate an AI architecture for '${service_title}' (Lang: ${target_lang_name}).
Requirements: ${req.custom_prompt || 'Standard'}.
JSON Schema: { "markdown_spec": "Markdown string containing the architecture spec, tables, and Mermaid diagram", "spec_bundle": { "architecture_md": "...", "database_schema_md": "...", "tasks_md": "...", "deployment_md": "..." } }`;

  const res = await llmChatWithFallback(system, user, env);
  let parsed = { markdown_spec: "# Error generating spec", spec_bundle: { architecture_md: "", database_schema_md: "", tasks_md: "", deployment_md: "", agents_md: "" } };
  
  if (res) {
    try {
      const jsonStr = res.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(jsonStr);
    } catch (e) {
      console.error("Failed to parse LLM JSON:", e);
    }
  }

  return {
    service_name: service_title,
    monthly_requests: req.monthly_requests,
    total_monthly_input_tokens_m: total_input_m,
    total_monthly_output_tokens_m: total_output_m,
    combos: [smart_combo, best_combo],
    hosting_options,
    markdown_spec: parsed.markdown_spec,
    spec_bundle: parsed.spec_bundle as SpecBundle
  };
}

export async function generateMarkdown(params: any, env: any): Promise<any> {
  const system = "You are a Tech Blogger. Output JSON: { \"title\": \"...\", \"markdown_content\": \"...\", \"tags\": [\"...\"], \"estimated_reading_minutes\": 5 }";
  const user = `Write a blog post about AI Model comparison. Input data: ${JSON.stringify(params).substring(0, 500)}...`;
  
  const res = await llmChatWithFallback(system, user, env);
  let parsed = { title: "Generated Post", markdown_content: "Content generation failed.", tags: ["AI"], estimated_reading_minutes: 1 };
  if (res) {
    try {
      parsed = JSON.parse(res.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim());
    } catch(e) {}
  }
  return parsed;
}
