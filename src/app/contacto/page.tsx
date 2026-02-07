import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="container px-4 py-12 md:px-6">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-24">
                {/* Contact Info */}
                <div className="space-y-8">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight mb-4">Contáctanos</h1>
                        <p className="text-muted-foreground text-lg">
                            Estamos listos para asesorarte. Solicita una cotización o resuelve tus dudas sobre nuestros productos.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-start gap-4">
                            <MapPin className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold">Ubicación</h3>
                                <p className="text-muted-foreground">Calle Industrial 123, Colonia Centro<br />Ciudad de México, CP 06000</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Phone className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold">Teléfono / WhatsApp</h3>
                                <p className="text-muted-foreground">+52 55 1234 5678</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Mail className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold">Correo Electrónico</h3>
                                <p className="text-muted-foreground">ventas@bultex.com</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <Clock className="h-6 w-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold">Horario de Atención</h3>
                                <p className="text-muted-foreground">Lunes a Viernes: 9:00 AM - 6:00 PM<br />Sábados: 9:00 AM - 2:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm">
                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">Nombre</label>
                                <Input id="name" placeholder="Tu nombre" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="phone" className="text-sm font-medium">Teléfono</label>
                                <Input id="phone" placeholder="10 dígitos" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">Correo Electrónico</label>
                            <Input id="email" type="email" placeholder="nombre@empresa.com" />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium">Mensaje</label>
                            <Textarea
                                id="message"
                                placeholder="¿En qué podemos ayudarte? ¿Cotización de uniformes?"
                            />
                        </div>

                        <Button type="submit" className="w-full text-base">Enviar Mensaje</Button>
                    </form>
                </div>
            </div>
        </div>
    );
}
