"use client";

import { useMemo, useState, useTransition } from "react";
import { setReservationStatus, deleteReservation } from "@/app/admin/actions";

export type AdminReservation = {
  id: number;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes: string | null;
  status: "PENDING" | "CONFIRMED" | "CANCELLED";
  createdAt: string;
};

const STATUS_META: Record<
  AdminReservation["status"],
  { label: string; className: string }
> = {
  PENDING: { label: "Pendiente", className: "bg-misky-yellow/25 text-misky-gold" },
  CONFIRMED: { label: "Confirmada", className: "bg-misky-green/20 text-misky-green" },
  CANCELLED: { label: "Cancelada", className: "bg-misky-red/15 text-misky-red" },
};

const FILTERS = [
  { key: "ALL", label: "Todas" },
  { key: "PENDING", label: "Pendientes" },
  { key: "CONFIRMED", label: "Confirmadas" },
  { key: "CANCELLED", label: "Canceladas" },
] as const;

export default function ReservationsManager({
  reservations,
}: {
  reservations: AdminReservation[];
}) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("ALL");
  const [isPending, startTransition] = useTransition();
  const [busyId, setBusyId] = useState<number | null>(null);

  const visible = useMemo(
    () =>
      filter === "ALL"
        ? reservations
        : reservations.filter((r) => r.status === filter),
    [reservations, filter],
  );

  function act(id: number, fn: () => Promise<void>) {
    setBusyId(id);
    startTransition(async () => {
      await fn();
      setBusyId(null);
    });
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map((f) => {
          const count =
            f.key === "ALL"
              ? reservations.length
              : reservations.filter((r) => r.status === f.key).length;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`rounded-full px-4 py-2 text-sm font-semibold font-label uppercase tracking-wide transition-colors ${
                filter === f.key
                  ? "bg-misky-red text-white"
                  : "bg-misky-cream text-misky-ink-soft hover:bg-misky-sand/40"
              }`}
            >
              {f.label}
              <span className="ml-2 opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      {visible.length === 0 ? (
        <div className="rounded-2xl bg-misky-cream p-12 text-center text-misky-ink-soft">
          No hay reservas en esta vista.
        </div>
      ) : (
        <div className="space-y-3">
          {visible.map((r) => {
            const meta = STATUS_META[r.status];
            const busy = isPending && busyId === r.id;
            return (
              <div
                key={r.id}
                className={`rounded-2xl bg-misky-cream p-5 shadow-sm transition-opacity ${
                  busy ? "opacity-50" : ""
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-display text-lg font-bold text-misky-ink">
                        {r.name}
                      </h3>
                      <span
                        className={`rounded-full px-3 py-0.5 text-xs font-semibold ${meta.className}`}
                      >
                        {meta.label}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-misky-ink-soft">
                      📅 {r.date} · 🕐 {r.time} · 👥 {r.guests}{" "}
                      {r.guests === 1 ? "persona" : "personas"}
                    </p>
                    <p className="mt-0.5 text-sm text-misky-ink-soft">
                      ✉️ {r.email} · 📞 {r.phone}
                    </p>
                    {r.notes && (
                      <p className="mt-2 text-sm italic text-misky-ink-soft bg-misky-cream-dark rounded-lg px-3 py-2">
                        “{r.notes}”
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 shrink-0">
                    {r.status !== "CONFIRMED" && (
                      <button
                        disabled={busy}
                        onClick={() =>
                          act(r.id, () =>
                            setReservationStatus(r.id, "CONFIRMED"),
                          )
                        }
                        className="rounded-full bg-misky-green px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
                      >
                        Confirmar
                      </button>
                    )}
                    {r.status !== "CANCELLED" && (
                      <button
                        disabled={busy}
                        onClick={() =>
                          act(r.id, () =>
                            setReservationStatus(r.id, "CANCELLED"),
                          )
                        }
                        className="rounded-full bg-misky-cream-dark px-4 py-2 text-sm font-semibold text-misky-ink-soft hover:bg-misky-sand/50 disabled:opacity-50"
                      >
                        Cancelar
                      </button>
                    )}
                    <button
                      disabled={busy}
                      onClick={() => {
                        if (confirm(`¿Eliminar la reserva de ${r.name}?`))
                          act(r.id, () => deleteReservation(r.id));
                      }}
                      className="rounded-full border border-misky-red/30 px-4 py-2 text-sm font-semibold text-misky-red hover:bg-misky-red hover:text-white transition-colors disabled:opacity-50"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
