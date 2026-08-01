import React, { useState, useEffect } from 'react';
import { 
  Sparkles, Code, Database, Headset, Globe, Cpu, Check, Copy, Download, 
  Server, Zap, CheckCircle2, ChevronRight, Layers, FileText, X, Clock, Terminal, Loader2
} from 'lucide-react';
import type { RecommendationRequest, ArchitectureRecommendationResult, TrendingTemplate } from '../types';
import { API_BASE_URL } from '../api';
import { useLanguage } from '../context/LanguageContext';

const INITIAL_SAMPLE_RESULT: ArchitectureRecommendationResult = {
  service_name: "자율 코딩 에이전트 서비스 (미리 준비된 샘플)",
  monthly_requests: 100000,
  total_monthly_input_tokens_m: 200.0,
  total_monthly_output_tokens_m: 100.0,
  combos: [
    {
      id: "smart_balanced",
      name: "Smart Orchestrated Router (스마트 최적 추천)",
      tag: "RECOMMENDED",
      description: "Groq/Llama-3.3 70B 분류기 + DeepSeek-R1 메인 엔진 조합으로 비용을 60% 절감하면서도 플래그십 95% 성능 구현",
      items: [
        {
          role: "Router & Classifier (70% traffic)",
          model_id: "groq-llama-3.3-70b",
          model_name: "Llama 3.3 70B (Groq LPU)",
          provider_name: "Groq",
          allocation_percent: 70.0,
          monthly_estimated_cost: 82.60
        },
        {
          role: "Primary Reasoning Engine (30% traffic)",
          model_id: "deepseek-r1",
          model_name: "DeepSeek R1 (Reasoning)",
          provider_name: "DeepSeek",
          allocation_percent: 30.0,
          monthly_estimated_cost: 65.70
        }
      ],
      total_monthly_cost: 148.30,
      avg_arena_elo: 1358,
      key_advantages: ["API 비용 60% 절감", "평균 응답 속도 P95 < 400ms", "Circuit Breaker 자동 장애 복구"]
    },
    {
      id: "best_quality",
      name: "Frontier Premier Quality (최고 품질)",
      tag: "FRONTIER",
      description: "복잡한 추론과 정확도가 최우선인 미션 크리티컬 서비스용 최상위 플래그십 조합",
      items: [
        {
          role: "Frontier Single Engine (100% traffic)",
          model_id: "claude-3-5-sonnet",
          model_name: "Claude 3.5 Sonnet",
          provider_name: "Anthropic",
          allocation_percent: 100.0,
          monthly_estimated_cost: 2100.00
        }
      ],
      total_monthly_cost: 2100.00,
      avg_arena_elo: 1365,
      key_advantages: ["최상위 추론/코딩 성능", "단일 API로 단순한 구조", "최고 수치 Elo 랭킹"]
    },
    {
      id: "ultra_budget",
      name: "Open-Weight Ultra Budget (극가성비)",
      tag: "BUDGET",
      description: "오픈웨이트 모델 및 저비용 서버리스 API 위주의 구성으로 대량 쿼리 처리 시 극단의 비용 절감 달성",
      items: [
        {
          role: "Open-Weight Engine (100% traffic)",
          model_id: "deepseek-v3",
          model_name: "DeepSeek V3",
          provider_name: "DeepSeek",
          allocation_percent: 100.0,
          monthly_estimated_cost: 41.40
        }
      ],
      total_monthly_cost: 41.40,
      avg_arena_elo: 1320,
      key_advantages: ["극단의 API 비용 절감", "대용량 처리 최적화", "Open-Weight 유연성"]
    }
  ],
  hosting_options: [
    {
      provider: "Vercel + Render.com (Serverless & PaaS)",
      category: "Serverless PaaS",
      estimated_monthly_cost: 20.0,
      description: "프론트엔드는 Vercel CDN, 백엔드는 Render.com Python PaaS에 자동 배포. 100% 무료 시작 가능.",
      recommended_for: "초기 스타트업, MVP 검증 및 빠른 프로덕션 배포"
    },
    {
      provider: "AWS ECS Fargate + Amazon Bedrock",
      category: "Cloud Native (Enterprise)",
      estimated_monthly_cost: 80.0,
      description: "보안 및 프라이빗 VPC 내에 백엔드 컨테이너 구축. 엔터프라이즈 IAM 권한 및 오토스케일링 적용.",
      recommended_for: "보안 규정이 엄격한 기업 및 대규모 프로덕션"
    },
    {
      provider: "RunPod / Modal GPU Instance (Self-Hosted)",
      category: "GPU Serverless / Self-Hosted",
      estimated_monthly_cost: 120.0,
      description: "Llama/Qwen 등 오픈웨이트 모델을 독립 GPU(NVIDIA A10G/L40S) 서버리스로 직접 서빙.",
      recommended_for: "자체 데이터 보안 및 오픈웨이트 직접 파인튜닝 서비스"
    }
  ],
  markdown_spec: `# 🚀 자율 코딩 에이전트 서비스 AI 시스템 개발 명세서 (Sample)\n\n## 1. Executive Summary\n본 아키텍처는 월 100,000건의 자율 코딩 요구사항을 처리하기 위한 최적의 2-Tier 라우터 구조입니다.\n`,
  spec_bundle: {
    agents_md: `# 🤖 [AGENTS.md] AI Coding Agent Directive & Execution Rules\n\n> **Target Agent**: Cursor IDE, Claude Code, GitHub Copilot Workspace, Devin\n> **Service**: 자율 코딩 에이전트 서비스 (CODE_AGENT)\n\n---\n\n## 1. 📌 Primary Directives & Architecture Pattern\n- **Routing Pattern**: Smart 2-Tier Multi-Model Routing (Llama 3.3 70B (Groq LPU) + DeepSeek R1 (Reasoning))\n- **Circuit Breaker**: Implement automatic fallback to secondary model on timeout (>15s) or HTTP 5xx.\n- **Async Non-Blocking**: All I/O operations MUST use \`async/await\` with \`httpx.AsyncClient\`.\n\n## 2. 🛡️ Coding Guidelines & Safety Rules\n1. **No Superfluous Dependencies**: Use standard library or \`fastapi\`, \`httpx\`, \`pydantic\`, \`python-dotenv\`.\n2. **Type Hinting**: All functions MUST have PEP 484 type annotations and Google-style docstrings.\n3. **Guardrails**: Validate input prompts for length (<500 chars) and sanitization before calling LLM APIs.\n4. **Environment Variables**: Load secrets exclusively via \`.env\` (Never hardcode API keys).\n`,
    architecture_md: `# 🏗️ [ARCHITECTURE.md] System Design & Flow Specifications\n\n> **System**: 자율 코딩 에이전트 서비스\n> **Target SLA**: Latency P95 < 400ms (Simple) / < 2.5s (Complex), Availability 99.9%\n\n---\n\n## 1. Sequence Diagram (Request Flow)\n\n\`\`\`mermaid\nsequenceDiagram\n    autonumber\n    actor Client as 👤 Client / Frontend\n    participant GW as 🌐 API Gateway (FastAPI)\n    participant Router as ⚡ Router (Groq LPU)\n    participant Primary as 🧠 Primary (DeepSeek R1)\n    participant Fallback as 🛡️ Fallback Backup\n\n    Client->>GW: POST /api/v1/generate\n    GW->>Router: Classify Query Complexity (Simple vs Complex)\n    alt Simple Query (70% traffic)\n        Router-->>GW: Direct Fast Response\n    else Complex Query (30% traffic)\n        GW->>Primary: Execute Reasoning Inference\n        alt Primary Success\n            Primary-->>GW: High Quality Result\n        else Primary Timeout / Failure\n            GW->>Fallback: Route to Backup Engine\n            Fallback-->>GW: Fallback Result\n        end\n    end\n    GW-->>Client: 200 OK (Response)\n\`\`\`\n`,
    database_schema_md: `# 🗄️ [DATABASE_SCHEMA.md] Database ERD & DDL Specification\n\n> **Target DB**: PostgreSQL / MariaDB + Redis Cache\n> **Domain**: 자율 코딩 에이전트 서비스 (CODE_AGENT)\n\n---\n\n## 1. Entity Relationship Diagram (Mermaid ERD)\n\n\`\`\`mermaid\nerDiagram\n    USERS ||--o{ REQUEST_LOGS : "executes"\n    USERS ||--o{ API_KEYS : "owns"\n    REQUEST_LOGS }|--|| MODEL_ROUTING_EVENTS : "triggers"\n\`\`\`\n\n## 2. PostgreSQL DDL Schemas\n\`\`\`sql\nCREATE TABLE users (id UUID PRIMARY KEY, email VARCHAR(255) UNIQUE);\nCREATE TABLE request_logs (id UUID PRIMARY KEY, latency_ms NUMERIC(8,2));\n\`\`\`\n`,
    tasks_md: `# 📝 [TASKS.md] Step-by-Step Agent Implementation Checklist\n\nExecute the following tasks sequentially. Check off items as they pass automated verification.\n\n---\n\n### Phase 1: Environment & Guardrails Setup\n- [ ] **Task 1.1**: Create \`requirements.txt\` with \`fastapi\`, \`uvicorn\`, \`httpx\`, \`pydantic\`, \`python-dotenv\`.\n- [ ] **Task 1.2**: Create \`.env.example\` with API keys template (\`GROQ_API_KEY\`, \`OPENAI_API_KEY\`, \`DEEPSEEK_API_KEY\`).\n- [ ] **Task 1.3**: Implement \`app/guardrails.py\` for Prompt Injection & Off-Topic regex filtering.\n\n### Phase 2: Multi-Model Router Pipeline Implementation\n- [ ] **Task 2.1**: Build \`GenerateRequest\` and \`GenerateResponse\` Pydantic schemas.\n- [ ] **Task 2.2**: Implement \`ProductionAIRouter\` class with Async HTTP Client and Circuit Breaker pattern.\n- [ ] **Task 2.3**: Wire primary model (\`DeepSeek R1\`) and router model (\`Groq LPU\`) fallback routes.\n\n### Phase 3: Verification & Deployment\n- [ ] **Task 3.1**: Write FastAPI \`/api/v1/generate\` POST endpoint in \`app/main.py\`.\n- [ ] **Task 3.2**: Create production \`Dockerfile\` and \`docker-compose.yml\`.\n- [ ] **Task 3.3**: Run \`pytest\` or curl verification script to ensure < 400ms latency on simple queries.\n`,
    deployment_md: `# 🐳 [DEPLOYMENT.md] Infrastructure & Deployment Specification\n\n> **Hosting**: Vercel + Render.com (Serverless & PaaS)\n> **Est. Monthly OpEx**: $20.00/mo\n\n---\n\n## 1. Environment Variables (\`.env.example\`)\n\`\`\`env\nPORT=8080\nENV=production\nGROQ_API_KEY=gsk_your_groq_api_key\nDEEPSEEK_API_KEY=sk_your_deepseek_api_key\nOPENAI_API_KEY=sk-proj-your_openai_api_key\n\`\`\`\n\n## 2. Production Dockerfile\n\`\`\`dockerfile\nFROM python:3.11-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nEXPOSE 8080\nCMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]\n\`\`\`\n`
  }
};

