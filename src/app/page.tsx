import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { CTA } from "@/components/sections/cta";
import { Trust } from "@/components/sections/trust";
import { CatalogPreview } from "@/components/sections/catalog-preview";
import { Metadata } from 'next';

export const metadata: Metadata = {
  description: "Fabricante de uniformes industriales de alta durabilidad: camisolas, pantalones, overoles y calzado de seguridad. Venta mayorista para empresas.",
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Hero />
      <Trust />
      <Features />
      <CatalogPreview />
      <CTA />
    </div>
  );
}
