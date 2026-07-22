import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import AdminShell from "@/components/admin/AdminShell";
import ReservationsManager, {
  type AdminReservation,
} from "@/components/admin/ReservationsManager";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await getSession();
  const reservations = await prisma.reservation.findMany({
    orderBy: { createdAt: "desc" },
  });

  const pending = reservations.filter((r) => r.status === "PENDING").length;
  const confirmed = reservations.filter((r) => r.status === "CONFIRMED").length;
  const totalGuests = reservations
    .filter((r) => r.status === "CONFIRMED")
    .reduce((sum, r) => sum + r.guests, 0);

  const stats = [
    { label: "Reservas totales", value: reservations.length },
    { label: "Pendientes", value: pending },
    { label: "Confirmadas", value: confirmed },
    { label: "Comensales confirmados", value: totalGuests },
  ];

  const serialized: AdminReservation[] = reservations.map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    phone: r.phone,
    date: r.date,
    time: r.time,
    guests: r.guests,
    notes: r.notes,
    status: r.status,
    createdAt: r.createdAt.toISOString(),
  }));

  return (
    <AdminShell userName={session?.name ?? "Admin"}>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-extrabold text-misky-ink">
          Reservas
        </h1>
        <p className="mt-1 text-misky-ink-soft">
          Gestiona las solicitudes de reserva de los comensales.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl bg-misky-cream p-5 shadow-sm">
            <p className="font-display text-3xl font-extrabold text-misky-red">
              {s.value}
            </p>
            <p className="mt-1 text-sm text-misky-ink-soft">{s.label}</p>
          </div>
        ))}
      </div>

      <ReservationsManager reservations={serialized} />
    </AdminShell>
  );
}
