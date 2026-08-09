# Misky Peruvian Cuisines — Web

Sitio web del restaurante **Misky Peruvian Cuisines** (Battle Creek, MI).

Es una web **estática**: se compila a ficheros HTML, CSS, JS e imágenes y se
publica en **GitHub Pages**, gratis. No hay servidor, ni base de datos, ni
Docker. Este README es el único documento de referencia.

- **Web publicada:** https://vannicin.github.io/misky-restaurant/
- **Cartel del QR:** https://vannicin.github.io/misky-restaurant/qr/

---

## 1. Cómo funciona

```
editas un fichero  →  git push a la rama main  →  GitHub Actions compila
                                                        ↓
                                              GitHub Pages publica la web
```

Todo el trabajo lo hace GitHub. Para cambiar la web **no necesitas tener nada
instalado**: basta con editar el fichero (incluso desde github.com) y guardar.
En 1–2 minutos la web está actualizada.

El workflow que hace esto es [`.github/workflows/deploy.yml`](../.github/workflows/deploy.yml).
Se dispara con cada push a `main` y también se puede lanzar a mano desde la
pestaña **Actions** de GitHub.

### Stack

- **Next.js 16** con `output: "export"` (App Router, React 19)
- **Tailwind CSS v4** — paleta y tipografía del manual de marca
- **Framer Motion** — animaciones
- Bilingüe: arranca en **inglés** (el restaurante está en Michigan) y el
  interruptor de la barra superior cambia a español. La elección se recuerda en
  el navegador de cada visitante. El idioma de partida se fija en el
  `useState` de `LanguageProvider`, en `src/lib/i18n.tsx`.

### Secciones de la web

Todo está en una sola página (`/`), con anclas de navegación:

| Ancla | Sección |
|-------|---------|
| `#inicio` | Portada |
| `#nosotros` | Nuestra historia |
| `#especialidades` | Platos destacados |
| `#carta` | Carta completa, filtrable por categoría |
| `#galeria` | Galería de fotos con visor a pantalla completa |
| `#ubicacion` | Horario, contacto y mapa |

Y una página aparte, `/qr`, con el cartel imprimible del código QR.

---

## 2. Cambiar la carta (lo más habitual)

Toda la carta vive en un único fichero: **[`src/lib/menu.ts`](src/lib/menu.ts)**.

Se puede editar directamente en github.com: abre el fichero, pulsa el lápiz,
cambia lo que necesites y pulsa **Commit changes** eligiendo la rama `main`.

Cada plato tiene esta forma:

```ts
{
  id: 305,                                  // único; no cambiarlo nunca
  name: "Cau Cau",                          // nombre del plato
  description: "Guiso de mondongo con...",  // descripción en español
  price: 13.99,                             // precio en dólares, sin el $
  image: IMG.chaufa,                        // foto (opcional)
  featured: true,                           // sale en «Especialidades» (opcional)
  spicy: true,                              // muestra el icono 🌶️ (opcional)
}
```

**Cambiar un precio** → edita `price`.
**Quitar un plato de la carta** → borra sus líneas.
**Añadir un plato** → copia un bloque entero, cámbiale el `id` por un número
que no exista y ajusta el resto.

> La traducción al inglés de las descripciones está en
> [`src/lib/i18n.tsx`](src/lib/i18n.tsx), en el mapa `DESC_EN`, indexado por el
> nombre del plato. Si un plato no está en ese mapa, en inglés se muestra la
> descripción en español. Los nombres de los platos no se traducen a propósito
> (son nombres propios).

---

## 3. Cambiar fotos

Las imágenes están en `public/`:

| Carpeta | Contenido |
|---------|-----------|
| `public/images/` | Fotos reales del local (portada, galería, sección «Nosotros») |
| `public/images/dishes/` | Fotos de los platos |
| `public/logos/` | Logotipos oficiales |

**Para cambiar la foto de un plato:** sube la nueva imagen a
`public/images/dishes/` y apunta a ella desde el objeto `IMG` de
[`src/lib/menu.ts`](src/lib/menu.ts).

> Las fotos de `public/images/dishes/` son de archivo (Unsplash), puestas como
> provisionales hasta tener fotos propias de cada plato. Las de `public/images/`
> sí son del restaurante.

**Para cambiar las fotos de la galería:** la lista está en la constante
`PHOTOS` de [`src/components/Gallery.tsx`](src/components/Gallery.tsx), y sus
títulos traducidos en `galleryItems`, dentro de `src/lib/i18n.tsx`.

---

## 4. Cambiar textos, horario y contacto

| Qué | Dónde |
|-----|-------|
| Todos los textos de la interfaz, en español e inglés | `src/lib/i18n.tsx` |
| Horario de apertura | constante `HOURS` en `src/components/Location.tsx` |
| Dirección y teléfono | constante `CONTACT` en `src/components/Location.tsx` y el pie en `src/components/Footer.tsx` |
| Enlaces de redes sociales | constante `SOCIAL` en `src/components/Footer.tsx` (ahora apuntan a `#`) |
| Título y descripción para Google | `metadata` en `src/app/layout.tsx` |
| Colores y tipografías de marca | bloque `@theme` en `src/app/globals.css` |

