import type { RecommendationRequest, ArchitectureRecommendationResult, ModelCombo, ModelComboItem, HostingOption, SpecBundle } from '../frontend/src/types';
import { calculateTCO } from './tco';
import { APIPricing, ModelSpec } from '../frontend/src/types';

// 추천 결과의 고정 문구. req.language 는 이미 받고 있었지만 LLM 프롬프트에만 쓰였고
// 이 문자열들은 항상 한국어로 나갔다 — 영어 UI 안에 한국어 카드가 섞여 보이던 원인.
const T: Record<string, Record<string, string>> = {
  ko: {
    svcDefault: "고객 맞춤형 AI 서비스", svcCode: "자율 코딩 에이전트 서비스", svcRag: "기업용 RAG 챗봇 시스템",
    svcMulti: "멀티모달 고객지원 CS 봇", svcTrans: "글로벌 실시간 번역 API", svcContent: "마케팅 콘텐츠 생성 코파일럿",
    svcCustom: "맞춤 분석",
    roleRouterPre: "분류 및 사전 가공 (Router)", rolePrimary: "메인 워크로드 추론 (Primary Engine)",
    roleFastRouter: "초고속 분류기 (Router)", roleMain: "고성능 답변 생성 (Main)",
    bestName: "Frontier Premier Quality (최고 품질)",
    bestDesc: "복잡한 추론과 정확도가 최우선인 미션 크리티컬 서비스용 최상위 플래그십 조합",
    bestAdv1: "업계 최고 수준의 지능", bestAdv2: "정교한 멀티스텝 추론",
    smartName: "Smart Balanced (가성비 최적화)", smartDesc: "비용과 응답속도를 최적화한 실용적인 조합",
    smartAdv1: "뛰어난 가성비", smartAdv2: "빠른 응답 속도",
    cfDesc: "엣지에서 매우 저렴하게 구동 가능", cfFor: "글로벌 유저 타겟 서비스",
    awsDesc: "엔터프라이즈 보안 및 관리형 API", awsFor: "엔터프라이즈 데이터 보안 필수 서비스"
  },
  en: {
    svcDefault: "Custom AI service", svcCode: "Autonomous coding agent", svcRag: "Enterprise RAG chatbot",
    svcMulti: "Multimodal customer support bot", svcTrans: "Global real-time translation API", svcContent: "Marketing content copilot",
    svcCustom: "Custom analysis",
    roleRouterPre: "Classification & preprocessing (router)", rolePrimary: "Main workload inference (primary engine)",
    roleFastRouter: "High-speed classifier (router)", roleMain: "High-quality generation (main)",
    bestName: "Frontier Premier Quality",
    bestDesc: "Top flagship combination for mission-critical services where complex reasoning and accuracy come first",
    bestAdv1: "Best-in-class intelligence", bestAdv2: "Precise multi-step reasoning",
    smartName: "Smart Balanced", smartDesc: "A practical combination tuned for cost and response speed",
    smartAdv1: "Excellent value", smartAdv2: "Fast responses",
    cfDesc: "Runs very cheaply at the edge", cfFor: "Services targeting a global audience",
    awsDesc: "Enterprise security with a managed API", awsFor: "Services with strict enterprise data-security needs"
  },
  ja: {
    svcDefault: "カスタムAIサービス", svcCode: "自律コーディングエージェント", svcRag: "企業向けRAGチャットボット",
    svcMulti: "マルチモーダル顧客サポートボット", svcTrans: "グローバルリアルタイム翻訳API", svcContent: "マーケティングコンテンツ・コパイロット",
    svcCustom: "カスタム分析",
    roleRouterPre: "分類・前処理 (ルーター)", rolePrimary: "メインワークロード推論 (プライマリエンジン)",
    roleFastRouter: "高速分類器 (ルーター)", roleMain: "高品質生成 (メイン)",
    bestName: "Frontier Premier Quality (最高品質)",
    bestDesc: "複雑な推論と正確性が最優先のミッションクリティカルなサービス向けの最上位構成",
    bestAdv1: "業界最高水準の知能", bestAdv2: "精緻なマルチステップ推論",
    smartName: "Smart Balanced (コスパ最適化)", smartDesc: "コストと応答速度を最適化した実用的な構成",
    smartAdv1: "優れたコストパフォーマンス", smartAdv2: "高速な応答",
    cfDesc: "エッジで非常に安価に稼働可能", cfFor: "グローバルユーザー向けサービス",
    awsDesc: "エンタープライズセキュリティとマネージドAPI", awsFor: "データセキュリティ要件が厳しいサービス"
  },
  zh: {
    svcDefault: "定制 AI 服务", svcCode: "自主编码智能体", svcRag: "企业内部 RAG 聊天机器人",
    svcMulti: "多模态客服机器人", svcTrans: "全球实时翻译 API", svcContent: "营销内容副驾驶",
    svcCustom: "定制分析",
    roleRouterPre: "分类与预处理（路由器）", rolePrimary: "主工作负载推理（主引擎）",
    roleFastRouter: "高速分类器（路由器）", roleMain: "高质量生成（主）",
    bestName: "Frontier Premier Quality (最高品质)",
    bestDesc: "面向以复杂推理与准确性为先的关键业务的顶级旗舰组合",
    bestAdv1: "业界顶尖智能", bestAdv2: "精确的多步推理",
    smartName: "Smart Balanced (性价比优化)", smartDesc: "针对成本与响应速度优化的实用组合",
    smartAdv1: "出色的性价比", smartAdv2: "快速响应",
    cfDesc: "可在边缘以极低成本运行", cfFor: "面向全球用户的服务",
    awsDesc: "企业级安全与托管 API", awsFor: "对数据安全要求严格的企业服务"
  },
  es: {
    svcDefault: "Servicio de IA personalizado", svcCode: "Agente de programación autónomo", svcRag: "Chatbot RAG empresarial",
    svcMulti: "Bot de soporte multimodal", svcTrans: "API de traducción global en tiempo real", svcContent: "Copiloto de contenido de marketing",
    svcCustom: "Análisis personalizado",
    roleRouterPre: "Clasificación y preprocesamiento (router)", rolePrimary: "Inferencia de carga principal (motor primario)",
    roleFastRouter: "Clasificador de alta velocidad (router)", roleMain: "Generación de alta calidad (principal)",
    bestName: "Frontier Premier Quality",
    bestDesc: "Combinación insignia para servicios críticos donde el razonamiento complejo y la precisión son prioritarios",
    bestAdv1: "Inteligencia de primer nivel", bestAdv2: "Razonamiento preciso de varios pasos",
    smartName: "Smart Balanced", smartDesc: "Combinación práctica optimizada para coste y velocidad de respuesta",
    smartAdv1: "Excelente relación calidad-precio", smartAdv2: "Respuestas rápidas",
    cfDesc: "Funciona de forma muy económica en el edge", cfFor: "Servicios dirigidos a usuarios globales",
    awsDesc: "Seguridad empresarial con API gestionada", awsFor: "Servicios con requisitos estrictos de seguridad de datos"
  },
  de: {
    svcDefault: "Individueller KI-Dienst", svcCode: "Autonomer Coding-Agent", svcRag: "Unternehmens-RAG-Chatbot",
    svcMulti: "Multimodaler Kundensupport-Bot", svcTrans: "Globale Echtzeit-Übersetzungs-API", svcContent: "Marketing-Content-Copilot",
    svcCustom: "Individuelle Analyse",
    roleRouterPre: "Klassifizierung & Vorverarbeitung (Router)", rolePrimary: "Haupt-Workload-Inferenz (Primär-Engine)",
    roleFastRouter: "Hochgeschwindigkeits-Klassifizierer (Router)", roleMain: "Hochwertige Generierung (Haupt)",
    bestName: "Frontier Premier Quality",
    bestDesc: "Top-Kombination für unternehmenskritische Dienste, bei denen komplexes Reasoning und Genauigkeit Vorrang haben",
    bestAdv1: "Führende Intelligenz", bestAdv2: "Präzises mehrstufiges Reasoning",
    smartName: "Smart Balanced", smartDesc: "Praktische Kombination, optimiert für Kosten und Antwortgeschwindigkeit",
    smartAdv1: "Hervorragendes Preis-Leistungs-Verhältnis", smartAdv2: "Schnelle Antworten",
    cfDesc: "Läuft am Edge sehr kostengünstig", cfFor: "Dienste mit globaler Nutzerbasis",
    awsDesc: "Unternehmenssicherheit mit verwalteter API", awsFor: "Dienste mit strengen Anforderungen an die Datensicherheit"
  },
  fr: {
    svcDefault: "Service IA sur mesure", svcCode: "Agent de codage autonome", svcRag: "Chatbot RAG d’entreprise",
    svcMulti: "Bot de support client multimodal", svcTrans: "API de traduction mondiale en temps réel", svcContent: "Copilote de contenu marketing",
    svcCustom: "Analyse sur mesure",
    roleRouterPre: "Classification et prétraitement (routeur)", rolePrimary: "Inférence de la charge principale (moteur principal)",
    roleFastRouter: "Classifieur haute vitesse (routeur)", roleMain: "Génération de haute qualité (principal)",
    bestName: "Frontier Premier Quality",
    bestDesc: "Combinaison phare pour les services critiques où le raisonnement complexe et la précision priment",
    bestAdv1: "Intelligence de premier plan", bestAdv2: "Raisonnement multi-étapes précis",
    smartName: "Smart Balanced", smartDesc: "Combinaison pratique optimisée pour le coût et la vitesse de réponse",
    smartAdv1: "Excellent rapport qualité-prix", smartAdv2: "Réponses rapides",
    cfDesc: "Fonctionne à très faible coût en edge", cfFor: "Services destinés à un public mondial",
    awsDesc: "Sécurité d’entreprise avec API managée", awsFor: "Services aux exigences strictes de sécurité des données"
  }
};

