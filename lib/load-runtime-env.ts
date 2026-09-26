import fs from "fs";
import path from "path";
import { cmsRoot } from "@/lib/cms-paths";

let hydrated = false;

function parseEnvLine(line: string): { key: string; value: string } | null {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith("#")) return null;
  const eq = trimmed.indexOf("=");
  if (eq <= 0) return null;
  const key = trimmed.slice(0, eq).trim();
  let value = trimmed.slice(eq + 1).trim();
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }
  return { key, value };
}

function applyEnvFile(filePath: string) {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const parsed = parseEnvLine(line);
      if (!parsed) continue;
      if (!process.env[parsed.key]) {
        process.env[parsed.key] = parsed.value;
      }
    }
  } catch {
    // missing file
  }
}

/** Load Orbit/admin secrets from disk when PM2 does not inject process.env (production VPS). */
export function hydrateRuntimeEnv() {
  if (hydrated) return;
  hydrated = true;

  const files = [
    path.join(process.cwd(), ".env.local"),
    path.join(process.cwd(), ".env"),
    path.join(process.cwd(), "data", "orbit-secrets.env"),
    path.join(cmsRoot(), "orbit-secrets.env"),
    "/var/www/ambition-holidays-cms/orbit-secrets.env",
  ];

  for (const file of files) {
    applyEnvFile(file);
  }
}
