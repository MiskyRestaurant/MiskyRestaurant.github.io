# Misky Peruvian Cuisines — Web

Sitio web del restaurante **Misky Peruvian Cuisines** (Battle Creek, MI), con
carta dinámica, sistema de reservas y panel de administración.

Este README es el **único documento de referencia**: desarrollo, despliegue y
todos los comandos de mantenimiento del sistema.

---

## 1. Stack

- **Next.js 16** (App Router, React 19, Server Components + Server Actions)
- **Tailwind CSS v4** (sistema de diseño según el manual de marca)
- **Prisma 6 + PostgreSQL**
- **Auth propia** con `jose` (JWT en cookie httpOnly) + `bcryptjs`
- **Framer Motion** (animaciones)
- **Docker + Caddy** (app, base de datos y HTTPS automático en contenedores)

### Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Web pública: hero, nosotros, especialidades, carta, galería, ubicación |
| `/admin` | Redirige a `/admin/menu` |
| `/admin/menu` | Panel — CRUD de la carta (crear, editar, destacar, disponibilidad, subir fotos) |
| `/admin/login` | Acceso al panel |
| `POST /api/admin/upload` | Sube la foto de un plato (solo admin) |
| `POST /api/auth/login` · `logout` | Sesión del admin |

> La web no tiene formulario de reservas: los clientes llaman al teléfono que
> figura en la sección de Ubicación y en el pie de página.

---

## 2. Desarrollo local

Requiere **Docker Desktop** instalado y corriendo.

```bash
docker compose up -d --build      # construye y levanta app + PostgreSQL
```

En el primer arranque aplica las migraciones y siembra la base automáticamente
(15 platos + usuario admin). Luego:

- Web pública → http://localhost:3000
- Panel admin → http://localhost:3000/admin/login

Comandos útiles en local:

```bash
docker compose logs -f app        # ver logs de la app
docker compose down               # detener (conserva los datos)
docker compose down -v            # detener y BORRAR la base de datos
docker compose exec app npx tsx prisma/seed.ts   # re-sembrar (idempotente)
```

> Los datos persisten en el volumen `misky_pgdata`. Postgres se expone en el
> host en el puerto **5544** (para `prisma studio` u otras herramientas), porque
> 5432/5433 suelen estar ocupados por otros contenedores.

### Desarrollo sin Docker (opcional)

Necesitas un PostgreSQL accesible (puedes levantar solo el de compose con
`docker compose up -d db`) y un `.env` con su `DATABASE_URL`.

```bash
npm install
npx prisma migrate dev        # aplica migraciones (y genera el cliente)
npm run db:seed               # carga categorías, platos y usuario admin
npm run dev                   # http://localhost:3000
```

### Credenciales del panel (demo)

```
Correo:      admin@misky.pe
Contraseña:  misky2026
```

Definidas en `.env` (`ADMIN_EMAIL`, `ADMIN_PASSWORD`) y aplicadas por el seed.
**Cambiar obligatoriamente en producción**, junto con `AUTH_SECRET`.

---

## 3. Qué hace falta para publicar la web

La web es una aplicación con servidor y base de datos: **no** se puede subir a
un hosting de solo ficheros ni a un servicio de fichas de negocio (Google
Business Profile, APN Tech Prime Listing y similares publican datos del negocio,
no aplicaciones). Hacen falta dos cosas:

| Pieza | Qué es | Coste orientativo |
|-------|--------|-------------------|
| **VPS** | Servidor Linux (Ubuntu 22.04+) con Docker | 5–6 €/mes (Hetzner, DigitalOcean, Contabo) |
| **Dominio** | Ej. `miskyperuviancuisines.com` | ~12 €/año |

Los servicios de listings (APN Tech y compañía) son **complementarios**: una vez
la web esté online, se pone su URL en la ficha del negocio para que la
distribuyan a los directorios. No sustituyen al alojamiento.

---

