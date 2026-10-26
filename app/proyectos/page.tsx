import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Shell, Photo, CtaBand, ReviewsCta } from '../_site/ui';
import { PROJECTS } from '../_site/content';

export const metadata: Metadata = {
  title: 'Proyectos y trabajos realizados',
  description: 'Trabajos de InnVolt en instalaciones eléctricas, energía solar y baterías, tableros, mantención, empalmes, certificación TE1 y soluciones tecnológicas.',
  alternates: { canonical: '/proyectos' },
};

export default function Page() {
  return (
    <Shell active="Proyectos">
      <section className="iv-page-hero">
        <div className="iv-container">
          <Link href="/" className="iv-crumb"><ArrowLeft size={13} /> Inicio</Link>
          <h1>Proyectos y trabajos</h1>
          <p className="iv-lead">Una selección de trabajos en electricidad, energía solar y tecnología. Iremos sumando más proyectos con su descripción y alcance.</p>
        </div>
      </section>

      <section className="iv-section">
        <div className="iv-container">
          <div className="iv-proj-grid">
            {PROJECTS.map(p => (
              <Link key={p.img} href={p.href} className="iv-card iv-proj">
                <div className="iv-proj-img"><Photo src={p.img} alt={p.t} sizes="(max-width: 760px) 92vw, (max-width: 980px) 45vw, 370px" /></div>
                <div className="iv-proj-cap"><span className="iv-proj-cat">{p.cat}</span><span className="iv-proj-t">{p.t}</span></div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: '2.5rem' }}>
            <ReviewsCta title="¿Fuiste parte de alguno de estos proyectos?" />
          </div>
        </div>
      </section>

      <CtaBand title="¿Tienes un proyecto parecido?" text="Envíanos fotos por WhatsApp y te decimos cómo lo resolveríamos." />
    </Shell>
  );
}
