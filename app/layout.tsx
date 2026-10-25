import type { Metadata, Viewport } from 'next';
import { Archivo, Barlow } from 'next/font/google';
import './globals.css';
import Analytics from './components/Analytics';
import { SITE, SERVICES } from './_site/content';

/* Tipografías auto-alojadas por Next (sin @import bloqueante) */
const archivo = Archivo({ subsets: ['latin'], variable: '--font-archivo', display: 'swap' });
const barlow = Barlow({ subsets: ['latin'], weight: ['300', '400', '500', '600'], variable: '--font-barlow', display: 'swap' });

export const viewport: Viewport = {
  themeColor: '#1a1813',
};

const DESC = 'Instaladores autorizados SEC: instalaciones eléctricas, tableros, certificación TE1, paneles solares y eficiencia energética en la RM y Villarrica.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: 'InnVolt | Electricidad y energía · Instaladores autorizados SEC',
    template: '%s | InnVolt',
  },
  description: DESC,
  applicationName: 'InnVolt',
  authors: [{ name: SITE.legalName }],
  creator: SITE.legalName,
  alternates: { canonical: '/' },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }, { url: '/icon-192.png', sizes: '192x192', type: 'image/png' }],
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'InnVolt | Electricidad y energía, pensadas para durar',
    description: DESC,
    url: SITE.url,
    siteName: 'InnVolt',
    locale: 'es_CL',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'InnVolt — Electricidad y energía, pensadas para durar. Instaladores autorizados SEC.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InnVolt | Electricidad y energía, pensadas para durar',
    description: DESC,
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

/* Datos estructurados del negocio: solo información verificada */
const businessLd = {
  '@context': 'https://schema.org',
  '@type': 'Electrician',
  '@id': `${SITE.url}/#negocio`,
  name: SITE.name,
  legalName: SITE.legalName,
  description: DESC,
  url: SITE.url,
  telephone: SITE.phone,
  email: SITE.email,
  image: `${SITE.url}/og-image.png`,
  logo: `${SITE.url}/icon-512.png`,
  address: { '@type': 'PostalAddress', addressRegion: 'Región Metropolitana', addressCountry: 'CL' },
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Región Metropolitana de Santiago' },
    { '@type': 'AdministrativeArea', name: 'Región de La Araucanía' },
  ],
  sameAs: [SITE.instagram],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios',
    itemListElement: SERVICES.filter(s => s.line !== 'zona').map(s => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: s.title, url: `${SITE.url}/${s.slug}` },
    })),
  },
};

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE.url}/#sitio`,
  name: SITE.name,
  url: SITE.url,
  inLanguage: 'es-CL',
  publisher: { '@id': `${SITE.url}/#negocio` },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CL" className={`${archivo.variable} ${barlow.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }} />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
