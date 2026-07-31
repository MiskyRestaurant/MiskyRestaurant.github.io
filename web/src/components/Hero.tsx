"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

export default function Hero() {
  const { t } = useLang();
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Fondo */}
      <div className="absolute inset-0">
        <Image
          src="/images/misky-2.jpeg"
          alt="Interior del restaurante Misky Peruvian Cuisines"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-misky-ink/80 via-misky-ink/55 to-misky-ink/85" />
      </div>

      {/* Contenido */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-misky-cream pt-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="eyebrow text-misky-yellow"
        >
          {t.hero.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-4 font-display text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-[0.95]"
        >
          {t.hero.titleA}
          <span className="block text-misky-yellow">{t.hero.titleB}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-xl text-base sm:text-lg text-misky-cream/85 leading-relaxed"
        >
          {t.hero.before}
          <span className="font-semibold text-misky-cream">Misky</span>
          {t.hero.after}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="#carta"
            className="w-full sm:w-auto rounded-full bg-misky-red px-8 py-4 font-label uppercase tracking-wide text-sm font-semibold text-white shadow-lg hover:bg-misky-red-dark transition-transform hover:scale-[1.03]"
          >
            {t.hero.viewMenu}
          </Link>
        </motion.div>
      </div>

      {/* Greca andina inferior */}
      <div className="absolute bottom-0 inset-x-0 h-2 andean-border z-10" />

      {/* Indicador de scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1, duration: 1.8, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-misky-cream/70"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 5v14M5 12l7 7 7-7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </section>
  );
}
