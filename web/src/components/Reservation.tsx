"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { useLang } from "@/lib/i18n";

type Status = "idle" | "loading" | "success" | "error";

const TIMES = [
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

export default function Reservation() {
  const { t } = useLang();
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? t.reservation.errorSend);

      setStatus("success");
      setMessage(t.reservation.success);
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : t.reservation.error);
    }
  }

  const today = "2026-06-20";
  const inputClass =
    "w-full rounded-xl border border-misky-sand/60 bg-misky-cream px-4 py-3 text-misky-ink placeholder:text-misky-ink-soft/50 focus:border-misky-red focus:ring-2 focus:ring-misky-red/20 outline-none transition";

  return (
    <section id="reservas" className="py-24 sm:py-32 bg-misky-cream-dark">
      <div className="mx-auto max-w-5xl px-6">
        <div className="grid lg:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl bg-misky-cream">
          {/* Panel decorativo */}
          <div className="relative bg-misky-red p-10 sm:p-12 text-misky-cream flex flex-col justify-center">
            <div className="absolute top-0 inset-x-0 h-2 andean-border" />
            <p className="eyebrow text-misky-yellow">{t.reservation.eyebrow}</p>
            <h2 className="mt-3 font-display text-4xl font-extrabold leading-tight">
              {t.reservation.title}
            </h2>
            <p className="mt-4 text-misky-cream/85 leading-relaxed">
              {t.reservation.intro}
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <span className="text-misky-yellow">✦</span>{" "}
                {t.reservation.bullet1}
              </li>
              <li className="flex items-center gap-3">
                <span className="text-misky-yellow">✦</span>{" "}
                {t.reservation.bullet2}
              </li>
              <li className="flex items-center gap-3">
                <span className="text-misky-yellow">✦</span>{" "}
                {t.reservation.bullet3}
              </li>
            </ul>
          </div>

          {/* Formulario */}
          <div className="p-8 sm:p-10">
            <Reveal>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-misky-ink mb-1.5">
                    {t.reservation.name}
                  </label>
                  <input
                    name="name"
                    required
                    minLength={2}
                    placeholder={t.reservation.namePh}
                    className={inputClass}
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-misky-ink mb-1.5">
                      {t.reservation.email}
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder={t.reservation.emailPh}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-misky-ink mb-1.5">
                      {t.reservation.phone}
                    </label>
                    <input
                      name="phone"
                      required
                      placeholder={t.reservation.phonePh}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-misky-ink mb-1.5">
                      {t.reservation.date}
                    </label>
                    <input
                      name="date"
                      type="date"
                      required
                      min={today}
                      defaultValue={today}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-misky-ink mb-1.5">
                      {t.reservation.time}
                    </label>
                    <select name="time" required className={inputClass}>
                      {TIMES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-misky-ink mb-1.5">
                      {t.reservation.guests}
                    </label>
                    <select name="guests" required className={inputClass} defaultValue="2">
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-misky-ink mb-1.5">
                    {t.reservation.notes}
                  </label>
                  <textarea
                    name="notes"
                    rows={2}
                    placeholder={t.reservation.notesPh}
                    className={inputClass}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-full bg-misky-red px-6 py-3.5 font-label uppercase tracking-wide text-sm font-semibold text-white shadow-md hover:bg-misky-red-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading"
                    ? t.reservation.sending
                    : t.reservation.submit}
                </button>

                {message && (
                  <p
                    className={`text-sm rounded-xl px-4 py-3 ${
                      status === "success"
                        ? "bg-misky-green/15 text-misky-green"
                        : "bg-misky-red/10 text-misky-red"
                    }`}
                  >
                    {message}
                  </p>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
