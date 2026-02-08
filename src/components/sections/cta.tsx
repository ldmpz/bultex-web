"use client";

import { Button } from "@/components/ui/button";
import { useConfig } from "@/context/config-context";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export function CTA() {
    const { config } = useConfig();
    const whatsappLink = `https://wa.me/${config.quote_whatsapp}?text=${encodeURIComponent(config.whatsapp_message)}`;

    return (
        <section className="py-24 bg-slate-900 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: "radial-gradient(#4b5563 1px, transparent 1px)",
                backgroundSize: "32px 32px"
            }}></div>

            <div className="container relative z-10 px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl mb-6">
                        ¿Listo para equipar a tu personal?
                    </h2>
                    <p className="text-slate-300 max-w-2xl mx-auto mb-10 text-lg">
                        Solicita una cotización personalizada hoy mismo. Ofrecemos precios especiales por volumen.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href={whatsappLink} target="_blank">
                            <Button size="lg" className="h-14 px-8 text-base bg-green-600 hover:bg-green-700 text-white">
                                <MessageCircle className="mr-2 h-5 w-5" />
                                Cotizar por WhatsApp
                            </Button>
                        </Link>
                        <Link href="/contacto">
                            <Button variant="outline" size="lg" className="h-14 px-8 text-base border-slate-600 text-white hover:bg-slate-800 hover:text-white">
                                Formulario de Contacto
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
