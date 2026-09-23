import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function OrbitProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  redirect("/admin");
  return <>{children}</>;
}
