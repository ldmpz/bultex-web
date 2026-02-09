"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
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
            {/* Main Navbar */}
            <nav className={cn(
                "w-full border-b backdrop-blur-md transition-all duration-300",
                scrolled
                    ? "bg-background/95 border-border/40 py-1 shadow-md"
                    : "bg-background/80 border-transparent py-2"
            )}>
                <div className="container flex items-center justify-between px-4 md:px-6">
                    {/* Logo (Left) */}
                    <Link href="/" className="flex items-center space-x-2 group shrink-0">
                        <div className="relative w-14 h-14">
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
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm font-medium transition-colors hover:text-accent text-foreground/80 hover:text-foreground relative group"
                            >
                                {item.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
                            </Link>
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
                            </div>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
