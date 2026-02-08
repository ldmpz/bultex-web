"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useConfig } from "@/context/config-context";

const navItems = [
    { name: "Inicio", href: "/" },
    { name: "Catálogo", href: "/catalogo" },
    { name: "Quiénes Somos", href: "/nosotros" },
    { name: "Contacto", href: "/contacto" },
];

export function Navbar() {
    const { config } = useConfig();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    if (pathname?.startsWith("/admin")) return null;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Format WhatsApp Link
    const whatsappLink = `https://wa.me/${config.quote_whatsapp}?text=${encodeURIComponent(config.whatsapp_message)}`;

    return (
        <header className="fixed top-0 w-full z-50 transition-all duration-300">
            {/* Top Bar - Industrial Trust Indicators */}
            <div className={cn(
                "w-full bg-slate-900 text-slate-100 text-xs py-2 transition-all duration-300 overflow-hidden",
                scrolled ? "h-0 opacity-0" : "h-auto opacity-100"
            )}>
                <div className="container flex justify-between items-center px-4 md:px-6">
                    <div className="flex gap-6">
                        <div className="flex items-center gap-2">
                            <Phone className="h-3 w-3 text-accent" />
                            <span className="font-medium tracking-wide">Venta Mayorista: {config.contact_phone || '(55) 1234-5678'}</span>
                        </div>
                        <div className="hidden sm:flex items-center gap-2">
                            <Mail className="h-3 w-3 text-accent" />
                            <span className="font-medium tracking-wide">{config.contact_email || 'ventas@bultex.com'}</span>
                        </div>
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <span className="text-slate-400">Envíos a todo México</span>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav className={cn(
                "w-full border-b backdrop-blur-md transition-all duration-300",
                scrolled
                    ? "bg-background/95 border-border/40 py-2 shadow-md"
                    : "bg-background/80 border-transparent py-4"
            )}>
                <div className="container flex items-center justify-between px-4 md:px-6">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="bg-primary text-primary-foreground p-1.5 rounded-sm">
                            <span className="text-xl font-black tracking-tighter group-hover:text-accent transition-colors">BX</span>
                        </div>
                        <span className="text-xl font-bold tracking-tighter text-foreground">{config.company_name || 'BULTEX'}</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex gap-8 items-center">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm font-medium transition-colors hover:text-accent text-foreground/80 hover:text-foreground relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
                            </Link>
                        ))}
                        <Link href={whatsappLink} target="_blank">
                            <Button className="font-bold tracking-wide rounded-sm shadow-md hover:shadow-lg transition-all active:scale-95 bg-accent text-accent-foreground hover:bg-accent/90">
                                COTIZAR AHORA
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-foreground hover:text-accent transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {isOpen && (
                    <div className="md:hidden border-t bg-background absolute top-full w-full shadow-xl animate-accordion-down">
                        <div className="container flex flex-col gap-4 p-6">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-lg font-medium hover:text-accent transition-colors border-b border-border/50 pb-2"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link href={whatsappLink} target="_blank" className="w-full">
                                <Button className="w-full font-bold bg-accent text-accent-foreground mt-4" size="lg">
                                    COTIZAR AHORA
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
