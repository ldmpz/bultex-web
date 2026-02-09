"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
import Link from "next/link";
// import Image from "next/image";

export default function CategoryFormPage() {
    const router = useRouter();
    const params = useParams();
    const isEditing = !!params.id;

    const [loading, setLoading] = useState(false);

    // Form State
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        const loadCategory = async () => {
            if (isEditing) {
                const { data: category } = await supabase
                    .from('categories')
                    .select('*')
                    .eq('id', params.id)
                    .single();

                if (category) {
                    setName(category.name);
                    setSlug(category.slug);
                    setDescription(category.description || "");
                    setImageUrl(category.image_url || "");
                }
            }
        };
        loadCategory();
    }, [isEditing, params.id]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            if (!e.target.files || e.target.files.length === 0) {
                return;
            }

            const file = e.target.files[0];
            const fileExt = file.name.split('.').pop();
            const fileName = `cat_${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('categories')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('categories').getPublicUrl(filePath);
            setImageUrl(data.publicUrl);
        } catch (error: any) {
            alert("Error subiendo imagen: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    // Auto-generate slug from name if empty
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);
        if (!isEditing && !slug) {
            setSlug(value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const categoryData = {
            name,
            slug: slug || name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
            description,
            image_url: imageUrl,
        };

        let error;
        if (isEditing) {
            const { error: updateError } = await supabase
                .from('categories')
                .update(categoryData)
                .eq('id', params.id);
            error = updateError;
        } else {
            const { error: insertError } = await supabase
                .from('categories')
                .insert([categoryData]);
            error = insertError;
        }

        if (error) {
            alert("Error al guardar: " + error.message);
            setLoading(false);
        } else {
            router.push("/admin/categorias");
            router.refresh();
        }
    };

    return (
        <div className="max-w-2xl mx-auto py-8">
            <div className="mb-8 flex items-center gap-4">
                <Link href="/admin/categorias">
                    <Button variant="ghost" size="icon"><ArrowLeft /></Button>
                </Link>
                <h1 className="text-2xl font-bold">{isEditing ? "Editar Categoría" : "Nueva Categoría"}</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border">
                {/* Image Upload */}
                <div className="space-y-2">
                    <label className="text-sm font-medium">Imagen de Categoría</label>
                    <div className="flex items-center gap-4">
                        <div className="relative h-24 w-24 rounded-lg border bg-gray-50 overflow-hidden flex items-center justify-center">
                            {imageUrl ? (
                                <img src={imageUrl} alt="Preview" className="h-full w-full object-cover" />
                            ) : (
                                <Upload className="h-8 w-8 text-gray-300" />
                            )}
                        </div>
                        <div className="flex-1">
                            {/* Hidden file input controlled by label or button could be better, but simple input works */}
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
                    <Input required value={name} onChange={handleNameChange} placeholder="Ej. Uniformes" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Descripción</label>
                    <Input value={description} onChange={e => setDescription(e.target.value)} placeholder="Breve descripción de la categoría" />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Slug (URL)</label>
                    <Input value={slug} onChange={e => setSlug(e.target.value)} placeholder="ej. uniformes" />
                    <p className="text-xs text-muted-foreground">Identificador único para la URL.</p>
                </div>

                <div className="pt-4 border-t">
                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        {isEditing ? "Guardar Cambios" : "Crear Categoría"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
