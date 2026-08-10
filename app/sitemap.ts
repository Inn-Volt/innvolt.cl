import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  // Solo páginas reales e indexables (los #anclas NO son páginas para Google).
  const paths = [
    '',
    'servicios',
    'electricista-santiago',
    'tableros-electricos',
    'mantencion-electrica',
    'certificacion-te1',
    'camaras-cctv-santiago',
    'control-de-acceso',
    'domotica-santiago',
    'redes-cableado-estructurado',
    'pantallas-led',
    'urgencias-electricas-santiago',
  ];
  return paths.map((p) => ({
    url: p ? `https://innvolt.cl/${p}` : 'https://innvolt.cl',
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: p === '' ? 1 : p === 'servicios' ? 0.9 : 0.8,
  }));
}
