"use client";

import { useConfig } from "@/context/config-context";
import Image from "next/image";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

export function About() {
    const { config, images } = useConfig();

    // Try to find an 'about' image or use fallback
    const aboutImage = images.find(img => img.section === 'about')?.url ||
        "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=2070&auto=format&fit=crop";

    return (
        <section id="nosotros" className="py-24 bg-white overflow-hidden">
            <div className="container px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative rounded-sm overflow-hidden shadow-2xl skew-y-1 transform transition-transform duration-700 hover:skew-y-0">
                            <Image
                                src={aboutImage}
                                alt="Fábrica BULTEX"
                                width={800}
                                height={600}
                                className="object-cover w-full h-[500px]"
                            />
                        </div>
                        {/* Decorative background */}
                        <div className="absolute top-4 -left-4 w-full h-full border-4 border-slate-100 -z-10 rounded-sm skew-y-1" />
                        <div className="absolute -bottom-4 -right-4 w-2/3 h-2/3 bg-slate-50 -z-10 rounded-full blur-3xl opacity-50" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <div className="inline-block rounded-lg bg-slate-100 px-3 py-1 text-sm text-slate-900 font-semibold">
                            Sobre Nosotros
                        </div>
                        <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
                            {config.company_name || 'BULTEX'} <span className="text-primary">Industrial</span>
                        </h2>

                        <p className="text-lg text-slate-600 leading-relaxed">
                            {config.company_description ?
                                config.company_description :
                                "Somos una empresa líder en la confección y distribución de uniformes industriales de alta calidad. Nos especializamos en equipar a empresas con prendas duraderas, seguras y confortables."
                            }
                        </p>

                        <div className="space-y-4 pt-4">
                            {[
                                { title: "Materiales Certificados", desc: "Teloz y gabardinas de uso rudo para máxima durabilidad." },
                                { title: "Personalización Completa", desc: "Bordado de logotipos y ajuste de tallas según necesidades." },
                                { title: "Abastecimiento Constante", desc: "Capacidad de producción para grandes volúmenes y entregas puntuales." }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                                    viewport={{ once: true }}
                                    className="flex items-start gap-3"
                                >
                                    <div className="p-2 bg-primary/10 rounded-full text-primary">
                                        <Check className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900">{item.title}</h3>
                                        <p className="text-sm text-slate-600">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
