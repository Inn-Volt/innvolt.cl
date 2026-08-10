import type { Metadata } from 'next';
import ServiceLanding from '../components/ServiceLanding';

export const metadata: Metadata = {
  title: 'Redes y Cableado Estructurado en Santiago | Empresas',
  description: 'Instalación de redes y cableado estructurado en Santiago para empresas y oficinas: puntos de red, fibra óptica, racks, WiFi profesional y certificación de puntos. Infraestructura tecnológica INNVOLT.',
  alternates: { canonical: '/redes-cableado-estructurado' },
  openGraph: {
    title: 'Redes y Cableado Estructurado en Santiago | INNVOLT',
    description: 'Cableado estructurado, fibra, racks y WiFi profesional para empresas y oficinas.',
    url: 'https://innvolt.cl/redes-cableado-estructurado',
    type: 'website',
  },
};

export default function Page() {
  return (
    <ServiceLanding
      slug="redes-cableado-estructurado"
      serviceName="Redes y cableado estructurado en Santiago"
      label="Redes · Cableado estructurado"
      title={<>REDES Y<br />CABLEADO</>}
      intro="Diseñamos e instalamos redes y cableado estructurado para empresas, oficinas y locales en Santiago: puntos de red, fibra óptica, racks, WiFi profesional y una infraestructura ordenada que crece contigo."
      bullets={[
        'Cableado estructurado categoría 6/6A',
        'Puntos de red de datos y voz',
        'Fibra óptica y enlaces entre pisos o edificios',
        'Racks, patch panels y organización',
        'WiFi profesional y cobertura por zonas',
        'Certificación y etiquetado de puntos',
      ]}
      bodyTitle="En qué consiste"
      body={[
        'Una red bien hecha es invisible: simplemente funciona. El problema aparece cuando el cableado es improvisado —cables sueltos, sin etiquetar, mezclados con la energía— y la red se cae, va lenta o es imposible de mantener. El cableado estructurado es el estándar que ordena toda la infraestructura de datos de un edificio.',
        'En INNVOLT diseñamos e instalamos la red de tu empresa: definimos la cantidad y ubicación de puntos, tendemos cableado categoría 6/6A y fibra óptica, montamos racks y patch panels ordenados, e instalamos WiFi profesional con cobertura por zonas. Etiquetamos y certificamos cada punto para que tu equipo de TI (o el nuestro) pueda mantenerla sin adivinar.',
        'Es la base sobre la que después funcionan tus cámaras, tu control de acceso, tus pantallas y tus sistemas: por eso lo hacemos pensando en integración y crecimiento futuro.',
      ]}
      features={[
        { title: 'Estándar y orden', desc: 'Cableado categoría 6/6A, etiquetado y certificado, no improvisado.' },
        { title: 'Escalable', desc: 'Infraestructura pensada para crecer sin rehacer todo.' },
        { title: 'WiFi que funciona', desc: 'Cobertura profesional por zonas, no un router saturado.' },
        { title: 'Base para integrar', desc: 'Soporta cámaras, control de acceso, pantallas y sistemas.' },
      ]}
      faqs={[
        { q: '¿Qué diferencia hay con contratar “al que sabe de redes”?', a: 'El cableado estructurado sigue un estándar: categorías, distancias, separación de la energía, certificación de cada punto y documentación. Eso evita fallas intermitentes y hace la red mantenible en el tiempo.' },
        { q: '¿Instalan fibra óptica?', a: 'Sí, tendemos fibra para enlaces de alta velocidad entre pisos, edificios o para conexiones que requieren distancia y ancho de banda.' },
        { q: '¿Mejoran el WiFi de mi oficina?', a: 'Sí. Diseñamos cobertura WiFi profesional con puntos de acceso ubicados por zona, en lugar de depender de un solo router, para eliminar zonas sin señal.' },
        { q: '¿Sirve para integrar cámaras y control de acceso?', a: 'Exacto. Una red estructurada es la base sobre la que funcionan CCTV IP, control de acceso y otros sistemas; la dejamos preparada para esa integración.' },
      ]}
      waText="Hola InnVolt, necesito redes o cableado estructurado para mi empresa en Santiago"
    />
  );
}
