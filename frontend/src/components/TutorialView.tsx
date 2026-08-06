import React, { useState } from 'react';
import { 
  Copy, Check, Sparkles, Layers, Zap, ShieldCheck, Puzzle, Terminal, 
  Cpu, Users, GitBranch, AlertTriangle, HelpCircle, Server
} from 'lucide-react';

export const TutorialView: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'claude_team' | 'antigravity' | 'cursor' | 'frameworks' | 'comparison' | 'troubleshoot'>('claude_team');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Premium Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/30 p-8 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" /> 2026 AI Agentic Architecture Master Guide
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            AI 에이전트팀 & 서브에이전트 <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              실전 튜토리얼 & 도구별 종합 비교 가이드
            </span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium max-w-3xl">
            API 문서를 읽다가 탭 6개를 열어놓고 AI 창에 복사/붙여넣기 하던 탭 전환의 낭비를 끝내세요.
            <strong className="text-white"> Claude Code(에이전트팀·서브에이전트·스킬·MCP)</strong>부터 <strong className="text-indigo-300">Google Antigravity, Cursor, AutoGen, CrewAI</strong>까지 최신 AI 개발 생태계를 한눈에 따라 실습할 수 있는 실무 튜토리얼입니다.
          </p>
        </div>
      </div>

      {/* Main Category Tabs */}
      <div className="flex bg-slate-100 dark:bg-slate-900/90 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none gap-1.5">
        {[
          { id: 'claude_team', title: '🤖 튜토리얼 1: Claude 에이전트팀 & 서브에이전트', desc: 'Agent Teams, Sub-agents, Skills, MCP' },
          { id: 'antigravity', title: '🌌 튜토리얼 2: Google Antigravity & Directives', desc: 'DeepMind Agentic Skills & directives.yaml' },
          { id: 'cursor', title: '💻 튜토리얼 3: Cursor & Cascade Rules', desc: '.cursorrules & Extension Plugins' },
          { id: 'frameworks', title: '⚙️ 튜토리얼 4: AutoGen 0.4 & CrewAI', desc: 'Python 기반 멀티 에이전트 코드' },
          { id: 'comparison', title: '📊 종합 비교: Top 5 AI 에이전트 도구', desc: '기능, 스킬 지원, 요금제, 보안 가드레일' },
          { id: 'troubleshoot', title: '🛡️ 보안 & 트러블슈팅 가이드', desc: 'Prompt Injection 방어, OOM, Retry' }
        ].map((tab) => {
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`flex-1 min-w-[210px] text-left px-4 py-3 rounded-xl transition-all font-black text-xs flex flex-col gap-1 ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/40'
              }`}
            >
              <span className="text-sm font-black tracking-tight flex items-center gap-1.5">
                {isActive && <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
                {tab.title}
              </span>
              <span className={`text-[11px] font-semibold ${isActive ? 'text-indigo-100' : 'text-slate-500'}`}>{tab.desc}</span>
            </button>
          );
        })}
      </div>

      {/* Category 1: Claude Code Agent Teams & Sub-agents */}
      {activeCategory === 'claude_team' && (
        <div className="space-y-8">
          {/* Conceptual Overview */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
            <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
              <span className="px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-extrabold">
                튜토리얼 1 — Claude Code Ecosystem
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-2 flex items-center gap-2">
                <Users className="w-6 h-6 text-indigo-500" />
                Claude Code: 에이전트팀(Agent Teams) + 서브에이전트(Sub-agents) + 스킬(Skills) + MCP 종합 가이드
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                단일 LLM과의 1:1 대화를 넘어, <strong>메인 코디네이터(Leader Agent)</strong>가 <strong>전문 서브에이전트(Sub-agents)</strong>들에게 업무를 분산 위임하고, 커스텀 스킬(<code className="font-mono text-indigo-500">SKILL.md</code>)과 MCP 지식 그래프로 정밀 수술을 완수하는 최신 아키텍처입니다.
              </p>
            </div>

            {/* Visual Architecture Flowchart */}
            <div className="p-6 rounded-2xl bg-slate-950 text-white space-y-4 border border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-indigo-400 font-bold">claude-agent-team-architecture.diag</span>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Orchestration Pattern
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center text-xs font-bold">
                <div className="p-3.5 rounded-xl bg-indigo-900/80 border border-indigo-700 text-indigo-200">
                  1. Leader Agent<br /><span className="text-[10px] text-slate-400 font-normal">사용자 요청 파싱 & 계획</span>
                </div>
                <div className="p-3.5 rounded-xl bg-purple-900/80 border border-purple-700 text-purple-200">
                  2. Sub-agents 위임<br /><span className="text-[10px] text-slate-400 font-normal">bug_hunter, reviewer</span>
                </div>
                <div className="p-3.5 rounded-xl bg-cyan-900/80 border border-cyan-700 text-cyan-200">
                  3. Skills & MCP 실행<br /><span className="text-[10px] text-slate-400 font-normal">SKILL.md & 지식그래프</span>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-600 text-white">
                  4. 최종 결과 검증<br /><span className="text-[10px] text-emerald-100 font-normal">자동 빌드 & Git 배포</span>
                </div>
              </div>
            </div>

            {/* Hands-on Step 1: Sub-agent & Skill Folder Tree */}
            <div className="space-y-4 pt-4">
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-purple-500" />
                실습 1. 프로젝트 폴더 구조 셋팅 (.claude/ 및 .agents/)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                프로젝트 루트에 아래 폴더 구조를 생성하여 서브에이전트 지시서와 커스텀 스킬을 배치합니다.
              </p>
              <div className="bg-slate-950 p-4 rounded-2xl font-mono text-xs text-emerald-400 border border-slate-800 relative">
                <button
                  onClick={() => handleCopy(`mkdir -p .claude/skills/deploy_production .claude/skills/security_review .claude/subagents`, 'cmd_tree')}
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all flex items-center gap-1"
                >
                  {copiedId === 'cmd_tree' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  디렉토리 생성 커맨드 복사
                </button>
                <pre className="text-[11px] leading-relaxed pt-6">
{`my-project/
├── .claude/
│   ├── skills/                       # 커스텀 스킬 모듈 (Custom Skills)
│   │   ├── deploy_production/
│   │   │   └── SKILL.md              # 배포 자동화 스킬 정의서
│   │   └── security_review/
│   │       └── SKILL.md              # OWASP 보안 검사 스킬
│   ├── subagents/                    # 전문 서브에이전트 지시서 (Sub-agents)
│   │   ├── bug_hunting_agent.md      # 버그 디버깅 수술 특화 에이전트
│   │   └── security_guard_agent.md   # 보안 가드레일 특화 에이전트
│   └── mcp.json                      # MCP (Model Context Protocol) 설정
└── AGENTS.md                         # 전역 규칙 및 아키텍처 규칙`}
                </pre>
              </div>
            </div>

            {/* Hands-on Step 2: Custom Skill Code */}
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Puzzle className="w-5 h-5 text-indigo-500" />
                실습 2. `.claude/skills/deploy_production/SKILL.md` 작성
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                YAML 프론트매터(<code className="font-mono text-indigo-500">name</code>, <code className="font-mono text-indigo-500">description</code>)로 스킬 실행 조건 및 지침을 작성합니다.
              </p>
              <div className="bg-slate-950 p-5 rounded-2xl font-mono text-xs text-slate-200 border border-slate-800 relative">
                <button
                  onClick={() => handleCopy(`---\nname: deploy_production\ndescription: 빌드 검증 후 한국어 커밋 메시지로 main 브랜치 자동 배포\n---\n\n# Deploy Production Skill Directive\n1. Run \`npm run build\` or \`pytest\` to verify zero build errors.\n2. Formulate a concise Korean commit message adhering to conventions (feat/fix/chore).\n3. Stage all files with \`git add -A\`.\n4. Commit and push to remote \`main\` branch.`, 'code_skill_deploy')}
                  className="absolute top-4 right-4 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-md"
                >
                  {copiedId === 'code_skill_deploy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedId === 'code_skill_deploy' ? '복사 완료!' : '스킬 코드 복사'}
                </button>
                <pre className="text-[11px] leading-relaxed text-emerald-400 pt-6 overflow-x-auto">
{`---
name: deploy_production
description: 빌드 검증 후 한국어 커밋 메시지로 main 브랜치 자동 배포
---

# Deploy Production Skill Directive
1. Run \`npm run build\` to verify zero build errors.
2. Formulate a concise Korean commit message adhering to conventions (feat/fix/chore).
3. Stage all files with \`git add -A\`.
4. Commit and push to remote \`main\` branch.`}
                </pre>
              </div>
            </div>

            {/* Hands-on Step 3: MCP Connection */}
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Server className="w-5 h-5 text-cyan-500" />
                실습 3. MCP (Model Context Protocol) 지식 그래프 연결
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                코드베이스 지식 그래프 분석을 위해 <code className="font-mono text-purple-400">codebase-memory-mcp</code> 서버를 등록합니다.
              </p>
              <div className="bg-slate-900 text-indigo-300 p-4 rounded-xl font-mono text-xs flex items-center justify-between border border-slate-800">
                <span>claude mcp add codebase-memory npx -y @modelcontextprotocol/server-codebase-memory</span>
                <button
                  onClick={() => handleCopy("claude mcp add codebase-memory npx -y @modelcontextprotocol/server-codebase-memory", "cmd_mcp_add")}
                  className="p-2 rounded-lg bg-indigo-600 text-white font-bold hover:bg-indigo-500"
                >
                  {copiedId === "cmd_mcp_add" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category 2: Google Antigravity & Directives */}
      {activeCategory === 'antigravity' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-extrabold">
              튜토리얼 2 — Google Antigravity & Gemini
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-2 flex items-center gap-2">
              <Cpu className="w-6 h-6 text-purple-500" />
              Google Antigravity: 자율 추론 에이전트 & Directives 바인딩
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Google DeepMind의 <strong>Antigravity 에이전트</strong>는 멀티모달 뷰어 및 지식 그래프와 연동되어 <code className="font-mono text-purple-400">directives.yaml</code> 가이드라인을 따라 자율 디버깅을 수행합니다.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              `.antigravity/directives.yaml` 바인딩 실습
            </h3>
            <div className="bg-slate-950 p-5 rounded-2xl font-mono text-xs text-slate-200 border border-slate-800 relative">
              <button
                onClick={() => handleCopy(`agent_pipeline:\n  mode: autonomous\n  guardrails:\n    strict_types: true\n    prevent_oom: true\nskills:\n  - name: deploy_production\n    path: .claude/skills/deploy_production/SKILL.md`, 'code_antigravity')}
                className="absolute top-4 right-4 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all flex items-center gap-1.5"
              >
                {copiedId === 'code_antigravity' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                directives.yaml 코드 복사
              </button>
              <pre className="text-[11px] leading-relaxed text-indigo-300 pt-6 overflow-x-auto">
{`agent_pipeline:
  mode: autonomous
  guardrails:
    strict_types: true
    prevent_oom: true
skills:
  - name: deploy_production
    path: .claude/skills/deploy_production/SKILL.md`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Category 3: Cursor & Cascade Rules */}
      {activeCategory === 'cursor' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <span className="px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 text-xs font-extrabold">
              튜토리얼 3 — Cursor & Cascade Rules
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-2 flex items-center gap-2">
              <Terminal className="w-6 h-6 text-cyan-500" />
              Cursor IDE: Composer & `.cursorrules` 스킬 정의
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Cursor IDE의 Composer 기능과 연동되는 <code className="font-mono text-cyan-400">.cursorrules</code> 파일을 구성하여 AI 가드레일을 적용합니다.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              `.cursorrules` 파일 실습 코드
            </h3>
            <div className="bg-slate-950 p-5 rounded-2xl font-mono text-xs text-slate-200 border border-slate-800 relative">
              <button
                onClick={() => handleCopy(`# [Rule: No Superfluous Dependencies]\n1. Never install external libraries for date/string formatting.\n2. Ensure PEP 8 for Python & strict TypeScript types.\n3. Include Retry with exponential backoff on DB deadlock.`, 'code_cursorrules')}
                className="absolute top-4 right-4 px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs transition-all flex items-center gap-1.5"
              >
                {copiedId === 'code_cursorrules' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                .cursorrules 복사
              </button>
              <pre className="text-[11px] leading-relaxed text-cyan-300 pt-6 overflow-x-auto">
{`# [Rule: No Superfluous Dependencies]
1. Never install external libraries for date/string formatting.
2. Ensure PEP 8 for Python & strict TypeScript types.
3. Include Retry with exponential backoff on DB deadlock.`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Category 4: Frameworks (AutoGen & CrewAI) */}
      {activeCategory === 'frameworks' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-xs font-extrabold">
              튜토리얼 4 — AutoGen 0.4 & CrewAI
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-2 flex items-center gap-2">
              <Zap className="w-6 h-6 text-emerald-500" />
              AutoGen 0.4 & CrewAI: 백엔드 Python 멀티 에이전트 구축
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Python 백엔드 환경에서 <strong>Manager Agent</strong>와 <strong>Worker Agent</strong> 간의 메시지 버스 연동 실습 예제입니다.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              AutoGen 0.4 멀티 에이전트 Python 실습 예제
            </h3>
            <div className="bg-slate-950 p-5 rounded-2xl font-mono text-xs text-slate-200 border border-slate-800 relative">
              <button
                onClick={() => handleCopy(`from autogen_agentchat.agents import AssistantAgent\nfrom autogen_agentchat.teams import SelectorGroupChat\n\nplanner = AssistantAgent("planner", model_client=model_client, description="오케스트레이터 기획 에이전트")\ncoder = AssistantAgent("coder", model_client=model_client, description="코드 구현 서브 에이전트")\nreviewer = AssistantAgent("reviewer", model_client=model_client, description="보안 및 품질 검사 서브 에이전트")\n\nteam = SelectorGroupChat([planner, coder, reviewer], model_client=model_client)`, 'code_autogen')}
                className="absolute top-4 right-4 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center gap-1.5"
              >
                {copiedId === 'code_autogen' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                Python 코드 복사
              </button>
              <pre className="text-[11px] leading-relaxed text-emerald-400 pt-6 overflow-x-auto">
{`from autogen_agentchat.agents import AssistantAgent
from autogen_agentchat.teams import SelectorGroupChat

planner = AssistantAgent("planner", model_client=model_client, description="오케스트레이터 기획 에이전트")
coder = AssistantAgent("coder", model_client=model_client, description="코드 구현 서브 에이전트")
reviewer = AssistantAgent("reviewer", model_client=model_client, description="보안 및 품질 검사 서브 에이전트")

team = SelectorGroupChat([planner, coder, reviewer], model_client=model_client)`}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Category 5: Tools Comparison Table */}
      {activeCategory === 'comparison' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-xs font-extrabold">
              종합 비교 레포트
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-2 flex items-center gap-2">
              <Layers className="w-6 h-6 text-blue-500" />
              Top 5 AI 에이전트 도구 종합 스펙 비교표
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              Claude Code, Antigravity, Cursor, Devin, AutoGen 간의 에이전트팀 지원, 서브에이전트 지원, 스킬/MCP 확장성 및 비용 구조 비교입니다.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
                  <th className="p-3.5 font-extrabold">도구명 (Tool)</th>
                  <th className="p-3.5 font-extrabold">에이전트팀 (Agent Teams)</th>
                  <th className="p-3.5 font-extrabold">서브에이전트 지원</th>
                  <th className="p-3.5 font-extrabold">스킬(SKILL.md) & MCP</th>
                  <th className="p-3.5 font-extrabold">보안 가드레일</th>
                  <th className="p-3.5 font-extrabold">비용 / 요금제</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr className="bg-indigo-50/50 dark:bg-indigo-950/30">
                  <td className="p-3.5 font-black text-indigo-600 dark:text-indigo-400">🤖 Claude Code CLI</td>
                  <td className="p-3.5 font-bold text-emerald-600 dark:text-emerald-400">✅ 완벽 지원 (Leader/Worker)</td>
                  <td className="p-3.5 font-bold text-emerald-600 dark:text-emerald-400">✅ .claude/subagents/ 지원</td>
                  <td className="p-3.5 font-bold text-emerald-600 dark:text-emerald-400">✅ Native MCP & Skills</td>
                  <td className="p-3.5">Human-in-the-Loop 승인</td>
                  <td className="p-3.5 font-semibold">API 토큰 사용량 비례</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-black text-purple-600 dark:text-purple-400">🌌 Google Antigravity</td>
                  <td className="p-3.5 font-bold text-emerald-600 dark:text-emerald-400">✅ 완벽 지원 (DeepMind Agent)</td>
                  <td className="p-3.5 font-bold text-emerald-600 dark:text-emerald-400">✅ directives.yaml 서브 바인딩</td>
                  <td className="p-3.5 font-bold text-emerald-600 dark:text-emerald-400">✅ Agentic Directives & Skill</td>
                  <td className="p-3.5">Strict Types & OOM Guard</td>
                  <td className="p-3.5 font-semibold">무료 / Google Cloud 크레딧</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-950/40">
                  <td className="p-3.5 font-black text-cyan-600 dark:text-cyan-400">💻 Cursor IDE</td>
                  <td className="p-3.5 font-bold text-amber-600 dark:text-amber-400">⚠️ Composer 단위 지원</td>
                  <td className="p-3.5 font-bold text-amber-600 dark:text-amber-400">⚠️ 확장 플러그인 필요</td>
                  <td className="p-3.5 font-bold text-emerald-600 dark:text-emerald-400">✅ .cursorrules & MCP</td>
                  <td className="p-3.5">Linter & Rule Enforcement</td>
                  <td className="p-3.5 font-semibold">월 $20 (Pro)</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-black text-emerald-600 dark:text-emerald-400">⚙️ AutoGen 0.4</td>
                  <td className="p-3.5 font-bold text-emerald-600 dark:text-emerald-400">✅ 완벽 지원 (Python SDK)</td>
                  <td className="p-3.5 font-bold text-emerald-600 dark:text-emerald-400">✅ SelectorGroupChat 지원</td>
                  <td className="p-3.5 font-bold text-amber-600 dark:text-amber-400">⚠️ Python Function Call 연동</td>
                  <td className="p-3.5">커스텀 코드 가드레일</td>
                  <td className="p-3.5 font-semibold">오픈소스 (무료)</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-950/40">
                  <td className="p-3.5 font-black text-pink-600 dark:text-pink-400">🤖 Devin / Roo Code</td>
                  <td className="p-3.5 font-bold text-emerald-600 dark:text-emerald-400">✅ 독립 자율 서빙</td>
                  <td className="p-3.5 font-bold text-emerald-600 dark:text-emerald-400">✅ 자율 서브 샌드박스</td>
                  <td className="p-3.5 font-bold text-emerald-600 dark:text-emerald-400">✅ Roo Code MCP 지원</td>
                  <td className="p-3.5">Sandbox Isolation</td>
                  <td className="p-3.5 font-semibold">월 $500 / ACU 차감</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Category 6: Security & Troubleshooting */}
      {activeCategory === 'troubleshoot' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
          <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
            <span className="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-xs font-extrabold">
              보안 및 트러블슈팅
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-2 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-rose-500" />
              보안 가드레일(Prompt Injection 방어) & 트러블슈팅 가이드
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
              에이전트 권한 이탈 방지, 512MB RAM 서버 메모리 누수(OOM) 해결 및 백오프 재시도 설정 가이드라인입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 space-y-3">
              <h3 className="font-black text-sm text-rose-950 dark:text-rose-200 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500" /> 1. Prompt Injection & 권한 이탈 방지
              </h3>
              <ul className="text-xs text-rose-900 dark:text-rose-300 space-y-1.5 list-disc list-inside font-medium">
                <li>민감 정보(API Key, Admin 비밀번호)는 절대 하드코딩 금지, <code className="font-mono font-bold">.env</code>로 관리</li>
                <li>중요 DB 삭제 및 외부 배포 시 <strong>Human-in-the-Loop 승인 루프</strong> 배치</li>
                <li>Sub-agent 명령 수행 시 파일 쓰기 범위를 <code className="font-mono font-bold">./src/</code>로 한정 Scoping</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 space-y-3">
              <h3 className="font-black text-sm text-amber-950 dark:text-amber-200 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-amber-500" /> 2. OOM Kill 및 DB 데드락 트러블슈팅
              </h3>
              <ul className="text-xs text-amber-900 dark:text-amber-300 space-y-1.5 list-disc list-inside font-medium">
                <li>Render 등 512MB RAM 환경에서는 스타트업 무거운 배치 지연 실행 (<code className="font-mono font-bold">asyncio.sleep(60)</code>)</li>
                <li>대용량 데이터 처리 시 Generator 패턴 및 청크(Chunk) 배치 분할 필수</li>
                <li>DB 연결 유실 대비 Exponential Backoff 자동 재시도 로직 포함</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
