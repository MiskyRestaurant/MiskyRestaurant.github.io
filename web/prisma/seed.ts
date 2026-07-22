import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Fotos: las locales (/images/...) son fotos REALES del local (carpeta
// imagenes-misky copiada a public/images). El resto son fotos de cocina
// peruana de Unsplash hasta tener foto propia de cada plato; el admin puede
// reemplazar cualquier imagen desde el panel.
const IMG = {
  // Reales del restaurante
  tallarinHuancaina: "/images/misky-10.jpeg", // tallarines a la huancaína + Inca Kola
  postres: "/images/misky-7.jpeg", // vitrina de postres (flan, torta, arroz con leche)
  // Unsplash (placeholder hasta foto propia)
  ajiGallina:
    "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=800&q=80",
  polloBrasa:
    "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=800&q=80",
  lomo:
    "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=80",
  ceviche:
    "https://images.unsplash.com/photo-1535399831218-d5bd36d1a6b3?auto=format&fit=crop&w=800&q=80",
  causa:
    "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80",
  chaufa:
    "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80",
  salchipapa:
    "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80",
  flatbread:
    "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80",
  sopa:
    "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
  fries:
    "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=800&q=80",
  empanada:
    "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
  chichaMorada:
    "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80",
  incaKola:
    "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80",
};

const categories = [
  {
    name: "Pollo a la Brasa & Combos",
    slug: "pollo-a-la-brasa",
    order: 1,
    items: [
      {
        name: "Family Chicken Combo",
        description:
          "Pollo entero a la brasa acompañado de papas y ensalada. Ideal para compartir en familia.",
        price: 33.99,
        image: IMG.polloBrasa,
        featured: true,
      },
      {
        name: "Medio Pollo a la Brasa",
        description:
          "1/2 pollo a la brasa con papas fritas y ensalada fresca.",
        price: 17.99,
        image: IMG.polloBrasa,
      },
      {
        name: "Mostrito",
        description:
          "1/4 de pollo a la brasa con arroz chaufa y papas fritas. El combo favorito de la casa.",
        price: 15.0,
        image: IMG.chaufa,
        featured: true,
      },
    ],
  },
  {
    name: "Especialidades Misky",
    slug: "especialidades",
    order: 2,
    items: [
      {
        name: "Lomo Saltado Misky Style",
        description:
          "Lomo salteado al wok con cebolla, tomate y ají, flameado, con papas fritas y arroz.",
        price: 18.0,
        image: IMG.lomo,
        featured: true,
      },
      {
        name: "Tallarín Saltado",
        description:
          "Tallarines salteados al wok estilo criollo con carne, verduras y sillao.",
        price: 16.0,
        image: IMG.chaufa,
      },
      {
        name: "Al Pastor Flatbread",
        description:
          "Pan plano horneado con cerdo al pastor, un toque de la casa.",
        price: 14.0,
        image: IMG.flatbread,
      },
      {
        name: "Misky Roll Ups",
        description: "Enrollados crujientes rellenos, especialidad de Misky.",
        price: 13.0,
        image: IMG.flatbread,
      },
    ],
  },
  {
    name: "Platos Criollos",
    slug: "platos-criollos",
    order: 3,
    items: [
      {
        name: "Ají de Gallina",
        description:
          "Pollo deshilachado en cremosa salsa de ají amarillo, nueces y queso, con papa y aceitunas.",
        price: 13.99,
        image: IMG.ajiGallina,
        featured: true,
        spicy: true,
      },
      {
        name: "Escabeche de Pollo",
        description:
          "Pollo en escabeche con cebolla encurtida, ají y especias criollas.",
        price: 14.0,
      },
      {
        name: "Olluquito con Carne",
        description: "Guiso tradicional de olluco con carne y un toque andino.",
        price: 13.99,
      },
      {
        name: "Carapulcra",
        description:
          "Guiso ancestral de papa seca con cerdo, maní y ají panca.",
        price: 13.99,
        spicy: true,
      },
      {
        name: "Cau Cau",
        description:
          "Guiso de mondongo con papa, ají amarillo, hierbabuena y palillo.",
        price: 13.99,
      },
      {
        name: "Frejoles con Seco",
        description:
          "Frejoles cremosos acompañados de seco de carne al culantro y arroz.",
        price: 16.0,
      },
      {
        name: "Causa Limeña (Pollo o Atún)",
        description:
          "Papa amarilla prensada con ají, rellena de pollo o atún, con verduras.",
        price: 13.99,
        image: IMG.causa,
      },
      {
        name: "Salchipapa",
        description:
          "Clásica salchipapa: papas fritas con salchicha y cremas de la casa.",
        price: 12.99,
        image: IMG.salchipapa,
      },
    ],
  },
  {
    name: "Tallarines",
    slug: "tallarines",
    order: 4,
    items: [
      {
        name: "Tallarines a la Huancaína",
        description:
          "Tallarines bañados en cremosa salsa huancaína de ají amarillo y queso, con huevo y aceituna.",
        price: 12.99,
        image: IMG.tallarinHuancaina,
        featured: true,
      },
      {
        name: "Tallarines Verdes",
        description:
          "Pasta en salsa verde de albahaca y espinaca al estilo peruano.",
        price: 12.99,
      },
    ],
  },
  {
    name: "Del Mar",
    slug: "del-mar",
    order: 5,
    items: [
      {
        name: "Ceviche",
        description:
          "Pescado fresco (tilapia) y camarones marinados en limón, ají y cebolla morada, con camote y choclo.",
        price: 15.0,
        image: IMG.ceviche,
        featured: true,
        spicy: true,
      },
    ],
  },
  {
    name: "Sopas & Guarniciones",
    slug: "sopas-guarniciones",
    order: 6,
    items: [
      {
        name: "Aguadito de Pollo",
        description:
          "Reconfortante sopa de pollo con arroz, culantro y verduras.",
        price: 9.0,
        image: IMG.sopa,
      },
      {
        name: "Sopa Criolla",
        description:
          "Sopa criolla con fideos, carne, leche y un toque de ají.",
        price: 8.99,
        image: IMG.sopa,
      },
      {
        name: "Papa a la Huancaína",
        description:
          "Papa sancochada bañada en cremosa salsa de ají amarillo y queso.",
        price: 5.99,
      },
      {
        name: "Porción de Arroz Chaufa",
        description: "Porción de arroz chaufa salteado al wok.",
        price: 6.0,
        image: IMG.chaufa,
      },
      {
        name: "Porción de Papas Fritas",
        description: "Porción de papas fritas doradas y crujientes.",
        price: 4.99,
        image: IMG.fries,
      },
      {
        name: "Empanadas",
        description: "Empanadas horneadas de la casa, rellenas y doradas.",
        price: 3.99,
        image: IMG.empanada,
      },
    ],
  },
  {
    name: "Postres & Bebidas",
    slug: "postres-bebidas",
    order: 7,
    items: [
      {
        name: "Flan",
        description: "Flan casero suave con caramelo.",
        price: 4.99,
        image: IMG.postres,
      },
      {
        name: "Arroz con Leche",
        description: "Postre cremoso de arroz con leche y canela.",
        price: 4.99,
        image: IMG.postres,
      },
      {
        name: "German Chocolate Cake",
        description: "Porción de torta de chocolate alemán.",
        price: 4.99,
        image: IMG.postres,
      },
      {
        name: "Chicha Morada",
        description:
          "Refrescante bebida de maíz morado con piña, canela y limón.",
        price: 3.5,
        image: IMG.chichaMorada,
      },
      {
        name: "Inca Kola",
        description: "La bebida bandera del Perú, bien helada.",
        price: 2.5,
        image: IMG.incaKola,
      },
    ],
  },
];

async function main() {
  // Salvo SEED_FORCE=1, no re-sembrar si ya hay datos
  // (evita borrar lo que el admin haya creado al reiniciar el contenedor).
  const existing = await prisma.category.count();
  if (existing > 0 && process.env.SEED_FORCE !== "1") {
    console.log(
      `↩︎  La base ya tiene ${existing} categorías; se omite el seed. (Usa SEED_FORCE=1 para forzar.)`,
    );
    return;
  }

  console.log("🌱 Seeding Misky Peruvian Cuisines...");

  // Limpieza idempotente
  await prisma.menuItem.deleteMany();
  await prisma.category.deleteMany();
  await prisma.adminUser.deleteMany();

  for (const cat of categories) {
    const { items, ...catData } = cat;
    await prisma.category.create({
      data: {
        ...catData,
        items: {
          create: items.map((it, idx) => ({ ...it, order: idx })),
        },
      },
    });
    console.log(`  ✓ ${cat.name} (${items.length} platos)`);
  }

  const email = process.env.ADMIN_EMAIL ?? "admin@misky.pe";
  const password = process.env.ADMIN_PASSWORD ?? "misky2026";
  await prisma.adminUser.create({
    data: {
      email,
      password: await bcrypt.hash(password, 10),
      name: "Administrador Misky",
    },
  });
  console.log(`  ✓ Admin: ${email}`);
  console.log("✅ Seed completo.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
