// 크롤러가 읽을 수 있는 HTML. SPA 는 JS 실행 후에만 본문이 생기는데 AI 크롤러
// (GPTBot·ClaudeBot·PerplexityBot)는 JS 를 실행하지 않아 빈 페이지를 가져갔다.
// 워커가 자산보다 먼저 실행되고 D1 을 쥐고 있으므로 여기서 바로 렌더한다.
//
// 사람과 크롤러에게 같은 HTML 을 준다 — user-agent 로 내용을 바꾸면 클로킹이다.

export const SITE = 'https://llmcompass.azclab.com';
export const LANGS = ['ko', 'en', 'ja', 'zh', 'es', 'de', 'fr'] as const;
export type Lang = typeof LANGS[number];

const GA_ID = 'G-KE17316XRS';

export function esc(v: unknown): string {
  return String(v ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

export function pickLang(raw: string | null): Lang {
  return (LANGS as readonly string[]).includes(raw || '') ? (raw as Lang) : 'ko';
}

/** description_i18n 에서 언어를 고르고, 없으면 원문으로 떨어진다. */
export function localized(row: any, lang: Lang): string {
  try {
    const v = JSON.parse(row?.description_i18n || '{}')?.[lang];
    if (typeof v === 'string' && v.trim()) return v;
  } catch { /* 원문 폴백 */ }
  return row?.description || '';
}

const T: Record<Lang, Record<string, string>> = {
  ko: { provider: '프로바이더', tier: '등급', ctx: '컨텍스트 윈도우', out: '최대 출력', license: '라이선스',
        pricing: '' + 'API 가격 (100만 토큰당)', input: '입력', output: '출력', bench: '벤치마크',
        openApp: '전체 카탈로그에서 비교하기', updated: '갱신', tokens: '토큰', home: 'LLM COMPASS',
        allModels: '전체 모델', news: 'AI 트렌드 뉴스', source: '출처', backHome: '카탈로그로' },
  en: { provider: 'Provider', tier: 'Tier', ctx: 'Context window', out: 'Max output', license: 'License',
        pricing: 'API pricing (per 1M tokens)', input: 'Input', output: 'Output', bench: 'Benchmarks',
        openApp: 'Compare in the full catalog', updated: 'Updated', tokens: 'tokens', home: 'LLM COMPASS',
        allModels: 'All models', news: 'AI trend news', source: 'Source', backHome: 'Back to catalog' },
  ja: { provider: 'プロバイダー', tier: 'ティア', ctx: 'コンテキスト長', out: '最大出力', license: 'ライセンス',
        pricing: 'API 料金 (100万トークンあたり)', input: '入力', output: '出力', bench: 'ベンチマーク',
        openApp: 'カタログ全体で比較する', updated: '更新', tokens: 'トークン', home: 'LLM COMPASS',
        allModels: '全モデル', news: 'AIトレンドニュース', source: '出典', backHome: 'カタログへ' },
  zh: { provider: '供应商', tier: '等级', ctx: '上下文窗口', out: '最大输出', license: '许可',
        pricing: 'API 价格（每百万 token）', input: '输入', output: '输出', bench: '基准测试',
        openApp: '在完整目录中比较', updated: '更新', tokens: 'token', home: 'LLM COMPASS',
        allModels: '全部模型', news: 'AI 趋势新闻', source: '来源', backHome: '返回目录' },
  es: { provider: 'Proveedor', tier: 'Nivel', ctx: 'Ventana de contexto', out: 'Salida máxima', license: 'Licencia',
        pricing: 'Precio de API (por 1M de tokens)', input: 'Entrada', output: 'Salida', bench: 'Benchmarks',
        openApp: 'Comparar en el catálogo completo', updated: 'Actualizado', tokens: 'tokens', home: 'LLM COMPASS',
        allModels: 'Todos los modelos', news: 'Noticias de IA', source: 'Fuente', backHome: 'Volver al catálogo' },
  de: { provider: 'Anbieter', tier: 'Stufe', ctx: 'Kontextfenster', out: 'Max. Ausgabe', license: 'Lizenz',
        pricing: 'API-Preis (pro 1 Mio. Tokens)', input: 'Eingabe', output: 'Ausgabe', bench: 'Benchmarks',
        openApp: 'Im vollständigen Katalog vergleichen', updated: 'Aktualisiert', tokens: 'Tokens', home: 'LLM COMPASS',
        allModels: 'Alle Modelle', news: 'KI-Trendnachrichten', source: 'Quelle', backHome: 'Zurück zum Katalog' },
  fr: { provider: 'Fournisseur', tier: 'Niveau', ctx: 'Fenêtre de contexte', out: 'Sortie max.', license: 'Licence',
        pricing: 'Tarif API (par million de tokens)', input: 'Entrée', output: 'Sortie', bench: 'Benchmarks',
        openApp: 'Comparer dans le catalogue complet', updated: 'Mis à jour', tokens: 'tokens', home: 'LLM COMPASS',
        allModels: 'Tous les modèles', news: 'Actualités IA', source: 'Source', backHome: 'Retour au catalogue' },
};

const STYLE = `
:root{--bg:#f8fafc;--fg:#0f172a;--muted:#475569;--rule:#cbd5e1;--card:#fff;--accent:#0e7490}
@media(prefers-color-scheme:dark){:root{--bg:#020617;--fg:#e2e8f0;--muted:#94a3b8;--rule:#1e293b;--card:#0f172a;--accent:#22d3ee}}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.65 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",sans-serif}
.wrap{max-width:52rem;margin:0 auto;padding:2rem 1.25rem 4rem}
nav{font-size:.85rem;color:var(--muted);margin-bottom:2rem}
nav a{color:var(--accent);text-decoration:none}nav a:hover{text-decoration:underline}
h1{font-size:clamp(1.6rem,4.5vw,2.4rem);line-height:1.15;letter-spacing:-.02em;margin:0 0 .75rem}
.lede{font-size:1.05rem;color:var(--muted);margin:0 0 2rem;max-width:38rem}
h2{font-size:1.05rem;letter-spacing:.02em;text-transform:uppercase;color:var(--muted);margin:2.25rem 0 .75rem;font-weight:600}
table{border-collapse:collapse;width:100%;font-size:.95rem;background:var(--card);border:1px solid var(--rule)}
th,td{text-align:left;padding:.6rem .85rem;border-bottom:1px solid var(--rule)}
th{width:38%;font-weight:600;color:var(--muted)}
tr:last-child th,tr:last-child td{border-bottom:none}
.tbl-scroll{overflow-x:auto}
.cta{display:inline-block;margin-top:2.25rem;padding:.65rem 1.1rem;background:var(--accent);color:#fff;border-radius:8px;text-decoration:none;font-weight:600;font-size:.95rem}
article p{max-width:38rem}
footer{margin-top:3rem;padding-top:1.25rem;border-top:1px solid var(--rule);font-size:.8rem;color:var(--muted)}
footer a{color:var(--accent)}
`;

interface PageOpts {
  lang: Lang; title: string; description: string; path: string;
  jsonLd?: object; body: string; image?: string;
}

function shell(o: PageOpts): string {
  const canonical = `${SITE}${o.path}`;
  const alts = LANGS.map((l) =>
    `<link rel="alternate" hreflang="${l}" href="${esc(canonical)}${canonical.includes('?') ? '&' : '?'}lang=${l}">`
  ).join('\n    ');
  return `<!doctype html>
<html lang="${o.lang}">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${esc(o.title)}</title>
    <meta name="description" content="${esc(o.description)}">
    <link rel="canonical" href="${esc(canonical)}">
    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    ${alts}
    <link rel="alternate" hreflang="x-default" href="${esc(canonical)}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="LLM COMPASS">
    <meta property="og:title" content="${esc(o.title)}">
    <meta property="og:description" content="${esc(o.description)}">
    <meta property="og:url" content="${esc(canonical)}">
    ${o.image ? `<meta property="og:image" content="${esc(o.image)}">` : ''}
    <meta name="twitter:card" content="${o.image ? 'summary_large_image' : 'summary'}">
    <meta name="twitter:title" content="${esc(o.title)}">
    <meta name="twitter:description" content="${esc(o.description)}">
    ${o.jsonLd ? `<script type="application/ld+json">${JSON.stringify(o.jsonLd)}</script>` : ''}
    <style>${STYLE}</style>
    <script async src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"></script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');</script>
  </head>
  <body>
    <div class="wrap">${o.body}</div>
  </body>
</html>`;
}

const num = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) ? v.toLocaleString('en-US') : null);

