import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { Shell, PROJECTS, waElec } from '../shared';

export const metadata: Metadata = {
  title: 'Proyectos · Rediseño v3 (muestra) · InnVolt',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Shell active="Proyectos">
      <section className="v3-page-hero">
        <div className="v3-container">
          <Link href="/v3" className="v3-crumb"><ArrowLeft size={13} /> Inicio</Link>
          <h1>Proyectos y trabajos</h1>
          <p className="v3-lead">Una muestra de nuestro trabajo. Las imágenes son referenciales y se irán reemplazando por proyectos reales ejecutados por InnVolt.</p>
        </div>
      </section>

      <section className="v3-section">
        <div className="v3-container">
          <div className="v3-proj-grid">
            {PROJECTS.map(p => (
              <figure key={p.t} className="v3-card v3-proj">
                <div className="v3-proj-img"><Image src={p.img} alt={p.t} fill sizes="(max-width: 760px) 100vw, 32vw" style={{ objectFit: 'cover' }} /></div>
                <figcaption><span className="v3-proj-cat">{p.cat}</span><span className="v3-proj-t">{p.t}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="v3-ctaband">
        <div className="v3-container">
          <h2 className="v3-h2">¿Tienes un proyecto en mente?</h2>
          <div className="v3-cta-row">
            <Link href="/v3/contacto" className="v3-btn v3-btn-dark">Solicitar cotización <ArrowRight size={16} /></Link>
            <a href={waElec} target="_blank" rel="noopener noreferrer" className="v3-btn v3-btn-ghost">WhatsApp directo</a>
          </div>
        </div>
      </section>
    </Shell>
  );
}