## 4. Despliegue en producción (primera vez)

### 4.1 Apuntar el dominio al servidor

En el panel del registrador del dominio (GoDaddy, Namecheap…), crea dos
registros **A** apuntando a la IP pública del VPS:

```
A    @      <IP_DEL_VPS>
A    www    <IP_DEL_VPS>
```

Espera a que propague (`nslookup tudominio.com`). Caddy necesita que el DNS ya
resuelva para poder emitir el certificado HTTPS.

### 4.2 Preparar el servidor

```bash
ssh root@<IP_DEL_VPS>

# Docker + plugin de compose
curl -fsSL https://get.docker.com | sh

# Puertos 80 y 443 abiertos (si usas ufw)
ufw allow 80,443/tcp && ufw allow OpenSSH && ufw enable
```

### 4.3 Clonar y configurar

```bash
git clone <URL_DEL_REPOSITORIO> misky
cd misky/web

cp .env.prod.example .env
nano .env          # rellena TODOS los valores
```

Valores del `.env` de producción:

| Variable | Cómo generarla / qué poner |
|----------|----------------------------|
| `DOMAIN` | Tu dominio sin `http://`. Ej. `miskyperuviancuisines.com` |
| `POSTGRES_PASSWORD` | `openssl rand -base64 24` |
| `AUTH_SECRET` | `openssl rand -base64 32` |
| `ADMIN_EMAIL` | Correo real del administrador |
| `ADMIN_PASSWORD` | Contraseña fuerte (no la de demo) |

> El `.env` **nunca** se sube al repositorio: está en `.gitignore`.

### 4.4 Levantar

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

Caddy pide el certificado a Let's Encrypt automáticamente. En 1–2 minutos:

- https://tudominio.com → web pública
- https://tudominio.com/admin/login → panel

Verifica que todo arrancó bien:

```bash
docker compose -f docker-compose.prod.yml ps
docker compose -f docker-compose.prod.yml logs -f
```

> **Nota:** el `Caddyfile` sirve el dominio de `DOMAIN`. Si quieres que
> `www.tudominio.com` redirija al dominio principal, añade al final del
> `Caddyfile`:
> ```
> www.{$DOMAIN} {
>     redir https://{$DOMAIN}{uri} permanent
> }
> ```

### 4.5 Registrar la web en las fichas del negocio

Con la web ya online, pon la URL en el campo **Website** de:

- Google Business Profile
- El panel de APN Tech (u otro gestor de listings contratado), para que la
  propague al resto de directorios.

---

## 5. Operación y mantenimiento

Todos los comandos se ejecutan **por SSH, dentro de `misky/web`**. Para no
repetir el `-f docker-compose.prod.yml` en cada comando, puedes crear un alias
en el servidor:

```bash
echo "alias dcp='docker compose -f docker-compose.prod.yml'" >> ~/.bashrc
source ~/.bashrc
```

A partir de ahí, `dcp ps`, `dcp logs -f app`, etc.

### Actualizar la web tras un cambio de código

Este es el comando del día a día. Trae los cambios, reconstruye la imagen,
aplica las migraciones pendientes y reinicia:

```bash
cd ~/misky/web
git pull
docker compose -f docker-compose.prod.yml up -d --build
```

El entrypoint corre `prisma migrate deploy` y el seed (idempotente) en cada
arranque, así que **no hay pasos manuales de base de datos**. La caída dura unos
segundos, mientras el contenedor nuevo sustituye al viejo.

### Comandos frecuentes

