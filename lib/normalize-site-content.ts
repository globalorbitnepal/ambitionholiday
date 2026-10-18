import { DEFAULT_CONTENT, type SiteContent } from "@/lib/content-types";
import { coerceNepalContent } from "@/lib/nepal-trek-catalog";
import { mergeHeaderNav } from "@/lib/header-nav";
import { headerLogoSrc } from "@/lib/media-src";
import { applyPublishedPackageHrefs } from "@/lib/trip-package-catalog-sync";
import { coerceTripPackages } from "@/lib/trip-packages";

/** Client-safe merge so pages never crash when CMS JSON is partial or mid-deploy. */
export function normalizeSiteContent(data: SiteContent): SiteContent {
  const merged: SiteContent = {
    ...DEFAULT_CONTENT,
    ...data,
    header: {
      ...DEFAULT_CONTENT.header,
      ...data.header,
      logoSrc: headerLogoSrc(data.header?.logoSrc),
    },
    headerNav: mergeHeaderNav(data.headerNav),
    mediaCatalog: {
      ...DEFAULT_CONTENT.mediaCatalog,
      ...(data.mediaCatalog ?? {}),
    },
    atmosphere: {
      ...DEFAULT_CONTENT.atmosphere,
      ...data.atmosphere,
    },
    blog: {
      ...DEFAULT_CONTENT.blog,
      ...data.blog,
      featured: data.blog?.featured?.length
        ? data.blog.featured
        : DEFAULT_CONTENT.blog.featured,
      sidePosts: data.blog?.sidePosts?.length
        ? data.blog.sidePosts
        : DEFAULT_CONTENT.blog.sidePosts,
      posts: data.blog?.posts?.length ? data.blog.posts : DEFAULT_CONTENT.blog.posts,
      features: data.blog?.features?.length
        ? data.blog.features
        : DEFAULT_CONTENT.blog.features,
    },
    footer: {
      ...DEFAULT_CONTENT.footer,
      ...data.footer,
    },
    nepal: coerceNepalContent(data.nepal),
    tripPackages: coerceTripPackages(
      data.tripPackages?.length ? data.tripPackages : DEFAULT_CONTENT.tripPackages,
    ),
  };
  return applyPublishedPackageHrefs(merged);
}
