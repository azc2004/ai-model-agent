#!/usr/bin/env python3
"""주간 제품 업데이트를 생성한다.

커밋 메시지를 그대로 싣지 않는다. 개발자용 문장이라 사용자에게 의미가 없고,
"검색어 PII 차단", "인증 우회", "빈 워커 장애" 처럼 과거 보안·장애 이력이 그대로
드러난다. LLM 이 사용자 관점 문장으로 다시 쓴다.

자격증명과 엔드포인트는 generate_trend_reports.load_config 를 재사용한다. 다만
그쪽 _request_llm 은 뉴스 리포트 전용 JSON 스키마를 강제하므로 요청 자체는 여기서
따로 만든다 — 동작 중인 뉴스 파이프라인을 건드리지 않기 위해서다.
CI 에 이미 있는 LITELLM_API_KEY 하나로 돌고 추가 비용이 없다.

  python3 backend/scripts/generate_changelog.py --days 7          # SQL 생성
  python3 backend/scripts/generate_changelog.py --days 7 --print  # 결과만 확인
  npx wrangler d1 execute llm-compass-db --remote --file=seed_changelog.sql
"""
import argparse
import json
import os
import re
import subprocess
import sys
import urllib.request
from datetime import datetime, timedelta, timezone

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

OUT = "seed_changelog.sql"

# 사용자에게 의미가 없는 유형은 애초에 넣지 않는다.
USER_FACING = ("feat", "fix", "perf")

# 재작성을 거치더라도 원본 자체를 넘기지 않을 커밋. 보안 결함과 장애 대응 이력은
# 공개 체인지로그의 소재가 아니다.
SENSITIVE = re.compile(
    r"PII|인증|우회|노출|시크릿|secret|password|비밀번호|취약|장애|다운|유출|어드민|admin",
    re.I,
)


def collect_commits(days: int) -> list[str]:
    since = f"{days} days ago"
    raw = subprocess.run(
        ["git", "log", f"--since={since}", "--pretty=%s", "--no-merges"],
        capture_output=True, text=True, check=True,
    ).stdout.splitlines()

    kept = []
    for line in raw:
        line = line.strip()
        if not line.startswith(USER_FACING):
            continue
        if SENSITIVE.search(line):
            continue
        kept.append(line)
    return kept


def rewrite(commits: list[str], start: str, end: str) -> dict | None:
    """커밋 목록을 사용자 관점 업데이트로 다시 쓴다."""
    from generate_trend_reports import load_config

    joined = "\n".join(f"- {c}" for c in commits[:60])
    prompt = f"""아래는 AI 모델 비교 서비스 'LLM COMPASS' 의 {start} ~ {end} 개발 커밋 목록이다.

{joined}

이것을 서비스 이용자가 읽을 주간 업데이트 노트로 다시 써라.

규칙:
- 커밋 메시지를 그대로 옮기지 마라. 이용자가 체감하는 변화로 바꿔 써라.
  (예: "워커를 처리할 경로에만 실행시킨다" → "페이지 로딩이 빨라졌습니다")
- 내부 구현 용어(워커, 번들, 청크, 커밋, 리팩터링, D1)를 쓰지 마라.
- 보안 결함이나 장애 대응은 언급하지 마라. 그런 항목은 아예 빼라.
- 커밋에 없는 내용을 지어내지 마라. 근거가 없으면 항목 수가 적어도 된다.
- 과장하지 마라. "혁신적", "획기적" 같은 표현을 쓰지 마라.
- 존댓말 평서문으로 쓴다.

반드시 순수 JSON 만 반환하라:
{{
  "title": "이번 주 무엇이 나아졌는지 한눈에 보이는 제목 (40자 이내, 날짜 제외)",
  "summary": "2문장 요약 (120자 이내)",
  "items": [
    {{"category": "새 기능|개선|수정", "text": "이용자 관점 한 문장"}}
  ]
}}"""

    try:
        config = load_config()
    except RuntimeError as e:
        print(f"⚠️ {e}")
        return None

    for model in (config.model, config.fallback_model):
        if not model:
            continue
        try:
            out = _ask(prompt, config, model)
            if out and out.get("items"):
                print(f"    ✓ {model}")
                return out
            print(f"    ⚠️ {model}: items 없음 → 폴백")
        except Exception as e:
            print(f"    ⚠️ {model}: {e} → 폴백")
    return None


def _ask(prompt: str, config, model: str) -> dict:
    """generate_trend_reports 의 스키마 강제를 피해 자유 형식 JSON 을 받는다."""
    body = json.dumps({
        "model": model,
        "messages": [
            {"role": "system", "content": "Return ONLY valid JSON. Write in formal Korean (합쇼체)."},
            {"role": "user", "content": prompt},
        ],
        "temperature": 0.4,
        "max_tokens": 1200,
        "response_format": {"type": "json_object"},
    }).encode()
    req = urllib.request.Request(
        f"{config.litellm_url}/chat/completions", data=body, method="POST",
        headers={
            "Authorization": f"Bearer {config.litellm_key}",
            "Content-Type": "application/json",
            "User-Agent": "curl/8.7.1",
        },
    )
    with urllib.request.urlopen(req, timeout=60) as resp:
        raw = json.loads(resp.read())["choices"][0]["message"]["content"]
    raw = re.sub(r"^```json\s*", "", raw.strip())
    raw = re.sub(r"```$", "", raw).strip()
    return json.loads(raw)


def escape_sql(s: str) -> str:
    return str(s).replace("'", "''")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--days", type=int, default=7)
    ap.add_argument("--print", action="store_true", help="SQL 을 쓰지 않고 결과만 출력")
    ap.add_argument("--out", default=OUT)
    args = ap.parse_args()

    end = datetime.now(timezone.utc).date()
    start = end - timedelta(days=args.days)

    commits = collect_commits(args.days)
    print(f"📥 {start} ~ {end} 사용자 대상 커밋 {len(commits)}건")
    if not commits:
        # 변경이 없으면 발행하지 않는다. "이번 주 변경 없음" 은 관리되고 있다는
        # 인상을 주기는커녕 정확히 그 반대다.
        print("ℹ️ 발행할 변경이 없다. 아무것도 만들지 않는다.")
        open(args.out, "w").close()
        return 0

    doc = rewrite(commits, str(start), str(end))
    if not doc:
        print("❌ 재작성 실패. 발행하지 않는다.")
        open(args.out, "w").close()
        return 1

    items = [i for i in doc["items"] if i.get("text")]
    print(f"\n제목: {doc['title']}\n요약: {doc['summary']}")
    for i in items:
        print(f"  [{i.get('category', '개선')}] {i['text']}")

    if args.print:
        return 0

    cid = f"changelog-{end}"
    sql = (
        "INSERT OR REPLACE INTO changelog "
        "(id, period_start, period_end, title, summary, items, commit_count) VALUES ("
        f"'{escape_sql(cid)}', '{start}', '{end}', "
        f"'{escape_sql(doc['title'])}', '{escape_sql(doc['summary'])}', "
        f"'{escape_sql(json.dumps(items, ensure_ascii=False))}', {len(commits)});"
    )
    with open(args.out, "w", encoding="utf-8") as f:
        f.write(sql + "\n")
    print(f"\n✅ {args.out} 생성 ({cid})")
    return 0


if __name__ == "__main__":
    sys.exit(main())
