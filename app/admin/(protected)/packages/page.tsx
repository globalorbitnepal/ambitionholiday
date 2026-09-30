import { Suspense } from "react";
import AdminPackagesList from "@/components/admin/AdminPackagesList";

export default function AdminPackagesPage() {
  return (
    <Suspense fallback={<p className="admin-muted">Loading packages…</p>}>
      <AdminPackagesList />
    </Suspense>
  );
}
