"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface ConfigContextType {
    whatsappNumber: string | null;
    isLoading: boolean;
}

const ConfigContext = createContext<ConfigContextType>({
    whatsappNumber: null,
    isLoading: true,
});

export function ConfigProvider({ children }: { children: React.ReactNode }) {
    const [whatsappNumber, setWhatsappNumber] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const { data } = await supabase
                    .from('app_config')
                    .select('value')
                    .eq('key', 'whatsapp_number')
                    .single();

                if (data) {
                    setWhatsappNumber(data.value);
                }
            } catch (error) {
                console.error("Error fetching config:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchConfig();
    }, []);

    return (
        <ConfigContext.Provider value={{ whatsappNumber, isLoading }}>
            {children}
        </ConfigContext.Provider>
    );
}

export const useConfig = () => useContext(ConfigContext);
