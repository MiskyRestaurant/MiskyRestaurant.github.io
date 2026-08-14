"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Lang = "es" | "en";

const STORAGE_KEY = "misky-lang";

/* ------------------------------------------------------------------ */
/*  Diccionario de la interfaz                                         */
/* ------------------------------------------------------------------ */

const es = {
  nav: {
    about: "Nosotros",
    specialties: "Especialidades",
    menu: "Carta",
    gallery: "Galería",
    location: "Ubicación",
    home: "Inicio",
    menuLabel: "Menú",
  },
  hero: {
    eyebrow: "Auténtica Cocina Peruana",
    titleA: "El alma del Perú",
    titleB: "en cada plato",
    before: "En ",
    after: " celebramos la tradición andina y costera con ingredientes frescos y recetas de siempre.",
    viewMenu: "Ver la carta",
  },
  about: {
    eyebrow: "Nuestra historia",
    title: "Del corazón de los Andes a tu mesa",
    p1: "significa «delicioso» en quechua, y ese es nuestro compromiso en cada servicio. Nacimos de la pasión por compartir la riqueza de la gastronomía peruana: una de las más reconocidas del mundo, donde se encuentran las raíces andinas, la costa, la selva y la herencia nikkei y chifa.",
    p2: "Trabajamos con productos frescos, ají de verdad y técnicas tradicionales para que cada bocado te transporte al Perú. Más que un restaurante, somos un encuentro entre amigos alrededor de la buena mesa.",
    stat1: "Ingredientes frescos",
    stat2: "Recetas de siempre",
    stat3: "Platos en carta",
  },
  featured: {
    eyebrow: "Lo más pedido",
    title: "Nuestras especialidades",
    description:
      "Los platos que enamoran a nuestros comensales, preparados con el sazón de siempre.",
    spicy: "Picante",
  },
  menu: {
    eyebrow: "Nuestra carta",
    title: "Sabores que cuentan historias",
    description:
      "Explora nuestra selección de platos peruanos. Precios en dólares (US$).",
    all: "Todos",
    spicy: "Picante",
    recommended: "Recomendado",
  },
  gallery: {
    eyebrow: "Galería",
    title: "Una experiencia para los sentidos",
    description:
      "Color, aroma y sabor en cada rincón de Misky. Toca una foto para verla en grande.",
    close: "Cerrar",
    prev: "Anterior",
    next: "Siguiente",
    enlarge: "Ampliar",
  },
  location: {
    eyebrow: "Visítanos",
    title: "Dónde encontrarnos",
    description:
      "Te esperamos en Battle Creek, Michigan, para compartir la mejor mesa peruana.",
    hoursTitle: "Horario de atención",
    contactTitle: "Contacto",
    addressLabel: "Dirección",
    phoneLabel: "Teléfono",
    closed: "Cerrado",
    mon: "Lunes",
    tueThu: "Martes – Jueves",
    friSat: "Viernes – Sábado",
    sun: "Domingo",
    mapTitle: "Ubicación de Misky Peruvian Cuisines",
  },
  footer: {
    tagline:
      "Auténtica cocina peruana hecha con pasión. Misky significa «delicioso» en quechua, y es lo que servimos cada día.",
    navTitle: "Navegación",
    followTitle: "Síguenos",
    rights: "© 2026 Misky Peruvian Cuisines. Todos los derechos reservados.",
  },
  galleryItems: {
    salon: { title: "Nuestro salón", tag: "Ambiente" },
    cremas: { title: "Cremas de ají y cancha", tag: "Sabores" },
    barra: { title: "Barra peruana", tag: "Ambiente" },
    vitrina: { title: "Bienvenida y vitrina", tag: "Ambiente" },
    pompones: { title: "Detalles andinos", tag: "Detalles" },
    ceramica: { title: "Cerámica artesanal", tag: "Detalles" },
  },
};

export type Messages = typeof es;

