#!/usr/bin/env bash
# Run on the production VPS (or via a self-hosted Actions runner) to deploy origin/main.
# Does not touch CMS at /var/www/ambition-holidays-cms — same guarantees as .github/workflows/deploy.yml.
set -euo pipefail

PROJECT_PATH="${PROJECT_PATH:-/var/www/ambition-holidays}"
CMS_PATH="${CMS_PATH:-/var/www/ambition-holidays-cms}"
PM2_APP="${PM2_APP:-ambition-holidays}"
APP_PORT="${APP_PORT:-3032}"
EXPECTED_REPO="globalorbitnepal/ambitionholiday"

export NVM_DIR="${HOME}/.nvm"
if [ -s "${NVM_DIR}/nvm.sh" ]; then
  # shellcheck disable=SC1091
  . "${NVM_DIR}/nvm.sh"
  nvm use 22 >/dev/null 2>&1 || nvm use default >/dev/null 2>&1 || true
fi
export PATH="/usr/local/bin:/usr/bin:${HOME}/.local/bin:${PATH}"

cd "${PROJECT_PATH}"
git remote -v | grep -Fq "${EXPECTED_REPO}" || {
  echo "ERROR: unexpected git remote"
  exit 1
}

CMS_BACKUP="$(mktemp -d /tmp/ambition-cms-XXXXXX)"
[ -f "${CMS_PATH}/site-content.json" ] && cp -a "${CMS_PATH}/site-content.json" "${CMS_BACKUP}/"
[ -d "${CMS_PATH}/data-uploads" ] && cp -a "${CMS_PATH}/data-uploads/." "${CMS_BACKUP}/data-uploads/" 2>/dev/null || true
[ -d "${CMS_PATH}/public-uploads" ] && cp -a "${CMS_PATH}/public-uploads/." "${CMS_BACKUP}/public-uploads/" 2>/dev/null || true

git fetch origin main
git checkout main
git reset --hard origin/main

mkdir -p public/uploads data/uploads data
[ -f "${CMS_BACKUP}/site-content.json" ] && cp -a "${CMS_BACKUP}/site-content.json" data/site-content.json
[ -d "${CMS_BACKUP}/data-uploads" ] && cp -a "${CMS_BACKUP}/data-uploads/." data/uploads/ 2>/dev/null || true
[ -d "${CMS_BACKUP}/public-uploads" ] && cp -a "${CMS_BACKUP}/public-uploads/." public/uploads/ 2>/dev/null || true
rm -rf "${CMS_BACKUP}"

npm install --no-audit --no-fund
export NODE_OPTIONS="${NODE_OPTIONS:---max-old-space-size=4096}"
export NEXT_TELEMETRY_DISABLED=1

BUILD_DIR=".next-build"
rm -rf "${BUILD_DIR}"
[ -d .next/cache ] && mkdir -p "${BUILD_DIR}" && cp -a .next/cache "${BUILD_DIR}/cache" 2>/dev/null || true

NEXT_DIST_DIR="${BUILD_DIR}" npm run build
git checkout -- tsconfig.json 2>/dev/null || true

[ -f "${BUILD_DIR}/BUILD_ID" ] || { echo "ERROR: build failed"; exit 1; }

rm -rf .next-previous
[ -d .next ] && mv .next .next-previous
mv "${BUILD_DIR}" .next
[ -d .next-previous/static ] && cp -an .next-previous/static/. .next/static/ 2>/dev/null || true

export AMBITION_CMS_DIR="${CMS_PATH}"
pm2 restart "${PM2_APP}" --update-env

for i in $(seq 1 15); do
  if curl -sf -o /dev/null --max-time 5 "http://127.0.0.1:${APP_PORT}/"; then
    break
  fi
  sleep 2
done
curl -sf -o /dev/null --max-time 15 "http://127.0.0.1:${APP_PORT}/everest-view-luxury-trek"
echo "Deploy OK: $(git log -1 --oneline)"
