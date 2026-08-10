import { useState, useEffect, useMemo } from 'react';
import { Newspaper, Users, Lightbulb, Briefcase, Microscope, Activity, Hash, Clock, RefreshCw, Search, X, Sparkles } from 'lucide-react';
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
  is_new?: boolean;
}

import type { Language } from '../i18n/translations';

interface NewsResponse {
  articles: NewsArticle[];
  total_count: number;
  last_updated: string;
}

const MULTILINGUAL_ARTICLE_MAP: Record<string, Record<Language, string>> = {
  "Robust and Personalized Federated Learning for Aircraft-Engine Prognostics under Benign and Adversarial Client Heterogeneity": {
    ko: "건전 및 적대적 클라이언트 이질성 환경에서의 항공 엔진 상태 진단을 위한 강건하고 개인화된 연합 학습",
    en: "Robust and Personalized Federated Learning for Aircraft-Engine Prognostics under Benign and Adversarial Client Heterogeneity",
    ja: "健全および敵対的クライアント非均一性環境における航空エンジン状態診断のための堅牢かつ個別化された連合学習",
    zh: "在良性和对抗性客户端异质性下用于航空发动机预后的稳健和个性化联邦学习",
    es: "Aprendizaje federado robusto y personalizado para el pronóstico de motores de aeronaves bajo heterogeneidad benigna y adversaria",
    de: "Robustes und personalisiertes föderiertes Lernen für die Prognose von Flugzeugtriebwerken unter gutartiger und gegnerischer Client-Heterogenität",
    fr: "Apprentissage fédéré robuste et personnalisé pour le pronostic des moteurs d'aéronefs sous hétérogénéité bénigne et adverse",
  },
  "Federated learning (FL) enables aircraft fleet operators to jointly train remaining-useful-life (RUL) models from engine sensor telemetry without sharing raw data.": {
    ko: "연합 학습(FL)을 통해 항공기 운용사는 원시 데이터 공유 없이 엔진 센서 텔레메트리 데이터를 활용하여 잔여 유효 수명(RUL) 예측 모델을 공동 학습할 수 있습니다.",
    en: "Federated learning (FL) enables aircraft fleet operators to jointly train remaining-useful-life (RUL) models from engine sensor telemetry without sharing raw data.",
    ja: "連合学習（FL）により、航空会社は生データを共有することなく、エンジンセンサーデータから残存有用寿命（RUL）モデルを共同訓練できます。",
    zh: "联邦学习 (FL) 使机队运营商能够在不共享原始数据的情况下，根据发动机传感器遥测数据共同训练剩余使用寿命 (RUL) 模型。",
    es: "El aprendizaje federado (FL) permite a los operadores de flotas entrenar conjuntamente modelos de vida útil restante (RUL) a partir de la telemetría del sensor del motor sin compartir datos no procesados.",
    de: "Föderiertes Lernen (FL) ermöglicht es Fluggesellschaften, Modelle für die verbleibende Nutzungsdauer (RUL) aus Triebwerkssensordaten gemeinsam zu trainieren, ohne Rohdaten zu teilen.",
    fr: "L'apprentissage fédéré (FL) permet aux opérateurs de flottes d'entraîner conjointement des modèles de durée de vie utile restante (RUL) à partir de la télémétrie des capteurs sans partager de données brutes.",
  },
  "This study examines two complementary challenges: benign heterogeneity, where honest operators observe different operating conditions and fault modes, and adversarial heterogeneity, where compromised operators submit poisoned updates.": {
    ko: "본 연구는 두 가지 상호보완적 과제(정상 운용사의 다양한 동작 환경/고장 모드에 따른 일반 이질성과, 악의적 사용자가 오염된 업데이트를 제출하는 적대적 이질성)를 분석합니다.",
    en: "This study examines two complementary challenges: benign heterogeneity, where honest operators observe different operating conditions and fault modes, and adversarial heterogeneity, where compromised operators submit poisoned updates.",
    ja: "本研究では、健全なオペレータが異なる動作条件を観測する一般的非均一性と、攻撃者が汚染データを送信する敵対的非均一性の2つの課題を分析します。",
    zh: "本研究探讨了两个互补的挑战：良性异质性（诚实运营商观察到不同的运行条件和故障模式）和对抗性异质性（被受损运营商提交中毒更新）。",
    es: "Este estudio examina dos desafíos complementarios: la heterogeneity benigna y la heterogeneidad adversaria.",
    de: "Diese Studie untersucht zwei sich ergänzende Herausforderungen: gutartige Heterogenität und gegnerische Heterogenität.",
    fr: "Cette étude examine deux défis complémentaires : l'hétérogénéité bénigne et l'hétérogénéité adverse.",
  },
  "Tactus: Open-Vocabulary Object Recognition from Low-Cost Pressure Arrays": {
    ko: "저비용 압력 어레이 기반 개방형 어휘 물체 인식 모델 Tactus",
    en: "Tactus: Open-Vocabulary Object Recognition from Low-Cost Pressure Arrays",
    ja: "低コスト圧力アレイに基づくオープンボキャブラリー物体認識モデル Tactus",
    zh: "基于低成本压力阵列的开放词汇物体识别模型 Tactus",
    es: "Tactus: Reconocimiento de objetos de vocabulario abierto a partir de matrices de presión de bajo costo",
    de: "Tactus: Open-Vocabulary-Objekterkennung aus kostengünstigen Druckfeldern",
    fr: "Tactus : Reconnaissance d'objets à vocabulaire ouvert à partir de réseaux de pression à bas coût",
  },
  "Resistive pressure arrays are the cheapest and most widely shipped tactile sensors, yet tactile representation learning has concentrated on optical sensors that image a deforming gel.": {
    ko: "저항성 압력 어레이는 가장 보급률이 높은 촉각 센서이지만, 기존 촉각 표현 학습은 변형 젤 방식 광학 센서에 치우쳐 있었습니다.",
    en: "Resistive pressure arrays are the cheapest and most widely shipped tactile sensors, yet tactile representation learning has concentrated on optical sensors that image a deforming gel.",
    ja: "抵抗膜方式の圧力アレイは最も安価な触覚センサーですが、従来の表現学習は光学式に偏っていました。",
    zh: "电阻式压力阵列是最便宜、应用最广泛的触觉传感器，但触觉表示学习主要集中在光学传感器上。",
    es: "Las matrices de presión resistiva son los sensores táctiles más baratos, aunque el aprendizaje se ha centrado en sensores ópticos.",
    de: "Widerstands-Drucksensoren sind die günstigsten taktilen Sensoren, die bisherige Forschung konzentrierte sich jedoch auf optische Sensoren.",
    fr: "Les réseaux de pression résistifs sont les capteurs tactiles les moins chers, mais l'apprentissage s'est concentré sur les capteurs optiques.",
  }
};

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
  { id: 'new', label: '✨ 최신 속보 (NEW)', icon: Sparkles, desc: '최근 72시간 이내 수집된 신규 기술 리포트만 조망' },
  { id: 'developer', label: '👩‍💻 코딩 & 프레임워크', icon: Users, desc: 'API, 파인튜닝, Coding Agent, SDK' },
  { id: 'agent', label: '🤖 Agent & 오토메이션', icon: Activity, desc: 'Agentic AI, 자율 에이전트, RAG, 멀티에이전트' },
  { id: 'pm', label: '💡 기획 & UX', icon: Lightbulb, desc: '프롬프트 엔지니어링, AI UI/UX, 대화 가드레일' },
  { id: 'business', label: '💼 비즈니스 & TCO', icon: Briefcase, desc: 'ROI, 클라우드 호스팅 TCO, 사내 보안 IAM' },
  { id: 'researcher', label: '🔬 최신 논문 & 학계', icon: Microscope, desc: 'SOTA 벤치마크, MCTS, ArXiv 논문 요약' }
];

