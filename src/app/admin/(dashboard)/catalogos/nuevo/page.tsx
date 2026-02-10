"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Upload } from "lucide-react";
import Link from "next/link";
import { validatePDFFile, validateImageFile } from "@/lib/file-utils";
import { uploadCatalogPDFAction, uploadCatalogThumbnailAction } from "../actions";

export default function NuevoCatalogoPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        is_active: true,
    });
    const [pdfFile, setPdfFile] = useState<File | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        // Validaciones
        const newErrors: { [key: string]: string } = {};

        if (!formData.title.trim()) {
            newErrors.title = "El título es requerido";
        }

        if (!pdfFile) {
            newErrors.pdf = "Debes seleccionar un archivo PDF";
        } else {
            const validation = validatePDFFile(pdfFile);
            if (!validation.valid) {
                newErrors.pdf = validation.error!;
            }
        }

        if (thumbnailFile) {
            const validation = validateImageFile(thumbnailFile);
            if (!validation.valid) {
                newErrors.thumbnail = validation.error!;
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);

        try {
            // 1. Subir PDF usando Server Action
            const pdfFormData = new FormData();
            pdfFormData.append('file', pdfFile!);
            const pdfResult = await uploadCatalogPDFAction(pdfFormData);
            if (!pdfResult.success) {
                throw new Error(pdfResult.error);
            }

            // 2. Subir thumbnail si existe
            let thumbnailUrl = null;
            if (thumbnailFile) {
                const thumbnailFormData = new FormData();
                thumbnailFormData.append('file', thumbnailFile);
                const thumbnailResult = await uploadCatalogThumbnailAction(thumbnailFormData);
                if (!thumbnailResult.success) {
                    throw new Error(thumbnailResult.error);
                }
                thumbnailUrl = thumbnailResult.url;
            }

            // 3. Crear registro en la base de datos
            const { error } = await supabase
                .from('catalogs')
                .insert({
                    title: formData.title.trim(),
                    description: formData.description.trim() || null,
                    file_url: pdfResult.url!,
                    file_name: pdfFile!.name,
                    file_size: pdfFile!.size,
                    thumbnail_url: thumbnailUrl,
                    is_active: formData.is_active,
                    display_order: 0,
                });

            if (error) throw error;

            // Redirigir a la lista
            router.push('/admin/catalogos');
        } catch (error: any) {
            console.error('Error creating catalog:', error);
            alert(error.message || 'Error al crear el catálogo');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button asChild variant="ghost" size="sm">
                    <Link href="/admin/catalogos">
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Volver
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Nuevo Catálogo</h1>
                    <p className="text-slate-500 mt-1">Sube un nuevo catálogo PDF al sitio web</p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-lg border p-6 space-y-6 max-w-2xl">
                {/* Título */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">
                        Título <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Ej: Catálogo General 2026"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                    )}
                </div>

                {/* Descripción */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">
                        Descripción (Opcional)
                    </label>
                    <textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Descripción breve del catálogo..."
                    />
                </div>

                {/* Archivo PDF */}
                <div>
                    <label htmlFor="pdf" className="block text-sm font-medium text-slate-700 mb-1">
                        Archivo PDF <span className="text-red-500">*</span>
                    </label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                        <Upload className="h-10 w-10 text-slate-400 mx-auto mb-2" />
                        <input
                            type="file"
                            id="pdf"
                            accept="application/pdf"
                            onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                            className="hidden"
                        />
                        <label
                            htmlFor="pdf"
                            className="cursor-pointer text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Seleccionar archivo PDF
                        </label>
                        {pdfFile && (
                            <p className="text-sm text-slate-600 mt-2">
                                Seleccionado: {pdfFile.name}
                            </p>
                        )}
                        <p className="text-xs text-slate-500 mt-1">Máximo 10MB</p>
                    </div>
                    {errors.pdf && (
                        <p className="text-red-500 text-sm mt-1">{errors.pdf}</p>
                    )}
                </div>

                {/* Imagen de Presentación (Thumbnail) */}
                <div>
                    <label htmlFor="thumbnail" className="block text-sm font-medium text-slate-700 mb-1">
                        Imagen de Presentación (Opcional)
                    </label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                        <Upload className="h-10 w-10 text-slate-400 mx-auto mb-2" />
                        <input
                            type="file"
                            id="thumbnail"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
                            className="hidden"
                        />
                        <label
                            htmlFor="thumbnail"
                            className="cursor-pointer text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Seleccionar imagen
                        </label>
                        {thumbnailFile && (
                            <p className="text-sm text-slate-600 mt-2">
                                Seleccionado: {thumbnailFile.name}
                            </p>
                        )}
                        <p className="text-xs text-slate-500 mt-1">JPG, PNG o WebP - Máximo 2MB</p>
                    </div>
                    {errors.thumbnail && (
                        <p className="text-red-500 text-sm mt-1">{errors.thumbnail}</p>
                    )}
                </div>


                {/* Estado Activo */}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="is_active"
                        checked={formData.is_active}
                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label htmlFor="is_active" className="text-sm text-slate-700">
                        Publicar catálogo inmediatamente
                    </label>
                </div>

                {/* Botones */}
                <div className="flex gap-3 pt-4">
                    <Button
                        type="submit"
                        disabled={loading}
                        className="flex-1"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Creando...
                            </>
                        ) : (
                            "Crear Catálogo"
                        )}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        asChild
                        disabled={loading}
                    >
                        <Link href="/admin/catalogos">Cancelar</Link>
                    </Button>
                </div>
            </form>
        </div>
    );
}
