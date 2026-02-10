"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner"; // Assuming sonner or similar is installed, otherwise use alert or basic toast
// If sonner/toast not installed, we'll use simple alert for now or implement a basic feedback

// Define the shape of our config
type ConfigState = {
    company_name: string;
    company_slogan: string;
    company_description: string;
    contact_phone: string;
    contact_email: string;
    address_text: string;
    map_url: string;
    quote_email: string;
    quote_whatsapp: string;
    whatsapp_message: string;
    form_recipient_email: string;
    facebook_url?: string;
    instagram_url?: string;
    linkedin_url?: string;
    twitter_url?: string;
    campaign_url?: string;
    tiktok_url?: string;
};

const initialConfig: ConfigState = {
    company_name: '',
    company_slogan: '',
    company_description: '',
    contact_phone: '',
    contact_email: '',
    address_text: '',
    map_url: '',
    quote_email: '',
    quote_whatsapp: '',
    whatsapp_message: '',
    form_recipient_email: '',
    facebook_url: '',
    instagram_url: '',
    linkedin_url: '',
    twitter_url: '',
    tiktok_url: '',
    campaign_url: ''
};

export default function ConfigPage() {
    const [config, setConfig] = useState<ConfigState>(initialConfig);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadConfig();
    }, []);

    const loadConfig = async () => {
        try {
            const { data, error } = await supabase.from('app_config').select('*');
            if (error) throw error;

            const newConfig = { ...initialConfig };
            if (data) {
                data.forEach((item: { key: string; value: string }) => {
                    if (Object.keys(newConfig).includes(item.key)) {
                        (newConfig as any)[item.key] = item.value;
                    }
                });
            }
            setConfig(newConfig);
        } catch (error) {
            console.error("Error loading config:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const updates = Object.entries(config).map(([key, value]) => ({
                key,
                value
            }));

            const { error } = await supabase
                .from('app_config')
                .upsert(updates, { onConflict: 'key' });

            if (error) throw error;
            alert("Configuración guardada correctamente");
        } catch (error: any) {
            alert("Error al guardar: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleChange = (key: keyof ConfigState, value: string) => {
        setConfig(prev => ({ ...prev, [key]: value }));
    };

    if (loading) return (
        <div className="flex h-[50vh] items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto space-y-8 relative">
            {/* Sticky Header */}
            <div className="sticky top-20 z-30 bg-white/80 backdrop-blur-md p-4 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center -mx-4 md:mx-0">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Configuración del Sitio</h1>
                    <p className="text-sm text-slate-500">Administra la información global de tu sitio web.</p>
                </div>
                <Button onClick={handleSave} disabled={saving} size="lg" className="shadow-md">
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    Guardar Cambios
                </Button>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="w-full justify-start">
                    <TabsTrigger value="general">Información General</TabsTrigger>
                    <TabsTrigger value="contact">Contacto</TabsTrigger>
                    <TabsTrigger value="quotes">Cotizaciones</TabsTrigger>
                    <TabsTrigger value="social">Redes Sociales</TabsTrigger>
                </TabsList>

                {/* General Tab */}
                <TabsContent value="general">
                    <Card>
                        <CardHeader>
                            <CardTitle>Información de la Marca</CardTitle>
                            <CardDescription>Datos principales de la empresa visibles en todo el sitio.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Nombre de la Empresa</label>
                                <Input
                                    value={config.company_name}
                                    onChange={(e) => handleChange('company_name', e.target.value)}
                                    placeholder="BULTEX"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Eslogan</label>
                                <Input
                                    value={config.company_slogan}
                                    onChange={(e) => handleChange('company_slogan', e.target.value)}
                                    placeholder="Uniformes Industriales"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Descripción</label>
                                <Textarea
                                    value={config.company_description}
                                    onChange={(e) => handleChange('company_description', e.target.value)}
                                    placeholder="Descripción breve para SEO y Footer"
                                    rows={3}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Link de Campaña (Botón Hero)</label>
                                <Input
                                    value={config.campaign_url || ''}
                                    onChange={(e) => handleChange('campaign_url', e.target.value)}
                                    placeholder="/catalogo o https://..."
                                />
                                <p className="text-xs text-muted-foreground">URL a la que redirige la imagen y botón de campaña en el Hero.</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Contact Tab */}
                <TabsContent value="contact">
                    <Card>
                        <CardHeader>
                            <CardTitle>Información de Contacto</CardTitle>
                            <CardDescription>Datos visibles en headers, footers y página de contacto.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Teléfono de Contacto</label>
                                    <Input
                                        value={config.contact_phone}
                                        onChange={(e) => handleChange('contact_phone', e.target.value)}
                                        placeholder="(55) 1234-5678"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Email de Contacto</label>
                                    <Input
                                        value={config.contact_email}
                                        onChange={(e) => handleChange('contact_email', e.target.value)}
                                        placeholder="contacto@bultex.com"
                                    />
                                </div>
                            </div>

                            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-3">
                                <div className="flex items-start gap-2">
                                    <div className="mt-0.5">
                                        <svg className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-semibold text-blue-900 mb-1">Email para Formulario de Contacto</h4>
                                        <p className="text-xs text-blue-700 mb-3">
                                            Los mensajes del formulario de contacto se enviarán a este correo. Déjalo vacío si solo quieres guardar los mensajes en la base de datos.
                                        </p>
                                        <Input
                                            type="email"
                                            value={config.form_recipient_email}
                                            onChange={(e) => handleChange('form_recipient_email', e.target.value)}
                                            placeholder="formularios@bultex.com"
                                            className="bg-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">Dirección Física</label>
                                <Input
                                    value={config.address_text}
                                    onChange={(e) => handleChange('address_text', e.target.value)}
                                    placeholder="Av. Industria 123..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">URL del Mapa (Google Maps Embed o Link)</label>
                                <Input
                                    value={config.map_url}
                                    onChange={(e) => handleChange('map_url', e.target.value)}
                                    placeholder="https://maps.google.com..."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Quotes Tab */}
                <TabsContent value="quotes">
                    <Card>
                        <CardHeader>
                            <CardTitle>Configuración de Cotizaciones</CardTitle>
                            <CardDescription>Destinos para las solicitudes de cotización.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">WhatsApp para Cotizaciones (Solo números, con lada)</label>
                                <Input
                                    value={config.quote_whatsapp}
                                    onChange={(e) => handleChange('quote_whatsapp', e.target.value)}
                                    placeholder="5215512345678"
                                />
                                <p className="text-xs text-muted-foreground">Formato internacional sin signos (ej. 521...)</p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Mensaje Automático WhatsApp</label>
                                <Input
                                    value={config.whatsapp_message}
                                    onChange={(e) => handleChange('whatsapp_message', e.target.value)}
                                    placeholder="Hola, me interesa cotizar..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email para recibir Cotizaciones</label>
                                <Input
                                    value={config.quote_email}
                                    onChange={(e) => handleChange('quote_email', e.target.value)}
                                    placeholder="cotizaciones@bultex.com"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Social Media Tab */}
                <TabsContent value="social">
                    <Card>
                        <CardHeader>
                            <CardTitle>Redes Sociales</CardTitle>
                            <CardDescription>Enlaces a tus perfiles sociales.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Facebook URL</label>
                                <Input
                                    value={config.facebook_url || ''}
                                    onChange={(e) => handleChange('facebook_url', e.target.value)}
                                    placeholder="https://facebook.com/bultex"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Instagram URL</label>
                                <Input
                                    value={config.instagram_url || ''}
                                    onChange={(e) => handleChange('instagram_url', e.target.value)}
                                    placeholder="https://instagram.com/bultex"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">LinkedIn URL</label>
                                <Input
                                    value={config.linkedin_url || ''}
                                    onChange={(e) => handleChange('linkedin_url', e.target.value)}
                                    placeholder="https://linkedin.com/company/bultex"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Twitter / X URL</label>
                                <Input
                                    value={config.twitter_url || ''}
                                    onChange={(e) => handleChange('twitter_url', e.target.value)}
                                    placeholder="https://twitter.com/bultex"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">TikTok URL</label>
                                <Input
                                    value={config.tiktok_url || ''}
                                    onChange={(e) => handleChange('tiktok_url', e.target.value)}
                                    placeholder="https://tiktok.com/@bultex"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
