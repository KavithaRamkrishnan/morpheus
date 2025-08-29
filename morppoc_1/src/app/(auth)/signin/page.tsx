"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const [username, setU] = useState("");     // <-- keep name "username"
  const [password, setP] = useState("");     // <-- and "password"
  const [err, setErr] = useState<string | null>(null);
  const [loading, setL] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setL(true); setErr(null);
    const res = await signIn("credentials", {
      redirect: false,
      username,               // <-- must be "username"
      password,               // <-- must be "password"
      callbackUrl: "/dashboard",
    });
    setL(false);
    if (!res || res.error) return setErr("Invalid username or password");
    window.location.href = "/dashboard";
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 max-w-sm mx-auto mt-20">
      <input placeholder="Email" value={username} onChange={e=>setU(e.target.value)} className="w-full border p-2 rounded" />
      <input placeholder="Password" type="password" value={password} onChange={e=>setP(e.target.value)} className="w-full border p-2 rounded" />
      {err && <p className="text-sm text-red-600">{err}</p>}
      <button disabled={loading} className="w-full bg-black text-white py-2 rounded">
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
