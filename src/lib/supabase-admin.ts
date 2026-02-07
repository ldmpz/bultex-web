import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Validate environment variables
if (!supabaseUrl) {
    console.error('[supabase-admin] NEXT_PUBLIC_SUPABASE_URL is not defined')
    throw new Error('NEXT_PUBLIC_SUPABASE_URL is not defined')
}

if (!supabaseServiceRoleKey) {
    console.error('[supabase-admin] SUPABASE_SERVICE_ROLE_KEY is not defined')
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not defined')
}

console.log('[supabase-admin] Initializing Supabase admin client with URL:', supabaseUrl)

// Note: This client has admin privileges. Use with caution and ONLY on the server.
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})
