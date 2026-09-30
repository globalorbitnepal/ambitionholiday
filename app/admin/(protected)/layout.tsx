import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  getAdminSessionCookieName,
  verifyAdminSessionToken,
} from "@/lib/admin-auth";
import { getSessionCookieName, verifySessionToken } from "@/lib/orbit-auth";
import AdminShell from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jar = await cookies();
  const isAdmin = verifyAdminSessionToken(jar.get(getAdminSessionCookieName())?.value);
  const isSuperAdmin = verifySessionToken(jar.get(getSessionCookieName())?.value);
  if (!isAdmin && !isSuperAdmin) {
    redirect("/admin/login");
  }
  return <AdminShell role={isSuperAdmin && !isAdmin ? "super" : "admin"}>{children}</AdminShell>;
}
