import React, { useState } from 'react';
import { 
  Copy, Check, Sparkles, Layers, Zap, ShieldCheck, Puzzle
} from 'lucide-react';

export const TutorialView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'beginner' | 'tools' | 'artifacts' | 'skills' | 'customrules'>('skills');
  const [activeTool, setActiveTool] = useState<string>('claude_code');
  const [activeSkillId, setActiveSkillId] = useState<string>('deploy');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toolsList = [
    { id: 'claude_code', name: '🤖 Claude Code CLI', company: 'Anthropic', badge: '스킬 & MCP 플러그인', desc: 'Custom Skills (.claude/skills) & MCP 서버 완벽 지원' },
    { id: 'antigravity', name: '🌌 Google Antigravity', company: 'Google DeepMind', badge: '멀티에이전트 스킬', desc: 'DeepMind Agentic Skills & directives.yaml' },
    { id: 'cursor', name: '💻 Cursor IDE', company: 'Anysphere', badge: '확장 플러그인', desc: 'Cursor Rules & Marketplace Extensions' },
    { id: 'aws_kiro', name: '☁️ AWS Q / Kiro Agent', company: 'Amazon Web Services', badge: 'AWS 플러그인', desc: 'AWS Toolkit Plugin & Kiro Skill YAML' },
    { id: 'bolt', name: '⚡ Bolt.new', company: 'StackBlitz', badge: '웹 플러그인', desc: 'WebContainer Browser Plugin & Netlify' },
    { id: 'v0', name: '🎨 v0.dev', company: 'Vercel', badge: 'UI 플러그인', desc: 'Vercel v0 CLI & React Component Plugin' },
    { id: 'copilot', name: '🐙 GitHub Copilot Workspace', company: 'GitHub / Microsoft', badge: 'GitHub 앱', desc: 'Copilot Agent Extension & GitHub App' },
    { id: 'windsurf', name: '🏄 Windsurf Cascade', company: 'Codeium', badge: '서핑 룰', desc: 'Cascade Rule & Codeium Plugin' },
    { id: 'replit', name: '🚀 Replit Agent', company: 'Replit', badge: 'SaaS 플러그인', desc: 'PostgreSQL DB Plugin & Deployment' },
    { id: 'devin', name: '🤖 Devin / Cline', company: 'Cognition / Open-Source', badge: '오픈소스 스킬', desc: 'Cline/Roo Code Extension & MCP Servers' }
  ];

  const popularSkills = [
    {
      id: 'deploy',
      name: '⚡ deploy_production (배포 자동화 스킬)',
      badge: '필수 스킬 #1',
      pluginType: 'Claude Code / Antigravity Custom Skill',
      target: '.claude/skills/deploy_production/SKILL.md',
      desc: '빌드/테스트 자동 실행 ➔ 한국어 Git 커밋 메시지 작성 ➔ main 브랜치 자동 푸시 & 배포 플러그인',
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
      name: '🛡️ code_review_guard (보안 검사 스킬)',
      badge: '필수 스킬 #2',
      pluginType: 'Security & Quality Plugin Skill',
      target: '.claude/skills/code_review_guard/SKILL.md',
      desc: 'PEP 8 / ESLint / 명확한 타입 힌팅 & OWASP Top 10 보안 가드레일 자동 전수 검사 스킬',
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
      name: '🗄️ db_migration (DB 마이그레이션 스킬)',
      badge: '필수 스킬 #3',
      pluginType: 'Database Automation Plugin Skill',
      target: '.claude/skills/db_migration/SKILL.md',
      desc: 'DATABASE_SCHEMA.md를 파싱하여 PostgreSQL / MariaDB 원시 SQL DDL 및 ORM 스키마 자동 생성 스킬',
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
      name: '🔌 api_integration (API 자동 연동 스킬)',
      badge: '인기 스킬 #1',
      pluginType: 'OpenAPI Client Generator Plugin',
      target: '.claude/skills/api_integration/SKILL.md',
      desc: 'OpenAPI/Swagger 명세서를 읽고 Async Pydantic 및 TypeScript API 클라이언트 자동 작성 스킬',
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
      name: '🐞 bug_hunting_agent (디버깅 수술 스킬)',
      badge: '인기 스킬 #2',
      pluginType: 'StackTrace Analyzer Plugin Skill',
      target: '.claude/skills/bug_hunting_agent/SKILL.md',
      desc: '터미널 StackTrace 및 런타임 로그 파싱 ➔ 상류 데이터 제공자 추적 및 원천 코드 정밀 수술 스킬',
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
            <Puzzle className="w-3.5 h-3.5 text-pink-400" /> Agent Skills & Plugins Master Academy
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            실리콘밸리 빅테크 <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">에이전트 스킬(Skills) & 플러그인 셋팅 센터</span>
          </h1>
          <p className="mt-3 text-slate-300 text-base leading-relaxed font-medium">
            <strong className="text-white">Claude Code, Google Antigravity, Cursor, AWS Kiro</strong> 등 최신 AI 도구에서 필수 적용하는 <strong className="text-indigo-300">커스텀 스킬(.claude/skills/), MCP 플러그인 및 도구별 Custom Rules</strong>를 원클릭으로 내 프로젝트에 즉시 반영해보세요!
          </p>
        </div>
      </div>

      {/* Main Roadmap Tab Selector */}
      <div className="flex bg-slate-100 dark:bg-slate-900/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none gap-1">
        {[
          { id: 'skills', title: '🧩 Step 1: 빅테크 필수/인기 스킬 (Skills Pack)', desc: 'deploy, review, db_migration 스킬 템플릿' },
          { id: 'tools', title: '🛠️ Step 2: Top 10 도구별 스킬 & 플러그인 가이드', desc: 'Antigravity / AWS Kiro / Claude Code / Cursor' },
          { id: 'artifacts', title: '📦 Step 3: 생성 마크다운 명세서 배치법', desc: 'AGENTS.md & TASKS.md 프로젝트 배치' },
          { id: 'customrules', title: '⚙️ Step 4: 도구별 Custom Rules 템플릿', desc: '.cursorrules, directives.yaml, kiro.yaml' },
          { id: 'beginner', title: '🌱 Step 5: 바이브코딩 입문 개념', desc: '3단계 작동원리 & 아키텍처 연동' }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 min-w-[210px] text-left px-4 py-3 rounded-xl transition-all font-black text-xs flex flex-col gap-1 ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/40'
              }`}
            >
              <span className="text-sm font-black tracking-tight flex items-center gap-1.5">
                {isActive && <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />}
                {tab.title}
              </span>
              <span className={`text-[11px] font-semibold ${isActive ? 'text-indigo-100' : 'text-slate-500'}`}>{tab.desc}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Silicon Valley Skills Pack (Default Active) */}
      {activeTab === 'skills' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Zap className="w-6 h-6 text-amber-500" />
                실리콘밸리 빅테크 필수 & 인기 에이전트 스킬 라이브러리 (Vibe Skills Pack)
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-1">
                아래 스킬 코드를 복사하여 <strong className="text-indigo-600 dark:text-indigo-400 font-mono">`.claude/skills/스킬명/SKILL.md`</strong>로 저장하면 Claude Code 및 Antigravity에서 100% 자동 동작합니다.
              </p>
            </div>
          </div>

          <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto scrollbar-none">
            {popularSkills.map((sk) => (
              <button
                key={sk.id}
                onClick={() => setActiveSkillId(sk.id)}
                className={`px-3.5 py-2.5 rounded-xl font-black text-xs transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeSkillId === sk.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-100 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-indigo-400'
                }`}
              >
                <span>{sk.name}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white font-bold">{sk.badge}</span>
              </button>
            ))}
          </div>

          {/* Active Skill Code Display */}
          {popularSkills.filter(s => s.id === activeSkillId).map((skill) => (
            <div key={skill.id} className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-indigo-50 dark:bg-indigo-950/40 p-4 rounded-2xl border border-indigo-200 dark:border-indigo-800/60 gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-black text-sm text-indigo-950 dark:text-indigo-200">{skill.name}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-200 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 font-bold">{skill.pluginType}</span>
                  </div>
                  <p className="text-xs text-indigo-700 dark:text-indigo-300/80 font-semibold mt-1">{skill.desc}</p>
                </div>
                <div className="text-xs font-mono font-black text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 shrink-0">
                  📁 스킬 파일 위치: {skill.target}
                </div>
              </div>

              <div className="relative bg-slate-950 text-slate-200 p-5 rounded-2xl font-mono text-xs border border-slate-800">
                <button
                  onClick={() => handleCopy(skill.code, skill.id)}
                  className="absolute top-4 right-4 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-md"
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

      {/* Tab 2: Top 10 Tools Detailed Skills & Plugins Guide */}
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

          {/* 1. Claude Code Skills & MCP Plugins */}
          {activeTool === 'claude_code' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-6">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <span>🤖 Claude Code (Anthropic) Custom Skills & MCP 연동 가이드</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-1">
                  `.claude/skills/` 스킬 라이브러리 및 `codebase-memory-mcp` 지식 그래프 MCP 연동법.
                </p>
              </div>

              {/* Skills Section */}
              <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <h4 className="font-black text-sm text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                  <Puzzle className="w-4 h-4" /> 1. Custom Skill 등록 방법 (.claude/skills/)
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                  프로젝트 루트 폴더에 <code className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-indigo-500 font-mono">.claude/skills/deploy_production/SKILL.md</code> 파일을 만들고 본 사이트의 스킬 코드를 넣으면 Claude Code가 스킬을 자동 인식합니다.
                </p>
                <div className="bg-slate-900 text-emerald-400 p-3 rounded-xl font-mono text-xs flex items-center justify-between">
                  <span>mkdir -p .claude/skills/deploy_production</span>
                  <button onClick={() => handleCopy("mkdir -p .claude/skills/deploy_production", "cmd_mkdir_skill")} className="p-1.5 rounded-lg bg-slate-800 text-white">
                    {copiedId === "cmd_mkdir_skill" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* MCP Plugins Section */}
              <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <h4 className="font-black text-sm text-purple-600 dark:text-purple-400 flex items-center gap-2">
                  <Zap className="w-4 h-4" /> 2. MCP (Model Context Protocol) 서버 플러그인 연결
                </h4>
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
                  코드베이스 지식 그래프 연동을 위한 <code className="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-purple-400 font-mono">codebase-memory-mcp</code> 등록 커맨드:
                </p>
                <div className="bg-slate-900 text-indigo-300 p-3 rounded-xl font-mono text-xs flex items-center justify-between">
                  <span>claude mcp add codebase-memory npx -y @modelcontextprotocol/server-codebase-memory</span>
                  <button onClick={() => handleCopy("claude mcp add codebase-memory npx -y @modelcontextprotocol/server-codebase-memory", "cmd_mcp")} className="p-1.5 rounded-lg bg-slate-800 text-white">
                    {copiedId === "cmd_mcp" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 2. Antigravity */}
          {activeTool === 'antigravity' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-5">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <span>🌌 Google Antigravity 에이전트 스킬 & Directives 설정</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-1">
                  DeepMind 멀티모달 자율 추론 스킬 및 `.antigravity/directives.yaml` 바인딩.
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-950 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <h4 className="font-black text-sm text-indigo-600 dark:text-indigo-400">
                  directives.yaml 파일에 스킬 규칙 오버라이드
                </h4>
                <pre className="bg-slate-900 text-emerald-400 p-3 rounded-xl font-mono text-xs overflow-x-auto">
{`skills:
  - name: deploy_production
    path: .claude/skills/deploy_production/SKILL.md
  - name: code_review_guard
    path: .claude/skills/code_review_guard/SKILL.md`}
                </pre>
              </div>
            </div>
          )}

          {/* 3. Cursor */}
          {activeTool === 'cursor' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-5">
              <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <span>💻 Cursor IDE Plugins & `.cursorrules` 스킬 셋팅</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-1">
                  Cursor Marketplace 추천 확장 플러그인 및 `.cursorrules` 스킬 바인딩.
                </p>
              </div>

              <div className="space-y-3 text-xs font-medium text-slate-700 dark:text-slate-300">
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
                  <h4 className="font-black text-sm text-indigo-600 dark:text-indigo-400">1. Cursor 추천 필수 확장 플러그인 (Marketplace)</h4>
                  <p>• <strong>Claude Code Helper</strong>: Cursor에서 Claude Code CLI를 단축키로 제어</p>
                  <p>• <strong>GitHub Copilot Chat</strong>: Copilot과 Cursor Composer 동시 연동</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-1">
                  <h4 className="font-black text-sm text-indigo-600 dark:text-indigo-400">2. `.cursorrules` 파일 생성 위치</h4>
                  <p>프로젝트 루트 디렉토리에 <code className="bg-slate-200 dark:bg-slate-800 px-1 py-0.5 rounded font-mono text-indigo-400">./.cursorrules</code> 생성 후 'Step 4' 템플릿 복사.</p>
                </div>
              </div>
            </div>
          )}

          {/* 4. AWS Kiro */}
          {activeTool === 'aws_kiro' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-4">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">☁️ AWS Q Toolkit Plugin & Kiro Skill YAML</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">
                VS Code / IntelliJ에 AWS Toolkit 플러그인을 설치하고 `kiro.yaml`에 배포 스킬을 연결합니다.
              </p>
            </div>
          )}

          {/* Other Tools Placeholder */}
          {['bolt', 'v0', 'copilot', 'windsurf', 'replit', 'devin'].includes(activeTool) && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-4">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">🧩 {activeTool.toUpperCase()} 스킬 & 플러그인 연동 스펙</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold">
                본 플랫폼에서 생성된 `AGENTS.md` 및 'Step 1'의 5대 빅테크 스킬 코드(`SKILL.md`)를 파일 또는 시스템 프롬프트로 복사해 넣으면 100% 자동 동작합니다.
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

      {/* Tab 4: Custom Rules */}
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

      {/* Tab 5: Beginner Concept */}
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
          </div>
        </div>
      )}
    </div>
  );
};
