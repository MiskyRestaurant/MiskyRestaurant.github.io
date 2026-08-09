"use client";

/** Botón de imprimir. Se oculta al imprimir para que no salga en el papel. */
export default function BotonImprimir() {
  return (
    <div className="mx-auto mb-6 flex w-[19cm] max-w-[92vw] justify-end print:hidden">
      <button
        type="button"
        onClick={() => window.print()}
        className="rounded-full bg-misky-red px-6 py-3 font-label text-sm font-semibold uppercase tracking-wide text-white shadow-lg transition-transform hover:scale-[1.03] hover:bg-misky-red-dark"
      >
        Imprimir el cartel
      </button>
    </div>
  );
}
