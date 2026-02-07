import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bultex-web.vercel.app'

    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/admin/', // Protect admin routes from crawling
        },
        sitemap: `${baseUrl}/sitemap.xml`,
    }
}
