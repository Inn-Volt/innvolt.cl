import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'INNVOLT — Electricista Certificado SEC en Santiago',
    short_name: 'INNVOLT',
    description: 'Electricistas certificados SEC en Santiago. Instalaciones eléctricas, domótica y cámaras de seguridad.',
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
