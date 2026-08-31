#!/usr/bin/env python3
"""모델 설명(description)을 지원 언어로 번역해 models.description_i18n 을 채운다.

원문이 한국어인 행은 영어 UI 에서 한국어로, 영어인 행은 한국어 UI 에서 영어로
보였다. 언어별 번역본을 컬럼 하나(JSON)에 담아 Worker 가 ?lang= 으로 고른다.

번역 엔진은 뉴스 배치가 쓰는 것과 같은 무료 경로(Google GTX → MyMemory)다.
LLM 을 부르지 않으므로 토큰 비용이 없다.

  python3 backend/scripts/translate_model_descriptions.py            # dry-run, SQL 만 생성
  python3 backend/scripts/translate_model_descriptions.py --limit 20 # 일부만 (동작 확인용)
  npx wrangler d1 execute llm-compass-db --remote --file=seed_model_i18n.sql
"""
import argparse
import json
import re
import subprocess
import sys
import time
import urllib.parse
import urllib.request

LANGS = ["ko", "en", "ja", "zh", "es", "de", "fr"]
API = "https://llmcompass.azclab.com/api/v1/models"
OUT = "seed_model_i18n.sql"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36"


def detect_lang(text: str) -> str:
    """원문 언어. 한글이 섞여 있으면 ko, 아니면 en 으로 본다."""
    return "ko" if re.search(r"[가-힣]", text) else "en"


def translate(text: str, target: str, source: str) -> str:
    """무료 번역 (Google GTX → MyMemory). 실패하면 원문을 그대로 돌려준다."""
    if not text or len(text) < 3 or target == source:
        return text
    clean = text.strip()[:800]
    try:
        q = urllib.parse.quote(clean)
        url = (f"https://translate.googleapis.com/translate_a/single"
               f"?client=gtx&sl={source}&tl={target}&dt=t&q={q}")
        with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=8) as r:
            data = json.loads(r.read().decode("utf-8"))
            out = "".join(item[0] for item in data[0] if item and item[0]).strip()
            if out:
                return out
    except Exception:
        pass
    try:
        q = urllib.parse.quote(clean[:500])
        url = f"https://api.mymemory.translated.net/get?q={q}&langpair={source}|{target}"
        with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=8) as r:
            data = json.loads(r.read().decode("utf-8"))
            out = (data.get("responseData") or {}).get("translatedText", "").strip()
            if out and not out.startswith("MYMEMORY WARNING"):
                return out
    except Exception:
        pass
    return text


def ids_missing_translation() -> set:
    """description_i18n 이 비어 있는 모델 id. wrangler 로 D1 을 직접 읽는다."""
    out = subprocess.run(
        ["npx", "wrangler", "d1", "execute", "llm-compass-db", "--remote", "--json",
         "--command", "SELECT id FROM models WHERE description_i18n IS NULL OR description_i18n = ''"],
        capture_output=True, text=True, check=True,
    ).stdout
    return {row["id"] for row in json.loads(out)[0]["results"]}


def escape_sql(s: str) -> str:
    return s.replace("'", "''")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--limit", type=int, help="처리할 모델 수 (동작 확인용)")
    ap.add_argument("--only-korean", action="store_true",
                    help="원문이 한국어인 행만 처리 (영어 UI 의 한글 잔존만 먼저 없앨 때)")
    ap.add_argument("--missing-only", action="store_true",
                    help="번역이 아직 없는 행만 처리 — 주간 동기화가 신규 모델만 번역할 때 쓴다")
    ap.add_argument("--api", default=API)
    ap.add_argument("--out", default=OUT)
    args = ap.parse_args()

    # UA 없이 요청하면 Cloudflare 가 403 을 준다
    req = urllib.request.Request(args.api, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=30) as r:
        models = json.load(r)
    print(f"📥 모델 {len(models)}개 수신")

    if args.missing_only:
        # Worker 는 응답 크기를 줄이려고 description_i18n 을 빼고 내려준다. 따라서 공개
        # API 로는 번역 유무를 알 수 없어 D1 을 직접 조회한다 (CI 에 wrangler 자격증명 있음).
        todo = ids_missing_translation()
        before = len(models)
        models = [m for m in models if m["id"] in todo]
        print(f"   번역이 없는 행 {len(models)}개 (전체 {before}개)")
    if args.only_korean:
        models = [m for m in models if detect_lang(m.get("description") or "") == "ko"]
        print(f"   원문이 한국어인 행 {len(models)}개만 처리")
    if args.limit:
        models = models[: args.limit]

    statements, skipped = [], 0
    for i, m in enumerate(models, 1):
        desc = (m.get("description") or "").strip()
        if len(desc) < 3:
            skipped += 1
            continue
        src = detect_lang(desc)
        by_lang = {src: desc}
        for lang in LANGS:
            if lang == src:
                continue
            by_lang[lang] = translate(desc, lang, src)
            time.sleep(0.12)  # 무료 엔드포인트 예의상 간격
        payload = escape_sql(json.dumps(by_lang, ensure_ascii=False))
        statements.append(
            f"UPDATE models SET description_i18n = '{payload}' WHERE id = '{escape_sql(m['id'])}';")
        if i % 25 == 0:
            print(f"   … {i}/{len(models)}")

    with open(args.out, "w", encoding="utf-8") as f:
        f.write("-- 모델 설명 다국어 백필. 재실행해도 안전한 UPDATE 문이다.\n")
        f.write("\n".join(statements) + "\n")

    print(f"✅ {len(statements)}건 → {args.out} (설명 없음 {skipped}건 건너뜀)")
    print(f"   적용: npx wrangler d1 execute llm-compass-db --remote --file={args.out}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
