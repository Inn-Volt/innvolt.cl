import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Sun, ArrowLeft } from 'lucide-react';
import { Shell, SERVICES, STEPS, waElec } from '../shared';

export const metadata: Metadata = {
  title: 'Servicios · Rediseño v3 (muestra) · InnVolt',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Shell active="Servicios">
      <section className="v3-page-hero">
        <div className="v3-container">
          <Link href="/v3" className="v3-crumb"><ArrowLeft size={13} /> Inicio</Link>
          <h1>Electricidad y energía</h1>
          <p className="v3-lead">Nuestra especialidad. Soluciones ejecutadas con orden y respaldo, para hogares, comercios y empresas en Santiago.</p>
        </div>
      </section>

      <section className="v3-section">
        <div className="v3-container">
          <div className="v3-serv-grid">
            {SERVICES.map(s => {
              const Icon = s.icon;
              return (
                <Link key={s.title} href="/v3/contacto" className="v3-card v3-serv">
                  <div className="v3-serv-media">
                    {s.img ? (
                      <Image src={s.img} alt={s.title} fill sizes="(max-width: 760px) 100vw, 44vw" style={{ objectFit: 'cover' }} />
                    ) : (
                      <div className="v3-ph"><Sun size={24} /><span>Foto solar — pendiente</span></div>
                    )}
                    <span className="v3-badge"><Icon size={18} /></span>
                  </div>
                  <div className="v3-serv-body">
                    <h3>{s.title}</h3>
                    <p>{s.desc}</p>
                    <span className="v3-link">Cotizar este servicio <ArrowUpRight size={14} /></span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="v3-section v3-alt">
        <div className="v3-container">
          <h2 className="v3-h2"><span className="v3-kicker">Cómo trabajamos</span>Un proceso simple y ordenado</h2>
          <div className="v3-steps" style={{ marginTop: '2.4rem' }}>
            {STEPS.map(s => (
              <div key={s.n} className="v3-card v3-step">
                <span className="v3-step-n">{s.n}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="v3-ctaband">
        <div className="v3-container">
          <h2 className="v3-h2">¿Listo para tu proyecto?</h2>
          <div className="v3-cta-row">
            <Link href="/v3/contacto" className="v3-btn v3-btn-dark">Solicitar cotización <ArrowRight size={16} /></Link>
            <a href={waElec} target="_blank" rel="noopener noreferrer" className="v3-btn v3-btn-ghost">WhatsApp directo</a>
          </div>
        </div>
      </section>
    </Shell>
  );
}
