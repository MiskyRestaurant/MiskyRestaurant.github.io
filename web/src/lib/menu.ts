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

/**
 * Fotos disponibles. Las rutas se resuelven contra `public/`.
 *
 * Es un catálogo, no una lista de lo que hay en carta: al final quedan las
 * fotos de platos que se retiraron el 11 de agosto de 2026. Se conservan a
 * propósito, para que devolver un plato a la carta sea solo volver a escribir
 * su bloque, sin tener que buscar la foto otra vez.
 */
const IMG = {
  // ---- Fotos del propio restaurante: tienen prioridad sobre las de archivo.
  // Vienen de la carpeta IMAGS-PLATOS de la raíz del proyecto.
  ajiGallina: asset("/images/dishes/aji-de-gallina.jpg"),
  bistecALoPobre: asset("/images/dishes/bistec-a-lo-pobre.jpg"),
  carapulcra: asset("/images/dishes/carapulcra.jpg"),
  frejoles: asset("/images/dishes/frejoles.jpg"),
  lomo: asset("/images/dishes/lomo-saltado.jpg"),
  olluquito: asset("/images/dishes/olluquito.jpg"),
  papaHuancaina: asset("/images/dishes/papa-a-la-huancaina.jpg"),
  salchipapa: asset("/images/dishes/salchipapa.jpg"),
  secoDeCarne: asset("/images/dishes/seco-de-carne.jpg"),
  tallarinHuancaina: asset("/images/dishes/tallarines-a-la-huancaina.jpg"),
  tallarinSaltado: asset("/images/dishes/tallarin-saltado.jpg"),
  tallarinesVerdes: asset("/images/dishes/tallarines-verdes.jpg"),
  postres: asset("/images/misky-7.jpeg"), // vitrina de postres, foto del local

  // ---- Fotos de archivo, solo donde todavía no hay foto propia
  polloBrasa: asset("/images/dishes/pollo-a-la-brasa.jpg"),
  chaufa: asset("/images/dishes/arroz-chaufa.jpg"),
  flatbread: asset("/images/dishes/flatbread.jpg"),
  fries: asset("/images/dishes/papas-fritas.jpg"),
  incaKola: asset("/images/dishes/inca-kola.jpg"),

  // ---- Platos retirados de la carta: fotos guardadas por si vuelven
  ceviche: asset("/images/dishes/ceviche.jpg"),
  causa: asset("/images/dishes/causa.jpg"),
  sopa: asset("/images/dishes/sopa.jpg"),
  empanada: asset("/images/dishes/empanadas.jpg"),
  chichaMorada: asset("/images/dishes/chicha-morada.jpg"),
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
      },
      {
        id: 102,
        name: "1/2 Pollo a la Brasa",
        description: "1/2 pollo a la brasa con papas fritas y ensalada fresca.",
        price: 20.0,
        image: IMG.polloBrasa,
      },
      {
        id: 104,
        name: "1/4 de Pollo a la Brasa",
        description:
          "1/4 de pollo a la brasa con papas fritas y ensalada fresca.",
        price: 15.0,
        image: IMG.polloBrasa,
      },
      {
        id: 103,
        name: "Mostrito",
        description:
          "1/4 de pollo a la brasa con arroz chaufa y papas fritas. El combo favorito de la casa.",
        price: 15.0,
        image: IMG.chaufa,
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
        price: 18.0,
        image: IMG.tallarinSaltado,
        featured: true,
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
        price: 14.0,
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
        price: 15.0,
        image: IMG.ajiGallina,
        featured: true,
        spicy: true,
      },
      {
        id: 303,
        name: "Olluquito con Carne o Pollo",
        description:
          "Guiso tradicional de olluco con un toque andino, a elegir con carne o con pollo.",
        price: 16.0,
        image: IMG.olluquito,
        featured: true,
      },
      {
        id: 304,
        name: "Carapulcra",
        description: "Guiso ancestral de papa seca con cerdo, maní y ají panca.",
        price: 15.0,
        image: IMG.carapulcra,
        featured: true,
        spicy: true,
      },
      {
        id: 309,
        name: "Frejoles",
        description:
          "Frejoles cremosos cocinados a fuego lento, servidos con arroz.",
        price: 14.0,
        image: IMG.frejoles,
        featured: true,
      },
      {
        id: 306,
        name: "Frejoles con Seco",
        description:
          "Frejoles cremosos acompañados de seco de carne al culantro y arroz.",
        price: 20.0,
      },
      {
        id: 310,
        name: "Seco de Carne",
        description:
          "Carne guisada lentamente al culantro y ají amarillo, tierna y jugosa, con arroz.",
        price: 17.0,
        image: IMG.secoDeCarne,
        featured: true,
      },
      {
        id: 311,
        name: "Adobo de Chancho",
        description:
          "Cerdo macerado en ají panca y especias, guisado hasta quedar tierno, con arroz.",
        price: 17.0,
        spicy: true,
      },
      {
        id: 312,
        name: "Bistec a lo Pobre",
        description:
          "Bistec a la plancha coronado con huevo frito, con plátano frito, papas fritas y arroz.",
        price: 18.0,
        image: IMG.bistecALoPobre,
        featured: true,
      },
      {
        id: 308,
        name: "Salchipapa",
        description:
          "Clásica salchipapa: papas fritas con salchicha y cremas de la casa.",
        price: 14.0,
        image: IMG.salchipapa,
        featured: true,
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
        price: 14.0,
        image: IMG.tallarinHuancaina,
        featured: true,
      },
      {
        id: 402,
        name: "Tallarines Verdes",
        description:
          "Pasta en salsa verde de albahaca y espinaca al estilo peruano.",
        price: 14.0,
        image: IMG.tallarinesVerdes,
        featured: true,
      },
    ],
  },
  {
    id: 6,
    name: "Guarniciones",
    slug: "guarniciones",
    items: [
      {
        id: 603,
        name: "Papa a la Huancaína",
        description:
          "Papa sancochada bañada en cremosa salsa de ají amarillo y queso.",
        price: 12.0,
        image: IMG.papaHuancaina,
        featured: true,
      },
      {
        id: 604,
        name: "Porción de Arroz Chaufa",
        description: "Porción de arroz chaufa salteado al wok.",
        price: 10.0,
        image: IMG.chaufa,
      },
      {
        id: 605,
        name: "Porción de Papas Fritas",
        description: "Porción de papas fritas doradas y crujientes.",
        price: 7.0,
        image: IMG.fries,
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
        price: 6.0,
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
        id: 705,
        name: "Inca Kola (Lata)",
        description: "La bebida bandera del Perú, en lata y bien helada.",
        price: 4.0,
        image: IMG.incaKola,
      },
      {
        id: 706,
        name: "Inca Kola (2 L)",
        description:
          "Botella de 2 litros de la bebida bandera del Perú, para compartir en la mesa.",
        price: 12.0,
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
