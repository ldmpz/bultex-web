"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Package, LogOut, Menu } from "lucide-react";

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
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside
                className={`${sidebarOpen ? "w-64" : "w-20"
                    } bg-white border-r transition-all duration-300 flex flex-col fixed h-full z-10`}
            >
                <div className="h-16 flex items-center justify-center border-b font-bold text-xl tracking-tighter">
                    {sidebarOpen ? "BULTEX ADMIN" : "BX"}
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link href="/admin/dashboard">
                        <Button variant="ghost" className="w-full justify-start gap-3">
                            <LayoutDashboard className="h-5 w-5" />
                            {sidebarOpen && "Resumen"}
                        </Button>
                    </Link>
                    <Link href="/admin/productos">
                        <Button variant="ghost" className="w-full justify-start gap-3">
                            <Package className="h-5 w-5" />
                            {sidebarOpen && "Productos"}
                        </Button>
                    </Link>
                </nav>

                <div className="p-4 border-t">
                    <Button variant="outline" className="w-full gap-3 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={handleLogout}>
                        <LogOut className="h-5 w-5" />
                        {sidebarOpen && "Cerrar Sesión"}
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`flex-1 p-8 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
                <div className="max-w-7xl mx-auto">
                    <Button variant="ghost" size="icon" className="mb-4 md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <Menu />
                    </Button>
                    {children}
                </div>
            </main>
        </div>
    );
}
