export type Language = 'ko' | 'en' | 'ja' | 'zh' | 'es' | 'de' | 'fr';

export interface TranslationDictionary {
  nav: {
    brandSubtitle: string;
    catalog: string;
    compare: string;
    tco: string;
    advisor: string;
    tutorial: string;
    news: string;
    leaderboard: string;
    gpus: string;
    sandbox: string;
    speed: string;
    groupCatalog: string;
    groupTools: string;
    groupInsights: string;
    compareBasket: string;
    collapseMenu: string;
  };
  viewMode: {
    grid: string;
    table: string;
    compact: string;
  };
  quota: {
    title: string;
    rpm: string;
    tpm: string;
    rpd: string;
    concurrency: string;
  };
  researchProgress: {
    title: string;
    subtitle: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    step5: string;
  };
  dashboard: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allProviders: string;
    allTiers: string;
    allLicenses: string;
    modelsFound: string;
    openWeight: string;
    proprietary: string;
    contextWindow: string;
    inputPrice: string;
    outputPrice: string;
    compareButton: string;
    compared: string;
    officialDocs: string;
  };
  tco: {
    title: string;
    subtitle: string;
    selectModel: string;
    inputTokens: string;
    outputTokens: string;
    quantization: string;
    recommendedOption: string;
    cheapest: string;
    apiCostMonthly: string;
    cloudGpuCostMonthly: string;
    onPremCostMonthly: string;
    powerCostEst: string;
    chartTitle: string;
    breakEvenPoint: string;
    breakEvenDesc: string;
    step1Provider: string;
    step2Model: string;
    modelsFound: string;
    vramNeeded: string;
    modelWeights: string;
    recommendedGpu: string;
  };
  leaderboard: {
    title: string;
    subtitle: string;
    tabArenaElo: string;
    tabSweBench: string;
    tabMmluPro: string;
    tabGpqa: string;
    rank: string;
    model: string;
    provider: string;
    tier: string;
    score: string;
    scrollHint: string;
    tableCaption: string;
  };
  sandbox: {
    subtitle: string;
    description: string;
    promptInput: string;
    chars: string;
    approxInputTokens: string;
    approx: string;
    promptPlaceholder: string;
    loadSample: string;
    sampleRag: string;
    sampleCode: string;
    sampleExec: string;
    simSetup: string;
    outputTokens: string;
    outputTokensAria: string;
    outShort: string;
    outTypical: string;
    outLong: string;
    batchRequests: string;
    callOnce: string;
    callSuffix: string;
    totalTokensPerCall: string;
    inputLabel: string;
    outputLabel: string;
    monthlyTrafficTokens: string;
    tableTitle: string;
    tableDesc: string;
    searchPlaceholder: string;
    tierFilterAria: string;
    allTiers: string;
    colModel: string;
    colTier: string;
    colInput1M: string;
    colOutput1M: string;
    colPerCall: string;
    colMonthly: string;
    colCompare: string;
    openWeight: string;
    proprietary: string;
    comparing: string;
    addCompare: string;
  };
  speed: {
    subtitle: string;
    description: string;
    targetModel: string;
    modelLlamaTag: string;
    modelDeepseekTag: string;
    tabTps: string;
    tabTtft: string;
    chartByProvider: string;
    metricTps: string;
    metricTtft: string;
    refreshed: string;
    legendTps: string;
    legendTtft: string;
    rankTitle: string;
  };
  compare: {
    emptyTitle: string;
    emptyDesc: string;
    tableAria: string;
  };
  gpu: {
    title: string;
    subtitle: string;
    tabAll: string;
    tabEnterprise: string;
    tabProsumer: string;
    tabConsumer: string;
    groupEnterprise: string;
    groupProsumer: string;
    groupConsumer: string;
    perfBandwidth: string;
    perfFp16: string;
    perfInt8: string;
    cudaCores: string;
    tensorCores: string;
    noCloud: string;
    recommendedUse: string;
    maxVram: string;
    topFp16: string;
    topInt8: string;
    vram: string;
    bandwidth: string;
    purchasePrice: string;
    cloudOnDemand: string;
    cloudSpot: string;
  };
}

