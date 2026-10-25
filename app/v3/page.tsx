import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Zap, Phone, Wrench, FolderKanban, Cpu } from 'lucide-react';
import { Shell, waElec } from './shared';

export const metadata: Metadata = {
  title: 'Rediseño v3 (muestra) · InnVolt',
  description: 'Muestra local del rediseño de innvolt.cl basado en el logo. No indexar.',
  robots: { index: false, follow: false },
};

const QUICK = [
  { icon: Wrench, t: 'Servicios', d: 'Instalaciones, tableros, energía solar, eficiencia y proyectos eléctricos.', href: '/v3/servicios' },
  { icon: FolderKanban, t: 'Proyectos', d: 'Algunos de nuestros trabajos eléctricos y de tableros.', href: '/v3/proyectos' },
  { icon: Cpu, t: 'Tecnología', d: 'Automatización, CCTV, redes y pantallas: nuestra línea complementaria.', href: '/v3/tecnologia' },
];

export default function Page() {
  return (
    <Shell active="Inicio">
      {/* HERO grande */}
      <section className="v3-hero v3-hero-home">
        <span className="v3-hero-bolt" aria-hidden="true">
          <svg width="360" height="460" viewBox="0 0 50 64" fill="none"><path d="M28 2 L4 36 H17 L14 62 L46 25 H29 L36 2 Z" fill="#1a1813" /></svg>
        </span>
        <div className="v3-container v3-hero-grid">
          <div className="v3-hero-copy">
            <span className="v3-pill"><Zap size={13} /> Ingeniería eléctrica · Energía · Santiago</span>
            <h1 className="v3-h1">Electricidad y energía,<br />pensadas para <span className="v3-mark">durar</span>.</h1>
            <p className="v3-lead">
              Soluciones eléctricas y energéticas para hogares, comercios y empresas. Desde instalaciones y tableros
              hasta proyectos de energía solar y eficiencia energética.
            </p>
            <div className="v3-cta-row">
              <Link href="/v3/contacto" className="v3-btn">Solicitar cotización <ArrowRight size={16} /></Link>
              <Link href="/v3/servicios" className="v3-btn v3-btn-ghost">Conocer servicios</Link>
            </div>
            <a href={waElec} target="_blank" rel="noopener noreferrer" className="v3-wa"><Phone size={14} /> +56 9 6657 5447 · WhatsApp directo</a>
          </div>
          <div className="v3-hero-media">
            <div className="v3-frame">
              <Image src="/electricista-1.jpg" alt="Trabajo eléctrico de InnVolt" fill sizes="(max-width: 980px) 90vw, 44vw" style={{ objectFit: 'cover' }} priority />
            </div>
            <span className="v3-sticker"><Zap size={16} /> Evaluación + presupuesto claro</span>
          </div>
        </div>
      </section>

      {/* ACCESOS a páginas internas */}
      <section className="v3-section">
        <div className="v3-container">
          <div className="v3-head">
            <h2 className="v3-h2"><span className="v3-kicker">Explora</span>¿Qué necesitas resolver?</h2>
            <p className="v3-head-note">Entra directo a lo que buscas. Cada área tiene su propia página.</p>
          </div>
          <div className="v3-quick-grid">
            {QUICK.map(q => {
              const Icon = q.icon;
              return (
                <Link key={q.t} href={q.href} className="v3-card v3-quick">
                  <span className="v3-badge v3-badge-sm"><Icon size={18} /></span>
                  <h3>{q.t} <ArrowUpRight size={18} /></h3>
                  <p>{q.d}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* NOSOTROS (breve) */}
      <section className="v3-section v3-alt">
        <div className="v3-container v3-nos">
          <div>
            <span className="v3-kicker">Quiénes somos</span>
            <h2 className="v3-h2">Electricidad y energía, con respaldo</h2>
          </div>
          <p className="v3-lead">
            En InnVolt resolvemos la electricidad y la energía de tu hogar, comercio o empresa con trabajos
            certificados SEC, seguros y bajo normativa. Somos especialistas en instalaciones eléctricas y en
            energía solar fotovoltaica: evaluamos tu caso, te entregamos un presupuesto claro y ejecutamos con respaldo.
          </p>
        </div>
      </section>

      {/* CTA band */}
      <section className="v3-ctaband">
        <div className="v3-container">
          <h2 className="v3-h2">¿Necesitas una solución eléctrica o energética?</h2>
          <p className="v3-lead v3-lead-dark" style={{ margin: '0.8rem auto 0', color: '#46402f' }}>Cuéntanos tu proyecto y te preparamos una propuesta.</p>
          <div className="v3-cta-row">
            <Link href="/v3/contacto" className="v3-btn v3-btn-dark">Solicitar cotización <ArrowRight size={16} /></Link>
            <a href={waElec} target="_blank" rel="noopener noreferrer" className="v3-btn v3-btn-ghost">WhatsApp directo</a>
          </div>
        </div>
      </section>
    </Shell>
  );
}
