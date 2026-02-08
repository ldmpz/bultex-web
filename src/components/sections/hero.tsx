"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Factory } from "lucide-react";

export function Hero() {
    return (
        <section className="relative flex min-h-[95vh] items-center justify-center overflow-hidden bg-slate-950 pt-16">
            {/* Dynamic Background */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/90 to-slate-900/60 z-10" />
                {/* Industrial Background - High Quality Placeholder */}
                <div className="h-full w-full bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 animate-pulse-slow" />
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
                            <span className="tracking-wide uppercase">Ingeniería Textil Industrial</span>
                        </div>

                        <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl xl:text-7xl/none">
                            Uniformes que <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                                Trabajan Contigo
                            </span>
                        </h1>

                        <p className="max-w-[600px] text-slate-300 md:text-xl font-light leading-relaxed">
                            Equipa a tu personal con prendas de <strong>alta resistencia</strong> diseñadas para soportar las exigencias de la industria moderna. Durabilidad certificada y personalización total.
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
                        className="relative hidden lg:block"
                    >
                        <div className="relative z-10 rounded-sm overflow-hidden shadow-2xl border border-slate-800">
                            <Image
                                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop"
                                alt="Industrial Worker"
                                width={700}
                                height={800}
                                className="object-cover h-[600px] w-full"
                                priority
                            />
                            {/* Overlay Card */}
                            <div className="absolute bottom-6 left-6 right-6 bg-slate-900/90 backdrop-blur-md p-4 rounded-sm border border-slate-700/50 flex items-center justify-between">
                                <div>
                                    <p className="text-white font-bold">Camisola Industrial T-300</p>
                                    <p className="text-accent text-sm">Disponible en stock</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-slate-400 text-xs uppercase tracking-wider">Material</p>
                                    <p className="text-white font-medium">Gabardina 100% Algodón</p>
                                </div>
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
