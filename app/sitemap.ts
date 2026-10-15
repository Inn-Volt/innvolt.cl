import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  // Solo páginas reales e indexables (los #anclas NO son páginas para Google).
  const paths = [
    '',
    'servicios',
    // Electricidad
    'electricista-santiago',
    'instalaciones-electricas',
    'tableros-electricos',
    'aumento-de-capacidad-empalme',
    'mantencion-electrica',
    'certificacion-te1',
    'proyectos-electricos',
    'urgencias-electricas-santiago',
    // Energía renovable
    'paneles-solares-santiago',
    'paneles-solares-netbilling',
    'baterias-almacenamiento-energia',
    'cargador-auto-electrico',
    'eficiencia-energetica',
    // Ubicación
    'electricista-villarrica',
  ];
  return paths.map((p) => ({
    url: p ? `https://innvolt.cl/${p}` : 'https://innvolt.cl',
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: p === '' ? 1 : p === 'servicios' ? 0.9 : 0.8,
  }));
}
