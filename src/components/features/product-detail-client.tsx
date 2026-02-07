"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ShoppingBag, MessageCircle, ArrowLeft, Truck, ShieldCheck } from "lucide-react";
import { useConfig } from "@/context/config-context";
import Link from "next/link";
import { Product } from "@/types";

interface ProductDetailClientProps {
    product: Product;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
    const { whatsappNumber } = useConfig();
    const finalNumber = whatsappNumber || "525512345678";

    return (
        <div className="container px-4 py-12 md:px-6">
            <Link href="/catalogo" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Catálogo
            </Link>

            <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
                {/* Gallery */}
                <div className="space-y-4">
                    <div className="relative aspect-square overflow-hidden rounded-xl border bg-muted shadow-sm">
                        {product.image_url ? (
                            <Image
                                src={product.image_url}
                                alt={product.name}
                                fill
                                className="object-cover"
                                priority
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-muted-foreground">
                                Sin Imagen
                            </div>
                        )}
                    </div>
                </div>

                {/* Product Info */}
                <div className="space-y-8">
                    <div>
                        <div className="mb-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                            {product.categories?.name || "Sin Categoría"}
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            {product.name}
                        </h1>
                        <div className="mt-4 text-4xl font-bold text-primary">
                            ${product.price ? product.price.toFixed(2) : "0.00"}
                            <span className="text-sm font-normal text-muted-foreground ml-2">MXN</span>
                        </div>
                    </div>

                    <div className="prose prose-zinc text-muted-foreground">
                        <p>{product.description}</p>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <Truck className="h-5 w-5 text-primary" />
                            <span>Envío disponible a todo México</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <ShieldCheck className="h-5 w-5 text-primary" />
                            <span>Garantía de calidad BULTEX</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-4">
                        {product.ml_link && (
                            <a href={product.ml_link} target="_blank" rel="noopener noreferrer" className="w-full">
                                <Button size="lg" className="w-full gap-2 text-base">
                                    <ShoppingBag className="h-5 w-5" />
                                    Comprar Ahora (Menudeo)
                                </Button>
                            </a>
                        )}

                        <a
                            href={`https://wa.me/${finalNumber}?text=Hola, me interesa cotizar mayoreo del producto: ${product.name} (ID: ${product.id})`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full"
                        >
                            <Button size="lg" variant="secondary" className="w-full gap-2 text-base text-green-700 bg-green-50 hover:bg-green-100 border border-green-200">
                                <MessageCircle className="h-5 w-5" />
                                Cotizar Mayoreo (WhatsApp)
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
