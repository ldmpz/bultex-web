"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Loader2 } from "lucide-react";

export default function ConfigPage() {
    const [whatsapp, setWhatsapp] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const loadConfig = async () => {
            const { data } = await supabase
                .from('app_config')
                .select('value')
                .eq('key', 'whatsapp_number')
                .single();

            if (data) {
                setWhatsapp(data.value);
            }
            setLoading(false);
        };
        loadConfig();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const { error } = await supabase
            .from('app_config')
            .upsert({ key: 'whatsapp_number', value: whatsapp });

        if (error) {
            alert("Error al guardar: " + error.message);
        } else {
            alert("Configuración guardada correctamente");
        }
        setSaving(false);
    };

    return (
        <div className="max-w-xl mx-auto space-y-8">
            <h1 className="text-3xl font-bold tracking-tight">Configuración General</h1>

            <div className="bg-white p-6 rounded-xl shadow-sm border">
                <form onSubmit={handleSave} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Número de WhatsApp</label>
                        <p className="text-xs text-muted-foreground">
                            Número al que se enviarán los pedidos (formato internacional sin signos, ej. 5215512345678).
                        </p>
                        <div className="flex gap-2">
                            <Input
                                value={whatsapp}
                                onChange={e => setWhatsapp(e.target.value)}
                                placeholder="521..."
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <Button type="submit" disabled={loading || saving}>
                            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            <Save className="mr-2 h-4 w-4" /> Guardar Cambios
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
