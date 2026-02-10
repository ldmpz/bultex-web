import { CatalogClient } from "@/components/features/catalog-client";
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
    title: "Catálogo Completo | BULTEX",
    description: "Explora nuestra variedad de uniformes industriales: camisolas, pantalones, overoles y accesorios de seguridad.",
};

export default function CatalogPage() {
    return (
        <div className="container px-4 py-8 md:px-6">
            <div className="flex flex-col gap-4 mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Catálogo de Productos</h1>
                <p className="text-muted-foreground">
                    Explora nuestra colección de uniformes industriales de alta calidad.
                </p>
            </div>
            <Suspense fallback={<div className="flex justify-center py-20">Cargando catálogo...</div>}>
                <CatalogClient />
            </Suspense>
        </div>
    );
}
