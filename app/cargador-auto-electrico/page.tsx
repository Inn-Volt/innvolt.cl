import type { Metadata } from 'next';
import ServiceLanding from '../components/ServiceLanding';

/*
  Normativa verificada en sec.cl (e-Declarador Sostenible, oct-2026):
  TE6 "Carga Vehículos Eléctricos" = declaración de infraestructura de carga de vehículos eléctricos.
*/

export const metadata: Metadata = {
  title: 'Instalación de Cargador de Auto Eléctrico en Santiago | InnVolt',
  description: 'Instalación de cargador de auto eléctrico (wallbox) en casas y empresas de Santiago. Circuito dedicado, protecciones y declaración SEC (TE6). Electricistas certificados.',
  alternates: { canonical: '/cargador-auto-electrico' },
  openGraph: {
    title: 'Instalación de Cargador de Auto Eléctrico en Santiago | InnVolt',
    description: 'Instalamos tu wallbox con circuito dedicado, protecciones y declaración SEC (TE6).',
    url: 'https://innvolt.cl/cargador-auto-electrico',
    type: 'website',
  },
};

export default function Page() {
  return (
    <ServiceLanding
      slug="cargador-auto-electrico"
      serviceName="Instalación de cargador de auto eléctrico en Santiago"
      label="Energía · Electromovilidad"
      title={<>CARGADOR DE<br />AUTO ELÉCTRICO</>}
      intro="Instalamos tu cargador de auto eléctrico (wallbox) en casa o en tu empresa en Santiago, con circuito dedicado, protecciones adecuadas y la declaración SEC correspondiente, para que cargues de forma rápida y segura."
      bullets={[
        'Instalación de wallbox (cargador doméstico y comercial)',
        'Circuito dedicado y protecciones',
        'Evaluación de capacidad del empalme',
        'Declaración SEC (TE6) de la infraestructura de carga',
        'Carga para casas, edificios y estacionamientos',
        'Integrable con paneles solares',
      ]}
      bodyTitle="Qué incluye la instalación"
      body={[
        'Cargar un auto eléctrico en un enchufe común es lento e inseguro: demanda mucha corriente por horas. Un cargador dedicado (wallbox) carga más rápido y de forma segura, pero requiere un circuito propio, protecciones adecuadas y, muchas veces, revisar la capacidad del empalme.',
        'En InnVolt evaluamos tu instalación, dimensionamos el circuito para el cargador, instalamos las protecciones correctas y conectamos el wallbox. Cuando corresponde, realizamos la declaración de la infraestructura de carga ante la SEC (formulario TE6, Carga de Vehículos Eléctricos), dejando todo en regla.',
        'Al ser electricistas certificados, resolvemos también el aumento de capacidad o el circuito si tu instalación lo necesita, y podemos integrar la carga con un sistema de paneles solares para que cargues con tu propia energía.',
      ]}
      features={[
        { title: 'Carga rápida y segura', desc: 'Circuito dedicado y protecciones, no un enchufe improvisado.' },
        { title: 'Declaración SEC (TE6)', desc: 'Declaramos la infraestructura de carga cuando corresponde.' },
        { title: 'Evaluamos tu empalme', desc: 'Revisamos si necesitas más capacidad para el cargador.' },
        { title: 'Solar + EV', desc: 'Opción de cargar con energía de tus propios paneles solares.' },
      ]}
      faqs={[
        { q: '¿Puedo cargar en un enchufe normal?', a: 'Se puede en emergencia, pero es lento e inseguro para uso diario. Un wallbox con circuito dedicado carga más rápido y de forma segura.' },
        { q: '¿Necesito aumentar la capacidad eléctrica?', a: 'A veces sí. Evaluamos tu empalme y tablero; si hace falta más capacidad o un circuito dedicado, lo dejamos listo (ver nuestra página de aumento de capacidad).' },
        { q: '¿Se declara ante la SEC?', a: 'Cuando corresponde, realizamos la declaración TE6 de la infraestructura de carga de vehículos eléctricos, dejando la instalación en regla.' },
        { q: '¿Puedo cargar con paneles solares?', a: 'Sí. Podemos integrar el cargador con un sistema fotovoltaico para que cargues tu auto con tu propia energía solar.' },
      ]}
      waText="Hola InnVolt, quiero instalar un cargador de auto eléctrico en Santiago"
    />
  );
}
