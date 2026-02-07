import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { CTA } from "@/components/sections/cta";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 pb-0">
      <Hero />
      <Features />
      <CTA />
    </div>
  );
}
