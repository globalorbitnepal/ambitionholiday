"use client";

import AdminMediaField from "@/components/admin/AdminMediaField";

export default function AdminMediaPage() {
  return (
    <>
      <h1>Media</h1>
      <p className="admin-lead">Upload a file or pick from the library. Images compress automatically under the 1MB proxy limit.</p>
      <div className="admin-card">
        <AdminMediaField label="Preview picker" value="" onChange={() => undefined} />
      </div>
    </>
  );
}
