import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Featured from "@/components/Featured";
import Menu from "@/components/Menu";
import Gallery from "@/components/Gallery";
import Location from "@/components/Location";
import Footer from "@/components/Footer";
import { getMenu, getFeatured } from "@/lib/data";

// Render dinámico: la carta se lee de la BD en cada petición, por lo que los
// cambios del admin se reflejan al instante y no se accede a la BD en build.
export const dynamic = "force-dynamic";

export default async function Home() {
  const [menu, featured] = await Promise.all([getMenu(), getFeatured()]);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <About />
        <Featured
          items={featured.map((f) => ({
            id: f.id,
            name: f.name,
            description: f.description,
            price: f.price,
            image: f.image,
            spicy: f.spicy,
            category: { name: f.category.name, slug: f.category.slug },
          }))}
        />
        <Menu
          categories={menu.map((c) => ({
            id: c.id,
            name: c.name,
            slug: c.slug,
            items: c.items.map((i) => ({
              id: i.id,
              name: i.name,
              description: i.description,
              price: i.price,
              image: i.image,
              spicy: i.spicy,
              featured: i.featured,
            })),
          }))}
        />
        <Gallery />
        <Location />
      </main>
      <Footer />
    </>
  );
}
