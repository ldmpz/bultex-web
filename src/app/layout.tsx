import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import "./globals.css";
import { ConfigProvider } from "@/context/config-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.bultex.com.mx"),
  title: {
    default: "BULTEX | Uniformes Industriales en México",
    template: "%s | BULTEX",
  },
  description: "Fabricación y venta de uniformes industriales en México. Camisolas, pantalones y overoles de alta resistencia. Calidad garantizada para tu empresa.",
  keywords: ["uniformes industriales México", "ropa de trabajo industrial", "camisolas industriales", "pantalones de trabajo", "overoles industriales", "seguridad industrial", "bultex", "venta de uniformes"],
  authors: [{ name: "BULTEX" }],
  creator: "BULTEX",
  alternates: {
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "https://www.bultex.com.mx",
    title: "BULTEX | Uniformes Industriales en México",
    description: "Venta de uniformes industriales de alta calidad: camisolas, pantalones, overoles. Envíos a todo México. Cotiza mayoreo.",
    siteName: "BULTEX",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "BULTEX Uniformes Industriales",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BULTEX | Uniformes Industriales en México",
    description: "Uniformes de alta resistencia para tu empresa. Cotiza en línea.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      // SVG favicon omitted due to large file size (1.8MB)
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: "/site.webmanifest",
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
