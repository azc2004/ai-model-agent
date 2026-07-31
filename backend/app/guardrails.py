import re
import logging
from typing import Tuple, Optional

logger = logging.getLogger(__name__)

# 1. Prompt Injection & Jailbreak 감지 정규식 패턴
PROMPT_INJECTION_PATTERNS = [
    r"ignore\s+(all\s+)?(previous|prior)\s+instructions",
    r"forget\s+(all\s+)?(previous|prior)\s+instructions",
    r"disregard\s+(all\s+)?(previous|prior)\s+instructions",
    r"system\s+prompt",
    r"show\s+me\s+your\s+prompt",
    r"repeat\s+the\s+words\s+above",
    r"you\s+are\s+now\s+a",
    r"act\s+as\s+a",
    r"dan\s+mode",
    r"jailbreak",
    r"override\s+(the\s+)?system",
    r"bypass\s+(the\s+)?filter",
    r"이전\s*지시(사항)?\s*(무시|잊어|취소)",
    r"시스템\s*프롬프트\s*(보여|출력|공개)",
    r"역할(을)?\s*변경",
    r"비밀번호\s*유출",
    r"명령을\s*무시"
]

# 2. 확실히 무관한 (Off-Topic) 도메인 키워드
OFF_TOPIC_KEYWORDS = [
    "오늘 날씨", "내일 날씨", "주식 추천", "로또 번호", "비트코인 시세",
    "영화 추천", "맛집 추천", "연예인 소식", "소설 써줘", "시 써줘",
    "게임 공략", "운세", "타로", "부동산 시세", "삼행시"
]

# 3. IT/소프트웨어/AI 시스템 관련 유효한 도메인 키워드 (Relevancy Match)
VALID_DOMAIN_KEYWORDS = [
    "ai", "llm", "rag", "챗봇", "chatbot", "에이전트", "agent", "모델", "model",
    "서비스", "시스템", "서버", "api", "백엔드", "프론트엔드", "데이터", "지식",
    "번역", "코딩", "코드", "이미지", "비전", "추론", "검색", "자동화", "멀티모달",
    "추천", "클라우드", "배포", "보안", "크롤링", "분석", "요약", "생성", "app", "web",
    "pipeline", "database", "vector", "embedding", "fastapi", "python", "gpt",
    "claude", "gemini", "deepseek", "llama", "groq"
]


def validate_and_sanitize_prompt(prompt: Optional[str]) -> Tuple[bool, str, Optional[str]]:
    """사용자 입력 프롬프트의 보안성 및 연관성(Security & Relevancy)을 사전 검증합니다.

    Returns:
        Tuple[is_valid, sanitized_prompt, error_reason]
    """
    if not prompt or not prompt.strip():
        return True, "", None

    raw_text = prompt.strip()

    # 1. 입력 길이 검증 (과도한 대용량 토큰 소모 방어 - 최대 500자)
    if len(raw_text) > 500:
        logger.warning(f"🛡️ Guardrail Blocked: 입력 길이 초과 ({len(raw_text)}자)")
        return False, raw_text[:500], "요청 프롬프트가 제한 길이(500자)를 초과했습니다. 핵심 요구사항 위주로 입력해 주세요."

    lowered_text = raw_text.lower()

    # 2. Prompt Injection / Jailbreak 공격 패턴 탐지
    for pattern in PROMPT_INJECTION_PATTERNS:
        if re.search(pattern, lowered_text, re.IGNORECASE):
            logger.warning(f"🛡️ Guardrail Blocked: Prompt Injection 패턴 감지 ('{pattern}')")
            return False, raw_text, "보안 정책에 따라 프롬프트 재설정 및 주입 시도 문구(Prompt Injection)는 처리할 수 없습니다."

    # 3. Off-Topic (엉뚱한 질의) 탐지
    for off_kw in OFF_TOPIC_KEYWORDS:
        if off_kw in lowered_text:
            logger.warning(f"🛡️ Guardrail Blocked: 업무 무관 질의(Off-Topic) 감지 ('{off_kw}')")
            return False, raw_text, f"본 서비스는 AI 아키텍처 및 시스템 구축 전용 추천 엔진입니다. '{off_kw}'와(과) 같은 일반 질의는 지원하지 않습니다."

    return True, raw_text, None


def build_security_blocked_spec(service_name: str, user_prompt: str, reason: str) -> str:
    """보안 검증 실패 또는 부적절한 입력 시 반환할 안전한 마크다운 문서"""
    return f"""# 🛡️ [Security Guardrail Alert] 요청 검증 안내

> **보안 및 서비스 가드레일 정책**에 의해 입력하신 요청이 제한되었습니다.

---

### ⚠️ 사유 안내
- **감지된 문제**: {reason}
- **입력된 프롬프트**: `"{user_prompt}"`

---

### 💡 서비스 이용 가이드
LLM Compass는 **AI 모델 및 IT 서비스 아키텍처 설계 전문 시뮬레이터**입니다.  
아래와 같이 **AI 서비스 구축 목적의 요구사항**을 작성해 주세요:

- ✅ *"사내 PDF 및 Notion 문서를 검색하는 챗봇 아키텍처 설계"*
- ✅ *"고객 이미지 캡처본을 동시 분석하는 24/7 CS 자동화 봇"*
- ✅ *"대용량 실시간 다국어 번역 API 엔진 구축"*

---
*LLM Compass Security Guardrail Engine v1.0*
"""
