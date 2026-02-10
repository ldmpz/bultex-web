"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Category = {
    id: string;
    name: string;
    description?: string;
    slug: string;
    image_url: string;
};

export function CatalogPreview() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // Fetch top 4 categories
                const { data: categoriesData, error } = await supabase
                    .from('categories')
                    .select('*')
                    .limit(4);

                if (error) throw error;

                if (categoriesData) {
                    // Fetch one representative product image for each category
                    const categoriesWithImages = await Promise.all(categoriesData.map(async (cat) => {
                        // If category already has an image (manually uploaded), use it
                        if (cat.image_url) {
                            return cat;
                        }

                        const { data: products } = await supabase
                            .from('products')
                            .select('image_url')
                            .eq('category_id', cat.id)
                            .eq('is_active', true)
                            .not('image_url', 'is', null) // Ensure we get a product with an image
                            .limit(1);

                        // Use product image if available, otherwise default to null (will show placeholder icon)
                        const productImg = products?.[0]?.image_url;
                        return {
                            ...cat,
                            image_url: productImg || ""
                        };
                    }));

                    setCategories(categoriesWithImages);
                }
            } catch (error: any) {
                console.error("Error fetching categories details:", error.message || error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    // Fallback if no categories found - Just empty, don't show fake categories
    const displayCategories = categories;

    if (!loading && displayCategories.length === 0) {
        return null; // Don't show the section if there are no categories
    }

    return (
        <section className="container py-24 px-4 md:px-6 bg-slate-50 mx-auto">
            <div className="flex flex-col items-center text-center mb-12 gap-6">
                <div className="space-y-4 max-w-2xl">
                    <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                        Catálogo <span className="text-primary">Especializado</span>
                    </h2>
                    <p className="text-slate-600">
                        Encuentra la indumentaria perfecta para cada área de tu empresa.
                    </p>
                </div>
                <Link href="/productos" className="inline-flex items-center text-primary font-bold hover:text-accent transition-colors group">
                    Ver Catálogo Completo
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>

            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayCategories.map((category, index) => (
                        <motion.div
                            key={category.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className={`group relative overflow-hidden rounded-sm h-[350px] shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-200 ${index === 0 && displayCategories.length % 3 !== 0 ? "md:col-span-2 lg:col-span-1" : ""}`}
                        >
                            <Link href={`/productos?category=${category.slug}`} className="block w-full h-full bg-slate-100">
                                {category.image_url ? (
                                    <Image
                                        src={category.image_url}
                                        alt={category.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                                        <Loader2 className="h-12 w-12 mb-2 animate-pulse" />
                                        {/* Using Loader2 as generic placeholder or maybe Package if available, sticking to safe imports */}
                                        <span className="text-sm">Sin imagen</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />

                                <div className="absolute bottom-0 left-0 p-6 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
                                    <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                                    <p className="text-slate-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                                        {category.description || "Ver productos"}
                                    </p>
                                </div>

                                <div className="absolute top-4 right-4 bg-accent text-white p-2 rounded-full opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                    <ArrowRight className="h-5 w-5" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            )}

            <div className="mt-8 text-center md:hidden">
                <Link href="/productos" className="inline-flex items-center text-primary font-bold hover:text-accent transition-colors">
                    Ver Catálogo Completo
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </div>
        </section>
    );
}
