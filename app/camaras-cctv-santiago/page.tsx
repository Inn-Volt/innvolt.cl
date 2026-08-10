import type { Metadata } from 'next';
import ServiceLanding from '../components/ServiceLanding';

export const metadata: Metadata = {
  title: 'Instalación de Cámaras de Seguridad CCTV en Santiago',
  description: 'Instalación de cámaras de seguridad CCTV HD y 4K en Santiago: monitoreo remoto 24/7, cableado estructurado y redes WiFi profesionales. Respuesta el mismo día.',
  alternates: { canonical: '/camaras-cctv-santiago' },
  openGraph: {
    title: 'Cámaras de Seguridad CCTV en Santiago | INNVOLT',
    description: 'Cámaras HD y 4K, monitoreo remoto 24/7, redes y cableado estructurado en Santiago.',
    url: 'https://innvolt.cl/camaras-cctv-santiago',
    type: 'website',
  },
};

export default function Page() {
  return (
    <ServiceLanding
      slug="camaras-cctv-santiago"
      serviceName="Instalación de cámaras de seguridad CCTV en Santiago"
      label="Redes y seguridad"
      title={<>CÁMARAS CCTV<br />EN SANTIAGO</>}
      intro="Instalamos sistemas de cámaras de seguridad HD y 4K con monitoreo remoto desde tu celular las 24 horas. Complementamos con cableado estructurado y redes WiFi profesionales para hogares, comercios e industria en Santiago y toda la Región Metropolitana."
      bullets={[
        'Cámaras CCTV HD y 4K',
        'Monitoreo remoto 24/7 desde tu celular',
        'Cableado estructurado',
        'Redes WiFi profesionales',
        'Control de accesos',
        'Mantención y soporte técnico',
      ]}
      features={[
        { title: 'Monitoreo 24/7', desc: 'Mira tus cámaras en vivo desde cualquier lugar, en tiempo real.' },
        { title: 'Instalación limpia', desc: 'Cableado estructurado y prolijo, sin dañar terminaciones.' },
        { title: 'Equipos de calidad', desc: 'Trabajamos con marcas confiables y garantía sobre el trabajo.' },
        { title: 'Asesoría incluida', desc: 'Te recomendamos la cantidad y ubicación óptima de cámaras.' },
      ]}
      bodyTitle="En qué consiste"
      body={[
        'Instalamos sistemas de cámaras de seguridad CCTV para hogares, comercios, empresas e industria en Santiago. Diseñamos la solución según lo que necesitas cuidar: definimos la cantidad de cámaras, su ubicación y resolución (HD o 4K), el almacenamiento (grabador y disco) y el acceso remoto para que veas todo desde tu celular, en vivo y grabado.',
        'Una instalación de cámaras profesional no es solo poner equipos: es cubrir los puntos ciegos, asegurar buena imagen de noche, proteger el cableado y dejar el sistema estable para que funcione cuando de verdad lo necesitas. Complementamos con cableado estructurado y redes cuando el proyecto lo requiere.',
        'Para empresas integramos el CCTV con control de acceso y ofrecemos monitoreo y mantención, de modo que tengas un sistema de seguridad completo con un solo responsable.',
      ]}
      faqs={[
        { q: '¿Puedo ver las cámaras desde mi celular?', a: 'Sí. Configuramos el acceso remoto para que veas tus cámaras en vivo y las grabaciones desde una app, en cualquier momento y lugar.' },
        { q: '¿Las cámaras graban de noche?', a: 'Sí, usamos cámaras con visión nocturna. En la instalación cuidamos la ubicación e iluminación para asegurar buena imagen también de noche.' },
        { q: '¿Cuántas cámaras necesito?', a: 'Depende de las áreas a cubrir y los puntos ciegos. Hacemos una evaluación y te proponemos la cantidad y ubicación óptima, sin cobrarte de más por cámaras que no aportan.' },
        { q: '¿Sirve para empresas e industria?', a: 'Sí. Instalamos CCTV para comercios, oficinas e industria, integrable con control de acceso y con opción de monitoreo y mantención.' },
      ]}
      waText="Hola InnVolt, quiero cotizar cámaras de seguridad CCTV en Santiago"
    />
  );
}