---

## 5. El código QR

El QR apunta a la web y está generado con corrección de errores alta, así que
se sigue leyendo aunque el papel se manche o se raye.

| Fichero | Para qué |
|---------|----------|
| `public/qr.png` | PNG de 1600 px — imprenta, carteles, vinilos |
| `public/qr.svg` | Vectorial — escala a cualquier tamaño sin pixelarse |
| `/qr` (página web) | Cartel A4 listo para imprimir, con logo y dirección |

Para imprimirlo: entra en https://vannicin.github.io/misky-restaurant/qr/ y
pulsa **Imprimir el cartel**.

Si algún día cambia la dirección de la web, hay que regenerar el QR:

```bash
npm run qr -- https://la-nueva-direccion.com
```

---

## 6. Trabajar en local (opcional)

Solo hace falta si quieres ver los cambios antes de subirlos. Necesitas
**Node.js 20 o superior** ([nodejs.org](https://nodejs.org), o en Windows
`winget install OpenJS.NodeJS.LTS`).

```bash
cd web
npm install       # solo la primera vez
npm run dev       # http://localhost:3000
```

Para comprobar que la versión final compila bien:

```bash
npm run build     # genera la carpeta out/
npx serve out     # sírvela en http://localhost:3000
```

> En local la web se sirve en la raíz (`/`). En GitHub Pages cuelga de
> `/misky-restaurant/`; de eso se encarga automáticamente la variable
> `NEXT_PUBLIC_BASE_PATH` que pone el workflow al compilar.

---

## 7. Puesta en marcha de GitHub Pages (una sola vez)

Si Pages aún no está activado en el repositorio:

1. En GitHub, ve a **Settings → Pages**.
2. En **Build and deployment → Source**, elige **GitHub Actions**.
3. Haz un push a `main` (o lanza el workflow a mano desde **Actions →
   Desplegar la web → Run workflow**).

En 1–2 minutos la web estará en
https://vannicin.github.io/misky-restaurant/.

### Usar un dominio propio (opcional)

Un dominio tipo `miskyperuviancuisines.com` cuesta unos 12 €/año; el
alojamiento en Pages sigue siendo gratis.

1. En el registrador del dominio, crea estos registros DNS:

   ```
   A     @    185.199.108.153
   A     @    185.199.109.153
   A     @    185.199.110.153
   A     @    185.199.111.153
   CNAME www  vannicin.github.io.
   ```

2. En **Settings → Pages → Custom domain**, escribe el dominio y guarda.
3. Marca **Enforce HTTPS** cuando GitHub termine de emitir el certificado.
4. Regenera el QR con la nueva dirección: `npm run qr -- https://tudominio.com`
   y sube el cambio.

El workflow detecta el dominio propio y compila el sitio sin subcarpeta, sin
tocar nada más.

---

## 8. Qué ya no está, y por qué

La versión anterior era una aplicación con servidor: PostgreSQL, Prisma, panel
de administración con login y despliegue con Docker + Caddy en un VPS.

GitHub Pages sirve **solo ficheros**: no puede ejecutar código de servidor ni
guardar datos. Al pasar la web a estática se han eliminado:

| Se eliminó | Sustituido por |
|------------|----------------|
| Base de datos PostgreSQL + Prisma | La carta en `src/lib/menu.ts` |
| Panel de administración y login | Editar ese fichero y hacer push |
| Subida de fotos desde el panel | Subir la imagen a `public/images/dishes/` |
| Docker, Caddy, VPS | GitHub Actions + GitHub Pages (gratis) |

**La consecuencia práctica:** cambiar la carta ya no se hace desde una pantalla
de administración, sino editando un fichero de texto en GitHub. A cambio, el
alojamiento pasa a costar 0 € y no hay servidor que mantener, actualizar ni
vigilar.

---

## 9. Si algo va mal

| Síntoma | Causa probable |
|---------|----------------|
| Subí un cambio y la web no cambia | Mira **Actions** en GitHub: si el workflow está en rojo, el mensaje de error dice qué falló. Si está en verde, recarga con Ctrl+F5 (caché del navegador). |
| El workflow falla al compilar | Casi siempre es un error de sintaxis en `src/lib/menu.ts`: una coma de más, una comilla sin cerrar o una llave sin su pareja. |
| La web sale sin estilos ni imágenes | El `basePath` no coincide con la URL real. Revisa **Settings → Pages** y vuelve a lanzar el workflow. |
| El QR lleva a una página que no existe | El QR se generó con otra dirección. Regenéralo: `npm run qr -- <URL correcta>`. |
