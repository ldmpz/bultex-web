"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
    {
        title: "Línea Industrial",
        description: "Camisolas, Pantalones y Overoles de alta resistencia.",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
        href: "/catalogo?category=industrial",
        colSpan: "md:col-span-2",
    },
    {
        title: "Alta Visibilidad",
        description: "Chalecos y prendas con cinta reflejante normativa.",
        image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop", // Construction vest placeholder
        href: "/catalogo?category=seguridad",
        colSpan: "md:col-span-1",
    },
    {
        title: "Calzado de Seguridad",
        description: "Botas dieléctricas y con casquillo certificado.",
        image: "https://images.unsplash.com/photo-1604177091072-c7a8ece634ba?q=80&w=2070&auto=format&fit=crop", // Boots placeholder
        href: "/catalogo?category=calzado",
        colSpan: "md:col-span-1",
    },
    {
        title: "Línea Corporativa",
        description: "Camisas y Polos para imagen profesional.",
        image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?q=80&w=1925&auto=format&fit=crop", // Corporate/Office placeholder
        href: "/catalogo?category=corporativo",
        colSpan: "md:col-span-2",
    },
];

export function CatalogPreview() {
    return (
        <section className="container py-24 px-4 md:px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div className="space-y-4">
                    <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                        Catálogo <span className="text-primary">Especializado</span>
                    </h2>
                    <p className="text-slate-600 max-w-xl">
                        Encuentra la indumentaria perfecta para cada área de tu empresa.
                        Prendas diseñadas para cumplir con normativas de seguridad.
                    </p>
                </div>
                <Link href="/catalogo" className="hidden md:flex items-center text-primary font-bold hover:text-accent transition-colors group">
                    Ver Catálogo Completo
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categories.map((category, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        className={`group relative overflow-hidden rounded-sm h-[300px] shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-200 ${category.colSpan}`}
                    >
                        <Link href={category.href} className="block w-full h-full">
                            <Image
                                src={category.image}
                                alt={category.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />

                            <div className="absolute bottom-0 left-0 p-6 w-full transform transition-transform duration-500 group-hover:-translate-y-2">
                                <h3 className="text-2xl font-bold text-white mb-2">{category.title}</h3>
                                <p className="text-slate-200 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                                    {category.description}
                                </p>
                            </div>

                            <div className="absolute top-4 right-4 bg-accent text-accent-foreground p-2 rounded-full opacity-0 transform translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                                <ArrowRight className="h-5 w-5" />
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            <div className="mt-8 text-center md:hidden">
                <Link href="/catalogo" className="inline-flex items-center text-primary font-bold hover:text-accent transition-colors">
                    Ver Catálogo Completo
                    <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
            </div>
        </section>
    );
}
