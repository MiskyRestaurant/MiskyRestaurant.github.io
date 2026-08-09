import type { NextConfig } from "next";

/**
 * Sitio 100 % estático: `next build` genera HTML/CSS/JS en `out/`, sin
 * servidor Node ni base de datos. Eso es lo que necesita GitHub Pages.
 *
 * `NEXT_PUBLIC_BASE_PATH` es la subcarpeta bajo la que se publica el sitio.
 * En GitHub Pages de proyecto la URL es https://<usuario>.github.io/<repo>/,
 * así que vale `/misky-restaurant` (lo pone el workflow de despliegue).
 * En local está vacío y la web se sirve en la raíz.
 */
// Se normaliza: Next exige que empiece por "/" y no acabe en "/". Con dominio
// propio la variable llega vacía o como "/", y ahí la ruta base es la raíz.
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/\/+$/, "");

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // GitHub Pages sirve ficheros: no hay optimizador de imágenes en tiempo real.
  images: { unoptimized: true },
  // Genera carpeta/index.html en vez de carpeta.html (más robusto en Pages).
  trailingSlash: true,
};

export default nextConfig;
