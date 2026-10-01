import type { TrekPackage, TrekVideo } from "@/lib/trip-packages";
import { withSlugHistory } from "@/lib/trip-packages";

function pickNonempty(...values: (string | undefined)[]): string {
  for (const v of values) {
    const t = (v || "").trim();
    if (t) return t;
  }
  return "";
}

function mergeWatchVideo(a: TrekVideo, b: TrekVideo): TrekVideo {
  return {
    ...a,
    ...b,
    videoSrc: b.videoSrc ?? a.videoSrc ?? "",
    imageSrc: b.imageSrc ?? a.imageSrc ?? "",
    imageAlt: b.imageAlt || a.imageAlt || "",
    title: b.title || a.title || "",
  };
}

/** Newer list (`b`) is the source of truth — deleted videos stay deleted. */
function mergeVideoReviewLists(a: TrekVideo[], b: TrekVideo[]): TrekVideo[] {
  return b.map((video) => {
    const prev = a.find((item) => item.id === video.id);
    return prev ? mergeWatchVideo(prev, video) : video;
  });
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
    reviews: Array.isArray(b.reviews) ? b.reviews : a.reviews || [],
    slugHistory: withSlugHistory(
      { slug: b.slug || a.slug, slugHistory: [...(a.slugHistory || []), ...(b.slugHistory || [])] },
      a,
    ).slugHistory,
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
    out.watchVideo = local.watchVideo ?? server.watchVideo;
    out.videoReviews = Array.isArray(local.videoReviews) ? local.videoReviews : server.videoReviews;
    return out;
  }

  const watchChanged = JSON.stringify(local.watchVideo ?? null) !== JSON.stringify(baseline.watchVideo ?? null);
  out.watchVideo = watchChanged ? local.watchVideo : server.watchVideo;

  const reviewsChanged = JSON.stringify(local.videoReviews ?? null) !== JSON.stringify(baseline.videoReviews ?? null);
  out.videoReviews = reviewsChanged
    ? [...(local.videoReviews ?? [])]
    : server.videoReviews;

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
