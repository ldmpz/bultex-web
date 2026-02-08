"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useConfig } from "@/context/config-context";
import { useState } from "react";
import { motion } from "framer-motion";

export function ContactSection() {
    const { config } = useConfig();
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Here we would typically send to an API
        setStatus("sending");
        setTimeout(() => setStatus("success"), 1500);
    }

    return (
        <section className="container px-4 py-12 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="space-y-8"
                >
                    <div>
                        <h2 className="text-3xl font-black tracking-tight mb-4 text-slate-900">Contáctanos</h2>
                        <p className="text-slate-600 text-lg">
                            Estamos listos para asesorarte. Solicita una cotización o resuelve tus dudas sobre nuestros productos.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-primary/10 rounded-full text-primary mt-1">
                                <MapPin className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Ubicación</h3>
                                <p className="text-slate-600">{config.address_text || "Dirección no configurada"}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-primary/10 rounded-full text-primary mt-1">
                                <Phone className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Teléfono / WhatsApp</h3>
                                <p className="text-slate-600">{config.contact_phone || "Teléfono no configurado"}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-primary/10 rounded-full text-primary mt-1">
                                <Mail className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Correo Electrónico</h3>
                                <p className="text-slate-600">{config.contact_email || "Email no configurado"}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-2 bg-primary/10 rounded-full text-primary mt-1">
                                <Clock className="h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">Horario de Atención</h3>
                                <p className="text-slate-600">Lunes a Viernes: 9:00 AM - 6:00 PM<br />Sábados: 9:00 AM - 2:00 PM</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="bg-white border rounded-xl p-6 md:p-8 shadow-lg"
                >
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-bold text-slate-700">Nombre</label>
                                <Input id="name" placeholder="Tu nombre" required className="bg-slate-50 border-slate-200" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-sm font-bold text-slate-700">Teléfono</label>
                                <Input id="phone" placeholder="10 dígitos" required className="bg-slate-50 border-slate-200" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-bold text-slate-700">Correo Electrónico</label>
                            <Input id="email" type="email" placeholder="nombre@empresa.com" required className="bg-slate-50 border-slate-200" />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-bold text-slate-700">Mensaje</label>
                            <Textarea
                                id="message"
                                placeholder="Hola, me gustaría cotizar 50 camisolas..."
                                rows={4}
                                required
                                className="bg-slate-50 border-slate-200"
                            />
                        </div>

                        <Button type="submit" className="w-full text-base h-12" disabled={status === 'success' || status === 'sending'}>
                            {status === 'sending' ? 'Enviando...' : status === 'success' ? '¡Mensaje Enviado!' : 'Enviar Mensaje'}
                        </Button>

                        {status === 'success' && (
                            <p className="text-green-600 text-center text-sm font-medium animate-in fade-in">
                                Hemos recibido tu mensaje. Te contactaremos pronto.
                            </p>
                        )}
                    </form>
                </motion.div>
            </div>

            {/* Map Embed if URL exists implies we could embed it, but for now just link or show if valid */}
            {config.map_url && config.map_url.includes('google.com/maps') && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-12 w-full h-[400px] bg-slate-100 rounded-xl overflow-hidden shadow-inner"
                >
                    {/* Placeholder for map or actual embed if we had the embed code. 
                        Since we have a URL, we might not be able to embed it directly as iframe src unless it's the embed url.
                        We'll just show a link for now or a placeholder map image.
                    */}
                    <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-500">
                        Vista de Mapa (Requiere URL de Embed válida)
                    </div>
                </motion.div>
            )}
        </section>
    );
}
