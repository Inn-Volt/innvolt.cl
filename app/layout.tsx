import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "INNVOLT | Electricidad, Automatización y Control",
  description: "Especialistas en instalaciones eléctricas integrales, certificación SEC, domótica y redes de seguridad en Santiago de Chile.",
  keywords: ["electricidad", "automatización", "SEC", "TE1", "domótica", "cámaras de seguridad", "Chile"],
  icons: {
    icon: '/favicon.svg',
  },

  // ✅ OPEN GRAPH (WhatsApp, LinkedIn, Facebook)
  openGraph: {
    title: "INNVOLT | Electricidad, Automatización y Control",
    description: "Instalaciones eléctricas, domótica y redes de seguridad en Santiago. Certificados SEC.",
    url: "https://innvolt.cl",
    siteName: "INNVOLT",
    locale: "es_CL",
    type: "website",
    images: [
      {
        url: "https://innvolt.cl/og-image.jpg", // 👈 ver instrucciones abajo
        width: 1200,
        height: 630,
        alt: "INNVOLT - Electricidad y Automatización",
      },
    ],
  },

  // ✅ TWITTER / X
  twitter: {
    card: "summary_large_image",
    title: "INNVOLT | Electricidad, Automatización y Control",
    description: "Instalaciones eléctricas, domótica y redes de seguridad en Santiago. Certificados SEC.",
    images: ["https://innvolt.cl/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}