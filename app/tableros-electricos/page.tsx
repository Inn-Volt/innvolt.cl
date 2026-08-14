import type { Metadata } from 'next';
import ServiceLanding from '../components/ServiceLanding';

export const metadata: Metadata = {
  title: 'Tableros Eléctricos en Santiago | Instalación y Mantención',
  description: 'Instalación, normalización y mantención de tableros eléctricos en Santiago para hogares, comercios e industria. Protecciones, diferenciales y certificación SEC. Técnicos autorizados.',
  alternates: { canonical: '/tableros-electricos' },
  openGraph: {
    title: 'Tableros Eléctricos en Santiago | INNVOLT',
    description: 'Instalación, normalización y mantención de tableros eléctricos con protecciones y certificación SEC.',
    url: 'https://innvolt.cl/tableros-electricos',
    type: 'website',
  },
};

export default function Page() {
  return (
    <ServiceLanding
      slug="tableros-electricos"
      serviceName="Instalación y mantención de tableros eléctricos en Santiago"
      label="Tableros eléctricos"
      title={<>TABLEROS<br />ELÉCTRICOS</>}
      intro="Diseñamos, instalamos y normalizamos tableros eléctricos para hogares, comercios e industria en Santiago. Protecciones correctamente dimensionadas, diferenciales, orden y rotulado, con certificación SEC cuando corresponde."
      bullets={[
        'Instalación de tableros nuevos (TDA y tableros de distribución)',
        'Normalización de tableros antiguos o sobrecargados',
        'Interruptores automáticos y diferenciales',
        'Aumento de capacidad y nuevos circuitos',
        'Rotulado, orden y memoria de cargas',
        'Termografía y detección de puntos calientes',
      ]}
      bodyTitle="En qué consiste"
      body={[
        'El tablero eléctrico es el corazón de tu instalación: distribuye la energía y protege a las personas y los equipos ante sobrecargas, cortocircuitos y fugas. Un tablero mal dimensionado, sin diferencial o con protecciones vencidas es una de las causas más frecuentes de fallas e incendios de origen eléctrico.',
        'En INNVOLT revisamos el estado de tu tablero, calculamos la carga real y dimensionamos las protecciones según la normativa vigente. Instalamos tableros nuevos, normalizamos los existentes, separamos circuitos, agregamos diferenciales y dejamos todo rotulado y ordenado. Cuando el trabajo lo requiere, emitimos la certificación SEC correspondiente.',
        'Trabajamos en viviendas, edificios, oficinas, locales comerciales e instalaciones industriales, coordinando los cortes de energía para minimizar el impacto en tu operación.',
      ]}
      features={[
        { title: 'Bien dimensionado', desc: 'Calculamos la carga real y elegimos protecciones adecuadas, sin improvisar.' },
        { title: 'Seguridad primero', desc: 'Diferenciales y automáticos que protegen a las personas y tus equipos.' },
        { title: 'Orden y trazabilidad', desc: 'Circuitos rotulados y memoria de cargas para futuras mantenciones.' },
        { title: 'Certificación SEC', desc: 'Emitimos TE1 cuando corresponde, dejando la instalación en regla.' },
      ]}
      faqs={[
        { q: '¿Cuándo debo cambiar o normalizar mi tablero?', a: 'Si los automáticos saltan seguido, no tienes protección diferencial, el tablero se calienta, hay olor a quemado, o vas a aumentar la carga (más equipos, cocina eléctrica, cargador de auto), es momento de revisarlo y normalizarlo.' },
        { q: '¿Qué es un diferencial y por qué es obligatorio?', a: 'El interruptor diferencial detecta fugas de corriente y corta el suministro para evitar electrocuciones. La normativa vigente lo exige en las instalaciones; si tu tablero no lo tiene, es una prioridad de seguridad.' },
        { q: '¿Entregan certificado SEC del tablero?', a: 'Sí. Cuando el trabajo lo requiere, emitimos el certificado TE1 ante la SEC, dejando tu instalación declarada y en regla.' },
        { q: '¿Trabajan en empresas e industria?', a: 'Sí. Instalamos y mantenemos tableros de distribución en oficinas, comercios e instalaciones industriales, coordinando los cortes para no detener tu operación.' },
      ]}
      photos={['/tableros-1.jpg']}
      waText="Hola InnVolt, necesito instalar o normalizar un tablero eléctrico en Santiago"
    />
  );
}
