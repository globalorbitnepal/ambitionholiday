import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import OrbitLoginClient from "@/app/orbit-login/OrbitLoginClient";
import { getSessionCookieName, verifySessionToken } from "@/lib/orbit-auth";

export const dynamic = "force-dynamic";

export default async function OrbitLoginPage() {
  const jar = await cookies();
  const token = jar.get(getSessionCookieName())?.value;
  if (verifySessionToken(token)) {
    redirect("/orbit");
  }
  return <OrbitLoginClient />;
}
