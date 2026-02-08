"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Package, LogOut, Menu, FolderTree, Settings, Users, Image as ImageIcon } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(true);

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                router.push("/admin");
            }
            setLoading(false);
        };

        checkUser();
    }, [router]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/admin");
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
    }

    return (
        <div className="flex min-h-screen bg-slate-50/50">
            {/* Sidebar */}
            <aside
                className={`${sidebarOpen ? "w-64" : "w-20"
                    } bg-white border-r border-slate-200 transition-all duration-300 flex flex-col fixed inset-y-0 left-0 z-50`}
            >
                <div className="h-16 flex items-center justify-center border-b border-slate-100 font-black text-xl tracking-tighter text-slate-900">
                    <Link href="/admin/dashboard" className="flex items-center gap-2">
                        {sidebarOpen ? (
                            <>
                                <span className="bg-slate-900 text-white px-2 py-0.5 rounded-sm text-lg">BX</span>
                                <span>ADMIN</span>
                            </>
                        ) : (
                            <span className="bg-slate-900 text-white px-2 py-0.5 rounded-sm text-lg">BX</span>
                        )}
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto cursor-pointer">
                    <Link href="/admin/dashboard">
                        <Button variant="ghost" className={`w-full justify-start gap-3 ${!sidebarOpen && "justify-center px-2"}`}>
                            <LayoutDashboard className="h-5 w-5 text-slate-500" />
                            {sidebarOpen && <span className="text-slate-700">Resumen</span>}
                        </Button>
                    </Link>
                    <Link href="/admin/productos">
                        <Button variant="ghost" className={`w-full justify-start gap-3 ${!sidebarOpen && "justify-center px-2"}`}>
                            <Package className="h-5 w-5 text-slate-500" />
                            {sidebarOpen && <span className="text-slate-700">Productos</span>}
                        </Button>
                    </Link>
                    <Link href="/admin/categorias">
                        <Button variant="ghost" className={`w-full justify-start gap-3 ${!sidebarOpen && "justify-center px-2"}`}>
                            <FolderTree className="h-5 w-5 text-slate-500" />
                            {sidebarOpen && <span className="text-slate-700">Categorías</span>}
                        </Button>
                    </Link>
                    <Link href="/admin/usuarios">
                        <Button variant="ghost" className={`w-full justify-start gap-3 ${!sidebarOpen && "justify-center px-2"}`}>
                            <Users className="h-5 w-5 text-slate-500" />
                            {sidebarOpen && <span className="text-slate-700">Usuarios</span>}
                        </Button>
                    </Link>
                    <Link href="/admin/imagenes">
                        <Button variant="ghost" className={`w-full justify-start gap-3 ${!sidebarOpen && "justify-center px-2"}`}>
                            <ImageIcon className="h-5 w-5 text-slate-500" />
                            {sidebarOpen && <span className="text-slate-700">Imágenes</span>}
                        </Button>
                    </Link>
                    <Link href="/admin/configuracion">
                        <Button variant="ghost" className={`w-full justify-start gap-3 ${!sidebarOpen && "justify-center px-2"}`}>
                            <Settings className="h-5 w-5 text-slate-500" />
                            {sidebarOpen && <span className="text-slate-700">Configuración</span>}
                        </Button>
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <Button
                        variant="ghost"
                        className={`w-full justify-start gap-3 text-red-600 hover:text-red-700 hover:bg-red-50 ${!sidebarOpen && "justify-center px-2"}`}
                        onClick={handleLogout}
                    >
                        <LogOut className="h-5 w-5" />
                        {sidebarOpen && "Cerrar Sesión"}
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main
                className={`flex-1 transition-all duration-300 ease-in-out ${sidebarOpen ? "ml-64" : "ml-20"
                    } min-h-screen`}
            >
                <header className="h-16 bg-white border-b border-slate-200 sticky top-0 z-40 px-8 flex items-center justify-between shadow-sm">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-500 hover:text-slate-900">
                            <Menu className="h-5 w-5" />
                        </Button>
                        <h2 className="font-semibold text-slate-800">Panel de Control</h2>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-8 w-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
                            A
                        </div>
                    </div>
                </header>

                <div className="p-8 max-w-6xl mx-auto space-y-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