function json(v: unknown, fallback: any = {}) {
  if (typeof v !== 'string') return v ?? fallback;
  try { return JSON.parse(v || 'null') ?? fallback; } catch { return fallback; }
}

export function modelPage(m: any, lang: Lang): string {
  const t = T[lang];
  const price = json(m.api_pricing);
  const bench = json(m.benchmarks);
  const desc = localized(m, lang) || `${m.name} — ${m.provider_name}`;
  const inP = typeof price?.input_price_per_1m === 'number' ? `$${price.input_price_per_1m}` : null;
  const outP = typeof price?.output_price_per_1m === 'number' ? `$${price.output_price_per_1m}` : null;

  // AI 답변에 인용되는 건 표가 아니라 문장이다. 사실만 담은 한 문단을 맨 위에 둔다.
  const facts = [
    `${m.name} — ${m.provider_name}.`,
    m.context_window ? `${t.ctx} ${num(m.context_window)} ${t.tokens}.` : '',
    inP && outP ? `${t.pricing}: ${t.input} ${inP}, ${t.output} ${outP}.` : '',
    m.license_type ? `${t.license}: ${m.license_type}.` : '',
  ].filter(Boolean).join(' ');

  const rows: Array<[string, string | null]> = [
    [t.provider, m.provider_name],
    [t.tier, m.tier],
    [t.ctx, m.context_window ? `${num(m.context_window)} ${t.tokens}` : null],
    [t.out, m.max_output_tokens ? `${num(m.max_output_tokens)} ${t.tokens}` : null],
    [t.license, m.license_type],
    [`${t.pricing} · ${t.input}`, inP],
    [`${t.pricing} · ${t.output}`, outP],
    ['Arena ELO', num(bench?.arena_elo)],
    ['MMLU-Pro', bench?.mmlu_pro != null ? String(bench.mmlu_pro) : null],
    ['GPQA', bench?.gpqa != null ? String(bench.gpqa) : null],
    ['SWE-bench', bench?.swe_bench != null ? String(bench.swe_bench) : null],
  ];

  const body = `
    <nav><a href="/?lang=${lang}">${t.home}</a> › <a href="/?tab=dashboard&amp;lang=${lang}">${t.allModels}</a></nav>
    <h1>${esc(m.name)}</h1>
    <p class="lede">${esc(desc)}</p>
    <p>${esc(facts)}</p>
    <h2>${esc(t.bench)} · ${esc(t.pricing)}</h2>
    <div class="tbl-scroll"><table><tbody>
      ${rows.filter(([, v]) => v).map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join('\n      ')}
    </tbody></table></div>
    <a class="cta" href="/?tab=dashboard&amp;lang=${lang}">${esc(t.openApp)}</a>
    <footer>${esc(t.updated)}: ${esc((m.updated_at || '').slice(0, 10))} · <a href="/sitemap.xml">sitemap</a></footer>`;

  const jsonLd: any = {
    '@context': 'https://schema.org', '@type': 'Product',
    name: m.name, description: desc, category: 'Large Language Model',
    brand: { '@type': 'Brand', name: m.provider_name },
    url: `${SITE}/models/${m.id}`,
  };
  if (typeof price?.input_price_per_1m === 'number') {
    jsonLd.offers = {
      '@type': 'Offer', priceCurrency: price.currency || 'USD',
      price: price.input_price_per_1m,
      description: `${t.input} / 1M ${t.tokens}`,
      availability: 'https://schema.org/InStock',
    };
  }

  return shell({
    lang, path: `/models/${m.id}`, body, jsonLd,
    title: `${m.name} — ${t.pricing.replace(/\s*\(.*\)/, '')} · ${m.provider_name} | LLM COMPASS`,
    description: facts.slice(0, 300),
  });
}

