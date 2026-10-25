import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { Shell, TECH, waTech } from '../shared';

export const metadata: Metadata = {
  title: 'Tecnología · Rediseño v3 (muestra) · InnVolt',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Shell active="Tecnología">
      <section className="v3-page-hero">
        <div className="v3-container">
          <Link href="/v3" className="v3-crumb"><ArrowLeft size={13} /> Inicio</Link>
          <h1>Tecnología, automatización y seguridad</h1>
          <p className="v3-lead">Nuestra línea complementaria, que nos diferencia de una empresa eléctrica tradicional. Disponible según el alcance de cada proyecto.</p>
        </div>
      </section>

      <section className="v3-section">
        <div className="v3-container">
          <ul className="v3-tech-list" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
            {TECH.map(t => {
              const Icon = t.icon;
              return (
                <li key={t.t} className="v3-card v3-tech-item">
                  <span className="v3-badge v3-badge-sm"><Icon size={18} /></span>
                  <div>
                    <h3>{t.t}</h3>
                    <p>{t.d}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="v3-ctaband">
        <div className="v3-container">
          <h2 className="v3-h2">¿Quieres integrar tecnología a tu proyecto?</h2>
          <div className="v3-cta-row">
            <a href={waTech} target="_blank" rel="noopener noreferrer" className="v3-btn v3-btn-dark">Explorar soluciones tecnológicas <ArrowUpRight size={15} /></a>
            <Link href="/v3/contacto" className="v3-btn v3-btn-ghost">Ir a contacto</Link>
          </div>
        </div>
      </section>
    </Shell>
  );
}
