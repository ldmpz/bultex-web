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
    const displayImages = heroImages;

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
                {displayImages.length > 0 && (
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
                )}
            </div>

            <div className="container relative z-10 px-4 md:px-6 mx-auto">
                <div className="grid gap-12 lg:grid-cols-2 lg:gap-8 items-center">
                    {/* Content Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        className="flex flex-col justify-center space-y-6 text-center lg:text-left items-center lg:items-start"
                    >
                        <div className="inline-flex items-center gap-2 rounded-sm bg-accent/10 px-4 py-1.5 text-sm font-semibold text-white border border-accent/20 w-fit backdrop-blur-sm">
                            <Factory className="h-4 w-4" />
                            <span className="tracking-wide uppercase">{config.company_slogan || 'Ingeniería Textil Industrial'}</span>
                        </div>

                        <h1 className="text-4xl font-black tracking-tight text-slate-100 sm:text-5xl xl:text-7xl/none">
                            Checa nuestra <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-slate-200">
                                Nueva Campaña
                            </span>
                        </h1>

                        <p className="max-w-[600px] text-slate-300 md:text-xl font-light leading-relaxed">
                            {config.company_description || 'Equipa a tu personal con prendas de alta resistencia diseñadas para soportar las exigencias de la industria moderna. Durabilidad certificada y personalización total.'}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-2 w-full justify-center lg:justify-start">
                            <Link href="/contacto">
                                <Button size="lg" className="h-14 px-8 text-base bg-accent text-white hover:bg-accent/90 shadow-[0_0_20px_rgba(46,74,143,0.3)] hover:shadow-[0_0_30px_rgba(46,74,143,0.5)] transition-all transform hover:-translate-y-1">
                                    SOLICITAR COTIZACIÓN
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/catalogos">
                                <Button variant="outline" size="lg" className="h-14 px-8 text-base border-slate-700 text-white hover:bg-slate-800 hover:text-white backdrop-blur-sm bg-white/5">
                                    Ver Catálogos 2026
                                </Button>
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="pt-8 flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-slate-400 border-t border-slate-800/50 mt-4 w-full">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-blue-400" />
                                <span>Envíos Nacionales</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-blue-400" />
                                <span>Precios de Mayorista</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4 text-blue-400" />
                                <span>Garantía de Calidad</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Visual Column */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="relative mt-8 lg:mt-0 flex justify-center lg:justify-end"
                    >
                        <div className="relative w-full max-w-2xl">
                            {/* Improved Decorative Background Elements */}
                            <div className="absolute -top-6 -right-6 w-full h-full border-2 border-accent/30 rounded-sm -z-10 hidden lg:block" />
                            <div className="absolute -bottom-6 -left-6 w-full h-full bg-accent/5 rounded-sm -z-10 hidden lg:block backdrop-blur-sm" />

                            <div className="relative z-10 rounded-sm overflow-hidden shadow-2xl border border-slate-800 bg-slate-900">
                                {(() => {
                                    const sideImage = images.find(img => img.section === 'hero-side');

                                    if (!sideImage) {
                                        return (
                                            <div className="w-full aspect-[4/3] bg-slate-900 flex items-center justify-center border-2 border-slate-800 border-dashed">
                                                <div className="text-center p-6">
                                                    <Factory className="h-16 w-16 text-slate-700 mx-auto mb-4" />
                                                    <p className="text-slate-500 text-sm">Sin imagen configurada</p>
                                                </div>
                                            </div>
                                        );
                                    }

                                    return (
                                        <div className="block relative group overflow-hidden">
                                            <Image
                                                src={sideImage.url}
                                                alt={sideImage.alt}
                                                width={800}
                                                height={600}
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
                                        <Button className="font-bold tracking-wide rounded-sm shadow-xl bg-accent text-white hover:bg-accent/90 hover:scale-105 transition-all">
                                            VISUALIZAR CAMPAÑA
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
