"use server";

import { uploadCatalogPDF, uploadCatalogThumbnail, deleteCatalogFile } from "@/lib/storage";

/**
 * Server Action para subir un PDF de catálogo
 */
export async function uploadCatalogPDFAction(formData: FormData) {
    try {
        console.log('[Server Action] uploadCatalogPDFAction called');
        const file = formData.get('file') as File;
        if (!file) {
            console.error('[Server Action] No file provided');
            return { success: false, error: 'No se proporcionó un archivo' };
        }

        console.log('[Server Action] Uploading PDF:', {
            name: file.name,
            size: file.size,
            type: file.type
        });

        const result = await uploadCatalogPDF(file);
        if (result.error) {
            console.error('[Server Action] Upload failed:', result.error);
            return { success: false, error: result.error };
        }

        console.log('[Server Action] Upload successful:', result.url);
        return { success: true, url: result.url };
    } catch (error: any) {
        console.error('[Server Action] Exception in uploadCatalogPDFAction:', error);
        return { success: false, error: error.message || 'Error al subir el archivo' };
    }
}

/**
 * Server Action para subir un thumbnail de catálogo
 */
export async function uploadCatalogThumbnailAction(formData: FormData) {
    try {
        const file = formData.get('file') as File;
        if (!file) {
            return { success: false, error: 'No se proporcionó un archivo' };
        }

        const result = await uploadCatalogThumbnail(file);
        if (result.error) {
            return { success: false, error: result.error };
        }

        return { success: true, url: result.url };
    } catch (error: any) {
        console.error('Error uploading thumbnail:', error);
        return { success: false, error: error.message || 'Error al subir la imagen' };
    }
}

/**
 * Server Action para eliminar un archivo de catálogo
 */
export async function deleteCatalogFileAction(fileUrl: string) {
    try {
        const result = await deleteCatalogFile(fileUrl);
        if (!result.success) {
            return { success: false, error: result.error };
        }

        return { success: true };
    } catch (error: any) {
        console.error('Error deleting file:', error);
        return { success: false, error: error.message || 'Error al eliminar el archivo' };
    }
}
