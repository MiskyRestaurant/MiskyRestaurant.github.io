import type { Metadata } from "next";
import { Bitter, Oswald, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import { asset } from "@/lib/asset";

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

export const metadata: Metadata = {
  title: {
    default: "Misky Peruvian Cuisines | Auténtica cocina peruana",
    template: "%s | Misky Peruvian Cuisines",
  },
  description:
    "Misky Peruvian Cuisines — auténtica cocina peruana en Battle Creek, Michigan. Pollo a la brasa, ceviche, lomo saltado, ají de gallina y más. Ven a visitarnos.",
  keywords: [
    "restaurante peruano",
    "cocina peruana",
    "ceviche",
    "lomo saltado",
    "pisco sour",
    "Misky",
    "Peruvian Cuisines",
  ],
  openGraph: {
    title: "Misky Peruvian Cuisines",
    description:
      "Auténtica cocina peruana en Battle Creek, Michigan. Ven a visitarnos.",
    type: "website",
    locale: "es_US",
  },
  icons: {
    icon: asset("/logos/isotipo.png"),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${bitter.variable} ${oswald.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
