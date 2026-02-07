import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { CTA } from "@/components/sections/cta";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Inicio | BULTEX Uniformes",
  description: "BULTEX ofrece uniformes industriales duraderos y personalizados. Camisolas, pantalones y más para la seguridad de tu equipo.",
};

export default function Home() {
  return (
    <div className="flex flex-col gap-10 pb-0">
      <Hero />
      <Features />
      <CTA />
    </div>
  );
}
