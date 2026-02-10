"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { useConfig } from "@/context/config-context";

export function Footer() {
    const { config } = useConfig();
    const pathname = usePathname();

    if (pathname?.startsWith("/admin")) return null;

    return (
        <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-900">
            <div className="container py-16 px-4 md:px-6 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
                    {/* Brand */}
                    <div className="space-y-4 flex flex-col items-center">
                        <h3 className="text-2xl font-black tracking-tighter text-white">{config.company_name}</h3>
                        <p className="text-sm leading-relaxed max-w-xs mx-auto">
                            {config.company_description || 'Líderes en confección de uniformes industriales de alta resistencia. Ingeniería textil aplicada a la seguridad y productividad de tu empresa.'}
                        </p>
                    </div>

                    {/* Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Navegación</h4>
                        <nav className="flex flex-col gap-3 items-center">
                            <Link href="/catalogo" className="text-sm hover:text-accent transition-colors">Catálogo Completo</Link>
                            <Link href="/nosotros" className="text-sm hover:text-accent transition-colors">Nuestra Empresa</Link>
                            <Link href="/contacto" className="text-sm hover:text-accent transition-colors">Solicitar Cotización</Link>
                        </nav>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contacto Industrial</h4>
                        <div className="space-y-3 text-sm flex flex-col items-center">
                            <div className="flex items-start gap-3 justify-center text-left max-w-[200px]">
                                <MapPin className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                                <span>{config.address_text || 'Parque Industrial Benito Juárez, Querétaro, Qro. México'}</span>
                            </div>
                            <div className="flex items-center gap-3 justify-center">
                                <Phone className="h-5 w-5 text-blue-400 shrink-0" />
                                <span>{config.contact_phone || '(55) 1234-5678'}</span>
                            </div>
                            <div className="flex items-center gap-3 justify-center">
                                <Mail className="h-5 w-5 text-blue-400 shrink-0" />
                                <span>{config.contact_email || 'ventas@bultex.com'}</span>
                            </div>
                        </div>
                    </div>

                    {/* Social */}
                    <div className="space-y-4 flex flex-col items-center">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Síguenos</h4>
                        <div className="flex gap-4 justify-center">
                            {config.facebook_url && (
                                <Link href={config.facebook_url} target="_blank" className="hover:text-blue-400 transition-colors">
                                    <Facebook className="h-6 w-6" />
                                </Link>
                            )}
                            {config.instagram_url && (
                                <Link href={config.instagram_url} target="_blank" className="hover:text-blue-400 transition-colors">
                                    <Instagram className="h-6 w-6" />
                                </Link>
                            )}
                            {config.linkedin_url && (
                                <Link href={config.linkedin_url} target="_blank" className="hover:text-blue-400 transition-colors">
                                    <Linkedin className="h-6 w-6" />
                                </Link>
                            )}
                            {config.twitter_url && (
                                <Link href={config.twitter_url} target="_blank" className="hover:text-blue-400 transition-colors">
                                    <Twitter className="h-6 w-6" />
                                </Link>
                            )}
                            {config.tiktok_url && (
                                <Link href={config.tiktok_url} target="_blank" className="hover:text-blue-400 transition-colors">
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

                <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
                    <p>&copy; {new Date().getFullYear()} {config.company_name} S.A. de C.V.</p>
                    <div className="flex gap-6">
                        <Link href="/privacidad" className="hover:text-slate-400">Aviso de Privacidad</Link>
                        <Link href="/terminos" className="hover:text-slate-400">Términos y Condiciones</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
