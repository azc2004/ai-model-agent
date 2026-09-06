#!/usr/bin/env python3
"""Google Search Console 검색 실적을 D1 에 적재한다.

서비스 계정으로 인증한다. GSC 속성에 그 계정을 '제한됨' 사용자로 추가해 두면
읽기에 충분하다.

GSC 데이터는 2~3일 지연돼 확정된다. 어제 날짜를 조회하면 비어 있거나 나중에
값이 바뀐다. 그래서 매번 최근 며칠을 다시 받아 덮어쓴다 — gsc_metrics 의
PRIMARY KEY 가 (date, dimension, value) 라 재수집이 안전하다.

  python3 backend/scripts/fetch_gsc_metrics.py            # SQL 생성
  python3 backend/scripts/fetch_gsc_metrics.py --print    # 조회만
  npx wrangler d1 execute llm-compass-db --remote --file=seed_gsc.sql
"""
import argparse
import json
import os
import sys
import time
import urllib.parse
import urllib.request
from datetime import date, timedelta

OUT = "seed_gsc.sql"
SITE_URL = os.environ.get("GSC_SITE_URL", "https://llmcompass.azclab.com/")
API = "https://searchconsole.googleapis.com/webmasters/v3"
TOKEN_URL = "https://oauth2.googleapis.com/token"
SCOPE = "https://www.googleapis.com/auth/webmasters.readonly"

# 확정까지 2~3일 걸리므로 넉넉히 되짚는다. 재수집은 덮어쓰기라 부작용이 없다.
LOOKBACK_DAYS = 5
DIMENSIONS = ("query", "page", "country", "device")
ROW_LIMIT = 500


def load_credentials(environ=None):
    raw = (environ or os.environ).get("GSC_SERVICE_ACCOUNT", "").strip()
    if not raw:
        raise RuntimeError("GSC_SERVICE_ACCOUNT is required (서비스 계정 JSON 전문)")
    info = json.loads(raw)
    for field in ("client_email", "private_key"):
        if not info.get(field):
            raise RuntimeError(f"서비스 계정 JSON 에 {field} 가 없습니다")
    return info


def get_access_token(info, opener=urllib.request.urlopen):
    """서비스 계정 JWT 를 액세스 토큰으로 교환한다."""
    import jwt  # PyJWT[crypto]

    now = int(time.time())
    assertion = jwt.encode(
        {
            "iss": info["client_email"],
            "scope": SCOPE,
            "aud": TOKEN_URL,
            "iat": now,
            "exp": now + 3600,
        },
        info["private_key"],
        algorithm="RS256",
    )
    body = urllib.parse.urlencode({
        "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
        "assertion": assertion,
    }).encode()
    req = urllib.request.Request(TOKEN_URL, data=body, method="POST",
                                 headers={"Content-Type": "application/x-www-form-urlencoded"})
    with opener(req, timeout=30) as resp:
        return json.loads(resp.read())["access_token"]


def query_dimension(token, dimension, start, end, opener=urllib.request.urlopen):
    """날짜 × 차원으로 조회한다. 날짜를 함께 받아야 일자별로 쌓인다."""
    url = f"{API}/sites/{urllib.parse.quote(SITE_URL, safe='')}/searchAnalytics/query"
    payload = json.dumps({
        "startDate": start, "endDate": end,
        "dimensions": ["date", dimension],
        "rowLimit": ROW_LIMIT,
    }).encode()
    req = urllib.request.Request(url, data=payload, method="POST", headers={
        "Authorization": f"Bearer {token}", "Content-Type": "application/json",
    })
    with opener(req, timeout=60) as resp:
        return json.loads(resp.read()).get("rows", [])


def esc(s):
    return str(s).replace("'", "''")


def build_sql(dimension, rows):
    out = []
    for r in rows:
        keys = r.get("keys") or []
        if len(keys) < 2:
            continue
        day, value = keys[0], keys[1]
        out.append(
            "INSERT OR REPLACE INTO gsc_metrics "
            "(date, dimension, value, clicks, impressions, ctr, position) VALUES ("
            f"'{esc(day)}', '{esc(dimension)}', '{esc(value[:300])}', "
            f"{int(r.get('clicks', 0))}, {int(r.get('impressions', 0))}, "
            f"{float(r.get('ctr', 0)):.6f}, {float(r.get('position', 0)):.2f});"
        )
    return out


def run(credentials_loader=load_credentials, token_getter=get_access_token,
        querier=query_dimension, lookback=LOOKBACK_DAYS):
    info = credentials_loader()
    token = token_getter(info)
    end = date.today() - timedelta(days=1)
    start = end - timedelta(days=lookback)
    print(f"📅 {start} ~ {end} (site={SITE_URL})")

    statements, summary = [], {}
    for dim in DIMENSIONS:
        try:
            rows = querier(token, dim, str(start), str(end))
        except Exception as e:
            print(f"  [{dim}] 조회 실패: {type(e).__name__}: {str(e)[:160]}")
            summary[dim] = 0
            continue
        sql = build_sql(dim, rows)
        statements += sql
        summary[dim] = len(sql)
        print(f"  {dim}: {len(sql)}행")
    return statements, summary


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("--print", action="store_true", help="SQL 을 쓰지 않고 결과만 출력")
    ap.add_argument("--out", default=OUT)
    args = ap.parse_args()

    statements, summary = run()
    total = sum(summary.values())
    print(f"\n📊 합계 {total}행")

    if args.print:
        return 0
    with open(args.out, "w", encoding="utf-8") as f:
        f.write("\n".join(statements) + ("\n" if statements else ""))
    # 데이터가 없어도 실패로 보지 않는다. 색인 초기에는 정상적으로 0행이다.
    print(f"✅ {args.out} ({total}행)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
