import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Featured from "@/components/Featured";
import Menu from "@/components/Menu";
import Gallery from "@/components/Gallery";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import { MENU, FEATURED, DISH_COUNT } from "@/lib/menu";

// Sitio 100 % estático: la carta se lee de `src/lib/menu.ts` en tiempo de
// compilación y se incrusta en el HTML. Para cambiarla, edita ese fichero y
// sube el cambio; GitHub Actions reconstruye y publica la web.
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <About dishCount={DISH_COUNT} />
        <Featured items={FEATURED} />
        <Menu categories={MENU} />
        <Gallery />
        <Location />
      </main>
      <Footer />
    </>
  );
}
