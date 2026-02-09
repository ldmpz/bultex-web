"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Save, Loader2, Image as ImageIcon, ExternalLink } from "lucide-react";
import Image from "next/image";
import { useConfig, SiteImage } from "@/context/config-context";

export default function ImagesPage() {
    const { refreshConfig } = useConfig();
    const [images, setImages] = useState<SiteImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    // New Image State
    const [newImageSection, setNewImageSection] = useState("hero");
    const [newImageUrl, setNewImageUrl] = useState("");
    const [newImageAlt, setNewImageAlt] = useState("");

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        try {
            const { data, error } = await supabase
                .from('site_images')
                .select('*')
                .order('section', { ascending: true })
                .order('display_order', { ascending: true });

            if (error) throw error;
            if (data) setImages(data);
        } catch (error) {
            console.error("Error fetching images:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddImage = async () => {
        if (!newImageUrl) return alert("Ingrese una URL válida");
        setUploading(true);

        try {
            const { error } = await supabase.from('site_images').insert({
                section: newImageSection,
                url: newImageUrl,
                alt: newImageAlt || "Imagen Industrial",
                is_active: true
            });

            if (error) throw error;

            setNewImageUrl("");
            setNewImageAlt("");
            await fetchImages();
            refreshConfig(); // Refresh global context
        } catch (error: any) {
            alert("Error al agregar imagen: " + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleToggleActive = async (id: string, currentStatus: boolean) => {
        try {
            await supabase.from('site_images').update({ is_active: !currentStatus }).eq('id', id);
            setImages(prev => prev.map(img => img.id === id ? { ...img, is_active: !currentStatus } : img));
            refreshConfig(); // Refresh global context
        } catch (error) {
            console.error("Error toggling status:", error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("¿Está seguro de eliminar esta imagen?")) return;
        try {
            await supabase.from('site_images').delete().eq('id', id);
            setImages(prev => prev.filter(img => img.id !== id));
            refreshConfig(); // Refresh global context
        } catch (error) {
            console.error("Error deleting image:", error);
        }
    };

    if (loading) return <div>Cargando gestión de imágenes...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Gestión de Imágenes</h1>
            </div>

            {/* Add New Image Card */}
            <Card className="bg-slate-50 border-dashed border-2">
                <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                        <Plus className="h-5 w-5" /> Agregar Nueva Imagen
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Sección</label>
                        <Select value={newImageSection} onValueChange={setNewImageSection}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="hero">Hero (Carrusel Principal)</SelectItem>
                                <SelectItem value="hero-side">Hero (Lateral)</SelectItem>
                                <SelectItem value="about">Nosotros</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-medium">URL de la Imagen</label>
                        <Input
                            value={newImageUrl}
                            onChange={(e) => setNewImageUrl(e.target.value)}
                            placeholder="https://..."
                        />
                        <p className="text-xs text-muted-foreground">Recomendado: Imágenes de alta resolución (Unsplash, Storage)</p>
                    </div>
                    <Button onClick={handleAddImage} disabled={uploading}>
                        {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Agregar
                    </Button>
                </CardContent>
            </Card>

            {/* Images List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((img) => (
                    <Card key={img.id} className={`overflow-hidden ${!img.is_active ? 'opacity-60 grayscale' : ''}`}>
                        <div className="relative h-48 w-full bg-slate-100">
                            <Image
                                src={img.url}
                                alt={img.alt || "Imagen"}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute top-2 right-2 flex gap-2">
                                <Badge variant={img.is_active ? "default" : "secondary"}>
                                    {img.section}
                                </Badge>
                            </div>
                        </div>
                        <CardContent className="p-4 space-y-2">
                            <div className="flex justify-between items-start">
                                <p className="text-sm font-medium truncate w-full" title={img.url}>{img.url}</p>
                            </div>
                            <Input
                                value={img.alt}
                                disabled
                                placeholder="Texto Alt"
                                className="h-8 text-xs"
                            />
                        </CardContent>
                        <CardFooter className="p-3 bg-slate-50 flex justify-between">
                            <Button
                                variant={img.is_active ? "outline" : "default"}
                                size="sm"
                                onClick={() => handleToggleActive(img.id, img.is_active)}
                            >
                                {img.is_active ? "Desactivar" : "Activar"}
                            </Button>
                            <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleDelete(img.id)}>
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {images.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                    <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-20" />
                    No hay imágenes configuradas. Agrega una arriba.
                </div>
            )}
        </div>
    );
}
