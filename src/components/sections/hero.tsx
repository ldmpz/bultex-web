"use client";

import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Factory } from "lucide-react";
import { useConfig } from "@/context/config-context";
import { useState, useEffect } from "react";

export function Hero() {
    const { config, images } = useConfig();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Filter hero images
    const heroImages = images.filter(img => img.section === 'hero');
    const displayImages = heroImages.length > 0 ? heroImages : [
        { url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop", alt: "Industrial Background" }
    ];

    useEffect(() => {
        if (displayImages.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % displayImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [displayImages.length]);

    return (
        <section className="relative flex min-h-[95vh] items-center justify-center overflow-hidden bg-slate-950 pt-16">
            {/* Dynamic Background Carousel */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/60 z-10" />
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.4 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="absolute inset-0 h-full w-full bg-cover bg-center"
                        style={{ backgroundImage: `url('${displayImages[currentImageIndex].url}')` }}
                    />
                </AnimatePresence>
            </div>

            <div className="container relative z-10 px-4 md:px-6">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
                    {/* Content Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex flex-col justify-center space-y-6"
                    >
                        <div className="inline-flex items-center gap-2 rounded-sm bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent border border-accent/20 w-fit backdrop-blur-sm">
                            <Factory className="h-4 w-4" />
                            <span className="tracking-wide uppercase">{config.company_slogan || 'Ingeniería Textil Industrial'}</span>
                        </div>

                        <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl xl:text-7xl/none">
                            Checa nuestra <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                                Nueva Campaña
                            </span>
                        </h1>

                        <p className="max-w-[600px] text-slate-300 md:text-xl font-light leading-relaxed">
                            {config.company_description || 'Equipa a tu personal con prendas de alta resistencia diseñadas para soportar las exigencias de la industria moderna. Durabilidad certificada y personalización total.'}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-2">
                            <Link href="/contacto">
                                <Button size="lg" className="h-14 px-8 text-base bg-accent text-accent-foreground hover:bg-accent/90 shadow-[0_0_20px_rgba(202,138,4,0.3)] hover:shadow-[0_0_30px_rgba(202,138,4,0.5)] transition-all transform hover:-translate-y-1">
                                    SOLICITAR COTIZACIÓN
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/catalogo">
                                <Button variant="outline" size="lg" className="h-14 px-8 text-base border-slate-700 text-white hover:bg-slate-800 hover:text-white backdrop-blur-sm bg-white/5">
                                    Ver Catálogo 2026
                                </Button>
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="pt-8 flex items-center gap-6 text-sm text-slate-400 border-t border-slate-800/50 mt-4">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-accent" />
                                <span>Envíos Nacionales</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-accent" />
                                <span>Precios de Mayorista</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-accent" />
                                <span>Garantía de Calidad</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Visual Column */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="relative mt-8 lg:mt-0"
                    >
                        <div className="relative z-10 rounded-sm overflow-hidden shadow-2xl border border-slate-800">
                            {(() => {
                                const sideImage = images.find(img => img.section === 'hero-side');
                                const imageToUse = sideImage || {
                                    url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
                                    alt: "Industrial Worker"
                                };

                                return (
                                    <div className="block relative group overflow-hidden">
                                        <Image
                                            src={imageToUse.url}
                                            alt={imageToUse.alt}
                                            width={0}
                                            height={0}
                                            sizes="100vw"
                                            className="w-full h-auto transition-transform duration-700 group-hover:scale-105"
                                            priority
                                        />
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                                    </div>
                                );
                            })()}

                            {/* Overlay Card - MOVED TO BUTTON */}
                            <div className="absolute bottom-6 right-6">
                                <Link href={config.campaign_url || '/catalogo'}>
                                    <Button className="font-bold tracking-wide rounded-sm shadow-xl bg-accent text-accent-foreground hover:bg-accent/90 hover:scale-105 transition-all">
                                        VISUALIZAR CAMPAÑA
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Decorative Background Element */}
                        <div className="absolute -top-10 -right-10 w-full h-full border-2 border-accent/20 rounded-sm -z-10" />
                        <div className="absolute -bottom-10 -left-10 w-full h-full bg-slate-800/20 rounded-sm -z-10" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
