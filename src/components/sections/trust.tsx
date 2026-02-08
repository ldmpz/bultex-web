"use client";

import { motion } from "framer-motion";

export function Trust() {
    return (
        <section className="bg-slate-900 py-12 border-y border-slate-800">
            <div className="container px-4 md:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center text-center">
                    {[
                        { val: "+10", label: "Años de Experiencia" },
                        { val: "+500", label: "Empresas Atendidas" },
                        { val: "100%", label: "Calidad Garantizada" },
                        { val: "24/7", label: "Soporte Personalizado" },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="space-y-2"
                        >
                            <h3 className="text-4xl font-black text-white">{item.val}</h3>
                            <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">{item.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
