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
      bodyTitle="En qué consiste"
      body={[
        'Como electricistas autorizados por la SEC, ejecutamos instalaciones eléctricas nuevas y regularizamos las existentes en hogares, comercios e industria de Santiago. Eso incluye el dimensionamiento de circuitos y protecciones, la instalación de tableros, empalmes y puntos, y la emisión del certificado TE1 cuando corresponde.',
        'Una instalación bien hecha no se nota, pero una mal ejecutada se paga caro: automáticos que saltan, equipos que se dañan, riesgo de incendio y problemas para arrendar o vender. Por eso trabajamos con materiales de calidad, bajo la normativa vigente y con respaldo por escrito.',
        'Atendemos desde una ampliación o un aumento de capacidad en tu casa hasta proyectos eléctricos completos para empresas, coordinando los cortes de energía para no detener tu operación.',
      ]}
      faqs={[
        { q: '¿Son electricistas certificados por la SEC?', a: 'Sí. Somos instaladores eléctricos autorizados con licencia SEC vigente y emitimos el certificado TE1 que declara tu instalación en regla.' },
        { q: '¿Hacen instalaciones para empresas e industria?', a: 'Sí. Ejecutamos proyectos eléctricos domiciliarios, comerciales e industriales, coordinando los trabajos para minimizar el impacto en tu operación.' },
        { q: '¿Pueden aumentar la capacidad de mi instalación?', a: 'Sí. Realizamos aumentos de capacidad y nuevos circuitos cuando incorporas más equipos, cocina eléctrica o un cargador de auto, dimensionando correctamente las protecciones.' },
        { q: '¿Entregan garantía y boleta o factura?', a: 'Sí, todos nuestros trabajos incluyen garantía sobre materiales y mano de obra, y emitimos boleta o factura.' },
      ]}
      waText="Hola InnVolt, necesito un electricista certificado en Santiago"
    />
  );
}
