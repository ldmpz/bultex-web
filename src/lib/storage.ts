import { createServerSupabase } from '@/lib/supabase-server';

/**
 * Sube un archivo PDF de catálogo a Supabase Storage
 */
export async function uploadCatalogPDF(file: File): Promise<{ url: string; error?: string }> {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `pdfs/${fileName}`;

        const supabase = createServerSupabase();
        const { data, error } = await supabase.storage
            .from('catalogs')
            .upload(filePath, file, {
                contentType: 'application/pdf',
                upsert: false,
            });

        if (error) {
            console.error('Error uploading PDF:', error);
            return { url: '', error: error.message };
        }

        // Obtener URL pública
        const { data: { publicUrl } } = supabase.storage
            .from('catalogs')
            .getPublicUrl(filePath);

        return { url: publicUrl };
    } catch (error) {
        console.error('Upload error:', error);
        return { url: '', error: 'Error al subir el archivo' };
    }
}

/**
 * Sube una imagen thumbnail de catálogo a Supabase Storage
 */
export async function uploadCatalogThumbnail(file: File): Promise<{ url: string; error?: string }> {
    try {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        const filePath = `thumbnails/${fileName}`;

        const supabase = createServerSupabase();
        const { data, error } = await supabase.storage
            .from('catalogs')
            .upload(filePath, file, {
                contentType: file.type,
                upsert: false,
            });

        if (error) {
            console.error('Error uploading thumbnail:', error);
            return { url: '', error: error.message };
        }

        // Obtener URL pública
        const { data: { publicUrl } } = supabase.storage
            .from('catalogs')
            .getPublicUrl(filePath);

        return { url: publicUrl };
    } catch (error) {
        console.error('Upload error:', error);
        return { url: '', error: 'Error al subir la imagen' };
    }
}

/**
 * Elimina un archivo de catálogo de Supabase Storage
 */
export async function deleteCatalogFile(fileUrl: string): Promise<{ success: boolean; error?: string }> {
    try {
        // Extraer el path del archivo de la URL
        const url = new URL(fileUrl);
        const pathParts = url.pathname.split('/catalogs/');

        if (pathParts.length < 2) {
            return { success: false, error: 'URL de archivo inválida' };
        }

        const filePath = pathParts[1];

        const supabase = createServerSupabase();
        const { error } = await supabase.storage
            .from('catalogs')
            .remove([filePath]);

        if (error) {
            console.error('Error deleting file:', error);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (error) {
        console.error('Delete error:', error);
        return { success: false, error: 'Error al eliminar el archivo' };
    }
}


