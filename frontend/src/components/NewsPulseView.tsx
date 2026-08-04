import { useState, useEffect } from 'react';
import { Newspaper, Users, Lightbulb, Briefcase, Microscope, ExternalLink, Activity, Hash, Clock, RefreshCw } from 'lucide-react';

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
  summary_bullets: string[];
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

const LENSES = [
  { id: 'all', label: '🔥 전체', icon: Activity, desc: '주요 AI 트렌드 종합' },
  { id: 'developer', label: '👩‍💻 개발/엔지니어', icon: Users, desc: 'API, 모델 학습, 코딩 에이전트' },
  { id: 'pm', label: '💡 기획/PM', icon: Lightbulb, desc: '서비스 기획, UX/UI, 워크플로우' },
  { id: 'business', label: '💼 비즈니스', icon: Briefcase, desc: '도입 사례, TCO, 규제' },
  { id: 'researcher', label: '🔬 연구/학계', icon: Microscope, desc: 'SOTA 벤치마크, 논문 요약' }
];

export default function NewsPulseView() {
  const [activeLens, setActiveLens] = useState('all');
  const [loading, setLoading] = useState(true);
  const [newsData, setNewsData] = useState<NewsResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async (lens: string) => {
    setLoading(true);
    setError(null);
    try {
      const url = lens === 'all' 
        ? `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/news/pulse`
        : `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/api/v1/news/pulse?lens=${lens}`;
      
      const res = await fetch(url);
      if (!res.ok) throw new Error('뉴스 데이터를 불러오는데 실패했습니다.');
      
      const data = await res.json();
      setNewsData(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(activeLens);
  }, [activeLens]);

  // 날짜 포맷팅 함수
  const formatTime = (dateString: string) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.round(diffMs / 60000);
      const diffHrs = Math.round(diffMins / 60);
      const diffDays = Math.round(diffHrs / 24);

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
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Newspaper className="w-6 h-6 text-blue-600" />
              AI News Pulse 2.0
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              실시간 AI 트렌드와 내 업무에 바로 적용하는 실전 팁
            </p>
          </div>
          {newsData && (
            <div className="mt-4 md:mt-0 flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Activity className="w-4 h-4" /> {newsData.total_count}개 펄스
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" /> 방금 전 갱신
              </span>
              <button 
                onClick={() => fetchNews(activeLens)}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
                disabled={loading}
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> 새로고침
              </button>
            </div>
          )}
        </div>

        {/* Lens Tabs */}
        <div className="flex flex-wrap gap-2">
          {LENSES.map(lens => {
            const Icon = lens.icon;
            const isActive = activeLens === lens.id;
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
                {lens.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <RefreshCw className="w-8 h-8 animate-spin mb-4 text-blue-600" />
          <p>AI 엔진이 글로벌 뉴스를 수집하고 실전 팁을 생성하고 있습니다...</p>
          <p className="text-xs mt-2 text-gray-400">RSS 파싱 및 LLM 요약에는 약 10~20초가 소요될 수 있습니다.</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-center border border-red-200">
          <p>{error}</p>
        </div>
      ) : newsData?.articles.length === 0 ? (
        <div className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 p-10 rounded-xl text-center border border-gray-200 dark:border-gray-700">
          <Newspaper className="w-12 h-12 mx-auto mb-3 opacity-20" />
          <p>현재 선택된 렌즈에 해당하는 최신 뉴스가 없습니다.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {newsData?.articles.map(article => (
            <div key={article.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                        🏢 {article.source_name}
                      </span>
                      <span className={`px-2.5 py-1 text-xs font-bold rounded-md ${getImpactColor(article.impact_score)}`}>
                        🔥 Impact Score: {article.impact_score}점
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {formatTime(article.published_at)}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
                      {article.title}
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

                    {/* Summary Bullets */}
                    <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 mb-4 border border-gray-100 dark:border-gray-700">
                      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                        <Activity className="w-4 h-4 text-green-500" /> 핵심 3줄 요약 (Fact)
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
                          💡 실전 활용 팁 (Actionable Insight)
                        </h4>
                        <div className="space-y-3">
                          {activeLens === 'all' || activeLens === 'developer' ? article.actionable_insight.developer && (
                            <div className="text-sm">
                              <span className="font-semibold text-blue-700 dark:text-blue-400 mr-2">[개발자]</span>
                              <span className="text-gray-700 dark:text-gray-300">{article.actionable_insight.developer}</span>
                            </div>
                          ) : null}
                          {activeLens === 'all' || activeLens === 'pm' ? article.actionable_insight.pm && (
                            <div className="text-sm">
                              <span className="font-semibold text-blue-700 dark:text-blue-400 mr-2">[기획/PM]</span>
                              <span className="text-gray-700 dark:text-gray-300">{article.actionable_insight.pm}</span>
                            </div>
                          ) : null}
                          {activeLens === 'all' || activeLens === 'business' ? article.actionable_insight.business && (
                            <div className="text-sm">
                              <span className="font-semibold text-blue-700 dark:text-blue-400 mr-2">[비즈니스]</span>
                              <span className="text-gray-700 dark:text-gray-300">{article.actionable_insight.business}</span>
                            </div>
                          ) : null}
                          {activeLens === 'all' || activeLens === 'researcher' ? article.actionable_insight.researcher && (
                            <div className="text-sm">
                              <span className="font-semibold text-blue-700 dark:text-blue-400 mr-2">[연구/학계]</span>
                              <span className="text-gray-700 dark:text-gray-300">{article.actionable_insight.researcher}</span>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/80 px-6 py-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                <a 
                  href={article.source_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors"
                >
                  원문 기사 읽기 <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <div className="text-xs text-gray-400 font-medium">
                  분석 엔진: Gemini 2.5 Flash
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
