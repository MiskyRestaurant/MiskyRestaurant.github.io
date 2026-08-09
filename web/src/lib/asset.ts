/**
 * Rutas a ficheros de `public/`.
 *
 * En GitHub Pages la web no cuelga de la raíz del dominio sino de una
 * subcarpeta (`https://vannicin.github.io/misky-restaurant/`). Next.js añade
 * esa subcarpeta automáticamente a sus propios ficheros (`/_next/...`), pero
 * NO a las imágenes de `public/` que referenciamos a mano. Por eso todas las
 * rutas a `public/` deben pasar por `asset()`.
 *
 *   asset("/images/misky-2.jpeg")
 *     → "/images/misky-2.jpeg"                    en local
 *     → "/misky-restaurant/images/misky-2.jpeg"   en GitHub Pages
 */

/** Subcarpeta bajo la que se publica el sitio. Vacía si cuelga de la raíz. */
export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(
  /\/+$/,
  "",
);

/** Antepone la ruta base a un fichero de `public/`. */
export function asset(ruta: string): string {
  return `${BASE_PATH}${ruta}`;
}
