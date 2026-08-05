import { useState, useEffect, useMemo } from 'react';
import { Newspaper, Users, Lightbulb, Briefcase, Microscope, ExternalLink, Activity, Hash, Clock, RefreshCw, Search, X } from 'lucide-react';
import { API_BASE_URL } from '../api';
import { useLanguage } from '../context/LanguageContext';

interface ActionableInsight {
  developer?: string;
  pm?: string;
  business?: string;
  researcher?: string;
}

interface NewsArticle {
  id: string;
  title: string;
  source_name: string;
  source_url: string;
  published_at: string;
  category: string;
  image_url?: string;
  summary_bullets: string[];
  blog_summary?: string;
  actionable_insight: ActionableInsight | null;
  impact_score: number;
  tags: string[];
  matched_lenses: string[];
}

interface NewsResponse {
  articles: NewsArticle[];
  total_count: number;
  last_updated: string;
}

const I18N_TEXTS = {
  ko: {
    title: "AI 트렌드 뉴스 2.0",
    subtitle: "실시간 AI 트렌드와 내 업무에 바로 적용하는 실전 팁",
    pulses: "개 펄스",
    updated: "방금 전 갱신",
    refresh: "새로고침",
    searchPlaceholder: "🔍 AI 트렌드 뉴스 키워드, 기업, 기술 검색 (예: OpenAI, Agent, 보안...)",
    searchResultCount: "개 기사 검색됨",
    factTitle: "핵심 3줄 요약 (Fact)",
    insightTitle: "실전 활용 팁 (Actionable Insight)",
    readOriginal: "원문 기사 전문 보러가기",
    modalBadge: "📖 AI 심층 기술 블로그 리포트",
    modalClose: "닫기",
    devLabel: "[개발자]",
    pmLabel: "[기획/PM]",
    bizLabel: "[비즈니스]",
    resLabel: "[연구/학계]",
    lenses: {
      all: '🔥 전체',
      developer: '👩‍💻 코딩 & 프레임워크',
      agent: '🤖 Agent & 오토메이션',
      pm: '💡 기획 & UX',
      business: '💼 비즈니스 & TCO',
      researcher: '🔬 최신 논문 & 학계'
    }
  },
  en: {
    title: "AI Trend News 2.0",
    subtitle: "Real-time AI trends & actionable insights for your workflow",
    pulses: "Pulses",
    updated: "Just updated",
    refresh: "Refresh",
    searchPlaceholder: "🔍 Search keywords, tech, company (e.g. OpenAI, Agent, Security...)",
    searchResultCount: "articles found",
    factTitle: "Key 3-Bullet Summary (Fact)",
    insightTitle: "Actionable Insights by Role",
    readOriginal: "Read Full Source Article",
    modalBadge: "📖 AI Technical Deep-Dive Report",
    modalClose: "Close",
    devLabel: "[Developer]",
    pmLabel: "[PM/Product]",
    bizLabel: "[Business]",
    resLabel: "[Researcher]",
    lenses: {
      all: '🔥 All Feed',
      developer: '👩‍💻 Coding & Dev',
      agent: '🤖 Agent & Automation',
      pm: '💡 Product & UX',
      business: '💼 Business & TCO',
      researcher: '🔬 Research & Papers'
    }
  },
  ja: {
    title: "AI トレンドニュース 2.0",
    subtitle: "リアルタイムAIトレンドと実務に直結する活用ヒント",
    pulses: "件のパルス",
    updated: "更新完了",
    refresh: "更新",
    searchPlaceholder: "🔍 キーワード・技術・企業検索 (例: OpenAI, Agent, セキュリティ...)",
    searchResultCount: "件ヒット",
    factTitle: "要約 3つのポイント (Fact)",
    insightTitle: "職種別活用ヒント (Actionable Insight)",
    readOriginal: "原文記事の全文を見る",
    modalBadge: "📖 AI 詳細技術レポート",
    modalClose: "閉じる",
    devLabel: "[開発者]",
    pmLabel: "[企画/PM]",
    bizLabel: "[ビジネス]",
    resLabel: "[研究/学術]",
    lenses: {
      all: '🔥 全体',
      developer: '👩‍💻 コーディング＆開発',
      agent: '🤖 エージェント＆自動化',
      pm: '💡 企画＆UX',
      business: '💼 ビジネス＆TCO',
      researcher: '🔬 最新論文＆学術'
    }
  },
  zh: {
    title: "AI 趋势新闻 2.0",
    subtitle: "实时 AI 趋势与业务应用实践指南",
    pulses: "条脉搏",
    updated: "刚刚更新",
    refresh: "刷新",
    searchPlaceholder: "🔍 搜索关键词、技术或公司 (例: OpenAI, Agent, 安全...)",
    searchResultCount: "条结果",
    factTitle: "核心 3 条摘要 (Fact)",
    insightTitle: "岗位应用提示 (Actionable Insight)",
    readOriginal: "查看原文全文",
    modalBadge: "📖 AI 深度技术报告",
    modalClose: "关闭",
    devLabel: "[开发者]",
    pmLabel: "[产品/PM]",
    bizLabel: "[商业]",
    resLabel: "[研究/学术]",
    lenses: {
      all: '🔥 全部',
      developer: '👩‍💻 编程与开发',
      agent: '🤖 智能体与自动化',
      pm: '💡 产品与 UX',
      business: '💼 商业与 TCO',
      researcher: '🔬 最新论文与学术'
    }
  },
  es: {
    title: "Noticias de Tendencias de IA 2.0",
    subtitle: "Tendencias de IA en tiempo real e información práctica",
    pulses: "Noticias",
    updated: "Actualizado",
    refresh: "Actualizar",
    searchPlaceholder: "🔍 Buscar palabras clave, empresas o tecnología...",
    searchResultCount: "artículos encontrados",
    factTitle: "Resumen de 3 Puntos (Fact)",
    insightTitle: "Recomendaciones por Rol (Actionable Insight)",
    readOriginal: "Leer Artículo Completo",
    modalBadge: "📖 Reporte Técnico de IA",
    modalClose: "Cerrar",
    devLabel: "[Desarrollador]",
    pmLabel: "[Producto/PM]",
    bizLabel: "[Negocios]",
    resLabel: "[Investigador]",
    lenses: {
      all: '🔥 Todo',
      developer: '👩‍💻 Código y Dev',
      agent: '🤖 Agentes y Automatización',
      pm: '💡 Producto y UX',
      business: '💼 Negocios y TCO',
      researcher: '🔬 Investigación y Papers'
    }
  },
  de: {
    title: "AI Trend News 2.0",
    subtitle: "Echtzeit-KI-Trends & praktische Einblicke für Ihren Workflow",
    pulses: "Nachrichten",
    updated: "Aktualisiert",
    refresh: "Aktualisieren",
    searchPlaceholder: "🔍 Stichwort, Unternehmen oder Technologie suchen...",
    searchResultCount: "Artikel gefunden",
    factTitle: "Kernpunkte 3-Zeilen (Fact)",
    insightTitle: "Praktische Tipps nach Rolle",
    readOriginal: "Vollständigen Quellartikel lesen",
    modalBadge: "📖 KI Technischer Bericht",
    modalClose: "Schließen",
    devLabel: "[Entwickler]",
    pmLabel: "[Produkt/PM]",
    bizLabel: "[Business]",
    resLabel: "[Forscher]",
    lenses: {
      all: '🔥 Alle Feed',
      developer: '👩‍💻 Coden & Dev',
      agent: '🤖 Agenten & Automation',
      pm: '💡 Produkt & UX',
      business: '💼 Business & TCO',
      researcher: '🔬 Forschung & Papiere'
    }
  },
  fr: {
    title: "Actualités Tendances IA 2.0",
    subtitle: "Tendances IA en temps réel et conseils pratiques",
    pulses: "Articles",
    updated: "Mis à jour",
    refresh: "Actualiser",
    searchPlaceholder: "🔍 Rechercher par mots-clés, entreprises...",
    searchResultCount: "articles trouvés",
    factTitle: "Résumé en 3 Points (Fact)",
    insightTitle: "Conseils Pratiques par Rôle",
    readOriginal: "Lire l'article d'origine",
    modalBadge: "📖 Rapport Technique IA",
    modalClose: "Fermer",
    devLabel: "[Développeur]",
    pmLabel: "[Produit/PM]",
    bizLabel: "[Business]",
    resLabel: "[Chercheur]",
    lenses: {
      all: '🔥 Tous',
      developer: '👩‍💻 Code & Dev',
      agent: '🤖 Agents & Automatisation',
      pm: '💡 Produit & UX',
      business: '💼 Business & TCO',
      researcher: '🔬 Recherche & Papiers'
    }
  }
};

