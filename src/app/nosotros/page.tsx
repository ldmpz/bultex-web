import { ShieldCheck, Users, Factory } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
    return (
        <div className="container px-4 py-12 md:px-6">
            {/* Header */}
            <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    Nuestra Historia y Misión
                </h1>
                <p className="text-xl text-muted-foreground">
                    En BULTEX, nos dedicamos a elevar la imagen y seguridad de las empresas mexicanas a través de uniformes de calidad superior.
                </p>
            </div>

            {/* Grid Content */}
            <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                <div className="order-2 md:order-1 relative aspect-video rounded-xl overflow-hidden shadow-xl">
                    <img
                        src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop"
                        alt="Equipo de trabajo"
                        className="object-cover w-full h-full"
                    />
                </div>
                <div className="order-1 md:order-2 space-y-6">
                    <h2 className="text-2xl font-bold">Más de 10 años de experiencia</h2>
                    <p className="text-muted-foreground">
                        Iniciamos como un pequeño taller de confección y hoy somos proveedores de confianza para industrias clave en México.
                        Entendemos que un uniforme no es solo ropa; es identidad, pertenencia y, sobre todo, una herramienta de seguridad.
                    </p>
                    <ul className="space-y-4">
                        <li className="flex gap-3">
                            <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <ShieldCheck className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Calidad Certificada</h3>
                                <p className="text-sm text-muted-foreground">Materiales que cumplen con normas de seguridad industrial.</p>
                            </div>
                        </li>
                        <li className="flex gap-3">
                            <div className="h-10 w-10 shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <Factory className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Fabricación Nacional</h3>
                                <p className="text-sm text-muted-foreground">Apoyamos la industria local con procesos de manufactura ética.</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
