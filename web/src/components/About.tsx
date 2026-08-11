"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import { useLang } from "@/lib/i18n";
import { asset } from "@/lib/asset";

/**
 * `dishCount` llega calculado desde la carta (`DISH_COUNT`) en vez de escrito a
 * mano: antes ponía «+25» y se quedó desfasado al retirar platos.
 */
export default function About({ dishCount }: { dishCount: number }) {
  const { t } = useLang();
  const STATS = [
    { value: "100%", label: t.about.stat1 },
    { value: "Perú", label: t.about.stat2 },
    { value: String(dishCount), label: t.about.stat3 },
  ];
  return (
    <section id="nosotros" className="py-24 sm:py-32 bg-misky-cream">
      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-2 gap-14 items-center">
        {/* Imágenes */}
        <Reveal className="relative">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={asset("/images/misky-11.jpeg")}
              alt="Decoración andina dentro de Misky"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-8 -right-4 sm:-right-8 w-40 h-40 sm:w-52 sm:h-52 rounded-2xl overflow-hidden shadow-xl border-4 border-misky-cream hidden sm:block">
            <Image
              src={asset("/images/misky-6.jpeg")}
              alt="Cerámica peruana tradicional"
              fill
              className="object-cover"
            />
          </div>
          <div className="absolute -top-5 -left-5 h-24 w-24 rounded-2xl andean-border opacity-90 -z-0 hidden sm:block" />
        </Reveal>

        {/* Texto */}
        <div>
          <Reveal>
            <p className="eyebrow text-misky-gold mb-3">{t.about.eyebrow}</p>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-misky-ink leading-tight">
              {t.about.title}
            </h2>
            <div className="mt-4 h-1.5 w-20 rounded-full andean-border" />
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-6 text-misky-ink-soft leading-relaxed">
              <span className="font-semibold text-misky-red">Misky</span>{" "}
              {t.about.p1}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 text-misky-ink-soft leading-relaxed">
              {t.about.p2}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 grid grid-cols-3 gap-4">
              {STATS.map((s) => (
                <div key={s.label} className="text-center sm:text-left">
                  <p className="font-display text-3xl sm:text-4xl font-extrabold text-misky-red">
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-misky-ink-soft font-medium">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