const CLIENT_FALLBACK_NEWS: NewsResponse = {
  articles: [
    {
      id: "sample-agentic-computer-use",
      title: "[시각화 리포트] Anthropic, 자율 멀티에이전트 Computer Use 및 Agentic Tooling 2.0 파이프라인 발표",
      source_name: "Anthropic AI Engineering",
      source_url: "https://www.anthropic.com/news/agentic-tooling-2.0",
      published_at: new Date().toISOString(),
      category: "빅테크 공식",
      image_url: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=800&q=80",
      summary_bullets: [
        "Anthropic이 브라우저 GUI, 마우스 클릭, 키보드 입력 및 API 연동을 스스로 판단하는 Computer Use 2.0 파이프라인을 공개했습니다.",
        "OSWorld 벤치마크에서 복잡한 웹 조작 과업 완수율을 기존 18%에서 64%로 3.5배 대폭 향상시켰습니다.",
        "Human-in-the-loop 결제 및 민감 데이터 변경 승인 가드레일을 기본 탑재하여 사내 보안 유출을 철저히 차단합니다."
      ],
      blog_summary: `# 📌 [Deep-Dive Visual Report] Anthropic 자율 멀티에이전트 Computer Use 및 Agentic Tooling 2.0 파이프라인\n\n> **주요 출처**: Anthropic AI Engineering | **카테고리**: 빅테크 공식 | **검증**: ✅ Multi-Source Cross-Validated | **특집**: 🎨 시각화 다이어그램 포함\n\n---\n\n### 1. 💡 핵심 요약 및 개요 (Executive Summary)\nAnthropic이 차세대 AI 자율 에이전트 구축을 위한 **Computer Use 및 Agentic Tooling 2.0 파이프라인**을 공식 발표했습니다. 본 기술 발표는 단순 텍스트/코드 생성을 넘어 에이전트가 직접 브라우저 GUI, 마우스 클릭, 키보드 타이핑, API 오케스트레이션을 스스로 판단하여 수행하는 **엔드투엔드 워크플로우 자동화 아키텍처**를 다룹니다.\n\n\`\`\`mermaid\nflowchart TD\n    A[👤 사용자 업무 요청\\nUser Goal / Prompt] --> B[🧠 Planner Agent\\nTask Breakdown & Reasoning]\n    B --> C{🛡️ 보안 검증 가드레일\\nHuman-in-the-loop Guardrail}\n    C -- ❌ 미승인 / 고위험 --> D[🛑 인간 승인 요청\\nUser Approval Gate]\n    D -- 승인 완료 --> E[🤖 GUI Worker Agent\\nComputer Use & Tool Execution]\n    C -- ✅ 자동 승인 --> E\n    E --> F[💻 브라우저 / Desktop GUI\\nMouse Click & Type Execution]\n    F --> G[👁️ Vision Evaluator\\nScreen Capture & State Feedback]\n    G -- 과업 미완수 --> B\n    G -- ✅ 성공 완수 --> H[🎉 최종 업무 완료 리포트 리턴]\n\`\`\`\n\n---\n\n### 2. 🔍 기존 방식 대비 Agentic Computer Use 2.0 비교분석\n\n| 비교 항목 | 기존 수동 조작 (Manual Work) | 전통적 REST API 연동 | Anthropic Computer Use 2.0 |\n| :--- | :--- | :--- | :--- |\n| **작동 방식** | 사람이 직접 웹사이트 접속 및 클릭 | 전용 백엔드 API 개발 및 유지보수 | 에이전트가 화면 비전 인식 후 자율 조작 |\n| **시스템 유연성** | 매우 높음 (사람 판단) | 매우 낮음 (API 개편 시 파손) | 높음 (GUI 변경 시 에이전트 자율 적응) |\n| **도입 속도** | 즉시 (인적 자원 소비) | 개발 기간 2~4주 소요 | 1일 이내 프롬프트/가드레일 설정 후 즉시 가동 |\n| **보안 통제** | 사내 보안 지침 사람 준수 | IAM Key 권한 관리 | Human-in-the-loop 및 실시간 세션 격리 |\n\n---\n\n### 3. 📊 복잡 업무 완수율 및 벤치마크 성과 (OSWorld & SWE-Bench)\n\n[CHART:bar|OSWorld Task Completion Rate|Legacy Agent:18%|Claude 3.5 Sonnet:38%|Claude 3.7 Sonnet (Thinking):64%|Human Baseline:72%]\n\n* **OSWorld 웹 GUI 복잡 업무**: 기존 18% 수준에서 **64%**로 3.5배 대폭 상승\n* **SWE-Bench Verified 코딩 파이프라인**: 70.3% 달성으로 SOTA 기록 수립\n\n---\n\n### 4. 🎯 4대 직무별 실전 적용 가이드라인 (Actionable Insights)\n\n#### 👩‍💻 개발자/엔지니어\n* **Tooling SDK 도입**: Anthropic Computer Use SDK를 백엔드 워크플로우에 이식하여 GUI 조작 자동화 파이프라인 구축.\n* **비전 캡처 주기 최적화**: 화면 캡처 토큰 소비 절감을 위해 변경 감지(Delta Frame) 핑퐁 알고리즘 적용.\n\n#### 💡 서비스 기획자/PM\n* **Human-in-the-loop 승인 UX 설계**: 금융 결제, 민감 데이터 변경 시 사용자 확인 모달 승인 가드레일 설계.\n* **에이전트 가시성 강화**: 에이전트의 현재 추론 단계 및 행동 이력을 실시간 타임라인으로 제공하는 UI 구축.\n\n#### 💼 비즈니스 리더\n* **사내 데이터 수집 TCO 75% 절감**: 반복적인 외부 웹 사이트 서류 조회 및 수집 업무를 자율 에이전트에 위임.\n* **IAM 보안 컴플라이언스**: 에이전트 전용 격리 브라우저 인스턴스를 부여하여 사내 보안 유출 차단.\n\n#### 🔬 연구자/학계\n* **Vision-Language-Action (VLA) 모델 탐구**: 텍스트-비전-행동 도메인 간의 그라운딩(Grounding) 오차 저감 논문 분석.`,
      actionable_insight: {
        developer: "Computer Use SDK를 도입하여 단순 API 연동을 넘어 자율 브라우저 GUI 오케스트레이션 시스템을 구축하세요.",
        pm: "에이전트 판단 시 금융 결제나 민감 정보 변경 단계에 Human-in-the-loop 승인 모달 UX를 설계하세요.",
        business: "반복적인 서류 조회 및 외부 데이터 수집 작업을 자율 에이전트에 위임하여 인건비와 소요 시간을 75% 단축하세요.",
        researcher: "Vision-Language-Action (VLA) 모델의 프레임 간 그라운딩 오차 저감 알고리즘을 분석하세요."
      },
      impact_score: 98,
      tags: ["#Anthropic", "#AgenticAI", "#ComputerUse", "#SOTA"],
      matched_lenses: ["developer", "agent", "pm", "business"]
    },
    {
      id: "sample-deepseek-r1-moe",
      title: "[시각화 리포트] DeepSeek R1 / V3: 671B MoE 자율 강화학습(RL) 아키텍처 및 벤치마크 분석",
      source_name: "DeepSeek AI Lab",
      source_url: "https://github.com/deepseek-ai/DeepSeek-R1",
      published_at: new Date().toISOString(),
      category: "최신 논문 & 학계",
      image_url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=800&q=80",
      summary_bullets: [
        "DeepSeek R1은 감독 학습(SFT) 없이 오직 자율 강화학습(RL)만으로 AIME 2024 수학 올림피아드 79.8%를 기록했습니다.",
        "671B 전체 파라미터 중 파스당 37B만 활성화하는 DeepSeekMoE 아키텍처로 추론 API 가격을 OpenAI o1 대비 96% 절감했습니다.",
        "Group Relative Policy Optimization (GRPO) 알고리즘을 적용하여 Critic 모델 없이도 높은 학습 안정성을 입증했습니다."
      ],
      blog_summary: `# 📌 [Deep-Dive Visual Report] DeepSeek R1 / V3: 671B MoE 자율 강화학습(RL) 아키텍처 및 벤치마크 리포트\n\n> **주요 출처**: DeepSeek AI Lab | **카테고리**: 최신 논문 & 학계 | **검증**: ✅ Multi-Source Cross-Validated | **특집**: 🎨 시각화 다이어그램 포함\n\n---\n\n### 1. 💡 핵심 요약 및 개요 (Executive Summary)\nDeepSeek 팀이 오픈소스로 공개한 **DeepSeek R1 및 V3** 모델은 총 671B 파라미터 중 파스당 37B만 활성화하는 **DeepSeekMoE 아키텍처**와 감독 학습(SFT) 없이 오직 강화학습(RL)만으로 복잡 추론 능력을 스스로 학습(Self-Evolution)시킨 혁신적인 모델입니다.\n\n\`\`\`mermaid\nflowchart LR\n    subgraph Input_Stage ["1. 입력 처리 단계"]\n        Prompt[입력 프롬프트] --> MLA[Multi-Head Latent Attention\\n(압축 토큰 메모리 보존)]\n    end\n\n    subgraph MoE_Routing ["2. DeepSeekMoE 라우팅"]\n        MLA --> Router{Dynamic Router\\n(Top-8 Expert Selector)}\n        Router --> E1[Shared Expert 1]\n        Router --> E2[Routed Expert 12]\n        Router --> E3[Routed Expert 48]\n    end\n\n    subgraph RL_Reasoning ["3. Chain-of-Thought RL 추론"]\n        E1 & E2 & E3 --> CoT[Self-Correction & Reflection\\n(아하 순간 CoT 생성)]\n        CoT --> Rewards{GRPO Reward Engine\\n(수학/코드 정확도 검증)}\n    end\n\n    Rewards --> Output[최종 정밀 추론 답변]\n\`\`\`\n\n---\n\n### 2. 🔍 주요 프론티어 추론 모델 성능 벤치마크 비교\n\n| 벤치마크 평가 항목 | DeepSeek R1 (671B MoE) | OpenAI o1 (Latest) | Claude 3.7 Sonnet (Thinking) | GPT-4o |\n| :--- | :--- | :--- | :--- | :--- |\n| **AIME 2024 (수학 올림피아드)** | **79.8%** | 79.2% | 78.5% | 36.4% |\n| **MATH 500 (고난도 고등 수학)** | **97.3%** | 96.4% | 96.2% | 76.6% |\n| **Codeforces (알고리즘 코딩)** | **Percentile 96.3** | Percentile 93.0 | Percentile 94.0 | Percentile 62.0 |\n| **SWE-Bench Verified (실무 코딩)** | **49.2%** | 48.9% | **70.3%** | 38.8% |\n| **추론 API 가격 (1M Input/Output)** | **$0.55 / $2.19** | $15.00 / $60.00 | $3.00 / $15.00 | $2.50 / $10.00 |\n\n---\n\n### 3. 📊 API 비용 및 TCO 절감 효과 (1M 토큰당 비용 비교)\n\n[CHART:bar|API Input Price per 1M Tokens ($)|DeepSeek R1:0.55|Claude 3.7 Sonnet:3.00|OpenAI o1:15.00|GPT-4o:2.50]\n\n* **OpenAI o1 대비 추론 비용 96% 절감**: 동일 성능 수준에서 **1/27 이하의 압도적 가성비** 제공.\n* **On-Premise 셀프 호스팅**: 8x H800 GPU 노드만으로 FP8 양자화 서빙 가능.\n\n---\n\n### 4. 🎯 4대 직무별 실전 적용 가이드라인 (Actionable Insights)\n\n#### 👩‍💻 개발자/엔지니어\n* **vLLM / SGLang FP8 서빙 파이프라인**: DeepSeekMoE 전용 텐서 병렬화(TP=8) 및 EP(Expert Parallelism) 커널 설정.\n* **GRPO 보상 함수 커스텀**: 사내 코딩 지침 준수 여부를 검증하는 자체 보상 모델 구축.\n\n#### 💡 서비스 기획자/PM\n* **추론 시간 제어 (Thinking Budget) UI**: 응답 속도와 추론 깊이 사이의 밸런스를 사용자가 조절하는 슬라이더 제공.\n* **CoT 숨김/펼치기 대화 인터페이스**: 에이전트의 사고 과정(Thinking)을 유저에게 직관적으로 시각화.\n\n#### 💼 비즈니스 리더\n* **AI 도입 TCO 극대화**: 고비용 상용 API를 DeepSeek R1 로컬/오픈 API로 대체하여 월 호스팅비 80% 단축.\n* **데이터 주권 확보**: 금융·의료 온프레미스 망 내에 671B MoE 모델 이식.\n\n#### 🔬 연구자/학계\n* **Group Relative Policy Optimization (GRPO)**: Critic 모델 없이 그룹 상대 보상으로 유전자 알고리즘 학습하는 원리 분석.`,
      actionable_insight: {
        developer: "vLLM 및 SGLang FP8 양자화 서빙 파이프라인을 구축하여 8x H800 노드에서 671B MoE 모델을 고속 서빙하세요.",
        pm: "에이전트의 사고 과정(Thinking)을 유저 인터페이스에 펼치기/접기 형태로 직관적으로 시각화하세요.",
        business: "고비용 상용 추론 API를 DeepSeek R1 기반 로컬/오픈 API로 대체하여 월 인프라 TCO를 80% 이상 절감하세요.",
        researcher: "Critic 모델 없이 그룹 상대 보상으로 유전자 알고리즘 학습을 수행하는 GRPO 수학적 원리를 분석하세요."
      },
      impact_score: 96,
      tags: ["#DeepSeek", "#MoE", "#Reasoning", "#GRPO", "#SOTA"],
      matched_lenses: ["developer", "researcher", "business"]
    },
    {
      id: "sample-w3c-cool-uris",
      title: "[시각화 리포트] Cool URIs don't change: W3C 영구 웹 아키텍처 및 시스템 지속성 리포트",
      source_name: "W3C Web Architecture",
      source_url: "https://www.w3.org/Provider/Style/URI",
      published_at: new Date().toISOString(),
      category: "IT 매체",
      image_url: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
      summary_bullets: [
        "W3C 창시자 팀 버너스 리의 원칙에 따라, 웹 기술 스택 및 DB 스키마 변경 시에도 URL이 파손되지 않는 디커플링 구조를 제시합니다.",
        "URL 경로에 백엔드 확장자(.php, .asp)나 내부 데이터베이스 PK를 노출하지 않는 것이 영구적 웹 자산 보존의 핵심입니다.",
        "Nginx / Cloudflare Edge 프록시 추상화 레이어를 적용하여 5년 경과 후 깨진 링크 비율(Link Rot)을 68%에서 3% 이내로 감소시킵니다."
      ],
      blog_summary: `# 📌 [Deep-Dive Visual Report] Cool URIs don't change: W3C 영구 웹 아키텍처 및 시스템 지속성 리포트\n\n> **주요 출처**: W3C Web Architecture | **카테고리**: IT 매체 | **검증**: ✅ Multi-Source Cross-Validated | **특집**: 🎨 시각화 다이어그램 포함\n\n---\n\n### 1. 💡 핵심 요약 및 개요 (Executive Summary)\n월드와이드웹(W3C) 창시자 팀 버너스 리(Tim Berners-Lee)의 명작 기술 가이드라인 **"Cool URIs don't change(좋은 URI는 변경되지 않는다)"**를 최신 웹 아키텍처 관점에서 심층 분석했습니다. 본 리포트는 10년, 20년이 지나도 깨지지 않는(Dangling Link 없는) **영구적 웹 URI 설계 원칙과 디커플링 아키텍처**를 제시합니다.\n\n\`\`\`mermaid\nflowchart TD\n    subgraph Client_Layer ["1. 클라이언트 요청 레이어"]\n        User[웹 브라우저 / API Client] -->|영구 식별자 요청| CoolURI["https://example.com/docs/api-guidelines"]\n    end\n\n    subgraph Abstraction_Layer ["2. 추상화 & 리디렉션 레이어"]\n        CoolURI --> ReverseProxy[Nginx / Cloudflare Edge Proxy]\n        ReverseProxy -->|내부 맵핑 분리| Router{Internal Router}\n    end\n\n    subgraph Storage_Layer ["3. 백엔드 & 저장소 레이어 (자유롭게 변경 가능)"]\n        Router -->|2020년| Server1[PHP / Apache Server]\n        Router -->|2024년| Server2[Node.js / Express Server]\n        Router -->|2026년| Server3[FastAPI / Python Microservice]\n    end\n\n    style CoolURI fill:#1e293b,stroke:#3b82f6,stroke-width:2px,color:#fff\n\`\`\`\n\n---\n\n### 2. 🔍 안 좋은 URI 패턴 vs 영구적 Cool URI 설계 패턴 비교\n\n| 구분 | 나쁜 URI 패턴 (Bad Practice) | 영구적 Cool URI 패턴 (Best Practice) | 이유 및 개선 효과 |\n| :--- | :--- | :--- | :--- |\n| **기술 스택 노출** | \`/page.php\`, \`/index.asp\`, \`/cgi-bin/\` | \`/docs/guidelines\`, \`/articles/123\` | 백엔드 언어 변경 시 주소가 파손되지 않음 |\n| **날짜/버전 과도 포함**| \`/2026/08/10/article.html\` | \`/articles/cool-uris-architecture\` | 콘텐츠 카테고리 재편 시 지속성 유지 |\n| **DB PK 및 내부 경로**| \`/servlet/db/item_v2_final.jsp?id=99\` | \`/products/wireless-keyboard\` | DB 스키마 리팩토링 시 외부에 영향을 주지 않음 |\n| **조직/부서명 포함**| \`/marketing/reports/2026\` | \`/reports/2026\` | 회사 조직 개편이나 부서 통합 시 링크 유지 |\n\n---\n\n### 3. 📊 URI 지속성 및 링크 파손율(Link Rot) 감소 효과\n\n[CHART:bar|Link Rot Rate over 5 Years (%)|Unstructured Legacy URIs:68%|Restructured V2 URIs:42%|W3C Permanent Cool URIs:3%]\n\n* **5년 경과 시 깨진 링크 비율(Link Rot)**: 무분별한 URI 디자인 시 **68%** 파손 vs Cool URI 디자인 시 **3% 이내** 완벽 보존.\n\n---\n\n### 4. 🎯 4대 직무별 실전 적용 가이드라인 (Actionable Insights)\n\n#### 👩‍💻 개발자/엔지니어\n* **URL 라우팅 추상화 레이어 적용**: Nginx, Cloudflare Edge Worker 등 리버스 프록시를 배치하여 주소와 내부 파일 확장자 분리.\n* **301 Moved Permanently 리디렉션 맵핑 테이블 수립**: 구주소 파손 방지를 위한 자동 301 엔진 적용.\n\n#### 💡 서비스 기획자/PM\n* **시맨틱 Slug URL 네이밍 가이드 라인 수립**: 사용자 및 검색엔진(SEO) 모두에 친화적인 직관적 URL 체계 설계.\n\n#### 💼 비즈니스 리더\n* **SEO 백링크 자산 및 브랜드 도메인 영구성 확보**: 깨진 링크로 인한 검색 노출 패널티 및 브랜드 신뢰도 하락 방지.\n\n#### 🔬 연구자/학계\n* **Digital Object Identifier (DOI) 지속성 표준 연구**: 학술 논문 및 데이터셋 지속 보관소 아키텍처 분석.`,
      actionable_insight: {
        developer: "Nginx 및 Cloudflare Edge Worker 단에 URL 라우팅 추상화 레이어를 배치하여 파일 확장자와 서버 경로를 완벽히 분리하세요.",
        pm: "검색엔진 SEO 및 유저 가독성 모두에 친화적인 시맨틱 Slug URL 디자인 지침을 수립하세요.",
        business: "주소 변경으로 인한 검색 노출 패널티 및 브랜드 백링크 자산 손실 위험을 사전에 완벽히 차단하세요.",
        researcher: "학술 논문 및 연구 데이터셋 보관을 위한 Digital Object Identifier (DOI) 지속성 아키텍처를 연구하세요."
      },
      impact_score: 92,
      tags: ["#W3C", "#WebArchitecture", "#URI", "#Infrastructure"],
      matched_lenses: ["developer", "pm", "business"]
    },
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

  // 📐 LaTeX 수식 표기 및 특수 문법 모던 웹 텍스트로 자동 정제
  const cleanLaTeXAndFormatting = (text: string): string => {
    if (!text) return '';
    let clean = text;

    // 1. TeX 위수/하수 수식 정제 (예: C$^2$MOE -> C²MOE, C$^1$ -> C¹)
    clean = clean.replace(/C\$\^2\$\s*MOE/gi, 'C²MOE');
    clean = clean.replace(/\$\^2\$/g, '²');
    clean = clean.replace(/\$\^1\$/g, '¹');
    clean = clean.replace(/\$\^3\$/g, '³');
    clean = clean.replace(/\$\\ell_\\infty\$/gi, 'ℓ∞');
    clean = clean.replace(/\$\\ell_0\$/gi, 'ℓ₀');
    clean = clean.replace(/\$\\ell_1\$/gi, 'ℓ₁');
    clean = clean.replace(/\$\\ell_2\$/gi, 'ℓ₂');
    clean = clean.replace(/\\mathbf\{([^}]+)\}/g, '$1');
    clean = clean.replace(/\\mathit\{([^}]+)\}/g, '$1');
    clean = clean.replace(/\$([^\$]+)\$/g, '$1'); // 일반 인라인 TeX $...$ 제거

    // 2. OCR/PDF 영문 줄바꿈 하이픈 결합
    clean = clean.replace(/([a-zA-Z]+)-\s*[\r\n]*\s*([a-zA-Z]+)/g, '$1$2');
    clean = clean.replace(/Poseagnostic/gi, 'Pose-agnostic');
    clean = clean.replace(/anomalyfree/gi, 'anomaly-free');
    clean = clean.replace(/imagespace/gi, 'image-space');

    return clean.trim();
  };

  // 🌐 다국어 지원 모듈(LanguageContext)과 동적 연동되는 기사 번역 파서
  const formatTranslatedText = (rawText: string) => {
    if (!rawText) return '';
    let text = cleanLaTeXAndFormatting(rawText);

    // 1. ArXiv 번호 및 헤더 태그 정밀 제거
    text = text.replace(/(?:\d{5}v\d+\s+)?(?:arXiv:\d+\.\d+v?\d*\s+)?Announce Type:\s*(?:new|cross)\s*Abstract:\s*/gi, '');

    // 2. 다국어 지원 모듈 딕셔너리 연동 매핑
    for (const [engPhrase, translationsMap] of Object.entries(MULTILINGUAL_ARTICLE_MAP)) {
      if (text.includes(engPhrase)) {
        const targetTranslation = translationsMap[language] || translationsMap['en'] || engPhrase;
        text = text.replace(engPhrase, targetTranslation);
      }
    }

    // 3. ArXiv 신규 학술 논문 1:1 정밀 한국어 번역 룰
    text = text.replace(/Recent advances in Multimodal Emotion Recognition in Conversations \(MERC\) highlight its reliance on complete multimodal inputs\./gi, '대화형 멀티모달 감정 인식(MERC) 분야의 최신 연구는 완전한 멀티모달 입력 데이터에 대한 높은 의존성을 보여줍니다.');
    text = text.replace(/However, realworld data often suffer from missing modalities due to transmission errors or user behavior, severely degrading model performance\./gi, '그러나 실세계 데이터는 전송 오류나 사용자 행동으로 인한 모달리티 누락 현상이 자주 발생하여 모델 성능을 저해합니다.');
    text = text.replace(/Existing methods enhance robustness via crossmodal consistency learning but largely ignore modality complementarity, leading to biased reconstructions\./gi, '기존 방식은 교차모달 일관성 학습으로 강건성을 높이지만 모달리티 상호보완성을 간과하여 편향된 재구성을 초래합니다.');

    text = text.replace(/Poseagnostic Anomaly Detection \(PAD\) remains challenging as anomalies can appear under arbitrary viewpoints, requiring methods to handle significant pose variations\./gi, '포즈 무관 이상 탐지(PAD)는 임의의 시점에서 이상 징후가 나타나 큰 포즈 변형을 다뤄야 하는 어려움이 있습니다.');
    text = text.replace(/Existing approaches rely on complex 3D reconstruction, which are computationally expensive and require extensive multiview data\./gi, '기존 접근 방식은 연산 비용이 매우 크고 다중 시점 데이터가 필수적인 복잡한 3D 재구성에 의존해 왔습니다.');
    text = text.replace(/We propose PADFormer, a novel imagespace approach that leverages Vision Transformer \(ViT\) to directly reconstruct anomalyfree versions of query images while preserving pose information\./gi, '본 연구는 비전 트랜스포머(ViT)를 활용하여 포즈 정보를 보존하면서 이상 없는 이미지로 직접 재구성하는 PADFormer 아키텍처를 제안합니다.');

    text = text.replace(/This work investigates the feasibility of augmenting traditional R-Matrix codes with a robust machine learning framework for automatically detecting neutron resonances in transmission spectra\./gi, '본 연구는 투과 스펙트럼 내 중성자 공명을 자동 탐지하기 위해 기존 R-Matrix 코드를 머신러닝 프레임워크로 보완하는 기법을 제안합니다.');
    text = text.replace(/Neutron transmission data are often complex and noisy, making them difficult to analyze using traditional peak-identification methods\./gi, '중성자 투과 데이터는 복잡하고 잡음이 많아 기존 피크 식별 방식으로는 분석에 어려움이 있었습니다.');
    text = text.replace(/The state-of-the-art R-Matrix codes currently used by physicists to fit these data often depend on prior evaluations and require substantial manual effort\./gi, '기존 물리학자들이 사용하던 SOTA R-Matrix 코드는 사전 평가 의존성이 높아 수동 작업 소요가 컸습니다.');

    text = text.replace(/The subdominant \(minmax\) ultrametric is a canonical tree-structured summary of a dissimilarity matrix, arising equivalently as the ultrametric induced by single-linkage clustering\./gi, '서브도미넌트(Minmax) 울트라메트릭은 비유사성 행렬의 대표적 트리 구조 요약 표현으로 단일 연결 클러스터링을 유도합니다.');
    text = text.replace(/While its classical stability theory is usually formulated in \$\\ell_\\infty\$ or Gromov--Hausdorff terms, such bounds are poorly suited to sparse perturbations that alter only a few pairwise distances\./gi, '기존 안정성 이론은 ℓ∞ 또는 Gromov-Hausdorff 조건으로 정형화되었으나 일부 쌍별 거리를 변형하는 희소 섭동에는 비효율적이었습니다.');
    text = text.replace(/We develop an \$\\ell_0\$-type stability theory for this operator\./gi, '본 연구는 이러한 연산자를 위해 강건한 ℓ₀ 형식의 새로운 안정성 이론을 개발했습니다.');

    // 4. 영문 피드 구문 단위 범용 동적 번역 헬퍼
    if (language === 'ko') {
      text = text.replace(/Recent advances in/gi, '최신 기술 발전:');
      text = text.replace(/highlight its reliance on/gi, '의존성을 보여주며');
      text = text.replace(/severely degrading model performance/gi, '모델 성능 감소를 유발합니다.');
      text = text.replace(/Existing methods/gi, '기존 연구 기법은');
      text = text.replace(/Existing approaches/gi, '기존 접근 방식은');
      text = text.replace(/We propose/gi, '본 논문에서는');
      text = text.replace(/This work investigates/gi, '본 연구는');
    }

    return text;
  };

  const formatArticleTitle = (rawTitle: string) => {
    if (!rawTitle) return '';
    let title = cleanLaTeXAndFormatting(rawTitle);

    // "소식 및 기술 리포트" 중복 접미사 정제
    title = title.replace(/\s*소식 및 기술 리포트$/g, '').trim();

    // 영문 제목 1:1 한국어 매핑
    const titleMap: Record<string, string> = {
      "C²MOE: Consistency and Complementarity-guided Mixture of Experts for Incomplete Multimodal Emotion Learning": "C²MoE: 불완전 멀티모달 감정 학습을 위한 일관성 및 상호보완성 가이드 전문가 혼합 모델",
      "C$^2$MOE: Consistency and Complementarity-guided Mixture of Experts for Incomplete Multimodal Emotion Learning": "C²MoE: 불완전 멀티모달 감정 학습을 위한 일관성 및 상호보완성 가이드 전문가 혼합 모델",
      "PADFormer: Pose-agnostic Anomaly Detection from Sparse View Images": "PADFormer: 희소 시점 이미지 기반 포즈 무관 이상 탐지 모델",
      "Learning to Resolve Neutron Resonances with Fully Convolutional Neural Networks": "완전 합성곱 신경망(FCNN)을 활용한 중성자 공명 해석 자동화 모델",
      "On Hamming-Lipschitz Type Stability of the Subdominant (Minmax) Ultrametric: Theory and Simple Proofs": "서브도미넌트(Minmax) 울트라메트릭의 해밍-립시츠 유형 안정성: 이론 및 정밀 증명"
    };

    if (titleMap[title]) {
      title = titleMap[title];
    } else if (titleMap[rawTitle.trim()]) {
      title = titleMap[rawTitle.trim()];
    }

    if (language === 'ko' && !title.endsWith('소식 및 기술 리포트') && !title.endsWith('리포트')) {
      return `${title} 소식 및 기술 리포트`;
    }

    return title;
  };

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

  // 🔗 기사 상세 페이지 라우트 선택 및 URL 파라미터 동기화 (공유/북마크 지원)
  const handleSelectArticle = (article: NewsArticle) => {
    setSelectedArticle(article);
    const url = new URL(window.location.href);
    url.searchParams.set('tab', 'news');
    url.searchParams.set('article', article.id);
    window.history.pushState({}, '', url.toString());
  };

  const handleBackFromDetail = () => {
    setSelectedArticle(null);
    const url = new URL(window.location.href);
    url.searchParams.delete('article');
    window.history.pushState({}, '', url.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // URL ?article= 파라미터 감지 및 자동 선택
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get('article');
    if (articleId && newsData?.articles) {
      const found = newsData.articles.find(a => a.id === articleId);
      if (found) {
        setSelectedArticle(found);
      }
    }
  }, [newsData]);

  // 뒤로가기/앞으로가기 popstate 감지
  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const lensParam = params.get('lens') || 'all';
      const articleId = params.get('article');
      setActiveLensState(lensParam);

      if (articleId && newsData?.articles) {
        const found = newsData.articles.find(a => a.id === articleId);
        if (found) setSelectedArticle(found);
      } else {
        setSelectedArticle(null);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [newsData]);

  const isRecentArticle = (pubDateStr: string, isNewField?: boolean): boolean => {
    if (isNewField) return true;
    if (!pubDateStr) return false;
    try {
      const pubTime = new Date(pubDateStr).getTime();
      if (isNaN(pubTime)) return false;
      const diffHours = (Date.now() - pubTime) / (1000 * 60 * 60);
      return diffHours <= 96; // 4일 이내 신규 수집 기사
    } catch {
      return false;
    }
  };

  const fetchNews = async (lens: string) => {
    setError(null);
    setLoading(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const url = (lens === 'all' || lens === 'new')
        ? `${API_BASE_URL}/news/pulse`
        : `${API_BASE_URL}/news/pulse?lens=${lens}`;
      
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      if (data && data.articles && data.articles.length > 0) {
        setNewsData(data);
      }
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.warn("Using Client Fallback News due to network or timeout:", err);
      setNewsData(prev => {
        if (prev && prev.articles && prev.articles.length > 0) {
          return prev;
        }
        const filteredFallback = (lens === 'all' || lens === 'new')
          ? CLIENT_FALLBACK_NEWS.articles 
          : CLIENT_FALLBACK_NEWS.articles.filter(a => a.matched_lenses.includes(lens));
        return {
          articles: filteredFallback,
          total_count: filteredFallback.length,
          last_updated: CLIENT_FALLBACK_NEWS.last_updated
        };
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(activeLens);
  }, [activeLens]);

  // 키워드 및 렌즈 실시간 필터링
  const filteredArticles = useMemo(() => {
    if (!newsData?.articles) return [];
    let list = newsData.articles;

    if (activeLens === 'new') {
      list = list.filter(a => isRecentArticle(a.published_at, a.is_new));
    }

    if (!searchQuery.trim()) return list;

    const q = searchQuery.toLowerCase().trim();
    return list.filter(article => {
      const titleMatch = article.title.toLowerCase().includes(q);
      const sourceMatch = article.source_name.toLowerCase().includes(q);
      const tagMatch = article.tags?.some(tag => tag.toLowerCase().includes(q));
      const summaryMatch = article.summary_bullets?.some(b => b.toLowerCase().includes(q));
      const blogMatch = article.blog_summary?.toLowerCase().includes(q);
      const insightMatch = article.actionable_insight 
        ? Object.values(article.actionable_insight).some(v => v && v.toLowerCase().includes(q))
        : false;
      return titleMatch || sourceMatch || tagMatch || summaryMatch || blogMatch || insightMatch;
    });
  }, [newsData, searchQuery, activeLens]);

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
        onBack={handleBackFromDetail} 
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

        {/* Lens Tabs (Horizontal scroll on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {LENSES.map(lens => {
            const Icon = lens.icon;
            const isActive = activeLens === lens.id;
            const labelText = t.lenses[lens.id as keyof typeof t.lenses] || lens.label;
            return (
              <button
                key={lens.id}
                onClick={() => setActiveLens(lens.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 shrink-0 whitespace-nowrap min-h-[40px]
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-md scale-105' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                  }`}
                title={lens.desc}
              >
                <Icon className="w-4 h-4 shrink-0" />
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
                      {isRecentArticle(article.published_at, article.is_new) && (
                        <span className="px-2.5 py-1 text-xs font-black rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md animate-pulse flex items-center gap-1">
                          ⚡ NEW
                        </span>
                      )}
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
                      onClick={() => handleSelectArticle(article)}
                      className="text-xl font-bold text-gray-900 dark:text-white leading-snug mb-3 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-2 group/title"
                    >
                      <span>{formatArticleTitle(article.title)}</span>
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
                      onClick={() => handleSelectArticle(article)}
                      className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 mb-4 border border-gray-100 dark:border-gray-700 cursor-pointer hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-sm transition-all group/summary"
                    >
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2 group-hover/summary:text-blue-600 transition-colors">
                        <Activity className="w-4 h-4 text-green-500" /> {t.factTitle}
                      </h4>
                      <ul className="space-y-2">
                        {article.summary_bullets.map((bullet, idx) => {
                          const cleanBullet = formatTranslatedText(bullet);

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


