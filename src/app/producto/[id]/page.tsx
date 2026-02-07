import { supabase } from "@/lib/supabase";
import { Product } from "@/types";
import { Metadata, ResolvingMetadata } from 'next';
import { ProductDetailClient } from "@/components/features/product-detail-client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
    params: { id: string }
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const id = params.id

    const { data: product } = await supabase
        .from('products')
        .select('name, description, image_url')
        .eq('id', id)
        .single()

    if (!product) {
        return {
            title: 'Producto no encontrado | BULTEX',
        }
    }

    return {
        title: product.name,
        description: product.description || `Detalles de ${product.name}`,
        openGraph: {
            images: product.image_url ? [product.image_url] : [],
        },
    }
}

export default async function ProductPage({ params }: Props) {
    const { id } = params;

    const { data, error } = await supabase
        .from('products')
        .select('*, categories(name)')
        .eq('id', id)
        .single();

    if (error || !data) {
        return (
            <div className="container py-24 text-center">
                <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
                <Link href="/catalogo">
                    <Button>Volver al Catálogo</Button>
                </Link>
            </div>
        );
    }

    const product = data as unknown as Product;

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: product.image_url,
        description: product.description,
        sku: product.id,
        offers: {
            '@type': 'Offer',
            price: product.price,
            priceCurrency: 'MXN',
            availability: 'https://schema.org/InStock',
            url: `https://bultex-web.vercel.app/producto/${product.id}`,
        },
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ProductDetailClient product={product} />
        </>
    );
}
