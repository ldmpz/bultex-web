-- Storage bucket para archivos PDF de catálogos
-- Este script documenta la configuración del bucket que debe crearse manualmente en Supabase Dashboard

-- INSTRUCCIONES PARA CREAR EL BUCKET:
-- 1. Ve a Supabase Dashboard → Storage
-- 2. Click en "New Bucket"
-- 3. Configuración:
--    - Name: catalogs
--    - Public: true (los PDFs deben ser descargables públicamente)
--    - Allowed MIME types: application/pdf, image/jpeg, image/png
--    - Max file size: 10485760 (10 MB)

-- Políticas de Storage para el bucket 'catalogs'

-- Política: Todos pueden descargar archivos del bucket catalogs
CREATE POLICY "Archivos de catálogos son públicos"
ON storage.objects
FOR SELECT
USING (bucket_id = 'catalogs');

-- Política: Solo usuarios autenticados pueden subir archivos
CREATE POLICY "Usuarios autenticados pueden subir a catalogs"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'catalogs');

-- Política: Solo usuarios autenticados pueden actualizar archivos
CREATE POLICY "Usuarios autenticados pueden actualizar en catalogs"
ON storage.objects
FOR UPDATE
TO authenticated
USING (bucket_id = 'catalogs')
WITH CHECK (bucket_id = 'catalogs');

-- Política: Solo usuarios autenticados pueden eliminar archivos
CREATE POLICY "Usuarios autenticados pueden eliminar de catalogs"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'catalogs');
