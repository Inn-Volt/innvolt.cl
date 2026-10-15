import type { Metadata } from 'next';
import ServiceLanding from '../components/ServiceLanding';

export const metadata: Metadata = {
  title: 'Aumento de Capacidad y Cambio de Empalme en Santiago | InnVolt',
  description: 'Aumento de capacidad eléctrica y cambio de empalme en Santiago. Más potencia para tu casa o negocio (cocina eléctrica, cargador de auto, equipos). Gestión y certificación SEC.',
  alternates: { canonical: '/aumento-de-capacidad-empalme' },
  openGraph: {
    title: 'Aumento de Capacidad y Cambio de Empalme en Santiago | InnVolt',
    description: 'Más potencia eléctrica para tu casa o negocio, con gestión y certificación SEC.',
    url: 'https://innvolt.cl/aumento-de-capacidad-empalme',
    type: 'website',
  },
};

export default function Page() {
  return (
    <ServiceLanding
      slug="aumento-de-capacidad-empalme"
      serviceName="Aumento de capacidad y cambio de empalme en Santiago"
      label="Electricidad · Potencia"
      title={<>AUMENTO DE<br />CAPACIDAD</>}
      intro="¿Tu instalación se quedó corta de potencia? Aumentamos la capacidad eléctrica y cambiamos tu empalme en Santiago, para que puedas sumar cocina eléctrica, cargador de auto, climatización o más equipos sin que salten los automáticos."
      photos={['/tableros-1.jpg']}
      bullets={[
        'Aumento de potencia contratada',
        'Cambio y normalización de empalme',
        'Nuevos circuitos y tableros',
        'Preparación para cocina eléctrica o cargador EV',
        'Gestión ante la distribuidora',
        'Certificación SEC cuando corresponde',
      ]}
      bodyTitle="Cuándo lo necesitas"
      body={[
        'Si los automáticos saltan cuando enchufas varios equipos, si vas a instalar una cocina o calefón eléctrico, un aire acondicionado o un cargador de auto eléctrico, probablemente tu instalación necesita más capacidad. El aumento de capacidad consiste en subir la potencia disponible y adecuar el empalme, el tablero y los circuitos para soportarla con seguridad.',
        'En InnVolt evaluamos tu consumo real y el estado del empalme y el tablero, dimensionamos la nueva capacidad y realizamos los cambios: empalme, protecciones y circuitos. Coordinamos lo que corresponda con la empresa distribuidora y, cuando el trabajo lo requiere, emitimos la certificación SEC.',
        'Así evitas sobrecargas, cortes y el riesgo de una instalación exigida por sobre su límite.',
      ]}
      features={[
        { title: 'Diagnóstico real', desc: 'Medimos tu consumo y el estado del empalme antes de proponer la capacidad.' },
        { title: 'Listo para el futuro', desc: 'Dejamos la instalación preparada para cocina eléctrica o cargador de auto.' },
        { title: 'Gestión incluida', desc: 'Coordinamos con la distribuidora lo que corresponda al cambio.' },
        { title: 'Seguro y certificado', desc: 'Protecciones adecuadas y certificación SEC cuando aplica.' },
      ]}
      faqs={[
        { q: '¿Cómo sé si necesito aumentar la capacidad?', a: 'Señales típicas: los automáticos saltan al usar varios equipos, quieres instalar cocina/calefón eléctrico, aire acondicionado o un cargador de auto. Hacemos una evaluación y te decimos la capacidad adecuada.' },
        { q: '¿Ustedes gestionan con la empresa de electricidad?', a: 'Sí, coordinamos con la distribuidora lo que corresponda al cambio de empalme y potencia, y dejamos la instalación lista.' },
        { q: '¿Sirve para instalar un cargador de auto eléctrico?', a: 'Exacto. Muchas veces un cargador EV requiere más capacidad y un circuito dedicado; dejamos todo dimensionado para eso. Ver también nuestra página de cargador de auto eléctrico.' },
        { q: '¿Queda certificado?', a: 'Cuando el trabajo lo requiere emitimos la certificación SEC correspondiente, dejando la instalación en regla.' },
      ]}
      waText="Hola InnVolt, necesito aumentar la capacidad eléctrica / cambiar el empalme en Santiago"
    />
  );
}
