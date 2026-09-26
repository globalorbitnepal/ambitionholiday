import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionCookieName, verifySessionToken } from "@/lib/orbit-auth";

export const dynamic = "force-dynamic";

export default async function OrbitProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jar = await cookies();
  const token = jar.get(getSessionCookieName())?.value;
  if (!verifySessionToken(token)) {
    redirect("/orbit-login");
  }
  return <>{children}</>;
}
