import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: "INNVOLT | Electricista Certificado SEC – Santiago Chile",
    template: "%s | INNVOLT",
  },
  description: "Electricistas certificados SEC en Santiago. Instalaciones eléctricas, domótica, automatización, cámaras CCTV y redes. Presupuesto gratis el mismo día.",
  keywords: [
    "electricista Santiago", "instalación eléctrica Santiago", "certificación SEC",
    "trámite TE1", "domótica Santiago", "automatización hogar Santiago",
    "cámaras seguridad Santiago", "CCTV instalación", "electricista certificado SEC Chile", "innvolt"
  ],
  authors: [{ name: "INNVOLT SpA" }],
  creator: "INNVOLT SpA",
  metadataBase: new URL("https://innvolt.cl"),
  alternates: { canonical: "/" },
  icons: { icon: '/favicon.svg' },
  openGraph: {
    title: "INNVOLT | Electricista Certificado SEC – Santiago Chile",
    description: "Electricistas certificados SEC en Santiago. Electricidad, domótica y cámaras de seguridad. Presupuesto sin costo.",
    url: "https://innvolt.cl",
    siteName: "INNVOLT",
    locale: "es_CL",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "INNVOLT - Electricidad y Automatización Santiago" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "INNVOLT | Electricista Certificado SEC – Santiago",
    description: "Electricistas certificados SEC en Santiago. Presupuesto gratis.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "INNVOLT SpA",
  "description": "Electricistas certificados SEC en Santiago. Instalaciones eléctricas, domótica, automatización y sistemas de seguridad.",
  "url": "https://innvolt.cl",
  "telephone": "+56989203902",
  "email": "inn-volt@outlook.cl",
  "image": "https://innvolt.cl/og-image.jpg",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Santiago",
    "addressRegion": "Región Metropolitana",
    "addressCountry": "CL"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -33.4489,
    "longitude": -70.6693
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
    "opens": "08:00",
    "closes": "20:00"
  },
  "sameAs": ["https://www.instagram.com/inn.volt"],
  "priceRange": "$$",
  "currenciesAccepted": "CLP",
  "areaServed": {
    "@type": "State",
    "name": "Región Metropolitana"
  },
  "serviceType": [
    "Instalación eléctrica", "Certificación SEC", "Trámite TE1",
    "Domótica", "Automatización", "Cámaras de seguridad CCTV", "Redes de datos"
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
