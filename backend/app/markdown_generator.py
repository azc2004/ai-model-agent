"""
에이전트 코딩용 마크다운 생성 서비스 — 코어 메소드
파이프라인: Router(분류) → Generator(케이스별 생성) → Critique(자기검증) → Validator(기계검증) → 재시도 루프

전제:
- LiteLLM 프록시를 OpenAI 호환 엔드포인트로 사용 (Langfuse 트레이싱은 프록시 레이어에서 자동 수집)
- Python 3.11+, pydantic v2, openai>=1.x
"""

from __future__ import annotations

import json
import re
from enum import Enum
from typing import Any

from openai import OpenAI
from pydantic import BaseModel, Field

import os
from dotenv import load_dotenv

load_dotenv()

# ---------------------------------------------------------------------------
# 설정 (환경변수 자동 감지)
# ---------------------------------------------------------------------------

_litellm_url = os.getenv("LITELLM_URL", os.getenv("OPENAI_BASE_URL", ""))
_openai_api_key = os.getenv("OPENAI_API_KEY", "")
_gemini_api_key = os.getenv("GEMINI_API_KEY", "")

if _litellm_url:
    client = OpenAI(
        base_url=_litellm_url,
        api_key=os.getenv("LITELLM_API_KEY", _openai_api_key or "sk-litellm-master-key"),
    )
    GENERATOR_MODEL = os.getenv("GENERATOR_MODEL", "glm-5.1")
    CRITIQUE_MODEL = os.getenv("CRITIQUE_MODEL", "glm-5.1")
    ROUTER_MODEL = os.getenv("ROUTER_MODEL", "glm-5.1")
elif _gemini_api_key:
    # Google Gemini OpenAI 호환 엔드포인트 v1beta
    client = OpenAI(
        base_url="https://generativelanguage.googleapis.com/v1beta/openai/",
        api_key=_gemini_api_key,
    )
    GENERATOR_MODEL = os.getenv("GENERATOR_MODEL", "gemini-2.5-flash")
    CRITIQUE_MODEL = os.getenv("CRITIQUE_MODEL", "gemini-2.5-flash")
    ROUTER_MODEL = os.getenv("ROUTER_MODEL", "gemini-2.5-flash")
elif _openai_api_key:
    client = OpenAI(api_key=_openai_api_key)
    GENERATOR_MODEL = os.getenv("GENERATOR_MODEL", "gpt-4o-mini")
    CRITIQUE_MODEL = os.getenv("CRITIQUE_MODEL", "gpt-4o-mini")
    ROUTER_MODEL = os.getenv("ROUTER_MODEL", "gpt-4o-mini")
else:
    # Fallback default LiteLLM
    client = OpenAI(
        base_url="http://localhost:4000",
        api_key="sk-litellm-master-key",
    )
    GENERATOR_MODEL = "glm-5.1"
    CRITIQUE_MODEL = "glm-5.1"
    ROUTER_MODEL = "glm-5.1"

MAX_RETRIES = 2


# ---------------------------------------------------------------------------
# 스키마 (Pydantic)
# ---------------------------------------------------------------------------

class CaseType(str, Enum):
    PROJECT_CONTEXT = "PROJECT_CONTEXT"  # CLAUDE.md / AGENTS.md
    SKILL = "SKILL"                      # SKILL.md
    SPEC = "SPEC"                        # spec.md
    TASKS = "TASKS"                      # tasks.md
    PLAN = "PLAN"                        # planning.md


class RouteResult(BaseModel):
    case: CaseType
    confidence: float = Field(ge=0.0, le=1.0)
    missing_info: list[str] = Field(default_factory=list)
    reason: str = ""


class ValidationIssue(BaseModel):
    rule: str
    detail: str


class ValidationResult(BaseModel):
    passed: bool
    issues: list[ValidationIssue] = Field(default_factory=list)


class GenerationResult(BaseModel):
    case: CaseType
    markdown: str
    validation: ValidationResult
    retries_used: int
    needs_user_input: list[str] = Field(default_factory=list)  # 되물어야 할 정보


# ---------------------------------------------------------------------------
# 케이스별 프롬프트 레지스트리
# ---------------------------------------------------------------------------

ROUTER_SYSTEM_PROMPT = """당신은 에이전트 코딩용 마크다운 생성 요청 분류기입니다.
사용자 요청을 아래 케이스 중 하나로 분류하고 JSON만 출력하세요. 다른 텍스트 금지.

- PROJECT_CONTEXT: 프로젝트 전역 규칙 (CLAUDE.md, AGENTS.md)
- SKILL: 반복 가능한 작업 플레이북 (SKILL.md)
- SPEC: 기능 명세서 (spec.md)
- TASKS: 구현 작업 분해 (tasks.md)
- PLAN: 구현 전 계획/설계 검토 (planning.md)

missing_info에는 고품질 생성에 필요하지만 요청에 없는 정보를 나열하세요.
(예: 빌드/테스트 명령어, 테크스택, 디렉토리 구조, 기능의 수용 기준 등)

출력 스키마:
{"case": "...", "confidence": 0.0-1.0, "missing_info": ["..."], "reason": "..."}"""

