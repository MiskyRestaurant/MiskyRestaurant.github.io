"use client";

import Image from "next/image";
import { useState, useTransition } from "react";
import {
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleMenuItemField,
} from "@/app/admin/actions";

export type AdminMenuItem = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string | null;
  featured: boolean;
  spicy: boolean;
  available: boolean;
  categoryId: number;
};

export type AdminCategory = {
  id: number;
  name: string;
  items: AdminMenuItem[];
};

type Editing =
  | { mode: "create" }
  | { mode: "edit"; item: AdminMenuItem }
  | null;

export default function MenuManager({
  categories,
}: {
  categories: AdminCategory[];
}) {
  const [editing, setEditing] = useState<Editing>(null);
  const [isPending, startTransition] = useTransition();
  const [busyId, setBusyId] = useState<number | null>(null);

  function toggle(id: number, field: "featured" | "available", value: boolean) {
    setBusyId(id);
    startTransition(async () => {
      await toggleMenuItemField(id, field, value);
      setBusyId(null);
    });
  }

  function remove(item: AdminMenuItem) {
    if (!confirm(`¿Eliminar "${item.name}" de la carta?`)) return;
    setBusyId(item.id);
    startTransition(async () => {
      await deleteMenuItem(item.id);
      setBusyId(null);
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="font-display text-3xl font-extrabold text-misky-ink">
            Carta
          </h1>
          <p className="mt-1 text-misky-ink-soft">
            Administra los platos, precios y disponibilidad.
          </p>
        </div>
        <button
          onClick={() => setEditing({ mode: "create" })}
          className="shrink-0 rounded-full bg-misky-red px-5 py-3 font-label uppercase tracking-wide text-sm font-semibold text-white hover:bg-misky-red-dark transition-colors"
        >
          + Nuevo plato
        </button>
      </div>

      <div className="space-y-8">
        {categories.map((cat) => (
          <section key={cat.id}>
            <h2 className="font-display text-xl font-bold text-misky-red mb-3">
              {cat.name}{" "}
              <span className="text-misky-ink-soft text-sm font-normal">
                ({cat.items.length})
              </span>
            </h2>
            <div className="space-y-2">
              {cat.items.length === 0 && (
                <p className="text-sm text-misky-ink-soft italic">
                  Sin platos en esta categoría.
                </p>
              )}
              {cat.items.map((item) => {
                const busy = isPending && busyId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`rounded-2xl bg-misky-cream p-4 shadow-sm flex items-center gap-4 transition-opacity ${
                      busy ? "opacity-50" : ""
                    } ${!item.available ? "ring-1 ring-misky-red/20" : ""}`}
                  >
                    <div className="relative h-14 w-14 shrink-0 rounded-xl overflow-hidden bg-misky-cream-dark">
                      {item.image && (
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-misky-ink truncate">
                          {item.name}
                        </h3>
                        {item.spicy && <span title="Picante">🌶️</span>}
                        {!item.available && (
                          <span className="rounded-full bg-misky-red/15 text-misky-red px-2 py-0.5 text-xs font-semibold">
                            No disponible
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-misky-ink-soft truncate">
                        {item.description}
                      </p>
                    </div>

                    <span className="font-display font-extrabold text-misky-red whitespace-nowrap">
                      ${item.price.toFixed(2)}
                    </span>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        title={item.featured ? "Quitar de destacados" : "Destacar"}
                        disabled={busy}
                        onClick={() =>
                          toggle(item.id, "featured", !item.featured)
                        }
                        className={`h-9 w-9 rounded-lg text-lg transition-colors ${
                          item.featured
                            ? "bg-misky-yellow/30"
                            : "bg-misky-cream-dark grayscale opacity-60 hover:opacity-100"
                        }`}
                      >
                        ⭐
                      </button>
                      <button
                        title={
                          item.available
                            ? "Marcar no disponible"
                            : "Marcar disponible"
                        }
                        disabled={busy}
                        onClick={() =>
                          toggle(item.id, "available", !item.available)
                        }
                        className={`h-9 w-9 rounded-lg text-sm transition-colors ${
                          item.available
                            ? "bg-misky-green/20 text-misky-green"
                            : "bg-misky-cream-dark text-misky-ink-soft"
                        }`}
                      >
                        {item.available ? "✓" : "✕"}
                      </button>
                      <button
                        title="Editar"
                        disabled={busy}
                        onClick={() => setEditing({ mode: "edit", item })}
                        className="h-9 w-9 rounded-lg bg-misky-cream-dark hover:bg-misky-sand/50 transition-colors"
                      >
                        ✎
                      </button>
                      <button
                        title="Eliminar"
                        disabled={busy}
                        onClick={() => remove(item)}
                        className="h-9 w-9 rounded-lg bg-misky-cream-dark text-misky-red hover:bg-misky-red hover:text-white transition-colors"
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>

      {editing && (
        <ItemForm
          editing={editing}
          categories={categories.map((c) => ({ id: c.id, name: c.name }))}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}

/* ----------------------------- Formulario ----------------------------- */

function ItemForm({
  editing,
  categories,
  onClose,
}: {
  editing: Exclude<Editing, null>;
  categories: { id: number; name: string }[];
  onClose: () => void;
}) {
  const item = editing.mode === "edit" ? editing.item : null;
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [imageUrl, setImageUrl] = useState(item?.image ?? "");
  const [uploading, setUploading] = useState(false);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    setUploading(false);
    e.target.value = ""; // permite volver a elegir el mismo archivo
    if (!res.ok) {
      setError(data.error ?? "No se pudo subir la imagen.");
      return;
    }
    setImageUrl(data.url);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const formData = new FormData(e.currentTarget);
    const res = item
      ? await updateMenuItem(item.id, formData)
      : await createMenuItem(formData);
    if (res?.error) {
      setError(res.error);
      setSaving(false);
      return;
    }
    onClose();
  }

  const inputClass =
    "w-full rounded-xl border border-misky-sand/60 bg-misky-cream px-4 py-2.5 text-misky-ink focus:border-misky-red focus:ring-2 focus:ring-misky-red/20 outline-none transition";

  return (
    <div
      className="fixed inset-0 z-50 bg-misky-ink/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-misky-cream-dark rounded-3xl shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-misky-red px-6 py-4 sticky top-0 flex items-center justify-between">
          <h3 className="font-display text-xl font-bold text-misky-cream">
            {item ? "Editar plato" : "Nuevo plato"}
          </h3>
          <button
            onClick={onClose}
            className="text-misky-cream/80 hover:text-white text-xl"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-misky-ink mb-1">
              Nombre
            </label>
            <input
              name="name"
              required
              defaultValue={item?.name}
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-misky-ink mb-1">
              Descripción
            </label>
            <textarea
              name="description"
              required
              rows={3}
              defaultValue={item?.description}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-misky-ink mb-1">
                Precio ($)
              </label>
              <input
                name="price"
                type="number"
                step="0.5"
                min="0"
                required
                defaultValue={item?.price}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-misky-ink mb-1">
                Categoría
              </label>
              <select
                name="categoryId"
                required
                defaultValue={item?.categoryId ?? categories[0]?.id}
                className={inputClass}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-misky-ink mb-1">
              Foto del plato (opcional)
            </label>
            <div className="flex items-start gap-4">
              <div className="relative h-24 w-24 shrink-0 rounded-xl overflow-hidden bg-misky-cream border border-misky-sand/60">
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt="Vista previa"
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                ) : (
                  <span className="absolute inset-0 grid place-items-center text-3xl text-misky-ink-soft/40">
                    🍽️
                  </span>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <label className="inline-block cursor-pointer rounded-full bg-misky-ink/5 px-4 py-2 text-sm font-semibold text-misky-ink hover:bg-misky-ink/10 transition-colors">
                  {uploading
                    ? "Subiendo..."
                    : imageUrl
                      ? "Cambiar foto"
                      : "Subir foto"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFile}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
                {imageUrl && (
                  <button
                    type="button"
                    onClick={() => setImageUrl("")}
                    className="block text-xs text-misky-red hover:underline"
                  >
                    Quitar foto
                  </button>
                )}
                <p className="text-xs text-misky-ink-soft">
                  JPG, PNG o WEBP. Máximo 5 MB.
                </p>
              </div>
            </div>
            {/* La foto se guarda como ruta/URL en este campo oculto. */}
            <input type="hidden" name="image" value={imageUrl} />
          </div>

          <div className="flex flex-wrap gap-4 pt-1">
            <label className="flex items-center gap-2 text-sm text-misky-ink">
              <input
                type="checkbox"
                name="available"
                defaultChecked={item ? item.available : true}
                className="h-4 w-4 accent-misky-red"
              />
              Disponible
            </label>
            <label className="flex items-center gap-2 text-sm text-misky-ink">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={item?.featured ?? false}
                className="h-4 w-4 accent-misky-red"
              />
              Destacado
            </label>
            <label className="flex items-center gap-2 text-sm text-misky-ink">
              <input
                type="checkbox"
                name="spicy"
                defaultChecked={item?.spicy ?? false}
                className="h-4 w-4 accent-misky-red"
              />
              Picante
            </label>
          </div>

          {error && (
            <p className="text-sm rounded-xl bg-misky-red/10 text-misky-red px-4 py-2.5">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-full bg-misky-cream px-5 py-3 font-semibold text-misky-ink-soft hover:bg-misky-sand/40 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-full bg-misky-red px-5 py-3 font-label uppercase tracking-wide text-sm font-semibold text-white hover:bg-misky-red-dark transition-colors disabled:opacity-60"
            >
              {saving ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
