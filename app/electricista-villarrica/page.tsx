import type { Metadata } from 'next';
import ServiceLanding from '../components/ServiceLanding';

export const metadata: Metadata = {
  title: 'Electricista Certificado SEC en Villarrica y Pucón',
  description: 'Electricista certificado SEC en Villarrica, Pucón y la Región de la Araucanía. Instalaciones eléctricas, tableros, certificación TE1, cámaras y urgencias para casas, cabañas y negocios.',
  alternates: { canonical: '/electricista-villarrica' },
  openGraph: {
    title: 'Electricista Certificado SEC en Villarrica y Pucón | INNVOLT',
    description: 'Instalaciones, tableros, certificación TE1, cámaras y urgencias eléctricas en Villarrica, Pucón y la Araucanía.',
    url: 'https://innvolt.cl/electricista-villarrica',
    type: 'website',
  },
};

export default function Page() {
  return (
    <ServiceLanding
      slug="electricista-villarrica"
      serviceName="Electricista certificado SEC en Villarrica"
      areaCity="Villarrica"
      areaLabel="Villarrica, Pucón y la Región de la Araucanía"
      label="Electricidad certificada SEC · Araucanía"
      title={<>ELECTRICISTA<br />EN VILLARRICA</>}
      intro="Electricistas certificados SEC en Villarrica, Pucón y alrededores. Realizamos instalaciones eléctricas, tableros, certificación TE1, cámaras de seguridad y atención de urgencias para casas, cabañas, negocios y proyectos en la Región de la Araucanía."
      bullets={[
        'Instalaciones eléctricas domiciliarias y comerciales',
        'Certificación SEC y trámite TE1',
        'Tableros, empalmes y protecciones',
        'Cámaras de seguridad y control de acceso',
        'Instalaciones para cabañas y arriendos turísticos',
        'Urgencias y reparación de fallas',
      ]}
      bodyTitle="Cobertura en la Araucanía"
      body={[
        'Atendemos Villarrica, Pucón, Lican Ray y las comunas cercanas de la Región de la Araucanía como Loncoche, Freire, Gorbea, Cunco y Curarrehue. Somos instaladores eléctricos autorizados por la SEC, así que dejamos tu instalación segura, certificada y en regla.',
        'La zona del lago tiene una necesidad muy concreta: casas de veraneo, cabañas y arriendos turísticos que requieren instalaciones seguras y, en muchos casos, el certificado TE1 para funcionar o para vender/arrendar. También trabajamos con hoteles, restaurantes y locales que necesitan tableros bien dimensionados, cámaras y respaldo ante fallas.',
        'Coordinamos visitas en la zona y respondemos el mismo día hábil. Si tienes una emergencia eléctrica en Villarrica o Pucón, escríbenos y priorizamos la atención.',
      ]}
      features={[
        { title: 'Presencia en la zona', desc: 'Atendemos Villarrica, Pucón y comunas cercanas de la Araucanía, no solo a distancia.' },
        { title: 'Certificados SEC', desc: 'Instaladores autorizados que emiten el certificado TE1 y dejan todo en regla.' },
        { title: 'Ideal para cabañas', desc: 'Instalaciones seguras y certificadas para casas de veraneo y arriendos turísticos.' },
        { title: 'Precio justo y garantía', desc: 'Presupuesto claro, con boleta o factura y garantía por escrito.' },
      ]}
      faqs={[
        { q: '¿En qué comunas de la Araucanía trabajan?', a: 'Villarrica, Pucón, Lican Ray y comunas cercanas como Loncoche, Freire, Gorbea, Cunco y Curarrehue. Si tu localidad está cerca, escríbenos y coordinamos.' },
        { q: '¿Certifican instalaciones de cabañas y arriendos?', a: 'Sí. Realizamos y regularizamos la instalación eléctrica y emitimos el certificado TE1, muy solicitado para arriendos turísticos y para vender o arrendar propiedades en la zona.' },
        { q: '¿Atienden urgencias en Villarrica y Pucón?', a: 'Sí. Priorizamos las urgencias eléctricas (cortes, fallas, tableros que saltan) y respondemos el mismo día. Escríbenos por WhatsApp para coordinar.' },
        { q: '¿Trabajan con hoteles, restaurantes y negocios?', a: 'Sí. Hacemos instalaciones y mantención para comercio y hospitalidad: tableros, iluminación, cámaras y control de acceso, coordinando los trabajos para no detener tu operación.' },
      ]}
      waText="Hola InnVolt, necesito un electricista certificado en Villarrica / Pucón"
    />
  );
}
