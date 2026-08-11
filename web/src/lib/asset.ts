/**
 * Rutas a ficheros de `public/`.
 *
 * Hoy la web se publica en la raíz del dominio
 * (`https://miskyrestaurant.github.io/`), así que `BASE_PATH` está vacío y
 * `asset()` devuelve la ruta tal cual. Pero si el sitio pasara a colgar de una
 * subcarpeta —basta con que cambie el nombre del repositorio— haría falta
 * anteponerla: Next.js se la añade sola a sus propios ficheros (`/_next/...`),
 * pero NO a las imágenes de `public/` que referenciamos a mano, y todas
 * quedarían en 404.
 *
 * Para que eso no vuelva a pasar, toda ruta a `public/` pasa por aquí:
 *
 *   asset("/images/misky-2.jpeg")
 *     → "/images/misky-2.jpeg"                 sirviendo en la raíz
 *     → "/subcarpeta/images/misky-2.jpeg"      sirviendo bajo una subcarpeta
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
