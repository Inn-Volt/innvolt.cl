import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { Shell, Photo, CtaBand, JsonLd } from '../_site/ui';
import { TECNOLOGIA, SITE } from '../_site/content';

export const metadata: Metadata = {
  title: 'Tecnología: automatización, CCTV, redes y pantallas LED',
  description: 'Automatización y domótica, cámaras CCTV y control de acceso, redes y cableado estructurado, y pantallas LED para hogares, comunidades y empresas.',
  alternates: { canonical: '/tecnologia' },
};

const WA_TECH = 'Hola, quisiera explorar soluciones tecnológicas (automatización, CCTV, redes o pantallas).';

export default function Page() {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE.url },
      { '@type': 'ListItem', position: 2, name: 'Tecnología', item: `${SITE.url}/tecnologia` },
    ],
  };
  return (
    <Shell active="Tecnología" wa={WA_TECH}>
      <JsonLd data={ld} />
      <section className="iv-page-hero">
        <div className="iv-container">
          <Link href="/" className="iv-crumb"><ArrowLeft size={13} /> Inicio</Link>
          <h1>Tecnología, automatización y seguridad</h1>
          <p className="iv-lead">Nuestra línea complementaria, que nos diferencia de una empresa eléctrica tradicional. El alcance se define según la evaluación de cada proyecto.</p>
        </div>
      </section>

      <section className="iv-section">
        <div className="iv-container">
          <div className="iv-serv-grid">
            {TECNOLOGIA.map(s => {
              const Icon = s.icon;
              return (
                <Link key={s.slug} href={`/${s.slug}`} className="iv-card iv-serv">
                  <div className="iv-serv-media">
                    {s.img && <Photo src={s.img} alt={s.imgAlt} sizes="(max-width: 760px) 100vw, 45vw" />}
                    <span className="iv-badge"><Icon size={18} /></span>
                  </div>
                  <div className="iv-serv-body">
                    <h2 style={{ fontFamily: 'var(--fh)', fontWeight: 700, fontSize: '1.24rem', margin: '0 0 0.5rem' }}>{s.name}</h2>
                    <p>{s.metaDesc}</p>
                    <span className="iv-link">Ver solución <ArrowUpRight size={14} /></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand title="¿Quieres integrar tecnología a tu proyecto?" text="Automatización, seguridad, redes o pantallas: cuéntanos qué necesitas y lo evaluamos." wa={WA_TECH} />
    </Shell>
  );
}
