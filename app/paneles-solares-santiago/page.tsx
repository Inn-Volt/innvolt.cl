import type { Metadata } from 'next';
import ServiceLanding from '../components/ServiceLanding';

/*
  Normativa verificada en sec.cl (e-Declarador Sostenible, oct-2026):
  TE4 "Energías Renovables" = declaración de instalación de generación / net billing.
  Marco legal: Ley 21.118 (modifica la Ley 20.571 de generación distribuida / net billing).
*/

export const metadata: Metadata = {
  title: 'Paneles Solares en Santiago | Instalación Fotovoltaica | InnVolt',
  description: 'Instalación de paneles solares fotovoltaicos en Santiago para casas y empresas. Diseño, montaje, declaración SEC (TE4) y net billing. Baja tu cuenta de luz con energía solar.',
  alternates: { canonical: '/paneles-solares-santiago' },
  openGraph: {
    title: 'Paneles Solares en Santiago | Instalación Fotovoltaica | InnVolt',
    description: 'Instalación de paneles solares para casas y empresas en Santiago, con declaración SEC y net billing.',
    url: 'https://innvolt.cl/paneles-solares-santiago',
    type: 'website',
  },
};

export default function Page() {
  return (
    <ServiceLanding
      slug="paneles-solares-santiago"
      serviceName="Instalación de paneles solares en Santiago"
      label="Energía renovable · Solar"
      title={<>PANELES<br />SOLARES</>}
      intro="Instalamos paneles solares fotovoltaicos en casas y empresas de Santiago para que bajes tu cuenta de luz y generes tu propia energía. Nos encargamos del diseño, el montaje, la conexión y la declaración ante la SEC, con la ventaja de ser electricistas certificados."
      bullets={[
        'Sistemas on-grid (conectados a la red)',
        'Dimensionamiento según tu consumo real',
        'Diseño, montaje e instalación completa',
        'Declaración SEC (TE4) y net billing',
        'Casas, condominios, comercio y pymes',
        'Opción de sumar baterías o cargador EV',
      ]}
      bodyTitle="Cómo funciona"
      body={[
        'Un sistema solar fotovoltaico genera electricidad a partir del sol y la inyecta a tu instalación, reduciendo lo que consumes de la red. Con net billing, los excedentes que no usas se inyectan a la red y se descuentan de tu cuenta. Santiago tiene muy buena radiación solar durante gran parte del año, lo que hace que la inversión tenga sentido.',
        'En InnVolt partimos midiendo tu consumo real (tu cuenta de luz) para dimensionar correctamente los kWp que necesitas —ni de más ni de menos—. Instalamos paneles, inversor y la protección eléctrica, y realizamos la declaración de la instalación de generación ante la SEC (formulario TE4, Energías Renovables) bajo el marco de la Ley 21.118 de generación distribuida, requisito para poder inyectar a la red legalmente.',
        'La gran ventaja de hacerlo con nosotros: somos electricistas certificados SEC, así que la parte eléctrica (tablero, protecciones, conexión) queda bien hecha y en regla, no como un “añadido” suelto. Trabajamos con equipos de marcas {{TODO: marcas de paneles e inversores que instalan}}.',
      ]}
      features={[
        { title: 'Dimensionado a tu consumo', desc: 'Calculamos los kWp según tu cuenta de luz real, no una estimación al azar.' },
        { title: 'Declaración SEC incluida', desc: 'Tramitamos la declaración TE4 (Energías Renovables) para habilitar el net billing.' },
        { title: 'Electricistas certificados', desc: 'La parte eléctrica queda bien hecha y en regla, con garantía.' },
        { title: 'Escalable', desc: 'Puedes sumar baterías de respaldo o un cargador de auto más adelante.' },
      ]}
      faqs={[
        { q: '¿Cuánto puedo ahorrar con paneles solares?', a: 'Depende de tu consumo, el tamaño del sistema y tu techo. Lo correcto es dimensionar según tu cuenta de luz real; por eso partimos con una evaluación antes de prometer cifras. {{TODO: rangos de ahorro referenciales si se decide publicarlos}}.' },
        { q: '¿Qué es el net billing y lo tramitan ustedes?', a: 'Es el mecanismo que permite inyectar a la red los excedentes de tu generación y descontarlos de tu cuenta, bajo la Ley 21.118. Nosotros realizamos la declaración de la instalación ante la SEC (formulario TE4, Energías Renovables), que es requisito para inyectar legalmente.' },
        { q: '¿Necesito baterías?', a: 'No necesariamente. Un sistema on-grid sin baterías ya reduce tu cuenta. Las baterías sirven para respaldo ante cortes o para usar tu energía de noche; se pueden agregar después.' },
        { q: '¿Sirve para empresas y condominios?', a: 'Sí. Dimensionamos sistemas para casas, condominios, comercio, pymes e industria liviana, integrados con tu instalación eléctrica.' },
      ]}
      waText="Hola InnVolt, quiero cotizar paneles solares en Santiago"
    />
  );
}
