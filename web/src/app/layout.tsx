import type { Metadata } from "next";
import { Bitter, Oswald, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const bitter = Bitter({
  variable: "--font-bitter",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// El título y la descripción son fijos: los buscadores los leen una sola vez y
// no cambian con el interruptor de idioma. Van en inglés, como la web, pero las
// palabras clave cubren los dos idiomas para no perder las búsquedas en español.
export const metadata: Metadata = {
  title: {
    default:
      "Misky Peruvian Cuisines | Authentic Peruvian Food in Battle Creek, MI",
    template: "%s | Misky Peruvian Cuisines",
  },
  description:
    "Misky Peruvian Cuisines — authentic Peruvian food in Battle Creek, Michigan. Rotisserie chicken, lomo saltado, ají de gallina, chaufa rice and more. Come visit us.",
  keywords: [
    "Peruvian restaurant",
    "Peruvian food",
    "Battle Creek",
    "Michigan",
    "rotisserie chicken",
    "lomo saltado",
    "restaurante peruano",
    "comida peruana",
    "pollo a la brasa",
    "Misky",
  ],
  openGraph: {
    title: "Misky Peruvian Cuisines",
    description:
      "Authentic Peruvian food in Battle Creek, Michigan. Come visit us.",
    type: "website",
    locale: "en_US",
    alternateLocale: "es_US",
  },
  // El icono de la pestaña NO se declara aquí: Next lo toma de `src/app/icon.png`
  // y genera él mismo la etiqueta, con la ruta base ya resuelta. Declararlo
  // además a mano dejaba dos iconos compitiendo y el navegador elegía el otro.
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bitter.variable} ${oswald.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