const LENSES = [
  { id: 'all', label: '🔥 전체', icon: Activity, desc: '주요 AI 트렌드 종합' },
  { id: 'developer', label: '👩‍💻 코딩 & 프레임워크', icon: Users, desc: 'API, 파인튜닝, Coding Agent, SDK' },
  { id: 'agent', label: '🤖 Agent & 오토메이션', icon: Activity, desc: 'Agentic AI, 자율 에이전트, RAG, 멀티에이전트' },
  { id: 'pm', label: '💡 기획 & UX', icon: Lightbulb, desc: '프롬프트 엔지니어링, AI UI/UX, 대화 가드레일' },
  { id: 'business', label: '💼 비즈니스 & TCO', icon: Briefcase, desc: 'ROI, 클라우드 호스팅 TCO, 사내 보안 IAM' },
  { id: 'researcher', label: '🔬 최신 논문 & 학계', icon: Microscope, desc: 'SOTA 벤치마크, MCTS, ArXiv 논문 요약' }
];

const CLIENT_FALLBACK_NEWS: NewsResponse = {
  articles: [
    // 🤖 Agent & 오토메이션 특화
    {
      id: "fb-agent-1",
      title: "Anthropic, 멀티 에이전트 자율 업무 워크플로우를 위한 Computer Use & Agentic Tooling 프레임워크 발표",
      source_name: "Anthropic News",
      source_url: "https://www.anthropic.com/news",
      published_at: new Date().toISOString(),
      category: "빅테크 공식",
      image_url: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
      summary_bullets: [
        "Anthropic이 마우스 클릭, 키보드 입력, 브라우저 탐색을 스스로 수행하는 자율 Agentic 파이프라인 개방.",
        "복잡한 서류 정리 및 웹 사이트 데이터 수집 작업을 멀티 에이전트 분산 처리로 자동 완수.",
        "에이전트 판단 행동에 대한 보안 가드레일 및 인간 승인 루프(Human-in-the-loop) 기본 내장."
      ],
      actionable_insight: {
        developer: "Agentic Tooling SDK를 도입하여 단순 백엔드 API 연동을 넘어 브라우저 GUI 자동화 프로세스를 수립하세요.",
        pm: "에이전트가 복잡한 업무를 대행할 때 승인(Human-in-the-loop) 인터랙션을 설계하여 보안 이탈 위험을 차단하세요.",
        business: "반복적인 사내 데이터 처리 업무를 자율 에이전트에 위임하여 인건비 및 업무 처리 시간을 80% 단축하세요."
      },
      impact_score: 99,
      tags: ["#Anthropic", "#AgenticAI", "#ComputerUse", "#자율에이전트"],
      matched_lenses: ["agent"]
    },
    {
      id: "fb-agent-2",
      title: "Microsoft AutoGen 0.4 발표, 멀티 에이전트 간 분산 협업 및 실시간 자율 자가 오류 교정 엔진 탑재",
      source_name: "Microsoft AI Blog",
      source_url: "https://blogs.microsoft.com/ai/",
      published_at: new Date().toISOString(),
      category: "빅테크 공식",
      image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      summary_bullets: [
        "마이크로소프트가 자율 멀티 에이전트 오케스트레이션 프레임워크 AutoGen 0.4 버전을 공식 출시함.",
        "에이전트 간 대화 도중 오류 발생 시 스스로 코드와 추론을 수정하는 Self-Correction 오토메이션 루프 구현.",
        "기업 사내 ERP, CRM, 데이터베이스와 보안 연동되는 엔터프라이즈 멀티 에이전트 허브 지원."
      ],
      actionable_insight: {
        developer: "AutoGen 0.4 분산 메시지 버스를 활용해 독립적으로 구동되는 전문가 에이전트 시스템을 구축하세요."
      },
      impact_score: 97,
      tags: ["#Microsoft", "#AutoGen", "#MultiAgent", "#자율오토메이션"],
      matched_lenses: ["agent"]
    },
    // 👩‍💻 개발자/엔지니어 특화
    {
      id: "fb-dev-1",
      title: "OpenAI, 저비용 고효율 모델 Fine-Tuning API 및 추론 지연시간 35% 단축 기술 정식 출시",
      source_name: "OpenAI Blog",
      source_url: "https://openai.com/news/",
      published_at: new Date().toISOString(),
      category: "빅테크 공식",
      image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      summary_bullets: [
        "OpenAI가 저비용 고효율 파인튜닝과 추론 성능을 극대화한 신규 엔드포인트를 공식 개방함.",
        "기업 도메인에 특화된 사용자 맞춤형 커스텀 모델 생성을 60% 이상 저렴한 비용으로 제공.",
        "개발자 콘솔을 통한 추론 지연 시간(Latency) 35% 단축 및 9월 말까지 파인튜닝 토큰 혜택 부여."
      ],
      actionable_insight: {
        developer: "기존 RAG 파이프라인에서 복잡한 전처리 대신 커스텀 모델 파인튜닝을 도입해 API 호스트 비용을 60% 절감하세요."
      },
      impact_score: 98,
      tags: ["#OpenAI", "#FineTuning", "#GPT4o", "#개발자API"],
      matched_lenses: ["developer"]
    },
    {
      id: "fb-dev-2",
      title: "Google DeepMind, SWE-bench 42% 상회하는 코드 리팩토링 및 런타임 버그 수술용 자율 코딩 에이전트 공개",
      source_name: "Google DeepMind",
      source_url: "https://deepmind.google/blog/",
      published_at: new Date().toISOString(),
      category: "빅테크 공식",
      image_url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
      summary_bullets: [
        "구글 딥마인드가 멀티모달 화면 뷰어와 지식 그래프를 연동한 자율 개발 에이전트 엔진을 공개함.",
        "SWE-bench 파이프라인 벤치마크에서 기존 LLM 대비 코드 수정 및 자동 테스트 성공률 42% 상회.",
        "개발자가 작성한 요구사항 명세서만으로 전체 프론트엔드/백엔드 모듈 빌드 자동 완성."
      ],
      actionable_insight: {
        developer: "codebase-memory-mcp와 결합하여 레거시 코드베이스 리팩토링 작업을 에이전트에 위임해 개발 속도를 3배 높이세요."
      },
      impact_score: 95,
      tags: ["#GoogleDeepMind", "#AgenticAI", "#SWEbench", "#자율코딩"],
      matched_lenses: ["developer", "agent"]
    },

    // 💡 기획/PM 특화
    {
      id: "fb-pm-1",
      title: "Anthropic, Claude 3.5 Sonnet Interactive Artifacts 아키텍처 및 프로토타입 자동화 UX 가이드 발표",
      source_name: "Anthropic News",
      source_url: "https://www.anthropic.com/news",
      published_at: new Date().toISOString(),
      category: "빅테크 공식",
      image_url: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
      summary_bullets: [
        "Anthropic이 실시간 웹 앱 및 렌더링 아티팩트 창을 지식 파일 파이프라인과 통합 발표.",
        "코드 실행 워크스페이스 내에서 백엔드 및 UI 컴포넌트를 즉각 미리보기 가능한 차세대 워크플로우.",
        "엔터프라이즈 기획팀의 프로토타이핑 시간을 3일에서 1시간으로 단축하는 UX 패턴 제시."
      ],
      actionable_insight: {
        pm: "인터랙티브 아티팩트 뷰어를 활용해 프로토타입 UI 제작 시간을 기존 3일에서 1시간으로 단축하세요."
      },
      impact_score: 94,
      tags: ["#Anthropic", "#Claude35", "#Artifacts", "#서비스기획"],
      matched_lenses: ["pm"]
    },
    {
      id: "fb-pm-2",
      title: "MIT Tech Review, AI 챗봇 이탈률 줄이는 대화형 UX 및 멀티모달 인터랙션 디자인 패턴 발표",
      source_name: "MIT Tech Review",
      source_url: "https://www.technologyreview.com/",
      published_at: new Date().toISOString(),
      category: "IT 매체",
      image_url: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80",
      summary_bullets: [
        "글로벌 서비스 100개의 AI 대화형 UI를 분석하여 사용자 만족도가 높은 5대 UX 레이아웃 정립.",
        "텍스트 응답 지연 시 실시간 컴포넌트 렌더링 스켈레톤과 스트리밍 애니메이션 기법의 효과 입증.",
        "사용자의 의도를 선제적으로 파악하는 지능형 대화 숏컷(Recommended Prompts) 설계법 제시."
      ],
      actionable_insight: {
        pm: "대화 상단에 추천 프롬프트 칩과 스트리밍 스켈레톤 UI를 도입해 이탈률을 25% 절감하세요."
      },
      impact_score: 91,
      tags: ["#MITTechReview", "#AIUX", "#챗봇기획", "#프로덕트디자인"],
      matched_lenses: ["pm"]
    },

    // 💼 비즈니스/임원 특화
    {
      id: "fb-biz-1",
      title: "VentureBeat, Enterprise AI 도입 기업 74%가 API 대신 자수성가 셀프호스팅 TCO 절감 달성",
      source_name: "VentureBeat AI",
      source_url: "https://venturebeat.com/category/ai/",
      published_at: new Date().toISOString(),
      category: "IT 매체",
      image_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      summary_bullets: [
        "포춘 500대 기업의 2026년 AI 예산 집행 보고서 결과 상율 74%가 하이브리드 TCO 구조를 선택함.",
        "일일 트래픽 100만 건 이상 구간에서는 상용 API 대비 온프레미스 GPU 호스팅이 55% 비용 우위 달성.",
        "사내 데이터 유출 방지를 위한 온프레미스 오픈웨이트(Llama 3, Qwen 2.5) 자산화 흐름 가속."
      ],
      actionable_insight: {
        business: "사내 민감 정보 유출 방지 및 일일 호출량 100만 건 초과 구간에서 오픈웨이트 호스팅 전환으로 TCO 55%를 절감하세요."
      },
      impact_score: 96,
      tags: ["#VentureBeat", "#AITCO", "#비즈니스전략", "#GPU호스팅"],
      matched_lenses: ["business"]
    },

    // 🔬 연구/학계 특화
    {
      id: "fb-res-1",
      title: "ArXiv & Hugging Face, SOTA 추론 성능 상회하는 MCTS 기반 차세대 프런티어 논문 심사 공개",
      source_name: "ArXiv AI Papers",
      source_url: "https://arxiv.org/abs/2608.001",
      published_at: new Date().toISOString(),
      category: "연구/학계",
      image_url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
      summary_bullets: [
        "Monte Carlo Tree Search(MCTS)와 LLM의 테스트 타임 컴퓨팅(Test-time Compute) 결합 신논문 발표.",
        "기존 단일 추론 방식 대비 수학 및 복잡 논리 증명 정확도(Math-500) 18.4% 상승 달성.",
        "Open-weights 프런티어 모델에서의 추론 스트리밍 시 토큰 생성 경로 탐색 최적화 알고리즘 구체화."
      ],
      actionable_insight: {
        researcher: "Test-time Compute 파이프라인과 MCTS 알고리즘을 결합한 SOTA 추론 메커니즘을 벤치마킹하세요."
      },
      impact_score: 97,
      tags: ["#ArXiv", "#HuggingFace", "#MCTS", "#TestTimeCompute"],
      matched_lenses: ["researcher"]
    }
  ],
  total_count: 7,
  last_updated: new Date().toISOString()
};

