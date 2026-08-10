import type { Metadata } from 'next';
import ServiceLanding from '../components/ServiceLanding';

export const metadata: Metadata = {
  title: 'Control de Acceso y Videoporteros en Santiago | Empresas',
  description: 'Instalación de control de acceso, videoporteros y automatización de portones en Santiago para empresas, edificios y comunidades. Tarjetas, huella, teclado y apertura remota. Técnicos INNVOLT.',
  alternates: { canonical: '/control-de-acceso' },
  openGraph: {
    title: 'Control de Acceso y Videoporteros en Santiago | INNVOLT',
    description: 'Control de acceso, videoporteros y portones automáticos para empresas, edificios y comunidades.',
    url: 'https://innvolt.cl/control-de-acceso',
    type: 'website',
  },
};

export default function Page() {
  return (
    <ServiceLanding
      slug="control-de-acceso"
      serviceName="Instalación de control de acceso y videoporteros en Santiago"
      label="Control de acceso · Videoporteros"
      title={<>CONTROL DE<br />ACCESO</>}
      intro="Instalamos control de acceso, videoporteros y automatización de portones en Santiago para empresas, edificios, comunidades y hogares. Decide quién entra, cuándo y deja registro de cada acceso."
      bullets={[
        'Control de acceso por tarjeta, huella, clave o app',
        'Videoporteros y citófonos IP',
        'Automatización de portones y barreras',
        'Cerraduras eléctricas y magnéticas',
        'Registro y horarios de acceso por usuario',
        'Integración con cámaras CCTV',
      ]}
      bodyTitle="En qué consiste"
      body={[
        'El control de acceso te permite gestionar y registrar quién entra a tu propiedad. En lugar de llaves que se copian o se pierden, defines usuarios con tarjeta, huella, clave o desde una app, con horarios y permisos por puerta. Ante cualquier situación, queda registro de cada acceso.',
        'En INNVOLT instalamos desde una cerradura con teclado hasta sistemas completos para edificios y empresas: videoporteros IP, citófonos, barreras vehiculares, portones automáticos y cerraduras eléctricas, todo integrable con tu sistema de cámaras. Para comunidades, esto significa más seguridad y control de las visitas; para empresas, control de personal y áreas restringidas.',
        'Diseñamos la solución según tu necesidad y la dejamos operativa, con capacitación de uso y soporte posterior.',
      ]}
      features={[
        { title: 'Más seguridad', desc: 'Solo entra quien debe entrar, con registro de cada acceso.' },
        { title: 'Sin llaves perdidas', desc: 'Tarjetas y usuarios que puedes dar de baja al instante.' },
        { title: 'Integrado', desc: 'Se combina con cámaras CCTV y videoporteros en un solo sistema.' },
        { title: 'A tu medida', desc: 'Desde una puerta hasta un edificio completo con múltiples accesos.' },
      ]}
      faqs={[
        { q: '¿Sirve para edificios y comunidades?', a: 'Sí. Instalamos videoporteros, control de acceso peatonal y vehicular, y automatización de portones para comunidades, con gestión de residentes y visitas.' },
        { q: '¿Puedo abrir la puerta desde el celular?', a: 'Sí, con sistemas compatibles puedes abrir y gestionar accesos desde una app, además de recibir el llamado del videoportero en tu teléfono.' },
        { q: '¿Se integra con las cámaras de seguridad?', a: 'Sí. Integramos control de acceso con CCTV para asociar cada acceso con imagen y tener un sistema de seguridad unificado.' },
        { q: '¿Qué pasa si se corta la luz?', a: 'Dimensionamos respaldo de energía según el sistema, y definimos el comportamiento de las cerraduras ante corte para mantener seguridad y evacuación.' },
      ]}
      waText="Hola InnVolt, quiero cotizar control de acceso o videoportero en Santiago"
    />
  );
}
