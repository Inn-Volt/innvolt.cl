import type { Metadata } from 'next';
import ServiceLanding from '../components/ServiceLanding';

export const metadata: Metadata = {
  title: 'Pantallas LED en Santiago | Instalación para Empresas y Retail',
  description: 'Venta e instalación de pantallas LED profesionales en Santiago para retail, empresas, eventos y espacios corporativos. Pantallas de interior y exterior con controladores Novastar. INNVOLT.',
  alternates: { canonical: '/pantallas-led' },
  openGraph: {
    title: 'Pantallas LED en Santiago | INNVOLT',
    description: 'Instalación de pantallas LED profesionales para retail, empresas y eventos, con tecnología Novastar.',
    url: 'https://innvolt.cl/pantallas-led',
    type: 'website',
  },
};

export default function Page() {
  return (
    <ServiceLanding
      slug="pantallas-led"
      serviceName="Instalación de pantallas LED en Santiago"
      label="Pantallas LED · Novastar"
      title={<>PANTALLAS<br />LED</>}
      intro="Instalamos pantallas LED profesionales en Santiago para retail, empresas, eventos y espacios corporativos. Interior y exterior, con controladores Novastar y contenido gestionable, para comunicar con impacto."
      bullets={[
        'Pantallas LED de interior y exterior',
        'Controladores y procesadores Novastar',
        'Muros de video y señalética digital',
        'Estructura, montaje y alimentación eléctrica',
        'Gestión y programación de contenido',
        'Soporte y mantención',
      ]}
      bodyTitle="En qué consiste"
      body={[
        'Una pantalla LED bien instalada capta la atención como ningún otro medio: brilla incluso a plena luz, se ve nítida a distancia y permite cambiar el contenido cuando quieras. Es la herramienta ideal para retail, vitrinas, recepciones corporativas, salas de control y eventos.',
        'En INNVOLT nos encargamos del proyecto completo: dimensionamos la pantalla según la distancia de visión y el espacio, elegimos el pixel pitch adecuado, montamos la estructura, resolvemos la alimentación eléctrica (nuestra especialidad) y configuramos los controladores y procesadores Novastar. Dejamos el sistema listo para que gestiones y programes tu contenido de forma sencilla.',
        'Al ser también los eléctricos del proyecto, resolvemos la instalación de punta a punta —energía, estructura y pantalla— con un solo responsable, en lugar de coordinar varios proveedores.',
      ]}
      features={[
        { title: 'Tecnología Novastar', desc: 'Controladores y procesadores estándar de la industria LED.' },
        { title: 'Proyecto completo', desc: 'Energía, estructura, montaje y pantalla con un solo responsable.' },
        { title: 'Bien dimensionada', desc: 'Elegimos el pixel pitch según distancia y uso, no al azar.' },
        { title: 'Contenido a tu control', desc: 'Sistema listo para que programes y cambies el contenido.' },
      ]}
      faqs={[
        { q: '¿Qué es el pixel pitch y por qué importa?', a: 'Es la distancia entre los LED de la pantalla. Menor pitch significa mayor definición y permite verla de cerca; para exterior y grandes distancias se usa un pitch mayor. Lo elegimos según dónde y cómo se verá tu pantalla.' },
        { q: '¿Sirven para exterior?', a: 'Sí. Instalamos pantallas de exterior con protección adecuada y alto brillo para que se vean nítidas incluso con sol directo.' },
        { q: '¿Ustedes también hacen la parte eléctrica?', a: 'Sí, y es una ventaja: al ser instaladores eléctricos resolvemos la alimentación, la estructura y la pantalla como un solo proyecto, con un único responsable.' },
        { q: '¿Puedo cambiar el contenido yo mismo?', a: 'Sí. Configuramos el sistema y te capacitamos para que gestiones y programes el contenido de forma simple, o podemos encargarnos nosotros.' },
      ]}
      waText="Hola InnVolt, quiero cotizar una pantalla LED en Santiago"
    />
  );
}
