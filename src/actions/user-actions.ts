'use server'

import { supabaseAdmin } from "@/lib/supabase-admin"
import { revalidatePath } from "next/cache"

export async function getUsers() {
    const { data: { users }, error } = await supabaseAdmin.auth.admin.listUsers()

    if (error) {
        throw new Error(error.message)
    }

    // Sort by created_at desc
    return users.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
}

export async function toggleUserStatus(userId: string, isBanned: boolean) {
    // If isBanned is true, we want to UNBAN (remove ban_duration)
    // If isBanned is false, we want to BAN (set ban_duration)

    const banDuration = isBanned ? 'none' : '876000h' // 100 years if banning, none if unbanning

    const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
        ban_duration: banDuration
    })

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath('/admin/usuarios')
    return { success: true }
}

export async function updateUserPassword(userId: string, newPassword: string) {
    const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
        password: newPassword
    })

    if (error) {
        throw new Error(error.message)
    }

    revalidatePath('/admin/usuarios')
    return { success: true }
}

export async function createUser(username: string, password: string) {
    const email = `${username}@bultex.local`;

    // Check if user already exists
    const { data: list } = await supabaseAdmin.auth.admin.listUsers();
    const existing = list.users.find(u => u.email === email);

    if (existing) {
        throw new Error("El usuario ya existe.");
    }

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // Auto-confirm to skip email sending
        user_metadata: {
            username,
            role: 'admin'
        }
    });

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/admin/usuarios');
    return { success: true, user: data.user };
}

export async function deleteUser(userId: string) {
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

    if (error) {
        throw new Error(error.message);
    }

    revalidatePath('/admin/usuarios');
    return { success: true };
}
