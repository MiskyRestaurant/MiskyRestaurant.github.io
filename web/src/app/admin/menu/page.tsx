import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import AdminShell from "@/components/admin/AdminShell";
import MenuManager, {
  type AdminCategory,
} from "@/components/admin/MenuManager";

export const dynamic = "force-dynamic";

export default async function AdminMenuPage() {
  const session = await getSession();
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: { items: { orderBy: { order: "asc" } } },
  });

  const serialized: AdminCategory[] = categories.map((c) => ({
    id: c.id,
    name: c.name,
    items: c.items.map((i) => ({
      id: i.id,
      name: i.name,
      description: i.description,
      price: i.price,
      image: i.image,
      featured: i.featured,
      spicy: i.spicy,
      available: i.available,
      categoryId: i.categoryId,
    })),
  }));

  return (
    <AdminShell userName={session?.name ?? "Admin"}>
      <MenuManager categories={serialized} />
    </AdminShell>
  );
}
