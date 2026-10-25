import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Shell, SecSeal, waElec, waSolar } from '../_site/ui';
import { ZONA_LARGA, SITE } from '../_site/content';
import ContactForm from '../components/ContactForm';

export const metadata: Metadata = {
  title: 'Contacto y cotización',
  description: 'Solicita tu cotización de instalaciones eléctricas, tableros, certificación TE1, paneles solares o soluciones tecnológicas. Escríbenos por WhatsApp o con el formulario.',
  alternates: { canonical: '/contacto' },
};

export default function Page() {
  return (
    <Shell active="Contacto">
      <section className="iv-page-hero">
        <div className="iv-container">
          <Link href="/" className="iv-crumb"><ArrowLeft size={13} /> Inicio</Link>
          <h1>Hablemos de tu proyecto</h1>
          <p className="iv-lead">Cuéntanos qué necesitas y te preparamos una propuesta. Si tienes fotos de la instalación, envíalas por WhatsApp: nos ayudan a evaluar más rápido.</p>
        </div>
      </section>

      <section className="iv-section">
        <div className="iv-container iv-contact-grid">
          <div>
            <h2 className="iv-h2"><span className="iv-kicker">Contacto directo</span>Escríbenos</h2>
            <div className="iv-cta-row iv-mt">
              <a href={waElec} target="_blank" rel="noopener noreferrer" className="iv-btn">Proyecto eléctrico</a>
              <a href={waSolar} target="_blank" rel="noopener noreferrer" className="iv-btn iv-btn-ghost">Energía solar</a>
            </div>
            <div className="iv-info">
              <div><strong>WhatsApp / Teléfono</strong><a href={`tel:${SITE.phone}`}>{SITE.phoneLabel}</a></div>
              <div><strong>Email</strong><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
              <div><strong>Instagram</strong><a href={SITE.instagram} target="_blank" rel="noopener noreferrer">{SITE.instagramLabel}</a></div>
              <div><strong>Cobertura</strong>{ZONA_LARGA}</div>
            </div>
            <SecSeal />
          </div>
          <div className="iv-card iv-form-wrap">
            <ContactForm />
          </div>
        </div>
      </section>
    </Shell>
  );
}
