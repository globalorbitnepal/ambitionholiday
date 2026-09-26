import { readContent } from "@/lib/content";
import OrbitDashboard from "@/components/OrbitDashboard";

export const dynamic = "force-dynamic";

export default async function OrbitPage() {
  const content = await readContent();
  return <OrbitDashboard initial={content} />;
}
