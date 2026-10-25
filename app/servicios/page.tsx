import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { Shell, Photo, Art, CtaBand, JsonLd, STEPS } from '../_site/ui';
import { ENERGIA_PRINCIPAL, ENERGIA_MAS, ZONAS, TECNOLOGIA, ZONA_LARGA, SITE } from '../_site/content';

export const metadata: Metadata = {
  title: 'Servicios de electricidad y energía solar',
  description: 'Instalaciones eléctricas, tableros, mantención, certificación TE1, paneles solares, net billing, baterías y cargadores de auto eléctrico. Autorizados SEC.',
  alternates: { canonical: '/servicios' },
};

export default function Page() {
  const all = [...ENERGIA_PRINCIPAL, ...ENERGIA_MAS, ...ZONAS];
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE.url },
          { '@type': 'ListItem', position: 2, name: 'Servicios', item: `${SITE.url}/servicios` },
        ],
      },
      {
        '@type': 'ItemList',
        itemListElement: all.map((s, i) => ({ '@type': 'ListItem', position: i + 1, name: s.title, url: `${SITE.url}/${s.slug}` })),
      },
    ],
  };

  return (
    <Shell active="Servicios">
      <JsonLd data={ld} />
      <section className="iv-page-hero">
        <div className="iv-container">
          <Link href="/" className="iv-crumb"><ArrowLeft size={13} /> Inicio</Link>
          <h1>Electricidad y energía</h1>
          <p className="iv-lead">Nuestra especialidad: instalaciones, tableros, mantención, certificación SEC, energía solar y eficiencia. Atendemos la {ZONA_LARGA}</p>
        </div>
      </section>

      <section className="iv-section">
        <div className="iv-container">
          <div className="iv-serv-grid iv-serv-grid-3">
            {ENERGIA_PRINCIPAL.map(s => {
              const Icon = s.icon;
              return (
                <Link key={s.slug} href={`/${s.slug}`} className="iv-card iv-serv">
                  <div className="iv-serv-media">
                    {s.img ? <Photo src={s.img} alt={s.imgAlt} sizes="(max-width: 760px) 92vw, (max-width: 980px) 45vw, 370px" /> : <Art kind={s.art ?? 'solar'} />}
                    <span className="iv-badge"><Icon size={18} /></span>
                  </div>
                  <div className="iv-serv-body">
                    <h2 style={{ fontFamily: 'var(--fh)', fontWeight: 700, fontSize: '1.24rem', margin: '0 0 0.5rem' }}>{s.name}</h2>
                    <p>{s.metaDesc}</p>
                    <span className="iv-link">Ver servicio <ArrowUpRight size={14} /></span>
                  </div>
                </Link>
              );
            })}
          </div>

          <h2 className="iv-group-title">Más servicios de energía</h2>
          <div className="iv-mini-grid">
            {ENERGIA_MAS.map(s => {
              const Icon = s.icon;
              return (
                <Link key={s.slug} href={`/${s.slug}`} className="iv-card iv-mini">
                  <span className="iv-badge iv-badge-sm"><Icon size={17} /></span>{s.name}<ArrowUpRight size={16} />
                </Link>
              );
            })}
          </div>

          <h2 className="iv-group-title">Por zona</h2>
          <div className="iv-mini-grid">
            {ZONAS.map(s => {
              const Icon = s.icon;
              return (
                <Link key={s.slug} href={`/${s.slug}`} className="iv-card iv-mini">
                  <span className="iv-badge iv-badge-sm"><Icon size={17} /></span>{s.name}<ArrowUpRight size={16} />
                </Link>
              );
            })}
            <Link href="/tecnologia" className="iv-card iv-mini">Soluciones tecnológicas ({TECNOLOGIA.length})<ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      <section className="iv-section iv-alt">
        <div className="iv-container">
          <h2 className="iv-h2" style={{ marginBottom: '2.4rem' }}><span className="iv-kicker">Cómo trabajamos</span>Un proceso simple y ordenado</h2>
          <div className="iv-steps">
            {STEPS.map(s => (
              <div key={s.n} className="iv-card iv-step">
                <span className="iv-step-n">{s.n}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="¿No sabes qué servicio necesitas?" text="Descríbenos el problema o el proyecto y te orientamos sin compromiso." />
    </Shell>
  );
}
