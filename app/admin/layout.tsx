import "./admin.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Ambition Holidays",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-root">{children}</div>;
}
