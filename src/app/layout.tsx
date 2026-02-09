import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";
import { ConfigProvider } from "@/context/config-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://bultex-web.vercel.app"),
  title: {
    default: "BULTEX",
    template: "%s | BULTEX",
  },
  description: "Fabricación y venta de uniformes industriales, camisolas, pantalones y overoles. Calidad, durabilidad y personalización para tu empresa.",
  keywords: ["uniformes industriales", "ropa de trabajo", "camisolas", "pantalones industriales", "bordados", "seguridad industrial", "bultex", "méxico"],
  authors: [{ name: "BULTEX" }],
  creator: "BULTEX",
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "/",
    title: "BULTEX | Uniformes Industriales de Alta Calidad",
    description: "Venta de uniformes industriales: camisolas, pantalones, overoles. Envíos a todo México. Cotiza mayoreo.",
    siteName: "BULTEX",
    images: [
      {
        url: "/og-image.jpg", // We need to create this later or use a placeholder
        width: 1200,
        height: 630,
        alt: "BULTEX Uniformes Industriales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BULTEX | Uniformes Industriales",
    description: "Uniformes de alta resistencia para tu empresa. Cotiza en línea.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ConfigProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ConfigProvider>
      </body>
    </html>
  );
}
