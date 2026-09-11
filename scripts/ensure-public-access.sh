#!/usr/bin/env bash
# Force public HTTP/HTTPS access for ambition.theglobalorbit.com on Hostinger VPS.
# Diagnoses listen addresses + firewall, then opens 80/443 for all source IPs.
set -u

DOMAIN="ambition.theglobalorbit.com"

run_privileged() {
  if [ "$(id -u)" -eq 0 ]; then
    "$@"
  elif command -v sudo >/dev/null 2>&1; then
    sudo -n "$@" 2>/dev/null || sudo "$@"
  else
    echo "WARNING: cannot run privileged: $*"
    return 1
  fi
}

echo "===== PUBLIC ACCESS DIAGNOSTIC ====="
echo "date=$(date -u +%Y-%m-%dT%H:%M:%SZ)"
echo "whoami=$(whoami) uid=$(id -u)"
hostname -I 2>/dev/null || true

echo "--- listening sockets ---"
(ss -ltnp 2>/dev/null || netstat -ltnp 2>/dev/null || true) | grep -E ':(80|443|3004)\b' || true

echo "--- nginx configs mentioning domain ---"
mapfile -t NGINX_CONFS < <(
  grep -rl "${DOMAIN}" /etc/nginx/sites-enabled /etc/nginx/sites-available /etc/nginx/conf.d 2>/dev/null \
    | sort -u || true
)
printf '%s\n' "${NGINX_CONFS[@]:-none}"

for conf in "${NGINX_CONFS[@]:-}"; do
  [ -n "${conf}" ] || continue
  echo "--- file: ${conf} ---"
  grep -nE 'listen|server_name|allow |deny |proxy_pass|ssl_certificate' "${conf}" 2>/dev/null || true
done

echo "--- ufw ---"
run_privileged ufw status verbose 2>/dev/null || echo "ufw unavailable"

echo "--- iptables INPUT (first 80 lines) ---"
run_privileged iptables -L INPUT -n -v --line-numbers 2>/dev/null | head -n 80 || true

echo "--- nftables (if any) ---"
run_privileged nft list ruleset 2>/dev/null | head -n 120 || echo "nft unavailable"

echo "===== APPLYING FIXES ====="

# 1) Strip nginx IP allow/deny gates for this vhost only.
for conf in "${NGINX_CONFS[@]:-}"; do
  [ -n "${conf}" ] || continue
  echo "Cleaning allow/deny in ${conf}"
  run_privileged cp -a "${conf}" "${conf}.bak-$(date -u +%Y%m%dT%H%M%SZ)" || true
  run_privileged sed -i -E '/^[[:space:]]*(allow|deny)[[:space:]]/d' "${conf}" || true
  # Ensure IPv4 public listeners exist (do not rewrite whole file).
  if ! grep -Eq '^[[:space:]]*listen[[:space:]]+80[[:space:];]' "${conf}"; then
    echo "NOTE: ${conf} has no plain listen 80 line (may use ssl-only or default_server elsewhere)"
  fi
done

if command -v nginx >/dev/null 2>&1; then
  if run_privileged nginx -t; then
    run_privileged systemctl reload nginx || true
    echo "nginx reloaded"
  else
    echo "WARNING: nginx -t failed"
  fi
fi

# 2) UFW: allow world to 80/443
if command -v ufw >/dev/null 2>&1; then
  run_privileged ufw allow 80/tcp || true
  run_privileged ufw allow 443/tcp || true
  run_privileged ufw allow proto tcp from any to any port 80 || true
  run_privileged ufw allow proto tcp from any to any port 443 || true
fi

# 3) iptables: accept NEW connections to 80/443 from anywhere (insert near top).
if command -v iptables >/dev/null 2>&1; then
  # Remove previous copies of our rules to avoid duplicates.
  while run_privileged iptables -D INPUT -p tcp --dport 80 -j ACCEPT 2>/dev/null; do :; done
  while run_privileged iptables -D INPUT -p tcp --dport 443 -j ACCEPT 2>/dev/null; do :; done
  run_privileged iptables -I INPUT 1 -p tcp --dport 80 -j ACCEPT || true
  run_privileged iptables -I INPUT 1 -p tcp --dport 443 -j ACCEPT || true
  echo "iptables ACCEPT inserted for 80/443"
fi

# 4) nftables: add accept rules if inet filter input exists.
if command -v nft >/dev/null 2>&1; then
  if run_privileged nft list table inet filter >/dev/null 2>&1; then
    run_privileged nft insert rule inet filter input tcp dport 80 accept 2>/dev/null || \
      run_privileged nft add rule inet filter input tcp dport 80 accept 2>/dev/null || true
    run_privileged nft insert rule inet filter input tcp dport 443 accept 2>/dev/null || \
      run_privileged nft add rule inet filter input tcp dport 443 accept 2>/dev/null || true
    echo "nftables accept rules ensured for 80/443"
  fi
fi

# 5) fail2ban unban all for nginx/ssh if present (best-effort)
if command -v fail2ban-client >/dev/null 2>&1; then
  run_privileged fail2ban-client unban --all 2>/dev/null || true
fi

echo "--- post-fix listening ---"
(ss -ltnp 2>/dev/null || true) | grep -E ':(80|443|3004)\b' || true

echo "===== PUBLIC ACCESS FIX COMPLETE ====="
