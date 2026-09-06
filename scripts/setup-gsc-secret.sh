#!/usr/bin/env bash
# 서비스 계정 JSON 을 GitHub 시크릿(GSC_SERVICE_ACCOUNT)에 등록한다.
#
# JSON 전문이 자격증명이다. private_key 만 떼서 넣으면 안 된다 — JWT 의 iss 에
# client_email 이 필요하다. 또 private_key 안의 개행이 "\n" 문자로 들어 있어
# 손으로 복사·붙여넣기 하면 서명이 깨진다. 파일을 그대로 흘려넣어야 안전하다.
#
#   ./scripts/setup-gsc-secret.sh [키파일경로]
#
# 경로를 생략하면 Downloads 와 프로젝트 폴더에서 서비스 계정 JSON 을 찾는다.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
KEY="${1:-}"

find_key() {
  local f
  while IFS= read -r f; do
    if grep -q '"type": *"service_account"' "$f" 2>/dev/null; then
      echo "$f"; return 0
    fi
  done < <(
    find ~/Downloads "$REPO_ROOT" -maxdepth 3 -name '*.json' -mtime -14 \
      -not -path '*/node_modules/*' -not -path '*/.git/*' -not -path '*/dist/*' \
      2>/dev/null
  )
  return 1
}

if [ -z "$KEY" ]; then
  echo "▶ 서비스 계정 JSON 탐색 중..."
  KEY="$(find_key)" || { echo "❌ 서비스 계정 JSON 을 찾지 못했다. 경로를 인자로 넘겨라."; exit 1; }
fi
[ -f "$KEY" ] || { echo "❌ 파일이 없다: $KEY"; exit 1; }

echo "▶ 대상 파일: $KEY"
python3 - "$KEY" <<'PY'
import json, sys
d = json.load(open(sys.argv[1]))
missing = [k for k in ("type", "client_email", "private_key") if not d.get(k)]
if missing:
    sys.exit(f"❌ 필수 필드 누락: {', '.join(missing)}")
if d["type"] != "service_account":
    sys.exit(f"❌ 서비스 계정 키가 아니다 (type={d['type']})")
print(f"  project_id  : {d.get('project_id')}")
print(f"  client_email: {d['client_email']}")
print(f"  private_key : {len(d['private_key'])}자")
print()
print("  ⚠️ 위 client_email 이 Search Console → 설정 → 사용자 및 권한 에")
print("     '제한됨' 으로 추가돼 있어야 한다. 아니면 API 가 403 을 돌려준다.")
PY

echo
echo "▶ GitHub 시크릿 등록"
gh secret set GSC_SERVICE_ACCOUNT < "$KEY"
gh secret list | grep GSC_SERVICE_ACCOUNT

# 저장소 안에 두면 실수로 커밋될 수 있다. 밖에 있으면 그대로 둔다.
case "$KEY" in
  "$REPO_ROOT"/*)
    echo
    echo "⚠️ 키 파일이 저장소 안에 있다: $KEY"
    echo "   시크릿에 등록됐으므로 로컬 파일은 필요 없다. 삭제한다."
    rm -f "$KEY"
    echo "   삭제 완료"
    ;;
  *)
    echo
    echo "ℹ️ 키 파일은 저장소 밖에 있다: $KEY"
    echo "   등록이 끝났으니 지워도 된다:  rm '$KEY'"
    ;;
esac
