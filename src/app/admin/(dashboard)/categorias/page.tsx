"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";

type Category = {
    id: string;
    name: string;
    description?: string;
    slug: string;
    image_url: string;
};

export default function CategoriesAdminPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchCategories = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setCategories(data);
        if (error) console.error("Error fetching categories:", error);
        setLoading(false);
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("¿Estás seguro de eliminar esta categoría?")) return;

        const { error } = await supabase.from('categories').delete().match({ id });
        if (!error) {
            fetchCategories();
        } else {
            alert("Error al eliminar");
        }
    };

    const filteredCategories = categories.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Categorías</h1>
                <Link href="/admin/categorias/nuevo">
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" /> Nueva Categoría
                    </Button>
                </Link>
            </div>

            <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border">
                <Search className="h-5 w-5 text-gray-400" />
                <Input
                    placeholder="Buscar categorías..."
                    className="border-0 focus-visible:ring-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="text-center py-10">Cargando categorías...</div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700 font-medium border-b">
                            <tr>
                                <th className="px-6 py-4">Nombre</th>
                                <th className="px-6 py-4">Slug</th>
                                <th className="px-6 py-4">Descripción</th>
                                <th className="px-6 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {filteredCategories.map((category) => (
                                <tr key={category.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-3 font-medium">{category.name}</td>
                                    <td className="px-6 py-3 text-gray-500">{category.slug}</td>
                                    <td className="px-6 py-3 text-gray-500 max-w-xs truncate">{category.description || "-"}</td>
                                    <td className="px-6 py-3 text-right space-x-2">
                                        <Link href={`/admin/categorias/editar/${category.id}`}>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                            onClick={() => handleDelete(category.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {filteredCategories.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                                        No se encontraron categorías.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
