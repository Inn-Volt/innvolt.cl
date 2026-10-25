import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { Shell, Photo, Art, FaqList, CtaBand, SecSeal, JsonLd, waLink } from '../_site/ui';
import { SERVICES, SITE, SIMULADOR_PUBLICO, getService, type Service } from '../_site/content';

/* Solo existen las páginas definidas en content.ts; cualquier otra ruta es 404 */
export const dynamicParams = false;

/* Páginas que ofrecen el simulador solar como acción secundaria */
const SOLARES = new Set(['paneles-solares-santiago', 'paneles-solares-netbilling', 'baterias-almacenamiento-energia']);

export function generateStaticParams() {
  return SERVICES.map(s => ({ slug: s.slug }));
}

/* "Energía solar" → "energía solar", pero respeta siglas ("CCTV ...") */
const lcFirst = (t: string) => (/^[A-ZÁÉÍÓÚ]{2}/.test(t) ? t : t.charAt(0).toLowerCase() + t.slice(1));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.metaTitle,
    description: s.metaDesc,
    alternates: { canonical: `/${s.slug}` },
    openGraph: {
      title: `${s.metaTitle} | InnVolt`,
      description: s.metaDesc,
      url: `${SITE.url}/${s.slug}`,
      type: 'website',
      ...(s.img ? { images: [{ url: s.img, alt: s.imgAlt }] } : {}),
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  const Icon = s.icon;
  const isTech = s.line === 'tecnologia';
  const parent = isTech ? { name: 'Tecnología', href: '/tecnologia' } : { name: 'Servicios', href: '/servicios' };
  const related = s.related.map(getService).filter((r): r is Service => Boolean(r));

  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: s.title,
        description: s.metaDesc,
        url: `${SITE.url}/${s.slug}`,
        provider: { '@id': `${SITE.url}/#negocio` },
        areaServed: s.slug === 'electricista-villarrica'
          ? [{ '@type': 'AdministrativeArea', name: 'Región de La Araucanía' }]
          : [
              { '@type': 'AdministrativeArea', name: 'Región Metropolitana de Santiago' },
              { '@type': 'AdministrativeArea', name: 'Región de La Araucanía' },
            ],
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE.url },
          { '@type': 'ListItem', position: 2, name: parent.name, item: `${SITE.url}${parent.href}` },
          { '@type': 'ListItem', position: 3, name: s.title, item: `${SITE.url}/${s.slug}` },
        ],
      },
    ],
  };

  return (
    <Shell active={isTech ? 'Tecnología' : 'Servicios'} wa={s.wa}>
      <JsonLd data={ld} />

      {/* CABECERA */}
      <section className="iv-page-hero">
        <div className="iv-container iv-svc-grid">
          <div>
            <Link href={parent.href} className="iv-crumb"><ArrowLeft size={13} /> {parent.name}</Link>
            <h1>{s.title}</h1>
            <p className="iv-lead">{s.intro}</p>
            <div className="iv-cta-row">
              <Link href="/contacto" className="iv-btn">Cotizar este servicio <ArrowRight size={16} /></Link>
              {SIMULADOR_PUBLICO && SOLARES.has(s.slug)
                ? <Link href="/simulador-solar" className="iv-btn iv-btn-ghost">Simula tus paneles</Link>
                : <a href={waLink(s.wa)} target="_blank" rel="noopener noreferrer" className="iv-btn iv-btn-ghost">Consultar por WhatsApp</a>}
            </div>
            {!isTech && <div><SecSeal /></div>}
          </div>
          <div className="iv-svc-media">
            {s.img
              ? <Photo src={s.img} alt={s.imgAlt} sizes="(max-width: 980px) 92vw, 540px" priority />
              : <Art kind={s.art ?? 'solar'} />}
            <span className="iv-badge" style={{ bottom: 16 }}><Icon size={18} /></span>
          </div>
        </div>
      </section>

      {/* PROBLEMAS QUE RESUELVE + QUÉ INCLUYE */}
      <section className="iv-section">
        <div className="iv-container">
          <div className="iv-two">
            <div className="iv-card iv-box">
              <h2>¿Te pasa esto?</h2>
              <ul className="iv-list">
                {s.problems.map(p => <li key={p}><AlertCircle size={18} />{p}</li>)}
              </ul>
            </div>
            <div className="iv-card iv-box">
              <h2>Qué incluye</h2>
              <ul className="iv-list">
                {s.works.map(w => <li key={w}><CheckCircle2 size={18} />{w}</li>)}
              </ul>
            </div>
          </div>
          {s.note && <p className="iv-note">{s.note}</p>}
        </div>
      </section>

      {/* EN DETALLE */}
      {s.body && (
        <section className="iv-section" style={{ paddingTop: 0 }}>
          <div className="iv-container iv-prose">
            <h2 className="iv-h2"><span className="iv-kicker">En detalle</span>{s.body.title}</h2>
            {s.body.paras.map(p => <p key={p.slice(0, 40)}>{p}</p>)}
          </div>
        </section>
      )}

      {/* PROCESO */}
      <section className="iv-section iv-alt">
        <div className="iv-container">
          <h2 className="iv-h2" style={{ marginBottom: '2.2rem' }}><span className="iv-kicker">Cómo lo hacemos</span>Evaluación, propuesta y ejecución</h2>
          <div className="iv-steps">
            {s.process.map((p, i) => (
              <div key={p.t} className="iv-card iv-step">
                <span className="iv-step-n">{String(i + 1).padStart(2, '0')}</span>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PREGUNTAS FRECUENTES */}
      <section className="iv-section">
        <div className="iv-container">
          <h2 className="iv-h2" style={{ marginBottom: '2rem' }}><span className="iv-kicker">Preguntas frecuentes</span>{s.title}</h2>
          <FaqList faqs={s.faqs} />
        </div>
      </section>

      {/* RELACIONADOS */}
      <section className="iv-section iv-alt">
        <div className="iv-container">
          <h2 className="iv-h2" style={{ marginBottom: '2rem' }}><span className="iv-kicker">También te puede servir</span>Servicios relacionados</h2>
          <div className="iv-serv-grid iv-serv-grid-3">
            {related.map(r => {
              const RIcon = r.icon;
              return (
                <Link key={r.slug} href={`/${r.slug}`} className="iv-card iv-serv">
                  <div className="iv-serv-media">
                    {r.img ? <Photo src={r.img} alt={r.imgAlt} sizes="(max-width: 760px) 92vw, (max-width: 980px) 45vw, 370px" /> : <Art kind={r.art ?? 'solar'} />}
                    <span className="iv-badge"><RIcon size={18} /></span>
                  </div>
                  <div className="iv-serv-body">
                    <h3>{r.name}</h3>
                    <span className="iv-link">Ver servicio <ArrowUpRight size={14} /></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand title={s.cta ?? `¿Necesitas ${lcFirst(s.name)}?`} text="Cuéntanos tu caso y te preparamos una propuesta con el alcance definido." wa={s.wa} />
    </Shell>
  );
}
