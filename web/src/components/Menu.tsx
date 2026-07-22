"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import { useLang } from "@/lib/i18n";

export type MenuDish = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
  spicy: boolean;
  featured: boolean;
};

export type MenuCategory = {
  id: number;
  name: string;
  slug: string;
  items: MenuDish[];
};

export default function Menu({ categories }: { categories: MenuCategory[] }) {
  const { t, categoryName, dishDescription } = useLang();
  const tabs = [{ id: 0, name: t.menu.all, slug: "todos" }, ...categories];
  const [active, setActive] = useState(0);

  const visible =
    active === 0
      ? categories
      : categories.filter((c) => c.id === active);

  return (
    <section id="carta" className="py-24 sm:py-32 bg-misky-cream">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow={t.menu.eyebrow}
          title={t.menu.title}
          description={t.menu.description}
        />

        {/* Filtros por categoría */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`rounded-full px-5 py-2.5 font-label uppercase tracking-wide text-sm font-semibold transition-colors ${
                active === tab.id
                  ? "bg-misky-red text-white shadow-md"
                  : "bg-misky-cream-dark text-misky-ink-soft hover:bg-misky-sand/50"
              }`}
            >
              {tab.id === 0 ? tab.name : categoryName(tab.slug, tab.name)}
            </button>
          ))}
        </div>

        {/* Platos */}
        <div className="mt-14 space-y-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="space-y-16"
            >
              {visible.map((cat) => (
                <div key={cat.id}>
                  <h3 className="font-display text-2xl font-extrabold text-misky-red flex items-center gap-3">
                    <span className="h-px flex-1 max-w-[2rem] bg-misky-sand" />
                    {categoryName(cat.slug, cat.name)}
                    <span className="h-px flex-1 bg-misky-sand" />
                  </h3>

                  <div className="mt-6 grid gap-x-10 gap-y-6 sm:grid-cols-2">
                    {cat.items.map((dish) => (
                      <div key={dish.id} className="flex gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2">
                            <h4 className="font-semibold text-misky-ink truncate">
                              {dish.name}
                              {dish.spicy && (
                                <span title={t.menu.spicy} className="ml-1">
                                  🌶️
                                </span>
                              )}
                              {dish.featured && (
                                <span title={t.menu.recommended} className="ml-1">
                                  ⭐
                                </span>
                              )}
                            </h4>
                            <span className="flex-1 border-b border-dotted border-misky-sand translate-y-[-3px]" />
                            <span className="font-display font-bold text-misky-red whitespace-nowrap">
                              ${dish.price.toFixed(2)}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-misky-ink-soft leading-snug">
                            {dishDescription(dish.name, dish.description)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
