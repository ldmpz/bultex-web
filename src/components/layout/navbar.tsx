"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
    { name: "Inicio", href: "/" },
    { name: "Catálogo", href: "/catalogo" },
    { name: "Quiénes Somos", href: "/nosotros" },
    { name: "Contacto", href: "/contacto" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between px-4 md:px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold tracking-tighter">BULTEX</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex gap-6 items-center">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium transition-colors hover:text-primary text-muted-foreground"
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Button>Cotizar Ahora</Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-muted-foreground hover:text-foreground"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <div className="md:hidden border-t bg-background">
                    <div className="container flex flex-col gap-4 p-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm font-medium hover:text-primary transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Button className="w-full">Cotizar Ahora</Button>
                    </div>
                </div>
            )}
        </nav>
    );
}