export function newsPage(n: any, lang: Lang): string {
  const t = T[lang];
  const takeaways: string[] = json(n.key_takeaways, []);
  const sources: any[] = json(n.original_sources, []);
  const summary = (Array.isArray(takeaways) && takeaways[0]) || n.executive_summary || n.title;
  const bodyText = (n.analytical_deep_dive || n.executive_summary || '').trim();

  const paragraphs = bodyText
    .split(/\n{2,}/).map((p: string) => p.trim()).filter(Boolean).slice(0, 12)
    .map((p: string) => `<p>${esc(p.replace(/^#+\s*/, ''))}</p>`).join('\n    ');

  const body = `
    <nav><a href="/?lang=${lang}">${t.home}</a> › <a href="/?tab=news&amp;lang=${lang}">${t.news}</a></nav>
    <h1>${esc(n.title)}</h1>
    <p class="lede">${esc(summary)}</p>
    <article>${paragraphs}</article>
    ${sources.length ? `<h2>${esc(t.source)}</h2><ul>${sources.slice(0, 8).map((s: any) =>
      `<li><a href="${esc(s.url || '#')}" rel="nofollow noopener">${esc(s.title || s.name || s.url)}</a></li>`).join('')}</ul>` : ''}
    <a class="cta" href="/?tab=news&amp;article=${esc(n.id)}&amp;lang=${lang}">${esc(t.backHome)}</a>
    <footer>${esc(t.updated)}: ${esc((n.created_at || '').slice(0, 10))} · <a href="/sitemap.xml">sitemap</a></footer>`;

  return shell({
    lang, path: `/news/${n.id}`, body,
    title: `${n.title} | LLM COMPASS`,
    description: String(summary).slice(0, 300),
    image: n.image_url || undefined,
    jsonLd: {
      '@context': 'https://schema.org', '@type': 'Article',
      headline: n.title, description: String(summary).slice(0, 300),
      datePublished: n.created_at, dateModified: n.created_at,
      url: `${SITE}/news/${n.id}`,
      publisher: { '@type': 'Organization', name: 'LLM COMPASS', url: SITE },
    },
  });
}

