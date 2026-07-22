"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import type { ReservationStatus } from "@prisma/client";

/** Exige sesión válida; redirige al login si no la hay. */
async function requireSession() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  return session;
}

function refresh() {
  revalidatePath("/admin");
  revalidatePath("/admin/menu");
  revalidatePath("/"); // la home consume la carta
}

/* ----------------------------- Reservas ----------------------------- */

export async function setReservationStatus(id: number, status: ReservationStatus) {
  await requireSession();
  await prisma.reservation.update({ where: { id }, data: { status } });
  refresh();
}

export async function deleteReservation(id: number) {
  await requireSession();
  await prisma.reservation.delete({ where: { id } });
  refresh();
}

/* ------------------------------ Carta ------------------------------- */

type ItemInput = {
  name: string;
  description: string;
  price: number;
  categoryId: number;
  image: string | null;
  featured: boolean;
  spicy: boolean;
  available: boolean;
};

function parseItem(formData: FormData): ItemInput {
  return {
    name: String(formData.get("name") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    price: Number(formData.get("price")),
    categoryId: Number(formData.get("categoryId")),
    image: (String(formData.get("image") ?? "").trim() || null) as string | null,
    featured: formData.get("featured") === "on",
    spicy: formData.get("spicy") === "on",
    available: formData.get("available") === "on",
  };
}

function validateItem(data: ItemInput): string | null {
  if (data.name.length < 2) return "El nombre es obligatorio.";
  if (data.description.length < 4) return "La descripción es obligatoria.";
  if (!Number.isFinite(data.price) || data.price < 0) return "Precio inválido.";
  if (!Number.isInteger(data.categoryId) || data.categoryId <= 0)
    return "Selecciona una categoría.";
  return null;
}

export async function createMenuItem(formData: FormData) {
  await requireSession();
  const data = parseItem(formData);
  const error = validateItem(data);
  if (error) return { error };

  await prisma.menuItem.create({ data });
  refresh();
  return { ok: true };
}

export async function updateMenuItem(id: number, formData: FormData) {
  await requireSession();
  const data = parseItem(formData);
  const error = validateItem(data);
  if (error) return { error };

  await prisma.menuItem.update({ where: { id }, data });
  refresh();
  return { ok: true };
}

export async function deleteMenuItem(id: number) {
  await requireSession();
  await prisma.menuItem.delete({ where: { id } });
  refresh();
}

export async function toggleMenuItemField(
  id: number,
  field: "featured" | "available",
  value: boolean,
) {
  await requireSession();
  await prisma.menuItem.update({ where: { id }, data: { [field]: value } });
  refresh();
}
