"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export interface SiteConfig {
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
    facebook_url?: string;
    instagram_url?: string;
    linkedin_url?: string;
    twitter_url?: string;
    campaign_url?: string;
}

export interface SiteImage {
    id: string;
    section: 'hero' | 'about' | 'catalog' | 'features' | 'hero-side';
    url: string;
    alt: string;
    title?: string;
    subtitle?: string;
    display_order: number;
    is_active: boolean;
}

interface ConfigContextType {
    config: SiteConfig;
    images: SiteImage[];
    isLoading: boolean;
    refreshConfig: () => Promise<void>;
}

const defaultConfig: SiteConfig = {
    company_name: 'BULTEX',
    company_slogan: 'Uniformes Industriales',
    company_description: '',
    contact_phone: '',
    contact_email: '',
    address_text: '',
    map_url: '',
    quote_email: '',
    quote_whatsapp: '',
    whatsapp_message: 'Hola, quiero cotizar uniformes.',
    facebook_url: '',
    instagram_url: '',
    linkedin_url: '',
    twitter_url: '',
    campaign_url: '/catalogo'
};

const ConfigContext = createContext<ConfigContextType>({
    config: defaultConfig,
    images: [],
    isLoading: true,
    refreshConfig: async () => { },
});

export function ConfigProvider({ children }: { children: React.ReactNode }) {
    const [config, setConfig] = useState<SiteConfig>(defaultConfig);
    const [images, setImages] = useState<SiteImage[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchConfig = async () => {
        setIsLoading(true);
        try {
            // Fetch Config
            const { data: configData, error: configError } = await supabase
                .from('app_config')
                .select('*');

            if (configError) throw configError;

            if (configData) {
                const newConfig = { ...defaultConfig };
                configData.forEach((item: { key: string; value: string }) => {
                    if (keyInConfig(item.key)) {
                        (newConfig as any)[item.key] = item.value;
                    }
                });
                setConfig(newConfig);
            }

            // Fetch Images
            const { data: imageData, error: imageError } = await supabase
                .from('site_images')
                .select('*')
                .eq('is_active', true)
                .order('display_order', { ascending: true });

            // Allow image error if table doesn't exist yet (soft fail)
            if (!imageError && imageData) {
                setImages(imageData as SiteImage[]);
            }

        } catch (error: any) {
            console.error("Error fetching config:", error.message || error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchConfig();
    }, []);

    return (
        <ConfigContext.Provider value={{ config, images, isLoading, refreshConfig: fetchConfig }}>
            {children}
        </ConfigContext.Provider>
    );
}

function keyInConfig(key: string): key is keyof SiteConfig {
    return Object.keys(defaultConfig).includes(key);
}

export const useConfig = () => useContext(ConfigContext);
