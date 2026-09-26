"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginClient() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setError(data.error || "Could not sign in.");
        return;
      }
      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Could not sign in.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="admin-login">
      <div className="admin-login-visual">
        <img className="admin-login-bg" src="/images/atmosphere/ebc-premium-section.webp" alt="" />
        <div className="admin-login-brand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="admin-login-logo"
            src="/images/ambition-holiday-logo.webp"
            alt="Ambition Holidays"
          />
        </div>
        <div className="admin-login-quote">
          <p>More than travel. A Himalayan experience.</p>
        </div>
      </div>
      <div className="admin-login-panel">
        <form className="admin-login-card" onSubmit={onSubmit} autoComplete="off">
          <p className="admin-login-kicker">Ambition Holidays</p>
          <h1>Welcome back</h1>
          <p className="sub">Sign in to manage treks, enquiries and live content.</p>
          {error ? <div className="admin-error">{error}</div> : null}
          <label className="admin-field">
            <span>User ID</span>
            <input
              name="username"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label className="admin-field">
            <span>Password</span>
            <div className="admin-pass-wrap">
              <input
                name="password"
                type={show ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="button" className="admin-pass-toggle" onClick={() => setShow((v) => !v)}>
                {show ? "Hide" : "Show"}
              </button>
            </div>
          </label>
          <button className="admin-btn admin-btn-gold" type="submit" disabled={busy}>
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
