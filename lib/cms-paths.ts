import path from "path";

/**
 * Orbit CMS durable storage.
 * - Local/dev: project `data/` + `public/uploads`
 * - Production: set AMBITION_CMS_DIR to a path OUTSIDE the git repo
 *   (e.g. /var/www/ambition-holidays-cms) so `git reset --hard` never wipes edits.
 */
export function cmsRoot(): string {
  const fromEnv = process.env.AMBITION_CMS_DIR?.trim();
  if (fromEnv) return path.resolve(fromEnv);
  return path.join(process.cwd(), "data");
}

export function contentFileCandidates(): string[] {
  const files: string[] = [];
  const fromEnv = process.env.AMBITION_CMS_DIR?.trim();
  if (fromEnv) {
    files.push(path.join(path.resolve(fromEnv), "site-content.json"));
  }
  files.push(
    path.join(process.cwd(), "data", "site-content.json"),
    path.join(process.cwd(), "data", "uploads", "site-content.json"),
    path.join(process.cwd(), "public", "uploads", "site-content.json"),
  );
  return [...new Set(files)];
}

export function contentFilePath(): string {
  return contentFileCandidates()[0];
}

export function contentDataDir(): string {
  return path.dirname(contentFilePath());
}

/** Writable upload folders — CMS dir first when configured. */
export function uploadDirs(): string[] {
  const dirs: string[] = [];
  const fromEnv = process.env.AMBITION_CMS_DIR?.trim();
  if (fromEnv) {
    const root = path.resolve(fromEnv);
    dirs.push(
      path.join(root, "uploads"),
      path.join(root, "data-uploads"),
      path.join(root, "public-uploads"),
    );
  }
  dirs.push(
    path.join(process.cwd(), "data", "uploads"),
    path.join(process.cwd(), "public", "uploads"),
  );
  return [...new Set(dirs)];
}