CASE_PROMPTS: dict[CaseType, str] = {
    CaseType.PROJECT_CONTEXT: """당신은 CLAUDE.md/AGENTS.md 작성 전문가입니다.

규칙:
1. 150줄 이하로 작성하세요. 30~80줄이 이상적입니다.
2. <repo_info>에 없는 명령어·경로·버전을 절대 지어내지 마세요.
   불확실한 값은 <!-- TODO: 확인 필요 --> 주석으로 남기세요.
3. 일반론 금지. "깨끗한 코드를 작성하라"(X) → "함수형 컴포넌트와 훅만 사용"(O)
4. 섹션 순서 고정:
   # 프로젝트 개요 (2줄 이내)
   ## 명령어 (빌드/테스트/린트, 정확한 플래그 포함)
   ## 아키텍처 제약 (건드리지 말아야 할 디렉토리 포함)
   ## 코드 스타일
   ## 테스트
   ## 금지사항
5. 모든 규칙은 위반 여부를 기계적으로 판별 가능해야 합니다.
6. 마크다운 본문만 출력하세요. 코드펜스로 감싸지 마세요.""",

    CaseType.SKILL: """당신은 SKILL.md 작성 전문가입니다.

규칙:
1. YAML frontmatter 필수: name, description
2. description은 "무엇을 하는지 + 언제 발동해야 하는지"를 모두 포함.
   트리거 키워드를 명시적으로 나열하세요. ("Use when: X, Y, Z 요청 시")
3. description은 100토큰(한글 약 150자) 이하 — 항상 컨텍스트에 상주합니다.
4. 부정 조건도 명시하세요. ("Do NOT use for: ...")
5. 본문은 절차형(step-by-step). 각 단계는 실행 가능한 동작이어야 합니다.
6. 긴 참고자료가 필요하면 본문에 넣지 말고 references/<파일명>.md 분리를
   제안하는 링크만 남기세요 (progressive disclosure).
7. 마크다운 본문만 출력하세요. 코드펜스로 감싸지 마세요.""",

    CaseType.SPEC: """당신은 Spec-Driven Development용 spec.md 작성 전문가입니다.

규칙:
1. 구조: # 개요 → ## 사용자 스토리 → ## 수용 기준 → ## 비기능 요구사항 → ## 엣지 케이스
2. 수용 기준은 EARS 패턴만 사용:
   - Ubiquitous: "시스템은 항상 ~해야 한다"
   - Event-driven: "WHEN <이벤트>, 시스템은 ~해야 한다"
   - State-driven: "WHILE <상태>인 동안, 시스템은 ~해야 한다"
   - Unwanted: "IF <오류조건>, THEN 시스템은 ~해야 한다"
   - Optional: "WHERE <기능 포함 시>, 시스템은 ~해야 한다"
3. 각 수용 기준에 ID를 부여하세요 (REQ-001 형식) — tasks.md 추적용.
4. 구현 방법(어떻게)이 아닌 동작(무엇)만 기술하세요.
5. 마크다운 본문만 출력하세요. 코드펜스로 감싸지 마세요.""",

    CaseType.TASKS: """당신은 tasks.md 작성 전문가입니다.

규칙:
1. 작업을 의존성 순서로 정렬하고, 각 작업에 선행 작업을 명시하세요.
2. 각 작업은 1커밋 크기(수정 파일 5개 이하)로 분해하세요.
3. spec이 주어졌다면 각 작업에 REQ-ID를 매핑하세요.
4. 각 작업에 완료 판정 기준(어떤 테스트가 통과해야 하는지)을 포함하세요.
5. 형식: - [ ] TASK-001: <제목> (선행: -, 매핑: REQ-001) — 완료 기준: ...
6. 마크다운 본문만 출력하세요. 코드펜스로 감싸지 마세요.""",

    CaseType.PLAN: """당신은 구현 전 planning.md 작성 전문가입니다.

규칙:
1. 구조: # 목표 → ## 현재 상태 분석 → ## 접근 방식 (대안 비교 포함)
   → ## 열린 질문 → ## 리스크
2. "열린 질문" 섹션이 핵심입니다. 사용자가 답해야 계획이 확정되는
   질문을 명시적으로 나열하세요.
3. 접근 방식은 최소 2개 대안을 트레이드오프와 함께 비교하세요.
4. 마크다운 본문만 출력하세요. 코드펜스로 감싸지 마세요.""",
}

