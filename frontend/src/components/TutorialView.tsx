import React, { useState } from 'react';
import { 
  BookOpen, Copy, Check, Sparkles, Layers, Zap, ShieldCheck
} from 'lucide-react';

export const TutorialView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'beginner' | 'tools' | 'artifacts' | 'skills' | 'customrules'>('beginner');
  const [activeTool, setActiveTool] = useState<string>('antigravity');
  const [activeSkillId, setActiveSkillId] = useState<string>('deploy');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toolsList = [
    { id: 'antigravity', name: '🌌 Google Antigravity', company: 'Google DeepMind', badge: '강력 추천', desc: 'Google DeepMind 차세대 Agentic Coding AI' },
    { id: 'aws_kiro', name: '☁️ AWS Q / Kiro Agent', company: 'Amazon Web Services', badge: '엔터프라이즈', desc: 'AWS Fargate & Bedrock 클라우드 자율 에이전트' },
    { id: 'claude_code', name: '🤖 Claude Code CLI', company: 'Anthropic', badge: '인기 터미널', desc: '터미널 자율 실행 & 실시간 커맨드 에이전트' },
    { id: 'cursor', name: '💻 Cursor IDE', company: 'Anysphere', badge: '가장 쉬움', desc: 'Cmd+I Composer 기반 AI Native 코드 에디터' },
    { id: 'bolt', name: '⚡ Bolt.new', company: 'StackBlitz', badge: '웹 원클릭', desc: '브라우저 원클릭 풀스택 인스턴트 앱 생성기' },
    { id: 'v0', name: '🎨 v0.dev', company: 'Vercel', badge: 'UI 디자이너', desc: '자연어 프롬프트 기반 UI & 프론트엔드 생성기' },
    { id: 'copilot', name: '🐙 GitHub Copilot Workspace', company: 'GitHub / Microsoft', badge: 'Issue-to-PR', desc: 'Issue 기반 웹 브라우저 자율 PR 생성 에이전트' },
    { id: 'windsurf', name: '🏄 Windsurf Cascade', company: 'Codeium', badge: '딥 서핑', desc: '코드베이스 딥 탐색 및 연관 관계 추적 에디터' },
    { id: 'replit', name: '🚀 Replit Agent', company: 'Replit', badge: '올인원 SaaS', desc: '아이디어 ➔ 백엔드/DB/배포까지 원클릭 완성' },
    { id: 'devin', name: '🤖 Devin / Cline', company: 'Cognition / Open-Source', badge: '오픈소스', desc: '자율 소프트웨어 엔지니어 & 커스텀 LLM 연동' }
  ];

  const popularSkills = [
    {
      id: 'deploy',
      name: '⚡ deploy_production',
      badge: '인기 랭킹 #1',
      target: '.claude/skills/deploy_production/SKILL.md',
      desc: '빌드/테스트 자동 실행 ➔ 한국어 Git 커밋 메시지 작성 ➔ main 브랜치 자동 푸시 & 배포',
      code: `---
name: deploy_production
description: 빌드 검증 후 한국어 커밋 메시지로 main 브랜치 자동 배포
---

# Deploy Production Skill Directive
1. Run \`npm run build\` or \`pytest\` to verify zero build errors.
2. Formulate a concise Korean commit message adhering to conventions (feat/fix/chore).
3. Stage all files with \`git add -A\`.
4. Commit and push to remote \`main\` branch.`
    },
    {
      id: 'guard',
      name: '🛡️ code_review_guard',
      badge: '필수 랭킹 #1',
      target: '.claude/skills/code_review_guard/SKILL.md',
      desc: 'PEP 8 / ESLint / 명확한 타입 힌팅 & OWASP Top 10 보안 가드레일 자동 전수 검사',
      code: `---
name: code_review_guard
description: 타입 힌팅 및 보안 가드레일 전수 검사
---

# Code Review Guard Directive
1. Ensure all Python functions have PEP 484 type annotations & docstrings.
2. Check for hardcoded API keys or secrets (MUST use .env).
3. Validate async/await I/O non-blocking execution patterns.`
    },
    {
      id: 'db',
      name: '🗄️ db_migration',
      badge: '필수 랭킹 #2',
      target: '.claude/skills/db_migration/SKILL.md',
      desc: 'DATABASE_SCHEMA.md를 파싱하여 PostgreSQL / MariaDB 원시 SQL DDL 및 ORM 스키마 자동 생성',
      code: `---
name: db_migration
description: DATABASE_SCHEMA.md 파싱 후 DDL/ORM 자동 생성
---

# DB Migration Skill Directive
1. Read \`./DATABASE_SCHEMA.md\` in current workspace.
2. Extract ERD structures and create \`schema.sql\` or ORM models.
3. Apply idempotent DDL migrations with exponential backoff on deadlock.`
    },
    {
      id: 'api',
      name: '🔌 api_integration',
      badge: '인기 랭킹 #2',
      target: '.claude/skills/api_integration/SKILL.md',
      desc: 'OpenAPI/Swagger 명세서를 읽고 Async Pydantic 및 TypeScript API 클라이언트 자동 작성',
      code: `---
name: api_integration
description: Swagger/OpenAPI 읽고 Async Client 코드 자동 작성
---

# API Integration Skill Directive
1. Read Swagger JSON or OpenAPI YAML definition.
2. Generate async \`httpx.AsyncClient\` wrapper code with Circuit Breaker pattern.
3. Export Pydantic models with type annotations.`
    },
    {
      id: 'bug',
      name: '🐞 bug_hunting_agent',
      badge: '인기 랭킹 #3',
      target: '.claude/skills/bug_hunting_agent/SKILL.md',
      desc: '터미널 StackTrace 및 런타임 로그 파싱 ➔ 상류 데이터 제공자 추적 및 원천 코드 정밀 수술',
      code: `---
name: bug_hunting_agent
description: 런타임 로그 파싱 및 원천 코드 정밀 수술
---

# Bug Hunting Agent Directive
1. Never mask symptoms or swallow exceptions with try/except pass.
2. Inspect un-truncated error log traceback first.
3. Trace upstream data provider to resolve root cause.`
    }
  ];

  return (
    <div className="space-y-8 pb-16">
      {/* Tutorial Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-900 border border-indigo-500/30 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" /> Silicon Valley Vibe Coding Academy
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            비개발자도 10분 만에 마스터하는 <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">AI 에이전트 코딩 튜토리얼</span>
          </h1>
          <p className="mt-3 text-slate-300 text-base leading-relaxed font-medium">
            <strong className="text-white">Google Antigravity, AWS Kiro, Claude Code, Cursor</strong> 등 글로벌 Top 10 AI 도구 셋팅부터, 빅테크에서 실제 사용하는 <strong className="text-indigo-300">필수 에이전트 스킬(Skills Pack)과 5대 마크다운 명세서 연동법</strong>까지 원클릭으로 쉽게 따라해보세요!
          </p>
        </div>
      </div>

      {/* Main Roadmap Tab Selector */}
      <div className="flex bg-slate-100 dark:bg-slate-900/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none gap-1">
        {[
          { id: 'beginner', title: '🌱 Step 1: 에이전트 코딩 입문', desc: '바이브코딩 개념 & 3단계 작동원리' },
          { id: 'tools', title: '🛠️ Step 2: Top 10 도구별 가이드', desc: 'Google Antigravity / AWS Kiro / Cursor' },
          { id: 'artifacts', title: '📦 Step 3: 생성 마크다운 적용법', desc: 'AGENTS.md & TASKS.md 프로젝트 배치' },
          { id: 'skills', title: '🧠 Step 4: 빅테크 인기 스킬 (Skills Pack)', desc: 'deploy, review, db_migration 스킬' },
          { id: 'customrules', title: '⚙️ Step 5: 도구별 Custom Rules 템플릿', desc: '.cursorrules, directives.yaml 설정' }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-[200px] text-left px-4 py-3 rounded-xl transition-all font-black text-xs flex flex-col gap-1 ${
                isActive
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 shadow-md border border-slate-200/80 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/40'
              }`}
            >
              <span className="text-sm font-black tracking-tight">{tab.title}</span>
              <span className={`text-[11px] font-semibold ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-500'}`}>{tab.desc}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Beginner Concept */}
      {activeTab === 'beginner' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-4">
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-indigo-500" />
              '바이브 코딩 (Vibe Coding)'이란 무엇인가요?
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              과거의 코딩이 개발자가 문법을 타이핑하는 방식이었다면, <strong className="text-indigo-600 dark:text-indigo-400">바이브 코딩(Vibe Coding)</strong>은 사람이 <strong>'서비스의 의도와 설계도(Markdown 명세서)'</strong>를 제시하면, AI 에이전트(Google Antigravity, Claude Code, Cursor)가 코드를 직접 작성하고 실행 검증하는 2026년 빅테크의 최신 개발 패러다임입니다.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-indigo-50 dark:bg-slate-950 p-5 rounded-2xl border border-indigo-100 dark:border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-sm">1</div>
                <h3 className="font-black text-slate-900 dark:text-white text-base">명세서 다운로드 (Spec)</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold leading-relaxed">
                  'AI 아키텍처 추천기'에서 5대 설계 명세서(AGENTS.md, TASKS.md 등)를 원클릭 다운로드합니다.
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-slate-950 p-5 rounded-2xl border border-purple-100 dark:border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black flex items-center justify-center text-sm">2</div>
                <h3 className="font-black text-slate-900 dark:text-white text-base">AI 에이전트 지시 (Directive)</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold leading-relaxed">
                  Google Antigravity, Cursor, Claude Code에 명세서를 드래그하고 "AGENTS.md 지시대로 개발해줘"라고 명령합니다.
                </p>
              </div>

              <div className="bg-emerald-50 dark:bg-slate-950 p-5 rounded-2xl border border-emerald-100 dark:border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-sm">3</div>
                <h3 className="font-black text-slate-900 dark:text-white text-base">자동 자율 개발 (Execution)</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold leading-relaxed">
                  AI 에이전트가 백그라운드에서 파일 작성, 터미널 실행, 에러 자동 수술을 스스로 완성합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Top 10 Tools Guide */}
      {activeTab === 'tools' && (
        <div className="space-y-6">
          <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto scrollbar-none">
            {toolsList.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTool(t.id)}
                className={`px-3.5 py-2.5 rounded-xl font-black text-xs transition-all flex items-center gap-2 whitespace-nowrap shrink-0 ${
                  activeTool === t.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                }`}
              >
                <span>{t.name}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                  activeTool === t.id ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}>{t.badge}</span>
              </button>
            ))}
          </div>

          {/* Antigravity Guide */}
          {activeTool === 'antigravity' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-5">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <span>🌌 Google Antigravity 연동 & 사용 가이드</span>
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-1">
                    Google DeepMind의 최신 에이전틱 코딩 AI 파이프라인.
                  </p>
                </div>
              </div>

              <div className="space-y-3 font-semibold text-xs text-slate-700 dark:text-slate-300">
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <h4 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-black">1</span>
                    `AGENTS.md` 및 `ARCHITECTURE.md`를 에이전트 드래그 앤 드롭
                  </h4>
                  <p>프로젝트 폴더의 `./AGENTS.md` 지시서를 Antigravity 컨텍스트 창에 주입합니다.</p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <h4 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-black">2</span>
                    실행 프롬프트 입력
                  </h4>
                  <div className="bg-slate-900 text-indigo-300 p-3 rounded-xl font-mono flex items-center justify-between">
                    <span>"AGENTS.md 시스템 규칙에 맞춰 아키텍처를 구성하고 TASKS.md 1단계 과제를 시작해줘"</span>
                    <button
                      onClick={() => handleCopy("AGENTS.md 시스템 규칙에 맞춰 아키텍처를 구성하고 TASKS.md 1단계 과제를 시작해줘", "antigravity_prompt")}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                    >
                      {copiedId === "antigravity_prompt" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* AWS Kiro Guide */}
          {activeTool === 'aws_kiro' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-5">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <span>☁️ AWS Q / Kiro Agent 셋팅 가이드</span>
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-1">
                    AWS 클라우드 인프라 오토스케일링 및 Fargate 서버리스 에이전트.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900 text-slate-200 p-4 rounded-2xl font-mono text-xs space-y-3">
                <div className="text-slate-400 font-bold"># AWS Kiro 초기화 & DEPLOYMENT.md 실행</div>
                <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-emerald-400">
                  <span>kiro init && kiro apply DEPLOYMENT.md</span>
                  <button
                    onClick={() => handleCopy("kiro init && kiro apply DEPLOYMENT.md", "kiro_cmd")}
                    className="p-1.5 rounded-lg bg-slate-800 text-white hover:bg-slate-700"
                  >
                    {copiedId === "kiro_cmd" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Claude Code Guide */}
          {activeTool === 'claude_code' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-5">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                🤖 Claude Code CLI 셋팅 가이드
              </h3>
              <div className="bg-slate-900 text-slate-200 p-4 rounded-2xl font-mono text-xs space-y-2">
                <div className="text-slate-400 font-bold"># 글로벌 설치 & 실행</div>
                <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-emerald-400">
                  <span>npm install -g @anthropic-ai/claude-code && claude</span>
                  <button
                    onClick={() => handleCopy("npm install -g @anthropic-ai/claude-code && claude", "claude_cmd")}
                    className="p-1.5 rounded-lg bg-slate-800 text-white hover:bg-slate-700"
                  >
                    {copiedId === "claude_cmd" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Cursor Guide */}
          {activeTool === 'cursor' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-4">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                💻 Cursor IDE 셋팅 가이드
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold leading-relaxed">
                Cmd + I (Composer)를 누르고 "AGENTS.md와 TASKS.md의 지침을 읽고 1단계부터 구현해줘"를 전송하세요.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Artifacts Application Guide */}
      {activeTab === 'artifacts' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-6 h-6 text-indigo-500" />
              본 시스템 5대 Markdown 아티팩트 프로젝트 배치 스펙
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-1">
              다운로드 받은 5개 아티팩트 파일의 역할과 배치 위치를 확인하세요.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: '🤖 AGENTS.md', role: 'AI 행동 지시서', target: '프로젝트 루트 (./AGENTS.md)', desc: 'AI 모델 및 프레임워크 선택, 에러 방지 구문, 아키텍처 규칙 정의' },
              { name: '🏗️ ARCHITECTURE.md', role: '시스템 구조 명세', target: '프로젝트 루트 (./ARCHITECTURE.md)', desc: 'Mermaid 시퀀스 다이어그램, API 라우팅 계층 구조' },
              { name: '🗄️ DATABASE_SCHEMA.md', role: 'DB ERD & DDL 스키마', target: '프로젝트 루트 (./DATABASE_SCHEMA.md)', desc: 'PostgreSQL/MariaDB ERD 및 원시 테이블 생성 DDL' },
              { name: '📝 TASKS.md', role: 'WBS 단계별 체크리스트', target: '프로젝트 루트 (./TASKS.md)', desc: 'AI가 순서대로 구현하고 체크할 Step-by-Step Task 목록' },
              { name: '🐳 DEPLOYMENT.md', role: '인프라 및 Docker 스펙', target: '프로젝트 루트 (./DEPLOYMENT.md)', desc: 'Dockerfile, docker-compose.yml 및 .env 환경변수 명세' }
            ].map((art, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-black text-sm text-indigo-600 dark:text-indigo-400">{art.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">{art.role}</span>
                </div>
                <div className="text-xs font-mono text-slate-800 dark:text-slate-200 font-bold bg-white dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800">
                  위치: {art.target}
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  {art.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Silicon Valley Skills Pack */}
      {activeTab === 'skills' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-amber-500" />
              실리콘밸리 빅테크 필수 & 인기 에이전트 스킬 라이브러리 (Vibe Skills Pack)
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-1">
              파일로 복사해서 저장하기만 하면 Claude Code, Google Antigravity 등에서 100% 자동 작동합니다.
            </p>
          </div>

          <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto scrollbar-none">
            {popularSkills.map((sk) => (
              <button
                key={sk.id}
                onClick={() => setActiveSkillId(sk.id)}
                className={`px-3.5 py-2 rounded-xl font-black text-xs transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeSkillId === sk.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                }`}
              >
                <span>{sk.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white">{sk.badge}</span>
              </button>
            ))}
          </div>

          {/* Active Skill Code Display */}
          {popularSkills.filter(s => s.id === activeSkillId).map((skill) => (
            <div key={skill.id} className="space-y-4">
              <div className="flex items-center justify-between bg-indigo-50 dark:bg-indigo-950/40 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-800/60">
                <div>
                  <h3 className="font-black text-sm text-indigo-950 dark:text-indigo-200">{skill.name}</h3>
                  <p className="text-xs text-indigo-700 dark:text-indigo-300/80 font-semibold mt-0.5">{skill.desc}</p>
                </div>
                <div className="text-xs font-mono font-black text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
                  저장위치: {skill.target}
                </div>
              </div>

              <div className="relative bg-slate-950 text-slate-200 p-5 rounded-2xl font-mono text-xs border border-slate-800">
                <button
                  onClick={() => handleCopy(skill.code, skill.id)}
                  className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-md"
                >
                  {copiedId === skill.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedId === skill.id ? '복사 완료!' : '스킬 코드 원클릭 복사'}
                </button>
                <pre className="overflow-x-auto text-[11px] leading-relaxed text-emerald-400 pt-6">
                  {skill.code}
                </pre>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 5: Custom Rules */}
      {activeTab === 'customrules' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-purple-500" />
              도구별 Custom Rules / Directives 템플릿 모음
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-1">
              에이전트별 설정 파일에 복사해 두면 AI가 오버엔지니어링 없이 완벽한 코드를 작성합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs text-slate-200">
              <div className="flex items-center justify-between text-indigo-400 font-bold">
                <span>💻 .cursorrules (Cursor IDE 설정)</span>
                <button
                  onClick={() => handleCopy(`# [Rule: No Superfluous Dependencies]\n1. Never install external libraries for date/string formatting.\n2. Use standard library or FastAPI/Pydantic.`, "rules_cursor")}
                  className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white"
                >
                  {copiedId === "rules_cursor" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <pre className="text-[11px] text-slate-400 bg-slate-900 p-3 rounded-xl overflow-x-auto">
{`# Cursor Rules Specification
- Strict Type Annotation
- Exponential backoff retry logic
- Non-blocking async/await I/O`}
              </pre>
            </div>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3 font-mono text-xs text-slate-200">
              <div className="flex items-center justify-between text-purple-400 font-bold">
                <span>🌌 .antigravity/directives.yaml</span>
                <button
                  onClick={() => handleCopy(`agent_pipeline:\n  mode: autonomous\n  guardrails:\n    strict_types: true`, "rules_anti")}
                  className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white"
                >
                  {copiedId === "rules_anti" ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
              <pre className="text-[11px] text-slate-400 bg-slate-900 p-3 rounded-xl overflow-x-auto">
{`agent_pipeline:
  mode: autonomous
  guardrails:
    strict_types: true`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
