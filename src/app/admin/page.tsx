"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldAlert } from "lucide-react";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Append domain for Supabase Auth
        const email = `${username.toLowerCase().trim()}@bultex.local`;

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error("Login error:", error);
            setError(error.message); // Show real error for debugging
            setLoading(false);
        } else {
            router.push("/admin/dashboard");
            router.refresh();
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="w-full max-w-sm space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <div className="mx-auto h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                        <ShieldAlert className="h-6 w-6" />
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Acceso Administrativo
                    </h2>
                    <p className="text-sm text-muted-foreground mt-2">
                        Ingresa tus credenciales para gestionar el catálogo.
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="username" className="sr-only">Usuario</label>
                            <Input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="username"
                                required
                                placeholder="Usuario (ej. admin)"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="h-12"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Contraseña</label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                placeholder="Contraseña"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="h-12"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-sm text-red-500 text-center bg-red-50 p-2 rounded">
                            {error}
                        </div>
                    )}

                    <Button type="submit" className="w-full h-12 text-base" disabled={loading}>
                        {loading ? "Iniciando sesión..." : "Ingresar al Panel"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
