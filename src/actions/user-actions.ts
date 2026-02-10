'use server'

import { createServerSupabase } from "@/lib/supabase-server"
import { revalidatePath } from "next/cache"

export async function getUsers() {
    try {
        console.log('[getUsers] Fetching users from Supabase...')
        const supabase = createServerSupabase()
        const { data: { users }, error } = await supabase.auth.admin.listUsers()

        if (error) {
            console.error('[getUsers] Supabase error:', error)
            throw new Error(error.message)
        }

        console.log(`[getUsers] Successfully fetched ${users.length} users`)
        // Sort by created_at desc
        return users.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    } catch (error) {
        console.error('[getUsers] Unexpected error:', error)
        throw error
    }
}

export async function toggleUserStatus(userId: string, isBanned: boolean) {
    // If isBanned is true, we want to UNBAN (remove ban_duration)
    // If isBanned is false, we want to BAN (set ban_duration)

    const banDuration = isBanned ? 'none' : '876000h' // 100 years if banning, none if unbanning

    const supabase = createServerSupabase()
    const { error } = await supabase.auth.admin.updateUserById(userId, {
        ban_duration: banDuration
    })

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath('/admin/usuarios')
    return { success: true }
}

export async function updateUserPassword(userId: string, newPassword: string) {
    const supabase = createServerSupabase()
    const { error } = await supabase.auth.admin.updateUserById(userId, {
        password: newPassword
    })

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath('/admin/usuarios')
    return { success: true }
}

export async function createUser(username: string, password: string) {
    try {
        console.log('[createUser] Starting user creation for username:', username)
        const email = `${username}@bultex.local`;
        const supabase = createServerSupabase()


        // Removed manual check for existing user to avoid pagination issues.
        // We will rely on supabase.auth.admin.createUser returning an error if email exists.

        console.log('[createUser] Creating new user with email:', email)
        const { data, error } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true, // Auto-confirm to skip email sending
            user_metadata: {
                username,
                role: 'admin'
            }
        });

        if (error) {
            console.error('[createUser] Supabase error creating user:', error)
            throw new Error(error.message);
        }

        console.log('[createUser] User created successfully:', data.user.id)
        revalidatePath('/admin/usuarios');
        return { success: true, user: data.user };
    } catch (error) {
        console.error('[createUser] Unexpected error:', error)
        throw error
    }
}

export async function deleteUser(userId: string) {
    const supabase = createServerSupabase()
    const { error } = await supabase.auth.admin.deleteUser(userId);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/admin/usuarios');
    return { success: true };
}
