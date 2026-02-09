"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/ui/product-card";
import { Button } from "@/components/ui/button";
import { Filter, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Category, Product } from "@/types";

import { useSearchParams } from "next/navigation";

export function CatalogClient() {
    const searchParams = useSearchParams();
    const categorySlug = searchParams.get('category');

    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            const { data: cats } = await supabase.from('categories').select('*');
            if (cats) {
                setCategories(cats);
            }
        };
        fetchCategories();
    }, []);

    // Sync URL slug with selected category
    useEffect(() => {
        if (categories.length > 0) {
            if (categorySlug) {
                const matchedCategory = categories.find(c => c.slug === categorySlug);
                if (matchedCategory) {
                    setSelectedCategory(matchedCategory.id);
                } else {
                    // Slug exists but no match found (or invalid) -> show all? or keep previous?
                    // Safe default: Show all if slug is invalid
                    setSelectedCategory(null);
                }
            } else {
                // No slug in URL -> Show all
                setSelectedCategory(null);
            }
        }
    }, [categorySlug, categories]);

    // Separate effect for products when category changes
    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            let query = supabase
                .from('products')
                .select('*, categories(name, slug)')
                .eq('is_active', true);

            if (selectedCategory) {
                query = query.eq('category_id', selectedCategory);
            }

            const { data: prods } = await query;
            if (prods) {
                setProducts(prods as unknown as Product[]);
            }
            setLoading(false);
        };

        fetchProducts();
    }, [selectedCategory]);

    return (
        <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="w-full md:w-64 space-y-6">
                <div className="flex items-center gap-2 font-semibold text-lg">
                    <Filter className="h-5 w-5" />
                    Filtros
                </div>
                <div className="flex flex-wrap md:flex-col gap-2">
                    <Button
                        variant={selectedCategory === null ? "default" : "ghost"}
                        className="justify-start w-full"
                        onClick={() => setSelectedCategory(null)}
                    >
                        Todos
                    </Button>
                    {categories.map((category) => (
                        <Button
                            key={category.id}
                            variant={selectedCategory === category.id ? "default" : "ghost"}
                            className="justify-start w-full"
                            onClick={() => setSelectedCategory(category.id)}
                        >
                            {category.name}
                        </Button>
                    ))}
                </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
                {loading ? (
                    <div className="flex justify-center py-20">
                        <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={{
                                        id: product.id,
                                        name: product.name,
                                        description: product.description || "",
                                        price: product.price,
                                        image: product.image_url || "/placeholder.png",
                                        category: product.categories?.name || "Sin Categoría",
                                        mlLink: product.ml_link || undefined
                                    }}
                                />
                            ))}
                        </div>

                        {products.length === 0 && (
                            <div className="text-center py-12 bg-muted/30 rounded-lg">
                                <p className="text-muted-foreground mb-4">No se encontraron productos en esta categoría.</p>
                                <Button variant="link" onClick={() => setSelectedCategory(null)}>
                                    Ver todos los productos
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
