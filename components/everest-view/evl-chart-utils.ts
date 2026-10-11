const MANROPE = "Manrope, ui-sans-serif, system-ui, sans-serif";
const CORMORANT = "Cormorant Garamond, Georgia, serif";

function prepareSvgClone(svg: SVGSVGElement): SVGSVGElement {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.querySelectorAll(".evl-no-export").forEach((el) => el.remove());
  clone.querySelectorAll("text").forEach((el) => {
    const t = el as SVGTextElement;
    if (!t.getAttribute("font-family")) {
      const isTitle = (t.getAttribute("font-size") || "").length && Number(t.getAttribute("font-size")) >= 20;
      t.setAttribute("font-family", isTitle ? CORMORANT : MANROPE);
    }
  });
  return clone;
}

export type DownloadPngOptions = {
  scale?: number;
  background?: string;
};

export async function downloadSvgAsPng(
  svg: SVGSVGElement | null,
  name: string,
  options: DownloadPngOptions = {},
): Promise<{ width: number; height: number }> {
  if (!svg) throw new Error("Chart is not ready for export.");
  const scale = options.scale ?? 3;
  const background = options.background ?? "#121a28";

  if (typeof document !== "undefined" && document.fonts?.ready) {
    await document.fonts.ready;
  }

  const clone = prepareSvgClone(svg);
  const vb = clone.viewBox.baseVal;
  const w = Math.max(1, vb.width || Number(clone.getAttribute("width")) || 920);
  const h = Math.max(1, vb.height || Number(clone.getAttribute("height")) || 480);
  clone.setAttribute("width", String(w));
  clone.setAttribute("height", String(h));

  const xml = new XMLSerializer().serializeToString(clone);
  const url = URL.createObjectURL(new Blob([xml], { type: "image/svg+xml;charset=utf-8" }));

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(w * scale);
        canvas.height = Math.round(h * scale);
        const ctx = canvas.getContext("2d");
        if (!ctx) throw new Error("Canvas is not available.");
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          URL.revokeObjectURL(url);
          if (!blob) {
            reject(new Error("PNG encoding failed."));
            return;
          }
          const href = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = href;
          a.download = name.endsWith(".png") ? name : `${name}.png`;
          a.click();
          URL.revokeObjectURL(href);
          resolve({ width: canvas.width, height: canvas.height });
        }, "image/png");
      } catch (err) {
        URL.revokeObjectURL(url);
        reject(err);
      }
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not rasterise the chart SVG."));
    };
    img.src = url;
  });
}

export function formatElevationM(m: number): string {
  return `${m.toLocaleString("en-US")} m`;
}