export const ArchitectureAdvisor: React.FC = () => {
  const { language, t } = useLanguage();
  const [trending, setTrending] = useState<TrendingTemplate[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>("code_agent");
  const [loading, setLoading] = useState<boolean>(false);
  const [result, setResult] = useState<ArchitectureRecommendationResult | null>(INITIAL_SAMPLE_RESULT);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Deep Research Thinking Progress State
  const [researchStep, setResearchStep] = useState<number>(0);
  const [researchProgress, setResearchProgress] = useState<number>(15);
  const [researchLogs, setResearchLogs] = useState<string[]>([]);

  // Form State
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [serviceType, setServiceType] = useState<string>('code_agent');
  const [monthlyRequests, setMonthlyRequests] = useState<number>(100000);
  const [avgInputTokens, setAvgInputTokens] = useState<number>(2000);
  const [avgOutputTokens, setAvgOutputTokens] = useState<number>(1000);
  const [requiresMultimodal, setRequiresMultimodal] = useState<boolean>(false);
  const [requiresCoding, setRequiresCoding] = useState<boolean>(true);

  // 1. Fetch Trending Templates (Do NOT auto-trigger loading fetch, load preset sample instead)
  useEffect(() => {
    fetch(`${API_BASE_URL}/recommend/trending`)
      .then(res => res.json())
      .then((data: TrendingTemplate[]) => {
        setTrending(data);
      })
      .catch(err => console.error("Failed to load trending templates", err));
  }, []);

  const applyTemplate = (tpl: TrendingTemplate) => {
    setSelectedTemplateId(tpl.id);
    setServiceType(tpl.request.service_type);
    setMonthlyRequests(tpl.request.monthly_requests);
    setAvgInputTokens(tpl.request.avg_input_tokens);
    setAvgOutputTokens(tpl.request.avg_output_tokens);
    setRequiresMultimodal(tpl.request.requires_multimodal);
    setRequiresCoding(tpl.request.requires_coding);
    fetchRecommendation(tpl.request);
  };

  const fetchRecommendation = (req?: RecommendationRequest) => {
    setLoading(true);
    setResearchStep(0);
    setResearchProgress(20);
    const initLogs = [
      `[00:00.1] > Initialized Agent pipeline: Language=${language.toUpperCase()}, Requests=${monthlyRequests.toLocaleString()}/mo`,
      `[00:00.3] > ${t.researchProgress.step1}`
    ];
    setResearchLogs(initLogs);

    // Step Progress Interval Timers
    const timer1 = setTimeout(() => {
      setResearchStep(1);
      setResearchProgress(45);
      setResearchLogs(prev => [...prev, `[00:00.7] > ${t.researchProgress.step2}`, `[00:00.9] > Scanning Arena Elo: GPT-4o, Claude 3.5 Sonnet, DeepSeek V3`]);
    }, 700);

    const timer2 = setTimeout(() => {
      setResearchStep(2);
      setResearchProgress(68);
      setResearchLogs(prev => [...prev, `[00:01.5] > ${t.researchProgress.step3}`, `[00:01.8] > Calculated Token Volume: In=${((monthlyRequests * avgInputTokens)/1e6).toFixed(1)}M / Out=${((monthlyRequests * avgOutputTokens)/1e6).toFixed(1)}M`]);
    }, 1500);

    const timer3 = setTimeout(() => {
      setResearchStep(3);
      setResearchProgress(88);
      setResearchLogs(prev => [...prev, `[00:02.4] > ${t.researchProgress.step4}`, `[00:02.7] > Evaluating Hosting: Vercel CDN + Render FastAPI vs Cloud GPU`]);
    }, 2400);

    const timer4 = setTimeout(() => {
      setResearchStep(4);
      setResearchProgress(98);
      setResearchLogs(prev => [...prev, `[00:03.2] > ${t.researchProgress.step5}`, `[00:03.5] > Calling Gemini 2.5 Flash for 7-Section Architecture & Mermaid Spec`]);
    }, 3200);

    const baseReq: RecommendationRequest = req || {
      service_type: serviceType,
      monthly_requests: monthlyRequests,
      avg_input_tokens: avgInputTokens,
      avg_output_tokens: avgOutputTokens,
      requires_multimodal: requiresMultimodal,
      requires_coding: requiresCoding,
      custom_prompt: customPrompt
    };

    const payload: RecommendationRequest = {
      ...baseReq,
      language: language
    };

    fetch(`${API_BASE_URL}/recommend/architecture`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then((data: ArchitectureRecommendationResult) => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
        setResearchProgress(100);
        setResearchStep(4);
        setResult(data);
        setLoading(false);
      })
      .catch(err => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
        console.error("Failed to fetch recommendation", err);
        setLoading(false);
      });
  };

  const getTemplateIcon = (iconName: string) => {
    switch (iconName) {
      case 'code': return <Code className="w-5 h-5 text-emerald-400" />;
      case 'database': return <Database className="w-5 h-5 text-blue-400" />;
      case 'headset': return <Headset className="w-5 h-5 text-purple-400" />;
      case 'globe': return <Globe className="w-5 h-5 text-amber-400" />;
      case 'sparkles': return <Sparkles className="w-5 h-5 text-pink-400" />;
      default: return <Cpu className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-900 border border-indigo-500/30 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" /> AI Architecture Advisor
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            맞춤형 AI 서비스 <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">모델 조합 & 호스팅 시뮤레이터</span>
          </h1>
          <p className="mt-3 text-slate-300 text-base leading-relaxed">
            구현하려는 서비스의 트래픽과 요구사항을 입력하세요. <strong className="text-white">최고 성능, 스마트 최적 라우팅, 극가성비</strong> 3가지 조합과 <strong className="text-indigo-300">개발명세서 Markdown(.md)</strong>을 원클릭으로 자동 생성해 드립니다.
          </p>
        </div>
      </div>

      {/* Top 5 Trending Templates Ranking */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400 text-sm font-black">🏆</span>
            요즘 가장 많이 구현하는 AI 서비스 TOP 5 (인기 랭킹)
          </h2>
          <span className="text-xs text-slate-400 font-medium">원클릭 시나리오 자동적용</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {trending.map((tpl) => {
            const isSelected = selectedTemplateId === tpl.id;
            return (
              <button
                key={tpl.id}
                onClick={() => applyTemplate(tpl)}
                className={`relative group text-left p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between shadow-md ${
                  isSelected
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-xl shadow-indigo-500/20 ring-2 ring-indigo-400'
                    : 'glass-card hover:border-indigo-400/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-white/20 text-white border border-white/30'
                        : tpl.rank === 1 ? 'bg-amber-500/20 text-amber-500 dark:text-amber-300 border border-amber-500/40' :
                          tpl.rank === 2 ? 'bg-slate-300/30 text-slate-800 dark:text-slate-200 border border-slate-400/40' :
                          'bg-amber-700/20 text-amber-600 dark:text-amber-400 border border-amber-700/40'
                    }`}>
                      #{tpl.rank}위
                    </span>
                    {getTemplateIcon(tpl.icon)}
                  </div>
                  <h3 className={`font-bold text-sm line-clamp-1 transition-colors ${
                    isSelected ? 'text-white' : 'text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300'
                  }`}>
                    {tpl.title.split('(')[0]}
                  </h3>
                  <p className={`text-xs mt-1.5 line-clamp-2 leading-relaxed font-medium ${
                    isSelected ? 'text-indigo-100' : 'text-slate-600 dark:text-slate-300'
                  }`}>
                    {tpl.description}
                  </p>
                </div>
                <div className={`mt-3 pt-2 border-t flex items-center justify-between text-xs font-bold ${
                  isSelected ? 'border-indigo-400/40 text-indigo-100' : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                }`}>
                  <span>{tpl.typical_monthly_requests.toLocaleString()} req/mo</span>
                  <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1 text-white' : 'text-slate-400'}`} />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Form & Result */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Customizer */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 p-6 space-y-6 shadow-md h-fit border border-slate-200 dark:border-slate-800 rounded-3xl">
          <div className="flex items-center gap-2 font-extrabold text-lg border-b border-slate-700/60 pb-3 text-slate-900 dark:text-white">
            <Layers className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
            서비스 요구사항 직접 입력
          </div>

          <div className="space-y-4 text-sm">
            {/* Natural Language Prompt Input */}
            <div>
              <label className="block font-bold mb-1.5 flex items-center justify-between text-slate-900 dark:text-slate-200">
                <span>💬 요구사항 자유 묘사 (자연어)</span>
                <span className="text-[11px] text-indigo-500 dark:text-indigo-400 font-bold">AI 자동 의도분석</span>
              </label>
              <textarea
                rows={3}
                placeholder="예: 사내 PDF 문서를 RAG로 검색하여 보안 답변을 주는 챗봇을 만들려고 합니다. 월 10만 건 정도 사용 예상됩니다."
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-900 dark:text-slate-100 font-medium focus:outline-none focus:border-indigo-500 transition-all resize-none shadow-inner"
              />
              {/* Sample Chips */}
              <div className="flex flex-wrap gap-1.5 mt-2">
                <button
                  type="button"
                  onClick={() => setCustomPrompt("사내 Confluence/PDF 문서를 RAG로 답변하는 보안 챗봇 구축")}
                  className="text-[10px] bg-indigo-50 dark:bg-slate-950 border border-indigo-200 dark:border-slate-800 hover:border-indigo-500 text-indigo-700 dark:text-slate-300 px-2 py-1 rounded-lg transition-colors text-left font-semibold"
                >
                  💡 사내 문서 RAG 챗봇
                </button>
                <button
                  type="button"
                  onClick={() => setCustomPrompt("Python/JS 버그 자동 수정 및 리팩토링 에이전트")}
                  className="text-[10px] bg-indigo-50 dark:bg-slate-950 border border-indigo-200 dark:border-slate-800 hover:border-indigo-500 text-indigo-700 dark:text-slate-300 px-2 py-1 rounded-lg transition-colors text-left font-semibold"
                >
                  💡 코드 수정 에이전트
                </button>
              </div>
            </div>
            {/* Service Type */}
            <div>
              <label className="block font-bold mb-1.5 text-slate-900 dark:text-slate-200">서비스 유형</label>
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2.5 text-slate-900 dark:text-white font-bold focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
              >
                <option value="code_agent">👨‍💻 자율 코딩 에이전트 (Code Agent)</option>
                <option value="rag">📚 기업용 사내 RAG 챗봇 (Enterprise RAG)</option>
                <option value="multimodal">🎧 멀티모달 고객지원 봇 (Multimodal CS)</option>
                <option value="translation">🌐 글로벌 실시간 번역 API (Translation)</option>
                <option value="content_creation">✍️ 마케팅 콘텐츠 코파일럿 (Content Copilot)</option>
              </select>
            </div>

            {/* Monthly Requests */}
            <div>
              <div className="flex justify-between font-bold mb-1.5 text-slate-900 dark:text-slate-200">
                <span>월간 예상 요청 수</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{monthlyRequests.toLocaleString()} 회</span>
              </div>
              <input
                type="range"
                min="10000"
                max="1000000"
                step="10000"
                value={monthlyRequests}
                onChange={(e) => setMonthlyRequests(Number(e.target.value))}
                className="w-full accent-indigo-600 rounded-lg cursor-pointer h-2"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-semibold mt-1">
                <span>1만</span>
                <span>50만</span>
                <span>100만 회</span>
              </div>
            </div>

            {/* Avg Tokens */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold mb-1 text-slate-900 dark:text-slate-200">평균 입력 토큰</label>
                <input
                  type="number"
                  value={avgInputTokens}
                  onChange={(e) => setAvgInputTokens(Number(e.target.value))}
                  className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-bold focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block font-bold mb-1 text-slate-900 dark:text-slate-200">평균 출력 토큰</label>
                <input
                  type="number"
                  value={avgOutputTokens}
                  onChange={(e) => setAvgOutputTokens(Number(e.target.value))}
                  className="w-full bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-bold focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Capability Checkboxes */}
            <div className="space-y-2 pt-2 border-t border-slate-700/60">
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-900 dark:text-slate-200 select-none">
                <input
                  type="checkbox"
                  checked={requiresMultimodal}
                  onChange={(e) => setRequiresMultimodal(e.target.checked)}
                  className="w-4 h-4 accent-indigo-600 rounded"
                />
                <span>🖼️ 멀티모달 (비전/이미지 이해) 필요</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-900 dark:text-slate-200 select-none">
                <input
                  type="checkbox"
                  checked={requiresCoding}
                  onChange={(e) => setRequiresCoding(e.target.checked)}
                  className="w-4 h-4 accent-indigo-600 rounded"
                />
                <span>⚡ 복잡 추론 & 코드 생성 필요</span>
              </label>
            </div>

            <button
              onClick={() => { setSelectedTemplateId(null); fetchRecommendation(); }}
              disabled={loading}
              className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black py-3.5 rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              {loading ? <Sparkles className="w-5 h-5 animate-spin" /> : <Zap className="w-5 h-5" />}
              추천 아키텍처 recalculate
            </button>
          </div>
        </div>

        {/* Right Results: Combos & Hosting & Markdown Spec */}
        <div className="lg:col-span-8 space-y-6">
          {loading ? (
            <div className="bg-white dark:bg-slate-900/90 p-6 sm:p-8 space-y-6 rounded-3xl border border-indigo-200 dark:border-indigo-500/40 shadow-2xl text-left relative overflow-hidden">
              {/* Top Progress Header */}
              <div className="flex items-center justify-between text-xs font-black text-slate-800 dark:text-slate-100">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 animate-spin" />
                  고객 요구사항을 바탕으로 최적의 LLM 조합과 OpEx 호스팅 인프라 비용을 산출하고 있습니다...
                </span>
                <span className="text-indigo-600 dark:text-indigo-400 font-black text-base">{researchProgress}% ANALYZING</span>
              </div>

              {/* Dynamic Animated Progress Bar */}
              <div className="w-full bg-slate-200 dark:bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-300 dark:border-slate-800 p-0.5 shadow-inner">
                <div 
                  className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-500 shadow-md shadow-indigo-500/50"
                  style={{ width: `${researchProgress}%` }}
                ></div>
              </div>

              {/* Step-by-Step Thinking Pipeline Indicators */}
              <div className="space-y-3 pt-2">
                {[
                  t.researchProgress.step1,
                  t.researchProgress.step2,
                  t.researchProgress.step3,
                  t.researchProgress.step4,
                  t.researchProgress.step5
                ].map((stepText, idx) => {
                  const isDone = idx < researchStep;
                  const isCurrent = idx === researchStep;
                  return (
                    <div 
                      key={idx}
                      className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all duration-300 ${
                        isDone 
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-500/40 text-emerald-950 dark:text-emerald-200 font-extrabold shadow-sm' 
                          : isCurrent 
                          ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-400 dark:border-indigo-500/50 text-indigo-950 dark:text-indigo-100 ring-2 ring-indigo-400/50 dark:ring-indigo-500/40 animate-pulse font-black shadow-md'
                          : 'bg-slate-50 dark:bg-slate-950/50 border-slate-200 dark:border-slate-800/60 text-slate-500 dark:text-slate-400 font-bold'
                      }`}
                    >
                      <div className="shrink-0">
                        {isDone ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                        ) : isCurrent ? (
                          <Loader2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400 animate-spin" />
                        ) : (
                          <Clock className="w-5 h-5 text-slate-400 dark:text-slate-600" />
                        )}
                      </div>
                      <span className="text-xs sm:text-sm font-black leading-snug">{stepText}</span>
                    </div>
                  );
                })}
              </div>

              {/* Live Terminal Output Console */}
              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-4 font-mono text-xs text-slate-300 space-y-1.5 shadow-inner max-h-40 overflow-y-auto">
                <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-slate-800/80 pb-1 mb-2">
                  <span className="flex items-center gap-1 font-bold text-slate-400">
                    <Terminal className="w-3.5 h-3.5 text-cyan-400" /> AGENT DEEP RESEARCH LOG STREAM
                  </span>
                  <span className="animate-pulse text-emerald-400">● LIVE</span>
                </div>
                {researchLogs.map((log, i) => (
                  <div key={i} className="leading-relaxed opacity-90">
                    <span className="text-cyan-400 font-semibold">{log.split('>')[0]}</span>
                    <span className="text-slate-200">&gt; {log.split('>')[1]}</span>
                  </div>
                ))}
                <div className="flex items-center gap-1 text-indigo-400 animate-pulse pt-1">
                  <span>_</span>
                </div>
              </div>
            </div>
          ) : result ? (
            <>
              {/* Service Summary Banner */}
              <div className="bg-white dark:bg-slate-900 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md border border-indigo-200 dark:border-indigo-500/40 rounded-3xl">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">{result.service_name}</h3>
                  <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-slate-700 dark:text-slate-200 mt-1">
                    <span>월간 요청: <strong className="text-indigo-600 dark:text-indigo-300 font-black">{result.monthly_requests.toLocaleString()}회</strong></span>
                    <span>•</span>
                    <span>월 토큰: <strong className="text-slate-900 dark:text-slate-100 font-black">in {result.total_monthly_input_tokens_m}M / out {result.total_monthly_output_tokens_m}M</strong></span>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold px-5 py-3 rounded-2xl transition-all flex items-center gap-2 text-sm shadow-lg shadow-indigo-600/30 whitespace-nowrap"
                >
                  <FileText className="w-4 h-4 text-white" />
                  Markdown 명세서 보기 & 다운로드
                </button>
              </div>

              {/* 3 Model Combos Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {result.combos.map((combo) => {
                  const isRecommended = combo.id === 'smart_balanced';
                  return (
                    <div
                      key={combo.id}
                      className={`relative rounded-3xl p-5 border flex flex-col justify-between transition-all shadow-xl ${
                        isRecommended
                          ? 'bg-slate-900 text-white border-indigo-500 shadow-indigo-500/20 ring-2 ring-indigo-500'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                      }`}
                    >
                      {isRecommended && (
                        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-[11px] px-3.5 py-1 rounded-full shadow-lg border border-amber-300 whitespace-nowrap">
                          ⭐ 추천 아키텍처 (Best ROI)
                        </span>
                      )}

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className={`text-xs font-black uppercase tracking-wider ${
                            isRecommended ? 'text-indigo-300' : 'text-slate-600 dark:text-slate-400'
                          }`}>
                            {combo.tag}
                          </span>
                          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 px-2 py-0.5 rounded-full">
                            {combo.avg_arena_elo.toFixed(0)} ELO
                          </span>
                        </div>
                        <h4 className={`text-base font-extrabold mb-2 ${
                          isRecommended ? 'text-white' : 'text-slate-900 dark:text-white'
                        }`}>
                          {combo.name}
                        </h4>
                        <p className={`text-xs mb-4 leading-relaxed line-clamp-3 font-medium ${
                          isRecommended ? 'text-slate-200' : 'text-slate-600 dark:text-slate-300'
                        }`}>
                          {combo.description}
                        </p>

                        {/* Cost Display */}
                        <div className={`rounded-2xl p-3.5 mb-4 border ${
                          isRecommended 
                            ? 'bg-slate-950/90 border-slate-700' 
                            : 'bg-slate-100 dark:bg-slate-950/80 border-slate-200 dark:border-slate-800'
                        }`}>
                          <span className={`text-[11px] font-bold ${
                            isRecommended ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'
                          }`}>
                            월간 예상 API 비용
                          </span>
                          <div className={`text-2xl font-black mt-0.5 ${
                            isRecommended ? 'text-amber-300' : 'text-slate-900 dark:text-white'
                          }`}>
                            ${combo.total_monthly_cost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            <span className="text-xs font-normal text-slate-400"> /월</span>
                          </div>
                        </div>

                        {/* Pipeline Items */}
                        <div className="space-y-2 mb-4">
                          <span className={`text-[11px] font-bold block ${
                            isRecommended ? 'text-slate-200' : 'text-slate-700 dark:text-slate-300'
                          }`}>
                            라우팅 파이프라인 구성:
                          </span>
                          {combo.items.map((item, idx) => (
                            <div 
                              key={idx} 
                              className={`rounded-xl p-2.5 text-xs border ${
                                isRecommended 
                                  ? 'bg-slate-950/80 border-slate-800 text-slate-100' 
                                  : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100'
                              }`}
                            >
                              <div className="flex justify-between font-bold">
                                <span className={isRecommended ? 'text-indigo-300' : 'text-indigo-600 dark:text-indigo-400'}>
                                  {item.role}
                                </span>
                                <span>{item.allocation_percent}%</span>
                              </div>
                              <div className={`text-[11px] mt-0.5 line-clamp-1 font-medium ${
                                isRecommended ? 'text-slate-300' : 'text-slate-600 dark:text-slate-400'
                              }`}>
                                {item.model_name} <span className="opacity-70">(${item.monthly_estimated_cost.toFixed(2)})</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Advantages */}
                      <div className={`space-y-1.5 pt-3 border-t text-xs font-semibold ${
                        isRecommended ? 'border-slate-800 text-slate-200' : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                      }`}>
                        {combo.key_advantages.map((adv, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                            <span className="line-clamp-1">{adv}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Hosting Recommendations */}
              <div className="glass-panel p-6 space-y-4 shadow-xl border border-slate-300 dark:border-slate-800 rounded-3xl">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Server className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
                    추천 호스팅 & 클라우드 인프라 (Hosting Options)
                  </h4>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">서버 인프라 가이드</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {result.hosting_options.map((h, idx) => (
                    <div key={idx} className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-4 space-y-2 shadow-sm">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-extrabold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
                          {h.category}
                        </span>
                        <span className="text-sm font-extrabold text-slate-900 dark:text-white">${h.estimated_monthly_cost}/월</span>
                      </div>
                      <h5 className="font-extrabold text-slate-900 dark:text-white text-sm">{h.provider}</h5>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-medium">{h.description}</p>
                      <div className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold pt-1">
                        👉 추천 대상: {h.recommended_for}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>

      {/* BigTech 5-in-1 Multi-Artifact Spec Modal */}
      {showModal && result && (
        <SpecBundleModal 
          result={result} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </div>
  );
};

// --- Sub-component: BigTech 5-in-1 Multi-Artifact Spec Modal ---
const SpecBundleModal: React.FC<{
  result: ArchitectureRecommendationResult;
  onClose: () => void;
}> = ({ result, onClose }) => {
  const [activeTab, setActiveTab] = useState<'agents' | 'arch' | 'db_schema' | 'tasks' | 'deploy' | 'full'>('agents');
  const [copied, setCopied] = useState<boolean>(false);

  const bundle = result.spec_bundle || {
    agents_md: `# AGENTS.md Directive\n${result.markdown_spec.slice(0, 500)}`,
    architecture_md: `# ARCHITECTURE.md Specification\n${result.markdown_spec}`,
    database_schema_md: `# DATABASE_SCHEMA.md Specification\n# DB ERD & DDL Schemas`,
    tasks_md: `# TASKS.md Checklist\n- [ ] Task 1: Environment Setup\n- [ ] Task 2: AI Pipeline Implementation`,
    deployment_md: `# DEPLOYMENT.md Specification\n# Docker & .env Setup`
  };

  const getActiveContent = () => {
    switch (activeTab) {
      case 'agents': return { filename: 'AGENTS.md', content: bundle.agents_md };
      case 'arch': return { filename: 'ARCHITECTURE.md', content: bundle.architecture_md };
      case 'db_schema': return { filename: 'DATABASE_SCHEMA.md', content: bundle.database_schema_md };
      case 'tasks': return { filename: 'TASKS.md', content: bundle.tasks_md };
      case 'deploy': return { filename: 'DEPLOYMENT.md', content: bundle.deployment_md };
      case 'full': return { filename: 'architecture_full_spec.md', content: result.markdown_spec };
      default: return { filename: 'AGENTS.md', content: bundle.agents_md };
    }
  };

  const activeData = getActiveContent();

  const handleCopy = () => {
    navigator.clipboard.writeText(activeData.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSingle = () => {
    const blob = new Blob([activeData.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = activeData.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAllBundle = () => {
    const files = [
      { name: 'AGENTS.md', content: bundle.agents_md },
      { name: 'ARCHITECTURE.md', content: bundle.architecture_md },
      { name: 'DATABASE_SCHEMA.md', content: bundle.database_schema_md },
      { name: 'TASKS.md', content: bundle.tasks_md },
      { name: 'DEPLOYMENT.md', content: bundle.deployment_md }
    ];

    files.forEach((f, i) => {
      setTimeout(() => {
        const blob = new Blob([f.content], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = f.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, i * 300);
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span>🚀 BigTech Standard AI Coding Agent Spec Package</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-0.5">
              실리콘밸리 AI 파이프라인 규격 5대 Markdown 설계 아티팩트 명세서
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 5-Artifact Tab Selector */}
        <div className="bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          {[
            { id: 'agents', name: '🤖 AGENTS.md', desc: 'AI 지시서 & 규칙' },
            { id: 'arch', name: '🏗️ ARCHITECTURE.md', desc: '시스템 설계 & Sequence' },
            { id: 'db_schema', name: '🗄️ DATABASE_SCHEMA.md', desc: 'DB ERD & DDL 스키마' },
            { id: 'tasks', name: '📝 TASKS.md', desc: '구현 WBS 체크리스트' },
            { id: 'deploy', name: '🐳 DEPLOYMENT.md', desc: 'Docker & .env 스펙' },
            { id: 'full', name: '📄 FULL_SPEC.md', desc: '통합 전체 명세서' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2.5 rounded-t-2xl text-xs font-black transition-all whitespace-nowrap flex flex-col items-start gap-0.5 ${
                  isActive 
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-300 border-t-2 border-x border-indigo-500 border-x-slate-200 dark:border-x-slate-800 shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-900/50'
                }`}
              >
                <span>{tab.name}</span>
                <span className={`text-[10px] ${isActive ? 'text-indigo-600 dark:text-indigo-400 font-bold' : 'text-slate-500'}`}>{tab.desc}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body: Active Tab Document Code Preview */}
        <div className="p-6 overflow-y-auto bg-slate-50 dark:bg-slate-950 font-mono text-xs text-slate-900 dark:text-slate-200 space-y-4 flex-1">
          <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-2">
            <span className="font-black text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
              <Code className="w-4 h-4 text-indigo-600 dark:text-indigo-400" /> {activeData.filename}
            </span>
            <span className="text-slate-500 font-bold">Lines: {activeData.content.split('\n').length} | Chars: {activeData.content.length.toLocaleString()}</span>
          </div>
          <pre className="whitespace-pre-wrap leading-relaxed select-all font-semibold">
            {activeData.content}
          </pre>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-600 dark:text-slate-400 font-bold hidden sm:block">
            💡 <strong className="text-slate-900 dark:text-white">Cursor / Claude Code 활용법</strong>: <span>`AGENTS.md`와 `TASKS.md`를 프로젝트 루트에 복사하면 AI가 자동 개발합니다.</span>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 rounded-xl border border-slate-700 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-all flex items-center gap-1.5"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-300" />}
              {copied ? '복사 완료!' : `${activeData.filename} 복사`}
            </button>

            <button
              onClick={handleDownloadSingle}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 shadow-md transition-all flex items-center gap-1.5"
            >
              <Download className="w-4 h-4 text-indigo-400" />
              {activeData.filename} 저장
            </button>

            <button
              onClick={handleDownloadAllBundle}
              className="px-4.5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-extrabold text-xs shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-white" />
              📦 5개 아티팩트 전체 저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
