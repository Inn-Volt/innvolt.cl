import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Shell, waElec, waSolar } from '../shared';
import ContactForm from '../../components/ContactForm';

export const metadata: Metadata = {
  title: 'Contacto · Rediseño v3 (muestra) · InnVolt',
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Shell active="Contacto">
      <section className="v3-page-hero">
        <div className="v3-container">
          <Link href="/v3" className="v3-crumb"><ArrowLeft size={13} /> Inicio</Link>
          <h1>Hablemos de tu proyecto</h1>
          <p className="v3-lead">Cuéntanos qué necesitas y te preparamos una propuesta. Respondemos por WhatsApp.</p>
        </div>
      </section>

      <section className="v3-section">
        <div className="v3-container v3-contact-grid">
          <div>
            <h2 className="v3-h2"><span className="v3-kicker">Contacto directo</span>Escríbenos</h2>
            <div className="v3-cta-row v3-mt">
              <a href={waElec} target="_blank" rel="noopener noreferrer" className="v3-btn">Proyecto eléctrico</a>
              <a href={waSolar} target="_blank" rel="noopener noreferrer" className="v3-btn v3-btn-ghost">Energía solar</a>
            </div>
            <div className="v3-info">
              <div><strong>WhatsApp / Teléfono</strong>+56 9 6657 5447</div>
              <div><strong>Email</strong>innvolt.cl@gmail.com</div>
              <div><strong>Instagram</strong>@inn.volt</div>
              <div><strong>Zona</strong>Puente Alto y toda la Región Metropolitana</div>
            </div>
          </div>
          <div className="v3-card v3-form">
            <ContactForm />
          </div>
        </div>
      </section>
    </Shell>
  );
}
