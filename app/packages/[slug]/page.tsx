import { redirect } from "next/navigation";
import { readContent } from "@/lib/content";
import { findTripBySlug, tripPath } from "@/lib/trip-packages";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export default async function PackageSlugRedirect({ params }: Props) {
  const { slug } = await params;
  const content = await readContent();
  const pkg = findTripBySlug(content.tripPackages, slug);
  if (pkg) redirect(tripPath(pkg));
  redirect(`/${slug}`);
}
