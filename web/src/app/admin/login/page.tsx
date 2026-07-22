"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const from = params.get("from") ?? "/admin";

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Error al iniciar sesión.");
      router.push(from.startsWith("/admin") ? from : "/admin");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error.");
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-misky-sand/60 bg-misky-cream px-4 py-3 text-misky-ink focus:border-misky-red focus:ring-2 focus:ring-misky-red/20 outline-none transition";

  return (
    <div className="min-h-screen flex items-center justify-center bg-misky-cream-dark px-6">
      <div className="w-full max-w-md">
        <div className="bg-misky-cream rounded-3xl shadow-2xl overflow-hidden">
          <div className="bg-misky-red px-8 py-8 text-center">
            <Image
              src="/logos/logo-horizontal.png"
              alt="Misky"
              width={200}
              height={64}
              className="mx-auto h-12 w-auto bg-misky-cream rounded-lg p-1.5"
            />
            <p className="mt-4 font-label uppercase tracking-[0.2em] text-sm text-misky-yellow">
              Panel de administración
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-4">
            <div>
              <label className="block text-sm font-medium text-misky-ink mb-1.5">
                Correo
              </label>
              <input
                name="email"
                type="email"
                required
                defaultValue="admin@misky.pe"
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-misky-ink mb-1.5">
                Contraseña
              </label>
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className={inputClass}
              />
            </div>

            {error && (
              <p className="text-sm rounded-xl bg-misky-red/10 text-misky-red px-4 py-3">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-misky-red px-6 py-3.5 font-label uppercase tracking-wide text-sm font-semibold text-white hover:bg-misky-red-dark transition-colors disabled:opacity-60"
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>

            <p className="text-center text-xs text-misky-ink-soft">
              Demo: admin@misky.pe / misky2026
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
