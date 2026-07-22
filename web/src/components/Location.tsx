"use client";

import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { useLang } from "@/lib/i18n";

export default function Location() {
  const { t } = useLang();

  const HOURS = [
    { day: t.location.mon, time: t.location.closed, closed: true },
    { day: t.location.tueThu, time: "11:00 – 20:00" },
    { day: t.location.friSat, time: "11:00 – 21:00" },
    { day: t.location.sun, time: "11:00 – 18:00" },
  ];

  const CONTACT = [
    {
      type: "address" as const,
      label: t.location.addressLabel,
      value: "2550 Capital Ave SW Ste 150, Battle Creek, MI 49015",
    },
    {
      type: "phone" as const,
      label: t.location.phoneLabel,
      value: "+1 269-316-0383",
    },
  ];

  return (
    <section id="ubicacion" className="py-24 sm:py-32 bg-misky-cream">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow={t.location.eyebrow}
          title={t.location.title}
          description={t.location.description}
        />

        <div className="mt-16 grid lg:grid-cols-2 gap-10 items-stretch">
          {/* Info */}
          <Reveal className="flex flex-col gap-6">
            <div className="rounded-3xl bg-misky-cream-dark p-8">
              <h3 className="font-display text-2xl font-bold text-misky-ink">
                {t.location.hoursTitle}
              </h3>
              <ul className="mt-5 divide-y divide-misky-sand/50">
                {HOURS.map((h) => (
                  <li
                    key={h.day}
                    className="flex items-center justify-between py-3"
                  >
                    <span className="font-medium text-misky-ink">{h.day}</span>
                    <span
                      className={`font-label uppercase text-sm tracking-wide ${
                        h.closed ? "text-misky-red" : "text-misky-ink-soft"
                      }`}
                    >
                      {h.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl bg-misky-red p-8 text-misky-cream">
              <h3 className="font-display text-2xl font-bold">
                {t.location.contactTitle}
              </h3>
              <ul className="mt-5 space-y-4">
                {CONTACT.map((c) => (
                  <li key={c.label}>
                    <p className="eyebrow text-misky-yellow">{c.label}</p>
                    {c.type === "phone" ? (
                      <a
                        href="tel:+12693160383"
                        className="mt-1 inline-block text-misky-cream/90 hover:text-misky-yellow transition-colors"
                      >
                        {c.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-misky-cream/90">{c.value}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Mapa */}
          <Reveal delay={0.1} className="min-h-[420px]">
            <div className="h-full w-full rounded-3xl overflow-hidden shadow-xl border-4 border-misky-cream-dark">
              <iframe
                title={t.location.mapTitle}
                className="h-full w-full min-h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=2550+Capital+Ave+SW+Ste+150,+Battle+Creek,+MI+49015&output=embed"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
