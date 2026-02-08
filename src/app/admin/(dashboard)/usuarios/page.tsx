"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus, Key, Loader2, Ban, CheckCircle, Search, X } from "lucide-react";
import { getUsers, toggleUserStatus, updateUserPassword, createUser, deleteUser } from "@/actions/user-actions";
import { supabase } from "@/lib/supabase";

type User = {
    id: string;
    email?: string;
    created_at: string;
    last_sign_in_at?: string;
    banned_until?: string | null;
    user_metadata?: {
        username?: string;
    };
};

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    // Invite state
    const [inviteUsername, setInviteUsername] = useState("");
    const [invitePassword, setInvitePassword] = useState("");
    const [loadingInvite, setLoadingInvite] = useState(false);

    // Password change state
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [newPassword, setNewPassword] = useState("");
    const [loadingPassword, setLoadingPassword] = useState(false);

    const fetchUsers = async () => {
        try {
            console.log('[fetchUsers] Starting to fetch users...');
            setLoading(true);
            const data = await getUsers();
            console.log('[fetchUsers] Received data:', data);
            setUsers(data as User[]);
        } catch (error: any) {
            console.error("[fetchUsers] Error:", error);
            alert(`Error al cargar usuarios: ${error.message || 'Error desconocido'}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoadingInvite(true);

        try {
            console.log('[handleInvite] Creating user:', inviteUsername);
            await createUser(inviteUsername, invitePassword);
            alert("Usuario creado exitosamente.");
            setInviteUsername("");
            setInvitePassword("");
            fetchUsers(); // Refresh list
        } catch (error: any) {
            console.error('[handleInvite] Error:', error);
            alert(`Error al crear usuario: ${error.message || 'Error desconocido'}`);
        } finally {
            setLoadingInvite(false);
        }
    };

    const handleToggleStatus = async (user: User) => {
        const isBanned = !!user.banned_until && new Date(user.banned_until) > new Date();
        const action = isBanned ? "activar" : "desactivar";

        if (!confirm(`¿Estás seguro de ${action} a este usuario?`)) return;

        try {
            await toggleUserStatus(user.id, isBanned);
            fetchUsers();
        } catch (error) {
            console.error("Error toggling status:", error);
            alert("Error al cambiar estado");
        }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUser) return;
        if (newPassword.length < 6) {
            alert("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        setLoadingPassword(true);
        try {
            await updateUserPassword(selectedUser.id, newPassword);
            alert("Contraseña actualizada correctamente");
            setSelectedUser(null);
            setNewPassword("");
        } catch (error) {
            console.error("Error updating password:", error);
            alert("Error al actualizar contraseña");
        } finally {
            setLoadingPassword(false);
        }
    };

    // Helper to get display name
    const getUsername = (user: User) => {
        if (user.user_metadata?.username) return user.user_metadata.username;
        if (user.email) return user.email.split('@')[0];
        return "Desconocido";
    };

    const filteredUsers = users.filter(u =>
        getUsername(u).toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Gestión de Usuarios</h1>

            {/* Invite Form */}
            <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4 mb-8">
                <div className="flex items-center gap-2 mb-2">
                    <UserPlus className="h-5 w-5 text-blue-600" />
                    <h2 className="text-lg font-semibold">Crear Nuevo Administrador</h2>
                </div>
                <form onSubmit={handleInvite} className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="w-full md:w-1/3 space-y-2">
                        <label className="text-sm font-medium">Nombre de Usuario</label>
                        <Input
                            type="text"
                            required
                            value={inviteUsername}
                            onChange={e => setInviteUsername(e.target.value)}
                            placeholder="ej. admin2"
                        />
                    </div>
                    <div className="w-full md:w-1/3 space-y-2">
                        <label className="text-sm font-medium">Contraseña Inicial</label>
                        <Input
                            type="password"
                            required
                            value={invitePassword}
                            onChange={e => setInvitePassword(e.target.value)}
                            placeholder="******"
                            minLength={6}
                        />
                    </div>
                    <Button type="submit" disabled={loadingInvite} className="w-full md:w-auto">
                        {loadingInvite ? <Loader2 className="h-4 w-4 animate-spin" /> : "Crear Usuario"}
                    </Button>
                </form>
            </div>

            {/* Users List */}
            <div className="space-y-4">
                <div className="flex items-center space-x-2 bg-white p-2 rounded-lg border max-w-sm">
                    <Search className="h-5 w-5 text-gray-400" />
                    <Input
                        placeholder="Buscar por usuario..."
                        className="border-0 focus-visible:ring-0"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-gray-50 text-gray-700 font-medium border-b">
                            <tr>
                                <th className="px-6 py-4">Usuario</th>
                                <th className="px-6 py-4">Creado</th>
                                <th className="px-6 py-4">Último Acceso</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center">Cargando usuarios...</td>
                                </tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">No se encontraron usuarios.</td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => {
                                    const isBanned = !!user.banned_until && new Date(user.banned_until) > new Date();
                                    return (
                                        <tr key={user.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-3 font-medium">{getUsername(user)}</td>
                                            <td className="px-6 py-3 text-gray-500">
                                                {new Date(user.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-3 text-gray-500">
                                                {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : "Nunca"}
                                            </td>
                                            <td className="px-6 py-3">
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${!isBanned ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {!isBanned ? 'Activo' : 'Desactivado'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3 text-right space-x-2">
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleToggleStatus(user)}
                                                    className={!isBanned ? "text-red-600 hover:text-red-700 hover:bg-red-50" : "text-green-600 hover:text-green-700 hover:bg-green-50"}
                                                >
                                                    {!isBanned ? <Ban className="h-4 w-4 mr-1" /> : <CheckCircle className="h-4 w-4 mr-1" />}
                                                    {!isBanned ? "Desactivar" : "Activar"}
                                                </Button>

                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => setSelectedUser(user)}
                                                >
                                                    <Key className="h-4 w-4 mr-1" />
                                                    Contraseña
                                                </Button>

                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={async () => {
                                                        if (confirm(`¿Estás seguro de eliminar al usuario ${getUsername(user)}? Esta acción no se puede deshacer.`)) {
                                                            try {
                                                                await deleteUser(user.id);
                                                                alert("Usuario eliminado correctamente.");
                                                                fetchUsers();
                                                            } catch (error: any) {
                                                                alert("Error al eliminar usuario: " + error.message);
                                                            }
                                                        }
                                                    }}
                                                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <X className="h-4 w-4 mr-1" />
                                                    Eliminar
                                                </Button>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Custom Modal for Change Password */}
            {selectedUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md overflow-hidden">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="text-lg font-semibold">Cambiar Contraseña</h3>
                            <Button variant="ghost" size="icon" onClick={() => setSelectedUser(null)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <div className="p-4">
                            <p className="text-sm text-gray-500 mb-4">
                                Ingresa la nueva contraseña para <b>{getUsername(selectedUser)}</b>.
                            </p>
                            <form onSubmit={handleChangePassword} className="space-y-4">
                                <Input
                                    type="password"
                                    placeholder="Nueva contraseña"
                                    minLength={6}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                                <div className="flex justify-end gap-2 pt-2">
                                    <Button type="button" variant="outline" onClick={() => setSelectedUser(null)}>
                                        Cancelar
                                    </Button>
                                    <Button type="submit" disabled={loadingPassword}>
                                        {loadingPassword && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                                        Actualizar
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
