"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import LanguageToggle from "./LanguageToggle";

const LINKS = [
  { href: "#nosotros", key: "about" },
  { href: "#especialidades", key: "specialties" },
  { href: "#carta", key: "menu" },
  { href: "#galeria", key: "gallery" },
  { href: "#ubicacion", key: "location" },
] as const;

export default function Navbar() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Navbar con fondo crema (scrolleado o menú abierto) → texto oscuro;
  // transparente sobre el hero → texto claro.
  const solid = scrolled || open;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        solid
          ? "bg-misky-cream/95 backdrop-blur shadow-[0_2px_20px_rgba(36,28,23,0.08)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-20 items-center justify-between">
          <Link href="#inicio" className="flex items-center" aria-label={t.nav.home}>
            <Image
              src="/logos/logo-horizontal.png"
              alt="Misky Peruvian Cuisines"
              width={190}
              height={60}
              priority
              className="h-11 w-auto"
            />
          </Link>

          {/* Navegación de escritorio */}
          <nav className="hidden md:flex items-center gap-8">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`font-label uppercase tracking-wide text-sm font-medium transition-colors ${
                  solid
                    ? "text-misky-ink hover:text-misky-red"
                    : "text-misky-cream drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)] hover:text-misky-yellow"
                }`}
              >
                {t.nav[l.key]}
              </Link>
            ))}
            <LanguageToggle solid={solid} />
          </nav>

          {/* Lado derecho móvil: idioma + hamburguesa */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageToggle solid={solid} />
            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex flex-col gap-1.5 p-2"
              aria-label={t.nav.menuLabel}
              aria-expanded={open}
            >
              <span
                className={`block h-0.5 w-6 transition-transform ${
                  solid ? "bg-misky-ink" : "bg-misky-cream"
                } ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 transition-opacity ${
                  solid ? "bg-misky-ink" : "bg-misky-cream"
                } ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-6 transition-transform ${
                  solid ? "bg-misky-ink" : "bg-misky-cream"
                } ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="flex flex-col gap-1 px-4 pb-4">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-4 py-3 font-label uppercase tracking-wide text-sm font-medium text-misky-ink hover:bg-misky-cream-dark transition-colors"
            >
              {t.nav[l.key]}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
