#!/bin/sh
set -e

echo "→ Aplicando migraciones de base de datos..."
npx prisma migrate deploy

echo "→ Sembrando datos iniciales (solo si la base está vacía)..."
npx tsx prisma/seed.ts

echo "→ Iniciando Next.js en 0.0.0.0:3000..."
exec npx next start -H 0.0.0.0 -p 3000
