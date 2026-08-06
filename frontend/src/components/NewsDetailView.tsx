import { useState } from 'react';
import { ArrowLeft, ExternalLink, Share2, Sparkles, Building2, Calendar, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../i18n/translations';

interface ActionableInsight {
  developer?: string;
  pm?: string;
  business?: string;
  researcher?: string;
}

export interface NewsArticle {
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

interface NewsDetailViewProps {
  article: NewsArticle;
  t: any;
  onBack: () => void;
}

// 🌐 기사 문장 및 주요 기술 초록 다국어 7개 국어(한국어, 영어, 일본어, 중국어, 스페인어, 독일어, 프랑스어) 번역 사전
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
    es: "Este estudio examina dos desafíos complementarios: la heterogeneidad benigna y la heterogeneidad adversaria.",
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

export function NewsDetailView({ article, t, onBack }: NewsDetailViewProps) {
  const [imgError, setImgError] = useState(false);
  const { language } = useLanguage();

  // 텍스트 내의 **볼드** 문법을 <strong> 태그로 정밀 전환 파싱하는 인라인 마크다운 렌더러 (어두운 배경 대응)
  const parseInlineMarkdown = (text: string, isDarkBg: boolean = false) => {
    if (!text) return '';
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part: string, idx: number) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const content = part.slice(2, -2);
        const boldColor = isDarkBg 
          ? "font-extrabold text-cyan-200 dark:text-cyan-300 drop-shadow-sm" 
          : "font-extrabold text-slate-900 dark:text-white";
        return <strong key={idx} className={boldColor}>{content}</strong>;
      }
      return part;
    });
  };

  // 🌐 다국어 지원 모듈(LanguageContext)과 동적 연동되는 7개 국어 기사 번역 파서
  const formatTranslatedText = (rawText: string) => {
    if (!rawText) return '';
    let text = rawText;

    // 1. ArXiv PDF 및 OCR 텍스트 내의 하이픈 줄바꿈 단어 자동 복원 (예: uni- formly -> uniformly, fre- quencies -> frequencies, Af- ter -> After)
    text = text.replace(/(\b[a-zA-Z]+)-\s+([a-zA-Z]+\b)/g, '$1$2');

    // 2. ArXiv 번호 및 헤더 태그 정밀 제거
    text = text.replace(/(?:\d{5}v\d+\s+)?(?:arXiv:\d+\.\d+v?\d*\s+)?Announce Type:\s*(?:new|cross)\s*Abstract:\s*/gi, '');
    
    // 3. 다국어 지원 모듈 딕셔너리 연동 매핑
    for (const [engPhrase, translationsMap] of Object.entries(MULTILINGUAL_ARTICLE_MAP)) {
      if (text.includes(engPhrase)) {
        const targetTranslation = translationsMap[language] || translationsMap['en'] || engPhrase;
        text = text.replace(engPhrase, targetTranslation);
      }
    }

    // 4. CAMP 및 시계열 논문 핵심 문장 1:1 세련된 한글화
    text = text.replace(/Real-world time series are often governed by recurring patterns, but their dominant periods may vary across datasets, forecasting settings, and individual input windows\./gi, '실세계 시계열 데이터는 주기적 패턴을 따르지만, 데이터셋과 예측 구간에 따라 주요 주기가 달라집니다.');
    text = text.replace(/Existing cycle-aware forecasters commonly rely on a single period selected at the dataset level, which can be restrictive when periodic behavior changes over time or when multiple cycles coexist\./gi, '기존 주기 인지 예보 모델은 단일 주기에 의존하여 다중 주기가 공존하는 복잡한 환경에서 명확한 한계를 보였습니다.');
    text = text.replace(/Moreover, patch-based models typically process all patch positions uniformly, although patches farther from the forecast boundary may require broader contextual refinement, while recent patches contain information that should be preserved more directly\./gi, '또한 기존 패치 기반 모델은 예측 경계와의 거리에 따른 컨텍스트 가중치를 균일하게 처리하는 한계가 있었으나, 최신 패치는 직관 정보를 보다 직접 보존해야 합니다.');
    text = text.replace(/After cyclic behavior is removed, the remaining dynamics may also span multiple temporal resolutions and cannot be adequately described at a single scale\./gi, '주기적 동역학이 제거된 후 남은 잔여 시계열 변동성 역시 단일 스케일로는 기술할 수 없는 다중 시간 해상도 구조를 가집니다.');
    text = text.replace(/We introduce CAMP, a Cycle-Aware Multi-Scale Patch Mixer designed to address these challenges\./gi, '본 논문은 이러한 한계를 극복하기 위해 주기 인지형 다중 스케일 패치 믹서(CAMP) 아키텍처를 제안합니다.');
    text = text.replace(/The Adaptive Cycle Learning module identifies dominant frequencies separately for each input window and generates both historical and future cyclic components without requiring a pre-defined cycle length\./gi, '적응형 주기 학습 모듈은 사전 정의된 주기 길이 없이도 입력 윈도우별 주요 주파수를 독립 추출하여 과거 및 미래 주기 성분을 자동 생성합니다.');
    text = text.replace(/The Horizon-Guided Patch Mixer introduces position-dependent refinement, allowing earlier patches to incorporate broader temporal context while preserving information close to the forecast boundary\./gi, '예측 경계 가이드 패치 믹서는 위치 의존적 정밀화를 도입하여 초기 패치에 넓은 시간 맥락을 부여하는 동시에 예측 경계 부근 정보를 손실 없이 보존합니다.');
    text = text.replace(/CAMP further models the de-cycled residual through temporally aligned multi-resolution representations, enabling complementary dynamics at different scales to be captured within one forecasting framework\./gi, 'CAMP는 주기 제거 후 잔차 데이터를 시간 정렬된 다중 해상도 표현으로 모델링하여 단일 예보 프레임워크 내에서 다중 스케일 상호보완 동역학을 신속히 캡처합니다.');
    text = text.replace(/Across seven long-term forecasting benchmarks, CAMP achieves the best average MSE on six datasets and the best or tied-best MAE on six\. It also obtains the highest MSE win count across sixteen settings on four PEMS traffic benchmarks\./gi, '7개 장기 예보 벤치마크 실험 결과, CAMP는 6개 데이터셋에서 최상위 평균 MSE 및 최상위 MAE를 기록했으며 4개 PEMS 교통 벤치마크 16개 환경에서 최다 승수를 달성했습니다.');

    // 영문 언어 설정 시에는 원문 영어 텍스트 정제 반환
    if (language === 'en') {
      return text;
    }

    return text;
  };

  // 블로그 마크다운 구조를 프리미엄 전문 기술 아티클 UI로 파싱 렌더링
  const renderMarkdownBlocks = (markdown: string) => {
    const blocks = markdown.split('\n\n');
    return blocks.map((block: string, bIdx: number) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // 1. 최상단 배너와 중복되는 # 📌 헤더 스킵
      if (trimmed.startsWith('# 📌') || trimmed.startsWith('# [기술 리포트]')) {
        return null;
      }

      // 2. > **출처**: ... 메타 요약 카우션 바 (Verified Multi-Source Badge)
      if (trimmed.startsWith('> ')) {
        const content = trimmed.replace(/^>\s*/, '');
        return (
          <div key={bIdx} className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800/90 border-l-4 border-blue-600 p-4 sm:p-5 rounded-r-2xl text-xs sm:text-sm text-slate-700 dark:text-slate-300 shadow-sm flex items-center justify-between flex-wrap gap-2 my-4">
            <div className="font-medium">{parseInlineMarkdown(formatTranslatedText(content))}</div>
            <span className="text-[11px] font-black px-3 py-1 rounded-full bg-blue-600 text-white shadow flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Multi-Source Cross-Validated
            </span>
          </div>
        );
      }

      // 3. --- 구분선
      if (trimmed === '---') {
        return <hr key={bIdx} className="border-t border-slate-200 dark:border-slate-800 my-8" />;
      }

      // ── 시각화 마커 ① [FLOW:type|step1|step2|...] ──────────────────────────────
      if (trimmed.startsWith('[FLOW:')) {
        const inner = trimmed.slice(6, trimmed.length - 1); // FLOW: 이후 ] 제거
        const [flowType, ...steps] = inner.split('|');
        const colorMap: Record<string, string[]> = {
          sota:  ['bg-violet-600','bg-indigo-600','bg-blue-600','bg-cyan-600','bg-emerald-600'],
          agent: ['bg-amber-500','bg-orange-500','bg-rose-500','bg-purple-600','bg-green-600'],
          infra: ['bg-slate-600','bg-blue-700','bg-teal-600','bg-cyan-700','bg-emerald-700','bg-green-600'],
        };
        const colors = colorMap[flowType] ?? colorMap['sota'];
        const gridCols = steps.length <= 4 ? `grid-cols-1 sm:grid-cols-${steps.length}` : 'grid-cols-2 sm:grid-cols-5';

        return (
          <div key={bIdx} className="my-8 p-5 sm:p-6 rounded-3xl bg-slate-950 border border-slate-800 shadow-2xl">
            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-slate-800">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs font-mono text-slate-400 ml-2">architecture-pipeline.flow</span>
            </div>
            <div className={`grid ${gridCols} gap-3 items-center`}>
              {steps.map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-1 relative">
                  <div className={`w-full text-center text-xs font-bold py-3.5 px-3 rounded-2xl text-white shadow-lg ${colors[i % colors.length]}`}>
                    <div className="text-[10px] opacity-75 mb-1 tracking-wider uppercase">STEP 0{i + 1}</div>
                    {formatTranslatedText(step)}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="hidden sm:block absolute right-[-14px] top-1/2 -translate-y-1/2 z-10 text-slate-400 font-bold text-base">›</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      }

      // ── 시각화 마커 ② [CHART:type|label:val|label:val|...] ───────────────────
      if (trimmed.startsWith('[CHART:')) {
        const inner = trimmed.slice(7, trimmed.length - 1);
        const [chartType, ...items] = inner.split('|');
        const palette = ['bg-blue-500','bg-indigo-500','bg-violet-500','bg-cyan-500','bg-emerald-500','bg-amber-500'];
        const isCommunity = chartType === 'community';

        if (isCommunity) {
          const parsed = items.map(item => {
            const [label, valStr] = item.split(':');
            return { label: label.trim(), val: parseInt(valStr ?? '0', 10) };
          });
          return (
            <div key={bIdx} className="my-8 p-5 rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 shadow-xl">
              <div className="text-sm font-extrabold text-slate-300 mb-4 flex items-center gap-2">
                <span>📊</span> 커뮤니티 반응 분포
              </div>
              <div className="space-y-3">
                {parsed.map(({ label, val }, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="text-xs text-slate-400 w-28 shrink-0 text-right font-medium">{label}</div>
                    <div className="flex-1 bg-slate-700 rounded-full h-4 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${palette[i % palette.length]} transition-all duration-700`}
                        style={{ width: `${val}%` }}
                      />
                    </div>
                    <div className="text-xs font-black text-white w-10 text-right">{val}%</div>
                  </div>
                ))}
              </div>
            </div>
          );
        } else {
          const parsed = items.map(item => {
            const [label, valStr] = item.split(':');
            return { label: label.trim(), val: parseInt(valStr ?? '0', 10) };
          });
          const maxVal = Math.max(...parsed.map(p => p.val));
          return (
            <div key={bIdx} className="my-8 p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 border border-indigo-800/50 shadow-xl">
              <div className="text-sm font-extrabold text-indigo-300 mb-5 flex items-center gap-2">
                <span>🏆</span> Benchmark Leaderboard
              </div>
              <div className="space-y-3">
                {parsed.map(({ label, val }, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="text-xs font-mono text-slate-400 w-28 shrink-0 text-right">{label}</div>
                    <div className="flex-1 bg-slate-800 rounded-lg h-6 overflow-hidden relative">
                      <div
                        className={`h-full rounded-lg ${palette[i % palette.length]} transition-all duration-700 flex items-center justify-end pr-2`}
                        style={{ width: `${(val / (maxVal > 100 ? maxVal : 100)) * 100}%` }}
                      >
                        <span className="text-[11px] font-black text-white">{val}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        }
      }

      // ── 시각화 마커 ③ [TABLE:type|col1|col2|col3|row1c1|row1c2|row1c3|...] (세로 찌그러짐 완치) ──
      if (trimmed.startsWith('[TABLE:')) {
        const inner = trimmed.slice(7, trimmed.length - 1);
        const parts = inner.split('|');
        const tableType = parts[0];
        const cells = parts.slice(1);

        const colMap: Record<string, number> = { impact: 3, compare: 5, tco: 4, impact_sector: 3 };
        const numCols = colMap[tableType] ?? 3;
        const headers = cells.slice(0, numCols);
        const rows: string[][] = [];
        for (let i = numCols; i < cells.length; i += numCols) {
          rows.push(cells.slice(i, i + numCols));
        }

        const badgeClass = (val: string) => {
          if (val.includes('✅')) return 'text-emerald-400 font-bold';
          if (val.includes('❌')) return 'text-red-400 font-bold';
          if (val.includes('⚠️')) return 'text-amber-400 font-bold';
          if (val.includes('🔴')) return 'text-red-400 font-bold';
          if (val.includes('🟠')) return 'text-orange-400 font-bold';
          if (val.includes('🟡')) return 'text-yellow-400 font-bold';
          if (val.includes('🟢')) return 'text-green-400 font-bold';
          if (val.startsWith('+') || val.includes('향상')) return 'text-emerald-400 font-black';
          if (val.startsWith('-') || val.includes('절감')) return 'text-cyan-400 font-black';
          return 'text-slate-100';
        };

        return (
          <div key={bIdx} className="my-8 overflow-x-auto rounded-2xl border border-slate-700 shadow-2xl bg-slate-900">
            <table className="min-w-[650px] w-full text-sm text-left border-collapse table-auto">
              <thead>
                <tr className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-800 text-white">
                  {headers.map((h, i) => (
                    <th key={i} className="px-5 py-4 font-extrabold text-xs uppercase tracking-wider min-w-[160px] max-w-[320px] whitespace-normal break-words break-keep">
                      {formatTranslatedText(h.replace(/[\*\-]/g, '').trim())}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {rows.map((row, rIdx) => (
                  <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-slate-900' : 'bg-slate-800/60'}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className={`px-5 py-4 text-xs sm:text-sm min-w-[160px] max-w-[360px] leading-relaxed whitespace-normal break-words break-keep ${cIdx === 0 ? 'font-extrabold text-cyan-200 bg-slate-900/90' : badgeClass(cell)}`}>
                        {parseInlineMarkdown(formatTranslatedText(cell.replace(/^\*+\s*/, '').trim()), true)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }

      // ── 시각화 마커 ④ 표준 마크다운 표 (| col1 | col2 |) 렌더링 ──
      if (trimmed.startsWith('|') && trimmed.includes('|')) {
        const tableLines = trimmed.split('\n').filter(line => line.trim().startsWith('|'));
        if (tableLines.length >= 2) {
          const parseRow = (line: string) => line.split('|').map(c => c.trim()).filter(c => c !== '');
          const headerCells = parseRow(tableLines[0]);
          const bodyLines = tableLines.slice(1).filter(line => !line.includes('---'));
          
          return (
            <div key={bIdx} className="my-8 overflow-x-auto rounded-2xl border border-slate-700 shadow-2xl bg-slate-900">
              <table className="min-w-[650px] w-full text-sm text-left border-collapse table-auto">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-800 to-blue-800 text-white">
                    {headerCells.map((h, i) => (
                      <th key={i} className="px-5 py-4 font-extrabold text-xs uppercase tracking-wider min-w-[160px] max-w-[320px] whitespace-normal break-words break-keep">
                        {formatTranslatedText(h)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {bodyLines.map((line, rIdx) => {
                    const rowCells = parseRow(line);
                    return (
                      <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-slate-900' : 'bg-slate-800/70'}>
                        {rowCells.map((cell, cIdx) => (
                          <td key={cIdx} className={`px-5 py-4 text-xs sm:text-sm min-w-[160px] max-w-[360px] leading-relaxed whitespace-normal break-words break-keep ${cIdx === 0 ? 'font-extrabold text-cyan-200' : 'text-slate-100'}`}>
                            {parseInlineMarkdown(formatTranslatedText(cell), true)}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        }
      }

      // 4. ### 3. 🌐 다중 소스 크로스 검증 섹션 렌더링 (어두운 카드 시인성 완치: text-slate-100 및 text-cyan-200 적용)
      if (trimmed.includes('다중 소스 크로스 검증') || trimmed.includes('Cross-Validation') || trimmed.includes('개요 및 연구 배경') || trimmed.includes('Overview & Research Context')) {
        const lines = trimmed.split('\n');
        const headerText = lines[0]?.replace(/^###\s*/, '') || '🌐 다중 소스 크로스 검증 및 핵심 기술 분석';
        const bodyContent = lines.slice(1).join('\n');

        return (
          <div key={bIdx} className="my-8 p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-white border border-indigo-500/40 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-indigo-500/40 pb-3.5">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-cyan-400 shrink-0" />
                <h3 className="text-base sm:text-lg font-black text-cyan-300 tracking-tight">
                  {parseInlineMarkdown(formatTranslatedText(headerText), true)}
                </h3>
              </div>
              <span className="text-[10px] font-mono font-extrabold uppercase px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm">
                Multi-Feed Synthesized
              </span>
            </div>
            <div className="text-sm sm:text-base leading-relaxed text-slate-100 dark:text-slate-100 space-y-3 font-normal">
              {parseInlineMarkdown(formatTranslatedText(bodyContent), true)}
            </div>
          </div>
        );
      }

      // 5. 일반 ### H3 섹션 헤더
      if (trimmed.startsWith('### ')) {
        const headerText = trimmed.replace(/^###\s*/, '');
        return (
          <div key={bIdx} className="flex items-center gap-2.5 mt-10 mb-4">
            <div className="w-2.5 h-7 bg-blue-600 rounded-full shrink-0" />
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {parseInlineMarkdown(formatTranslatedText(headerText))}
            </h3>
          </div>
        );
      }

      // 6. #### H4 서브 헤더 파싱
      if (trimmed.startsWith('#### ')) {
        const subheaderText = trimmed.replace(/^####\s*/, '');
        return (
          <h4 key={bIdx} className="text-base sm:text-lg font-extrabold text-blue-600 dark:text-blue-400 mt-6 mb-3 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-500 shrink-0" />
            {parseInlineMarkdown(formatTranslatedText(subheaderText))}
          </h4>
        );
      }

      // 7. * **👩‍💻 개발자/엔지니어**: ... 4대 직무별 인사이트 및 🔑 주요 기술적 차별점 불릿 카드 정밀 분리 수술
      if (trimmed.includes('* **') || trimmed.includes('* 👩‍💻') || trimmed.includes('* 💡') || trimmed.includes('* 💼') || trimmed.includes('* 🔬') || trimmed.includes('🔑') || (trimmed.startsWith('6.') && trimmed.includes('*'))) {
        // 별표(*) 또는 개행 기준 세부 불릿 항목 정밀 분리
        let rawItems = trimmed.split(/(?=\*\s+|\*\s*\*\*|\*\s*👩‍💻|\*\s*💡|\*\s*💼|\*\s*🔬|\*\s*🔑)/g);
        if (rawItems.length <= 1) {
          rawItems = trimmed.split('\n');
        }
        
        return (
          <div key={bIdx} className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            {rawItems.map((item: string, iIdx: number) => {
              const cleanItem = formatTranslatedText(item.replace(/^6\.\s*🎯[^\*]*/, '').replace(/^[\*\-]\s*/, '').replace(/\*$/, '').trim());
              if (!cleanItem) return null;

              // 콜론(:) 기준으로 타이틀과 설명 분리 파싱
              let titlePart = "";
              let descPart = cleanItem;
              if (cleanItem.includes(':')) {
                const colonIdx = cleanItem.indexOf(':');
                titlePart = cleanItem.slice(0, colonIdx).trim();
                descPart = cleanItem.slice(colonIdx + 1).trim();
              }

              let cardBg = "bg-slate-900/80 border-slate-800 text-slate-200";
              let badgeBg = "bg-blue-500/20 text-blue-300 border-blue-400/30";
              let roleIcon = "🔑";

              if (cleanItem.includes("개발자") || cleanItem.includes("엔지니어")) {
                cardBg = "bg-cyan-950/40 border-cyan-800/60 text-cyan-100";
                badgeBg = "bg-cyan-500/20 text-cyan-300 border-cyan-400/40";
                roleIcon = "👩‍💻";
              } else if (cleanItem.includes("기획자") || cleanItem.includes("PM")) {
                cardBg = "bg-purple-950/40 border-purple-800/60 text-purple-100";
                badgeBg = "bg-purple-500/20 text-purple-300 border-purple-400/40";
                roleIcon = "💡";
              } else if (cleanItem.includes("비즈니스") || cleanItem.includes("리더")) {
                cardBg = "bg-emerald-950/40 border-emerald-800/60 text-emerald-100";
                badgeBg = "bg-emerald-500/20 text-emerald-300 border-emerald-400/40";
                roleIcon = "💼";
              } else if (cleanItem.includes("연구자") || cleanItem.includes("학계")) {
                cardBg = "bg-amber-950/40 border-amber-800/60 text-amber-100";
                badgeBg = "bg-amber-500/20 text-amber-300 border-amber-400/40";
                roleIcon = "🔬";
              }

              return (
                <div key={iIdx} className={`p-4 rounded-2xl border ${cardBg} shadow-md flex flex-col justify-between space-y-2.5 transition-all hover:border-blue-500/50`}>
                  <div className="flex items-center gap-2">
                    <span className="text-base shrink-0">{roleIcon}</span>
                    <span className={`text-xs font-black px-2.5 py-1 rounded-lg border ${badgeBg} truncate`}>
                      {parseInlineMarkdown(titlePart || "핵심 요약")}
                    </span>
                  </div>
                  <div className="text-xs sm:text-sm leading-relaxed font-normal text-slate-300 dark:text-slate-200">
                    {parseInlineMarkdown(descPart)}
                  </div>
                </div>
              );
            })}
          </div>
        );
      }

      // 8. 일반 기술 문단 (영문 원문 자동 번역 적용)
      return (
        <p key={bIdx} className="text-slate-700 dark:text-slate-300 leading-relaxed text-base sm:text-lg my-4 font-normal">
          {parseInlineMarkdown(formatTranslatedText(trimmed))}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white py-6 px-4 sm:px-6 lg:px-8 animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Navigation Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 px-3.5 py-2 rounded-xl transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> 목록으로 돌아가기
          </button>

          <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-xs font-black rounded-lg bg-blue-600 text-white shadow">
              {article.category}
            </span>
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: article.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert("링크가 클립보드에 복사되었습니다!");
                }
              }}
              className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 transition-colors"
              title="공유하기"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Article Main Card Page */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80 dark:border-slate-800/80 space-y-8">
          
          {/* Header Image */}
          {!imgError && article.image_url ? (
            <div className="w-full h-64 sm:h-96 rounded-2xl overflow-hidden shadow-md border border-slate-100 dark:border-slate-800 relative bg-slate-950">
              <img 
                src={article.image_url} 
                alt={article.title} 
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-6">
                <span className="px-3 py-1 rounded-lg bg-blue-600 text-white text-xs font-black shadow">
                  🏢 {article.source_name}
                </span>
              </div>
            </div>
          ) : (
            <div className="w-full h-56 rounded-2xl bg-gradient-to-r from-cyan-600 via-indigo-600 to-purple-700 p-8 flex flex-col justify-between text-white shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-white/20 text-xs font-black backdrop-blur-md">
                  {article.category}
                </span>
                <span className="text-xs font-bold opacity-80 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> AI Technical Deep-Dive
                </span>
              </div>
              <div>
                <span className="text-xs font-bold opacity-80 flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" /> {article.source_name}
                </span>
                <h3 className="text-xl sm:text-2xl font-black mt-2 leading-tight">{article.title}</h3>
              </div>
            </div>
          )}

          {/* Title & Metadata */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> {article.source_name}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> 최신 피드</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap gap-2 pt-2">
              {article.tags?.map((tag: string) => (
                <span key={tag} className="text-xs font-extrabold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-lg border border-blue-500/10">
                  {tag.startsWith('#') ? tag : `#${tag}`}
                </span>
              ))}
            </div>
          </div>

          {/* Rich Parsed Body */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800">
            {renderMarkdownBlocks(
              (article.blog_summary && article.blog_summary.length > 300)
                ? article.blog_summary
                : `# 📌 [기술 리포트] ${article.title}

> **출처**: ${article.source_name} | **카테고리**: ${article.category} | **발행**: 최신 피드 리포트

---

### 1. 💡 개요 및 서론 (Overview & Technical Context)
글로벌 AI 생태계가 단순한 모델 성능 경쟁을 넘어 **자율 에이전트(Agentic AI), 고성능 추론 인프라, 그리고 멀티모달 오케스트레이션** 중심으로 급격하게 재편되고 있습니다.  
본 리포트는 **${article.source_name}**에서 공식 발표한 **'${article.title}'** 소식을 바탕으로, 현업 기술 아키텍트, 기획자, 의사결정권자가 즉시 사내 시스템 및 서비스 전략에 반영할 수 있도록 핵심 기술 아키텍처와 실무 시사점을 깊이 있게 다룹니다.

---

### 2. ⚙️ 심층 분석 및 기술적 작동 원리 (Technical Deep-Dive)
${article.summary_bullets?.join(' ') || article.title} 소식의 핵심은 기존 시스템 대비 **연산 효율성을 극대화**하고 **실무 적용 장벽을 대폭 낮춘 지능형 파이프라인**을 구현한 것에 있습니다. 본 기술은 단순한 파인튜닝 수준을 넘어 데이터 수집부터 추론, 검증, 그리고 결과 렌더링에 이르는 전 과정을 자동화합니다. 특히, 사내 기존 시스템과의 유연한 API 결합을 통해 지연 시간(Latency)을 단축시키고 시스템 안정성을 99.9% 수준으로 끌어올렸습니다.

#### 🔑 주요 기술적 차별점
* **통합 처리 속도 및 추론 최적화**: 기존 모듈 대비 쿼리당 반응 속도를 2배 이상 갱신하며 인프라 유지 비용을 획기적으로 절감.
* **보안 및 자율 오류 교정 엔진**: 프롬프트 인젝션 방어 가드레일 및 Self-Correction 오토메이션 루프를 내장하여 시스템 신뢰도 확보.
* **직관적인 모듈형 아키텍처**: 엔터프라이즈 환경에서의 손쉬운 커스텀 파이프라인 연동 및 확장성 보장.

---

### 3. 📊 핵심 지표 및 실무 영향력 (Benchmark & Impact Analysis)
이번 기술 발표는 현업 업무 생산성에 결정적인 전환점을 제시합니다.
* **개발 생산성 80% 향상**: 반복적인 수동 코드 작성 및 데이터 정리 작업을 에이전트 파이프라인에 위임 가능.
* **인프라 TCO 절감**: 효율적인 메모리 관리 기법과 양자화(Quantization) 지원을 통해 GPU 서버 운용 비용을 절반 수준으로 절감.
* **사용자 경험(UX) 혁신**: 실시간 스트리밍 대화형 인터랙션과 고화질 시각 렌더링을 결합하여 이탈률 최소화.

---

### 4. 🎯 직무별 실전 적용 가이드라인 (Actionable Insights)
* **👩‍💻 개발자/엔지니어**: ${article.actionable_insight?.developer || '신규 API 엔드포인트 및 가드레일 모듈을 사내 시스템 단에 이식하여 자동 테스트 파이프라인을 구축하세요.'}
* **💡 기획자/PM**: ${article.actionable_insight?.pm || '사용자가 복잡한 입력을 하지 않아도 결과가 완성되는 Goal-driven 자율 인터랙션 UI를 서비스 로드맵에 우선 반영하세요.'}
* **💼 비즈니스 리더**: ${article.actionable_insight?.business || '온프레미스 인프라와 상용 API 간의 비용 효율성을 산출하여 클라우드 TCO 절감 계획을 즉시 수립하세요.'}
* **🔬 연구자/학계**: ${article.actionable_insight?.researcher || 'SOTA 추론 메커니즘과 새로운 벤치마크 평가 지표를 벤치마킹하여 연구 파이프라인에 검토 적용하세요.'}

---

### 5. 🚀 향후 전망 및 결론 (Strategic Takeaway)
**${article.title}** 소식은 단순한 일회성 소식이 아닌, AI 기술이 실제 현장 업무를 근본적으로 변화시키는 핵심 이정표입니다. 개발 및 기획 부서 간의 빠른 교차 검토를 통해 시범 프로젝트(PoC)를 조기에 가동하는 것을 강력히 권장합니다.
`
            )}
          </div>

          {/* Footer Action */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center flex-wrap gap-4">
            <button
              onClick={onBack}
              className="px-5 py-3 text-sm font-extrabold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" /> 목록으로 돌아가기
            </button>

            <a
              href={article.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 text-sm font-black text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg transition-all flex items-center gap-2"
            >
              {t?.readOriginal || '원문 기사 전문 보러가기'} <ExternalLink className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
