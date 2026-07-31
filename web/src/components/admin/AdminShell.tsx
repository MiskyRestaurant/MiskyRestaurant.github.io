"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";

const NAV = [{ href: "/admin/menu", label: "Carta" }];

export default function AdminShell({
  userName,
  children,
}: {
  userName: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-misky-cream-dark">
      <header className="bg-misky-ink text-misky-cream sticky top-0 z-40">
        <div className="h-1.5 andean-border" />
        <div className="mx-auto max-w-6xl px-4 sm:px-6 flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <Image
              src="/logos/logo-horizontal.png"
              alt="Misky"
              width={150}
              height={48}
              className="h-9 w-auto bg-misky-cream rounded-md p-1"
            />
            <nav className="hidden sm:flex items-center gap-1">
              {NAV.map((n) => {
                const active = pathname.startsWith(n.href);
                return (
                  <Link
                    key={n.href}
                    href={n.href}
                    className={`rounded-full px-4 py-2 font-label uppercase tracking-wide text-sm font-semibold transition-colors ${
                      active
                        ? "bg-misky-red text-white"
                        : "text-misky-cream/80 hover:bg-white/10"
                    }`}
                  >
                    {n.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline text-sm text-misky-cream/70 hover:text-misky-yellow transition-colors"
            >
              Ver web ↗
            </Link>
            <span className="hidden md:inline text-sm text-misky-cream/60">
              {userName}
            </span>
            <button
              onClick={logout}
              className="rounded-full border border-misky-cream/30 px-4 py-1.5 text-sm font-medium hover:bg-misky-red hover:border-misky-red transition-colors"
            >
              Salir
            </button>
          </div>
        </div>

        {/* Nav móvil */}
        <nav className="sm:hidden flex items-center gap-1 px-4 pb-3">
          {NAV.map((n) => {
            const active = pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`flex-1 text-center rounded-full px-4 py-2 font-label uppercase tracking-wide text-sm font-semibold transition-colors ${
                  active ? "bg-misky-red text-white" : "bg-white/10 text-misky-cream/80"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8">{children}</main>
    </div>
  );
}
