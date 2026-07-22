"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { useLang } from "@/lib/i18n";

type Photo = {
  src: string;
  /** Clave en t.galleryItems para título/etiqueta traducidos. */
  key: "salon" | "cremas" | "barra" | "vitrina" | "pompones" | "ceramica";
  /** Clases de tamaño en la grilla bento (móvil base + lg). */
  span: string;
};

const PHOTOS: Photo[] = [
  {
    src: "/images/misky-2.jpeg",
    key: "salon",
    span: "col-span-2 row-span-2 lg:col-span-2 lg:row-span-2",
  },
  {
    src: "/images/misky-9.jpeg",
    key: "cremas",
    span: "col-span-1 row-span-1 lg:col-span-2 lg:row-span-1",
  },
  {
    src: "/images/misky-16.jpeg",
    key: "barra",
    span: "col-span-1 row-span-1 lg:col-span-2 lg:row-span-1",
  },
  {
    src: "/images/misky-1.jpeg",
    key: "vitrina",
    span: "col-span-2 row-span-2 lg:col-span-2 lg:row-span-2",
  },
  {
    src: "/images/misky-12.jpeg",
    key: "pompones",
    span: "col-span-1 row-span-1 lg:col-span-2 lg:row-span-1",
  },
  {
    src: "/images/misky-6.jpeg",
    key: "ceramica",
    span: "col-span-1 row-span-1 lg:col-span-2 lg:row-span-1",
  },
];

export default function Gallery() {
  const { t } = useLang();
  const [active, setActive] = useState<number | null>(null);
  const isOpen = active !== null;

  const close = useCallback(() => setActive(null), []);
  const go = useCallback(
    (dir: number) =>
      setActive((i) =>
        i === null ? i : (i + dir + PHOTOS.length) % PHOTOS.length,
      ),
    [],
  );

  // Teclado: Esc cierra, flechas navegan. Bloquea el scroll de fondo.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, close, go]);

  return (
    <section id="galeria" className="py-24 sm:py-32 bg-misky-ink">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow={t.gallery.eyebrow}
          title={t.gallery.title}
          description={t.gallery.description}
          light
        />

        <div className="mt-16 grid grid-cols-4 grid-flow-dense auto-rows-[120px] sm:auto-rows-[150px] lg:auto-rows-[180px] gap-3 sm:gap-4">
          {PHOTOS.map((p, i) => (
            <Reveal
              key={p.src}
              delay={(i % 3) * 0.08}
              className={p.span}
            >
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`${t.gallery.enlarge}: ${t.galleryItems[p.key].title}`}
                className="group relative h-full w-full overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-misky-yellow"
              >
                <Image
                  src={p.src}
                  alt={t.galleryItems[p.key].title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Degradado + caption de vidrio */}
                <div className="absolute inset-0 bg-gradient-to-t from-misky-ink/80 via-transparent to-transparent opacity-70 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="rounded-xl bg-white/10 backdrop-blur-md ring-1 ring-white/20 px-3 py-2">
                    <p className="font-label uppercase text-[10px] tracking-wider text-misky-yellow">
                      {t.galleryItems[p.key].tag}
                    </p>
                    <p className="text-sm font-semibold text-white leading-tight">
                      {t.galleryItems[p.key].title}
                    </p>
                  </div>
                </div>
                {/* Icono ampliar */}
                <span className="absolute top-3 right-3 grid h-8 w-8 place-items-center rounded-full bg-white/15 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-misky-ink/95 backdrop-blur-sm p-4 sm:p-8"
          >
            {/* Cerrar */}
            <button
              type="button"
              onClick={close}
              aria-label={t.gallery.close}
              className="absolute top-5 right-5 grid h-11 w-11 place-items-center rounded-full bg-white/10 hover:bg-white/20 ring-1 ring-white/20 text-white transition-colors"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 6l12 12M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Anterior */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              aria-label={t.gallery.prev}
              className="absolute left-3 sm:left-6 grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-full bg-white/10 hover:bg-white/20 ring-1 ring-white/20 text-white transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M15 6l-6 6 6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Siguiente */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              aria-label={t.gallery.next}
              className="absolute right-3 sm:right-6 grid h-11 w-11 sm:h-12 sm:w-12 place-items-center rounded-full bg-white/10 hover:bg-white/20 ring-1 ring-white/20 text-white transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <motion.figure
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl"
            >
              <div className="relative mx-auto h-[70vh] w-full overflow-hidden rounded-2xl">
                <Image
                  src={PHOTOS[active].src}
                  alt={t.galleryItems[PHOTOS[active].key].title}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
              <figcaption className="mt-4 text-center">
                <p className="font-label uppercase text-xs tracking-wider text-misky-yellow">
                  {t.galleryItems[PHOTOS[active].key].tag}
                </p>
                <p className="text-misky-cream font-semibold">
                  {t.galleryItems[PHOTOS[active].key].title}
                </p>
                <p className="mt-1 text-sm text-misky-cream/50">
                  {active + 1} / {PHOTOS.length}
                </p>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
