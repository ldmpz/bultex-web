"use client";

import { ShieldCheck, Palette, Truck, Award } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        icon: ShieldCheck,
        title: "Durabilidad Garantizada",
        description: "Telas de alta resistencia diseñadas para el trabajo rudo industrial.",
    },
    {
        icon: Palette,
        title: "Personalización Total",
        description: "Bordado y estampado de logotipos para fortalecer tu identidad corporativa.",
    },
    {
        icon: Truck,
        title: "Envíos a todo México",
        description: "Logística eficiente para entregar tus uniformes donde los necesites.",
    },
    {
        icon: Award,
        title: "Calidad Premium",
        description: "Confección detallada y materiales que cumplen normas de seguridad.",
    },
];

export function Features() {
    return (
        <section className="container py-24 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                    Por qué elegirnos
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                    Más que un Uniforme, una Herramienta
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Entendemos que la seguridad y la imagen son vitales para tu empresa.
                </p>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
                <div className="grid gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group flex gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50"
                        >
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="font-bold">{feature.title}</h3>
                                <p className="text-muted-foreground">{feature.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="relative aspect-video overflow-hidden rounded-xl border bg-muted shadow-xl"
                >
                    {/* Placeholder for Feature Image */}
                    <img
                        src="https://images.unsplash.com/photo-1576633587382-13ddf37b1fc1?q=80&w=2072&auto=format&fit=crop"
                        alt="Taller de confección"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </motion.div>
            </div>
        </section>
    );
}
