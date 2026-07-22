# Misky Peruvian Cuisines — Web

Sitio web de presentación para el restaurante **Misky Peruvian Cuisines**, con
carta dinámica, sistema de reservas y panel de administración.

## Stack

- **Next.js 16** (App Router, React 19, Server Components + Server Actions)
- **Tailwind CSS v4** (sistema de diseño según el manual de marca)
- **Prisma 6 + PostgreSQL** (base de datos)
- **Auth propia** con `jose` (JWT en cookie httpOnly) + `bcryptjs`
- **Framer Motion** (animaciones)
- **Docker + docker-compose** (app + PostgreSQL en contenedores)

## Puesta en marcha con Docker (recomendado)

Requiere **Docker Desktop** instalado y corriendo.

```bash
docker compose up -d --build      # construye y levanta app + PostgreSQL
```

Esto, en el primer arranque, aplica las migraciones y siembra la base
automáticamente (15 platos + usuario admin). Luego abre:

- Web pública → http://localhost:3000
- Panel admin → http://localhost:3000/admin/login

Comandos útiles:

```bash
docker compose logs -f app        # ver logs de la app
docker compose down               # detener (conserva los datos)
docker compose down -v            # detener y BORRAR la base de datos
docker compose exec app npx tsx prisma/seed.ts   # re-sembrar (idempotente)
```

> La base de datos persiste en el volumen `misky_pgdata`. Postgres se expone en
> el host en el puerto **5544** (para herramientas como `prisma studio`), porque
> 5432/5433 suelen estar ocupados por otros contenedores.

## Desarrollo sin Docker (opcional)

Necesitas un PostgreSQL accesible (puedes levantar solo el de compose con
`docker compose up -d db`) y un `.env` con su `DATABASE_URL`.

```bash
npm install
npx prisma migrate dev        # aplica migraciones (y crea el cliente)
npm run db:seed               # carga categorías, platos y usuario admin
npm run dev                   # http://localhost:3000
```

## Estructura

| Ruta | Descripción |
|------|-------------|
| `/` | Web pública: hero, nosotros, especialidades, carta, galería, reservas, ubicación |
| `/admin` | Panel — gestión de reservas (confirmar / cancelar / eliminar) |
| `/admin/menu` | Panel — CRUD de la carta (crear, editar, destacar, disponibilidad) |
| `/admin/login` | Acceso al panel |
| `POST /api/reservations` | Crea una reserva (público) |
| `POST /api/auth/login` · `logout` | Sesión del admin |

## Credenciales del panel (demo)

```
Correo:      admin@misky.pe
Contraseña:  misky2026
```

> Definidas en `.env` (`ADMIN_EMAIL`, `ADMIN_PASSWORD`) y aplicadas por el seed.
> **Cambiar en producción**, junto con `AUTH_SECRET`.

## Datos y diseño

- La **paleta y tipografía** derivan del manual de marca oficial (rojo `#CB2A1F`,
  oro, amarillo, verde, crema). Definidas en `src/app/globals.css` (`@theme`).
- Los **logos oficiales** están en `public/logos/`.
- Las **fotos de los platos** se sirven desde Unsplash (configurado en
  `next.config.ts`). Puedes reemplazar las URLs por fotos propias desde el panel.

## Producción

La app ya está dockerizada con PostgreSQL. Para desplegar en un servidor:

1. Define variables seguras (`AUTH_SECRET` largo y aleatorio, credenciales del
   admin) vía un `.env` junto al `docker-compose.yml` o en el orquestador.
2. `docker compose up -d --build` en el servidor (o publica la imagen a un
   registro y despliégala). El entrypoint aplica `prisma migrate deploy` solo.
3. Coloca un reverse proxy (Nginx/Caddy/Traefik) con HTTPS delante del puerto 3000.
