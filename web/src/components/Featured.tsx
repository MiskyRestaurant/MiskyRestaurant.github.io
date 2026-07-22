"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { useLang } from "@/lib/i18n";

export type FeaturedDish = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
  spicy: boolean;
  category: { name: string; slug: string };
};

export default function Featured({ items }: { items: FeaturedDish[] }) {
  const { t, categoryName, dishDescription } = useLang();
  if (items.length === 0) return null;

  return (
    <section id="especialidades" className="py-24 sm:py-32 bg-misky-cream-dark">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow={t.featured.eyebrow}
          title={t.featured.title}
          description={t.featured.description}
        />

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((dish, i) => (
            <Reveal key={dish.id} delay={(i % 3) * 0.1}>
              <article className="group h-full bg-misky-cream rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden">
                  {dish.image && (
                    <Image
                      src={dish.image}
                      alt={dish.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                  <span className="absolute top-4 left-4 rounded-full bg-misky-yellow px-3 py-1 font-label uppercase text-[11px] tracking-wide font-semibold text-misky-ink">
                    {categoryName(dish.category.slug, dish.category.name)}
                  </span>
                  {dish.spicy && (
                    <span className="absolute top-4 right-4 rounded-full bg-misky-red px-2.5 py-1 text-xs text-white">
                      🌶️ {t.featured.spicy}
                    </span>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-xl font-bold text-misky-ink">
                      {dish.name}
                    </h3>
                    <span className="shrink-0 font-display text-lg font-extrabold text-misky-red">
                      ${dish.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-misky-ink-soft leading-relaxed">
                    {dishDescription(dish.name, dish.description)}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