export const translations: Record<Language, TranslationDictionary> = {
  ko: {
    nav: {
      brandSubtitle: "전세계 AI 모델 비용 & 스펙 비교",
      catalog: "모델 카탈로그",
      compare: "모델 비교",
      tco: "API vs 셀프호스팅 TCO",
      advisor: "🏆 AI 아키텍처 추천기",
      tutorial: "🎓 튜토리얼",
      news: "📰 AI 트렌드 뉴스",
      leaderboard: "리더보드",
      gpus: "GPU 스펙 & 비용",
      sandbox: "🧮 토크나이저 샌드박스",
      speed: "⚡ 실시간 추론 속도",
      groupCatalog: "메인 카탈로그",
      groupTools: "샌드박스 & 시뮬레이터",
      groupInsights: "AI 솔루션 & 리포트",
      compareBasket: "비교함",
      collapseMenu: "메뉴 접기"
    },
    viewMode: {
      grid: "카드 뷰",
      table: "스펙 테이블",
      compact: "요약 리스트"
    },
    quota: {
      title: "API 할당량 제한 (Rate Limits)",
      rpm: "RPM (분당 요청)",
      tpm: "TPM (분당 토큰)",
      rpd: "RPD (일일 요청)",
      concurrency: "동시 요청 수"
    },
    researchProgress: {
      title: "AI 솔루션 아키텍트 실시간 심층 분석 중",
      subtitle: "고객 요구사항을 바탕으로 최적의 LLM 조합과 OpEx 호스팅 인프라 비용을 산출하고 있습니다...",
      step1: "고객 자연어 요구사항 및 워크로드 스펙 분석 (Intent & SLA)",
      step2: "50+ 글로벌 LLM 모델 데이터베이스 & Arena Elo 벤치마크 스캔",
      step3: "3가지 라우팅 모델 조합 (Best, Smart, Budget) 트래픽 시뮬레이션",
      step4: "Vercel, Railway, Cloud GPU 월간 OpEx 호스팅 인프라 비용 산출",
      step5: "Gemini 2.5 Flash 기반 7대 섹션 아키텍처 및 Mermaid 다이어그램 명세서 작성"
    },
    dashboard: {
      title: "글로벌 LLM 모델 카탈로그",
      subtitle: "OpenAI, Anthropic, Google, AWS Bedrock, DeepSeek, Meta 등 580+ AI 전체 모델 공식 출처(Official Docs) 기반 스펙, 비용, 할당량 및 벤치마크 비교",
      searchPlaceholder: "모델명, 프로바이더, 라이선스 검색...",
      allProviders: "모든 프로바이더",
      allTiers: "모든 티어",
      allLicenses: "모든 라이선스",
      modelsFound: "개의 모델 검색됨",
      openWeight: "오픈웨이트",
      proprietary: "상용 API",
      contextWindow: "컨텍스트 윈도우",
      inputPrice: "입력 1M 토큰",
      outputPrice: "출력 1M 토큰",
      compareButton: "+ 비교하기",
      compared: "비교 중",
      officialDocs: "공식 문서 ↗"
    },
    tco: {
      title: "셀프호스팅 TCO 손익분기 시뮬레이터",
      subtitle: "SaaS API 호출 비용 vs Cloud GPU 서빙 vs 온프레미스 서버 인프라 도입 3년간 총 소요 비용(TCO) 정밀 계산",
      selectModel: "시뮬레이션 대상 모델 선택",
      inputTokens: "월간 입력 토큰 (Million Tokens)",
      outputTokens: "월간 출력 토큰 (Million Tokens)",
      quantization: "경량화 양자화 수준 (Quantization)",
      recommendedOption: "추천 인프라 운용 방식",
      cheapest: "최저 비용 방식",
      apiCostMonthly: "SaaS API 월 비용",
      cloudGpuCostMonthly: "Cloud GPU 대여 월 비용",
      onPremCostMonthly: "On-Premise 구매 감가상각 월 비용",
      powerCostEst: "월 추정 전력비",
      chartTitle: "인프라 구축 방식별 월간 비용 비교 ($)",
      breakEvenPoint: "손익분기점 토큰 사용량",
      breakEvenDesc: "해당 사용량 이상일 경우 SaaS API 대신 독립 인프라(Cloud GPU / On-Premise) 구축이 경제적으로 유리합니다.",
      step1Provider: "1단계: 프로바이더 (공급자) 선택",
      step2Model: "2단계: AI 모델 선택",
      modelsFound: "개 모델 검색됨",
      vramNeeded: "필요 VRAM 용량:",
      modelWeights: "- 모델 가중치 (Weights):",
      recommendedGpu: "추천 GPU 구성:"
    },
    leaderboard: {
      title: "글로벌 AI 모델 성능 랭킹 리더보드",
      subtitle: "LMSYS Chatbot Arena Elo, SWE-bench, MMLU-Pro, GPQA 벤치마크 기준 종합 순위",
      tabArenaElo: "LMSYS Arena Elo",
      tabSweBench: "SWE-bench (코딩)",
      tabMmluPro: "MMLU-Pro (지식)",
      tabGpqa: "GPQA (추론)",
      rank: "순위",
      model: "모델명",
      provider: "프로바이더",
      tier: "티어",
      score: "점수",
      scrollHint: "표는 좌우로 스크롤할 수 있습니다.",
      tableCaption: "분석 데이터"
    },
    sandbox: {
      subtitle: "실시간 프롬프트 토크나이저 & 모델별 API 비용 계산기",
      description: "프롬프트를 입력하면 실시간으로 예상 토큰 수와 1회 호출 비용 및 월간 배치 호출 시의 정밀 산출 금액을 580+ AI 모델 전체와 비교합니다.",
      promptInput: "📝 프롬프트 입력 (Prompt Input)",
      chars: "글자",
      approxInputTokens: "입력 토큰",
      approx: "약",
      promptPlaceholder: "비용을 계산할 프롬프트를 자유롭게 입력하세요...",
      loadSample: "샘플 프롬프트 원클릭 로드:",
      sampleRag: "🔍 RAG 지식 기반 질의응답 (RAG Prompt)",
      sampleCode: "💻 코드 리팩토링 & 버그 검수 (Code Refactor)",
      sampleExec: "📊 비즈니스 요약 & TCO 분석 (Executive Summary)",
      simSetup: "⚙️ 배치 및 응답 토큰 설정 (Simulation Setup)",
      outputTokens: "예상 출력 토큰 (Output Tokens)",
      outputTokensAria: "예상 출력 토큰",
      outShort: "50 (짧은 응답)",
      outTypical: "1,000 (일반적)",
      outLong: "4,096 (긴 리포트)",
      batchRequests: "월간 총 API 호출 횟수 (Batch Requests)",
      callOnce: "1회",
      callSuffix: "회",
      totalTokensPerCall: "총 처리 토큰 (1회 호출 기준):",
      inputLabel: "- 입력 (Input):",
      outputLabel: "- 출력 (Output):",
      monthlyTrafficTokens: "월간 총 트래픽 토큰:",
      tableTitle: "📊 580+ AI 모델별 정밀 비용 산출표",
      tableDesc: "입력 및 예상 출력 토큰에 기반한 1회 호출 단위 비용 및 설정한 월간 트래픽 비용 비교",
      searchPlaceholder: "모델명, 프로바이더 검색...",
      tierFilterAria: "모델 등급 필터",
      allTiers: "모든 티어",
      colModel: "모델명 & 프로바이더",
      colTier: "티어 / 라이선스",
      colInput1M: "입력 1M 토큰 ($)",
      colOutput1M: "출력 1M 토큰 ($)",
      colPerCall: "1회 추정 비용 ($)",
      colMonthly: "월간 총 예상 비용 ($)",
      colCompare: "비교",
      openWeight: "오픈",
      proprietary: "상용",
      comparing: "비교 중",
      addCompare: "+ 비교"
    },
    speed: {
      subtitle: "프로바이더별 실시간 추론 지연시간(TTFT) & 속도(TPS) 벤치마크",
      description: "동일한 오픈/상용 AI 모델이라도 서빙 아키텍처(Groq LPU vs Cerebras WSE vs H100 Cluster)에 따라 최대 15배 속도 차이가 발생합니다. 최적의 인프라를 실시간 비교하세요.",
      targetModel: "대상 모델:",
      modelLlamaTag: "오픈 대표",
      modelDeepseekTag: "추론 특화",
      tabTps: "🚀 초당 출력 속도 (TPS - 높을수록 우수)",
      tabTtft: "⏱️ 첫 토큰 지연시간 (TTFT ms - 낮을수록 우수)",
      chartByProvider: "📊 프로바이더별",
      metricTps: "초당 생성 토큰 수 (Tokens/sec)",
      metricTtft: "첫 응답 지연시간 (TTFT ms)",
      refreshed: "실시간 데이터 갱신 완료",
      legendTps: "출력 속도",
      legendTtft: "첫 토큰 지연시간",
      rankTitle: "🏆 최적 인프라 서빙 랭킹 (Infrastructure Rank)"
    },
    compare: {
      emptyTitle: "비교할 모델이 선택되지 않았습니다.",
      emptyDesc: "모델 카탈로그 대시보드에서 비교하고 싶은 LLM 모델 카드의 '+ 비교하기' 버튼을 눌러 추가해주세요.",
      tableAria: "모델 비교표, 좌우로 스크롤 가능"
    },
    gpu: {
      title: "AI 추론용 GPU 스펙 및 클라우드 대여 비용",
      subtitle: "NVIDIA 데이터센터 & 컨슈머 GPU의 VRAM, 대역폭, 구매가, 클라우드 Hourly 인스턴스 비용 정보",
      vram: "VRAM 용량",
      bandwidth: "메모리 대역폭",
      purchasePrice: "하드웨어 권장 소비자가",
      cloudOnDemand: "클라우드 On-Demand",
      cloudSpot: "클라우드 Spot 인스턴스",
      tabAll: "전체 보기",
      tabEnterprise: "🏢 기업용 (Datacenter)",
      tabProsumer: "🔬 프로슈머 (Workstation)",
      tabConsumer: "💻 개인용 (Consumer)",
      groupEnterprise: "🏢 기업용 데이터센터",
      groupProsumer: "🔬 프로슈머 워크스테이션",
      groupConsumer: "💻 개인용 소비자",
      perfBandwidth: "메모리 대역폭",
      perfFp16: "FP16 연산 성능",
      perfInt8: "INT8 추론 성능",
      cudaCores: "CUDA 코어",
      tensorCores: "Tensor 코어",
      noCloud: "클라우드 서비스 미제공 (온프레미스 전용)",
      recommendedUse: "추천 용도",
      maxVram: "최대 VRAM",
      topFp16: "최고 FP16",
      topInt8: "최고 INT8"
    }
  },
  en: {
    nav: {
      brandSubtitle: "Global AI Model TCO & Spec Comparison",
      catalog: "Model Catalog",
      compare: "Compare",
      tco: "TCO Simulator",
      advisor: "🏆 Architecture Advisor",
      tutorial: "🎓 Tutorial",
      news: "📰 AI Trends News",
      leaderboard: "Leaderboard",
      gpus: "GPU Specs & Costs",
      sandbox: "🧮 Tokenizer Sandbox",
      speed: "⚡ Live Inference Speed",
      groupCatalog: "Main Catalog",
      groupTools: "Sandbox & Simulators",
      groupInsights: "AI Solutions & Reports",
      compareBasket: "Compare",
      collapseMenu: "Collapse menu"
    },
    viewMode: {
      grid: "Card View",
      table: "Spec Table",
      compact: "Compact List"
    },
    quota: {
      title: "API Rate Limits & Quotas",
      rpm: "RPM (Req/Min)",
      tpm: "TPM (Tok/Min)",
      rpd: "RPD (Req/Day)",
      concurrency: "Concurrency"
    },
    researchProgress: {
      title: "AI Solutions Architect Live Deep Analysis",
      subtitle: "Calculating optimal LLM combos and OpEx hosting costs based on your requirements...",
      step1: "Analyzing Natural Language Requirements & Workload Specifications",
      step2: "Scanning 50+ Global LLM Model Database & Arena Elo Benchmarks",
      step3: "Simulating Traffic for 3 Model Combos (Best, Smart, Budget)",
      step4: "Calculating Monthly OpEx Infrastructure Costs (Vercel, Railway, Cloud GPU)",
      step5: "Synthesizing 7-Section Architecture & Mermaid Spec with Gemini 2.5 Flash"
    },
    dashboard: {
      title: "Global LLM Model Catalog",
      subtitle: "Compare official specs, pricing, rate limits, and benchmarks for 580+ LLMs with verified official documentation source links",
      searchPlaceholder: "Search model name, provider, license...",
      allProviders: "All Providers",
      allTiers: "All Tiers",
      allLicenses: "All Licenses",
      modelsFound: "models found",
      openWeight: "Open-Weight",
      proprietary: "Proprietary",
      contextWindow: "Context Window",
      inputPrice: "Input 1M Tokens",
      outputPrice: "Output 1M Tokens",
      compareButton: "+ Compare",
      compared: "Added",
      officialDocs: "Official Docs ↗"
    },
    tco: {
      title: "Self-Hosting TCO Break-Even Simulator",
      subtitle: "Calculate total cost of ownership (TCO): SaaS API vs Cloud GPU sublease vs On-Premise hardware purchase amortized over 36 months",
      selectModel: "Select Target Model",
      inputTokens: "Monthly Input Tokens (Million)",
      outputTokens: "Monthly Output Tokens (Million)",
      quantization: "Quantization Level",
      recommendedOption: "Recommended Infrastructure",
      cheapest: "Cheapest Option",
      apiCostMonthly: "API Monthly Cost",
      cloudGpuCostMonthly: "Cloud GPU Monthly Cost",
      onPremCostMonthly: "On-Prem Amortized Monthly",
      powerCostEst: "Est. Monthly Electricity",
      chartTitle: "Monthly Infrastructure Cost Comparison ($)",
      breakEvenPoint: "Token Volume Break-Even Point",
      breakEvenDesc: "Above this token threshold, dedicated infrastructure (Cloud GPU / On-Premise) is more cost-effective than SaaS API calls.",
      step1Provider: "Step 1: Select Provider",
      step2Model: "Step 2: Select AI Model",
      modelsFound: "models found",
      vramNeeded: "Required VRAM:",
      modelWeights: "- Model weights:",
      recommendedGpu: "Recommended GPU setup:"
    },
    leaderboard: {
      title: "Global AI Model Leaderboard",
      subtitle: "Comprehensive rankings based on LMSYS Chatbot Arena Elo, SWE-bench, MMLU-Pro, and GPQA benchmarks",
      tabArenaElo: "LMSYS Arena Elo",
      tabSweBench: "SWE-bench (Coding)",
      tabMmluPro: "MMLU-Pro (Knowledge)",
      tabGpqa: "GPQA (Reasoning)",
      rank: "Rank",
      model: "Model Name",
      provider: "Provider",
      tier: "Tier",
      score: "Score",
      scrollHint: "This table scrolls horizontally.",
      tableCaption: "Analysis data"
    },
    sandbox: {
      subtitle: "Real-time prompt tokenizer & per-model API cost calculator",
      description: "Type a prompt to see estimated tokens, per-call cost and monthly batch cost compared across 580+ AI models in real time.",
      promptInput: "📝 Prompt input",
      chars: "characters",
      approxInputTokens: "input tokens",
      approx: "~",
      promptPlaceholder: "Type any prompt to price it...",
      loadSample: "Load a sample prompt:",
      sampleRag: "🔍 RAG knowledge Q&A",
      sampleCode: "💻 Code refactor & bug review",
      sampleExec: "📊 Executive summary & TCO analysis",
      simSetup: "⚙️ Batch & output token settings",
      outputTokens: "Expected output tokens",
      outputTokensAria: "Expected output tokens",
      outShort: "50 (short reply)",
      outTypical: "1,000 (typical)",
      outLong: "4,096 (long report)",
      batchRequests: "Monthly API calls (batch requests)",
      callOnce: "1 call",
      callSuffix: "calls",
      totalTokensPerCall: "Total tokens per call:",
      inputLabel: "- Input:",
      outputLabel: "- Output:",
      monthlyTrafficTokens: "Monthly traffic tokens:",
      tableTitle: "📊 Precise cost table across 580+ AI models",
      tableDesc: "Per-call and monthly cost comparison based on your input and expected output tokens",
      searchPlaceholder: "Search model or provider...",
      tierFilterAria: "Model tier filter",
      allTiers: "All tiers",
      colModel: "Model & provider",
      colTier: "Tier / license",
      colInput1M: "Input per 1M tokens ($)",
      colOutput1M: "Output per 1M tokens ($)",
      colPerCall: "Est. cost per call ($)",
      colMonthly: "Est. monthly cost ($)",
      colCompare: "Compare",
      openWeight: "Open",
      proprietary: "Proprietary",
      comparing: "Comparing",
      addCompare: "+ Compare"
    },
    speed: {
      subtitle: "Real-time inference latency (TTFT) & throughput (TPS) benchmarks by provider",
      description: "The same model can run up to 15× faster or slower depending on the serving architecture (Groq LPU vs Cerebras WSE vs H100 cluster). Compare infrastructure in real time.",
      targetModel: "Target model:",
      modelLlamaTag: "flagship open model",
      modelDeepseekTag: "reasoning-focused",
      tabTps: "🚀 Output speed (TPS — higher is better)",
      tabTtft: "⏱️ Time to first token (TTFT ms — lower is better)",
      chartByProvider: "📊 By provider —",
      metricTps: "tokens generated per second",
      metricTtft: "time to first token (TTFT ms)",
      refreshed: "Live data refreshed",
      legendTps: "Output speed",
      legendTtft: "Time to first token",
      rankTitle: "🏆 Infrastructure serving rank"
    },
    compare: {
      emptyTitle: "No models selected for comparison.",
      emptyDesc: "Add models from the catalog dashboard using the '+ Compare' button on each model card.",
      tableAria: "Model comparison table, scrolls horizontally"
    },
    gpu: {
      title: "AI Inference GPU Specs & Cloud Hosting Rates",
      subtitle: "Hardware specs, VRAM bandwidth, MSRP, and hourly cloud rental rates for NVIDIA enterprise and consumer GPUs",
      vram: "VRAM Capacity",
      bandwidth: "Memory Bandwidth",
      purchasePrice: "MSRP Purchase Price",
      cloudOnDemand: "Cloud On-Demand Rate",
      cloudSpot: "Cloud Spot Rate",
      tabAll: "All GPUs",
      tabEnterprise: "🏢 Datacenter",
      tabProsumer: "🔬 Workstation",
      tabConsumer: "💻 Consumer",
      groupEnterprise: "🏢 Datacenter GPUs",
      groupProsumer: "🔬 Prosumer Workstation",
      groupConsumer: "💻 Consumer",
      perfBandwidth: "Memory Bandwidth",
      perfFp16: "FP16 Compute",
      perfInt8: "INT8 Inference",
      cudaCores: "CUDA Cores",
      tensorCores: "Tensor Cores",
      noCloud: "No cloud offering (on-premise only)",
      recommendedUse: "Recommended Use",
      maxVram: "Max VRAM",
      topFp16: "Peak FP16",
      topInt8: "Peak INT8"
    }
  },
  ja: {
    nav: {
      brandSubtitle: "世界AIモデルTCO・スペック比較",
      catalog: "モデルカタログ",
      compare: "カスタム比較",
      tco: "TCOシミュレーター",
      advisor: "🏆 AIアーキテクチャ推薦",
      tutorial: "🎓 チュートリアル",
      news: "📰 AI トレンドニュース",
      leaderboard: "リーダーボード",
      gpus: "GPUスペック・コスト",
      sandbox: "🧮 トークナイザーサンドボックス",
      speed: "⚡ リアルタイム推論速度",
      groupCatalog: "メインカタログ",
      groupTools: "サンドボックス & シミュレーター",
      groupInsights: "AI ソリューション & レポート",
      compareBasket: "比較リスト",
      collapseMenu: "メニューを折りたたむ"
    },
    viewMode: {
      grid: "カード表示",
      table: "スペック表",
      compact: "リスト表示"
    },
    quota: {
      title: "APIレート制限・クォータ",
      rpm: "RPM (分間リクエスト)",
      tpm: "TPM (分間トークン)",
      rpd: "RPD (日間リクエスト)",
      concurrency: "同時実行数"
    },
    researchProgress: {
      title: "AIソリューションアーキテクトリアルタイム深層分析中",
      subtitle: "ご要件に基づき最適LLM構成とOpExホスティングコストを算出しています...",
      step1: "自然言語要件およびワークロードスペックの分析 (Intent & SLA)",
      step2: "50+ グローバルLLMモデルDB & Arena Eloベンチマークのスキャン",
      step3: "3つのルーティングモデル組合せ（Best, Smart, Budget）シミュレーション",
      step4: "Vercel, Railway, Cloud GPU 月額OpExインフラ費用算出",
      step5: "Gemini 2.5 Flashによる7セクションアーキテクチャ＆Mermaid仕様書生成"
    },
    dashboard: {
      title: "グローバルLLMモデルカタログ",
      subtitle: "OpenAI、Anthropic、Google、AWS Bedrockなど142以上のLLM公式ドキュメント（Official Docs）に基づく全数比較",
      searchPlaceholder: "モデル名、プロバイダー、ライセンスを検索...",
      allProviders: "すべてのプロバイダー",
      allTiers: "すべてのティア",
      allLicenses: "すべてのライセンス",
      modelsFound: "件のモデルが見つかりました",
      openWeight: "オープンウェイト",
      proprietary: "商用API",
      contextWindow: "コンテキストウィンドウ",
      inputPrice: "入力 1Mトークン",
      outputPrice: "出力 1Mトークン",
      compareButton: "+ 比較に追加",
      compared: "追加済み",
      officialDocs: "公式文書 ↗"
    },
    tco: {
      title: "セルフホスティングTCO損益分岐シミュレーター",
      subtitle: "SaaS API呼び出し vs クラウドGPUレンタル vs オンプレミスサーバー導入の3年間TCOを精緻に計算",
      selectModel: "対象モデルを選択",
      inputTokens: "月間入力トークン (1,000,000単位)",
      outputTokens: "月间出力トークン (1,000,000単位)",
      quantization: "量子化レベル (Quantization)",
      recommendedOption: "推奨インフラ構成",
      cheapest: "最安値オプション",
      apiCostMonthly: "SaaS API 月額コスト",
      cloudGpuCostMonthly: "Cloud GPU 月額コスト",
      onPremCostMonthly: "On-Premise 減価償却月額",
      powerCostEst: "推定月間電気代",
      chartTitle: "インフラ構成別月額費用比較 ($)",
      breakEvenPoint: "損益分岐点トークン量",
      breakEvenDesc: "この使用量を超えると、API利用よりも専用インフラ構築の方が経済的です。",
      step1Provider: "ステップ1: プロバイダー選択",
      step2Model: "ステップ2: AIモデル選択",
      modelsFound: "件のモデル",
      vramNeeded: "必要 VRAM 容量:",
      modelWeights: "- モデル重み (Weights):",
      recommendedGpu: "推奨 GPU 構成:"
    },
    leaderboard: {
      title: "グローバルAIモデル性能ランキング",
      subtitle: "LMSYS Chatbot Arena Elo、SWE-bench、MMLU-Pro、GPQAに基づく総合順位",
      tabArenaElo: "LMSYS Arena Elo",
      tabSweBench: "SWE-bench (コーディング)",
      tabMmluPro: "MMLU-Pro (知識)",
      tabGpqa: "GPQA (推論)",
      rank: "順位",
      model: "モデル名",
      provider: "プロバイダー",
      tier: "ティア",
      score: "スコア",
      scrollHint: "表は左右にスクロールできます。",
      tableCaption: "分析データ"
    },
    sandbox: {
      subtitle: "リアルタイム プロンプト トークナイザー＆モデル別 API コスト計算機",
      description: "プロンプトを入力すると、推定トークン数・1回あたりのコスト・月間バッチ実行時の費用を580以上のAIモデルでリアルタイム比較します。",
      promptInput: "📝 プロンプト入力",
      chars: "文字",
      approxInputTokens: "入力トークン",
      approx: "約",
      promptPlaceholder: "コストを計算したいプロンプトを自由に入力してください...",
      loadSample: "サンプルプロンプトを読み込む:",
      sampleRag: "🔍 RAG ナレッジQ&A",
      sampleCode: "💻 コードリファクタリング＆バグ検査",
      sampleExec: "📊 ビジネス要約＆TCO分析",
      simSetup: "⚙️ バッチ・出力トークン設定",
      outputTokens: "想定出力トークン",
      outputTokensAria: "想定出力トークン",
      outShort: "50 (短い応答)",
      outTypical: "1,000 (標準)",
      outLong: "4,096 (長いレポート)",
      batchRequests: "月間API呼び出し回数 (バッチ)",
      callOnce: "1回",
      callSuffix: "回",
      totalTokensPerCall: "1回あたりの総トークン:",
      inputLabel: "- 入力 (Input):",
      outputLabel: "- 出力 (Output):",
      monthlyTrafficTokens: "月間トラフィック総トークン:",
      tableTitle: "📊 580以上のAIモデル別 精密コスト表",
      tableDesc: "入力および想定出力トークンに基づく、1回あたり／月間コストの比較",
      searchPlaceholder: "モデル名・プロバイダーを検索...",
      tierFilterAria: "モデル等級フィルター",
      allTiers: "すべての等級",
      colModel: "モデル名＆プロバイダー",
      colTier: "等級 / ライセンス",
      colInput1M: "入力 100万トークン ($)",
      colOutput1M: "出力 100万トークン ($)",
      colPerCall: "1回あたり推定コスト ($)",
      colMonthly: "月間推定コスト ($)",
      colCompare: "比較",
      openWeight: "オープン",
      proprietary: "商用",
      comparing: "比較中",
      addCompare: "+ 比較"
    },
    speed: {
      subtitle: "プロバイダー別のリアルタイム推論レイテンシ(TTFT)とスループット(TPS)ベンチマーク",
      description: "同じモデルでもサービング基盤(Groq LPU / Cerebras WSE / H100クラスタ)により最大15倍の速度差が生じます。最適なインフラをリアルタイムで比較してください。",
      targetModel: "対象モデル:",
      modelLlamaTag: "オープン代表",
      modelDeepseekTag: "推論特化",
      tabTps: "🚀 出力速度 (TPS - 高いほど良い)",
      tabTtft: "⏱️ 初回トークン遅延 (TTFT ms - 低いほど良い)",
      chartByProvider: "📊 プロバイダー別",
      metricTps: "秒あたり生成トークン数 (Tokens/sec)",
      metricTtft: "初回応答遅延 (TTFT ms)",
      refreshed: "リアルタイムデータ更新完了",
      legendTps: "出力速度",
      legendTtft: "初回トークン遅延",
      rankTitle: "🏆 最適インフラ サービングランキング"
    },
    compare: {
      emptyTitle: "比較するモデルが選択されていません。",
      emptyDesc: "モデルカタログのダッシュボードで、比較したいモデルカードの「+ 比較」ボタンから追加してください。",
      tableAria: "モデル比較表、左右にスクロール可能"
    },
    gpu: {
      title: "AI推論用GPUスペック・クラウド利用料",
      subtitle: "NVIDIAデータセンター＆コンシューマーGPUのVRAM、帯域幅、価格、クラウドレンタル料金",
      vram: "VRAM容量",
      bandwidth: "メモリ帯域幅",
      purchasePrice: "推奨販売価格",
      cloudOnDemand: "クラウド On-Demand",
      cloudSpot: "クラウド Spot",
      tabAll: "すべて表示",
      tabEnterprise: "🏢 データセンター向け",
      tabProsumer: "🔬 ワークステーション向け",
      tabConsumer: "💻 個人向け",
      groupEnterprise: "🏢 データセンターGPU",
      groupProsumer: "🔬 プロシューマー ワークステーション",
      groupConsumer: "💻 コンシューマー",
      perfBandwidth: "メモリ帯域幅",
      perfFp16: "FP16 演算性能",
      perfInt8: "INT8 推論性能",
      cudaCores: "CUDA コア",
      tensorCores: "Tensor コア",
      noCloud: "クラウド提供なし（オンプレミス専用）",
      recommendedUse: "推奨用途",
      maxVram: "最大 VRAM",
      topFp16: "最高 FP16",
      topInt8: "最高 INT8"
    }
  },
  zh: {
    nav: {
      brandSubtitle: "全球 AI 模型 TCO 与规格对比",
      catalog: "模型目录",
      compare: "自定义对比",
      tco: "TCO 模拟器",
      advisor: "🏆 AI 架构推荐器",
      tutorial: "🎓 教程",
      news: "📰 AI 趋势新闻",
      leaderboard: "排行榜",
      gpus: "GPU 规格与成本",
      sandbox: "🧮 Token 计算沙盒",
      speed: "⚡ 实时推理速度",
      groupCatalog: "主目录",
      groupTools: "沙盒与模拟器",
      groupInsights: "AI 解决方案与报告",
      compareBasket: "对比栏",
      collapseMenu: "收起菜单"
    },
    viewMode: {
      grid: "卡片视图",
      table: "规格表格",
      compact: "紧凑列表"
    },
    quota: {
      title: "API 速率限制与配额",
      rpm: "RPM (每分钟请求)",
      tpm: "TPM (每分钟 Token)",
      rpd: "RPD (每日请求)",
      concurrency: "并发限制"
    },
    researchProgress: {
      title: "AI 解决方案架构师实时深度分析中",
      subtitle: "正在根据您的需求计算最佳 LLM 组合与 OpEx 托管成本...",
      step1: "分析自然语言需求与工作负载 S specifications (Intent & SLA)",
      step2: "扫描 50+ 全球 LLM 模型数据库及 Arena Elo 跑分",
      step3: "模拟 3 种路由模型组合 (Best, Smart, Budget) 流量",
      step4: "计算 Vercel, Railway, Cloud GPU 月度 OpEx 基础设施成本",
      step5: "通过 Gemini 2.5 Flash 生成 7 大章节架构及 Mermaid 规范"
    },
    dashboard: {
      title: "全球大语言模型目录",
      subtitle: "基于官方文档 (Official Docs) 权威出处对比 OpenAI、Anthropic、Google 等 142+ 全部模型规格与价格",
      searchPlaceholder: "搜索模型名称、提供商、许可证...",
      allProviders: "所有提供商",
      allTiers: "所有梯队",
      allLicenses: "所有许可证",
      modelsFound: "个模型已找到",
      openWeight: "开源权重",
      proprietary: "商业 API",
      contextWindow: "上下文窗口",
      inputPrice: "输入 1M Tokens",
      outputPrice: "输出 1M Tokens",
      compareButton: "+ 加入对比",
      compared: "已加入",
      officialDocs: "官方文档 ↗"
    },
    tco: {
      title: "自托管 TCO 盈亏平衡模拟器",
      subtitle: "精确计算 SaaS API 调取、Cloud GPU 租赁与本地 On-Premise 硬件采购 3 年总拥有成本 (TCO)",
      selectModel: "选择目标模型",
      inputTokens: "月输入 Token (百万)",
      outputTokens: "月输出 Token (百万)",
      quantization: "量化等级 (Quantization)",
      recommendedOption: "推荐架构方式",
      cheapest: "最低成本方案",
      apiCostMonthly: "SaaS API 月度费用",
      cloudGpuCostMonthly: "Cloud GPU 月租费用",
      onPremCostMonthly: "本地硬件折旧月费用",
      powerCostEst: "预估月电费",
      chartTitle: "不同架构月度成本对比 ($)",
      breakEvenPoint: "盈亏平衡 Token 量",
      breakEvenDesc: "超过此使用量时，部署独立架构 (Cloud GPU / On-Premise) 比调用 API 更具性价比。",
      step1Provider: "第 1 步：选择供应商",
      step2Model: "第 2 步：选择 AI 模型",
      modelsFound: "个模型",
      vramNeeded: "所需显存:",
      modelWeights: "- 模型权重:",
      recommendedGpu: "推荐 GPU 配置:"
    },
    leaderboard: {
      title: "全球 AI 模型性能排行榜",
      subtitle: "基于 LMSYS Chatbot Arena Elo、SWE-bench、MMLU-Pro 与 GPQA 的综合排名",
      tabArenaElo: "LMSYS Arena Elo",
      tabSweBench: "SWE-bench (代码)",
      tabMmluPro: "MMLU-Pro (知识)",
      tabGpqa: "GPQA (推理)",
      rank: "排名",
      model: "模型名称",
      provider: "提供商",
      tier: "梯队",
      score: "得分",
      scrollHint: "表格可左右滚动。",
      tableCaption: "分析数据"
    },
    sandbox: {
      subtitle: "实时提示词分词器与各模型 API 成本计算器",
      description: "输入提示词，即可实时比较 580+ AI 模型的预估 token 数、单次调用成本与月度批量成本。",
      promptInput: "📝 提示词输入",
      chars: "字符",
      approxInputTokens: "输入 token",
      approx: "约",
      promptPlaceholder: "输入任意提示词以计算成本...",
      loadSample: "一键载入示例提示词：",
      sampleRag: "🔍 RAG 知识问答",
      sampleCode: "💻 代码重构与缺陷审查",
      sampleExec: "📊 业务摘要与 TCO 分析",
      simSetup: "⚙️ 批量与输出 token 设置",
      outputTokens: "预计输出 token",
      outputTokensAria: "预计输出 token",
      outShort: "50 (简短回复)",
      outTypical: "1,000 (常见)",
      outLong: "4,096 (长报告)",
      batchRequests: "每月 API 调用次数（批量）",
      callOnce: "1 次",
      callSuffix: "次",
      totalTokensPerCall: "单次调用总 token：",
      inputLabel: "- 输入:",
      outputLabel: "- 输出:",
      monthlyTrafficTokens: "每月流量总 token：",
      tableTitle: "📊 580+ AI 模型精确成本表",
      tableDesc: "基于输入与预计输出 token 的单次与月度成本比较",
      searchPlaceholder: "搜索模型或供应商...",
      tierFilterAria: "模型等级筛选",
      allTiers: "所有等级",
      colModel: "模型与供应商",
      colTier: "等级 / 许可",
      colInput1M: "输入每百万 token ($)",
      colOutput1M: "输出每百万 token ($)",
      colPerCall: "单次预估成本 ($)",
      colMonthly: "月度预估成本 ($)",
      colCompare: "比较",
      openWeight: "开源",
      proprietary: "商用",
      comparing: "比较中",
      addCompare: "+ 比较"
    },
    speed: {
      subtitle: "各供应商的实时推理延迟 (TTFT) 与吞吐 (TPS) 基准",
      description: "即使是同一模型，服务架构(Groq LPU / Cerebras WSE / H100 集群)不同也会带来最高 15 倍的速度差异。请实时比较基础设施。",
      targetModel: "目标模型:",
      modelLlamaTag: "开源代表",
      modelDeepseekTag: "推理专用",
      tabTps: "🚀 输出速度 (TPS - 越高越好)",
      tabTtft: "⏱️ 首个 token 延迟 (TTFT ms - 越低越好)",
      chartByProvider: "📊 各供应商",
      metricTps: "每秒生成 token 数",
      metricTtft: "首次响应延迟 (TTFT ms)",
      refreshed: "实时数据已刷新",
      legendTps: "输出速度",
      legendTtft: "首个 token 延迟",
      rankTitle: "🏆 最佳基础设施服务排名"
    },
    compare: {
      emptyTitle: "尚未选择要比较的模型。",
      emptyDesc: "请在模型目录仪表板中，点击模型卡片上的“+ 比较”按钮添加。",
      tableAria: "模型比较表，可左右滚动"
    },
    gpu: {
      title: "AI 推理 GPU 规格与云端租用价格",
      subtitle: "NVIDIA 企业级与消费级 GPU 的 VRAM、内存带宽、官方指导价及云端按时计费价格",
      vram: "VRAM 容量",
      bandwidth: "内存带宽",
      purchasePrice: "官方指导价",
      cloudOnDemand: "云端 On-Demand",
      cloudSpot: "云端 Spot 实例",
      tabAll: "查看全部",
      tabEnterprise: "🏢 数据中心级",
      tabProsumer: "🔬 工作站级",
      tabConsumer: "💻 消费级",
      groupEnterprise: "🏢 数据中心 GPU",
      groupProsumer: "🔬 专业工作站",
      groupConsumer: "💻 消费级",
      perfBandwidth: "显存带宽",
      perfFp16: "FP16 算力",
      perfInt8: "INT8 推理性能",
      cudaCores: "CUDA 核心",
      tensorCores: "Tensor 核心",
      noCloud: "不提供云服务（仅限本地部署）",
      recommendedUse: "推荐用途",
      maxVram: "最大显存",
      topFp16: "最高 FP16",
      topInt8: "最高 INT8"
    }
  },
  es: {
    nav: {
      brandSubtitle: "Comparativa Global de Costes y Especificaciones de Modelos AI",
      catalog: "Catálogo de Modelos",
      compare: "Comparar Modelos",
      tco: "API vs TCO Autoalojado",
      advisor: "Recomendador de Arquitectura",
      tutorial: "🎓 Tutorial",
      news: "📰 Noticias de Tendencias IA",
      leaderboard: "Tabla de Clasificación",
      gpus: "Precios y Especificaciones GPU",
      sandbox: "🧮 Tokenizer Sandbox",
      speed: "⚡ Velocidad de Inferencia",
      groupCatalog: "Catálogo principal",
      groupTools: "Sandbox y simuladores",
      groupInsights: "Soluciones e informes IA",
      compareBasket: "Comparador",
      collapseMenu: "Contraer menú"
    },
    viewMode: { grid: "Cuadrícula", table: "Tabla", compact: "Compacto" },
    quota: { title: "Límites de Tarifa", rpm: "RPM", tpm: "TPM", rpd: "RPD", concurrency: "Concurrencia" },
    researchProgress: {
      title: "Análisis Profundo en Vivo del Arquitecto AI",
      subtitle: "Calculando la combinación óptima de LLM y costes OpEx de alojamiento...",
      step1: "Analizando requisitos en lenguaje natural y especificaciones (Intent & SLA)",
      step2: "Escaneando base de datos de 50+ modelos LLM y benchmarks Arena Elo",
      step3: "Simulando tráfico para 3 combinaciones de modelos (Best, Smart, Budget)",
      step4: "Calculando costes OpEx mensuales de infraestructura (Vercel, Railway, Cloud GPU)",
      step5: "Sintetizando arquitectura de 7 secciones y Mermaid con Gemini 2.5 Flash"
    },
    dashboard: {
      title: "Explorador de Especificaciones y Precios de Modelos LLM",
      subtitle: "Compare precios API, ventana de contexto, benchmarks de rendimiento y especificaciones de más de 50 modelos LLM globales.",
      searchPlaceholder: "Buscar por nombre de modelo, proveedor...",
      allProviders: "Todos los Proveedores",
      allTiers: "Todos los Niveles",
      allLicenses: "Todas las Licencias",
      modelsFound: "modelos encontrados",
      openWeight: "Open Weight",
      proprietary: "Propietario",
      contextWindow: "Ventana de Contexto",
      inputPrice: "Precio Entrada / 1M",
      outputPrice: "Precio Salida / 1M",
      compareButton: "Comparar",
      compared: "En Comparación",
      officialDocs: "Docs Oficiales"
    },
    tco: {
      title: "Simulador TCO: API SaaS vs GPU Autoalojada",
      subtitle: "Calcule el punto de equilibrio financiero entre el pago por uso de API y el autoalojamiento con instancias Cloud GPU u On-Premise.",
      selectModel: "Seleccionar Modelo Objetivo",
      inputTokens: "Tokens de Entrada Mensuales (Millones)",
      outputTokens: "Tokens de Salida Mensuales (Millones)",
      quantization: "Cuantización Objetivo",
      recommendedOption: "Opción Recomendada",
      cheapest: "La Más Económica",
      apiCostMonthly: "Coste API Mensual",
      cloudGpuCostMonthly: "Coste Mensual Cloud GPU",
      onPremCostMonthly: "Amortización Mensual On-Premise",
      powerCostEst: "Coste Eléctrico Estimado",
      chartTitle: "Comparativa Mensual por Arquitectura ($)",
      breakEvenPoint: "Punto de Equilibrio de Tokens",
      breakEvenDesc: "Superado este volumen, el autoalojamiento (Cloud GPU / On-Premise) resulta más rentable que las llamadas a la API SaaS.",
      step1Provider: "Paso 1: Seleccionar proveedor",
      step2Model: "Paso 2: Seleccionar modelo",
      modelsFound: "modelos encontrados",
      vramNeeded: "VRAM necesaria:",
      modelWeights: "- Pesos del modelo:",
      recommendedGpu: "Configuración de GPU recomendada:"
    },
    leaderboard: {
      title: "Clasificación Mundial de Rendimiento de Modelos AI",
      subtitle: "Basado en LMSYS Chatbot Arena Elo, SWE-bench, MMLU-Pro y GPQA.",
      tabArenaElo: "LMSYS Arena Elo",
      tabSweBench: "SWE-bench (Código)",
      tabMmluPro: "MMLU-Pro (Conocimiento)",
      tabGpqa: "GPQA (Razonamiento)",
      rank: "Rango",
      model: "Nombre del Modelo",
      provider: "Proveedor",
      tier: "Nivel",
      score: "Puntuación",
      scrollHint: "Esta tabla se desplaza horizontalmente.",
      tableCaption: "Datos de análisis"
    },
    sandbox: {
      subtitle: "Tokenizador de prompts en tiempo real y calculadora de costes de API",
      description: "Escribe un prompt para ver los tokens estimados, el coste por llamada y el coste mensual comparados entre más de 580 modelos.",
      promptInput: "📝 Entrada del prompt",
      chars: "caracteres",
      approxInputTokens: "tokens de entrada",
      approx: "~",
      promptPlaceholder: "Escribe cualquier prompt para calcular su coste...",
      loadSample: "Cargar un prompt de ejemplo:",
      sampleRag: "🔍 Preguntas y respuestas con RAG",
      sampleCode: "💻 Refactorización de código y revisión de errores",
      sampleExec: "📊 Resumen ejecutivo y análisis de TCO",
      simSetup: "⚙️ Ajustes de lote y tokens de salida",
      outputTokens: "Tokens de salida previstos",
      outputTokensAria: "Tokens de salida previstos",
      outShort: "50 (respuesta breve)",
      outTypical: "1000 (típico)",
      outLong: "4096 (informe largo)",
      batchRequests: "Llamadas de API mensuales (lote)",
      callOnce: "1 llamada",
      callSuffix: "llamadas",
      totalTokensPerCall: "Tokens totales por llamada:",
      inputLabel: "- Entrada:",
      outputLabel: "- Salida:",
      monthlyTrafficTokens: "Tokens de tráfico mensual:",
      tableTitle: "📊 Tabla de costes precisa para más de 580 modelos",
      tableDesc: "Comparación de coste por llamada y mensual según tus tokens de entrada y salida",
      searchPlaceholder: "Buscar modelo o proveedor...",
      tierFilterAria: "Filtro de nivel de modelo",
      allTiers: "Todos los niveles",
      colModel: "Modelo y proveedor",
      colTier: "Nivel / licencia",
      colInput1M: "Entrada por 1M tokens ($)",
      colOutput1M: "Salida por 1M tokens ($)",
      colPerCall: "Coste estimado por llamada ($)",
      colMonthly: "Coste mensual estimado ($)",
      colCompare: "Comparar",
      openWeight: "Abierto",
      proprietary: "Propietario",
      comparing: "Comparando",
      addCompare: "+ Comparar"
    },
    speed: {
      subtitle: "Benchmarks de latencia (TTFT) y rendimiento (TPS) por proveedor",
      description: "Un mismo modelo puede ser hasta 15× más rápido o lento según la arquitectura de servicio (Groq LPU, Cerebras WSE o clúster H100). Compara la infraestructura en tiempo real.",
      targetModel: "Modelo objetivo:",
      modelLlamaTag: "modelo abierto insignia",
      modelDeepseekTag: "centrado en razonamiento",
      tabTps: "🚀 Velocidad de salida (TPS: más alto es mejor)",
      tabTtft: "⏱️ Tiempo al primer token (TTFT ms: más bajo es mejor)",
      chartByProvider: "📊 Por proveedor:",
      metricTps: "tokens generados por segundo",
      metricTtft: "tiempo al primer token (TTFT ms)",
      refreshed: "Datos en vivo actualizados",
      legendTps: "Velocidad de salida",
      legendTtft: "Tiempo al primer token",
      rankTitle: "🏆 Ranking de infraestructura de servicio"
    },
    compare: {
      emptyTitle: "No hay modelos seleccionados para comparar.",
      emptyDesc: "Añade modelos desde el catálogo con el botón '+ Comparar' de cada tarjeta.",
      tableAria: "Tabla comparativa de modelos, desplazamiento horizontal"
    },
    gpu: {
      title: "Especificaciones GPU y Precios de Alquiler en la Nube",
      subtitle: "VRAM, ancho de banda de memoria, MSRP y precios de alquiler por hora en la nube para GPUs NVIDIA.",
      vram: "VRAM",
      bandwidth: "Ancho de Banda",
      purchasePrice: "Precio MSRP",
      cloudOnDemand: "Cloud Bajo Demanda",
      cloudSpot: "Cloud Spot",
      tabAll: "Ver todas",
      tabEnterprise: "🏢 Centro de datos",
      tabProsumer: "🔬 Estación de trabajo",
      tabConsumer: "💻 Consumo",
      groupEnterprise: "🏢 GPUs de centro de datos",
      groupProsumer: "🔬 Estación de trabajo prosumer",
      groupConsumer: "💻 Consumo",
      perfBandwidth: "Ancho de banda de memoria",
      perfFp16: "Rendimiento FP16",
      perfInt8: "Inferencia INT8",
      cudaCores: "Núcleos CUDA",
      tensorCores: "Núcleos Tensor",
      noCloud: "Sin oferta en la nube (solo on-premise)",
      recommendedUse: "Uso recomendado",
      maxVram: "VRAM máxima",
      topFp16: "FP16 máximo",
      topInt8: "INT8 máximo"
    }
  },
  de: {
    nav: {
      brandSubtitle: "Globaler KI-Modell Kosten- & Spezifikationsvergleich",
      catalog: "Modellkatalog",
      compare: "Modellvergleich",
      tco: "API vs Self-Host TCO",
      advisor: "Architektur-Empfehlungen",
      tutorial: "🎓 Tutorial",
      news: "📰 KI Trend-News",
      leaderboard: "Bestenliste",
      gpus: "GPU Preise & Specs",
      sandbox: "🧮 Tokenizer Sandbox",
      speed: "⚡ Live-Inferenzgeschwindigkeit",
      groupCatalog: "Hauptkatalog",
      groupTools: "Sandbox & Simulatoren",
      groupInsights: "KI-Lösungen & Berichte",
      compareBasket: "Vergleich",
      collapseMenu: "Menü einklappen"
    },
    viewMode: { grid: "Raster", table: "Tabelle", compact: "Kompakt" },
    quota: { title: "Ratenlimits", rpm: "RPM", tpm: "TPM", rpd: "RPD", concurrency: "Nebenläufigkeit" },
    researchProgress: {
      title: "AI Solution Architect Live-Tiefenanalyse",
      subtitle: "Berechnung der optimalen LLM-Kombinationen und OpEx-Hosting-Kosten...",
      step1: "Analyse der Anforderungsspezifikationen in natürlicher Sprache (Intent & SLA)",
      step2: "Scannen von 50+ globalen LLM-Datenbanken & Arena Elo Benchmarks",
      step3: "Simulation für 3 Modellkombinationen (Best, Smart, Budget)",
      step4: "Berechnung monatlicher OpEx-Infrastrukturkosten (Vercel, Railway, Cloud GPU)",
      step5: "Erstellung der 7-Kapitel-Architektur & Mermaid-Spezifikation mit Gemini 2.5 Flash"
    },
    dashboard: {
      title: "LLM Modell Spezifikationen & Preis-Explorer",
      subtitle: "Vergleichen Sie API-Preise, Kontextfenster, Performance-Benchmarks und Spezifikationen von über 50 globalen LLM-Modellen.",
      searchPlaceholder: "Nach Modellnamen, Anbieter suchen...",
      allProviders: "Alle Anbieter",
      allTiers: "Alle Stufen",
      allLicenses: "Alle Lizenzen",
      modelsFound: "Modelle gefunden",
      openWeight: "Open Weight",
      proprietary: "Proprietär",
      contextWindow: "Kontextfenster",
      inputPrice: "Input Preis / 1M",
      outputPrice: "Output Preis / 1M",
      compareButton: "Vergleichen",
      compared: "Im Vergleich",
      officialDocs: "Offizielle Doku"
    },
    tco: {
      title: "TCO Simulator: SaaS API vs. Self-Hosted GPU",
      subtitle: "Berechnen Sie den Break-Even-Point zwischen API Pay-as-you-go und Self-Hosting auf Cloud-GPUs oder On-Premise-Hardware.",
      selectModel: "Zielmodell auswählen",
      inputTokens: "Monatliche Input-Tokens (Mio.)",
      outputTokens: "Monatliche Output-Tokens (Mio.)",
      quantization: "Ziel-Quantisierung",
      recommendedOption: "Empfohlene Option",
      cheapest: "Günstigste Option",
      apiCostMonthly: "Monatliche API-Kosten",
      cloudGpuCostMonthly: "Monatliche Cloud GPU-Kosten",
      onPremCostMonthly: "Monatliche On-Prem Abschreibung",
      powerCostEst: "Geschätzte Stromkosten",
      chartTitle: "Monatlicher Kostenvergleich nach Architektur ($)",
      breakEvenPoint: "Token Break-Even-Point",
      breakEvenDesc: "Ab diesem Volumen ist Self-Hosting (Cloud GPU / On-Premise) kostengünstiger als SaaS API-Aufrufe.",
      step1Provider: "Schritt 1: Anbieter wählen",
      step2Model: "Schritt 2: KI-Modell wählen",
      modelsFound: "Modelle gefunden",
      vramNeeded: "Benötigter VRAM:",
      modelWeights: "- Modellgewichte:",
      recommendedGpu: "Empfohlene GPU-Konfiguration:"
    },
    leaderboard: {
      title: "Globale KI-Modell Performance Bestenliste",
      subtitle: "Basierend auf LMSYS Chatbot Arena Elo, SWE-bench, MMLU-Pro und GPQA.",
      tabArenaElo: "LMSYS Arena Elo",
      tabSweBench: "SWE-bench (Code)",
      tabMmluPro: "MMLU-Pro (Wissen)",
      tabGpqa: "GPQA (Logik)",
      rank: "Rang",
      model: "Modellname",
      provider: "Anbieter",
      tier: "Stufe",
      score: "Score",
      scrollHint: "Diese Tabelle lässt sich horizontal scrollen.",
      tableCaption: "Analysedaten"
    },
    sandbox: {
      subtitle: "Echtzeit-Prompt-Tokenizer & API-Kostenrechner pro Modell",
      description: "Geben Sie einen Prompt ein, um geschätzte Tokens, Kosten pro Aufruf und monatliche Batch-Kosten über 580+ Modelle hinweg zu vergleichen.",
      promptInput: "📝 Prompt-Eingabe",
      chars: "Zeichen",
      approxInputTokens: "Eingabe-Tokens",
      approx: "ca.",
      promptPlaceholder: "Geben Sie einen beliebigen Prompt ein, um die Kosten zu berechnen ...",
      loadSample: "Beispiel-Prompt laden:",
      sampleRag: "🔍 RAG-Wissens-Q&A",
      sampleCode: "💻 Code-Refactoring & Fehlerprüfung",
      sampleExec: "📊 Executive Summary & TCO-Analyse",
      simSetup: "⚙️ Batch- und Ausgabe-Token-Einstellungen",
      outputTokens: "Erwartete Ausgabe-Tokens",
      outputTokensAria: "Erwartete Ausgabe-Tokens",
      outShort: "50 (kurze Antwort)",
      outTypical: "1.000 (typisch)",
      outLong: "4.096 (langer Bericht)",
      batchRequests: "Monatliche API-Aufrufe (Batch)",
      callOnce: "1 Aufruf",
      callSuffix: "Aufrufe",
      totalTokensPerCall: "Gesamt-Tokens pro Aufruf:",
      inputLabel: "- Eingabe:",
      outputLabel: "- Ausgabe:",
      monthlyTrafficTokens: "Monatliche Traffic-Tokens:",
      tableTitle: "📊 Präzise Kostentabelle für 580+ Modelle",
      tableDesc: "Vergleich der Kosten pro Aufruf und pro Monat auf Basis Ihrer Eingabe- und Ausgabe-Tokens",
      searchPlaceholder: "Modell oder Anbieter suchen ...",
      tierFilterAria: "Modellstufen-Filter",
      allTiers: "Alle Stufen",
      colModel: "Modell & Anbieter",
      colTier: "Stufe / Lizenz",
      colInput1M: "Eingabe pro 1 Mio. Tokens ($)",
      colOutput1M: "Ausgabe pro 1 Mio. Tokens ($)",
      colPerCall: "Gesch. Kosten pro Aufruf ($)",
      colMonthly: "Gesch. Monatskosten ($)",
      colCompare: "Vergleich",
      openWeight: "Offen",
      proprietary: "Proprietär",
      comparing: "Im Vergleich",
      addCompare: "+ Vergleichen"
    },
    speed: {
      subtitle: "Benchmarks für Latenz (TTFT) und Durchsatz (TPS) nach Anbieter",
      description: "Dasselbe Modell kann je nach Serving-Architektur (Groq LPU, Cerebras WSE oder H100-Cluster) bis zu 15× schneller oder langsamer laufen. Vergleichen Sie die Infrastruktur in Echtzeit.",
      targetModel: "Zielmodell:",
      modelLlamaTag: "führendes offenes Modell",
      modelDeepseekTag: "auf Reasoning spezialisiert",
      tabTps: "🚀 Ausgabegeschwindigkeit (TPS – höher ist besser)",
      tabTtft: "⏱️ Zeit bis zum ersten Token (TTFT ms – niedriger ist besser)",
      chartByProvider: "📊 Nach Anbieter:",
      metricTps: "generierte Tokens pro Sekunde",
      metricTtft: "Zeit bis zum ersten Token (TTFT ms)",
      refreshed: "Live-Daten aktualisiert",
      legendTps: "Ausgabegeschwindigkeit",
      legendTtft: "Zeit bis zum ersten Token",
      rankTitle: "🏆 Rangliste der Serving-Infrastruktur"
    },
    compare: {
      emptyTitle: "Keine Modelle zum Vergleich ausgewählt.",
      emptyDesc: "Fügen Sie Modelle im Katalog über die Schaltfläche '+ Vergleichen' auf jeder Karte hinzu.",
      tableAria: "Modellvergleichstabelle, horizontal scrollbar"
    },
    gpu: {
      title: "KI-Inferenz GPU Specs & Cloud-Mietpreise",
      subtitle: "VRAM, Speicherbandbreite, UVP und stündliche Cloud-Mietpreise für NVIDIA GPUs.",
      vram: "VRAM",
      bandwidth: "Speicherbandbreite",
      purchasePrice: "UVP Preis",
      cloudOnDemand: "Cloud On-Demand",
      cloudSpot: "Cloud Spot",
      tabAll: "Alle anzeigen",
      tabEnterprise: "🏢 Rechenzentrum",
      tabProsumer: "🔬 Workstation",
      tabConsumer: "💻 Consumer",
      groupEnterprise: "🏢 Rechenzentrums-GPUs",
      groupProsumer: "🔬 Prosumer-Workstation",
      groupConsumer: "💻 Consumer",
      perfBandwidth: "Speicherbandbreite",
      perfFp16: "FP16-Rechenleistung",
      perfInt8: "INT8-Inferenz",
      cudaCores: "CUDA-Kerne",
      tensorCores: "Tensor-Kerne",
      noCloud: "Kein Cloud-Angebot (nur On-Premise)",
      recommendedUse: "Empfohlener Einsatz",
      maxVram: "Max. VRAM",
      topFp16: "Max. FP16",
      topInt8: "Max. INT8"
    }
  },
  fr: {
    nav: {
      brandSubtitle: "Comparatif Global de Coûts et Spécifications des Modèles IA",
      catalog: "Catalogue de Modèles",
      compare: "Comparer les Modèles",
      tco: "API vs TCO Auto-hébergé",
      advisor: "Recommandateur d'Architecture",
      tutorial: "🎓 Tutoriel",
      news: "📰 Actualités des Tendances IA",
      leaderboard: "Classement Général",
      gpus: "Spécifications & Prix GPU",
      sandbox: "🧮 Bac à sable Tokenizer",
      speed: "⚡ Vitesse d'inférence en direct",
      groupCatalog: "Catalogue principal",
      groupTools: "Bac à sable & simulateurs",
      groupInsights: "Solutions & rapports IA",
      compareBasket: "Comparateur",
      collapseMenu: "Réduire le menu"
    },
    viewMode: { grid: "Grille", table: "Tableau", compact: "Compact" },
    quota: { title: "Limites de Débit", rpm: "RPM", tpm: "TPM", rpd: "RPD", concurrency: "Concurrence" },
    researchProgress: {
      title: "Analyse Approfondie en Direct par l'Architecte IA",
      subtitle: "Calcul des combinaisons LLM optimales et des coûts d'hébergement OpEx...",
      step1: "Analyse des exigences en langage naturel et des spécifications (Intent & SLA)",
      step2: "Balayage de la base de données de 50+ modèles LLM et benchmarks Arena Elo",
      step3: "Simulation de trafic pour 3 combinaisons de modèles (Best, Smart, Budget)",
      step4: "Calcul des coûts d'infrastructure OpEx mensuels (Vercel, Railway, Cloud GPU)",
      step5: "Synthèse de l'architecture en 7 sections et Mermaid avec Gemini 2.5 Flash"
    },
    dashboard: {
      title: "Explorateur de Tarifs et Spécifications des Modèles LLM",
      subtitle: "Comparez les prix des API, la fenêtre de contexte, les benchmarks et les spécifications de plus de 50 modèles LLM mondiaux.",
      searchPlaceholder: "Rechercher par nom de modèle, fournisseur...",
      allProviders: "Tous les Fournisseurs",
      allTiers: "Tous les Niveaux",
      allLicenses: "Toutes les Licences",
      modelsFound: "modèles trouvés",
      openWeight: "Open Weight",
      proprietary: "Propriétaire",
      contextWindow: "Fenêtre de Contexte",
      inputPrice: "Prix Entrée / 1M",
      outputPrice: "Prix Sortie / 1M",
      compareButton: "Comparer",
      compared: "Comparé",
      officialDocs: "Docs Officielles"
    },
    tco: {
      title: "Simulateur TCO : API SaaS vs GPU Auto-hébergé",
      subtitle: "Calculez le point d'équilibre financier entre la facturation API à l'usage et l'auto-hébergement sur Cloud GPU ou On-Premise.",
      selectModel: "Sélectionner le Modèle Cible",
      inputTokens: "Tokens d'Entrée Mensuels (Millions)",
      outputTokens: "Tokens de Sortie Mensuels (Millions)",
      quantization: "Quantification Cible",
      recommendedOption: "Option Recommandée",
      cheapest: "La Plus Économique",
      apiCostMonthly: "Coût Mensuel API",
      cloudGpuCostMonthly: "Coût Mensuel Cloud GPU",
      onPremCostMonthly: "Amortissement Mensuel On-Premise",
      powerCostEst: "Coût Électrique Estimé",
      chartTitle: "Comparatif Mensuel des Coûts par Architecture ($)",
      breakEvenPoint: "Seuil de Rentabilité en Tokens",
      breakEvenDesc: "Au-delà de ce volume, l'auto-hébergement (Cloud GPU / On-Premise) est plus rentable que les appels API SaaS.",
      step1Provider: "Étape 1 : Choisir le fournisseur",
      step2Model: "Étape 2 : Choisir le modèle",
      modelsFound: "modèles trouvés",
      vramNeeded: "VRAM requise :",
      modelWeights: "- Poids du modèle :",
      recommendedGpu: "Configuration GPU recommandée :"
    },
    leaderboard: {
      title: "Classement Mondial de Performance des Modèles IA",
      subtitle: "Basé sur LMSYS Chatbot Arena Elo, SWE-bench, MMLU-Pro et GPQA.",
      tabArenaElo: "LMSYS Arena Elo",
      tabSweBench: "SWE-bench (Code)",
      tabMmluPro: "MMLU-Pro (Savoir)",
      tabGpqa: "GPQA (Raisonnement)",
      rank: "Rang",
      model: "Nom du Modèle",
      provider: "Fournisseur",
      tier: "Niveau",
      score: "Score",
      scrollHint: "Ce tableau défile horizontalement.",
      tableCaption: "Données d’analyse"
    },
    sandbox: {
      subtitle: "Tokeniseur de prompt en temps réel et calculateur de coûts d’API",
      description: "Saisissez un prompt pour comparer en temps réel les tokens estimés, le coût par appel et le coût mensuel sur plus de 580 modèles.",
      promptInput: "📝 Saisie du prompt",
      chars: "caractères",
      approxInputTokens: "tokens d’entrée",
      approx: "~",
      promptPlaceholder: "Saisissez un prompt pour en calculer le coût...",
      loadSample: "Charger un exemple de prompt :",
      sampleRag: "🔍 Questions-réponses RAG",
      sampleCode: "💻 Refactorisation de code et revue de bugs",
      sampleExec: "📊 Synthèse exécutive et analyse du TCO",
      simSetup: "⚙️ Réglages du lot et des tokens de sortie",
      outputTokens: "Tokens de sortie attendus",
      outputTokensAria: "Tokens de sortie attendus",
      outShort: "50 (réponse courte)",
      outTypical: "1 000 (typique)",
      outLong: "4 096 (rapport long)",
      batchRequests: "Appels d’API mensuels (lot)",
      callOnce: "1 appel",
      callSuffix: "appels",
      totalTokensPerCall: "Tokens totaux par appel :",
      inputLabel: "- Entrée :",
      outputLabel: "- Sortie :",
      monthlyTrafficTokens: "Tokens de trafic mensuel :",
      tableTitle: "📊 Tableau de coûts précis pour 580+ modèles",
      tableDesc: "Comparaison du coût par appel et mensuel selon vos tokens d’entrée et de sortie",
      searchPlaceholder: "Rechercher un modèle ou un fournisseur...",
      tierFilterAria: "Filtre de niveau de modèle",
      allTiers: "Tous les niveaux",
      colModel: "Modèle et fournisseur",
      colTier: "Niveau / licence",
      colInput1M: "Entrée par 1 M tokens ($)",
      colOutput1M: "Sortie par 1 M tokens ($)",
      colPerCall: "Coût estimé par appel ($)",
      colMonthly: "Coût mensuel estimé ($)",
      colCompare: "Comparer",
      openWeight: "Ouvert",
      proprietary: "Propriétaire",
      comparing: "En comparaison",
      addCompare: "+ Comparer"
    },
    speed: {
      subtitle: "Benchmarks de latence (TTFT) et de débit (TPS) par fournisseur",
      description: "Un même modèle peut être jusqu’à 15× plus rapide ou plus lent selon l’architecture de service (Groq LPU, Cerebras WSE ou cluster H100). Comparez l’infrastructure en temps réel.",
      targetModel: "Modèle cible :",
      modelLlamaTag: "modèle ouvert phare",
      modelDeepseekTag: "axé sur le raisonnement",
      tabTps: "🚀 Vitesse de sortie (TPS — plus c’est haut, mieux c’est)",
      tabTtft: "⏱️ Délai avant le premier token (TTFT ms — plus c’est bas, mieux c’est)",
      chartByProvider: "📊 Par fournisseur :",
      metricTps: "tokens générés par seconde",
      metricTtft: "délai avant le premier token (TTFT ms)",
      refreshed: "Données en direct actualisées",
      legendTps: "Vitesse de sortie",
      legendTtft: "Délai avant le premier token",
      rankTitle: "🏆 Classement des infrastructures de service"
    },
    compare: {
      emptyTitle: "Aucun modèle sélectionné pour la comparaison.",
      emptyDesc: "Ajoutez des modèles depuis le catalogue via le bouton « + Comparer » de chaque carte.",
      tableAria: "Tableau comparatif des modèles, défilement horizontal"
    },
    gpu: {
      title: "Spécifications GPU et Tarifs de Location Cloud",
      subtitle: "VRAM, bande passante mémoire, prix conseillé et tarifs de location horaire sur le Cloud pour les GPUs NVIDIA.",
      vram: "VRAM",
      bandwidth: "Bande Passante",
      purchasePrice: "Prix Conseillé",
      cloudOnDemand: "Cloud Sur Demande",
      cloudSpot: "Cloud Spot",
      tabAll: "Tout afficher",
      tabEnterprise: "🏢 Centre de données",
      tabProsumer: "🔬 Station de travail",
      tabConsumer: "💻 Grand public",
      groupEnterprise: "🏢 GPU de centre de données",
      groupProsumer: "🔬 Station de travail prosumer",
      groupConsumer: "💻 Grand public",
      perfBandwidth: "Bande passante mémoire",
      perfFp16: "Performance FP16",
      perfInt8: "Inférence INT8",
      cudaCores: "Cœurs CUDA",
      tensorCores: "Cœurs Tensor",
      noCloud: "Pas d’offre cloud (sur site uniquement)",
      recommendedUse: "Usage recommandé",
      maxVram: "VRAM max",
      topFp16: "FP16 max",
      topInt8: "INT8 max"
    }
  }
};
