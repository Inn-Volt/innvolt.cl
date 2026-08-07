import type { Metadata, Viewport } from "next";
import "./globals.css";
import Analytics from "./components/Analytics";

export const viewport: Viewport = {
  themeColor: "#000000",
};
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: "Electricistas Certificados SEC en Santiago | INNVOLT",
    template: "%s | INNVOLT",
  },
  description: "Electricistas certificados SEC en Santiago. Instalaciones eléctricas, aumento de capacidad, certificación TE1, tableros eléctricos, mantenciones y proyectos eléctricos para hogares y empresas. Cotiza gratis por WhatsApp.",
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
    title:"Electricistas Certificados SEC en Santiago | INNVOLT",
    description:"Cotiza con electricistas certificados SEC. Atención rápida en toda la Región Metropolitana.",
    url: "https://innvolt.cl",
    siteName: "INNVOLT",
    locale: "es_CL",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "INNVOLT - Electricidad y Automatización Santiago" }],
  },
  twitter: {
    card: "summary_large_image",
    title:"Electricistas Certificados SEC en Santiago | INNVOLT",
    description:"Cotiza con electricistas certificados SEC. Atención rápida en toda la Región Metropolitana.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

const jsonLd = {
  "contactPoint": {
  "@type": "ContactPoint",
  "telephone": "+56989203902",
  "contactType": "customer support",
  "availableLanguage": "Spanish"
},
  "@context": "https://schema.org",
  "@type": "Electrician",
  "name": "INNVOLT SpA",
  "description": "Electricistas certificados SEC en Santiago. Instalaciones eléctricas, domótica, automatización y sistemas de seguridad.",
  "url": "https://innvolt.cl",
  "telephone": "+56989203902",
  "email": "innvolt.cl@gmail.com",
  "image": "https://innvolt.cl/og-image.jpg",
  "logo": "https://innvolt.cl/icon.svg",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Santiago",
    "addressRegion": "Región Metropolitana",
    "addressCountry": "CL"
  },
 "@context":"https://schema.org",
 "@type":"Organization",
 "name":"INNVOLT",
 "url":"https://innvolt.cl",
 "logo":"https://innvolt.cl/icon.svg",
 "@type":"Service",
 "name":"Instalaciones eléctricas",
 "provider":{
   "@type":"Electrician",
   "name":"INNVOLT"
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
  areaServed:[
{
 "@type":"City",
 "name":"Santiago"
},
{
 "@type":"City",
 "name":"Puente Alto"
},
{
 "@type":"City",
 "name":"La Florida"
},
{
 "@type":"City",
 "name":"Providencia"
},
{
 "@type":"City",
 "name":"Las Condes"
},
{
 "@type":"City",
 "name":"Ñuñoa"
},
{
 "@type":"City",
 "name":"Maipú"
}
],
  "serviceType": [
    "Electricista certificado SEC",
    "Instalaciones eléctricas",
    "Aumento de capacidad",
    "Tableros eléctricos",
    "Mantención eléctrica",
    "Electricista a domicilio",
    "Certificación TE1",
    "Domótica",
    "Automatización",
    "Cámaras CCTV",
    "Control de acceso",
    "Redes"
  ]
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "¿Están certificados por la SEC?",
      "acceptedAnswer": { "@type": "Answer", "text": "Sí. Somos instaladores eléctricos autorizados y emitimos el certificado TE1 ante la Superintendencia de Electricidad y Combustibles (SEC), dejando tu instalación 100% en regla." }
    },
    {
      "@type": "Question",
      "name": "¿Cómo es el proceso de cotización?",
      "acceptedAnswer": { "@type": "Answer", "text": "Nos cuentas tu proyecto por el formulario o directo por WhatsApp y te respondemos el mismo día hábil. Según el caso, coordinamos una visita técnica o una evaluación a distancia." }
    },
    {
      "@type": "Question",
      "name": "¿Entregan boleta y factura?",
      "acceptedAnswer": { "@type": "Answer", "text": "Sí, emitimos boleta y factura por todos nuestros trabajos, con respaldo de materiales y mano de obra." }
    },
    {
      "@type": "Question",
      "name": "¿En qué zonas trabajan?",
      "acceptedAnswer": { "@type": "Answer", "text": "Cubrimos Santiago y toda la Región Metropolitana: Providencia, Las Condes, Ñuñoa, La Florida, Maipú, Puente Alto, Santiago Centro y comunas aledañas, tanto para hogares como para empresas e industria." }
    },
    {
      "@type": "Question",
      "name": "¿Atienden urgencias eléctricas?",
      "acceptedAnswer": { "@type": "Answer", "text": "Sí. Contamos con soporte técnico y respuesta dentro de 24 horas para fallas, cortes y emergencias eléctricas." }
    },
    {
      "@type": "Question",
      "name": "¿Qué garantía entregan?",
      "acceptedAnswer": { "@type": "Answer", "text": "Todos nuestros proyectos incluyen garantía sobre materiales y mano de obra. Trabajamos con productos de primera calidad y bajo normativa vigente." }
    }
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
