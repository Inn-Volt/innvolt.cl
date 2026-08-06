import type { Metadata } from 'next';
import ServiceLanding from '../components/ServiceLanding';

export const metadata: Metadata = {
  title: 'Electricista Certificado SEC en Santiago',
  description: 'Electricista certificado SEC en Santiago: instalaciones eléctricas domiciliarias e industriales, tableros, empalmes y certificación TE1. Respuesta el mismo día.',
  alternates: { canonical: '/electricista-santiago' },
  openGraph: {
    title: 'Electricista Certificado SEC en Santiago | INNVOLT',
    description: 'Instalaciones eléctricas, tableros, empalmes y certificación TE1 en Santiago. Precio justo y garantía.',
    url: 'https://innvolt.cl/electricista-santiago',
    type: 'website',
  },
};

export default function Page() {
  return (
    <ServiceLanding
      slug="electricista-santiago"
      serviceName="Electricista certificado SEC en Santiago"
      label="Electricidad certificada SEC"
      title={<>ELECTRICISTA<br />EN SANTIAGO</>}
      intro="Somos instaladores eléctricos autorizados por la SEC. Realizamos instalaciones domiciliarias e industriales, tableros, empalmes y protecciones, y emitimos el certificado TE1 para dejar tu instalación 100% en regla. Cotización el mismo día hábil en Santiago y toda la Región Metropolitana."
      bullets={[
        'Instalaciones eléctricas domiciliarias e industriales',
        'Certificación SEC y trámite TE1',
        'Tableros, empalmes y protecciones',
        'Proyectos de ingeniería y planos eléctricos',
        'Reparación de fallas y cortes',
        'Ampliaciones y aumentos de potencia',
      ]}
      features={[
        { title: 'Autorizados SEC', desc: 'Instaladores certificados que emiten TE1 y gestionan todos los trámites normativos.' },
        { title: 'Respuesta 24 hrs', desc: 'Cotización el mismo día hábil y atención de urgencias eléctricas.' },
        { title: 'Garantía incluida', desc: 'Respaldo sobre materiales y mano de obra en cada instalación.' },
        { title: 'Boleta y factura', desc: 'Trabajo formal, con documentación tributaria por cada proyecto.' },
      ]}
      waText="Hola InnVolt, necesito un electricista certificado en Santiago"
    />
  );
}
