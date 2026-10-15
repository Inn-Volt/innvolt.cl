import type { Metadata } from 'next';
import ServiceLanding from '../components/ServiceLanding';

export const metadata: Metadata = {
  title: 'Baterías de Almacenamiento Solar en Santiago | InnVolt',
  description: 'Baterías de almacenamiento de energía y sistemas solares híbridos en Santiago. Respaldo ante cortes de luz y uso de tu energía solar de noche. Instalación certificada SEC.',
  alternates: { canonical: '/baterias-almacenamiento-energia' },
  openGraph: {
    title: 'Baterías de Almacenamiento Solar en Santiago | InnVolt',
    description: 'Sistemas solares híbridos con baterías: respaldo ante cortes y energía solar de noche.',
    url: 'https://innvolt.cl/baterias-almacenamiento-energia',
    type: 'website',
  },
};

export default function Page() {
  return (
    <ServiceLanding
      slug="baterias-almacenamiento-energia"
      serviceName="Baterías de almacenamiento de energía en Santiago"
      label="Energía renovable · Almacenamiento"
      title={<>BATERÍAS Y<br />RESPALDO</>}
      intro="Agrega baterías de almacenamiento a tu sistema solar para tener respaldo ante cortes de luz y usar tu propia energía de noche. En InnVolt instalamos sistemas híbridos (solar + batería) bien dimensionados y en regla."
      bullets={[
        'Sistemas híbridos (solar + batería)',
        'Respaldo automático ante cortes de luz',
        'Uso de tu energía solar durante la noche',
        'Dimensionamiento según tu consumo',
        'Integración con tu instalación eléctrica',
        'Ampliable a tu sistema solar actual',
      ]}
      bodyTitle="Para qué sirven"
      body={[
        'Un sistema solar tradicional (on-grid) genera de día y, si hay un corte de luz, se apaga por seguridad. Al sumar baterías, almacenas la energía que no usas para aprovecharla de noche y, con el equipo adecuado, mantener parte de tu casa o negocio funcionando cuando se corta la electricidad.',
        'En InnVolt dimensionamos la batería según lo que realmente quieres respaldar (iluminación, refrigerador, equipos críticos) y la integramos con tu instalación y tu inversor. Podemos instalar un sistema híbrido completo desde cero o agregar baterías a un sistema solar que ya tengas.',
        'Al ser electricistas certificados, la conexión, las protecciones y los circuitos de respaldo quedan bien hechos y seguros. Trabajamos con equipos de marcas {{TODO: marcas de baterías/inversores híbridos que instalan}}.',
      ]}
      features={[
        { title: 'Respaldo ante cortes', desc: 'Mantén funcionando lo importante cuando se va la luz.' },
        { title: 'Energía de noche', desc: 'Usa de noche la energía solar que generaste de día.' },
        { title: 'Bien dimensionado', desc: 'Calculamos la capacidad según lo que quieres respaldar.' },
        { title: 'Integración segura', desc: 'Conexión y protecciones hechas por electricistas certificados.' },
      ]}
      faqs={[
        { q: '¿Las baterías me dejan sin cortes de luz?', a: 'Con el equipo adecuado, mantienes funcionando los circuitos que definas (por ejemplo, iluminación y refrigerador) durante un corte. El alcance depende de la capacidad de la batería, que dimensionamos contigo.' },
        { q: '¿Puedo agregar baterías a mis paneles actuales?', a: 'En muchos casos sí, dependiendo de tu inversor. Evaluamos tu sistema y te decimos si conviene agregar baterías o migrar a un inversor híbrido.' },
        { q: '¿Sirven sin paneles solares?', a: 'Se pueden usar baterías para respaldo, pero el mayor valor está en combinarlas con generación solar. Te asesoramos según tu caso.' },
        { q: '¿Queda todo en regla?', a: 'Sí. Hacemos la instalación eléctrica y las declaraciones SEC que correspondan, dejando el sistema seguro y conforme a la normativa.' },
      ]}
      waText="Hola InnVolt, quiero cotizar baterías / un sistema solar híbrido en Santiago"
    />
  );
}
