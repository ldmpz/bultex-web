"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { FileText, Loader2, Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { formatFileSize } from "@/lib/file-utils";
import Link from "next/link";

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
    created_at: string;
}

export default function CatalogosAdminPage() {
    const [catalogs, setCatalogs] = useState<Catalog[]>([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState<string | null>(null);

    useEffect(() => {
        loadCatalogs();
    }, []);

    const loadCatalogs = async () => {
        try {
            const { data, error } = await supabase
                .from('catalogs')
                .select('*')
                .order('display_order', { ascending: true });

            if (error) throw error;
            setCatalogs(data || []);
        } catch (error) {
            console.error('Error loading catalogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleActive = async (id: string, currentStatus: boolean) => {
        try {
            const { error } = await supabase
                .from('catalogs')
                .update({ is_active: !currentStatus })
                .eq('id', id);

            if (error) throw error;

            // Update local state
            setCatalogs(catalogs.map(cat =>
                cat.id === id ? { ...cat, is_active: !currentStatus } : cat
            ));
        } catch (error) {
            console.error('Error toggling status:', error);
            alert('Error al cambiar el estado');
        }
    };

    const deleteCatalog = async (id: string) => {
        if (!confirm('¿Estás seguro de eliminar este catálogo? Esta acción no se puede deshacer.')) {
            return;
        }

        setDeleting(id);
        try {
            const { error } = await supabase
                .from('catalogs')
                .delete()
                .eq('id', id);

            if (error) throw error;

            // Remove from local state
            setCatalogs(catalogs.filter(cat => cat.id !== id));
        } catch (error) {
            console.error('Error deleting catalog:', error);
            alert('Error al eliminar el catálogo');
        } finally {
            setDeleting(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="h-12 w-12 animate-spin text-slate-400" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">Catálogos PDF</h1>
                    <p className="text-slate-500 mt-1">Gestiona los catálogos descargables del sitio web</p>
                </div>
                <Button asChild>
                    <Link href="/admin/catalogos/nuevo">
                        <Plus className="h-4 w-4 mr-2" />
                        Nuevo Catálogo
                    </Link>
                </Button>
            </div>

            {/* Catalogs Table */}
            {catalogs.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-lg border">
                    <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 text-lg mb-4">
                        No hay catálogos registrados
                    </p>
                    <Button asChild>
                        <Link href="/admin/catalogos/nuevo">
                            <Plus className="h-4 w-4 mr-2" />
                            Crear Primer Catálogo
                        </Link>
                    </Button>
                </div>
            ) : (
                <div className="bg-white rounded-lg border overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b">
                            <tr>
                                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Título</th>
                                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Archivo</th>
                                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-700">Tamaño</th>
                                <th className="text-center px-4 py-3 text-sm font-semibold text-slate-700">Estado</th>
                                <th className="text-right px-4 py-3 text-sm font-semibold text-slate-700">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {catalogs.map((catalog) => (
                                <tr key={catalog.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-4 py-3">
                                        <div>
                                            <p className="font-medium text-slate-900">{catalog.title}</p>
                                            {catalog.description && (
                                                <p className="text-sm text-slate-500 line-clamp-1">{catalog.description}</p>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-2">
                                            <FileText className="h-4 w-4 text-slate-400" />
                                            <span className="text-sm text-slate-600">{catalog.file_name}</span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-slate-600">
                                        {catalog.file_size ? formatFileSize(catalog.file_size) : '-'}
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <button
                                            onClick={() => toggleActive(catalog.id, catalog.is_active)}
                                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium transition-colors ${catalog.is_active
                                                ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                }`}
                                        >
                                            {catalog.is_active ? (
                                                <>
                                                    <Eye className="h-3 w-3" />
                                                    Activo
                                                </>
                                            ) : (
                                                <>
                                                    <EyeOff className="h-3 w-3" />
                                                    Inactivo
                                                </>
                                            )}
                                        </button>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                asChild
                                                variant="ghost"
                                                size="sm"
                                            >
                                                <Link href={`/admin/catalogos/${catalog.id}`}>
                                                    <Pencil className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => deleteCatalog(catalog.id)}
                                                disabled={deleting === catalog.id}
                                            >
                                                {deleting === catalog.id ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <Trash2 className="h-4 w-4 text-red-600" />
                                                )}
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
