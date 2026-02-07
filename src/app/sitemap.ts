import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bultex-web.vercel.app'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Fetch products for dynamic routes
    const { data: products } = await supabase
        .from('products')
        .select('id, created_at')

    const productEntries: MetadataRoute.Sitemap = (products || []).map((product) => ({
        url: `${baseUrl}/producto/${product.id}`,
        lastModified: new Date(product.created_at),
        changeFrequency: 'weekly',
        priority: 0.8,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${baseUrl}/catalogo`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/nosotros`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${baseUrl}/contacto`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        ...productEntries,
    ]
}
