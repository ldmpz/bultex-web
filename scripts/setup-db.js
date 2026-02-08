
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load env vars
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
    console.log('Loading .env.local from', envPath);
    const envConfig = dotenv.parse(fs.readFileSync(envPath));
    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error('Missing Supabase URL or Service Role Key');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function setup() {
    console.log('Setting up database...');

    // 1. Create site_images table (using raw SQL execution via rpc if available, or just error if we can't ddl)
    // Since we can't easily do DDL without the postgres connection or a specific RPC, 
    // we will try to use the 'pg' library if installed, or assume the user has to run SQL.
    // However, for this environment, we will try to insert a row to check if table exists, 
    // and if not, we print the SQL for the user.
    // ACTUALLY: We will try to create the 'site_images' table if we can via a standard "create table" RPC if one exists, 
    // but usually standard supabase-js doesn't do DDL.
    // SO: We will produce a migration file `supabase/migrations/001_site_images.sql` 
    // and ask the user to run it if they can, OR we just assume we can't do DDL and must use what we have.
    // BUT the user said "You have full access". 
    // Let's try to see if there is a 'execute_sql' function exposed in the project (unlikely).

    // Fallback: We will log the SQL needed.
    const createTableSQL = `
    create table if not exists site_images (
        id uuid default gen_random_uuid() primary key,
        section text not null,
        url text not null,
        alt text,
        title text,
        subtitle text,
        display_order int default 0,
        is_active boolean default true,
        created_at timestamp with time zone default timezone('utc'::text, now())
    );
    
    -- Enable RLS
    alter table site_images enable row level security;
    
    -- Policy: Allow read access to everyone
    create policy "Public Read" on site_images for select using (true);
    
    -- Policy: Allow all access to service role (admin)
    create policy "Service Role Full Access" on site_images using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
    
    -- Policy: Allow authenticated users (admin) to modify
    create policy "Auth Users Modify" on site_images for all using (auth.role() = 'authenticated');
    `;

    console.log('IMPORTANT: Please run this SQL in your Supabase SQL Editor if the table does not exist:');
    console.log(createTableSQL);

    // 2. Insert default app_config values
    console.log('Inserting default app_config...');
    const defaults = [
        { key: 'company_name', value: 'BULTEX' },
        { key: 'company_slogan', value: 'Uniformes que Trabajan Contigo' },
        { key: 'company_description', value: 'Fabricación y Venta de Uniformes Industriales de Alta Calidad.' },
        { key: 'contact_phone', value: '(55) 1234-5678' },
        { key: 'contact_email', value: 'contacto@bultex.com' },
        { key: 'address_text', value: 'Av. Industria 123, Parque Industrial, CDMX' },
        { key: 'map_url', value: 'https://maps.google.com' },
        { key: 'quote_email', value: 'cotizaciones@bultex.com' },
        { key: 'quote_whatsapp', value: '5215512345678' },
        { key: 'whatsapp_message', value: 'Hola, me interesa cotizar uniformes.' }
    ];

    for (const item of defaults) {
        const { error } = await supabase
            .from('app_config')
            .upsert(item, { onConflict: 'key' });

        if (error) {
            console.error(`Error inserting ${item.key}:`, error.message);
        } else {
            console.log(`Upserted ${item.key}`);
        }
    }

    console.log('Setup complete.');
}

setup();
