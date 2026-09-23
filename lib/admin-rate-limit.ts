const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILS = 8;
const hits = new Map<string, number[]>();

export function adminLoginBlocked(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  hits.set(ip, list);
  return list.length >= MAX_FAILS;
}

export function recordAdminLoginFailure(ip: string) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
}

export function clearAdminLoginFailures(ip: string) {
  hits.delete(ip);
}
