"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-background">
            {/* Background Graphic */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-background to-background/50 z-10" />
                {/* Placeholder for Hero Image - To be replaced with real image */}
                <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
            </div>

            <div className="container relative z-10 px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex flex-col justify-center space-y-4"
                    >
                        <div className="inline-block rounded-lg bg-accent px-3 py-1 text-sm text-accent-foreground w-fit">
                            Nuevo Catálogo 2026
                        </div>
                        <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl xl:text-6xl/none">
                            Uniformes que definen <span className="text-primary">Tu Marca</span>
                        </h1>
                        <p className="max-w-[600px] text-muted-foreground md:text-xl">
                            Durabilidad, comodidad y diseño profesional para tu equipo.
                            Personalización completa y envíos a todo México.
                        </p>
                        <div className="flex flex-col gap-2 min-[400px]:flex-row">
                            <Link href="/catalogo">
                                <Button size="lg" className="w-full min-[400px]:w-auto group">
                                    Ver Catálogo
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                            <Link href="/contacto">
                                <Button variant="outline" size="lg" className="w-full min-[400px]:w-auto">
                                    Contactar Asesor
                                </Button>
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex items-center justify-center"
                    >
                        {/* Visual Element / Product Highlight */}
                        <div className="aspect-square overflow-hidden rounded-xl border bg-muted/50 shadow-2xl w-full max-w-[500px] h-[400px] md:h-[500px]">
                            {/* Placeholder for Hero Image */}
                            <Image
                                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop"
                                alt="Hero Product"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
