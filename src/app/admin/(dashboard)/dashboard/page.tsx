"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Package, FolderTree } from "lucide-react";

export default function DashboardPage() {
    const [stats, setStats] = useState({ products: 0, categories: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            const { count: productsCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
            const { count: categoriesCount } = await supabase.from('categories').select('*', { count: 'exact', head: true });

            setStats({
                products: productsCount || 0,
                categories: categoriesCount || 0
            });
        };
        fetchStats();
    }, []);

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">Panel de Control</h1>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                            <Package className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Total Productos</p>
                            <h3 className="text-2xl font-bold">{stats.products}</h3>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-100 text-green-600 rounded-full">
                            <FolderTree className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Categorías</p>
                            <h3 className="text-2xl font-bold">{stats.categories}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
