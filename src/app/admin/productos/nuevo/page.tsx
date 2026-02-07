"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type Category = {
    id: string;
    name: string;
}

export default function ProductFormPage() {
    const router = useRouter();
    const params = useParams();
    const isEditing = !!params.id;

    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);

    // Form State
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [categoryId, setCategoryId] = useState("");
    const [mlLink, setMlLink] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const loadInitialData = async () => {
            // Load Categories
            const { data: cats } = await supabase.from('categories').select('id, name');
            if (cats) setCategories(cats);

            // If editing, load product
            if (isEditing) {
                const { data: product } = await supabase
                    .from('products')
                    .select('*')
                    .eq('id', params.id)
                    .single();

                if (product) {
                    setName(product.name);
                    setDescription(product.description || "");
                    setPrice(product.price.toString());
                    setCategoryId(product.category_id || "");
                    setMlLink(product.ml_link || "");
                    setImageUrl(product.image_url || "");
                }
            }
        };
        loadInitialData();
    }, [isEditing, params.id]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            if (!e.target.files || e.target.files.length === 0) {
                throw new Error("Selecciona una imagen");
            }

            const file = e.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('products')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('products').getPublicUrl(filePath);
            setImageUrl(data.publicUrl);
        } catch (error: any) {
            alert("Error subiendo imagen: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const productData = {
            name,
            description,
            price: parseFloat(price),
            category_id: categoryId || null,
            ml_link: mlLink,
            image_url: imageUrl,
        };

        let error;
        if (isEditing) {
            const { error: updateError } = await supabase
                .from('products')
                .update(productData)
                .eq('id', params.id);
            error = updateError;
        } else {
            const { error: insertError } = await supabase
                .from('products')
                .insert([productData]);
            error = insertError;
        }

        if (error) {
            alert("Error al guardar: " + error.message);
            setLoading(false);
        } else {
            router.push("/admin/productos");
            router.refresh();
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-8">
            <div className="mb-8 flex items-center gap-4">
                <Link href="/admin/productos">
                    <Button variant="ghost" size="icon"><ArrowLeft /></Button>
                </Link>
                <h1 className="text-2xl font-bold">{isEditing ? "Editar Producto" : "Nuevo Producto"}</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border">
                {/* Image Upload */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Imagen del Producto</label>
                    <div className="flex items-center gap-4">
                        <div className="relative h-24 w-24 rounded-lg border bg-gray-50 overflow-hidden flex items-center justify-center">
                            {imageUrl ? (
                                <Image src={imageUrl} alt="Preview" fill className="object-cover" />
                            ) : (
                                <Upload className="h-8 w-8 text-gray-300" />
                            )}
                        </div>
                        <div className="flex-1">
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                disabled={uploading}
                            />
                            <p className="text-xs text-muted-foreground mt-2">
                                {uploading ? "Subiendo..." : "Formatos: JPG, PNG, WEBP"}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Nombre</label>
                    <Input required value={name} onChange={e => setName(e.target.value)} placeholder="Ej. Camisola Industrial" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Descripción</label>
                    <Textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Detalles del producto..." />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Precio (MXN)</label>
                        <Input required type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} placeholder="0.00" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Categoría</label>
                        <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            value={categoryId}
                            onChange={e => setCategoryId(e.target.value)}
                        >
                            <option value="">Seleccionar...</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Link MercadoLibre (Opcional)</label>
                    <Input value={mlLink} onChange={e => setMlLink(e.target.value)} placeholder="https://mercadolibre.com.mx/..." />
                </div>

                <div className="pt-4 border-t">
                    <Button type="submit" className="w-full" disabled={loading || uploading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isEditing ? "Guardar Cambios" : "Crear Producto"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
