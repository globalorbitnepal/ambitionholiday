"use client";

import { useEffect } from "react";
import { isStaleBuildError, reloadForFreshBuild } from "@/components/NavigationUX";

export default function GlobalError({ error }: { error: Error & { digest?: string } }) {
  useEffect(() => {
    if (isStaleBuildError(error)) reloadForFreshBuild();
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          background: "#070a10",
          color: "#f7f4ef",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: 24,
        }}
      >
        <p style={{ color: "#c9a227", letterSpacing: "0.2em", fontSize: 12, fontWeight: 600 }}>
          AMBITION HOLIDAYS
        </p>
        <h1 style={{ margin: 0, fontSize: 28 }}>Something went wrong</h1>
        <button
          type="button"
          onClick={() => window.location.reload()}
          style={{
            border: "1px solid #c9a227",
            background: "rgba(201,162,39,0.15)",
            color: "#e8d07a",
            borderRadius: 6,
            padding: "10px 18px",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Refresh
        </button>
      </body>
    </html>
  );
}
