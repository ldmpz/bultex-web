"use client";

import { motion } from "framer-motion";

const stats = [
    { label: "Años de Experiencia", value: "+15" },
    { label: "Empresas Atendidas", value: "+500" },
    { label: "Prendas Entregadas", value: "+1M" },
    { label: "Cobertura", value: "Nacional" },
];

export function Trust() {
    return (
        <section className="bg-slate-900 py-16 text-white border-t border-slate-800">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="space-y-2"
                        >
                            <div className="text-4xl md:text-5xl font-black text-accent tracking-tighter">
                                {stat.value}
                            </div>
                            <div className="text-sm md:text-base text-slate-400 font-medium uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
