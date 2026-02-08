import Link from "next/link";
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-900">
            <div className="container py-16 px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-black tracking-tighter text-white">BULTEX</h3>
                        <p className="text-sm leading-relaxed">
                            Líderes en confección de uniformes industriales de alta resistencia.
                            Ingeniería textil aplicada a la seguridad y productividad de tu empresa.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Navegación</h4>
                        <nav className="flex flex-col gap-3">
                            <Link href="/catalogo" className="text-sm hover:text-accent transition-colors">Catálogo Completo</Link>
                            <Link href="/nosotros" className="text-sm hover:text-accent transition-colors">Nuestra Empresa</Link>
                            <Link href="/contacto" className="text-sm hover:text-accent transition-colors">Solicitar Cotización</Link>
                        </nav>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Contacto Industrial</h4>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                                <span>Parque Industrial Benito Juárez, Querétaro, Qro. México to</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-accent shrink-0" />
                                <span>(55) 1234-5678</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-accent shrink-0" />
                                <span>ventas@bultex.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Social */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-bold text-white uppercase tracking-wider">Síguenos</h4>
                        <div className="flex gap-4">
                            <Link href="#" className="hover:text-accent transition-colors">
                                <Linkedin className="h-6 w-6" />
                            </Link>
                            <Link href="#" className="hover:text-accent transition-colors">
                                <Facebook className="h-6 w-6" />
                            </Link>
                            <Link href="#" className="hover:text-accent transition-colors">
                                <Instagram className="h-6 w-6" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
                    <p>&copy; {new Date().getFullYear()} BULTEX Uniformes Industriales S.A. de C.V.</p>
                    <div className="flex gap-6">
                        <Link href="/privacidad" className="hover:text-slate-400">Aviso de Privacidad</Link>
                        <Link href="/terminos" className="hover:text-slate-400">Términos y Condiciones</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