export default function NewsPulseView() {
  const { language } = useLanguage();
  const t = I18N_TEXTS[language as keyof typeof I18N_TEXTS] || I18N_TEXTS.en;

  // URL query parameter ?lens= 파싱으로 탭 직행 및 북마크/즐겨찾기 지원
  const getInitialLens = () => {
    const params = new URLSearchParams(window.location.search);
    const lensParam = params.get('lens');
    if (lensParam && ['all', 'developer', 'agent', 'pm', 'business', 'researcher'].includes(lensParam)) {
      return lensParam;
    }
    return 'all';
  };

  const [activeLens, setActiveLensState] = useState(getInitialLens);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [newsData, setNewsData] = useState<NewsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  // 서브 렌즈 탭 클릭 시 주소창 URL 자동 동기화 (북마크/즐겨찾기/공유 가능)
  const setActiveLens = (lens: string) => {
    setActiveLensState(lens);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', 'news');
    url.searchParams.set('lens', lens);
    window.history.pushState({}, '', url.toString());
  };

  // 뒤로가기/앞으로가기 popstate 감지
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const lensParam = params.get('lens') || 'all';
      setActiveLensState(lensParam);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const fetchNews = async (lens: string) => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6초 타임아웃 방어막

    try {
      const url = lens === 'all' 
        ? `${API_BASE_URL}/news/pulse`
        : `${API_BASE_URL}/news/pulse?lens=${lens}`;
      
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      const data = await res.json();
      if (data && data.articles && data.articles.length > 0) {
        setNewsData(data);
      } else {
        const filteredFallback = lens === 'all' 
          ? CLIENT_FALLBACK_NEWS.articles 
          : CLIENT_FALLBACK_NEWS.articles.filter(a => a.matched_lenses.includes(lens));
        setNewsData({
          articles: filteredFallback,
          total_count: filteredFallback.length,
          last_updated: CLIENT_FALLBACK_NEWS.last_updated
        });
      }
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.warn("Using Client Fallback News due to network/timeout:", err);
      const filteredFallback = lens === 'all' 
        ? CLIENT_FALLBACK_NEWS.articles 
        : CLIENT_FALLBACK_NEWS.articles.filter(a => a.matched_lenses.includes(lens));
      setNewsData({
        articles: filteredFallback,
        total_count: filteredFallback.length,
        last_updated: CLIENT_FALLBACK_NEWS.last_updated
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(activeLens);
  }, [activeLens]);

  // 키워드 검색 실시간 필터링
  const filteredArticles = useMemo(() => {
    if (!newsData?.articles) return [];
    if (!searchQuery.trim()) return newsData.articles;

    const q = searchQuery.toLowerCase().trim();
    return newsData.articles.filter(article => {
      const titleMatch = article.title.toLowerCase().includes(q);
      const sourceMatch = article.source_name.toLowerCase().includes(q);
      const tagMatch = article.tags?.some(tag => tag.toLowerCase().includes(q));
      const summaryMatch = article.summary_bullets?.some(b => b.toLowerCase().includes(q));
      return titleMatch || sourceMatch || tagMatch || summaryMatch;
    });
  }, [newsData, searchQuery]);

  // 날짜 포맷팅 함수
  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.round(diffMs / 60000);
      const diffHrs = Math.round(diffMins / 60);
      const diffDays = Math.round(diffHrs / 24);

      if (language !== 'ko') {
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHrs < 24) return `${diffHrs}h ago`;
        return `${diffDays}d ago`;
      }

      if (diffMins < 60) return `${diffMins}분 전`;
      if (diffHrs < 24) return `${diffHrs}시간 전`;
      return `${diffDays}일 전`;
    } catch {
      return dateString;
    }
  };

  const getImpactColor = (score: number) => {
    if (score >= 90) return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/30';
    if (score >= 70) return 'text-orange-600 bg-orange-100 dark:text-orange-400 dark:bg-orange-900/30';
    return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header & Lenses */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Newspaper className="w-6 h-6 text-blue-600" />
              {t.title}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {t.subtitle}
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            {newsData && (
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1 font-medium text-xs sm:text-sm">
                  <Activity className="w-4 h-4 text-blue-500" /> {filteredArticles.length} / {newsData.total_count} {t.pulses}
                </span>
                <button 
                  onClick={() => fetchNews(activeLens)}
                  className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 dark:bg-blue-900/30 px-3 py-1.5 rounded-lg"
                  disabled={loading}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> {t.refresh}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 🔍 실시간 키워드 검색바 (Real-time Article Search Bar) */}
        <div className="mb-5 relative">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-10 pr-10 py-2.5 bg-gray-50 dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-gray-400 hover:text-gray-600 dark:hover:text-white p-1 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {searchQuery && (
            <div className="mt-2 text-xs text-blue-600 dark:text-blue-400 font-semibold px-1">
              🔍 "{searchQuery}" {t.searchResultCount} ({filteredArticles.length}건)
            </div>
          )}
        </div>

        {/* Lens Tabs */}
        <div className="flex flex-wrap gap-2">
          {LENSES.map(lens => {
            const Icon = lens.icon;
            const isActive = activeLens === lens.id;
            const labelText = t.lenses[lens.id as keyof typeof t.lenses] || lens.label;
            return (
              <button
                key={lens.id}
                onClick={() => setActiveLens(lens.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-md scale-105' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                title={lens.desc}
              >
                <Icon className="w-4 h-4" />
                {labelText}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <RefreshCw className="w-8 h-8 animate-spin mb-3 text-blue-600" />
          <p className="font-bold text-gray-700 dark:text-gray-300">Loading AI Trend News...</p>
          <p className="text-xs mt-1 text-gray-400">Fetching latest RSS feeds & background cache.</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center border border-red-200">
          <p>{error}</p>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 p-10 rounded-xl text-center border border-gray-200 dark:border-gray-700">
          <Newspaper className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p>No articles found for the current search/lens filter.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredArticles.map(article => (
            <div key={article.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="p-6">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  {/* Thumbnail Image */}
                  {article.image_url && (
                    <div className="w-full md:w-56 h-40 rounded-xl overflow-hidden shrink-0 bg-slate-900 border border-slate-200 dark:border-slate-700/80 shadow-inner relative">
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <span className="absolute bottom-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded bg-black/60 text-white backdrop-blur-md">
                        {article.category}
                      </span>
                    </div>
                  )}

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5 mb-2.5 flex-wrap">
                      <span className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-100 text-slate-800 dark:bg-slate-700/80 dark:text-slate-200">
                        🏢 {article.source_name}
                      </span>
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${getImpactColor(article.impact_score)}`}>
                        🔥 Impact: {article.impact_score}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1 font-medium ml-auto sm:ml-0">
                        <Clock className="w-3.5 h-3.5" /> {formatTime(article.published_at)}
                      </span>
                    </div>
                    
                    <h3 
                      onClick={() => setSelectedArticle(article)}
                      className="text-xl font-bold text-gray-900 dark:text-white leading-snug mb-3 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group/title"
                    >
                      <span>{article.title}</span>
                    </h3>

                    {/* Tags */}
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.map(tag => (
                          <span key={tag} className="text-xs text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-1 rounded-md flex items-center gap-0.5">
                            <Hash className="w-3 h-3" /> {tag.replace('#', '')}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Summary Bullets (Click to open modal) */}
                    <div 
                      onClick={() => setSelectedArticle(article)}
                      className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 mb-4 border border-gray-100 dark:border-gray-700 cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm transition-all group/summary"
                    >
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2 group-hover/summary:text-blue-600 transition-colors">
                        <Activity className="w-4 h-4 text-green-500" /> {t.factTitle}
                      </h4>
                      <ul className="space-y-2">
                        {article.summary_bullets.map((bullet, idx) => (
                          <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex gap-2">
                            <span className="text-blue-500 mt-0.5">•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actionable Insight (실전 팁) */}
                    {(article.actionable_insight && (article.actionable_insight.developer || article.actionable_insight.pm || article.actionable_insight.business || article.actionable_insight.researcher)) && (
                      <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-lg p-4 border border-blue-100 dark:border-blue-900/30">
                        <h4 className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-3 flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-yellow-500" /> 
                          {t.insightTitle}
                        </h4>
                        <div className="space-y-3">
                          {activeLens === 'all' || activeLens === 'developer' ? article.actionable_insight.developer && (
                            <div className="text-sm">
                              <span className="font-semibold text-blue-700 dark:text-blue-400 mr-2">{t.devLabel}</span>
                              <span className="text-gray-700 dark:text-gray-300">{article.actionable_insight.developer}</span>
                            </div>
                          ) : null}
                          {activeLens === 'all' || activeLens === 'pm' ? article.actionable_insight.pm && (
                            <div className="text-sm">
                              <span className="font-semibold text-blue-700 dark:text-blue-400 mr-2">{t.pmLabel}</span>
                              <span className="text-gray-700 dark:text-gray-300">{article.actionable_insight.pm}</span>
                            </div>
                          ) : null}
                          {activeLens === 'all' || activeLens === 'business' ? article.actionable_insight.business && (
                            <div className="text-sm">
                              <span className="font-semibold text-blue-700 dark:text-blue-400 mr-2">{t.bizLabel}</span>
                              <span className="text-gray-700 dark:text-gray-300">{article.actionable_insight.business}</span>
                            </div>
                          ) : null}
                          {activeLens === 'all' || activeLens === 'researcher' ? article.actionable_insight.researcher && (
                            <div className="text-sm">
                              <span className="font-semibold text-blue-700 dark:text-blue-400 mr-2">{t.resLabel}</span>
                              <span className="text-gray-700 dark:text-gray-300">{article.actionable_insight.researcher}</span>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 📖 심층 블로그 리포트 모달 (Blog Article Modal) */}
      {selectedArticle && (
        <BlogModalView 
          article={selectedArticle} 
          t={t} 
          onClose={() => setSelectedArticle(null)} 
        />
      )}
    </div>
  );
}

interface BlogModalViewProps {
  article: NewsArticle;
  t: any;
  onClose: () => void;
}

function BlogModalView({ article, t, onClose }: BlogModalViewProps) {
  const [imgError, setImgError] = useState(false);

  // 텍스트 내의 **볼드** 문법을 <strong> 태그로 정밀 전환 파싱하는 인라인 마크다운 렌더러
  const parseInlineMarkdown = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part: string, idx: number) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={idx} className="font-extrabold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  // 블로그 마크다운 구조를 프리미엄 UI 블록 카드로 파싱 렌더링
  const renderMarkdownBlocks = (markdown: string) => {
    const blocks = markdown.split('\n\n');
    return blocks.map((block: string, bIdx: number) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // 1. 대형 📌 [기술 리포트] 헤더
      if (trimmed.startsWith('# 📌')) {
        return (
          <div key={bIdx} className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 rounded-2xl shadow-lg my-4">
            <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
              AI Technical Deep-Dive
            </span>
            <h1 className="text-xl sm:text-2xl font-black mt-3 leading-snug">
              {parseInlineMarkdown(trimmed.replace(/^#\s*📌\s*/, '').replace(/^\[기술 리포트\]\s*/, ''))}
            </h1>
          </div>
        );
      }

      // 2. > **출처**: ... 메타 요약 카우션 카드
      if (trimmed.startsWith('> ')) {
        const content = trimmed.replace(/^>\s*/, '');
        return (
          <div key={bIdx} className="bg-slate-100 dark:bg-slate-800/80 border-l-4 border-blue-500 p-4 rounded-r-xl text-xs sm:text-sm text-slate-700 dark:text-slate-300 shadow-sm flex items-center justify-between flex-wrap gap-2 my-3">
            <div>{parseInlineMarkdown(content)}</div>
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
              Verified Source
            </span>
          </div>
        );
      }

      // 3. --- 구분선
      if (trimmed === '---') {
        return <hr key={bIdx} className="border-t border-slate-200 dark:border-slate-800 my-6" />;
      }

      // 4. ### 1. 💡 섹션 헤더
      if (trimmed.startsWith('### ')) {
        const headerText = trimmed.replace(/^###\s*/, '');
        return (
          <div key={bIdx} className="flex items-center gap-2 mt-6 mb-3">
            <div className="w-1.5 h-6 bg-blue-600 rounded-full shrink-0" />
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
              {parseInlineMarkdown(headerText)}
            </h3>
          </div>
        );
      }

      // 5. * **👩‍💻 개발자/엔지니어**: ... 직무별 활용 팁 리스트 파싱
      if (trimmed.includes('* **')) {
        const items = trimmed.split('\n');
        return (
          <div key={bIdx} className="space-y-3 my-4">
            {items.map((item: string, iIdx: number) => {
              const cleanItem = item.replace(/^[\*\-]\s*/, '');
              let badgeColor = "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border-blue-200 dark:border-blue-800";
              
              if (cleanItem.includes("개발자")) {
                badgeColor = "bg-cyan-50 text-cyan-800 dark:bg-cyan-950/50 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800";
              } else if (cleanItem.includes("기획자") || cleanItem.includes("PM")) {
                badgeColor = "bg-purple-50 text-purple-800 dark:bg-purple-950/50 dark:text-purple-300 border-purple-200 dark:border-purple-800";
              } else if (cleanItem.includes("비즈니스")) {
                badgeColor = "bg-emerald-50 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800";
              } else if (cleanItem.includes("연구자")) {
                badgeColor = "bg-amber-50 text-amber-800 dark:bg-amber-950/50 dark:text-amber-300 border-amber-200 dark:border-amber-800";
              }

              return (
                <div key={iIdx} className={`p-4 rounded-xl border ${badgeColor} shadow-sm transition-all hover:shadow-md`}>
                  <div className="text-sm leading-relaxed">
                    {parseInlineMarkdown(cleanItem)}
                  </div>
                </div>
              );
            })}
          </div>
        );
      }

      // 일반 문단
      return (
        <p key={bIdx} className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base my-3">
          {parseInlineMarkdown(trimmed)}
        </p>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fade-in">
      <div 
        className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col my-auto transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center z-20">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-black rounded-lg bg-blue-600 text-white shadow-sm">
              {t.modalBadge}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">
              🏢 {article.source_name}
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center font-black transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Header Hero Image with Error Handling */}
          {!imgError && article.image_url ? (
            <div className="w-full h-56 sm:h-72 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 relative bg-slate-950">
              <img 
                src={article.image_url} 
                alt={article.title} 
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <span className="px-3 py-1 rounded-md bg-blue-600/90 text-white text-xs font-extrabold backdrop-blur-md shadow">
                  {article.category}
                </span>
              </div>
            </div>
          ) : (
            /* 깨진 이미지 시 대체 그래디언트 배너 */
            <div className="w-full h-48 rounded-2xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-700 p-6 flex flex-col justify-between text-white shadow-lg relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-black backdrop-blur-md">
                  {article.category}
                </span>
                <span className="text-xs font-bold opacity-80">AI Tech Deep-Dive</span>
              </div>
              <div>
                <span className="text-xs font-bold opacity-75">🏢 {article.source_name}</span>
                <h3 className="text-lg font-black mt-1 line-clamp-1">{article.title}</h3>
              </div>
            </div>
          )}

          {/* Title */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
              {article.title}
            </h2>
            <div className="flex flex-wrap gap-2 mt-4">
              {article.tags?.map(tag => (
                <span key={tag} className="text-xs font-extrabold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-lg border border-blue-500/10">
                  {tag.startsWith('#') ? tag : `#${tag}`}
                </span>
              ))}
            </div>
          </div>

          {/* Rich Parsed Markdown Body */}
          <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
            {article.blog_summary ? (
              renderMarkdownBlocks(article.blog_summary)
            ) : (
              <div className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <h4 className="font-extrabold text-blue-600 dark:text-blue-400 mb-2">1. 💡 서론 및 배경</h4>
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{article.summary_bullets[0]}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <h4 className="font-extrabold text-blue-600 dark:text-blue-400 mb-2">2. ⚙️ 심층 리포트 해설</h4>
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{article.summary_bullets[1] || article.summary_bullets[0]}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <h4 className="font-extrabold text-blue-600 dark:text-blue-400 mb-2">3. 🎯 핵심 종합 결론</h4>
                  <p className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed">{article.summary_bullets[2] || '본 소식은 최신 AI 기술 트렌드 및 산업 현장 활용 팁을 담고 있습니다.'}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-md px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center z-20">
          <a
            href={article.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 text-xs sm:text-sm font-extrabold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all flex items-center gap-1.5"
          >
            {t.readOriginal} <ExternalLink className="w-4 h-4" />
          </a>
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs sm:text-sm font-black text-slate-700 dark:text-slate-200 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-xl transition-all"
          >
            {t.modalClose}
          </button>
        </div>
      </div>
    </div>
  );
}
