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
      waText="Hola InnVolt, quiero cotizar cámaras de seguridad CCTV en Santiago"
    />
  );
}
