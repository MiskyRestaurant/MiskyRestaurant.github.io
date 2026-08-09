/**
 * Genera el código QR de la web.
 *
 *   npm run qr                       → usa la URL por defecto (GitHub Pages)
 *   npm run qr -- https://otra.com   → usa la URL que le pases
 *
 * Produce tres cosas:
 *   public/qr.png        PNG de 1600 px, para imprimir (carteles, mantel, mesa)
 *   public/qr.svg        Vectorial, escala a cualquier tamaño sin pixelarse
 *   src/lib/qr-svg.ts    El mismo SVG como módulo, para incrustarlo en /qr
 *
 * Los tres ficheros se versionan en el repositorio, así que este script solo
 * hay que volver a ejecutarlo si cambia la dirección de la web.
 */
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const URL_POR_DEFECTO = "https://vannicin.github.io/misky-restaurant/";
const url = process.argv[2] ?? URL_POR_DEFECTO;

// Corrección de errores alta (30 %): el QR sigue leyéndose aunque el papel se
// manche o se raye, algo habitual en la mesa de un restaurante.
const OPCIONES = {
  errorCorrectionLevel: "H",
  margin: 2,
  color: {
    dark: "#241c17", // misky-ink
    light: "#ffffff",
  },
};

const png = path.join(RAIZ, "public", "qr.png");
const svg = path.join(RAIZ, "public", "qr.svg");
const modulo = path.join(RAIZ, "src", "lib", "qr-svg.ts");

await mkdir(path.dirname(png), { recursive: true });
await mkdir(path.dirname(modulo), { recursive: true });

await QRCode.toFile(png, url, { ...OPCIONES, type: "png", width: 1600 });

const svgMarkup = await QRCode.toString(url, { ...OPCIONES, type: "svg" });
await writeFile(svg, svgMarkup, "utf8");

// El SVG que se incrusta en la página se estira al contenedor.
const svgAjustado = svgMarkup
  .replace(/ width="[^"]*"/, "")
  .replace(/ height="[^"]*"/, "")
  .replace("<svg ", '<svg width="100%" height="100%" ');

await writeFile(
  modulo,
  `// GENERADO POR scripts/generar-qr.mjs — no editar a mano.\n` +
    `// Para regenerarlo: npm run qr\n\n` +
    `export const QR_URL = ${JSON.stringify(url)};\n\n` +
    `export const QR_SVG = ${JSON.stringify(svgAjustado)};\n`,
  "utf8",
);

console.log(`QR generado para ${url}`);
console.log(`  · ${path.relative(RAIZ, png)}`);
console.log(`  · ${path.relative(RAIZ, svg)}`);
console.log(`  · ${path.relative(RAIZ, modulo)}`);
