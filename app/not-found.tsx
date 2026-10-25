import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Shell, waElec } from './_site/ui';
import { ENERGIA_PRINCIPAL } from './_site/content';

export default function NotFound() {
  return (
    <Shell>
      <section className="iv-404">
        <div>
          <p className="iv-404-n">404</p>
          <h1 className="iv-h2" style={{ margin: '0.6rem 0 1rem' }}>Página no encontrada</h1>
          <p className="iv-lead" style={{ margin: '0 auto 2rem' }}>La página que buscas no existe o cambió de dirección. Quizás te sirva alguno de estos servicios:</p>
          <div className="iv-chips" style={{ justifyContent: 'center', marginBottom: '2rem' }}>
            {ENERGIA_PRINCIPAL.map(s => <Link key={s.slug} href={`/${s.slug}`} className="iv-chip">{s.name}</Link>)}
          </div>
          <div className="iv-cta-row" style={{ justifyContent: 'center' }}>
            <Link href="/" className="iv-btn"><ArrowLeft size={15} /> Volver al inicio</Link>
            <a href={waElec} target="_blank" rel="noopener noreferrer" className="iv-btn iv-btn-ghost">WhatsApp</a>
          </div>
        </div>
      </section>
    </Shell>
  );
}
