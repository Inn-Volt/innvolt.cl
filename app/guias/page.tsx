import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Clock } from 'lucide-react';
import { Shell, CtaBand, JsonLd } from '../_site/ui';
import { SITE } from '../_site/content';
import { GUIDES, fmtDate } from '../_site/guias';

export const metadata: Metadata = {
  title: 'Guías de electricidad y energía solar',
  description: 'Guías prácticas sobre certificación TE1, net billing, paneles solares y seguridad eléctrica, explicadas en simple por instaladores autorizados SEC.',
  alternates: { canonical: '/guias' },
};

export default function Page() {
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        name: 'Guías InnVolt',
        url: `${SITE.url}/guias`,
        publisher: { '@id': `${SITE.url}/#negocio` },
        blogPost: GUIDES.map(g => ({ '@type': 'BlogPosting', headline: g.title, url: `${SITE.url}/guias/${g.slug}`, datePublished: g.published })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE.url },
          { '@type': 'ListItem', position: 2, name: 'Guías', item: `${SITE.url}/guias` },
        ],
      },
    ],
  };

  return (
    <Shell active="Guías">
      <JsonLd data={ld} />
      <section className="iv-page-hero">
        <div className="iv-container">
          <Link href="/" className="iv-crumb"><ArrowLeft size={13} /> Inicio</Link>
          <h1>Guías</h1>
          <p className="iv-lead">Electricidad, certificación y energía solar explicadas en simple, con fuentes oficiales. Para que tomes buenas decisiones antes de cotizar.</p>
        </div>
      </section>

      <section className="iv-section">
        <div className="iv-container">
          <div className="iv-guide-grid">
            {GUIDES.map(g => (
              <Link key={g.slug} href={`/guias/${g.slug}`} className="iv-card iv-guide-card">
                <span className="iv-proj-cat">{g.category}</span>
                <h2>{g.title}</h2>
                <p>{g.metaDesc}</p>
                <span className="iv-guide-meta"><Clock size={14} /> {g.readMin} min · {fmtDate(g.published)}</span>
                <span className="iv-link">Leer guía <ArrowUpRight size={14} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="¿Prefieres que te lo expliquemos en tu caso?" text="Cuéntanos qué necesitas y te orientamos sin compromiso." />
    </Shell>
  );
}
