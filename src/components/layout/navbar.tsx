"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Facebook, Instagram, Linkedin, Twitter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useConfig } from "@/context/config-context";

const navItems = [
    { name: "Inicio", href: "/" },
    {
        name: "Productos",
        href: "/productos",
        dropdown: [
            { name: "Ver Productos", href: "/productos" },
            { name: "Catálogos PDF", href: "/catalogos" },
        ]
    },
    { name: "Quiénes Somos", href: "/nosotros" },
    { name: "Contacto", href: "/contacto" },
];

export function Navbar() {
    const { config } = useConfig();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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
            {/* Main Navbar */}
            <nav className={cn(
                "w-full border-b backdrop-blur-md transition-all duration-300",
                scrolled
                    ? "bg-background/95 border-border/40 py-0.5 shadow-md"
                    : "bg-background/80 border-transparent py-1"
            )}>
                <div className="container flex items-center justify-between px-4 md:px-6">
                    {/* Logo (Left) */}
                    <Link href="/" className="flex items-center space-x-2 group shrink-0">
                        <div className="relative h-16 w-auto aspect-[3/1]">
                            {/* Assumes logo.png is in the public folder */}
                            <img
                                src="/logo.png"
                                alt="BULTEX Logo"
                                className="object-contain w-full h-full"
                            />
                        </div>
                    </Link>

                    {/* Desktop Menu (Centered) */}
                    <div className="hidden md:flex flex-1 justify-center gap-8 items-center">
                        {navItems.map((item) => (
                            <div
                                key={item.href}
                                className="relative group"
                                onMouseEnter={() => item.dropdown && setOpenDropdown(item.name)}
                                onMouseLeave={() => setOpenDropdown(null)}
                            >
                                <Link
                                    href={item.href}
                                    className="text-sm font-medium transition-colors hover:text-accent text-foreground/80 hover:text-foreground relative group flex items-center gap-1"
                                >
                                    {item.name}
                                    {item.dropdown && (
                                        <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
                                    )}
                                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
                                </Link>

                                {/* Dropdown Menu */}
                                <div
                                    className={cn(
                                        "absolute top-full left-0 pt-2 w-48 transition-all duration-200", // pt-2 acts as invisible bridge
                                        openDropdown === item.name ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
                                    )}
                                >
                                    <div className="bg-slate-50 border border-slate-200 rounded-lg shadow-xl py-2 overflow-hidden">
                                        {item.dropdown?.map((dropItem) => (
                                            <Link
                                                key={dropItem.href}
                                                href={dropItem.href}
                                                className="block px-4 py-2.5 text-sm text-slate-600 hover:text-primary hover:bg-slate-100 transition-colors font-medium"
                                                onClick={() => setOpenDropdown(null)}
                                            >
                                                {dropItem.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Social Icons (Right) */}
                    <div className="hidden md:flex items-center gap-4 shrink-0">
                        {config.facebook_url && (
                            <Link href={config.facebook_url} target="_blank" className="hover:text-accent transition-colors text-foreground/80">
                                <Facebook className="h-5 w-5" />
                            </Link>
                        )}
                        {config.instagram_url && (
                            <Link href={config.instagram_url} target="_blank" className="hover:text-accent transition-colors text-foreground/80">
                                <Instagram className="h-5 w-5" />
                            </Link>
                        )}
                        {config.linkedin_url && (
                            <Link href={config.linkedin_url} target="_blank" className="hover:text-accent transition-colors text-foreground/80">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                        )}
                        {config.twitter_url && (
                            <Link href={config.twitter_url} target="_blank" className="hover:text-accent transition-colors text-foreground/80">
                                <Twitter className="h-5 w-5" />
                            </Link>
                        )}
                        {config.tiktok_url && (
                            <Link href={config.tiktok_url} target="_blank" className="hover:text-accent transition-colors text-foreground/80">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5"
                                >
                                    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                </svg>
                            </Link>
                        )}
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
                                <div key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-lg font-medium hover:text-accent transition-colors border-b border-border/50 pb-2 block"
                                        onClick={() => !item.dropdown && setIsOpen(false)}
                                    >
                                        {item.name}
                                    </Link>
                                    {/* Mobile Dropdown Items */}
                                    {item.dropdown && (
                                        <div className="pl-4 mt-2 space-y-2">
                                            {item.dropdown.map((dropItem) => (
                                                <Link
                                                    key={dropItem.href}
                                                    href={dropItem.href}
                                                    className="block text-sm text-foreground/70 hover:text-foreground py-1"
                                                    onClick={() => setIsOpen(false)}
                                                >
                                                    • {dropItem.name}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            {/* Mobile Socials */}
                            <div className="flex gap-6 mt-4 justify-center">
                                {config.facebook_url && (
                                    <Link href={config.facebook_url} target="_blank" className="hover:text-accent transition-colors text-foreground/80">
                                        <Facebook className="h-6 w-6" />
                                    </Link>
                                )}
                                {config.instagram_url && (
                                    <Link href={config.instagram_url} target="_blank" className="hover:text-accent transition-colors text-foreground/80">
                                        <Instagram className="h-6 w-6" />
                                    </Link>
                                )}
                                {config.linkedin_url && (
                                    <Link href={config.linkedin_url} target="_blank" className="hover:text-accent transition-colors text-foreground/80">
                                        <Linkedin className="h-6 w-6" />
                                    </Link>
                                )}
                                {config.tiktok_url && (
                                    <Link href={config.tiktok_url} target="_blank" className="hover:text-accent transition-colors text-foreground/80">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="h-6 w-6"
                                        >
                                            <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                                        </svg>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
