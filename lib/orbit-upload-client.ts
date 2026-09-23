/** Nginx on this host still defaults to 1MB request bodies. Stay under that. */
const PROXY_SAFE_BYTES = 900 * 1024;

export async function prepareOrbitFile(file: File): Promise<File> {
  const isVideo = file.type.startsWith("video/") || /\.(mp4|webm|mov)$/i.test(file.name);
  if (isVideo) return file;

  const isImage =
    file.type.startsWith("image/") || /\.(jpe?g|png|webp|avif|heic|heif)$/i.test(file.name);
  if (!isImage || file.type === "image/gif" || file.size <= PROXY_SAFE_BYTES) {
    return file;
  }

  try {
    const bitmap = await createImageBitmap(file);
    const blob = await compressBitmap(bitmap, PROXY_SAFE_BYTES);
    if ("close" in bitmap && typeof bitmap.close === "function") bitmap.close();
    if (!blob) return file;
    const base = file.name.replace(/\.[^.]+$/, "") || "upload";
    return new File([blob], `${base}.webp`, { type: "image/webp", lastModified: Date.now() });
  } catch {
    return file;
  }
}

async function compressBitmap(bitmap: ImageBitmap, maxBytes: number): Promise<Blob | null> {
  const startEdge = Math.min(2560, Math.max(bitmap.width, bitmap.height));
  const qualities = [0.88, 0.8, 0.72, 0.64, 0.55, 0.46, 0.38];
  const scales = [1, 0.88, 0.76, 0.64, 0.52, 0.4];
  let smallest: Blob | null = null;

  for (const scale of scales) {
    const maxEdge = Math.max(640, Math.round(startEdge * scale));
    const ratio = maxEdge / Math.max(bitmap.width, bitmap.height, 1);
    const width = Math.max(1, Math.round(bitmap.width * Math.min(1, ratio)));
    const height = Math.max(1, Math.round(bitmap.height * Math.min(1, ratio)));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.drawImage(bitmap, 0, 0, width, height);

    for (const quality of qualities) {
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/webp", quality),
      );
      if (!blob) continue;
      if (!smallest || blob.size < smallest.size) smallest = blob;
      if (blob.size <= maxBytes) return blob;
    }
  }

  return smallest;
}

export async function postOrbitUpload(file: File, crop?: "9x16"): Promise<string> {
  const prepared = await prepareOrbitFile(file);
  const form = new FormData();
  form.append("file", prepared, prepared.name);
  if (crop) form.append("crop", crop);

  const res = await fetch("/api/orbit/upload", {
    method: "POST",
    body: form,
    credentials: "include",
  });
  const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };

  if (res.status === 413) {
    throw new Error("File is still over the 1MB proxy limit after compression.");
  }
  if (!res.ok || !data.url) {
    throw new Error(data.error || "Upload failed");
  }
  return data.url;
}
