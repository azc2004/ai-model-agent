import React, { useState } from 'react';
import { 
  Copy, Check, Sparkles, Layers, Zap, ShieldCheck, Puzzle, Terminal, 
  Cpu, Users, GitBranch, AlertTriangle, HelpCircle, Server
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const TutorialView: React.FC = () => {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'claude_team' | 'antigravity' | 'cursor' | 'frameworks' | 'comparison' | 'troubleshoot'>('claude_team');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const I18N_TUTORIAL: Record<string, any> = {
    ko: {
      badge: "2026 AI AGENTIC ARCHITECTURE MASTER GUIDE",
      titleMain: "AI 에이전트팀 & 서브에이전트",
      titleSub: "실전 튜토리얼 & 도구별 종합 비교 가이드",
      description: "API 문서를 읽다가 탭 6개를 열어놓고 AI 창에 복사/붙여넣기 하던 탭 전환의 낭비를 끝내세요. Claude Code(에이전트팀·서브에이전트·스킬·MCP)부터 Google Antigravity, Cursor, AutoGen, CrewAI까지 최신 AI 개발 생태계를 한눈에 따라 실습할 수 있는 실무 튜토리얼입니다.",
      tabs: [
        { id: 'claude_team', title: '🤖 튜토리얼 1: Claude 에이전트팀 & 서브에이전트', desc: 'Agent Teams, Sub-agents, Skills, MCP' },
        { id: 'antigravity', title: '🌌 튜토리얼 2: Google Antigravity & Directives', desc: 'DeepMind Agentic Skills & directives.yaml' },
        { id: 'cursor', title: '💻 튜토리얼 3: Cursor & Cascade Rules', desc: '.cursorrules & Extension Plugins' },
        { id: 'frameworks', title: '⚙️ 튜토리얼 4: AutoGen 0.4 & CrewAI', desc: 'Python 기반 멀티 에이전트 코드' },
        { id: 'comparison', title: '📊 종합 비교: Top 5 AI 에이전트 도구', desc: '기능, 스킬 지원, 요금제, 보안 가드레일' },
        { id: 'troubleshoot', title: '🛡️ 보안 & 트러블슈팅 가이드', desc: 'Prompt Injection 방어, OOM, Retry' }
      ],
      t1Badge: "튜토리얼 1 — Claude Code Ecosystem",
      t1Title: "Claude Code: 에이전트팀(Agent Teams) + 서브에이전트(Sub-agents) + 스킬(Skills) + MCP 종합 가이드",
      t1Desc: "단일 LLM과의 1:1 대화를 넘어, 메인 코디네이터(Leader Agent)가 전문 서브에이전트(Sub-agents)들에게 업무를 분산 위임하고, 커스텀 스킬(SKILL.md)과 MCP 지식 그래프로 정밀 수술을 완수하는 최신 아키텍처입니다.",
      flow1: "{t.flow1}",
      flow2: "Sub-agents 위임",
      flow3: "Skills & MCP 실행",
      flow3Sub: "{t.flow3Sub}",
      flow4: "최종 결과 검증",
      flow4Sub: "{t.flow4Sub}",
      step1Title: "실습 1. 프로젝트 폴더 구조 셋팅 (.claude/ 및 .agents/)",
      step1Desc: "프로젝트 루트에 아래 폴더 구조를 생성하여 서브에이전트 지시서와 커스텀 스킬을 배치합니다.",
      copyTree: "디렉토리 생성 커맨드 복사",
      step2Title: "실습 2. .claude/skills/deploy_production/SKILL.md 작성",
      step2Desc: "YAML 프론트매터(name, description)로 스킬 실행 조건 및 지침을 작성합니다.",
      copyDone: "복사 완료!",
      copySkill: "스킬 코드 복사",
      step3Title: "실습 3. MCP (Model Context Protocol) 지식 그래프 연결",
      step3Desc: "코드베이스 지식 그래프 분석을 위해 codebase-memory-mcp 서버를 등록합니다.",
      copyLabel: "복사",
      t2Badge: "튜토리얼 2 — Google Antigravity & Gemini",
      t2Title: "Google Antigravity: 자율 추론 에이전트 & Directives 바인딩",
      t2Desc: "Google DeepMind의 Antigravity 에이전트는 멀티모달 뷰어 및 지식 그래프와 연동되어 directives.yaml 가이드라인을 따라 자율 디버깅을 수행합니다.",
      t2Step: ".antigravity/directives.yaml 바인딩 실습",
      copyDirectives: "directives.yaml 코드 복사",
      t3Badge: "튜토리얼 3 — Cursor & Cascade Rules",
      t3Title: "Cursor IDE: Composer & .cursorrules 스킬 정의",
      t3Desc: "Cursor IDE의 Composer 기능과 연동되는 .cursorrules 파일을 구성하여 AI 가드레일을 적용합니다.",
      t3Step: ".cursorrules 파일 실습 코드",
      copyCursor: ".cursorrules 복사",
      t4Badge: "튜토리얼 4 — AutoGen 0.4 & CrewAI",
      t4Title: "AutoGen 0.4 & CrewAI: 백엔드 Python 멀티 에이전트 구축",
      t4Desc: "Python 백엔드 환경에서 Manager Agent와 Worker Agent 간의 메시지 버스 연동 실습 예제입니다.",
      t4Step: "AutoGen 0.4 멀티 에이전트 Python 실습 예제",
      copyPython: "Python 코드 복사",
      cmpBadge: "종합 비교 레포트",
      cmpTitle: "Top 5 AI 에이전트 도구 종합 스펙 비교표",
      cmpDesc: "Claude Code, Antigravity, Cursor, Devin, AutoGen 간의 에이전트팀 지원, 서브에이전트 지원, 스킬/MCP 확장성 및 비용 구조 비교입니다.",
      colTool: "도구명 (Tool)",
      colTeams: "에이전트팀 (Agent Teams)",
      colSub: "서브에이전트 지원",
      colSkills: "스킬(SKILL.md) & MCP",
      colGuard: "보안 가드레일",
      colCost: "비용 / 요금제",
      valFullLeader: "✅ 완벽 지원 (Leader/Worker)",
      valSubagents: "✅ .claude/subagents/ 지원",
      valHitl: "Human-in-the-Loop 승인",
      valTokenBased: "API 토큰 사용량 비례",
      valFullDeepmind: "✅ 완벽 지원 (DeepMind Agent)",
      valDirectives: "✅ directives.yaml 서브 바인딩",
      valFreeGcp: "무료 / Google Cloud 크레딧",
      valComposerOnly: "⚠️ Composer 단위 지원",
      valNeedsPlugin: "⚠️ 확장 플러그인 필요",
      valPro20: "월 $20 (Pro)",
      valFullPySdk: "✅ 완벽 지원 (Python SDK)",
      valSelector: "✅ SelectorGroupChat 지원",
      valPyFuncCall: "⚠️ Python Function Call 연동",
      valCustomGuard: "커스텀 코드 가드레일",
      valOssFree: "오픈소스 (무료)",
      valAutonomous: "✅ 독립 자율 서빙",
      valSandbox: "✅ 자율 서브 샌드박스",
      valRooMcp: "✅ Roo Code MCP 지원",
      valAcu: "월 $500 / ACU 차감",
      secBadge: "보안 및 트러블슈팅",
      secTitle: "보안 가드레일(Prompt Injection 방어) & 트러블슈팅 가이드",
      secDesc: "에이전트 권한 이탈 방지, 512MB RAM 서버 메모리 누수(OOM) 해결 및 백오프 재시도 설정 가이드라인입니다.",
      sec1Title: "1. Prompt Injection & 권한 이탈 방지",
      sec1a: "민감 정보(API Key, Admin 비밀번호)는 절대 하드코딩 금지, .env로 관리",
      sec1b: "중요 DB 삭제 및 외부 배포 시 Human-in-the-Loop 승인 루프 배치",
      sec1c: "Sub-agent 명령 수행 시 파일 쓰기 범위를 ./src/로 한정 Scoping",
      sec2Title: "2. OOM Kill 및 DB 데드락 트러블슈팅",
      sec2a: "Render 등 512MB RAM 환경에서는 스타트업 무거운 배치 지연 실행 (asyncio.sleep(60))",
      sec2b: "대용량 데이터 처리 시 Generator 패턴 및 청크(Chunk) 배치 분할 필수",
      sec2c: "DB 연결 유실 대비 Exponential Backoff 자동 재시도 로직 포함",
      cmtSkills: "커스텀 스킬 모듈 (Custom Skills)",
      cmtDeploySkill: "배포 자동화 스킬 정의서",
      cmtSecSkill: "OWASP 보안 검사 스킬",
      cmtSubagents: "전문 서브에이전트 지시서 (Sub-agents)",
      cmtBugAgent: "버그 디버깅 수술 특화 에이전트",
      cmtSecAgent: "보안 가드레일 특화 에이전트",
      cmtMcp: "MCP (Model Context Protocol) 설정",
      cmtAgentsMd: "전역 규칙 및 아키텍처 규칙",
      skillDescription: "빌드 검증 후 한국어 커밋 메시지로 main 브랜치 자동 배포",
      skillStep2: "간결한 한국어 커밋 메시지를 컨벤션(feat/fix/chore)에 맞춰 작성한다."
    },
    en: {
      badge: "2026 AI AGENTIC ARCHITECTURE MASTER GUIDE",
      titleMain: "AI Agent Teams & Sub-agents",
      titleSub: "Hands-on Tutorial & Tool Comparison Guide",
      description: "Stop wasting time switching tabs and copying/pasting between AI windows. Hands-on practical guide for Claude Code (Agent Teams, Sub-agents, Skills, MCP), Google Antigravity, Cursor, AutoGen 0.4, and CrewAI.",
      tabs: [
        { id: 'claude_team', title: '🤖 Tutorial 1: Claude Agent Teams & Sub-agents', desc: 'Agent Teams, Sub-agents, Skills, MCP' },
        { id: 'antigravity', title: '🌌 Tutorial 2: Google Antigravity & Directives', desc: 'DeepMind Agentic Skills & directives.yaml' },
        { id: 'cursor', title: '💻 Tutorial 3: Cursor & Cascade Rules', desc: '.cursorrules & Extension Plugins' },
        { id: 'frameworks', title: '⚙️ Tutorial 4: AutoGen 0.4 & CrewAI', desc: 'Python Multi-Agent Code' },
        { id: 'comparison', title: '📊 Top 5 AI Agent Tools Comparison', desc: 'Features, Skills, Pricing, Guardrails' },
        { id: 'troubleshoot', title: '🛡️ Security & Troubleshooting Guide', desc: 'Prompt Injection, OOM, Retry' }
      ],
      t1Badge: "Tutorial 1 — Claude Code ecosystem",
      t1Title: "Claude Code: a complete guide to Agent Teams, sub-agents, Skills and MCP",
      t1Desc: "Beyond one-on-one chat with a single LLM: a leader agent delegates work to specialist sub-agents, then finishes the precise work with custom skills (SKILL.md) and an MCP knowledge graph.",
      flow1: "Parse the request & plan",
      flow2: "Delegate to sub-agents",
      flow3: "Run Skills & MCP",
      flow3Sub: "SKILL.md & knowledge graph",
      flow4: "Verify the final result",
      flow4Sub: "Automated build & Git deploy",
      step1Title: "Exercise 1. Set up the project folder structure (.claude/ and .agents/)",
      step1Desc: "Create the structure below at the project root to hold your sub-agent briefs and custom skills.",
      copyTree: "Copy the directory command",
      step2Title: "Exercise 2. Write .claude/skills/deploy_production/SKILL.md",
      step2Desc: "Use the YAML front matter (name, description) to state when the skill runs and what it should do.",
      copyDone: "Copied",
      copySkill: "Copy the skill code",
      step3Title: "Exercise 3. Connect an MCP (Model Context Protocol) knowledge graph",
      step3Desc: "Register the codebase-memory-mcp server to analyze the codebase knowledge graph.",
      copyLabel: "Copy",
      t2Badge: "Tutorial 2 — Google Antigravity & Gemini",
      t2Title: "Google Antigravity: autonomous reasoning agents & directive binding",
      t2Desc: "Google DeepMind’s Antigravity agent hooks into a multimodal viewer and knowledge graph, debugging autonomously along the guidelines in directives.yaml.",
      t2Step: "Exercise: binding .antigravity/directives.yaml",
      copyDirectives: "Copy the directives.yaml code",
      t3Badge: "Tutorial 3 — Cursor & Cascade Rules",
      t3Title: "Cursor IDE: Composer & defining skills in .cursorrules",
      t3Desc: "Configure the .cursorrules file that Cursor IDE’s Composer reads, to apply AI guardrails.",
      t3Step: "Exercise code for the .cursorrules file",
      copyCursor: "Copy .cursorrules",
      t4Badge: "Tutorial 4 — AutoGen 0.4 & CrewAI",
      t4Title: "AutoGen 0.4 & CrewAI: building multi-agent systems in Python",
      t4Desc: "A worked example of wiring a message bus between a manager agent and worker agents in a Python backend.",
      t4Step: "AutoGen 0.4 multi-agent Python example",
      copyPython: "Copy the Python code",
      cmpBadge: "Comparison report",
      cmpTitle: "Spec comparison of the top 5 AI agent tools",
      cmpDesc: "Compares Claude Code, Antigravity, Cursor, Devin and AutoGen on agent teams, sub-agent support, Skills/MCP extensibility and pricing.",
      colTool: "Tool",
      colTeams: "Agent teams",
      colSub: "Sub-agent support",
      colSkills: "Skills (SKILL.md) & MCP",
      colGuard: "Security guardrails",
      colCost: "Cost / plan",
      valFullLeader: "✅ Full support (leader/worker)",
      valSubagents: "✅ Supported via .claude/subagents/",
      valHitl: "Human-in-the-loop approval",
      valTokenBased: "Scales with API token usage",
      valFullDeepmind: "✅ Full support (DeepMind agent)",
      valDirectives: "✅ Sub-binding via directives.yaml",
      valFreeGcp: "Free / Google Cloud credits",
      valComposerOnly: "⚠️ Composer-level only",
      valNeedsPlugin: "⚠️ Requires an extension",
      valPro20: "$20/month (Pro)",
      valFullPySdk: "✅ Full support (Python SDK)",
      valSelector: "✅ SelectorGroupChat supported",
      valPyFuncCall: "⚠️ Via Python function calls",
      valCustomGuard: "Custom code guardrails",
      valOssFree: "Open source (free)",
      valAutonomous: "✅ Fully autonomous serving",
      valSandbox: "✅ Autonomous sub-sandboxes",
      valRooMcp: "✅ Roo Code MCP supported",
      valAcu: "$500/month, billed in ACUs",
      secBadge: "Security & troubleshooting",
      secTitle: "Security guardrails (prompt-injection defense) & troubleshooting guide",
      secDesc: "Guidelines for keeping agents inside their permissions, fixing OOM on 512 MB servers, and configuring backoff retries.",
      sec1Title: "1. Prompt injection & privilege escape",
      sec1a: "Never hardcode secrets (API keys, admin passwords) — keep them in .env",
      sec1b: "Put a human-in-the-loop approval step in front of destructive DB operations and external deploys",
      sec1c: "Scope sub-agent file writes to ./src/",
      sec2Title: "2. OOM kills & DB deadlocks",
      sec2a: "On 512 MB hosts such as Render, delay heavy startup batches (asyncio.sleep(60))",
      sec2b: "Use generators and chunked batches for large data",
      sec2c: "Add exponential-backoff retries for dropped DB connections",
      cmtSkills: "Custom skill modules",
      cmtDeploySkill: "Deployment automation skill",
      cmtSecSkill: "OWASP security review skill",
      cmtSubagents: "Sub-agent briefs",
      cmtBugAgent: "Agent specialized in debugging",
      cmtSecAgent: "Agent specialized in security guardrails",
      cmtMcp: "MCP (Model Context Protocol) config",
      cmtAgentsMd: "Global rules and architecture conventions",
      skillDescription: "Verify the build, then auto-deploy to main with a conventional commit message",
      skillStep2: "Write a concise commit message following the convention (feat/fix/chore)."
    },
    ja: {
      badge: "2026 AI AGENTIC ARCHITECTURE MASTER GUIDE",
      titleMain: "AI エージェントチーム & サブエージェント",
      titleSub: "実践チュートリアル & ツール別比較ガイド",
      description: "タブ切り替えの無駄を排除し、Claude Code、Google Antigravity、Cursor、AutoGen、CrewAI などの最新 AI エージェント開発環境をスムーズに習得できる実践チュートリアルです。",
      tabs: [
        { id: 'claude_team', title: '🤖 チュートリアル 1: Claude エージェントチーム', desc: 'Agent Teams, Sub-agents, Skills, MCP' },
        { id: 'antigravity', title: '🌌 チュートリアル 2: Google Antigravity', desc: 'DeepMind Agentic Skills & directives.yaml' },
        { id: 'cursor', title: '💻 チュートリアル 3: Cursor & Cascade Rules', desc: '.cursorrules & Extension Plugins' },
        { id: 'frameworks', title: '⚙️ チュートリアル 4: AutoGen 0.4 & CrewAI', desc: 'Python マルチエージェントコード' },
        { id: 'comparison', title: '📊 Top 5 AI エージェントツール総合比較', desc: '機能、スキル、料金、セキュリティ' },
        { id: 'troubleshoot', title: '🛡️ セキュリティ & トラブルシューティング', desc: 'Prompt Injection 防御、OOM、Retry' }
      ],
      t1Badge: "チュートリアル1 — Claude Code エコシステム",
      t1Title: "Claude Code: エージェントチーム・サブエージェント・スキル・MCP 総合ガイド",
      t1Desc: "単一LLMとの1対1の対話を超え、リーダーエージェントが専門サブエージェントに作業を委任し、カスタムスキル(SKILL.md)とMCPナレッジグラフで精密な作業を完遂する最新アーキテクチャです。",
      flow1: "ユーザー要求の解析と計画",
      flow2: "サブエージェントへ委任",
      flow3: "スキルとMCPの実行",
      flow3Sub: "SKILL.md とナレッジグラフ",
      flow4: "最終結果の検証",
      flow4Sub: "自動ビルドとGitデプロイ",
      step1Title: "演習1. プロジェクトのフォルダ構成を作る (.claude/ と .agents/)",
      step1Desc: "プロジェクトルートに以下の構成を作り、サブエージェントの指示書とカスタムスキルを配置します。",
      copyTree: "ディレクトリ作成コマンドをコピー",
      step2Title: "演習2. .claude/skills/deploy_production/SKILL.md を書く",
      step2Desc: "YAMLフロントマター(name, description)でスキルの実行条件と指示を記述します。",
      copyDone: "コピーしました",
      copySkill: "スキルコードをコピー",
      step3Title: "演習3. MCP (Model Context Protocol) ナレッジグラフの接続",
      step3Desc: "コードベースのナレッジグラフ解析のため codebase-memory-mcp サーバーを登録します。",
      copyLabel: "コピー",
      t2Badge: "チュートリアル2 — Google Antigravity & Gemini",
      t2Title: "Google Antigravity: 自律推論エージェントと Directives バインディング",
      t2Desc: "Google DeepMind の Antigravity エージェントはマルチモーダルビューアとナレッジグラフに接続し、directives.yaml のガイドラインに従って自律的にデバッグします。",
      t2Step: "演習: .antigravity/directives.yaml のバインディング",
      copyDirectives: "directives.yaml のコードをコピー",
      t3Badge: "チュートリアル3 — Cursor & Cascade Rules",
      t3Title: "Cursor IDE: Composer と .cursorrules によるスキル定義",
      t3Desc: "Cursor IDE の Composer が読み込む .cursorrules を設定し、AI ガードレールを適用します。",
      t3Step: ".cursorrules ファイルの演習コード",
      copyCursor: ".cursorrules をコピー",
      t4Badge: "チュートリアル4 — AutoGen 0.4 & CrewAI",
      t4Title: "AutoGen 0.4 & CrewAI: Python によるマルチエージェント構築",
      t4Desc: "Python バックエンドで Manager Agent と Worker Agent の間にメッセージバスを接続する実践例です。",
      t4Step: "AutoGen 0.4 マルチエージェント Python 実践例",
      copyPython: "Python コードをコピー",
      cmpBadge: "総合比較レポート",
      cmpTitle: "主要AIエージェントツール5製品の仕様比較表",
      cmpDesc: "Claude Code・Antigravity・Cursor・Devin・AutoGen を、エージェントチーム、サブエージェント対応、スキル/MCP 拡張性、費用構造で比較します。",
      colTool: "ツール名",
      colTeams: "エージェントチーム",
      colSub: "サブエージェント対応",
      colSkills: "スキル(SKILL.md) と MCP",
      colGuard: "セキュリティ ガードレール",
      colCost: "費用 / 料金プラン",
      valFullLeader: "✅ 完全対応 (Leader/Worker)",
      valSubagents: "✅ .claude/subagents/ に対応",
      valHitl: "Human-in-the-Loop 承認",
      valTokenBased: "APIトークン使用量に比例",
      valFullDeepmind: "✅ 完全対応 (DeepMind Agent)",
      valDirectives: "✅ directives.yaml でのサブバインディング",
      valFreeGcp: "無料 / Google Cloud クレジット",
      valComposerOnly: "⚠️ Composer 単位のみ対応",
      valNeedsPlugin: "⚠️ 拡張プラグインが必要",
      valPro20: "月額 $20 (Pro)",
      valFullPySdk: "✅ 完全対応 (Python SDK)",
      valSelector: "✅ SelectorGroupChat に対応",
      valPyFuncCall: "⚠️ Python Function Call 経由",
      valCustomGuard: "カスタムコードのガードレール",
      valOssFree: "オープンソース (無料)",
      valAutonomous: "✅ 独立した自律実行",
      valSandbox: "✅ 自律サブサンドボックス",
      valRooMcp: "✅ Roo Code MCP に対応",
      valAcu: "月額 $500 / ACU 消費",
      secBadge: "セキュリティとトラブルシューティング",
      secTitle: "セキュリティ ガードレール(プロンプトインジェクション対策)とトラブルシューティング",
      secDesc: "エージェントの権限逸脱防止、512MB RAM サーバーでの OOM 対処、バックオフ再試行の設定指針です。",
      sec1Title: "1. プロンプトインジェクションと権限逸脱の防止",
      sec1a: "機密情報(APIキー、管理者パスワード)はハードコード禁止。.env で管理する",
      sec1b: "重要なDB削除や外部デプロイの前に Human-in-the-Loop の承認ステップを置く",
      sec1c: "サブエージェントのファイル書き込み範囲を ./src/ に限定する",
      sec2Title: "2. OOM Kill と DB デッドロックの対処",
      sec2a: "Render など 512MB RAM 環境では、重い起動時バッチを遅延実行する (asyncio.sleep(60))",
      sec2b: "大量データ処理ではジェネレータとチャンク分割を必須にする",
      sec2c: "DB接続断に備え、指数バックオフの自動リトライを実装する",
      cmtSkills: "カスタムスキル モジュール",
      cmtDeploySkill: "デプロイ自動化スキルの定義",
      cmtSecSkill: "OWASP セキュリティ検査スキル",
      cmtSubagents: "専門サブエージェントの指示書",
      cmtBugAgent: "バグ修正に特化したエージェント",
      cmtSecAgent: "セキュリティ ガードレール特化エージェント",
      cmtMcp: "MCP (Model Context Protocol) 設定",
      cmtAgentsMd: "グローバルルールとアーキテクチャ規約",
      skillDescription: "ビルド検証後、規約に沿ったコミットメッセージで main ブランチへ自動デプロイ",
      skillStep2: "規約(feat/fix/chore)に沿った簡潔なコミットメッセージを書く。"
    },
    zh: {
      badge: "2026 AI AGENTIC ARCHITECTURE MASTER GUIDE",
      titleMain: "AI 智能体团队与子智能体",
      titleSub: "实操教程与工具综合对比指南",
      description: "告别在 6 个标签页和 AI 窗口之间频繁复制粘贴的低效模式。涵盖 Claude Code、Google Antigravity、Cursor、AutoGen 0.4 和 CrewAI 的全方位实操指南。",
      tabs: [
        { id: 'claude_team', title: '🤖 教程 1: Claude 智能体团队与子智能体', desc: 'Agent Teams, Sub-agents, Skills, MCP' },
        { id: 'antigravity', title: '🌌 教程 2: Google Antigravity & Directives', desc: 'DeepMind Agentic Skills & directives.yaml' },
        { id: 'cursor', title: '💻 教程 3: Cursor & Cascade Rules', desc: '.cursorrules & Extension Plugins' },
        { id: 'frameworks', title: '⚙️ 教程 4: AutoGen 0.4 & CrewAI', desc: 'Python 多智能体代码' },
        { id: 'comparison', title: '📊 Top 5 AI 智能体工具综合对比', desc: '功能、技能支持、资费、安全护栏' },
        { id: 'troubleshoot', title: '🛡️ 安全与排错指南', desc: 'Prompt Injection 防御、OOM、重试' }
      ],
      t1Badge: "教程 1 — Claude Code 生态",
      t1Title: "Claude Code：智能体团队、子智能体、Skills 与 MCP 综合指南",
      t1Desc: "超越与单个 LLM 的一对一对话：主协调智能体将任务分派给专业子智能体，再借助自定义 Skills(SKILL.md) 与 MCP 知识图谱完成精细工作。",
      flow1: "解析用户请求并规划",
      flow2: "分派给子智能体",
      flow3: "执行 Skills 与 MCP",
      flow3Sub: "SKILL.md 与知识图谱",
      flow4: "验证最终结果",
      flow4Sub: "自动构建与 Git 部署",
      step1Title: "练习 1. 搭建项目目录结构（.claude/ 与 .agents/）",
      step1Desc: "在项目根目录创建以下结构，用于放置子智能体说明与自定义 Skills。",
      copyTree: "复制目录创建命令",
      step2Title: "练习 2. 编写 .claude/skills/deploy_production/SKILL.md",
      step2Desc: "用 YAML 前置元数据（name、description）声明 Skill 的触发条件与执行指令。",
      copyDone: "已复制",
      copySkill: "复制 Skill 代码",
      step3Title: "练习 3. 接入 MCP（Model Context Protocol）知识图谱",
      step3Desc: "注册 codebase-memory-mcp 服务器以分析代码库知识图谱。",
      copyLabel: "复制",
      t2Badge: "教程 2 — Google Antigravity 与 Gemini",
      t2Title: "Google Antigravity：自主推理智能体与 Directives 绑定",
      t2Desc: "Google DeepMind 的 Antigravity 智能体接入多模态查看器与知识图谱，依照 directives.yaml 的准则自主调试。",
      t2Step: "练习：绑定 .antigravity/directives.yaml",
      copyDirectives: "复制 directives.yaml 代码",
      t3Badge: "教程 3 — Cursor 与 Cascade Rules",
      t3Title: "Cursor IDE：Composer 与 .cursorrules 技能定义",
      t3Desc: "配置 Cursor IDE 的 Composer 所读取的 .cursorrules 文件，以施加 AI 护栏。",
      t3Step: ".cursorrules 文件练习代码",
      copyCursor: "复制 .cursorrules",
      t4Badge: "教程 4 — AutoGen 0.4 与 CrewAI",
      t4Title: "AutoGen 0.4 与 CrewAI：用 Python 构建多智能体系统",
      t4Desc: "在 Python 后端中为管理智能体与工作智能体接入消息总线的实操示例。",
      t4Step: "AutoGen 0.4 多智能体 Python 示例",
      copyPython: "复制 Python 代码",
      cmpBadge: "综合比较报告",
      cmpTitle: "五大 AI 智能体工具规格对比表",
      cmpDesc: "对比 Claude Code、Antigravity、Cursor、Devin 与 AutoGen 在智能体团队、子智能体支持、Skills/MCP 扩展性与费用结构上的差异。",
      colTool: "工具",
      colTeams: "智能体团队",
      colSub: "子智能体支持",
      colSkills: "Skills (SKILL.md) 与 MCP",
      colGuard: "安全护栏",
      colCost: "费用 / 定价",
      valFullLeader: "✅ 完整支持（Leader/Worker）",
      valSubagents: "✅ 支持 .claude/subagents/",
      valHitl: "人工在环审批",
      valTokenBased: "按 API token 用量计费",
      valFullDeepmind: "✅ 完整支持（DeepMind Agent）",
      valDirectives: "✅ 通过 directives.yaml 子绑定",
      valFreeGcp: "免费 / Google Cloud 额度",
      valComposerOnly: "⚠️ 仅 Composer 层面支持",
      valNeedsPlugin: "⚠️ 需要扩展插件",
      valPro20: "每月 $20（Pro）",
      valFullPySdk: "✅ 完整支持（Python SDK）",
      valSelector: "✅ 支持 SelectorGroupChat",
      valPyFuncCall: "⚠️ 通过 Python 函数调用",
      valCustomGuard: "自定义代码护栏",
      valOssFree: "开源（免费）",
      valAutonomous: "✅ 独立自主运行",
      valSandbox: "✅ 自主子沙箱",
      valRooMcp: "✅ 支持 Roo Code MCP",
      valAcu: "每月 $500 / 按 ACU 扣除",
      secBadge: "安全与故障排查",
      secTitle: "安全护栏（防提示注入）与故障排查指南",
      secDesc: "关于限制智能体权限、解决 512MB 内存服务器 OOM 以及配置退避重试的指南。",
      sec1Title: "1. 提示注入与越权防护",
      sec1a: "绝不硬编码敏感信息（API 密钥、管理员密码），改用 .env 管理",
      sec1b: "在破坏性数据库操作与对外部署前设置人工审批环节",
      sec1c: "将子智能体的文件写入范围限定在 ./src/",
      sec2Title: "2. OOM 终止与数据库死锁排查",
      sec2a: "在 Render 等 512MB 内存环境中，延迟执行启动时的重批处理（asyncio.sleep(60)）",
      sec2b: "处理大数据时必须使用生成器模式与分块批处理",
      sec2c: "为数据库连接中断加入指数退避自动重试",
      cmtSkills: "自定义 Skill 模块",
      cmtDeploySkill: "部署自动化 Skill 定义",
      cmtSecSkill: "OWASP 安全检查 Skill",
      cmtSubagents: "专业子智能体说明",
      cmtBugAgent: "专注调试修复的智能体",
      cmtSecAgent: "专注安全护栏的智能体",
      cmtMcp: "MCP（Model Context Protocol）配置",
      cmtAgentsMd: "全局规则与架构约定",
      skillDescription: "构建校验通过后，以规范提交信息自动部署到 main 分支",
      skillStep2: "按照约定（feat/fix/chore）编写简洁的提交信息。"
    },
    es: {
      badge: "2026 AI AGENTIC ARCHITECTURE MASTER GUIDE",
      titleMain: "Equipos de Agentes de IA y Subagentes",
      titleSub: "Tutorial Práctico y Guía Comparativa",
      description: "Elimine la pérdida de tiempo al alternar entre pestañas. Guía práctica para Claude Code, Google Antigravity, Cursor, AutoGen 0.4 y CrewAI.",
      tabs: [
        { id: 'claude_team', title: '🤖 Tutorial 1: Equipos de Agentes Claude', desc: 'Agent Teams, Sub-agents, Skills, MCP' },
        { id: 'antigravity', title: '🌌 Tutorial 2: Google Antigravity', desc: 'DeepMind Agentic Skills & directives.yaml' },
        { id: 'cursor', title: '💻 Tutorial 3: Cursor & Cascade Rules', desc: '.cursorrules & Extension Plugins' },
        { id: 'frameworks', title: '⚙️ Tutorial 4: AutoGen 0.4 & CrewAI', desc: 'Código Multi-Agente en Python' },
        { id: 'comparison', title: '📊 Comparación de 5 Herramientas Principales', desc: 'Funciones, Habilidades, Precios' },
        { id: 'troubleshoot', title: '🛡️ Seguridad y Solución de Problemas', desc: 'Prompt Injection, OOM, Reintentos' }
      ],
      t1Badge: "Tutorial 1 — Ecosistema de Claude Code",
      t1Title: "Claude Code: guía completa de Agent Teams, sub-agentes, Skills y MCP",
      t1Desc: "Más allá del chat uno a uno con un solo LLM: un agente líder delega el trabajo en sub-agentes especializados y lo remata con skills propias (SKILL.md) y un grafo de conocimiento MCP.",
      flow1: "Analizar la petición y planificar",
      flow2: "Delegar en sub-agentes",
      flow3: "Ejecutar Skills y MCP",
      flow3Sub: "SKILL.md y grafo de conocimiento",
      flow4: "Verificar el resultado final",
      flow4Sub: "Compilación automática y despliegue con Git",
      step1Title: "Ejercicio 1. Crear la estructura de carpetas (.claude/ y .agents/)",
      step1Desc: "Crea la estructura siguiente en la raíz del proyecto para alojar las instrucciones de los sub-agentes y tus skills.",
      copyTree: "Copiar el comando de directorios",
      step2Title: "Ejercicio 2. Escribir .claude/skills/deploy_production/SKILL.md",
      step2Desc: "Usa el front matter YAML (name, description) para indicar cuándo se ejecuta la skill y qué debe hacer.",
      copyDone: "Copiado",
      copySkill: "Copiar el código de la skill",
      step3Title: "Ejercicio 3. Conectar un grafo de conocimiento MCP (Model Context Protocol)",
      step3Desc: "Registra el servidor codebase-memory-mcp para analizar el grafo de conocimiento del código.",
      copyLabel: "Copiar",
      t2Badge: "Tutorial 2 — Google Antigravity y Gemini",
      t2Title: "Google Antigravity: agentes de razonamiento autónomo y vinculación de directivas",
      t2Desc: "El agente Antigravity de Google DeepMind se conecta a un visor multimodal y a un grafo de conocimiento, y depura de forma autónoma siguiendo las pautas de directives.yaml.",
      t2Step: "Ejercicio: vincular .antigravity/directives.yaml",
      copyDirectives: "Copiar el código de directives.yaml",
      t3Badge: "Tutorial 3 — Cursor y Cascade Rules",
      t3Title: "Cursor IDE: Composer y definición de skills en .cursorrules",
      t3Desc: "Configura el archivo .cursorrules que lee Composer de Cursor IDE para aplicar guardarraíles de IA.",
      t3Step: "Código de ejercicio para el archivo .cursorrules",
      copyCursor: "Copiar .cursorrules",
      t4Badge: "Tutorial 4 — AutoGen 0.4 y CrewAI",
      t4Title: "AutoGen 0.4 y CrewAI: construir sistemas multiagente en Python",
      t4Desc: "Un ejemplo práctico de conexión de un bus de mensajes entre un agente gestor y agentes trabajadores en un backend Python.",
      t4Step: "Ejemplo multiagente en Python con AutoGen 0.4",
      copyPython: "Copiar el código Python",
      cmpBadge: "Informe comparativo",
      cmpTitle: "Comparativa de especificaciones de las 5 principales herramientas de agentes IA",
      cmpDesc: "Compara Claude Code, Antigravity, Cursor, Devin y AutoGen en equipos de agentes, soporte de sub-agentes, extensibilidad Skills/MCP y precios.",
      colTool: "Herramienta",
      colTeams: "Equipos de agentes",
      colSub: "Soporte de sub-agentes",
      colSkills: "Skills (SKILL.md) y MCP",
      colGuard: "Guardarraíles de seguridad",
      colCost: "Coste / plan",
      valFullLeader: "✅ Compatible por completo (líder/trabajador)",
      valSubagents: "✅ Compatible vía .claude/subagents/",
      valHitl: "Aprobación con humano en el bucle",
      valTokenBased: "Proporcional al uso de tokens de API",
      valFullDeepmind: "✅ Compatible por completo (agente DeepMind)",
      valDirectives: "✅ Sub-vinculación vía directives.yaml",
      valFreeGcp: "Gratis / créditos de Google Cloud",
      valComposerOnly: "⚠️ Solo a nivel de Composer",
      valNeedsPlugin: "⚠️ Requiere una extensión",
      valPro20: "20 $/mes (Pro)",
      valFullPySdk: "✅ Compatible por completo (SDK de Python)",
      valSelector: "✅ SelectorGroupChat compatible",
      valPyFuncCall: "⚠️ Mediante llamadas de función de Python",
      valCustomGuard: "Guardarraíles de código propios",
      valOssFree: "Código abierto (gratis)",
      valAutonomous: "✅ Ejecución autónoma independiente",
      valSandbox: "✅ Sub-sandboxes autónomos",
      valRooMcp: "✅ Roo Code MCP compatible",
      valAcu: "500 $/mes, facturado en ACU",
      secBadge: "Seguridad y resolución de problemas",
      secTitle: "Guardarraíles de seguridad (defensa ante inyección de prompts) y guía de resolución de problemas",
      secDesc: "Pautas para mantener a los agentes dentro de sus permisos, resolver OOM en servidores de 512 MB y configurar reintentos con backoff.",
      sec1Title: "1. Inyección de prompts y escalada de privilegios",
      sec1a: "Nunca codifiques secretos (claves de API, contraseñas de admin): guárdalos en .env",
      sec1b: "Coloca una aprobación con humano en el bucle antes de operaciones destructivas de BD y despliegues externos",
      sec1c: "Limita la escritura de archivos de los sub-agentes a ./src/",
      sec2Title: "2. OOM y bloqueos de base de datos",
      sec2a: "En hosts de 512 MB como Render, retrasa los lotes pesados de arranque (asyncio.sleep(60))",
      sec2b: "Usa generadores y lotes por bloques para grandes volúmenes de datos",
      sec2c: "Añade reintentos con backoff exponencial ante caídas de conexión a la BD",
      cmtSkills: "Módulos de skills propios",
      cmtDeploySkill: "Skill de automatización de despliegue",
      cmtSecSkill: "Skill de revisión de seguridad OWASP",
      cmtSubagents: "Instrucciones de sub-agentes",
      cmtBugAgent: "Agente especializado en depuración",
      cmtSecAgent: "Agente especializado en guardarraíles de seguridad",
      cmtMcp: "Configuración de MCP (Model Context Protocol)",
      cmtAgentsMd: "Reglas globales y convenciones de arquitectura",
      skillDescription: "Verifica la compilación y despliega automáticamente en main con un mensaje de commit convencional",
      skillStep2: "Escribe un mensaje de commit conciso siguiendo la convención (feat/fix/chore)."
    },
    de: {
      badge: "2026 AI AGENTIC ARCHITECTURE MASTER GUIDE",
      titleMain: "KI-Agenten-Teams & Sub-Agenten",
      titleSub: "Praxis-Tutorial & Werkzeug-Vergleich",
      description: "Schluss mit dem Kopieren und Einfügen zwischen Registerkarten. Praktisches Tutorial für Claude Code, Google Antigravity, Cursor, AutoGen 0.4 und CrewAI.",
      tabs: [
        { id: 'claude_team', title: '🤖 Tutorial 1: Claude Agenten-Teams', desc: 'Agent Teams, Sub-agents, Skills, MCP' },
        { id: 'antigravity', title: '🌌 Tutorial 2: Google Antigravity', desc: 'DeepMind Agentic Skills & directives.yaml' },
        { id: 'cursor', title: '💻 Tutorial 3: Cursor & Cascade Rules', desc: '.cursorrules & Extension Plugins' },
        { id: 'frameworks', title: '⚙️ Tutorial 4: AutoGen 0.4 & CrewAI', desc: 'Python Multi-Agenten-Code' },
        { id: 'comparison', title: '📊 Vergleich der Top 5 KI-Agenten-Tools', desc: 'Funktionen, Skills, Preise, Schutz' },
        { id: 'troubleshoot', title: '🛡️ Sicherheit & Fehlerbehebung', desc: 'Prompt Injection, OOM, Retry' }
      ],
      t1Badge: "Tutorial 1 – Claude-Code-Ökosystem",
      t1Title: "Claude Code: Vollständiger Leitfaden zu Agent Teams, Sub-Agents, Skills und MCP",
      t1Desc: "Mehr als ein Eins-zu-eins-Chat mit einem einzelnen LLM: Ein Leader-Agent delegiert Aufgaben an spezialisierte Sub-Agents und erledigt die Feinarbeit mit eigenen Skills (SKILL.md) und einem MCP-Wissensgraphen.",
      flow1: "Anfrage parsen & planen",
      flow2: "An Sub-Agents delegieren",
      flow3: "Skills & MCP ausführen",
      flow3Sub: "SKILL.md & Wissensgraph",
      flow4: "Endergebnis verifizieren",
      flow4Sub: "Automatischer Build & Git-Deploy",
      step1Title: "Übung 1. Projektordnerstruktur anlegen (.claude/ und .agents/)",
      step1Desc: "Legen Sie die folgende Struktur im Projektstamm an, um Sub-Agent-Briefings und eigene Skills abzulegen.",
      copyTree: "Verzeichnisbefehl kopieren",
      step2Title: "Übung 2. .claude/skills/deploy_production/SKILL.md schreiben",
      step2Desc: "Beschreiben Sie im YAML-Frontmatter (name, description), wann der Skill läuft und was er tun soll.",
      copyDone: "Kopiert",
      copySkill: "Skill-Code kopieren",
      step3Title: "Übung 3. MCP-Wissensgraph (Model Context Protocol) anbinden",
      step3Desc: "Registrieren Sie den Server codebase-memory-mcp, um den Wissensgraphen der Codebasis zu analysieren.",
      copyLabel: "Kopieren",
      t2Badge: "Tutorial 2 – Google Antigravity & Gemini",
      t2Title: "Google Antigravity: Autonome Reasoning-Agenten & Directive-Bindung",
      t2Desc: "Der Antigravity-Agent von Google DeepMind koppelt sich an einen multimodalen Viewer und einen Wissensgraphen und debuggt autonom nach den Vorgaben in directives.yaml.",
      t2Step: "Übung: .antigravity/directives.yaml binden",
      copyDirectives: "directives.yaml-Code kopieren",
      t3Badge: "Tutorial 3 – Cursor & Cascade Rules",
      t3Title: "Cursor IDE: Composer & Skill-Definition in .cursorrules",
      t3Desc: "Konfigurieren Sie die Datei .cursorrules, die der Composer von Cursor IDE liest, um KI-Leitplanken zu setzen.",
      t3Step: "Übungscode für die Datei .cursorrules",
      copyCursor: ".cursorrules kopieren",
      t4Badge: "Tutorial 4 – AutoGen 0.4 & CrewAI",
      t4Title: "AutoGen 0.4 & CrewAI: Multi-Agenten-Systeme in Python bauen",
      t4Desc: "Ein durchgearbeitetes Beispiel für einen Message-Bus zwischen Manager- und Worker-Agent in einem Python-Backend.",
      t4Step: "AutoGen-0.4-Multi-Agenten-Beispiel in Python",
      copyPython: "Python-Code kopieren",
      cmpBadge: "Vergleichsbericht",
      cmpTitle: "Spezifikationsvergleich der fünf wichtigsten KI-Agenten-Tools",
      cmpDesc: "Vergleicht Claude Code, Antigravity, Cursor, Devin und AutoGen hinsichtlich Agent Teams, Sub-Agent-Unterstützung, Skills/MCP-Erweiterbarkeit und Kosten.",
      colTool: "Tool",
      colTeams: "Agent Teams",
      colSub: "Sub-Agent-Unterstützung",
      colSkills: "Skills (SKILL.md) & MCP",
      colGuard: "Sicherheits-Leitplanken",
      colCost: "Kosten / Tarif",
      valFullLeader: "✅ Vollständig unterstützt (Leader/Worker)",
      valSubagents: "✅ Unterstützt über .claude/subagents/",
      valHitl: "Human-in-the-Loop-Freigabe",
      valTokenBased: "Abhängig vom API-Token-Verbrauch",
      valFullDeepmind: "✅ Vollständig unterstützt (DeepMind Agent)",
      valDirectives: "✅ Sub-Bindung über directives.yaml",
      valFreeGcp: "Kostenlos / Google-Cloud-Guthaben",
      valComposerOnly: "⚠️ Nur auf Composer-Ebene",
      valNeedsPlugin: "⚠️ Erweiterung erforderlich",
      valPro20: "20 $/Monat (Pro)",
      valFullPySdk: "✅ Vollständig unterstützt (Python-SDK)",
      valSelector: "✅ SelectorGroupChat unterstützt",
      valPyFuncCall: "⚠️ Über Python-Function-Calls",
      valCustomGuard: "Eigene Code-Leitplanken",
      valOssFree: "Open Source (kostenlos)",
      valAutonomous: "✅ Eigenständiger autonomer Betrieb",
      valSandbox: "✅ Autonome Sub-Sandboxes",
      valRooMcp: "✅ Roo Code MCP unterstützt",
      valAcu: "500 $/Monat, Abrechnung in ACUs",
      secBadge: "Sicherheit & Fehlerbehebung",
      secTitle: "Sicherheits-Leitplanken (Schutz vor Prompt Injection) & Fehlerbehebung",
      secDesc: "Leitlinien, um Agenten in ihren Berechtigungen zu halten, OOM auf 512-MB-Servern zu beheben und Backoff-Retries zu konfigurieren.",
      sec1Title: "1. Prompt Injection & Rechteausweitung",
      sec1a: "Geheimnisse (API-Schlüssel, Admin-Passwörter) niemals hartcodieren – in .env ablegen",
      sec1b: "Vor destruktiven DB-Operationen und externen Deployments einen Human-in-the-Loop-Freigabeschritt einbauen",
      sec1c: "Dateischreibzugriffe von Sub-Agents auf ./src/ beschränken",
      sec2Title: "2. OOM-Kills & DB-Deadlocks",
      sec2a: "Auf 512-MB-Hosts wie Render schwere Startup-Batches verzögern (asyncio.sleep(60))",
      sec2b: "Bei großen Datenmengen Generatoren und Chunk-Batches verwenden",
      sec2c: "Für abgebrochene DB-Verbindungen Retries mit exponentiellem Backoff ergänzen",
      cmtSkills: "Eigene Skill-Module",
      cmtDeploySkill: "Skill zur Deployment-Automatisierung",
      cmtSecSkill: "OWASP-Sicherheitsprüfungs-Skill",
      cmtSubagents: "Sub-Agent-Briefings",
      cmtBugAgent: "Auf Debugging spezialisierter Agent",
      cmtSecAgent: "Auf Sicherheits-Leitplanken spezialisierter Agent",
      cmtMcp: "MCP-Konfiguration (Model Context Protocol)",
      cmtAgentsMd: "Globale Regeln und Architekturkonventionen",
      skillDescription: "Build prüfen und anschließend mit einer konventionellen Commit-Nachricht automatisch auf main deployen",
      skillStep2: "Eine knappe Commit-Nachricht gemäß Konvention (feat/fix/chore) verfassen."
    },
    fr: {
      badge: "GUIDE DE RÉFÉRENCE — ARCHITECTURE AGENTIQUE IA 2026",
      titleMain: "Équipes d’agents IA et sous-agents",
      titleSub: "Tutoriel pratique et guide comparatif des outils",
      description: "Fini le temps perdu à changer d’onglet et à copier-coller entre les fenêtres d’IA. Guide pratique couvrant Claude Code (équipes d’agents, sous-agents, skills, MCP), Google Antigravity, Cursor, AutoGen 0.4 et CrewAI.",
      tabs: [
        { id: 'claude_team', title: '🤖 Tutoriel 1 : équipes d’agents et sous-agents Claude', desc: 'Agent Teams, sous-agents, Skills, MCP' },
        { id: 'antigravity', title: '🌌 Tutoriel 2 : Google Antigravity et Directives', desc: 'Skills agentiques DeepMind et directives.yaml' },
        { id: 'cursor', title: '💻 Tutoriel 3 : Cursor et Cascade Rules', desc: '.cursorrules et extensions' },
        { id: 'frameworks', title: '⚙️ Tutoriel 4 : AutoGen 0.4 et CrewAI', desc: 'Code multi-agents en Python' },
        { id: 'comparison', title: '📊 Comparatif des 5 principaux outils d’agents IA', desc: 'Fonctionnalités, skills, tarifs, garde-fous' },
        { id: 'troubleshoot', title: '🛡️ Guide sécurité et dépannage', desc: 'Injection de prompt, OOM, retry' }
      ],
      t1Badge: "Tutoriel 1 — Écosystème Claude Code",
      t1Title: "Claude Code : guide complet des Agent Teams, sous-agents, Skills et MCP",
      t1Desc: "Au-delà du dialogue en tête-à-tête avec un seul LLM : un agent principal délègue le travail à des sous-agents spécialisés, puis finalise avec des skills personnalisés (SKILL.md) et un graphe de connaissances MCP.",
      flow1: "Analyser la demande et planifier",
      flow2: "Déléguer aux sous-agents",
      flow3: "Exécuter Skills et MCP",
      flow3Sub: "SKILL.md et graphe de connaissances",
      flow4: "Vérifier le résultat final",
      flow4Sub: "Build automatisé et déploiement Git",
      step1Title: "Exercice 1. Créer la structure de dossiers (.claude/ et .agents/)",
      step1Desc: "Créez la structure ci-dessous à la racine du projet pour y placer les consignes des sous-agents et vos skills.",
      copyTree: "Copier la commande de création de dossiers",
      step2Title: "Exercice 2. Rédiger .claude/skills/deploy_production/SKILL.md",
      step2Desc: "Utilisez l’en-tête YAML (name, description) pour indiquer quand le skill s’exécute et ce qu’il doit faire.",
      copyDone: "Copié",
      copySkill: "Copier le code du skill",
      step3Title: "Exercice 3. Connecter un graphe de connaissances MCP (Model Context Protocol)",
      step3Desc: "Enregistrez le serveur codebase-memory-mcp pour analyser le graphe de connaissances du code.",
      copyLabel: "Copier",
      t2Badge: "Tutoriel 2 — Google Antigravity et Gemini",
      t2Title: "Google Antigravity : agents de raisonnement autonomes et liaison des directives",
      t2Desc: "L’agent Antigravity de Google DeepMind se connecte à un visualiseur multimodal et à un graphe de connaissances, et débogue de façon autonome selon les consignes de directives.yaml.",
      t2Step: "Exercice : lier .antigravity/directives.yaml",
      copyDirectives: "Copier le code directives.yaml",
      t3Badge: "Tutoriel 3 — Cursor et Cascade Rules",
      t3Title: "Cursor IDE : Composer et définition des skills dans .cursorrules",
      t3Desc: "Configurez le fichier .cursorrules lu par le Composer de Cursor IDE pour appliquer des garde-fous IA.",
      t3Step: "Code d’exercice pour le fichier .cursorrules",
      copyCursor: "Copier .cursorrules",
      t4Badge: "Tutoriel 4 — AutoGen 0.4 et CrewAI",
      t4Title: "AutoGen 0.4 et CrewAI : construire des systèmes multi-agents en Python",
      t4Desc: "Un exemple concret de bus de messages entre un agent gestionnaire et des agents exécutants dans un backend Python.",
      t4Step: "Exemple multi-agents en Python avec AutoGen 0.4",
      copyPython: "Copier le code Python",
      cmpBadge: "Rapport comparatif",
      cmpTitle: "Comparatif des spécifications des 5 principaux outils d’agents IA",
      cmpDesc: "Compare Claude Code, Antigravity, Cursor, Devin et AutoGen sur les équipes d’agents, la prise en charge des sous-agents, l’extensibilité Skills/MCP et les tarifs.",
      colTool: "Outil",
      colTeams: "Équipes d’agents",
      colSub: "Prise en charge des sous-agents",
      colSkills: "Skills (SKILL.md) et MCP",
      colGuard: "Garde-fous de sécurité",
      colCost: "Coût / forfait",
      valFullLeader: "✅ Prise en charge complète (leader/worker)",
      valSubagents: "✅ Pris en charge via .claude/subagents/",
      valHitl: "Validation avec humain dans la boucle",
      valTokenBased: "Proportionnel à la consommation de tokens API",
      valFullDeepmind: "✅ Prise en charge complète (agent DeepMind)",
      valDirectives: "✅ Sous-liaison via directives.yaml",
      valFreeGcp: "Gratuit / crédits Google Cloud",
      valComposerOnly: "⚠️ Uniquement au niveau du Composer",
      valNeedsPlugin: "⚠️ Nécessite une extension",
      valPro20: "20 $/mois (Pro)",
      valFullPySdk: "✅ Prise en charge complète (SDK Python)",
      valSelector: "✅ SelectorGroupChat pris en charge",
      valPyFuncCall: "⚠️ Via des appels de fonction Python",
      valCustomGuard: "Garde-fous codés sur mesure",
      valOssFree: "Open source (gratuit)",
      valAutonomous: "✅ Exécution autonome indépendante",
      valSandbox: "✅ Sous-bacs à sable autonomes",
      valRooMcp: "✅ Roo Code MCP pris en charge",
      valAcu: "500 $/mois, facturé en ACU",
      secBadge: "Sécurité et dépannage",
      secTitle: "Garde-fous de sécurité (défense contre l’injection de prompt) et guide de dépannage",
      secDesc: "Consignes pour maintenir les agents dans leurs permissions, corriger les OOM sur serveurs 512 Mo et configurer les relances avec backoff.",
      sec1Title: "1. Injection de prompt et élévation de privilèges",
      sec1a: "Ne codez jamais en dur les secrets (clés d’API, mots de passe admin) — placez-les dans .env",
      sec1b: "Placez une validation humaine avant les opérations destructrices en base et les déploiements externes",
      sec1c: "Limitez les écritures de fichiers des sous-agents à ./src/",
      sec2Title: "2. OOM et interblocages de base de données",
      sec2a: "Sur des hôtes 512 Mo comme Render, différez les lots lourds au démarrage (asyncio.sleep(60))",
      sec2b: "Utilisez des générateurs et des lots découpés pour les gros volumes de données",
      sec2c: "Ajoutez des relances à backoff exponentiel en cas de perte de connexion à la base",
      cmtSkills: "Modules de skills personnalisés",
      cmtDeploySkill: "Skill d’automatisation du déploiement",
      cmtSecSkill: "Skill de revue de sécurité OWASP",
      cmtSubagents: "Consignes des sous-agents",
      cmtBugAgent: "Agent spécialisé dans le débogage",
      cmtSecAgent: "Agent spécialisé dans les garde-fous de sécurité",
      cmtMcp: "Configuration MCP (Model Context Protocol)",
      cmtAgentsMd: "Règles globales et conventions d’architecture",
      skillDescription: "Vérifier le build, puis déployer automatiquement sur main avec un message de commit conventionnel",
      skillStep2: "Rédiger un message de commit concis conforme à la convention (feat/fix/chore)."
    }
  };

  const t = I18N_TUTORIAL[language as keyof typeof I18N_TUTORIAL] || I18N_TUTORIAL.en;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Premium Hero Banner */}
      <div className="surface-tint relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/30 p-8 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" /> {t.badge}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {t.titleMain} <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              {t.titleSub}
            </span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-medium max-w-3xl">
            {t.description}
          </p>
        </div>
      </div>

      {/* Main Category Tabs */}
      <div className="flex bg-slate-100 dark:bg-slate-900/90 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-x-auto scrollbar-none gap-1.5">
        {t.tabs.map((tab: any) => {
          const isActive = activeCategory === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id as any)}
              className={`flex-1 min-w-[210px] text-left px-4 py-3 rounded-xl transition-all font-black text-xs flex flex-col gap-1 ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-muted hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800/40'
              }`}
            >
              <span className="text-sm font-black tracking-tight flex items-center gap-1.5">
                {isActive && <Sparkles className="w-3.5 h-3.5 text-amber-300" />}
                {tab.title}
              </span>
              <span className={`text-[11px] font-semibold ${isActive ? 'text-indigo-100' : 'text-muted'}`}>{tab.desc}</span>
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
                {t.t1Badge}
              </span>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-2 flex items-center gap-2">
                <Users className="w-6 h-6 text-indigo-500" />
                {t.t1Title}
              </h2>
              <p className="text-sm text-muted mt-2 leading-relaxed">
                {t.t1Desc}
              </p>
            </div>

            {/* Visual Architecture Flowchart */}
            <div className="surface-tint p-6 rounded-2xl bg-slate-950 text-white space-y-4 border border-slate-800">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-mono text-indigo-400 font-bold">claude-agent-team-architecture.diag</span>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Orchestration Pattern
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center text-xs font-bold">
                <div className="p-3.5 rounded-xl bg-indigo-900/80 border border-indigo-700 text-indigo-200">
                  1. Leader Agent<br /><span className="text-[10px] text-muted font-normal">{t.flow1}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-purple-900/80 border border-purple-700 text-purple-200">
                  2. {t.flow2}<br /><span className="text-[10px] text-muted font-normal">bug_hunter, reviewer</span>
                </div>
                <div className="surface-tint p-3.5 rounded-xl bg-cyan-900/80 border border-cyan-700 text-cyan-200">
                  3. {t.flow3}<br /><span className="text-[10px] text-muted font-normal">{t.flow3Sub}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-emerald-700 text-white">
                  4. {t.flow4}<br /><span className="text-[10px] text-emerald-100 font-normal">{t.flow4Sub}</span>
                </div>
              </div>
            </div>

            {/* Hands-on Step 1: Sub-agent & Skill Folder Tree */}
            <div className="space-y-4 pt-4">
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <GitBranch className="w-5 h-5 text-purple-500" />
                {t.step1Title}
              </h3>
              <p className="text-xs text-muted">
                {t.step1Desc}
              </p>
              <div className="surface-tint bg-slate-950 p-4 rounded-2xl font-mono text-xs text-emerald-400 border border-slate-800 relative">
                <button
                  aria-label={t.copyLabel}
                  onClick={() => handleCopy(`mkdir -p .claude/skills/deploy_production .claude/skills/security_review .claude/subagents`, 'cmd_tree')}
                  className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all flex items-center gap-1"
                >
                  {copiedId === 'cmd_tree' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {t.copyTree}
                </button>
                <pre className="text-[11px] leading-relaxed pt-6">
{`my-project/
├── .claude/
│   ├── skills/                       # ${t.cmtSkills}
│   │   ├── deploy_production/
│   │   │   └── SKILL.md              # ${t.cmtDeploySkill}
│   │   └── security_review/
│   │       └── SKILL.md              # ${t.cmtSecSkill}
│   ├── subagents/                    # ${t.cmtSubagents}
│   │   ├── bug_hunting_agent.md      # ${t.cmtBugAgent}
│   │   └── security_guard_agent.md   # ${t.cmtSecAgent}
│   └── mcp.json                      # ${t.cmtMcp}
└── AGENTS.md                         # ${t.cmtAgentsMd}`}
                </pre>
              </div>
            </div>

            {/* Hands-on Step 2: Custom Skill Code */}
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Puzzle className="w-5 h-5 text-indigo-500" />
                {t.step2Title}
              </h3>
              <p className="text-xs text-muted">
                {t.step2Desc}
              </p>
              <div className="surface-tint bg-slate-950 p-5 rounded-2xl font-mono text-xs text-slate-200 border border-slate-800 relative">
                <button
                  aria-label={t.copyLabel}
                  onClick={() => handleCopy(`---\nname: deploy_production\ndescription: ${t.skillDescription}\n---\n\n# Deploy Production Skill Directive\n1. Run \`npm run build\` or \`pytest\` to verify zero build errors.\n2. ${t.skillStep2}\n3. Stage all files with \`git add -A\`.\n4. Commit and push to remote \`main\` branch.`, 'code_skill_deploy')}
                  className="absolute top-4 right-4 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-md"
                >
                  {copiedId === 'code_skill_deploy' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedId === 'code_skill_deploy' ? t.copyDone : t.copySkill}
                </button>
                <pre tabIndex={0} className="text-[11px] leading-relaxed text-emerald-400 pt-6 overflow-x-auto">
{`---
name: deploy_production
description: ${t.skillDescription}
---

# Deploy Production Skill Directive
1. Run \`npm run build\` to verify zero build errors.
2. ${t.skillStep2}
3. Stage all files with \`git add -A\`.
4. Commit and push to remote \`main\` branch.`}
                </pre>
              </div>
            </div>

            {/* Hands-on Step 3: MCP Connection */}
            <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Server className="w-5 h-5 text-cyan-500" />
                {t.step3Title}
              </h3>
              <p className="text-xs text-muted">
                {t.step3Desc}
              </p>
              <div className="surface-tint bg-slate-900 text-indigo-300 p-4 rounded-xl font-mono text-xs flex items-center justify-between border border-slate-800">
                <span>claude mcp add codebase-memory npx -y @modelcontextprotocol/server-codebase-memory</span>
                <button
                  aria-label={t.copyLabel}
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
              {t.t2Badge}
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-2 flex items-center gap-2">
              <Cpu className="w-6 h-6 text-purple-500" />
              {t.t2Title}
            </h2>
            <p className="text-sm text-muted mt-2 leading-relaxed">
              {t.t2Desc}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              {t.t2Step}
            </h3>
            <div className="surface-tint bg-slate-950 p-5 rounded-2xl font-mono text-xs text-slate-200 border border-slate-800 relative">
              <button
                aria-label={t.copyLabel}
                onClick={() => handleCopy(`agent_pipeline:\n  mode: autonomous\n  guardrails:\n    strict_types: true\n    prevent_oom: true\nskills:\n  - name: deploy_production\n    path: .claude/skills/deploy_production/SKILL.md`, 'code_antigravity')}
                className="absolute top-4 right-4 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-all flex items-center gap-1.5"
              >
                {copiedId === 'code_antigravity' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {t.copyDirectives}
              </button>
              <pre tabIndex={0} className="text-[11px] leading-relaxed text-indigo-300 pt-6 overflow-x-auto">
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
            <span className="px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950 text-accent text-xs font-extrabold">
              {t.t3Badge}
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-2 flex items-center gap-2">
              <Terminal className="w-6 h-6 text-cyan-500" />
              {t.t3Title}
            </h2>
            <p className="text-sm text-muted mt-2 leading-relaxed">
              {t.t3Desc}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              {t.t3Step}
            </h3>
            <div className="surface-tint bg-slate-950 p-5 rounded-2xl font-mono text-xs text-slate-200 border border-slate-800 relative">
              <button
                aria-label={t.copyLabel}
                onClick={() => handleCopy(`# [Rule: No Superfluous Dependencies]\n1. Never install external libraries for date/string formatting.\n2. Ensure PEP 8 for Python & strict TypeScript types.\n3. Include Retry with exponential backoff on DB deadlock.`, 'code_cursorrules')}
                className="absolute top-4 right-4 px-3.5 py-2 rounded-xl bg-accent hover:bg-cyan-500 text-white font-bold text-xs transition-all flex items-center gap-1.5"
              >
                {copiedId === 'code_cursorrules' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {t.copyCursor}
              </button>
              <pre tabIndex={0} className="text-[11px] leading-relaxed text-cyan-300 pt-6 overflow-x-auto">
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
              {t.t4Badge}
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-2 flex items-center gap-2">
              <Zap className="w-6 h-6 text-emerald-500" />
              {t.t4Title}
            </h2>
            <p className="text-sm text-muted mt-2 leading-relaxed">
              {t.t4Desc}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              {t.t4Step}
            </h3>
            <div className="surface-tint bg-slate-950 p-5 rounded-2xl font-mono text-xs text-slate-200 border border-slate-800 relative">
              <button
                aria-label={t.copyLabel}
                onClick={() => handleCopy(`from autogen_agentchat.agents import AssistantAgent\nfrom autogen_agentchat.teams import SelectorGroupChat\n\nplanner = AssistantAgent("planner", model_client=model_client, description="오케스트레이터 기획 에이전트")\ncoder = AssistantAgent("coder", model_client=model_client, description="코드 구현 서브 에이전트")\nreviewer = AssistantAgent("reviewer", model_client=model_client, description="보안 및 품질 검사 서브 에이전트")\n\nteam = SelectorGroupChat([planner, coder, reviewer], model_client=model_client)`, 'code_autogen')}
                className="absolute top-4 right-4 px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-500 text-white font-bold text-xs transition-all flex items-center gap-1.5"
              >
                {copiedId === 'code_autogen' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {t.copyPython}
              </button>
              <pre tabIndex={0} className="text-[11px] leading-relaxed text-emerald-400 pt-6 overflow-x-auto">
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
              {t.cmpBadge}
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-2 flex items-center gap-2">
              <Layers className="w-6 h-6 text-blue-500" />
              {t.cmpTitle}
            </h2>
            <p className="text-sm text-muted mt-2 leading-relaxed">
              {t.cmpDesc}
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="surface-tint bg-gradient-to-r from-indigo-900 to-purple-900 text-white">
                  <th className="p-3.5 font-extrabold">{t.colTool}</th>
                  <th className="p-3.5 font-extrabold">{t.colTeams}</th>
                  <th className="p-3.5 font-extrabold">{t.colSub}</th>
                  <th className="p-3.5 font-extrabold">{t.colSkills}</th>
                  <th className="p-3.5 font-extrabold">{t.colGuard}</th>
                  <th className="p-3.5 font-extrabold">{t.colCost}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                <tr className="bg-indigo-50/50 dark:bg-indigo-950/30">
                  <td className="p-3.5 font-black text-indigo-600 dark:text-indigo-400">🤖 Claude Code CLI</td>
                  <td className="p-3.5 font-bold text-success">{t.valFullLeader}</td>
                  <td className="p-3.5 font-bold text-success">{t.valSubagents}</td>
                  <td className="p-3.5 font-bold text-success">✅ Native MCP & Skills</td>
                  <td className="p-3.5">{t.valHitl}</td>
                  <td className="p-3.5 font-semibold">{t.valTokenBased}</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-black text-purple-600 dark:text-purple-400">🌌 Google Antigravity</td>
                  <td className="p-3.5 font-bold text-success">{t.valFullDeepmind}</td>
                  <td className="p-3.5 font-bold text-success">{t.valDirectives}</td>
                  <td className="p-3.5 font-bold text-success">✅ Agentic Directives & Skill</td>
                  <td className="p-3.5">Strict Types & OOM Guard</td>
                  <td className="p-3.5 font-semibold">{t.valFreeGcp}</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-950/40">
                  <td className="p-3.5 font-black text-accent">💻 Cursor IDE</td>
                  <td className="p-3.5 font-bold text-warn">{t.valComposerOnly}</td>
                  <td className="p-3.5 font-bold text-warn">{t.valNeedsPlugin}</td>
                  <td className="p-3.5 font-bold text-success">✅ .cursorrules & MCP</td>
                  <td className="p-3.5">Linter & Rule Enforcement</td>
                  <td className="p-3.5 font-semibold">{t.valPro20}</td>
                </tr>
                <tr>
                  <td className="p-3.5 font-black text-success">⚙️ AutoGen 0.4</td>
                  <td className="p-3.5 font-bold text-success">{t.valFullPySdk}</td>
                  <td className="p-3.5 font-bold text-success">{t.valSelector}</td>
                  <td className="p-3.5 font-bold text-warn">{t.valPyFuncCall}</td>
                  <td className="p-3.5">{t.valCustomGuard}</td>
                  <td className="p-3.5 font-semibold">{t.valOssFree}</td>
                </tr>
                <tr className="bg-slate-50 dark:bg-slate-950/40">
                  <td className="p-3.5 font-black text-pink-600 dark:text-pink-400">🤖 Devin / Roo Code</td>
                  <td className="p-3.5 font-bold text-success">{t.valAutonomous}</td>
                  <td className="p-3.5 font-bold text-success">{t.valSandbox}</td>
                  <td className="p-3.5 font-bold text-success">{t.valRooMcp}</td>
                  <td className="p-3.5">Sandbox Isolation</td>
                  <td className="p-3.5 font-semibold">{t.valAcu}</td>
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
              {t.secBadge}
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-2 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-rose-500" />
              {t.secTitle}
            </h2>
            <p className="text-sm text-muted mt-2 leading-relaxed">
              {t.secDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 space-y-3">
              <h3 className="font-black text-sm text-rose-950 dark:text-rose-200 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-500" /> {t.sec1Title}
              </h3>
              <ul className="text-xs text-rose-900 dark:text-rose-300 space-y-1.5 list-disc list-inside font-medium">
                <li>{t.sec1a}</li>
                <li>{t.sec1b}</li>
                <li>{t.sec1c}</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 space-y-3">
              <h3 className="font-black text-sm text-amber-950 dark:text-amber-200 flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-warn" /> {t.sec2Title}
              </h3>
              <ul className="text-xs text-amber-900 dark:text-amber-300 space-y-1.5 list-disc list-inside font-medium">
                <li>{t.sec2a}</li>
                <li>{t.sec2b}</li>
                <li>{t.sec2c}</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
