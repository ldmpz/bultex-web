import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, Facebook } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full border-t bg-background">
            <div className="container py-12 px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold tracking-tighter">BULTEX</h3>
                        <p className="text-sm text-muted-foreground">
                            Uniformes industriales de alta calidad para empresas exigentes.
                            Diseñamos durabilidad y estilo.
                        </p>
                    </div>

                    {/* Links */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Enlaces Rápidos</h4>
                        <nav className="flex flex-col gap-2">
                            <Link href="/catalogo" className="text-sm text-muted-foreground hover:text-primary transition-colors">Catálogo</Link>
                            <Link href="/nosotros" className="text-sm text-muted-foreground hover:text-primary transition-colors">Quiénes Somos</Link>
                            <Link href="/contacto" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contacto</Link>
                        </nav>
                    </div>

                    {/* Contact */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Contacto</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                <span>Calle Industrial 123, MX</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span>+52 55 1234 5678</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <span>contacto@bultex.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Social */}
                    <div className="space-y-4">
                        <h4 className="text-sm font-semibold">Síguenos</h4>
                        <div className="flex gap-4">
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                                <Instagram className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} BULTEX. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}
