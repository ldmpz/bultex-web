/**
 * Formatea el tamaño de un archivo en bytes a un formato legible
 */
export function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Valida que un archivo sea un PDF
 */
export function validatePDFFile(file: File): { valid: boolean; error?: string } {
    // Verificar tipo MIME
    if (file.type !== 'application/pdf') {
        return { valid: false, error: 'El archivo debe ser un PDF' };
    }

    // Verificar tamaño (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
        return { valid: false, error: 'El archivo no debe exceder 10MB' };
    }

    return { valid: true };
}

/**
 * Valida que un archivo sea una imagen
 */
export function validateImageFile(file: File): { valid: boolean; error?: string } {
    // Verificar tipo MIME
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        return { valid: false, error: 'La imagen debe ser JPG, PNG o WebP' };
    }

    // Verificar tamaño (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (file.size > maxSize) {
        return { valid: false, error: 'La imagen no debe exceder 2MB' };
    }

    return { valid: true };
}
