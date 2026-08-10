import type { Metadata } from 'next';
import ServiceLanding from '../components/ServiceLanding';

export const metadata: Metadata = {
  title: 'Certificación SEC TE1 en Santiago | Declaración Eléctrica',
  description: 'Certificación eléctrica TE1 ante la SEC en Santiago. Instaladores autorizados que declaran tu instalación de baja tensión conforme a la normativa vigente (RIC). Ideal para arriendo, venta y empalmes.',
  alternates: { canonical: '/certificacion-te1' },
  openGraph: {
    title: 'Certificación SEC TE1 en Santiago | INNVOLT',
    description: 'Declaración TE1 ante la SEC por instaladores autorizados. Deja tu instalación eléctrica en regla.',
    url: 'https://innvolt.cl/certificacion-te1',
    type: 'website',
  },
};

export default function Page() {
  return (
    <ServiceLanding
      slug="certificacion-te1"
      serviceName="Certificación eléctrica TE1 ante la SEC en Santiago"
      label="Certificación SEC · TE1"
      title={<>CERTIFICACIÓN<br />TE1</>}
      intro="Somos instaladores eléctricos autorizados y declaramos tu instalación de baja tensión ante la SEC mediante el formulario TE1, conforme a la normativa eléctrica vigente en Chile. Deja tu instalación en regla para arriendo, venta, empalme o inspección."
      bullets={[
        'Declaración TE1 de instalaciones de baja tensión',
        'Trámite ante la SEC por instalador autorizado',
        'Normalización previa cuando la instalación lo requiere',
        'Certificación para empalmes nuevos',
        'Ideal para arriendo, venta y recepción de propiedades',
        'Instalaciones domiciliarias, comerciales e industriales',
      ]}
      bodyTitle="Qué es la certificación TE1"
      body={[
        'El TE1 es la declaración de una instalación eléctrica interior que un instalador eléctrico autorizado presenta ante la Superintendencia de Electricidad y Combustibles (SEC). Con ella, el profesional declara —bajo su responsabilidad— que la instalación cumple con la normativa eléctrica vigente en Chile, actualmente el Reglamento de Instalaciones de Consumo de Energía Eléctrica (RIC) y sus pliegos técnicos.',
        'Este certificado es requerido, entre otros casos, para solicitar un empalme nuevo a la distribuidora, para regularizar una instalación existente, y suele exigirse en arriendos, ventas y recepciones de obra. Contar con el TE1 significa que tu instalación fue ejecutada y declarada por un profesional habilitado, quedando registrada ante la SEC.',
        'En INNVOLT revisamos tu instalación, realizamos las correcciones necesarias para que cumpla la normativa y tramitamos el TE1. Si tu instalación es nueva, la ejecutamos y certificamos; si es antigua, la normalizamos antes de declararla.',
      ]}
      features={[
        { title: 'Instaladores autorizados', desc: 'La declaración TE1 solo puede emitirla un instalador con licencia SEC vigente.' },
        { title: 'Normativa vigente', desc: 'Trabajamos conforme al RIC de la SEC, no con normas derogadas.' },
        { title: 'Trámite completo', desc: 'Nos encargamos de la declaración y la documentación ante la SEC.' },
        { title: 'Normalización', desc: 'Corregimos lo que haga falta para que tu instalación cumpla y pueda certificarse.' },
      ]}
      faqs={[
        { q: '¿Para qué sirve el certificado TE1?', a: 'Es la declaración oficial de que tu instalación eléctrica cumple la normativa. Se usa para pedir empalmes nuevos, regularizar instalaciones y suele exigirse en arriendos, ventas y recepciones de propiedades.' },
        { q: '¿Quién puede emitir el TE1?', a: 'Solo un instalador eléctrico autorizado con licencia SEC vigente, de la clase que corresponda a la instalación. En INNVOLT contamos con esa autorización.' },
        { q: '¿Qué pasa si mi instalación no cumple?', a: 'Primero la normalizamos: corregimos protecciones, circuitos o tableros según lo que indique la revisión, y recién entonces emitimos la declaración. No se certifica una instalación que no cumple.' },
        { q: '¿Bajo qué normativa se certifica hoy en Chile?', a: 'Bajo el Reglamento de Instalaciones de Consumo de Energía Eléctrica (RIC) y sus pliegos técnicos de la SEC, que es la normativa vigente para instalaciones de consumo.' },
      ]}
      waText="Hola InnVolt, necesito certificar mi instalación eléctrica (TE1) en Santiago"
    />
  );
}
