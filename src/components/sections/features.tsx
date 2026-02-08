"use client";

import { ShieldCheck, Truck, Factory, PenTool, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const features = [
    {
        icon: Factory,
        title: "Capacidad de Producción",
        description: "Infraestructura lista para pedidos de alto volumen con tiempos de entrega garantizados.",
    },
    {
        icon: PenTool,
        title: "Personalización de Marca",
        description: "Bordado y estampado industrial de alta precisión para tu identidad corporativa.",
    },
    {
        icon: ShieldCheck,
        title: "Durabilidad Certificada",
        description: "Textiles técnicos (Ignífugos, Antiestáticos) y costuras reforzadas para uso rudo.",
    },
    {
        icon: Truck,
        title: "Logística Nacional",
        description: "Sistema de distribución eficiente a plantas y oficinas en todo México.",
    },
];

export function Features() {
    return (
        <section className="container py-24 px-4 md:px-6 bg-slate-50">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
                <div className="inline-block rounded-sm bg-slate-200 px-3 py-1 text-sm font-semibold text-slate-800 tracking-wide uppercase">
                    Por qué elegir BULTEX
                </div>
                <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
                    Soluciones Industriales <span className="text-primary">Integrales</span>
                </h2>
                <p className="max-w-[700px] text-slate-600 md:text-xl/relaxed">
                    Optimizamos la gestión de uniformes para que tu empresa se enfoque en operar.
                </p>
            </div>

            <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
                {/* Feature Grid */}
                <div className="grid gap-6 sm:grid-cols-2">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative overflow-hidden rounded-sm border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md hover:border-accent/40"
                        >
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-sm bg-slate-100 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-bold text-lg text-slate-900">{feature.title}</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
                            </div>
                            <div className="absolute bottom-0 left-0 h-1 w-0 bg-accent transition-all duration-300 group-hover:w-full" />
                        </motion.div>
                    ))}
                </div>

                {/* Feature Image / Call to Action */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative space-y-6 lg:pl-10"
                >
                    <div className="relative aspect-[4/3] overflow-hidden rounded-sm shadow-xl border border-slate-200">
                        <Image
                            src="https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=2070&auto=format&fit=crop"
                            alt="Control de Calidad BULTEX"
                            fill
                            className="object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                        <div className="absolute bottom-6 left-6 text-white max-w-xs">
                            <p className="font-bold text-lg">Control de Calidad Riguroso</p>
                            <p className="text-sm text-slate-300">Cada prenda es inspeccionada para garantizar cero defectos en tu entrega.</p>
                        </div>
                    </div>

                    <div className="bg-slate-900 p-8 rounded-sm text-white shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Factory className="w-32 h-32" />
                        </div>
                        <h3 className="text-2xl font-bold mb-2 relative z-10">¿Necesitas un pedido especial?</h3>
                        <p className="text-slate-300 mb-6 relative z-10">
                            Desarrollamos uniformes a medida según las normas de seguridad de tu industria.
                        </p>
                        <Link href="/contacto" className="relative z-10">
                            <Button className="w-full bg-white text-slate-900 hover:bg-slate-100 font-bold">
                                Hablar con un Experto
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