| Objetivo | Comando |
|----------|---------|
| Estado de los contenedores | `docker compose -f docker-compose.prod.yml ps` |
| Logs de la app en vivo | `docker compose -f docker-compose.prod.yml logs -f app` |
| Logs de Caddy (problemas de HTTPS) | `docker compose -f docker-compose.prod.yml logs -f caddy` |
| Reiniciar solo la app | `docker compose -f docker-compose.prod.yml restart app` |
| Parar todo (conserva datos) | `docker compose -f docker-compose.prod.yml down` |
| Volver a levantar | `docker compose -f docker-compose.prod.yml up -d` |
| Consola SQL | `docker compose -f docker-compose.prod.yml exec db psql -U misky -d misky` |
| Re-sembrar la carta (idempotente) | `docker compose -f docker-compose.prod.yml exec app npx tsx prisma/seed.ts` |
| Liberar espacio de imágenes viejas | `docker image prune -f` |

### Copia de seguridad de la base de datos

```bash
# Backup (queda un .sql con la fecha en el directorio actual)
docker compose -f docker-compose.prod.yml exec -T db \
  pg_dump -U misky misky > backup-$(date +%F).sql

# Restaurar desde un backup
cat backup-2026-07-27.sql | docker compose -f docker-compose.prod.yml exec -T db \
  psql -U misky -d misky
```

Automatizar el backup diario a las 3:00 con cron:

```bash
crontab -e
# añade esta línea:
0 3 * * * cd /root/misky/web && docker compose -f docker-compose.prod.yml exec -T db pg_dump -U misky misky > /root/backups/misky-$(date +\%F).sql
```

### Copia de seguridad de las fotos subidas

Las fotos que se suben desde el panel viven en el volumen `misky_uploads`
(no en el repositorio), así que necesitan su propia copia:

```bash
docker run --rm -v web_misky_uploads:/data -v $(pwd):/backup alpine \
  tar czf /backup/uploads-$(date +%F).tar.gz -C /data .
```

> El nombre `web_misky_uploads` es el que Docker asigna al estar el
> `docker-compose.yml` dentro del directorio `web/`. Si clonas el repositorio en
> otra ruta, compruébalo con `docker volume ls | grep uploads`.

### Cambiar la contraseña del administrador

Edita `ADMIN_PASSWORD` en el `.env` del servidor y borra el usuario para que el
seed lo vuelva a crear con la nueva contraseña:

```bash
nano .env      # cambia ADMIN_PASSWORD
docker compose -f docker-compose.prod.yml exec db \
  psql -U misky -d misky -c 'DELETE FROM "User";'
docker compose -f docker-compose.prod.yml up -d --force-recreate app
```

### Renovación del certificado HTTPS

Automática. Caddy la gestiona solo y guarda los certificados en el volumen
`caddy_data`. No hay nada que hacer mientras el contenedor `caddy` siga en pie y
los puertos 80/443 abiertos.

---

## 6. Datos y diseño

- La **paleta y tipografía** derivan del manual de marca oficial (rojo `#CB2A1F`,
  oro, amarillo, verde, crema). Definidas en `src/app/globals.css` (`@theme`).
- Los **logos oficiales** están en `public/logos/`.
- Las **fotos de los platos**: por defecto se sirven desde Unsplash (dominio
  autorizado en `next.config.ts`). Desde el panel se pueden subir fotos propias,
  que se guardan en `public/uploads/` (volumen `misky_uploads` en producción).

---

## 7. Resolución de problemas

| Síntoma | Causa probable y solución |
|---------|---------------------------|
| La web no carga y Caddy repite errores de certificado | El DNS aún no apunta al VPS o los puertos 80/443 están cerrados. Comprueba con `nslookup tudominio.com` y `ufw status`. |
| `Define AUTH_SECRET en el .env` al levantar | Falta una variable obligatoria en el `.env`. Repasa la tabla del punto 4.3. |
| La app reinicia en bucle | `docker compose -f docker-compose.prod.yml logs app`. Suele ser `DATABASE_URL` mal formada o una migración fallida. |
| Cambios que no aparecen tras un `git pull` | Faltó el `--build`: reconstruye con `up -d --build`. |
| Las fotos subidas desaparecen tras actualizar | El volumen `misky_uploads` no está montado. Verifica el bloque `volumes` del servicio `app`. |
