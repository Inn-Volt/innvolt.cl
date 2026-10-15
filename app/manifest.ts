import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'INNVOLT — Electricista Certificado SEC en Santiago',
    short_name: 'INNVOLT',
    description: 'Electricistas certificados SEC y especialistas en energía solar en Santiago. Instalaciones eléctricas, certificación, paneles solares y net billing.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#000000',
    icons: [
      { src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
  };
}