CRITIQUE_SYSTEM_PROMPT = """당신은 에이전트 코딩용 마크다운 품질 검수자입니다.
아래 마크다운에서 다음 문제를 찾아 수정한 전체 마크다운을 출력하세요.

1. 검증 불가능한 규칙 (기계적으로 위반 판별이 불가한 문장) → 구체화하거나 삭제
2. 지어낸 것으로 의심되는 명령어/경로/버전 → <!-- TODO: 확인 필요 --> 로 교체
3. 일반론/뻔한 조언 → 삭제
4. 중복 규칙 → 병합

문제가 없으면 원본 그대로 출력하세요. 마크다운 본문만 출력하고 코드펜스로 감싸지 마세요."""


# ---------------------------------------------------------------------------
# 코어 메소드
# ---------------------------------------------------------------------------

def _chat(model: str, system: str, user: str, *, json_mode: bool = False,
          metadata: dict[str, Any] | None = None) -> str:
    """LiteLLM 프록시 경유 단일 호출. metadata는 Langfuse 트레이스 태깅용."""
    kwargs: dict[str, Any] = {}
    if json_mode:
        kwargs["response_format"] = {"type": "json_object"}
    resp = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
        extra_body={"metadata": metadata or {}},
        **kwargs,
    )
    return resp.choices[0].message.content or ""


def _strip_code_fence(text: str) -> str:
    """모델이 규칙을 어기고 ```로 감쌌을 때 방어적으로 제거."""
    text = text.strip()
    m = re.match(r"^```(?:markdown|md|json)?\n(.*)\n```$", text, re.DOTALL)
    return m.group(1) if m else text


def route(user_request: str) -> RouteResult:
    """1단계: 요청을 케이스로 분류하고 부족 정보를 식별."""
    raw = _chat(
        ROUTER_MODEL,
        ROUTER_SYSTEM_PROMPT,
        f"<user_request>\n{user_request}\n</user_request>",
        json_mode=True,
        metadata={"generation_name": "md-router"},
    )
    return RouteResult.model_validate(json.loads(_strip_code_fence(raw)))


def generate_markdown(case: CaseType, user_request: str,
                      context: dict[str, str] | None = None,
                      feedback: str | None = None) -> str:
    """2단계: 케이스별 프롬프트로 마크다운 생성.

    context 예시: {"repo_info": "...package.json 내용...", "tech_stack": "..."}
    feedback: 검증 실패 시 재생성용 피드백.
    """
    parts = [f"<user_request>\n{user_request}\n</user_request>"]
    for key, value in (context or {}).items():
        parts.append(f"<{key}>\n{value}\n</{key}>")
    if feedback:
        parts.append(
            f"<validation_feedback>\n이전 생성물이 검증에 실패했습니다. "
            f"다음 문제를 반드시 수정하세요:\n{feedback}\n</validation_feedback>"
        )
    raw = _chat(
        GENERATOR_MODEL,
        CASE_PROMPTS[case],
        "\n\n".join(parts),
        metadata={"generation_name": f"md-generate-{case.value.lower()}"},
    )
    return _strip_code_fence(raw)


def critique_and_revise(case: CaseType, markdown: str) -> str:
    """3단계: 자기검증 패스 — 검증 불가 규칙/지어낸 값/일반론 제거."""
    raw = _chat(
        CRITIQUE_MODEL,
        CRITIQUE_SYSTEM_PROMPT,
        f"<case>{case.value}</case>\n<markdown>\n{markdown}\n</markdown>",
        metadata={"generation_name": f"md-critique-{case.value.lower()}"},
    )
    return _strip_code_fence(raw)


# ---------------------------------------------------------------------------
# 4단계: 기계 검증 (LLM 아님 — 결정론적)
# ---------------------------------------------------------------------------

_EARS_PATTERN = re.compile(r"(항상|WHEN|WHILE|IF|WHERE)", re.IGNORECASE)
_REQ_ID_PATTERN = re.compile(r"REQ-\d{3}")
_TASK_LINE_PATTERN = re.compile(r"^- \[ \] TASK-\d{3}", re.MULTILINE)


def _has_frontmatter(md: str, required_keys: list[str]) -> list[ValidationIssue]:
    issues: list[ValidationIssue] = []
    m = re.match(r"^---\n(.*?)\n---", md, re.DOTALL)
    if not m:
        return [ValidationIssue(rule="frontmatter", detail="YAML frontmatter가 없습니다")]
    body = m.group(1)
    for key in required_keys:
        if not re.search(rf"^{key}\s*:", body, re.MULTILINE):
            issues.append(ValidationIssue(rule="frontmatter", detail=f"frontmatter에 '{key}' 키가 없습니다"))
    return issues


