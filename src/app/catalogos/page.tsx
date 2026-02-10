import { CatalogosSection } from "@/components/sections/catalogos";

export const metadata = {
    title: "Catálogos PDF - BULTEX",
    description: "Descarga nuestros catálogos en PDF con toda la información de productos y especificaciones.",
};

export default function CatalogosPage() {
    return (
        <div className="bg-slate-50 min-h-screen pt-8">
            <CatalogosSection />
        </div>
    );
}
