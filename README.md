# Misky Peruvian Cuisines

Web del restaurante **Misky Peruvian Cuisines** — Battle Creek, Michigan.

🌐 **https://vannicin.github.io/misky-restaurant/**
📱 **Cartel del QR para imprimir:** https://vannicin.github.io/misky-restaurant/qr/

Es un sitio estático publicado gratis en GitHub Pages. Cada push a `main`
lo recompila y lo publica automáticamente.

## Contenido del repositorio

| Carpeta | Qué hay |
|---------|---------|
| [`web/`](web/) | El código de la web. **[Su README](web/README.md) es la guía completa**: cómo cambiar la carta, las fotos, los textos y el QR. |
| [`.github/workflows/`](.github/workflows/) | El workflow que compila y publica la web |
| `imagenes-misky/`, `imagenes-misky-jpg/` | Fotos originales del restaurante |
| `WEB RESTAURANT/` | Logotipos oficiales de la marca |
| `menu-misky/` | Carta original en PDF |

## Lo más habitual: cambiar un precio o un plato

Se edita un único fichero, **[`web/src/lib/menu.ts`](web/src/lib/menu.ts)**, y se
sube el cambio. En 1–2 minutos la web está actualizada. Los detalles están en
[`web/README.md`](web/README.md#2-cambiar-la-carta-lo-más-habitual).
