#!/usr/bin/env bash
# One-time setup: GitHub Actions self-hosted runner on this VPS for ambitionholiday repo.
# Usage (on the server, as the user that owns /var/www/ambition-holidays):
#   export RUNNER_TOKEN="<registration token from GitHub → Settings → Actions → Runners → New>"
#   bash scripts/install-github-runner.sh
set -euo pipefail

REPO="globalorbitnepal/ambitionholiday"
RUNNER_NAME="${RUNNER_NAME:-ambition-holidays-vps}"
RUNNER_DIR="${RUNNER_DIR:-$HOME/actions-runner-ambition-holidays}"
LABELS="${LABELS:-self-hosted,Linux,ambition-holidays}"

if [ -z "${RUNNER_TOKEN:-}" ]; then
  echo "Set RUNNER_TOKEN from: https://github.com/${REPO}/settings/actions/runners/new"
  exit 1
fi

mkdir -p "${RUNNER_DIR}"
cd "${RUNNER_DIR}"
if [ ! -f ./config.sh ]; then
  RUNNER_VERSION="${RUNNER_VERSION:-2.338.0}"
  curl -fsSL -o actions-runner-linux-x64.tar.gz \
    "https://github.com/actions/runner/releases/download/v${RUNNER_VERSION}/actions-runner-linux-x64-${RUNNER_VERSION}.tar.gz"
  tar xzf actions-runner-linux-x64.tar.gz
fi

./config.sh --url "https://github.com/${REPO}" --token "${RUNNER_TOKEN}" \
  --name "${RUNNER_NAME}" --labels "${LABELS}" --unattended --replace

sudo ./svc.sh install "$(whoami)" 2>/dev/null || ./run.sh &
echo "Runner installed in ${RUNNER_DIR}. Use workflow: Deploy Ambition Holidays (VPS runner)"
