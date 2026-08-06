<<<<<<< HEAD
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Analytics from "./components/Analytics";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

export const viewport: Viewport = {
  themeColor: "#000000",
};

=======
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: 'swap' });

>>>>>>> 60c11a8cb62944ae79e5955fccc63ad6b8e1d0e1
export const metadata: Metadata = {
  title: {
    default: "INNVOLT | Electricista Certificado SEC – Santiago Chile",
    template: "%s | INNVOLT",
  },
<<<<<<< HEAD
  description: "Electricistas certificados SEC en Santiago. Instalaciones, domótica y cámaras CCTV para hogar, empresa e industria. Respondemos el mismo día, urgencias 24h, precio justo y garantía.",
=======
  description: "Electricistas certificados SEC en Santiago. Instalaciones eléctricas, domótica, automatización, cámaras CCTV y redes. Presupuesto gratis el mismo día.",
>>>>>>> 60c11a8cb62944ae79e5955fccc63ad6b8e1d0e1
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
<<<<<<< HEAD
    description: "Electricistas certificados SEC en Santiago. Electricidad, domótica y cámaras de seguridad. Precio justo y garantía.",
=======
    description: "Electricistas certificados SEC en Santiago. Electricidad, domótica y cámaras de seguridad. Presupuesto sin costo.",
>>>>>>> 60c11a8cb62944ae79e5955fccc63ad6b8e1d0e1
    url: "https://innvolt.cl",
    siteName: "INNVOLT",
    locale: "es_CL",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "INNVOLT - Electricidad y Automatización Santiago" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "INNVOLT | Electricista Certificado SEC – Santiago",
<<<<<<< HEAD
    description: "Electricistas certificados SEC en Santiago. Precio justo y garantía.",
=======
    description: "Electricistas certificados SEC en Santiago. Presupuesto gratis.",
>>>>>>> 60c11a8cb62944ae79e5955fccc63ad6b8e1d0e1
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
<<<<<<< HEAD
  "email": "innvolt.cl@gmail.com",
  "image": "https://innvolt.cl/og-image.jpg",
  "logo": "https://innvolt.cl/icon.svg",
=======
  "email": "inn-volt@outlook.cl",
  "image": "https://innvolt.cl/og-image.jpg",
>>>>>>> 60c11a8cb62944ae79e5955fccc63ad6b8e1d0e1
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

<<<<<<< HEAD
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

=======
>>>>>>> 60c11a8cb62944ae79e5955fccc63ad6b8e1d0e1
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
<<<<<<< HEAD
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
=======
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
>>>>>>> 60c11a8cb62944ae79e5955fccc63ad6b8e1d0e1
      </body>
    </html>
  );
}
