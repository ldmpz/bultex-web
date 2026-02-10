-- Tabla para gestionar catálogos PDF
CREATE TABLE catalogs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    file_url TEXT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_size BIGINT, -- en bytes
    thumbnail_url TEXT, -- opcional: imagen preview
    display_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para mejorar performance
CREATE INDEX idx_catalogs_active ON catalogs(is_active);
CREATE INDEX idx_catalogs_order ON catalogs(display_order);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_catalogs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para updated_at
CREATE TRIGGER trigger_catalogs_updated_at
    BEFORE UPDATE ON catalogs
    FOR EACH ROW
    EXECUTE FUNCTION update_catalogs_updated_at();

-- Row Level Security (RLS)
ALTER TABLE catalogs ENABLE ROW LEVEL SECURITY;

-- Política: Todos pueden ver catálogos activos
CREATE POLICY "Catálogos activos son públicos"
    ON catalogs
    FOR SELECT
    USING (is_active = true);

-- Política: Solo usuarios autenticados pueden ver todos los catálogos
CREATE POLICY "Usuarios autenticados ven todos los catálogos"
    ON catalogs
    FOR SELECT
    TO authenticated
    USING (true);

-- Política: Solo usuarios autenticados pueden insertar
CREATE POLICY "Usuarios autenticados pueden crear catálogos"
    ON catalogs
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Política: Solo usuarios autenticados pueden actualizar
CREATE POLICY "Usuarios autenticados pueden actualizar catálogos"
    ON catalogs
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Política: Solo usuarios autenticados pueden eliminar
CREATE POLICY "Usuarios autenticados pueden eliminar catálogos"
    ON catalogs
    FOR DELETE
    TO authenticated
    USING (true);
