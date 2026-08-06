import type { Metadata } from 'next';
import ServiceLanding from '../components/ServiceLanding';

export const metadata: Metadata = {
  title: 'Domótica y Automatización del Hogar en Santiago',
  description: 'Domótica y automatización en Santiago: iluminación inteligente, control de accesos y portones, automatización de ambientes y gestión energética remota. Precio justo y garantía.',
  alternates: { canonical: '/domotica-santiago' },
  openGraph: {
    title: 'Domótica y Automatización en Santiago | INNVOLT',
    description: 'Iluminación inteligente, control de accesos, automatización de ambientes y gestión energética en Santiago.',
    url: 'https://innvolt.cl/domotica-santiago',
    type: 'website',
  },
};

export default function Page() {
  return (
    <ServiceLanding
      slug="domotica-santiago"
      serviceName="Domótica y automatización en Santiago"
      label="Domótica y automatización"
      title={<>DOMÓTICA<br />EN SANTIAGO</>}
      intro="Transformamos tu hogar o empresa en un espacio inteligente: iluminación automatizada, control de accesos y portones, escenas de ambiente y gestión energética que puedes controlar desde tu celular. Instalación profesional con técnicos certificados SEC en Santiago y toda la Región Metropolitana."
      bullets={[
        'Iluminación inteligente',
        'Control de accesos y portones',
        'Automatización de ambientes y escenas',
        'Gestión energética remota',
        'Integración con asistentes de voz',
        'Control desde tu celular',
      ]}
      features={[
        { title: 'Ahorro energético', desc: 'Automatiza consumos y reduce tu cuenta de luz con gestión inteligente.' },
        { title: 'Más comodidad', desc: 'Controla luces, portones y ambientes desde una app o por voz.' },
        { title: 'Instalación certificada', desc: 'Técnicos autorizados SEC, trabajo seguro y bajo normativa.' },
        { title: 'Escalable', desc: 'Parte con lo esencial y amplía tu sistema cuando quieras.' },
      ]}
      waText="Hola InnVolt, quiero cotizar domótica y automatización en Santiago"
    />
  );
}
