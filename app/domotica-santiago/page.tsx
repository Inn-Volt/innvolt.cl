import type { Metadata } from 'next';
import ServiceLanding from '../components/ServiceLanding';

export const metadata: Metadata = {
  title: 'Domótica y Automatización del Hogar en Santiago',
  description: 'Domótica y automatización en Santiago: iluminación inteligente, control de accesos y portones, automatización de ambientes y gestión energética remota. Precio justo y garantía.',
  alternates: { canonical: '/domotica-santiago' },
  openGraph: {
    title: 'Domótica y Automatización en Santiago | INNVOLT',
    description: 'Iluminación inteligente, control de accesos, automatización de ambientes y gestión energética en Santiago.',
    url: 'https://innvolt.cl/domotica-santiago',
    type: 'website',
  },
};

export default function Page() {
  return (
    <ServiceLanding
      slug="domotica-santiago"
      serviceName="Domótica y automatización en Santiago"
      label="Domótica y automatización"
      title={<>DOMÓTICA<br />EN SANTIAGO</>}
      intro="Transformamos tu hogar o empresa en un espacio inteligente: iluminación automatizada, control de accesos y portones, escenas de ambiente y gestión energética que puedes controlar desde tu celular. Instalación profesional con técnicos certificados SEC en Santiago y toda la Región Metropolitana."
      bullets={[
        'Iluminación inteligente',
        'Control de accesos y portones',
        'Automatización de ambientes y escenas',
        'Gestión energética remota',
        'Integración con asistentes de voz',
        'Control desde tu celular',
      ]}
      features={[
        { title: 'Ahorro energético', desc: 'Automatiza consumos y reduce tu cuenta de luz con gestión inteligente.' },
        { title: 'Más comodidad', desc: 'Controla luces, portones y ambientes desde una app o por voz.' },
        { title: 'Instalación certificada', desc: 'Técnicos autorizados SEC, trabajo seguro y bajo normativa.' },
        { title: 'Escalable', desc: 'Parte con lo esencial y amplía tu sistema cuando quieras.' },
      ]}
      bodyTitle="En qué consiste"
      body={[
        'La domótica convierte tu hogar o empresa en un espacio inteligente: iluminación que se ajusta sola, portones y accesos automatizados, climatización programada y escenas que activas desde tu celular o por voz. No es un lujo; es comodidad, ahorro de energía y control real de tu espacio.',
        'En INNVOLT diseñamos la automatización según tu forma de usar el espacio y la dejamos integrada con tu instalación eléctrica —que es nuestra especialidad—, evitando los problemas típicos de sumar dispositivos sueltos que no conversan entre sí. Puedes partir con lo esencial y ampliar el sistema cuando quieras.',
        'Para empresas y comercios, la automatización se traduce en gestión energética, control de ambientes y operación remota, reduciendo costos y simplificando la administración.',
      ]}
      faqs={[
        { q: '¿Puedo controlar todo desde el celular?', a: 'Sí. Integramos la iluminación, accesos, climatización y escenas para que las controles desde una app y, en sistemas compatibles, por comandos de voz.' },
        { q: '¿La domótica ayuda a ahorrar energía?', a: 'Sí. Al automatizar consumos (apagado por horario, sensores, escenas) se reduce el gasto innecesario de energía, especialmente en climatización e iluminación.' },
        { q: '¿Tengo que automatizar toda la casa de una vez?', a: 'No. Puedes partir con lo esencial (por ejemplo iluminación o accesos) y ampliar el sistema por etapas. Lo diseñamos escalable.' },
        { q: '¿Se integra con mi instalación eléctrica actual?', a: 'Sí. Como somos los eléctricos del proyecto, integramos la automatización con tu instalación de forma segura y ordenada, sin dispositivos sueltos que fallan.' },
      ]}
      waText="Hola InnVolt, quiero cotizar domótica y automatización en Santiago"
    />
  );
}