export function sitemap(modelIds: string[], newsIds: string[]): string {
  const urls: string[] = [];
  const push = (loc: string, priority: string, freq: string) => {
    const alts = LANGS.map((l) =>
      `<xhtml:link rel="alternate" hreflang="${l}" href="${SITE}${loc}?lang=${l}"/>`).join('');
    urls.push(`<url><loc>${SITE}${loc}</loc><changefreq>${freq}</changefreq><priority>${priority}</priority>${alts}</url>`);
  };
  push('/', '1.0', 'daily');
  for (const tab of ['dashboard', 'compare', 'tco', 'advisor', 'leaderboard', 'gpus', 'news', 'sandbox', 'speed', 'tutorial']) {
    push(`/?tab=${tab}`, '0.7', 'weekly');
  }
  for (const id of modelIds) push(`/models/${id}`, '0.8', 'weekly');
  for (const id of newsIds) push(`/news/${id}`, '0.6', 'monthly');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;
}

export function robots(): string {
  return `# LLM COMPASS
# AI 크롤러를 포함해 전면 허용한다. 이 사이트의 가치는 인용되는 데 있다.
User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/v1/admin

Sitemap: ${SITE}/sitemap.xml
`;
}

export function llmsTxt(modelCount: number, newsCount: number, providerCount: number): string {
  return `# LLM COMPASS

> ${modelCount}개 AI 언어모델의 API 가격·컨텍스트 길이·벤치마크 점수를 ${providerCount}개 프로바이더에 걸쳐 비교하는 레퍼런스. 자체 호스팅과 상용 API의 총소유비용(TCO)을 실제 GPU 단가로 계산한다. 모델 카탈로그는 매주, AI 트렌드 뉴스는 매일 갱신된다.

한국어·영어·일본어·중국어·스페인어·독일어·프랑스어를 지원하며, 각 페이지에 \`?lang=\` 을 붙이면 해당 언어로 반환된다.

## 데이터
- [전체 모델 카탈로그](${SITE}/?tab=dashboard): ${modelCount}개 모델의 가격·스펙·벤치마크
- [모델 상세](${SITE}/models/{model_id}): 모델별 가격표와 사양. id 목록은 sitemap 참조
- [벤치마크 리더보드](${SITE}/?tab=leaderboard): Arena ELO·MMLU-Pro·GPQA·SWE-bench
- [GPU 사양·클라우드 단가](${SITE}/?tab=gpus): VRAM·대역폭·시간당 임대료
- [TCO 시뮬레이터](${SITE}/?tab=tco): 트래픽 기준 API 대 자체 호스팅 비용 비교

## 뉴스
- [AI 트렌드 뉴스](${SITE}/?tab=news): ${newsCount}건의 분석 리포트, 매일 갱신
- [기사 상세](${SITE}/news/{article_id}): id 목록은 sitemap 참조

## 기계 판독용
- [sitemap.xml](${SITE}/sitemap.xml): 전체 URL 과 언어별 대체 링크
- [모델 API](${SITE}/api/v1/models): JSON. \`?lang=\` 지원
- [뉴스 API](${SITE}/api/v1/news/pulse): JSON
`;
}
