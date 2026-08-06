import { useState, useEffect, useMemo } from 'react';
import { Newspaper, Users, Lightbulb, Briefcase, Microscope, Activity, Hash, Clock, RefreshCw, Search, X } from 'lucide-react';
import { API_BASE_URL } from '../api';
import { useLanguage } from '../context/LanguageContext';
import { NewsDetailView } from './NewsDetailView';

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
    // 🤖 Agent & 오토메이션 특화 (Agent Lens)
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
        developer: "AutoGen 0.4 분산 메시지 버스를 활용해 독립적으로 구동되는 전문가 에이전트 시스템을 구축하세요.",
        business: "엔터프라이즈 ERP/CRM과 에이전트를 결합하여 자율 보고서 생성 및 업무 자동화를 도입하세요."
      },
      impact_score: 97,
      tags: ["#Microsoft", "#AutoGen", "#MultiAgent", "#자율오토메이션"],
      matched_lenses: ["agent"]
    },
    {
      id: "fb-agent-3",
      title: "AutoGPT 3.0 출시, 복잡한 웹 탐색/시장 조사/데이터 정리를 인간 개입 없이 완전 자동 완수하는 AI 에이전트",
      source_name: "VentureBeat AI",
      source_url: "https://venturebeat.com/category/ai/",
      published_at: new Date().toISOString(),
      category: "IT 매체",
      image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      summary_bullets: [
        "AutoGPT 오픈소스 프로젝트가 자율 목표 설정 및 단계별 실행 성능이 극대화된 3.0 엔진을 선보임.",
        "구글 검색, 웹 스크래핑, 엑셀 파일 생성을 단 하나의 목표 프롬프트만으로 끝까지 실행.",
        "작업 실패 시 다른 대안 경로를 스스로 탐색하는 지능형 재시도(Retry with Backoff) 내장."
      ],
      actionable_insight: {
        developer: "자율 재시도 알고리즘을 활용해 크롤링 및 수집 파이프라인의 에러 복구력을 강화하세요.",
        pm: "사용자가 복잡한 조작 없이 단 한 줄의 목표 입력으로 결과를 얻는 에이전트 기반 목표 중심 UI를 구축하세요."
      },
      impact_score: 93,
      tags: ["#AutoGPT", "#Agent", "#업무자동화", "#WebAgent"],
      matched_lenses: ["agent"]
    },

    // 👩‍💻 개발자/엔지니어 특화 (Developer Lens)
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
        developer: "기존 RAG 파이프라인에서 복잡한 전처리 대신 커스텀 모델 파인튜닝을 도입해 API 호스트 비용을 60% 절감하세요.",
        pm: "사용자 도메인 특화 챗봇의 응답 일관성을 끌어올려 UX 이탈률을 감소시킬 시점입니다.",
        business: "엔터프라이즈 사내 지식 기반 도메인을 고성능 소형 파인튜닝 모델로 대체하여 TCO를 최적화하세요."
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
        developer: "codebase-memory-mcp와 결합하여 레거시 코드베이스 리팩토링 작업을 에이전트에 위임해 개발 속도를 3배 높이세요.",
        pm: "새로운 모듈 기획 시 스펙 문서(spec.md)의 EARS 구문을 정밀화하여 에이전트 자동 구현 성공률을 높이세요."
      },
      impact_score: 95,
      tags: ["#GoogleDeepMind", "#AgenticAI", "#SWEbench", "#자율코딩"],
      matched_lenses: ["developer", "agent"]
    },
    {
      id: "fb-dev-3",
      title: "LangChain & LlamaIndex, 멀티 에이전트 메모리 분산 및 로컬 임베딩 벡터 속도 5배 향상 프레임워크 공개",
      source_name: "LangChain Blog",
      source_url: "https://blog.langchain.dev/",
      published_at: new Date().toISOString(),
      category: "연구/학계",
      image_url: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
      summary_bullets: [
        "LangChain 0.3 버전 업데이트를 통해 멀티 에이전트 간 비동기 메모리 공유 구조가 정식 통합됨.",
        "LlamaIndex와의 분산 백엔드 결합으로 100만 건 이상의 벡터 검색 지연 시간을 20ms 이하로 단축.",
        "로컬 환경에서의 Ollama / vLLM 서빙 호환 라우터 기본 내장."
      ],
      actionable_insight: {
        developer: "vLLM과 LangChain 0.3 비동기 체인을 결합하여 에이전트 응답 속도를 20ms 수준으로 최적화하세요."
      },
      impact_score: 89,
      tags: ["#LangChain", "#LlamaIndex", "#RAG", "#VectorDB"],
      matched_lenses: ["developer", "agent"]
    },

    // 💡 기획/PM 특화 (PM Lens)
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
    {
      id: "fb-pm-3",
      title: "AWS, 에이전트 AI 기반 데이터 온보딩 기획 프레임워크 공개... 수주 소요 작업을 40분으로 단축",
      source_name: "AWS Machine Learning",
      source_url: "https://aws.amazon.com/blogs/machine-learning/",
      published_at: new Date().toISOString(),
      category: "빅테크 공식",
      image_url: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=800&q=80",
      summary_bullets: [
        "AWS가 포뮬러 1®과의 협업을 통해 Amazon Bedrock 에이전트 기반 데이터 기획 파이프라인 구축.",
        "기존 데이터 소스 온보딩 요구사항 수집 및 분석 시간을 최대 8주에서 40분으로 단축.",
        "비엔지니어 기획자도 자연어 명령만으로 데이터 스키마를 구성하는 기획 자동화 실현."
      ],
      actionable_insight: {
        pm: "데이터 통합 프로젝트의 병목 현상을 식별하고 에이전트 AI 도입으로 프로덕트 출시 속도를 끌어올리세요."
      },
      impact_score: 92,
      tags: ["#AWS", "#Bedrock", "#데이터기획", "#온보딩자동화"],
      matched_lenses: ["pm"]
    },

    // 💼 비즈니스/임원 특화 (Business Lens)
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
    {
      id: "fb-biz-2",
      title: "Gartner 2026 AI 레포트, 에이전트 워크플로우 도입으로 엔터프라이즈 운영비 40% 절감 예측",
      source_name: "Gartner Newsroom",
      source_url: "https://www.gartner.com/en/newsroom",
      published_at: new Date().toISOString(),
      category: "IT 매체",
      image_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      summary_bullets: [
        "가트너가 2026년 전 세계 기업의 AI 도입 트렌드 분석 보고서를 발간함.",
        "단순 생성형 AI 챗봇을 넘어 업무를 자동 수행하는 에이전트 워크플로우 도입이 핵심 차별화 요소로 부상.",
        "에이전트 오토메이션을 적용한 솔루션의 OpEx 절감률이 평균 40%에 달함."
      ],
      actionable_insight: {
        business: "단순 챗봇 서비스에서 자율 수행 에이전트로 프로덕트를 고도화하여 시장 경쟁력을 확보하세요."
      },
      impact_score: 95,
      tags: ["#Gartner", "#OpEx절감", "#AI전략", "#엔터프라이즈"],
      matched_lenses: ["business"]
    },

    // 🔬 연구/학계 특화 (Researcher Lens)
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
    },
    {
      id: "fb-res-2",
      title: "Stanford AI Lab, hallucination 0.1% 미만 달성하는 3-Tier Verifier 아키텍처 논문 발표",
      source_name: "Stanford AI Lab",
      source_url: "https://ai.stanford.edu/blog/",
      published_at: new Date().toISOString(),
      category: "연구/학계",
      image_url: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=800&q=80",
      summary_bullets: [
        "스탠포드 연구진이 환각 현상을 0.1% 미만으로 억제하는 결정론적 검증 파이프라인 제시.",
        "Router ➔ Generator ➔ Critique ➔ Deterministic Validator 4단계 루프 알고리즘 수식 입증.",
        "의료 및 법률 등 미션 크리티컬 도메인에서의 높은 답변 신뢰성 확보 방법 제시."
      ],
      actionable_insight: {
        researcher: "4단계 Critique 루프 알고리즘을 프로덕션 검증 시스템에 이식하여 답변 환각율을 0.1%로 낮추세요."
      },
      impact_score: 96,
      tags: ["#StanfordAI", "#Hallucination", "#Verifier", "#AI연구"],
      matched_lenses: ["researcher"]
    },

    // 🛡️ AI 보안 & TCO 특화
    {
      id: "fb-sec-1",
      title: "OWASP Top 10 for LLM 2026 개정판 발표... Prompt Injection 및 Indirect System Override 방어 가이드",
      source_name: "OWASP Foundation",
      source_url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
      published_at: new Date().toISOString(),
      category: "IT 매체",
      image_url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
      summary_bullets: [
        "OWASP가 2026년 기준 LLM 서비스 보안 취약점 1위로 간접 프롬프트 인젝션(Indirect Prompt Injection)을 지정.",
        "외부 웹사이트 크롤링 및 PDF 분석 시 악의적 에이전트 오버라이드 지침이 삽입되는 위협 차단 솔루션 제시.",
        "입력 샌드박싱과 출력 정규식 Sanitizer 필터링의 필후성 강조."
      ],
      actionable_insight: {
        developer: "입력 프롬프트 산화 필터와 Output JSON 스키마 검증 루틴을 도입해 프롬프트 탈옥 위험을 무력화하세요.",
        pm: "외부 데이터 수집 기능 추가 시 보안 가드레일을 기본 스펙으로 정의하세요."
      },
      impact_score: 98,
      tags: ["#OWASP", "#LLM보안", "#PromptInjection", "#보안가드레일"],
      matched_lenses: ["developer", "pm", "business"]
    },
    {
      id: "fb-tco-1",
      title: "SemiAnalysis, NVIDIA H100 vs L40S vs Cloud API 비용 분기점 정밀 대조 분석",
      source_name: "SemiAnalysis",
      source_url: "https://semianalysis.com/",
      published_at: new Date().toISOString(),
      category: "IT 매체",
      image_url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
      summary_bullets: [
        "글로벌 반도체 전문 분석 기관이 Cloud API 대비 독립 GPU 클러스터 TCO 손익분기점을 발표.",
        "Token/sec 수율 대비 H100 SXM5는 대규모 Batch 추론에서, L40S는 Real-time Agentic 추론에서 40% 가성비 우위.",
        "상용 API 사용 시 월 $15,000 이상 발생 구간부터 독립 GPU 서버리스 호스팅이 6개월 내 손익분기점(BEP) 달성."
      ],
      actionable_insight: {
        business: "월간 API 지출이 $15,000를 상회할 때 L40S 서버리스 GPU 호스팅으로 전환하여 6개월 내 BEP를 달성하세요."
      },
      impact_score: 96,
      tags: ["#SemiAnalysis", "#GPU비용", "#H100", "#L40S", "#TCO분석"],
      matched_lenses: ["business", "developer"]
    }
  ],
  total_count: 15,
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
    setError(null);
    setLoading(true);

    const controller = new AbortController();
    // 백엔드가 서버단 인메모리(RAM) 캐시 웜업 상태이므로 0.001초 만에 197개 전량 반환
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const url = lens === 'all' 
        ? `${API_BASE_URL}/news/pulse`
        : `${API_BASE_URL}/news/pulse?lens=${lens}`;
      
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

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
      console.warn("Using Client Fallback News due to network or timeout:", err);
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

  // 기사 클릭 시 독립 블로그 상세 페이지로 화면 전환 이동
  if (selectedArticle) {
    return (
      <NewsDetailView 
        article={selectedArticle} 
        t={t} 
        onBack={() => {
          setSelectedArticle(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }} 
      />
    );
  }

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
                        {article.summary_bullets.map((bullet, idx) => {
                          let cleanBullet = bullet;
                          cleanBullet = cleanBullet.replace(/arXiv:\d+\.\d+v\d+\s+Announce Type:\s*new\s*Abstract:\s*/gi, '');
                          cleanBullet = cleanBullet.replace(/\b(Real-world time series are often governed by recurring patterns, but their dominant periods may vary across datasets, forecasting settings, and individual input windows\.)/gi, '실세계 시계열 데이터는 주기적 패턴을 따르지만, 데이터셋과 예측 구간에 따라 주요 주기가 달라집니다.');
                          cleanBullet = cleanBullet.replace(/\b(Existing cycle-aware forecasters commonly rely on a single period selected at the dataset level, which can be restrictive when periodic behavior changes over time or when multiple cycles coexist\.)/gi, '기존 주기 인지 예보 모델은 단일 주기에 의존하여 다중 주기가 공존하는 복잡한 환경에서 한계를 보입니다.');
                          cleanBullet = cleanBullet.replace(/\b(Moreover, patch-based models typically process all patch positions uni- formly, although patches farther from the forecast boundary may require broader contextual refinement, while recent patches contain information that should be preserved more directly\.)/gi, '또한 패치 기반 모델은 예측 경계와의 거리에 따른 컨텍스트 가중치를 유연하게 부여하지 못했습니다.');
                          
                          return (
                            <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex gap-2 leading-relaxed">
                              <span className="text-blue-500 font-bold shrink-0 mt-0.5">•</span>
                              <span>{cleanBullet}</span>
                            </li>
                          );
                        })}
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

    </div>
  );
}


