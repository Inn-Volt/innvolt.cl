import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight, Clock, Info } from 'lucide-react';
import { Shell, FaqList, CtaBand, JsonLd, waLink } from '../../_site/ui';
import { SITE, getService, type Service } from '../../_site/content';
import { GUIDES, getGuide, fmtDate } from '../../_site/guias';

export const dynamicParams = false;

export function generateStaticParams() {
  return GUIDES.map(g => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return {
    title: g.metaTitle,
    description: g.metaDesc,
    alternates: { canonical: `/guias/${g.slug}` },
    openGraph: {
      title: `${g.metaTitle} | InnVolt`,
      description: g.metaDesc,
      url: `${SITE.url}/guias/${g.slug}`,
      type: 'article',
      publishedTime: g.published,
      modifiedTime: g.updated,
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();

  const services = g.services.map(getService).filter((s): s is Service => Boolean(s));
  const others = GUIDES.filter(x => x.slug !== g.slug);

  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: g.title,
        description: g.metaDesc,
        datePublished: g.published,
        dateModified: g.updated,
        inLanguage: 'es-CL',
        url: `${SITE.url}/guias/${g.slug}`,
        mainEntityOfPage: `${SITE.url}/guias/${g.slug}`,
        image: `${SITE.url}/og-image.png`,
        author: { '@type': 'Organization', name: SITE.name, url: SITE.url },
        publisher: { '@id': `${SITE.url}/#negocio` },
        citation: g.sources.map(s => s.url),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE.url },
          { '@type': 'ListItem', position: 2, name: 'Guías', item: `${SITE.url}/guias` },
          { '@type': 'ListItem', position: 3, name: g.title, item: `${SITE.url}/guias/${g.slug}` },
        ],
      },
    ],
  };

  return (
    <Shell active="Guías" wa={g.cta.wa}>
      <JsonLd data={ld} />
      <section className="iv-page-hero">
        <div className="iv-container iv-article-head">
          <Link href="/guias" className="iv-crumb"><ArrowLeft size={13} /> Guías</Link>
          <span className="iv-proj-cat">{g.category}</span>
          <h1>{g.title}</h1>
          <p className="iv-lead">{g.intro}</p>
          <p className="iv-guide-meta">
            <Clock size={14} /> {g.readMin} min de lectura · Publicado el {fmtDate(g.published)}
            {g.updated !== g.published && <> · Actualizado el {fmtDate(g.updated)}</>}
          </p>
        </div>
      </section>

      <section className="iv-section">
        <div className="iv-container iv-article-grid">
          <article className="iv-prose iv-article">
            {g.blocks.map((b, i) => {
              switch (b.type) {
                case 'h2': return <h2 key={i} className="iv-article-h2">{b.text}</h2>;
                case 'p': return <p key={i}>{b.text}</p>;
                case 'ul': return <ul key={i}>{b.items.map(t => <li key={t}>{t}</li>)}</ul>;
                case 'ol': return <ol key={i}>{b.items.map(t => <li key={t}>{t}</li>)}</ol>;
                case 'note': return <p key={i} className="iv-note"><Info size={16} style={{ verticalAlign: '-3px', marginRight: 6 }} />{b.text}</p>;
              }
            })}

            <div className="iv-sources">
              <h2 className="iv-article-h2">Fuentes</h2>
              <ul>
                {g.sources.map(s => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer">{s.label}</a></li>)}
              </ul>
            </div>
          </article>

          <aside className="iv-article-aside">
            <div className="iv-card iv-aside-card">
              <p className="iv-kicker">¿Te ayudamos?</p>
              <h2>{g.cta.title}</h2>
              <p>Instaladores autorizados SEC. Te respondemos por WhatsApp.</p>
              <a href={waLink(g.cta.wa)} target="_blank" rel="noopener noreferrer" className="iv-btn" style={{ width: '100%', justifyContent: 'center' }}>Escríbenos por WhatsApp</a>
              <Link href="/contacto" className="iv-btn iv-btn-ghost" style={{ width: '100%', justifyContent: 'center', marginTop: '0.7rem' }}>Solicitar cotización</Link>
            </div>
            <div className="iv-card iv-aside-card">
              <p className="iv-kicker">Servicios relacionados</p>
              {services.map(s => (
                <Link key={s.slug} href={`/${s.slug}`} className="iv-aside-link">{s.name} <ArrowUpRight size={15} /></Link>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="iv-section iv-alt">
        <div className="iv-container">
          <h2 className="iv-h2" style={{ marginBottom: '2rem' }}><span className="iv-kicker">Preguntas frecuentes</span>{g.title}</h2>
          <FaqList faqs={g.faqs} />
        </div>
      </section>

      {others.length > 0 && (
        <section className="iv-section">
          <div className="iv-container">
            <h2 className="iv-h2" style={{ marginBottom: '2rem' }}><span className="iv-kicker">Sigue leyendo</span>Otras guías</h2>
            <div className="iv-guide-grid">
              {others.map(o => (
                <Link key={o.slug} href={`/guias/${o.slug}`} className="iv-card iv-guide-card">
                  <span className="iv-proj-cat">{o.category}</span>
                  <h3>{o.title}</h3>
                  <span className="iv-guide-meta"><Clock size={14} /> {o.readMin} min</span>
                  <span className="iv-link">Leer guía <ArrowUpRight size={14} /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand title={g.cta.title} text="Cuéntanos tu caso y te preparamos una propuesta con el alcance definido." wa={g.cta.wa} />
    </Shell>
  );
}
