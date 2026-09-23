import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import {
  getAdminSessionCookieName,
  verifyAdminSessionToken,
} from "@/lib/admin-auth";
import AdminShell from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jar = await cookies();
  const token = jar.get(getAdminSessionCookieName())?.value;
  if (!verifyAdminSessionToken(token)) {
    redirect("/admin/login");
  }
  return <AdminShell>{children}</AdminShell>;
}
