import type { Metadata } from 'next';
import ServiceLanding from '../components/ServiceLanding';

export const metadata: Metadata = {
  title: 'Instalaciones Eléctricas en Santiago | InnVolt',
  description: 'Instalación eléctrica para casas, locales comerciales y oficinas en Santiago. Técnicos certificados SEC: circuitos, enchufes, iluminación, tablero y certificado TE1. Cotiza por WhatsApp.',
  alternates: { canonical: '/instalaciones-electricas' },
  openGraph: {
    title: 'Instalaciones Eléctricas en Santiago | InnVolt',
    description: 'Instalación eléctrica residencial y comercial certificada SEC en Santiago.',
    url: 'https://innvolt.cl/instalaciones-electricas',
    type: 'website',
  },
};

export default function Page() {
  return (
    <ServiceLanding
      slug="instalaciones-electricas"
      serviceName="Instalaciones eléctricas en Santiago"
      label="Electricidad certificada SEC"
      title={<>INSTALACIONES<br />ELÉCTRICAS</>}
      intro="Instalaciones eléctricas para casas, locales comerciales y oficinas en Santiago. Diseñamos, ejecutamos y certificamos la instalación conforme a la normativa SEC, con materiales de calidad y garantía por escrito."
      photos={['/electricista-1.jpg']}
      bullets={[
        'Instalaciones nuevas y ampliaciones',
        'Circuitos, enchufes e iluminación',
        'Tableros, empalmes y protecciones',
        'Regularización de instalaciones antiguas',
        'Certificación SEC (TE1)',
        'Residencial, comercial e industria liviana',
      ]}
      bodyTitle="Qué incluye"
      body={[
        'Una instalación eléctrica bien ejecutada es la base de un hogar o negocio seguro. Partimos con una visita técnica para dimensionar la carga, definir los circuitos y las protecciones (automáticos y diferencial), y dejar todo ordenado y rotulado. Trabajamos en viviendas, departamentos, locales comerciales y oficinas.',
        'Realizamos instalaciones nuevas, ampliaciones (más enchufes, iluminación, cocina eléctrica) y la regularización de instalaciones antiguas que ya no cumplen la normativa. Al ser instaladores autorizados, emitimos el certificado TE1 ante la SEC cuando el trabajo lo requiere, dejando tu instalación declarada y en regla.',
        'Entregamos presupuesto claro, con boleta o factura y garantía sobre materiales y mano de obra. Coordinamos los cortes de energía para minimizar el impacto en tu casa o tu operación.',
      ]}
      features={[
        { title: 'Certificados SEC', desc: 'Instaladores autorizados que emiten el certificado TE1 y dejan todo en regla.' },
        { title: 'Bien dimensionado', desc: 'Calculamos la carga y las protecciones reales, sin improvisar.' },
        { title: 'Precio justo y garantía', desc: 'Presupuesto claro, con boleta o factura y garantía por escrito.' },
        { title: 'Orden y seguridad', desc: 'Circuitos rotulados, diferencial y materiales de calidad.' },
      ]}
      faqs={[
        { q: '¿Hacen instalaciones para locales y oficinas?', a: 'Sí. Trabajamos en viviendas, locales comerciales, oficinas e industria liviana, coordinando los trabajos para no detener tu operación.' },
        { q: '¿Entregan certificado de la instalación?', a: 'Sí, cuando corresponde emitimos el certificado TE1 ante la SEC, que declara tu instalación conforme a la normativa vigente.' },
        { q: '¿Pueden regularizar una instalación antigua?', a: 'Sí. Revisamos la instalación, corregimos lo que haga falta (protecciones, tablero, circuitos) y la dejamos en condiciones de certificarse.' },
        { q: '¿Dan garantía?', a: 'Sí, todos nuestros trabajos incluyen garantía sobre materiales y mano de obra, con boleta o factura.' },
      ]}
      waText="Hola InnVolt, necesito una instalación eléctrica en Santiago"
    />
  );
}
