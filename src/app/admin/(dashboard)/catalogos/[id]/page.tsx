"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Upload, FileText } from "lucide-react";
import Link from "next/link";
import { validatePDFFile, validateImageFile } from "@/lib/file-utils";
import { uploadCatalogPDFAction, uploadCatalogThumbnailAction, deleteCatalogFileAction } from "../actions";

interface Catalog {
    id: string;
    title: string;
    description: string | null;
    file_url: string;
    file_name: string;
    file_size: number | null;
    thumbnail_url: string | null;
    display_order: number;
    is_active: boolean;
}

export default function EditarCatalogoPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [catalog, setCatalog] = useState<Catalog | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        is_active: true,
    });
    const [newPdfFile, setNewPdfFile] = useState<File | null>(null);
    const [newThumbnailFile, setNewThumbnailFile] = useState<File | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        loadCatalog();
    }, []);

    const loadCatalog = async () => {
        try {
            const { data, error } = await supabase
                .from('catalogs')
                .select('*')
                .eq('id', resolvedParams.id)
                .single();

            if (error) throw error;
            if (!data) throw new Error('Catálogo no encontrado');

            setCatalog(data);
            setFormData({
                title: data.title,
                description: data.description || "",
                is_active: data.is_active,
            });
        } catch (error) {
            console.error('Error loading catalog:', error);
            alert('Error al cargar el catálogo');
            router.push('/admin/catalogos');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        // Validaciones
        const newErrors: { [key: string]: string } = {};

        if (!formData.title.trim()) {
            newErrors.title = "El título es requerido";
        }

        if (newPdfFile) {
            const validation = validatePDFFile(newPdfFile);
            if (!validation.valid) {
                newErrors.pdf = validation.error!;
            }
        }

        if (newThumbnailFile) {
            const validation = validateImageFile(newThumbnailFile);
            if (!validation.valid) {
                newErrors.thumbnail = validation.error!;
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setSaving(true);

        try {
            let fileUrl = catalog!.file_url;
            let fileName = catalog!.file_name;
            let fileSize = catalog!.file_size;
            let thumbnailUrl = catalog!.thumbnail_url;

            // 1. Si hay nuevo PDF, subir y eliminar el viejo
            if (newPdfFile) {
                const pdfFormData = new FormData();
                pdfFormData.append('file', newPdfFile);
                const pdfResult = await uploadCatalogPDFAction(pdfFormData);
                if (!pdfResult.success) {
                    throw new Error(pdfResult.error);
                }

                // Eliminar PDF viejo
                if (catalog!.file_url) {
                    await deleteCatalogFileAction(catalog!.file_url);
                }

                fileUrl = pdfResult.url!;
                fileName = newPdfFile.name;
                fileSize = newPdfFile.size;
            }

            // 2. Si hay nuevo thumbnail, subir y eliminar el viejo
            if (newThumbnailFile) {
                const thumbnailFormData = new FormData();
                thumbnailFormData.append('file', newThumbnailFile);
                const thumbnailResult = await uploadCatalogThumbnailAction(thumbnailFormData);
                if (!thumbnailResult.success) {
                    throw new Error(thumbnailResult.error);
                }

                // Eliminar thumbnail viejo
                if (catalog!.thumbnail_url) {
                    await deleteCatalogFileAction(catalog!.thumbnail_url);
                }

                thumbnailUrl = thumbnailResult.url!;
            }

            // 3. actualizar registro en la base de datos
            const { error } = await supabase
                .from('catalogs')
                .update({
                    title: formData.title.trim(),
                    description: formData.description.trim() || null,
                    file_url: fileUrl,
                    file_name: fileName,
                    file_size: fileSize,
                    thumbnail_url: thumbnailUrl,
                    is_active: formData.is_active,
                })
                .eq('id', resolvedParams.id);

            if (error) throw error;

            // Redirigir a la lista
            router.push('/admin/catalogos');
        } catch (error: any) {
            console.error('Error updating catalog:', error);
            alert(error.message || 'Error al actualizar el catálogo');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="h-12 w-12 animate-spin text-slate-400" />
            </div>
        );
    }

    if (!catalog) {
        return null;
    }

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
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Editar Catálogo</h1>
                    <p className="text-slate-500 mt-1">Actualiza la información del catálogo</p>
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

                {/* Archivo PDF Actual */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Archivo PDF Actual
                    </label>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-md border">
                        <FileText className="h-8 w-8 text-slate-400" />
                        <div className="flex-1">
                            <p className="text-sm font-medium text-slate-700">{catalog.file_name}</p>
                            <a
                                href={catalog.file_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-blue-600 hover:underline"
                            >
                                Ver archivo actual
                            </a>
                        </div>
                    </div>
                </div>

                {/* Reemplazar PDF */}
                <div>
                    <label htmlFor="pdf" className="block text-sm font-medium text-slate-700 mb-1">
                        Reemplazar archivo PDF (Opcional)
                    </label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                        <Upload className="h-10 w-10 text-slate-400 mx-auto mb-2" />
                        <input
                            type="file"
                            id="pdf"
                            accept="application/pdf"
                            onChange={(e) => setNewPdfFile(e.target.files?.[0] || null)}
                            className="hidden"
                        />
                        <label
                            htmlFor="pdf"
                            className="cursor-pointer text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Seleccionar nuevo PDF
                        </label>
                        {newPdfFile && (
                            <p className="text-sm text-slate-600 mt-2">
                                Nuevo archivo: {newPdfFile.name}
                            </p>
                        )}
                        <p className="text-xs text-slate-500 mt-1">Máximo 10MB</p>
                    </div>
                    {errors.pdf && (
                        <p className="text-red-500 text-sm mt-1">{errors.pdf}</p>
                    )}
                </div>



                {/* Thumbnail Actual */}
                {
                    catalog.thumbnail_url && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Imagen de Presentación Actual
                            </label>
                            <img
                                src={catalog.thumbnail_url}
                                alt="Thumbnail actual"
                                className="w-48 h-32 object-cover rounded-md border"
                            />
                        </div>
                    )
                }

                {/* Reemplazar Thumbnail */}
                <div>
                    <label htmlFor="thumbnail" className="block text-sm font-medium text-slate-700 mb-1">
                        {catalog.thumbnail_url ? 'Reemplazar' : 'Agregar'} Imagen de Presentación (Opcional)
                    </label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                        <Upload className="h-10 w-10 text-slate-400 mx-auto mb-2" />
                        <input
                            type="file"
                            id="thumbnail"
                            accept="image/jpeg,image/jpg,image/png,image/webp"
                            onChange={(e) => setNewThumbnailFile(e.target.files?.[0] || null)}
                            className="hidden"
                        />
                        <label
                            htmlFor="thumbnail"
                            className="cursor-pointer text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                            Seleccionar imagen
                        </label>
                        {newThumbnailFile && (
                            <p className="text-sm text-slate-600 mt-2">
                                Nueva imagen: {newThumbnailFile.name}
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
                        Catálogo activo (visible en el sitio web)
                    </label>
                </div>

                {/* Botones */}
                <div className="flex gap-3 pt-4">
                    <Button
                        type="submit"
                        disabled={saving}
                        className="flex-1"
                    >
                        {saving ? (
                            <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Guardando...
                            </>
                        ) : (
                            "Guardar Cambios"
                        )}
                    </Button>
                    <Button
                        type="button"
                        variant="outline"
                        asChild
                        disabled={saving}
                    >
                        <Link href="/admin/catalogos">Cancelar</Link>
                    </Button>
                </div>
            </form >
        </div >
    );
}