const LANGUAGE_NAMES: Record<string, string> = {
  ko: "Korean (한국어)",
  en: "English",
  ja: "Japanese (日本語)",
  zh: "Chinese (中文)",
  es: "Spanish (Español)",
  de: "German (Deutsch)",
  fr: "French (Français)"
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
  const L = T[req.language || "ko"] || T.ko;
  let service_title = L.svcDefault;
  if (req.service_type === 'code_agent') service_title = L.svcCode;
  else if (req.service_type === 'rag') service_title = L.svcRag;
  else if (req.service_type === 'multimodal') service_title = L.svcMulti;
  else if (req.service_type === 'translation') service_title = L.svcTrans;
  else if (req.service_type === 'content_creation') service_title = L.svcContent;

  if (req.custom_prompt) {
    const p = req.custom_prompt.toLowerCase();
    // 의도 감지 키워드. 한국어만 있어 다른 언어로 입력하면 요구사항이 잡히지 않았다.
    if (['코드', '코딩', '리팩토링', '개발', '에이전트', 'python', 'javascript', 'bug', 'code', 'coding', 'refactor', 'debug', 'agent', 'developer',
         'コード', 'エージェント', '开发', '代码', '智能体', 'código', 'programación', 'agente', 'entwickl', 'codage', 'développ'].some(w => p.includes(w))) req.requires_coding = true;
    if (['이미지', '비전', '캡처', '영수증', '사진', 'pdf 이미지', '음성', 'multimodal', 'image', 'vision', 'screenshot', 'receipt', 'photo', 'audio', 'voice',
         '画像', '音声', '图像', '语音', 'imagen', 'visión', 'voz', 'bild', 'sprache', 'imagerie', 'voix'].some(w => p.includes(w))) req.requires_multimodal = true;
    service_title = `${L.svcCustom}: "${req.custom_prompt.substring(0, 30)}"`;
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
    { role: L.roleRouterPre, model_id: p_router.id, model_name: p_router.name, provider_name: p_router.provider_name, allocation_percent: 30, monthly_estimated_cost: calcCost(p_router, total_input_m, total_output_m, 0.3) },
    { role: L.rolePrimary, model_id: p_primary.id, model_name: p_primary.name, provider_name: p_primary.provider_name, allocation_percent: 70, monthly_estimated_cost: calcCost(p_primary, total_input_m, total_output_m, 0.7) }
  ];
  
  const best_combo: ModelCombo = {
    id: "best_quality", name: L.bestName, tag: "Frontier Quality",
    description: L.bestDesc,
    items: best_items,
    total_monthly_cost: best_items.reduce((a, b) => a + b.monthly_estimated_cost, 0),
    avg_arena_elo: ((p_router.benchmarks?.arena_elo || 1300) * 0.3) + ((p_primary.benchmarks?.arena_elo || 1350) * 0.7),
    key_advantages: [L.bestAdv1, L.bestAdv2]
  };

  const s_router = getModel(req.requires_multimodal ? "gemini-2-5-flash-lite" : "groq-llama-3-3-70b");
  const s_primary = getModel(req.requires_multimodal ? "gemini-2-5-flash" : "deepseek-chat");

  const smart_items: ModelComboItem[] = [
    { role: L.roleFastRouter, model_id: s_router.id, model_name: s_router.name, provider_name: s_router.provider_name, allocation_percent: 40, monthly_estimated_cost: calcCost(s_router, total_input_m, total_output_m, 0.4) },
    { role: L.roleMain, model_id: s_primary.id, model_name: s_primary.name, provider_name: s_primary.provider_name, allocation_percent: 60, monthly_estimated_cost: calcCost(s_primary, total_input_m, total_output_m, 0.6) }
  ];

  const smart_combo: ModelCombo = {
    id: "smart_balanced", name: L.smartName, tag: "Recommended",
    description: L.smartDesc,
    items: smart_items,
    total_monthly_cost: smart_items.reduce((a, b) => a + b.monthly_estimated_cost, 0),
    avg_arena_elo: ((s_router.benchmarks?.arena_elo || 1200) * 0.4) + ((s_primary.benchmarks?.arena_elo || 1300) * 0.6),
    key_advantages: [L.smartAdv1, L.smartAdv2]
  };

  const hosting_options = [
    { provider: "Cloudflare Workers AI", category: "Edge Serverless", estimated_monthly_cost: 0, description: L.cfDesc, recommended_for: L.cfFor },
    { provider: "AWS Bedrock", category: "Managed Cloud API", estimated_monthly_cost: smart_combo.total_monthly_cost, description: L.awsDesc, recommended_for: L.awsFor }
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
