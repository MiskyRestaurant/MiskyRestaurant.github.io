"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { asset } from "@/lib/asset";
import { irASeccion } from "@/lib/scroll";

const NAV = [
  { href: "#nosotros", key: "about" },
  { href: "#carta", key: "menu" },
  { href: "#galeria", key: "gallery" },
  { href: "#ubicacion", key: "location" },
] as const;

// Solo las redes que el restaurante tiene de verdad. Antes figuraban también
// Facebook y TikTok apuntando a "#": no llevaban a ninguna parte y al pulsarlas
// la página saltaba arriba, así que se quitan hasta que existan esas cuentas.
const SOCIAL = [
  { label: "Instagram", href: "https://www.instagram.com/miskyperuvian26" },
];

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="bg-misky-ink text-misky-cream">
      <div className="h-2 andean-border" />
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Image
              src={asset("/logos/logo-horizontal.png")}
              alt="Misky Peruvian Cuisines"
              width={220}
              height={70}
              className="h-16 w-auto bg-misky-cream rounded-xl p-2.5"
            />
            <p className="mt-5 max-w-sm text-misky-cream/70 leading-relaxed">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <h4 className="eyebrow text-misky-yellow">{t.footer.navTitle}</h4>
            <ul className="mt-4 space-y-2">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={(e) => irASeccion(e, n.href)}
                    className="text-misky-cream/80 hover:text-misky-yellow transition-colors"
                  >
                    {t.nav[n.key]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="eyebrow text-misky-yellow">{t.footer.followTitle}</h4>
            <ul className="mt-4 space-y-2">
              {SOCIAL.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-misky-cream/80 hover:text-misky-yellow transition-colors"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-misky-cream/60">
              2550 Capital Ave SW Ste 150
              <br />
              Battle Creek, MI 49015
              <br />
              <a
                href="tel:+12693160383"
                className="hover:text-misky-yellow transition-colors"
              >
                +1 269-316-0383
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-misky-cream/15 text-center sm:text-left text-sm text-misky-cream/60">
          <p>{t.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