const en: Messages = {
  nav: {
    about: "About",
    specialties: "Specialties",
    menu: "Menu",
    gallery: "Gallery",
    location: "Location",
    home: "Home",
    menuLabel: "Menu",
  },
  hero: {
    eyebrow: "Authentic Peruvian Cuisine",
    titleA: "The soul of Peru",
    titleB: "in every dish",
    before: "At ",
    after: " we celebrate the Andean and coastal tradition with fresh ingredients and time-honored recipes.",
    viewMenu: "View the menu",
  },
  about: {
    eyebrow: "Our story",
    title: "From the heart of the Andes to your table",
    p1: "means “delicious” in Quechua, and that is our promise with every service. We were born from the passion to share the richness of Peruvian cuisine — one of the most celebrated in the world, where Andean roots meet the coast, the jungle, and the Nikkei and Chifa heritage.",
    p2: "We work with fresh produce, real chili and traditional techniques so every bite takes you to Peru. More than a restaurant, we are a gathering of friends around a great meal.",
    stat1: "Fresh ingredients",
    stat2: "Time-honored recipes",
    stat3: "Dishes on the menu",
  },
  featured: {
    eyebrow: "Most ordered",
    title: "Our specialties",
    description:
      "The dishes our guests fall in love with, prepared with our signature seasoning.",
    spicy: "Spicy",
  },
  menu: {
    eyebrow: "Our menu",
    title: "Flavors that tell stories",
    description:
      "Explore our selection of Peruvian dishes. Prices in US dollars (US$).",
    all: "All",
    spicy: "Spicy",
    recommended: "Recommended",
  },
  gallery: {
    eyebrow: "Gallery",
    title: "An experience for the senses",
    description:
      "Color, aroma and flavor in every corner of Misky. Tap a photo to view it larger.",
    close: "Close",
    prev: "Previous",
    next: "Next",
    enlarge: "Enlarge",
  },
  location: {
    eyebrow: "Visit us",
    title: "Where to find us",
    description:
      "We look forward to seeing you in Battle Creek, Michigan, for the best Peruvian table.",
    hoursTitle: "Opening hours",
    contactTitle: "Contact",
    addressLabel: "Address",
    phoneLabel: "Phone",
    closed: "Closed",
    mon: "Monday",
    tueThu: "Tuesday – Thursday",
    friSat: "Friday – Saturday",
    sun: "Sunday",
    mapTitle: "Misky Peruvian Cuisines location",
  },
  footer: {
    tagline:
      "Authentic Peruvian cuisine made with passion. Misky means “delicious” in Quechua — and that's what we serve every day.",
    navTitle: "Navigation",
    followTitle: "Follow us",
    rights: "© 2026 Misky Peruvian Cuisines. All rights reserved.",
  },
  galleryItems: {
    salon: { title: "Our dining room", tag: "Ambiance" },
    cremas: { title: "Chili sauces & cancha", tag: "Flavors" },
    barra: { title: "Peruvian counter", tag: "Ambiance" },
    vitrina: { title: "Welcome & display case", tag: "Ambiance" },
    pompones: { title: "Andean details", tag: "Details" },
    ceramica: { title: "Handmade ceramics", tag: "Details" },
  },
};

const DICT: Record<Lang, Messages> = { es, en };

/* ------------------------------------------------------------------ */
/*  Traducciones del contenido del menú (categorías y descripciones)  */
/*  Los NOMBRES de los platos se mantienen en español (nombres        */
/*  propios). Las categorías se mapean por slug; las descripciones    */
/*  por el nombre del plato.                                          */
/* ------------------------------------------------------------------ */

const CATEGORY_EN: Record<string, string> = {
  "pollo-a-la-brasa": "Rotisserie Chicken & Combos",
  especialidades: "Misky Specialties",
  "platos-criollos": "Creole Dishes",
  tallarines: "Pasta",
  guarniciones: "Sides",
  "postres-bebidas": "Desserts & Drinks",
};

