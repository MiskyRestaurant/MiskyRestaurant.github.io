"use client";

import { useLang } from "@/lib/i18n";

/**
 * Interruptor deslizante de idioma Español ⇆ English.
 * Al hacer clic alterna el idioma; cada etiqueta también es seleccionable.
 */
export default function LanguageToggle({ solid = true }: { solid?: boolean }) {
  const { lang, setLang, toggle } = useLang();
  const isEn = lang === "en";

  return (
    <div
      role="switch"
      aria-checked={isEn}
      aria-label={isEn ? "Switch to Spanish" : "Cambiar a inglés"}
      tabIndex={0}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
      className={`relative inline-flex shrink-0 cursor-pointer select-none items-center rounded-full p-1 ring-1 transition-colors ${
        solid
          ? "bg-misky-ink/8 ring-misky-ink/15"
          : "bg-white/15 ring-white/25 backdrop-blur"
      }`}
    >
      {/* Pastilla deslizante */}
      <span
        aria-hidden
        className={`absolute top-1 bottom-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-misky-red shadow-sm transition-transform duration-300 ease-out ${
          isEn ? "translate-x-full" : "translate-x-0"
        }`}
      />

      <button
        type="button"
        tabIndex={-1}
        onClick={(e) => {
          e.stopPropagation();
          setLang("es");
        }}
        className={`relative z-10 rounded-full px-3 py-1 font-label text-xs font-semibold uppercase tracking-wide transition-colors ${
          !isEn
            ? "text-white"
            : solid
              ? "text-misky-ink/60 hover:text-misky-ink"
              : "text-misky-cream/80 hover:text-misky-cream"
        }`}
      >
        ES
      </button>
      <button
        type="button"
        tabIndex={-1}
        onClick={(e) => {
          e.stopPropagation();
          setLang("en");
        }}
        className={`relative z-10 rounded-full px-3 py-1 font-label text-xs font-semibold uppercase tracking-wide transition-colors ${
          isEn
            ? "text-white"
            : solid
              ? "text-misky-ink/60 hover:text-misky-ink"
              : "text-misky-cream/80 hover:text-misky-cream"
        }`}
      >
        EN
      </button>
    </div>
  );
}
