"use client";
import { useState } from "react";
export default function SignUpPage() {
  const [email, setE] = useState("");
  const [password, setP] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setL] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setL(true); setErr(null);
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    setL(false);
    if (!res.ok) {
      const j = await res.json().catch(()=>({error:"Signup failed"}));
      return setErr(j.error || "Signup failed");
    }
    window.location.href = "/signin?welcome=1";
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3 max-w-sm mx-auto mt-20">
      <input type="email" placeholder="Email" value={email} onChange={e=>setE(e.target.value)} className="w-full border p-2 rounded" />
      <input type="password" placeholder="Password" value={password} onChange={e=>setP(e.target.value)} className="w-full border p-2 rounded" />
      {err && <p className="text-sm text-red-600">{err}</p>}
      <button disabled={loading} className="w-full bg-black text-white py-2 rounded">
        {loading ? "Creating…" : "Sign up"}
      </button>
    </form>
  );
}
