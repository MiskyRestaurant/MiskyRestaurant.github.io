/**
 * LA CARTA DEL RESTAURANTE
 * ========================
 *
 * Este es el único fichero que hay que tocar para cambiar la carta: añadir o
 * quitar platos, cambiar precios, descripciones o fotos.
 *
 * Antes la carta vivía en una base de datos y se editaba desde un panel de
 * administración. Al pasar la web a estática (GitHub Pages sirve solo ficheros,
 * sin servidor ni base de datos) los datos viven aquí, en el repositorio.
 *
 * ---------------------------------------------------------------------------
 * CÓMO CAMBIAR UN PLATO
 * ---------------------------------------------------------------------------
 *   name        Nombre del plato (se muestra igual en español y en inglés).
 *   description Descripción en español. La traducción al inglés se hace en
 *               `src/lib/i18n.tsx` (mapa DESC_EN, indexado por `name`).
 *   price       Precio en dólares, sin el símbolo. Ej: 13.99
 *   image       Ruta de la foto dentro de `public/`, o `null` si no tiene.
 *               Las fotos de los platos están en `public/images/dishes/`.
 *   featured    `true` para que aparezca en la sección «Especialidades».
 *   spicy       `true` para mostrar el icono de picante 🌶️
 *
 * Los `id` deben ser únicos y no cambiar. Al añadir un plato nuevo, usa el
 * siguiente número libre.
 */

import { asset } from "./asset";

export type Dish = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
  featured: boolean;
  spicy: boolean;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  items: Dish[];
};

/** Fotos de los platos. Las rutas se resuelven contra `public/`. */
const IMG = {
  // Fotos reales del restaurante
  tallarinHuancaina: asset("/images/misky-10.jpeg"),
  postres: asset("/images/misky-7.jpeg"),
  // Fotos de archivo (Unsplash), a sustituir por fotos propias cuando las haya
  ajiGallina: asset("/images/dishes/aji-de-gallina.jpg"),
  polloBrasa: asset("/images/dishes/pollo-a-la-brasa.jpg"),
  lomo: asset("/images/dishes/lomo-saltado.jpg"),
  ceviche: asset("/images/dishes/ceviche.jpg"),
  causa: asset("/images/dishes/causa.jpg"),
  chaufa: asset("/images/dishes/arroz-chaufa.jpg"),
  salchipapa: asset("/images/dishes/salchipapa.jpg"),
  flatbread: asset("/images/dishes/flatbread.jpg"),
  sopa: asset("/images/dishes/sopa.jpg"),
  fries: asset("/images/dishes/papas-fritas.jpg"),
  empanada: asset("/images/dishes/empanadas.jpg"),
  chichaMorada: asset("/images/dishes/chicha-morada.jpg"),
  incaKola: asset("/images/dishes/inca-kola.jpg"),
} as const;

/** Forma abreviada para escribir la carta sin repetir los campos por defecto. */
type DishInput = {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  featured?: boolean;
  spicy?: boolean;
};

type CategoryInput = Omit<Category, "items"> & { items: DishInput[] };

