export type Language = 'ko' | 'en' | 'ja' | 'zh' | 'es' | 'de' | 'fr';

export interface TranslationDictionary {
  nav: {
    brandSubtitle: string;
    catalog: string;
    compare: string;
    tco: string;
    advisor: string;
    leaderboard: string;
    gpus: string;
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
  };
  gpu: {
    title: string;
    subtitle: string;
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
      leaderboard: "리더보드",
      gpus: "GPU 스펙 & 비용"
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
    dashboard: {
      title: "글로벌 LLM 모델 카탈로그",
      subtitle: "OpenAI, Anthropic, Google, AWS Bedrock, DeepSeek, Meta 등 142+ AI 전체 모델 공식 출처(Official Docs) 기반 스펙, 비용, 할당량 및 벤치마크 비교",
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
      breakEvenDesc: "해당 사용량 이상일 경우 SaaS API 대신 독립 인프라(Cloud GPU / On-Premise) 구축이 경제적으로 유리합니다."
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
      score: "점수"
    },
    gpu: {
      title: "AI 추론용 GPU 스펙 및 클라우드 대여 비용",
      subtitle: "NVIDIA 데이터센터 & 컨슈머 GPU의 VRAM, 대역폭, 구매가, 클라우드 Hourly 인스턴스 비용 정보",
      vram: "VRAM 용량",
      bandwidth: "메모리 대역폭",
      purchasePrice: "하드웨어 권장 소비자가",
      cloudOnDemand: "클라우드 On-Demand",
      cloudSpot: "클라우드 Spot 인스턴스"
    }
  },
  en: {
    nav: {
      brandSubtitle: "Global AI Model TCO & Spec Comparison",
      catalog: "Model Catalog",
      compare: "Compare",
      tco: "TCO Simulator",
      advisor: "🏆 Architecture Advisor",
      leaderboard: "Leaderboard",
      gpus: "GPU Specs & Costs"
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
    dashboard: {
      title: "Global LLM Model Catalog",
      subtitle: "Compare official specs, pricing, rate limits, and benchmarks for 142+ LLMs with verified official documentation source links",
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
      breakEvenDesc: "Above this token threshold, dedicated infrastructure (Cloud GPU / On-Premise) is more cost-effective than SaaS API calls."
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
      score: "Score"
    },
    gpu: {
      title: "AI Inference GPU Specs & Cloud Hosting Rates",
      subtitle: "Hardware specs, VRAM bandwidth, MSRP, and hourly cloud rental rates for NVIDIA enterprise and consumer GPUs",
      vram: "VRAM Capacity",
      bandwidth: "Memory Bandwidth",
      purchasePrice: "MSRP Purchase Price",
      cloudOnDemand: "Cloud On-Demand Rate",
      cloudSpot: "Cloud Spot Rate"
    }
  },
  ja: {
    nav: {
      brandSubtitle: "世界AIモデルTCO・スペック比較",
      catalog: "모델カタログ",
      compare: "カスタム比較",
      tco: "TCOシミュレーター",
      advisor: "🏆 AIアーキテクチャ推薦",
      leaderboard: "リーダーボード",
      gpus: "GPUスペック・コスト"
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
      outputTokens: "月間出力トークン (1,000,000単位)",
      quantization: "量子化レベル (Quantization)",
      recommendedOption: "推奨インフラ構成",
      cheapest: "最安値オプション",
      apiCostMonthly: "SaaS API 月額コスト",
      cloudGpuCostMonthly: "Cloud GPU 月額コスト",
      onPremCostMonthly: "On-Premise 減価償却月額",
      powerCostEst: "推定月間電気代",
      chartTitle: "インフラ構成別月額費用比較 ($)",
      breakEvenPoint: "損益分岐点トークン量",
      breakEvenDesc: "この使用量を超えると、API利用よりも専用インフラ構築の方が経済的です。"
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
      score: "スコア"
    },
    gpu: {
      title: "AI推論用GPUスペック・クラウド利用料",
      subtitle: "NVIDIAデータセンター＆コンシューマーGPUのVRAM、帯域幅、価格、クラウドレンタル料金",
      vram: "VRAM容量",
      bandwidth: "メモリ帯域幅",
      purchasePrice: "推奨販売価格",
      cloudOnDemand: "クラウド On-Demand",
      cloudSpot: "クラウド Spot"
    }
  },
  zh: {
    nav: {
      brandSubtitle: "全球 AI 模型 TCO 与规格对比",
      catalog: "模型目录",
      compare: "自定义对比",
      tco: "TCO 模拟器",
      advisor: "🏆 AI 架构推荐器",
      leaderboard: "排行榜",
      gpus: "GPU 规格与成本"
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
      breakEvenDesc: "超过此使用量时，部署独立架构 (Cloud GPU / On-Premise) 比调用 API 更具性价比。"
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
      score: "得分"
    },
    gpu: {
      title: "AI 推理 GPU 规格与云端租用价格",
      subtitle: "NVIDIA 企业级与消费级 GPU 的 VRAM、内存带宽、官方指导价及云端按时计费价格",
      vram: "VRAM 容量",
      bandwidth: "内存带宽",
      purchasePrice: "官方指导价",
      cloudOnDemand: "云端 On-Demand",
      cloudSpot: "云端 Spot 实例"
    }
  },
  es: {
    nav: {
      brandSubtitle: "Comparativa Global de Costes y Especificaciones de Modelos AI",
      catalog: "Catálogo de Modelos",
      compare: "Comparar Modelos",
      tco: "API vs TCO Autoalojado",
      advisor: "Recomendador de Arquitectura",
      leaderboard: "Tabla de Clasificación",
      gpus: "Precios y Especificaciones GPU"
    },
    viewMode: { grid: "Cuadrícula", table: "Tabla", compact: "Compacto" },
    quota: { title: "Límites de Tarifa", rpm: "RPM", tpm: "TPM", rpd: "RPD", concurrency: "Concurrencia" },
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
      breakEvenDesc: "Superado este volumen, el autoalojamiento (Cloud GPU / On-Premise) resulta más rentable que las llamadas a la API SaaS."
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
      score: "Puntuación"
    },
    gpu: {
      title: "Especificaciones GPU y Precios de Alquiler en la Nube",
      subtitle: "VRAM, ancho de banda de memoria, MSRP y precios de alquiler por hora en la nube para GPUs NVIDIA.",
      vram: "VRAM",
      bandwidth: "Ancho de Banda",
      purchasePrice: "Precio MSRP",
      cloudOnDemand: "Cloud Bajo Demanda",
      cloudSpot: "Cloud Spot"
    }
  },
  de: {
    nav: {
      brandSubtitle: "Globaler KI-Modell Kosten- & Spezifikationsvergleich",
      catalog: "Modellkatalog",
      compare: "Modellvergleich",
      tco: "API vs Self-Host TCO",
      advisor: "Architektur-Empfehlungen",
      leaderboard: "Bestenliste",
      gpus: "GPU Preise & Specs"
    },
    viewMode: { grid: "Raster", table: "Tabelle", compact: "Kompakt" },
    quota: { title: "Ratenlimits", rpm: "RPM", tpm: "TPM", rpd: "RPD", concurrency: "Nebenläufigkeit" },
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
      breakEvenDesc: "Ab diesem Volumen ist Self-Hosting (Cloud GPU / On-Premise) kostengünstiger als SaaS API-Aufrufe."
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
      score: "Score"
    },
    gpu: {
      title: "KI-Inferenz GPU Specs & Cloud-Mietpreise",
      subtitle: "VRAM, Speicherbandbreite, UVP und stündliche Cloud-Mietpreise für NVIDIA GPUs.",
      vram: "VRAM",
      bandwidth: "Speicherbandbreite",
      purchasePrice: "UVP Preis",
      cloudOnDemand: "Cloud On-Demand",
      cloudSpot: "Cloud Spot"
    }
  },
  fr: {
    nav: {
      brandSubtitle: "Comparatif Global de Coûts et Spécifications des Modèles IA",
      catalog: "Catalogue de Modèles",
      compare: "Comparer les Modèles",
      tco: "API vs TCO Auto-hébergé",
      advisor: "Recommandateur d'Architecture",
      leaderboard: "Classement Général",
      gpus: "Spécifications & Prix GPU"
    },
    viewMode: { grid: "Grille", table: "Tableau", compact: "Compact" },
    quota: { title: "Limites de Débit", rpm: "RPM", tpm: "TPM", rpd: "RPD", concurrency: "Concurrence" },
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
      breakEvenDesc: "Au-delà de ce volume, l'auto-hébergement (Cloud GPU / On-Premise) est plus rentable que les appels API SaaS."
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
      score: "Score"
    },
    gpu: {
      title: "Spécifications GPU et Tarifs de Location Cloud",
      subtitle: "VRAM, bande passante mémoire, prix conseillé et tarifs de location horaire sur le Cloud pour les GPUs NVIDIA.",
      vram: "VRAM",
      bandwidth: "Bande Passante",
      purchasePrice: "Prix Conseillé",
      cloudOnDemand: "Cloud Sur Demande",
      cloudSpot: "Cloud Spot"
    }
  }
};
