import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check, Phone } from 'lucide-react';
import Logo from './Logo';
import SiteFooter from './SiteFooter';

export interface ServiceLandingProps {
  slug: string;
  serviceName: string;
  label: string;
  title: React.ReactNode;
  intro: string;
  bullets: string[];
  features: { title: string; desc: string }[];
  waText: string;
}

const WA = 'https://wa.me/56989203902';

const ALL_SERVICES = [
  { slug: 'electricista-santiago', name: 'Electricista SEC' },
  { slug: 'camaras-cctv-santiago', name: 'Cámaras CCTV' },
  { slug: 'domotica-santiago', name: 'Domótica' },
  { slug: 'urgencias-electricas-santiago', name: 'Urgencias 24h' },
];

export default function ServiceLanding({ slug, serviceName, label, title, intro, bullets, features, waText }: ServiceLandingProps) {
  const others = ALL_SERVICES.filter(s => s.slug !== slug);
  const url = `https://innvolt.cl/${slug}`;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: serviceName,
        description: intro,
        serviceType: serviceName,
        areaServed: { '@type': 'City', name: 'Santiago' },
        provider: { '@type': 'LocalBusiness', name: 'INNVOLT SpA', url: 'https://innvolt.cl', telephone: '+56989203902' },
        url,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://innvolt.cl' },
          { '@type': 'ListItem', position: 2, name: serviceName, item: url },
        ],
      },
    ],
  };

  return (
    <div style={{ minHeight: '100vh', background: '#000' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* WhatsApp FAB */}
      <a href={`${WA}?text=${encodeURIComponent(waText)}`} target="_blank" rel="noopener noreferrer" className="wsp-fab" aria-label="Escríbenos por WhatsApp">
        <img src="/whatsapp.svg" alt="" width={20} height={20} />
        <span className="wsp-label">WHATSAPP</span>
      </a>

      {/* NAV */}
      <nav className="nav">
        <div className="container">
          <div className="nav-inner">
            <Link href="/" aria-label="InnVolt inicio"><Logo height={34} /></Link>
            <div className="nav-links">
              <Link href="/#servicios" className="nav-link">Servicios</Link>
              <Link href="/#contacto" className="btn btn-primary" style={{ padding: '0.55rem 1.4rem', fontSize: '0.7rem' }}>
                PRESUPUESTO
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="section" style={{ paddingTop: '9rem', background: 'var(--bg)' }}>
        <div className="container">
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--muted)', fontFamily: 'var(--font-display)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', marginBottom: '1.5rem' }}>
            <ArrowLeft size={13} /> Volver al inicio
          </Link>
          <p className="label" style={{ marginBottom: '0.75rem' }}>— {label}</p>
          <h1 className="display" style={{ fontSize: 'clamp(2.6rem, 7vw, 5.5rem)', color: '#fff', marginBottom: '1.5rem' }}>{title}</h1>
          <p className="body-sm" style={{ maxWidth: 620, fontSize: '1rem', marginBottom: '2.25rem' }}>{intro}</p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/#contacto" className="btn btn-primary">SOLICITAR COTIZACIÓN <ArrowRight size={15} /></Link>
            <a href={`${WA}?text=${encodeURIComponent(waText)}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <img src="/whatsapp.svg" alt="" width={15} height={15} style={{ filter: 'brightness(0) invert(1)' }} /> WHATSAPP DIRECTO
            </a>
          </div>
        </div>
      </section>

      {/* BULLETS */}
      <section className="section" style={{ background: '#000', paddingTop: 0 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem' }}>
            {bullets.map(b => (
              <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem', padding: '1rem 1.25rem', background: 'var(--bg2)', border: '1px solid var(--border)' }}>
                <Check size={16} color="var(--y)" style={{ flexShrink: 0, marginTop: 2 }} />
                <span className="body-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FRANJA DE URGENCIAS */}
      <div className="urgent-band">
        <div className="container">
          <div className="urgent-inner">
            <div className="urgent-left">
              <span className="urgent-dot" aria-hidden="true" />
              <div>
                <p className="urgent-title">¿Necesitas atención hoy?</p>
                <p className="urgent-sub">Respondemos el mismo día, también urgencias eléctricas.</p>
              </div>
            </div>
            <div className="urgent-ctas">
              <a href="tel:+56989203902" className="btn btn-ghost" style={{ padding: '0.75rem 1.4rem', fontSize: '0.72rem' }}>
                <Phone size={14} /> LLAMAR AHORA
              </a>
              <a href={`${WA}?text=${encodeURIComponent(waText)}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '0.75rem 1.4rem', fontSize: '0.72rem' }}>
                <img src="/whatsapp.svg" alt="" width={14} height={14} /> WHATSAPP
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <p className="label" style={{ marginBottom: '0.75rem' }}>— Por qué InnVolt</p>
          <h2 className="display" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', color: '#fff', marginBottom: '3rem' }}>VENTAJAS DE TRABAJAR CON NOSOTROS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '2px', background: 'rgba(255,198,0,0.05)' }}>
            {features.map((f, i) => (
              <div key={f.title} style={{ background: '#000', padding: '2rem 1.75rem' }}>
                <p className="display" style={{ fontSize: '2.4rem', color: 'var(--y)', lineHeight: 1, marginBottom: '0.9rem' }}>{String(i + 1).padStart(2, '0')}</p>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.1rem', textTransform: 'uppercase', color: '#fff', marginBottom: '0.5rem' }}>{f.title}</h3>
                <p className="body-sm" style={{ fontSize: '0.83rem' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: '#000' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="display" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', color: '#fff', marginBottom: '1rem' }}>
            ¿LISTO PARA <span style={{ color: 'var(--y)' }}>TU PROYECTO?</span>
          </h2>
          <p className="body-sm" style={{ maxWidth: 460, margin: '0 auto 2rem' }}>
            Cotización el mismo día hábil. Técnicos certificados SEC en Santiago y toda la Región Metropolitana.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/#contacto" className="btn btn-primary">SOLICITAR COTIZACIÓN <ArrowRight size={15} /></Link>
            <a href={`${WA}?text=${encodeURIComponent(waText)}`} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">POR WHATSAPP</a>
          </div>
        </div>
      </section>

      {/* OTROS SERVICIOS */}
      <section className="section" style={{ background: 'var(--bg2)', paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container">
          <p className="label" style={{ marginBottom: '1.25rem' }}>— Otros servicios</p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {others.map(o => (
              <Link key={o.slug} href={`/${o.slug}`} className="btn btn-ghost">
                {o.name} <ArrowRight size={14} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <SiteFooter />
    </div>
  );
}