const CARTA: CategoryInput[] = [
  {
    id: 1,
    name: "Pollo a la Brasa & Combos",
    slug: "pollo-a-la-brasa",
    items: [
      {
        id: 101,
        name: "Family Chicken Combo",
        description:
          "Pollo entero a la brasa acompañado de papas y ensalada. Ideal para compartir en familia.",
        price: 33.99,
        image: IMG.polloBrasa,
        featured: true,
      },
      {
        id: 102,
        name: "Medio Pollo a la Brasa",
        description: "1/2 pollo a la brasa con papas fritas y ensalada fresca.",
        price: 17.99,
        image: IMG.polloBrasa,
      },
      {
        id: 103,
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
    id: 2,
    name: "Especialidades Misky",
    slug: "especialidades",
    items: [
      {
        id: 201,
        name: "Lomo Saltado Misky Style",
        description:
          "Lomo salteado al wok con cebolla, tomate y ají, flameado, con papas fritas y arroz.",
        price: 18.0,
        image: IMG.lomo,
        featured: true,
      },
      {
        id: 202,
        name: "Tallarín Saltado",
        description:
          "Tallarines salteados al wok estilo criollo con carne, verduras y sillao.",
        price: 16.0,
        image: IMG.chaufa,
      },
      {
        id: 203,
        name: "Al Pastor Flatbread",
        description:
          "Pan plano horneado con cerdo al pastor, un toque de la casa.",
        price: 14.0,
        image: IMG.flatbread,
      },
      {
        id: 204,
        name: "Misky Roll Ups",
        description: "Enrollados crujientes rellenos, especialidad de Misky.",
        price: 13.0,
        image: IMG.flatbread,
      },
    ],
  },
  {
    id: 3,
    name: "Platos Criollos",
    slug: "platos-criollos",
    items: [
      {
        id: 301,
        name: "Ají de Gallina",
        description:
          "Pollo deshilachado en cremosa salsa de ají amarillo, nueces y queso, con papa y aceitunas.",
        price: 13.99,
        image: IMG.ajiGallina,
        featured: true,
        spicy: true,
      },
      {
        id: 302,
        name: "Escabeche de Pollo",
        description:
          "Pollo en escabeche con cebolla encurtida, ají y especias criollas.",
        price: 14.0,
      },
      {
        id: 303,
        name: "Olluquito con Carne",
        description: "Guiso tradicional de olluco con carne y un toque andino.",
        price: 13.99,
      },
      {
        id: 304,
        name: "Carapulcra",
        description: "Guiso ancestral de papa seca con cerdo, maní y ají panca.",
        price: 13.99,
        spicy: true,
      },
      {
        id: 305,
        name: "Cau Cau",
        description:
          "Guiso de mondongo con papa, ají amarillo, hierbabuena y palillo.",
        price: 13.99,
      },
      {
        id: 306,
        name: "Frejoles con Seco",
        description:
          "Frejoles cremosos acompañados de seco de carne al culantro y arroz.",
        price: 16.0,
      },
      {
        id: 307,
        name: "Causa Limeña (Pollo o Atún)",
        description:
          "Papa amarilla prensada con ají, rellena de pollo o atún, con verduras.",
        price: 13.99,
        image: IMG.causa,
      },
      {
        id: 308,
        name: "Salchipapa",
        description:
          "Clásica salchipapa: papas fritas con salchicha y cremas de la casa.",
        price: 12.99,
        image: IMG.salchipapa,
      },
    ],
  },
  {
    id: 4,
    name: "Tallarines",
    slug: "tallarines",
    items: [
      {
        id: 401,
        name: "Tallarines a la Huancaína",
        description:
          "Tallarines bañados en cremosa salsa huancaína de ají amarillo y queso, con huevo y aceituna.",
        price: 12.99,
        image: IMG.tallarinHuancaina,
        featured: true,
      },
      {
        id: 402,
        name: "Tallarines Verdes",
        description:
          "Pasta en salsa verde de albahaca y espinaca al estilo peruano.",
        price: 12.99,
      },
    ],
  },
  {
    id: 5,
    name: "Del Mar",
    slug: "del-mar",
    items: [
      {
        id: 501,
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
    id: 6,
    name: "Sopas & Guarniciones",
    slug: "sopas-guarniciones",
    items: [
      {
        id: 601,
        name: "Aguadito de Pollo",
        description:
          "Reconfortante sopa de pollo con arroz, culantro y verduras.",
        price: 9.0,
        image: IMG.sopa,
      },
      {
        id: 602,
        name: "Sopa Criolla",
        description: "Sopa criolla con fideos, carne, leche y un toque de ají.",
        price: 8.99,
        image: IMG.sopa,
      },
      {
        id: 603,
        name: "Papa a la Huancaína",
        description:
          "Papa sancochada bañada en cremosa salsa de ají amarillo y queso.",
        price: 5.99,
      },
      {
        id: 604,
        name: "Porción de Arroz Chaufa",
        description: "Porción de arroz chaufa salteado al wok.",
        price: 6.0,
        image: IMG.chaufa,
      },
      {
        id: 605,
        name: "Porción de Papas Fritas",
        description: "Porción de papas fritas doradas y crujientes.",
        price: 4.99,
        image: IMG.fries,
      },
      {
        id: 606,
        name: "Empanadas",
        description: "Empanadas horneadas de la casa, rellenas y doradas.",
        price: 3.99,
        image: IMG.empanada,
      },
    ],
  },
  {
    id: 7,
    name: "Postres & Bebidas",
    slug: "postres-bebidas",
    items: [
      {
        id: 701,
        name: "Flan",
        description: "Flan casero suave con caramelo.",
        price: 4.99,
        image: IMG.postres,
      },
      {
        id: 702,
        name: "Arroz con Leche",
        description: "Postre cremoso de arroz con leche y canela.",
        price: 4.99,
        image: IMG.postres,
      },
      {
        id: 703,
        name: "German Chocolate Cake",
        description: "Porción de torta de chocolate alemán.",
        price: 4.99,
        image: IMG.postres,
      },
      {
        id: 704,
        name: "Chicha Morada",
        description:
          "Refrescante bebida de maíz morado con piña, canela y limón.",
        price: 3.5,
        image: IMG.chichaMorada,
      },
      {
        id: 705,
        name: "Inca Kola",
        description: "La bebida bandera del Perú, bien helada.",
        price: 2.5,
        image: IMG.incaKola,
      },
    ],
  },
];

/** La carta completa, con los valores por defecto ya rellenados. */
export const MENU: Category[] = CARTA.map((cat) => ({
  ...cat,
  items: cat.items.map((it) => ({
    ...it,
    image: it.image ?? null,
    featured: it.featured ?? false,
    spicy: it.spicy ?? false,
  })),
}));

/** Platos marcados como `featured`, para la sección «Especialidades». */
export const FEATURED = MENU.flatMap((cat) =>
  cat.items
    .filter((it) => it.featured)
    .map((it) => ({ ...it, category: { name: cat.name, slug: cat.slug } })),
);

/** Número total de platos en la carta (lo usa la sección «Nosotros»). */
export const DISH_COUNT = MENU.reduce((n, cat) => n + cat.items.length, 0);
