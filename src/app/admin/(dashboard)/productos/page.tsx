"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";

// Define Product type to match DB
type Product = {
    id: string;
    name: string;
    price: number;
    category_id: string; // Join with categories ideally later
    image_url: string;
    is_active: boolean;
};

export default function ProductsAdminPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setProducts(data);
        if (error) console.error("Error fetching products:", error);
        setLoading(false);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("¿Estás seguro de eliminar este producto?")) return;

        const { error } = await supabase.from('products').delete().match({ id });
        if (!error) {
            fetchProducts();
        } else {
            alert("Error al eliminar");
        }
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Productos</h1>
                <Link href="/admin/productos/nuevo">
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" /> Nuevo Producto
                    </Button>
                </Link>
            </div>

            <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border">
                <Search className="h-5 w-5 text-gray-400" />
                <Input
                    placeholder="Buscar productos..."
                    className="border-0 focus-visible:ring-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="text-center py-10">Cargando productos...</div>
            ) : (
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700 font-medium border-b">
                            <tr>
                                <th className="px-6 py-4">Imagen</th>
                                <th className="px-6 py-4">Nombre</th>
                                <th className="px-6 py-4">Precio</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {filteredProducts.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-3">
                                        <div className="relative h-12 w-12 rounded-md overflow-hidden bg-gray-100">
                                            {product.image_url ? (
                                                <Image src={product.image_url} alt={product.name} fill className="object-cover" />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-xs text-gray-400">N/A</div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-3 font-medium">{product.name}</td>
                                    <td className="px-6 py-3">${product.price.toFixed(2)}</td>
                                    <td className="px-6 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${product.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                            {product.is_active ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 text-right space-x-2">
                                        <Link href={`/admin/productos/editar/${product.id}`}>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                            onClick={() => handleDelete(product.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {filteredProducts.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                                        No se encontraron productos.
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