const DESC_EN: Record<string, string> = {
  "Family Chicken Combo":
    "Whole rotisserie chicken with potatoes and salad. Perfect for sharing with family.",
  "1/4 de Pollo a la Brasa":
    "Quarter rotisserie chicken with fries and fresh salad.",
  Mostrito:
    "Quarter rotisserie chicken with chaufa rice and fries. The house favorite combo.",
  "Lomo Saltado Misky Style":
    "Wok-tossed beef tenderloin with onion, tomato and chili, flambéed, with fries and rice.",
  "Tallarín Saltado":
    "Wok-tossed noodles, creole style, with beef, vegetables and soy sauce.",
  "Al Pastor Flatbread":
    "Oven-baked flatbread with al pastor pork, a house twist.",
  "Misky Roll Ups": "Crispy stuffed roll-ups, a Misky specialty.",
  "Ají de Gallina":
    "Shredded chicken in a creamy yellow chili, walnut and cheese sauce, with potato and olives.",
  "Olluquito con Carne o Pollo":
    "Traditional olluco stew with an Andean touch, your choice of beef or chicken.",
  Carapulcra:
    "Ancestral dried-potato stew with pork, peanut and panca chili.",
  Frejoles: "Slow-cooked creamy beans served with rice.",
  "Frejoles con Seco":
    "Creamy beans served with cilantro beef stew and rice.",
  "Seco de Carne":
    "Beef slow-stewed in cilantro and yellow chili, tender and juicy, with rice.",
  "Adobo de Chancho":
    "Pork marinated in panca chili and spices, slow-cooked until tender, with rice.",
  "Bistec a lo Pobre":
    "Grilled steak topped with a fried egg, with fried plantain, fries and rice.",
  Salchipapa: "Classic salchipapa: fries with sausage and house sauces.",
  "Tallarines a la Huancaína":
    "Noodles in a creamy huancaína sauce of yellow chili and cheese, with egg and olive.",
  "Tallarines Verdes":
    "Pasta in a Peruvian-style green basil and spinach sauce.",
  "Papa a la Huancaína":
    "Boiled potato in a creamy yellow chili and cheese sauce.",
  "Porción de Arroz Chaufa": "Side of wok-tossed chaufa rice.",
  "Porción de Papas Fritas": "Side of golden, crispy fries.",
  Flan: "Smooth homemade flan with caramel.",
  "German Chocolate Cake": "A slice of German chocolate cake.",
  "Inca Kola": "Peru's iconic soda, served ice-cold.",
};

/* ------------------------------------------------------------------ */
/*  Contexto                                                          */
/* ------------------------------------------------------------------ */

type LangContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: Messages;
  /** Nombre de categoría traducido (por slug). */
  categoryName: (slug: string, fallback: string) => string;
  /** Descripción de plato traducida (por nombre en español). */
  dishDescription: (name: string, fallback: string) => string;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // El restaurante está en Michigan: la mayoría de quien entra lee en inglés,
  // así que ese es el idioma de partida. El interruptor de la barra superior
  // permite pasar a español en cualquier momento.
  const [lang, setLangState] = useState<Lang>("en");

  // Al montar, recuperar preferencia guardada. Arrancamos siempre en "en"
  // (igual en servidor y cliente para evitar desajustes de hidratación) y, ya
  // en el cliente, ajustamos al idioma persistido.
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (saved === "en" || saved === "es") setLangState(saved);
  }, []);

  // Persistir y reflejar el idioma en <html lang>.
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggle = useCallback(
    () => setLangState((l) => (l === "es" ? "en" : "es")),
    [],
  );

  const value = useMemo<LangContextValue>(
    () => ({
      lang,
      setLang,
      toggle,
      t: DICT[lang],
      categoryName: (slug, fallback) =>
        lang === "en" ? (CATEGORY_EN[slug] ?? fallback) : fallback,
      dishDescription: (name, fallback) =>
        lang === "en" ? (DESC_EN[name] ?? fallback) : fallback,
    }),
    [lang, setLang, toggle],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang debe usarse dentro de <LanguageProvider>");
  return ctx;
}
