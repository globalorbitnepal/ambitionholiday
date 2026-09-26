import type { TrekPackage, TrekVideo } from "@/lib/trip-packages";

function pickNonempty(...values: (string | undefined)[]): string {
  for (const v of values) {
    const t = (v || "").trim();
    if (t) return t;
  }
  return "";
}

function mergeWatchVideo(a: TrekVideo, b: TrekVideo): TrekVideo {
  const merged = { ...a, ...b };
  merged.videoSrc = pickNonempty(b.videoSrc, a.videoSrc);
  merged.imageSrc = pickNonempty(b.imageSrc, a.imageSrc);
  merged.imageAlt = pickNonempty(b.imageAlt, a.imageAlt);
  merged.title = pickNonempty(b.title, a.title);
  return merged;
}

function mergeVideoReviewLists(a: TrekVideo[], b: TrekVideo[]): TrekVideo[] {
  const byId = new Map<string, TrekVideo>();
  for (const v of a) byId.set(v.id, v);
  for (const v of b) {
    const prev = byId.get(v.id);
    byId.set(v.id, prev ? mergeWatchVideo(prev, v) : v);
  }
  const order = [...b.map((v) => v.id), ...a.map((v) => v.id)];
  const seen = new Set<string>();
  const out: TrekVideo[] = [];
  for (const id of order) {
    if (seen.has(id)) continue;
    const v = byId.get(id);
    if (v) {
      seen.add(id);
      out.push(v);
    }
  }
  for (const [id, v] of byId) {
    if (!seen.has(id)) out.push(v);
  }
  return out;
}

/** Merge two package snapshots (e.g. from different CMS JSON paths). */
export function mergeTripPackageSnapshots(a: TrekPackage, b: TrekPackage): TrekPackage {
  return {
    ...a,
    ...b,
    heroSrc: pickNonempty(b.heroSrc, a.heroSrc),
    gallery: b.gallery?.length ? b.gallery : a.gallery,
    galleryAlts: b.galleryAlts?.length ? b.galleryAlts : a.galleryAlts,
    watchVideo: mergeWatchVideo(a.watchVideo, b.watchVideo),
    videoReviews: mergeVideoReviewLists(a.videoReviews ?? [], b.videoReviews ?? []),
    routeMapSrc: pickNonempty(b.routeMapSrc, a.routeMapSrc),
    altitudeChartM: pickNonempty(b.altitudeChartM, a.altitudeChartM),
    altitudeChartFt: pickNonempty(b.altitudeChartFt, a.altitudeChartFt),
    weatherMonthlySrc: pickNonempty(b.weatherMonthlySrc, a.weatherMonthlySrc),
  };
}

/** Keep server video fields when this editor session did not change them (avoids stale Orbit/Admin overwrites). */
export function reconcileTripPackageForSave(
  server: TrekPackage,
  local: TrekPackage,
  baseline: TrekPackage | null,
): TrekPackage {
  const out: TrekPackage = { ...server, ...local };

  if (!baseline) {
    out.watchVideo = { ...server.watchVideo, ...local.watchVideo };
    out.videoReviews = local.videoReviews?.length ? local.videoReviews : server.videoReviews;
    return out;
  }

  const localWatchSrc = (local.watchVideo?.videoSrc || "").trim();
  const baselineWatchSrc = (baseline.watchVideo?.videoSrc || "").trim();
  const watchChanged =
    JSON.stringify(local.watchVideo ?? null) !== JSON.stringify(baseline.watchVideo ?? null) ||
    localWatchSrc !== baselineWatchSrc;

  if (!watchChanged) {
    out.watchVideo = server.watchVideo;
  } else {
    out.watchVideo = { ...server.watchVideo, ...local.watchVideo };
    if (localWatchSrc) out.watchVideo.videoSrc = localWatchSrc;
  }

  const reviewsChanged =
    JSON.stringify(local.videoReviews ?? null) !== JSON.stringify(baseline.videoReviews ?? null);
  if (!reviewsChanged) {
    out.videoReviews = server.videoReviews;
  } else {
    out.videoReviews = (local.videoReviews ?? server.videoReviews).map((video, i) => {
      const serverVideo = server.videoReviews?.[i];
      const src = (video.videoSrc || "").trim();
      if (!src && serverVideo?.videoSrc?.trim()) return { ...serverVideo, ...video, videoSrc: serverVideo.videoSrc };
      return { ...serverVideo, ...video };
    });
  }

  return out;
}

export function reconcileAllTripPackagesForSave(
  serverPackages: TrekPackage[],
  localPackages: TrekPackage[],
  baselinePackages: TrekPackage[],
): TrekPackage[] {
  return localPackages.map((local) => {
    const server = serverPackages.find((p) => p.id === local.id);
    const baseline = baselinePackages.find((p) => p.id === local.id) ?? null;
    if (!server) return local;
    return reconcileTripPackageForSave(server, local, baseline);
  });
}
