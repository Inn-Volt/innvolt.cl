import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'InnVolt — Electricidad y energía',
    short_name: 'InnVolt',
    description: 'Instaladores eléctricos autorizados SEC: instalaciones, tableros, certificación TE1, paneles solares y eficiencia energética.',
    start_url: '/',
    display: 'standalone',
    background_color: '#1a1813',
    theme_color: '#1a1813',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
