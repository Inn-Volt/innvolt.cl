import type { MetadataRoute } from 'next';
import { SERVICES, SITE, SIMULADOR_PUBLICO } from './_site/content';
import { GUIDES } from './_site/guias';

/* Fecha real de la última actualización del contenido (no la del build, para no engañar a Google) */
const LAST_UPDATE = new Date('2026-10-25');

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number) => ({
    url: path ? `${SITE.url}/${path}` : SITE.url,
    lastModified: LAST_UPDATE,
    changeFrequency: 'monthly' as const,
    priority,
  });

  return [
    page('', 1),
    page('servicios', 0.9),
    ...SERVICES.map(s => page(s.slug, s.featured ? 0.9 : s.line === 'tecnologia' ? 0.6 : 0.8)),
    page('tecnologia', 0.7),
    page('proyectos', 0.7),
    page('contacto', 0.8),
    page('guias', 0.7),
    ...GUIDES.map(g => ({ ...page(`guias/${g.slug}`, 0.7), lastModified: new Date(g.updated) })),
    ...(SIMULADOR_PUBLICO ? [page('simulador-solar', 0.8)] : []),
    page('privacidad', 0.2),
  ];
}
