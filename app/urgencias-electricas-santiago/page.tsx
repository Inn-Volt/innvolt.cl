import type { Metadata } from 'next';
import ServiceLanding from '../components/ServiceLanding';

export const metadata: Metadata = {
  title: 'Electricista de Urgencia 24h en Santiago',
  description: 'Electricista de urgencia en Santiago. Atendemos cortes de luz, fallas, cortocircuitos y emergencias eléctricas el mismo día. Técnicos certificados SEC. Llama ahora.',
  alternates: { canonical: '/urgencias-electricas-santiago' },
  openGraph: {
    title: 'Electricista de Urgencia 24h en Santiago | INNVOLT',
    description: 'Cortes, fallas y emergencias eléctricas atendidas el mismo día en Santiago. Certificados SEC.',
    url: 'https://innvolt.cl/urgencias-electricas-santiago',
    type: 'website',
  },
};

export default function Page() {
  return (
    <ServiceLanding
      slug="urgencias-electricas-santiago"
      serviceName="Electricista de urgencia 24h en Santiago"
      label="Urgencias eléctricas · 24h"
      title={<>ELECTRICISTA<br />DE URGENCIA</>}
      intro="¿Se cortó la luz, hay olor a quemado o el tablero está caliente? No lo dejes pasar: son señales de riesgo. Somos electricistas certificados SEC y atendemos urgencias eléctricas en Santiago el mismo día. Llámanos o escríbenos por WhatsApp y resolvemos rápido y seguro."
      bullets={[
        'Cortes de luz totales o parciales',
        'Cortocircuitos y tableros que saltan',
        'Olor a quemado o enchufes recalentados',
        'Fallas tras lluvia o sobretensión',
        'Empalmes y automáticos dañados',
        'Diagnóstico y reparación el mismo día',
      ]}
      features={[
        { title: 'Atención hoy', desc: 'Respondemos rápido por teléfono y WhatsApp, y priorizamos las emergencias.' },
        { title: 'Seguro y certificado', desc: 'Técnicos autorizados SEC: dejamos la falla resuelta y la instalación segura.' },
        { title: 'Precio claro', desc: 'Te decimos qué pasa y cuánto cuesta antes de intervenir. Sin sorpresas.' },
        { title: 'Con garantía', desc: 'Respaldo por escrito sobre la reparación, con boleta o factura.' },
      ]}
      waText="Hola InnVolt, tengo una URGENCIA eléctrica en Santiago"
    />
  );
}
