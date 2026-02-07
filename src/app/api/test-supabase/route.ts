import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function GET() {
    try {
        console.log('[TEST API] Testing Supabase admin client...')

        // Test 1: Check if supabaseAdmin is initialized
        if (!supabaseAdmin) {
            return NextResponse.json({
                success: false,
                error: 'supabaseAdmin is not initialized'
            }, { status: 500 })
        }

        console.log('[TEST API] supabaseAdmin initialized successfully')

        // Test 2: Try to list users
        console.log('[TEST API] Attempting to list users...')
        const { data, error } = await supabaseAdmin.auth.admin.listUsers()

        if (error) {
            console.error('[TEST API] Error listing users:', error)
            return NextResponse.json({
                success: false,
                error: error.message,
                errorDetails: error
            }, { status: 500 })
        }

        console.log(`[TEST API] Successfully listed ${data.users.length} users`)

        return NextResponse.json({
            success: true,
            userCount: data.users.length,
            users: data.users.map(u => ({
                id: u.id,
                email: u.email,
                created_at: u.created_at
            }))
        })

    } catch (error: any) {
        console.error('[TEST API] Unexpected error:', error)
        return NextResponse.json({
            success: false,
            error: error.message,
            stack: error.stack
        }, { status: 500 })
    }
}
