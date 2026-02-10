"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Download, FileText, Loader2 } from "lucide-react";
import { formatFileSize } from "@/lib/file-utils";
import { motion } from "framer-motion";

interface Catalog {
    id: string;
    title: string;
    description: string | null;
    file_url: string;
    file_name: string;
    file_size: number | null;
    thumbnail_url: string | null;
    display_order: number;
}

export function CatalogosSection() {
    const [catalogs, setCatalogs] = useState<Catalog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadCatalogs();
    }, []);

    const loadCatalogs = async () => {
        try {
            const { data, error } = await supabase
                .from('catalogs')
                .select('*')
                .eq('is_active', true)
                .order('display_order', { ascending: true });

            if (error) throw error;
            setCatalogs(data || []);
        } catch (error) {
            console.error('Error loading catalogs:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDownload = (fileUrl: string, fileName: string) => {
        // Crear un elemento <a> temporal para descargar el archivo
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return (
            <div className="container px-4 py-24 md:px-6 flex items-center justify-center min-h-[60vh]">
                <Loader2 className="h-12 w-12 animate-spin text-slate-400" />
            </div>
        );
    }

    return (
        <section className="container px-4 py-12 md:px-6">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-slate-900">
                    Catálogos PDF
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    Descarga nuestros catálogos digitales con toda la información de productos, especificaciones y precios.
                </p>
            </motion.div>

            {/* Catalogs Grid */}
            {catalogs.length === 0 ? (
                <div className="text-center py-16">
                    <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 text-lg">
                        No hay catálogos disponibles en este momento.
                    </p>
                </div>
            ) : (
                <div className="flex flex-wrap justify-center gap-8">
                    {catalogs.map((catalog, index) => (
                        <motion.div
                            key={catalog.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white border rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group w-full max-w-[380px] flex flex-col"
                        >
                            {/* Thumbnail Image */}
                            <div className="relative h-64 bg-slate-50 flex items-center justify-center overflow-hidden border-b border-slate-100">
                                {catalog.thumbnail_url ? (
                                    <img
                                        src={catalog.thumbnail_url}
                                        alt={catalog.title}
                                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                                    />
                                ) : (
                                    <FileText className="h-20 w-20 text-slate-300" />
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow text-center items-center">
                                <h3 className="text-xl font-bold text-slate-900 mb-3">
                                    {catalog.title}
                                </h3>

                                {catalog.description && (
                                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                                        {catalog.description}
                                    </p>
                                )}

                                <div className="mt-auto w-full flex flex-col items-center">
                                    {/* File Info */}
                                    <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mb-4 bg-slate-50 py-1.5 px-3 rounded-full w-fit border border-slate-100">
                                        <FileText className="h-3.5 w-3.5" />
                                        <span className="font-medium">PDF</span>
                                        {catalog.file_size && (
                                            <>
                                                <span className="text-slate-300">•</span>
                                                <span>{formatFileSize(catalog.file_size)}</span>
                                            </>
                                        )}
                                    </div>

                                    {/* Download Button */}
                                    <Button
                                        onClick={() => handleDownload(catalog.file_url, catalog.file_name)}
                                        className="w-full shadow-sm hover:shadow cursor-pointer hover:bg-slate-900 transition-all"
                                        size="lg"
                                    >
                                        <Download className="h-4 w-4 mr-2" />
                                        Descargar Catálogo
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}


        </section>
    );
}
