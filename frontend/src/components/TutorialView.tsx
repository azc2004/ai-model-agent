import React, { useState } from 'react';
import { 
  BookOpen, Copy, Check, Sparkles, Layers, Zap
} from 'lucide-react';

export const TutorialView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'beginner' | 'tools' | 'artifacts' | 'claudecode'>('beginner');
  const [activeTool, setActiveTool] = useState<'cursor' | 'claude_code' | 'copilot' | 'windsurf'>('cursor');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Tutorial Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950 via-purple-950 to-slate-900 border border-indigo-500/30 p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" /> AI Agent Coding Academy
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            비개발자도 10분 만에 마스터하는 <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">AI 에이전트 코딩 튜토리얼</span>
          </h1>
          <p className="mt-3 text-slate-300 text-base leading-relaxed font-medium">
            코딩 지식이 없어도 괜찮습니다! <strong className="text-white">Cursor, Claude Code, GitHub Copilot</strong> 등 현업 최신 바이브코딩 도구의 셋팅부터, 본 시스템에서 생성된 <strong className="text-indigo-300">5대 Markdown 명세서 적용법</strong>까지 실전 가이드로 쉽게 따라해 보세요.
          </p>
        </div>
      </div>

      {/* Main Roadmap Tab Selector */}
      <div className="flex bg-slate-100 dark:bg-slate-900/80 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none gap-1">
        {[
          { id: 'beginner', title: '🌱 Step 1: 에이전트 코딩 입문', desc: '바이브코딩 개념 & 작동원리' },
          { id: 'tools', title: '🛠️ Step 2: 현업 도구별 셋팅 가이드', desc: 'Cursor / Claude Code / Copilot' },
          { id: 'artifacts', title: '📦 Step 3: 생성 마크다운 적용법', desc: 'AGENTS.md & TASKS.md 활용' },
          { id: 'claudecode', title: '🧠 Step 4: Claude Code 스킬 마스터', desc: 'custom skills & MCP 연동' }
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

      {/* Tab Content Section */}
      {activeTab === 'beginner' && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-4">
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-indigo-500" />
              '바이브 코딩 (Vibe Coding)'이란 무엇인가요?
            </h2>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              과거의 코딩이 개발자가 하나하나 문법을 타이핑하는 방식이었다면, <strong className="text-indigo-600 dark:text-indigo-400">바이브 코딩(Vibe Coding)</strong>은 사람이 <strong>'서비스의 의도와 설계도(Markdown 명세서)'</strong>를 제시하면, AI 에이전트(Cursor, Claude Code 등)가 99%의 코드를 직접 작성하고 테스트하는 2026년 빅테크의 최신 개발 패러다임입니다.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-indigo-50 dark:bg-slate-950 p-5 rounded-2xl border border-indigo-100 dark:border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-black flex items-center justify-center text-sm">1</div>
                <h3 className="font-black text-slate-900 dark:text-white text-base">명세서 작성 (Spec)</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold leading-relaxed">
                  본 플랫폼의 'AI 아키텍처 추천기'를 통해 5대 설계 명세서(AGENTS.md, TASKS.md 등)를 원클릭으로 준비합니다.
                </p>
              </div>

              <div className="bg-purple-50 dark:bg-slate-950 p-5 rounded-2xl border border-purple-100 dark:border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-purple-600 text-white font-black flex items-center justify-center text-sm">2</div>
                <h3 className="font-black text-slate-900 dark:text-white text-base">AI 에이전트 지시 (Directive)</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold leading-relaxed">
                  Cursor 또는 Claude Code에 다운로드한 명세서를 배치하고 "AGENTS.md 지시를 따라 구현해줘"라고 명령합니다.
                </p>
              </div>

              <div className="bg-emerald-50 dark:bg-slate-950 p-5 rounded-2xl border border-emerald-100 dark:border-slate-800 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center text-sm">3</div>
                <h3 className="font-black text-slate-900 dark:text-white text-base">자동 자율 개발 (Execution)</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold leading-relaxed">
                  AI 에이전트가 백그라운드에서 파일 작성, 터미널 명령 실행, 에러 자동 수정을 스스로 완수합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Tools Setup */}
      {activeTab === 'tools' && (
        <div className="space-y-6">
          {/* Sub Tool Switcher */}
          <div className="flex gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            {[
              { id: 'cursor', name: '💻 Cursor IDE', badge: '가장 쉬움 (초보자 추천)' },
              { id: 'claude_code', name: '🤖 Claude Code CLI', badge: '터미널 실시간 자율 에이전트' },
              { id: 'copilot', name: '🐙 GitHub Copilot Workspace', badge: '웹 기반 PR 자율 자동화' },
              { id: 'windsurf', name: '🏄 Windsurf Cascade', badge: '실시간 멀티파일 딥 트래킹' }
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTool(t.id as any)}
                className={`px-4 py-2.5 rounded-xl font-black text-xs transition-all flex items-center gap-2 ${
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

          {/* Tool Setup Showcase */}
          {activeTool === 'cursor' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-5">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <span>💻 Cursor IDE 연동 & AGENTS.md 설정 가이드</span>
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-1">
                    VS Code 기반으로 만들어져 비개발자도 1분 만에 설치하고 사용할 수 있습니다.
                  </p>
                </div>
                <a
                  href="https://cursor.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs px-3.5 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-black border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-600 hover:text-white transition-all"
                >
                  Cursor 다운로드 ↗
                </a>
              </div>

              {/* Step Graphic */}
              <div className="space-y-4">
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <h4 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-black">1</span>
                    프로젝트 루트에 `AGENTS.md` 파일 복사
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                    본 서비스에서 다운로드한 `AGENTS.md` 파일을 내 작업 폴더 맨 위에 저장합니다.
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <h4 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-black">2</span>
                    Cursor Composer 실행 (Shortcut: Cmd + I 또는 Ctrl + I)
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                    Cursor 창에서 `Cmd + I`를 누르면 AI Composer 창이 열립니다. 입력창에 다음과 같이 입력하세요:
                  </p>
                  <div className="bg-slate-900 text-indigo-300 p-3 rounded-xl text-xs font-mono flex items-center justify-between">
                    <span>"AGENTS.md와 TASKS.md 지침을 확인하고 Phase 1부터 개발을 시작해줘"</span>
                    <button
                      onClick={() => handleCopy("AGENTS.md와 TASKS.md 지침을 확인하고 Phase 1부터 개발을 시작해줘", "cursor_prompt")}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
                    >
                      {copiedId === "cursor_prompt" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTool === 'claude_code' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-5">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <span>🤖 Claude Code (Anthropic CLI Agent) 셋팅 가이드</span>
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-1">
                    터미널 환경에서 자율적으로 파일 탐색, 테스트 실행, Git 커밋까지 스스로 완수하는 차세대 에이전트.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-900 text-slate-200 p-4 rounded-2xl font-mono text-xs space-y-2">
                  <div className="text-slate-400 font-bold"># 1. Claude Code CLI 글로벌 설치</div>
                  <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-emerald-400">
                    <span>npm install -g @anthropic-ai/claude-code</span>
                    <button
                      onClick={() => handleCopy("npm install -g @anthropic-ai/claude-code", "install_claude")}
                      className="p-1.5 rounded-lg bg-slate-800 text-white hover:bg-slate-700"
                    >
                      {copiedId === "install_claude" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  <div className="text-slate-400 font-bold pt-2"># 2. 내 프로젝트 폴더에서 Claude Code 실행</div>
                  <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-indigo-300">
                    <span>claude</span>
                    <button
                      onClick={() => handleCopy("claude", "run_claude")}
                      className="p-1.5 rounded-lg bg-slate-800 text-white hover:bg-slate-700"
                    >
                      {copiedId === "run_claude" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTool === 'copilot' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-4">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                🐙 GitHub Copilot Workspace 설정
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold leading-relaxed">
                GitHub Repository의 Issue 영역에 `TASKS.md` 내용을 붙여넣고 Copilot Workspace를 실행하면, 웹 브라우저에서 자동으로 코드 변경사항이 작성되고 Pull Request가 생성됩니다.
              </p>
            </div>
          )}

          {activeTool === 'windsurf' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-4">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                🏄 Windsurf Cascade 가이드
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold leading-relaxed">
                Codebase 맥스 컨텍스트를 활용하여 파일 간 연관 관계를 추적하며 개발합니다. `.windsurfrules` 파일로 본 시스템의 `AGENTS.md`를 설정해 두세요.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Artifacts Application Guide */}
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

      {/* Step 4: Claude Code Advanced Skills & MCP */}
      {activeTab === 'claudecode' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-md space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Zap className="w-6 h-6 text-amber-500" />
              Claude Code 커스텀 스킬 (`skills/`) 및 MCP 연동 고급 방법론
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-semibold mt-1">
              Anthropic의 차세대 커스텀 스킬 등록 기능으로 반복 커맨드 및 외부 도구를 자동화합니다.
            </p>
          </div>

          <div className="bg-slate-950 text-slate-200 p-5 rounded-2xl font-mono text-xs space-y-4 border border-slate-800">
            <div className="space-y-1">
              <div className="text-amber-400 font-bold"># 1. 커스텀 스킬 폴더 구조 생성 (.claude/skills/)</div>
              <div className="bg-slate-900 p-3 rounded-xl text-slate-300">
                mkdir -p .claude/skills/deploy_backend
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-amber-400 font-bold"># 2. SKILL.md 스킬 정의서 작성 (YAML Frontmatter + Prompt)</div>
              <pre className="bg-slate-900 p-4 rounded-xl text-emerald-400 overflow-x-auto text-[11px] leading-relaxed">
{`---
name: deploy_backend
description: Render.com 또는 Vercel에 백엔드 자동 빌드 및 배포
---

# Deploy Skill Directive
1. Run \`npm run build\` or \`pytest\` to verify all tests pass.
2. Commit changes with Korean commit message convention.
3. Push to git remote main branch.`}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