def validate_markdown(case: CaseType, markdown: str) -> ValidationResult:
    """케이스별 기계 검증. 실패 시 issue 목록을 재생성 피드백으로 사용."""
    issues: list[ValidationIssue] = []
    lines = markdown.splitlines()

    if case is CaseType.PROJECT_CONTEXT:
        if len(lines) > 150:
            issues.append(ValidationIssue(
                rule="max_lines", detail=f"{len(lines)}줄 — 150줄을 초과. 중요도 낮은 규칙부터 삭제 필요"))
        for section in ["명령어", "아키텍처", "금지"]:
            if not any(section in ln for ln in lines if ln.startswith("#")):
                issues.append(ValidationIssue(rule="section", detail=f"'{section}' 섹션 누락"))

    elif case is CaseType.SKILL:
        issues += _has_frontmatter(markdown, ["name", "description"])
        m = re.search(r"^description\s*:\s*(.+)$", markdown, re.MULTILINE)
        if m and len(m.group(1)) > 300:
            issues.append(ValidationIssue(
                rule="description_length", detail="description이 300자 초과 — 상주 컨텍스트 비용 과다"))

    elif case is CaseType.SPEC:
        if not _REQ_ID_PATTERN.search(markdown):
            issues.append(ValidationIssue(rule="req_id", detail="REQ-NNN 형식의 수용 기준 ID가 없습니다"))
        if not _EARS_PATTERN.search(markdown):
            issues.append(ValidationIssue(rule="ears", detail="EARS 패턴 키워드(WHEN/WHILE/IF/WHERE/항상)가 없습니다"))

    elif case is CaseType.TASKS:
        if not _TASK_LINE_PATTERN.search(markdown):
            issues.append(ValidationIssue(
                rule="task_format", detail="'- [ ] TASK-NNN:' 형식의 작업 항목이 없습니다"))

    elif case is CaseType.PLAN:
        if "열린 질문" not in markdown:
            issues.append(ValidationIssue(rule="open_questions", detail="'열린 질문' 섹션 누락"))

    # 공통: 지어낸 값 의심 신호 — placeholder가 그대로 남은 경우
    for placeholder in ["<프로젝트명>", "your-project", "example.com", "TODO_FILL"]:
        if placeholder in markdown:
            issues.append(ValidationIssue(
                rule="placeholder", detail=f"미치환 placeholder '{placeholder}' 존재"))

    return ValidationResult(passed=not issues, issues=issues)


# ---------------------------------------------------------------------------
# 엔트리포인트: 전체 파이프라인
# ---------------------------------------------------------------------------

def create_markdown(user_request: str,
                    context: dict[str, str] | None = None,
                    *,
                    ask_when_missing: bool = True,
                    run_critique: bool = True) -> GenerationResult:
    """Router → Generator → Critique → Validator → 재시도 루프.

    ask_when_missing=True이면 필수 정보 부족 시 생성하지 않고
    needs_user_input에 되물을 항목을 담아 반환합니다 (환각 방지의 핵심).
    """
    route_result = route(user_request)

    if ask_when_missing and route_result.missing_info and route_result.confidence < 0.9:
        return GenerationResult(
            case=route_result.case,
            markdown="",
            validation=ValidationResult(passed=False, issues=[
                ValidationIssue(rule="missing_info", detail=", ".join(route_result.missing_info))
            ]),
            retries_used=0,
            needs_user_input=route_result.missing_info,
        )

    feedback: str | None = None
    markdown = ""
    validation = ValidationResult(passed=False)

    for attempt in range(MAX_RETRIES + 1):
        markdown = generate_markdown(route_result.case, user_request, context, feedback)
        if run_critique:
            markdown = critique_and_revise(route_result.case, markdown)
        validation = validate_markdown(route_result.case, markdown)
        if validation.passed:
            return GenerationResult(
                case=route_result.case, markdown=markdown,
                validation=validation, retries_used=attempt)
        feedback = "\n".join(f"- [{i.rule}] {i.detail}" for i in validation.issues)

    # 재시도 소진 — 마지막 결과와 실패 사유를 함께 반환 (호출측에서 노출 판단)
    return GenerationResult(
        case=route_result.case, markdown=markdown,
        validation=validation, retries_used=MAX_RETRIES)


# ---------------------------------------------------------------------------
# 사용 예
# ---------------------------------------------------------------------------

if __name__ == "__main__":
    result = create_markdown(
        "FastAPI 기반 상품 검색 API 프로젝트의 CLAUDE.md를 만들어줘",
        context={
            "repo_info": "pyproject.toml: fastapi, pytest, ruff / 테스트: pytest -x tests/",
            "tech_stack": "Python 3.11, Elasticsearch 8.x, PostgreSQL",
        },
    )
    if result.needs_user_input:
        print("추가 정보 필요:", result.needs_user_input)
    else:
        print(f"[{result.case}] 검증 통과={result.validation.passed}, 재시도={result.retries_used}")
        print(result.markdown)