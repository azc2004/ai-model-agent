import { useState } from 'react';
import { ArrowLeft, ExternalLink, Share2, Sparkles, Building2, Calendar, ShieldCheck } from 'lucide-react';

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

export function NewsDetailView({ article, t, onBack }: NewsDetailViewProps) {
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
          <div key={bIdx} className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-6 sm:p-8 rounded-2xl shadow-lg my-6">
            <span className="text-xs font-black uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
              AI Technical Deep-Dive Report
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
          <div key={bIdx} className="bg-slate-100 dark:bg-slate-800/80 border-l-4 border-blue-500 p-4 sm:p-5 rounded-r-2xl text-xs sm:text-sm text-slate-700 dark:text-slate-300 shadow-sm flex items-center justify-between flex-wrap gap-2 my-4">
            <div>{parseInlineMarkdown(content)}</div>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Verified Source
            </span>
          </div>
        );
      }

      // 3. --- 구분선
      if (trimmed === '---') {
        return <hr key={bIdx} className="border-t border-slate-200 dark:border-slate-800 my-8" />;
      }

      // 4. ### 1. 💡 섹션 헤더
      if (trimmed.startsWith('### ')) {
        const headerText = trimmed.replace(/^###\s*/, '');
        return (
          <div key={bIdx} className="flex items-center gap-2.5 mt-8 mb-4">
            <div className="w-2 h-7 bg-blue-600 rounded-full shrink-0" />
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {parseInlineMarkdown(headerText)}
            </h3>
          </div>
        );
      }

      // 5. * **👩‍💻 개발자/엔지니어**: ... 직무별 활용 팁 리스트 파싱
      if (trimmed.includes('* **')) {
        const items = trimmed.split('\n');
        return (
          <div key={bIdx} className="space-y-3.5 my-6">
            {items.map((item: string, iIdx: number) => {
              const cleanItem = item.replace(/^[\*\-]\s*/, '');
              let badgeColor = "bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-200 border-blue-200 dark:border-blue-800";
              
              if (cleanItem.includes("개발자")) {
                badgeColor = "bg-cyan-50 text-cyan-900 dark:bg-cyan-950/60 dark:text-cyan-200 border-cyan-200 dark:border-cyan-800";
              } else if (cleanItem.includes("기획자") || cleanItem.includes("PM")) {
                badgeColor = "bg-purple-50 text-purple-900 dark:bg-purple-950/60 dark:text-purple-200 border-purple-200 dark:border-purple-800";
              } else if (cleanItem.includes("비즈니스")) {
                badgeColor = "bg-emerald-50 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200 border-emerald-200 dark:border-emerald-800";
              } else if (cleanItem.includes("연구자")) {
                badgeColor = "bg-amber-50 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200 border-amber-200 dark:border-amber-800";
              }

              return (
                <div key={iIdx} className={`p-4 sm:p-5 rounded-2xl border ${badgeColor} shadow-sm transition-all hover:shadow-md`}>
                  <div className="text-sm sm:text-base leading-relaxed">
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
        <p key={bIdx} className="text-slate-700 dark:text-slate-300 leading-relaxed text-base sm:text-lg my-4">
          {parseInlineMarkdown(trimmed)}
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
            {article.blog_summary ? (
              renderMarkdownBlocks(article.blog_summary)
            ) : (
              <div className="space-y-6">
                <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <h4 className="font-extrabold text-blue-600 dark:text-blue-400 text-lg mb-2">1. 💡 서론 및 배경</h4>
                  <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">{article.summary_bullets[0]}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <h4 className="font-extrabold text-blue-600 dark:text-blue-400 text-lg mb-2">2. ⚙️ 심층 리포트 해설</h4>
                  <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">{article.summary_bullets[1] || article.summary_bullets[0]}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-800/60 p-6 rounded-2xl border border-slate-200 dark:border-slate-700">
                  <h4 className="font-extrabold text-blue-600 dark:text-blue-400 text-lg mb-2">3. 🎯 핵심 종합 결론</h4>
                  <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed">{article.summary_bullets[2] || '본 소식은 최신 AI 기술 트렌드 및 산업 현장 활용 팁을 담고 있습니다.'}</p>
                </div>
              </div>
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
