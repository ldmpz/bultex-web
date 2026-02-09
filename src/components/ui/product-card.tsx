"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShoppingBag, MessageCircle } from "lucide-react";
import { useConfig } from "@/context/config-context";

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    mlLink?: string; // MercadoLibre
}

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { config } = useConfig();
    const finalNumber = config.quote_whatsapp || "525512345678";

    return (
        <motion.div
            className="group relative overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-lg"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Image Container */}
            <div className="aspect-square relative overflow-hidden bg-muted">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="font-semibold tracking-tight text-lg">{product.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                    </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                    <span className="font-bold text-lg text-primary">
                        ${product.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider bg-secondary/10 px-2 py-1 rounded-sm">
                        {product.category}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-2">
                    <Link href={`/producto/${product.id}`} className="col-span-2">
                        <Button className="w-full" variant="secondary">Ver Detalles</Button>
                    </Link>
                    {product.mlLink && (
                        <a href={product.mlLink} target="_blank" rel="noopener noreferrer" className="w-full">
                            <Button
                                className="w-full text-xs gap-1 px-2 bg-white text-slate-900 border border-slate-200 transition-colors shadow-sm hover:bg-[var(--button-cta)] hover:text-[var(--button-cta-foreground)] hover:border-transparent font-bold"
                                size="sm"
                            >
                                <ShoppingBag className="h-3 w-3" />
                                Comprar
                            </Button>
                        </a>
                    )}

                    <a
                        href={`https://wa.me/${finalNumber}?text=Hola, me interesa mayoreo del producto: ${product.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={product.mlLink ? "w-full" : "col-span-2"}
                    >
                        <Button className="w-full text-xs gap-1 bg-green-600 hover:bg-green-700 text-white px-2" size="sm">
                            <MessageCircle className="h-3 w-3" />
                            Mayoreo
                        </Button>
                    </a>
                </div>
            </div>
        </motion.div>
    );
}
