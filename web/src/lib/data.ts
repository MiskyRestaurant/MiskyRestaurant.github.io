import "server-only";
import { prisma } from "./prisma";

/** Categorías con sus platos disponibles, ordenadas. Para la sección Carta. */
export async function getMenu() {
  return prisma.category.findMany({
    orderBy: { order: "asc" },
    include: {
      items: {
        where: { available: true },
        orderBy: { order: "asc" },
      },
    },
  });
}

/** Platos destacados para la sección Especialidades. */
export async function getFeatured() {
  return prisma.menuItem.findMany({
    where: { featured: true, available: true },
    orderBy: { updatedAt: "desc" },
    take: 6,
    include: { category: true },
  });
}

export type MenuWithItems = Awaited<ReturnType<typeof getMenu>>;
export type FeaturedItems = Awaited<ReturnType<typeof getFeatured>>;
