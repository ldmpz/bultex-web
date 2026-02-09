"use client";

import { ShieldCheck, Truck, Users, Leaf } from "lucide-react";
import { motion } from "framer-motion";

const features = [
    {
        icon: ShieldCheck,
        title: "Seguridad Industrial",
        description: "Prendas que cumplen con normas de seguridad para proteger a tu equipo.",
    },
    {
        icon: Truck,
        title: "Logística Eficiente",
        description: "Envíos a todo el país con tiempos de entrega optimizados.",
    },
    {
        icon: Users,
        title: "Atención B2B",
        description: "Asesoría especializada para compras corporativas y licitaciones.",
    },
    {
        icon: Leaf,
        title: "Sustentabilidad",
        description: "Procesos de fabricación responsables con el medio ambiente.",
    },
];

export function Features() {
    return (
        <section className="py-24 bg-slate-50">
            <div className="container px-4 md:px-6 mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl mb-4">
                        ¿Por qué elegir <span className="text-primary">BULTEX</span>?
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Más que uniformes, ofrecemos soluciones textiles integrales para tu industria.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-slate-100 hover:shadow-md transition-shadow group"
                        >
                            <div className="p-3 bg-primary/10 rounded-full text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <feature.icon className="h-8 w-8" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
