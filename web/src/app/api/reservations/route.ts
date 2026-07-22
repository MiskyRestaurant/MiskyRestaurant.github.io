import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Crea una solicitud de reserva (público). */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const date = String(body.date ?? "").trim();
  const time = String(body.time ?? "").trim();
  const guests = Number(body.guests);
  const notes = body.notes ? String(body.notes).trim() : null;

  if (name.length < 2)
    return NextResponse.json({ error: "Ingresa tu nombre." }, { status: 400 });
  if (!emailRe.test(email))
    return NextResponse.json({ error: "Correo inválido." }, { status: 400 });
  if (phone.length < 6)
    return NextResponse.json({ error: "Teléfono inválido." }, { status: 400 });
  if (!date || !time)
    return NextResponse.json(
      { error: "Selecciona fecha y hora." },
      { status: 400 },
    );
  if (!Number.isInteger(guests) || guests < 1 || guests > 30)
    return NextResponse.json(
      { error: "Número de personas inválido." },
      { status: 400 },
    );

  const reservation = await prisma.reservation.create({
    data: { name, email, phone, date, time, guests, notes },
  });

  return NextResponse.json({ ok: true, id: reservation.id }, { status: 201 });
}

/** Lista de reservas (sólo admin autenticado). */
export async function GET() {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "No autorizado." }, { status: 401 });

  const reservations = await prisma.reservation.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ reservations });
}
