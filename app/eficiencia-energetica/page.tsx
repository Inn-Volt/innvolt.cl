import type { Metadata } from 'next';
import ServiceLanding from '../components/ServiceLanding';

export const metadata: Metadata = {
  title: 'Eficiencia Energética y Gestión de Energía en Santiago | InnVolt',
  description: 'Eficiencia energética para casas y empresas en Santiago: monitoreo de consumo, iluminación LED, automatización de cargas y gestión de energía para bajar tu cuenta de luz.',
  alternates: { canonical: '/eficiencia-energetica' },
  openGraph: {
    title: 'Eficiencia Energética y Gestión de Energía en Santiago | InnVolt',
    description: 'Monitoreo de consumo, iluminación eficiente y gestión de energía para bajar tu cuenta de luz.',
    url: 'https://innvolt.cl/eficiencia-energetica',
    type: 'website',
  },
};

export default function Page() {
  return (
    <ServiceLanding
      slug="eficiencia-energetica"
      serviceName="Eficiencia energética y gestión de energía en Santiago"
      label="Energía · Eficiencia"
      title={<>EFICIENCIA<br />ENERGÉTICA</>}
      intro="Te ayudamos a consumir menos y mejor: medimos tu consumo, detectamos dónde se va la energía y aplicamos mejoras —iluminación eficiente, automatización de cargas y monitoreo— para bajar tu cuenta de luz en casa o en tu empresa."
      bullets={[
        'Monitoreo y medición de consumo',
        'Iluminación LED y control de iluminación',
        'Automatización de cargas y horarios',
        'Diagnóstico de consumos elevados',
        'Gestión de energía para empresas',
        'Complemento ideal de un sistema solar',
      ]}
      bodyTitle="En qué consiste"
      body={[
        'La energía más barata es la que no se gasta. Antes de pensar en generar más, conviene reducir y ordenar el consumo: cambiar iluminación por LED, automatizar luces y equipos para que no queden encendidos de más, y medir el consumo para saber exactamente dónde se va la energía.',
        'En InnVolt instalamos sistemas de monitoreo de consumo, iluminación eficiente y automatización de cargas (encendido por horario, sensores, apagado automático), tanto en hogares como en comercios, oficinas e industria liviana. Con los datos de consumo, detectamos los puntos que más gastan y proponemos mejoras concretas.',
        'La eficiencia energética se potencia con la generación solar: primero bajamos tu consumo y luego dimensionamos los paneles sobre ese consumo optimizado, para que la inversión rinda más.',
      ]}
      features={[
        { title: 'Primero medir', desc: 'Monitoreamos el consumo real para decidir con datos, no a ojo.' },
        { title: 'Mejoras concretas', desc: 'Iluminación LED, automatización y control de cargas.' },
        { title: 'Para hogar y empresa', desc: 'Desde una casa hasta oficinas, comercio e industria liviana.' },
        { title: 'Potencia tu solar', desc: 'Bajar el consumo hace que tus paneles rindan más.' },
      ]}
      faqs={[
        { q: '¿Por dónde conviene empezar?', a: 'Por medir. Con un monitoreo de consumo sabemos dónde se va la energía y priorizamos las mejoras que más ahorran, en vez de gastar a ciegas.' },
        { q: '¿Esto reemplaza a los paneles solares?', a: 'No, se complementan. Primero reducimos y ordenamos el consumo; luego, si quieres generar, dimensionamos los paneles sobre ese consumo ya optimizado.' },
        { q: '¿Sirve para empresas?', a: 'Sí. La gestión de energía (monitoreo, automatización, iluminación) es especialmente rentable en comercios, oficinas e industria liviana.' },
        { q: '¿Automatizan la iluminación y las cargas?', a: 'Sí, instalamos control de iluminación, sensores y automatización de encendido/apagado por horario para evitar consumos innecesarios.' },
      ]}
      waText="Hola InnVolt, quiero mejorar la eficiencia energética de mi casa / empresa"
    />
  );
}
