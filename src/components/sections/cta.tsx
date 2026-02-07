import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CTA() {
    return (
        <section className="bg-primary text-primary-foreground py-24">
            <div className="container flex flex-col items-center justify-center space-y-4 text-center px-4 md:px-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    ¿Listo para equipar a tu equipo?
                </h2>
                <p className="max-w-[600px] text-primary-foreground/80 md:text-xl">
                    Solicita una cotización personalizada o compra directamente desde nuestro catálogo en línea.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                    <Link href="/catalogo">
                        <Button size="lg" variant="secondary" className="w-full min-[400px]:w-auto font-semibold">
                            Ver Catálogo Completo
                        </Button>
                    </Link>
                    <Link href="/contacto">
                        <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                            Contactar Ventas
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
