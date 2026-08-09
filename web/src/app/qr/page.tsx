import type { Metadata } from "next";
import Image from "next/image";
import { QR_SVG, QR_URL } from "@/lib/qr-svg";
import { asset } from "@/lib/asset";
import BotonImprimir from "./BotonImprimir";

export const metadata: Metadata = {
  title: "Código QR de la carta",
  description:
    "Cartel imprimible con el código QR de la web de Misky Peruvian Cuisines.",
  // Esta página es para uso interno del restaurante, no para buscadores.
  robots: { index: false, follow: false },
};

/**
 * Cartel imprimible con el QR de la web.
 *
 * Pensado para imprimir en A4 y recortar, o para poner en la mesa. El QR va
 * incrustado como SVG, así que se imprime nítido a cualquier tamaño.
 */
export default function PaginaQR() {
  return (
    <main className="min-h-screen bg-misky-cream-dark py-10 print:bg-white print:py-0">
      <BotonImprimir />

      <section className="mx-auto w-[19cm] max-w-[92vw] rounded-3xl bg-misky-cream p-10 text-center shadow-xl print:w-full print:max-w-none print:rounded-none print:shadow-none">
        <div className="mx-auto mb-8 h-2 w-40 rounded-full andean-border" />

        <Image
          src={asset("/logos/logo-vertical.png")}
          alt="Misky Peruvian Cuisines"
          width={420}
          height={420}
          priority
          className="mx-auto h-40 w-auto"
        />

        {/* Inglés primero: es el idioma por defecto de la web y el de la
            mayoría de quien va a escanear esto en Battle Creek. */}
        <p className="eyebrow mt-8 text-misky-gold">Scan with your phone</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold leading-tight text-misky-ink">
          Our menu,
          <span className="block text-misky-red">on your phone</span>
        </h1>
        <p className="mt-2 font-label text-lg uppercase tracking-wide text-misky-ink-soft">
          Escanea para ver la carta
        </p>

        {/* El QR: fondo blanco y margen amplio para que la cámara lo lea bien. */}
        <div
          className="mx-auto mt-8 w-[9.5cm] max-w-full rounded-2xl bg-white p-4 ring-4 ring-misky-red"
          aria-label={`Código QR de ${QR_URL}`}
          dangerouslySetInnerHTML={{ __html: QR_SVG }}
        />

        <p className="mt-6 break-all font-label text-sm uppercase tracking-wide text-misky-ink-soft">
          {QR_URL.replace(/^https:\/\//, "")}
        </p>

        <div className="mt-8 border-t border-misky-sand/60 pt-6 text-sm text-misky-ink-soft">
          <p className="font-semibold text-misky-ink">
            2550 Capital Ave SW Ste 150 · Battle Creek, MI 49015
          </p>
          <p className="mt-1">+1 269-316-0383</p>
        </div>

        <div className="mx-auto mt-8 h-2 w-40 rounded-full andean-border" />
      </section>
    </main>
  );
}
