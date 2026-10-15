import type { Metadata } from 'next';
import ServiceLanding from '../components/ServiceLanding';

/*
  Normativa verificada en sec.cl (e-Declarador Sostenible, oct-2026):
  TE4 "Energías Renovables" = declaración de instalación de generación / net billing.
  Marco legal: Ley 21.118 (modifica la Ley 20.571 de generación distribuida).
*/

export const metadata: Metadata = {
  title: 'Net Billing en Chile | Inyección a la Red y Declaración TE4 | InnVolt',
  description: 'Net billing en Santiago: inyecta a la red la energía que no usas y descuéntala de tu cuenta. Hacemos la declaración SEC (TE4) de tu instalación solar bajo la Ley 21.118.',
  alternates: { canonical: '/paneles-solares-netbilling' },
  openGraph: {
    title: 'Net Billing en Chile | Inyección a la Red y Declaración TE4 | InnVolt',
    description: 'Tramitamos la declaración SEC (TE4) para que tu instalación solar pueda inyectar a la red con net billing.',
    url: 'https://innvolt.cl/paneles-solares-netbilling',
    type: 'website',
  },
};

export default function Page() {
  return (
    <ServiceLanding
      slug="paneles-solares-netbilling"
      serviceName="Net billing y declaración SEC (TE4) en Santiago"
      label="Energía renovable · Net billing"
      title={<>NET<br />BILLING</>}
      intro="Net billing te permite inyectar a la red la energía solar que no consumes y descontarla de tu cuenta de luz. En InnVolt instalamos tu sistema y realizamos la declaración ante la SEC (formulario TE4) para que puedas inyectar legalmente, bajo la Ley 21.118."
      bullets={[
        'Declaración de generación ante la SEC (TE4)',
        'Habilitación para inyectar a la red (net billing)',
        'Diseño y conexión del sistema fotovoltaico',
        'Protecciones y medidor bidireccional',
        'Marco Ley 21.118 (generación distribuida)',
        'Para casas, pymes y empresas',
      ]}
      bodyTitle="Qué es y cómo se tramita"
      body={[
        'El net billing es el mecanismo legal en Chile que permite a quien genera su propia energía (por ejemplo, con paneles solares) inyectar los excedentes a la red eléctrica y recibir un descuento en su cuenta por esa energía. Está regulado por la Ley 21.118, que modificó la Ley 20.571 de generación distribuida.',
        'Para acogerte, tu instalación de generación debe estar declarada ante la Superintendencia de Electricidad y Combustibles (SEC) mediante el formulario TE4 (Energías Renovables), y debe contar con las protecciones y el medidor bidireccional correspondientes. Una instalación solar sin esta declaración no puede inyectar a la red de forma legal.',
        'En InnVolt, como instaladores autorizados, dejamos el sistema bien conectado y hacemos la declaración TE4 completa, para que tu net billing quede operativo y en regla. Si aún no tienes paneles, también los instalamos (ver nuestra página de paneles solares).',
      ]}
      features={[
        { title: 'Trámite TE4 completo', desc: 'Declaramos tu instalación de generación ante la SEC para habilitar el net billing.' },
        { title: 'En regla con la ley', desc: 'Conforme a la Ley 21.118 de generación distribuida.' },
        { title: 'Conexión segura', desc: 'Protecciones y medidor bidireccional bien instalados.' },
        { title: 'Todo con un responsable', desc: 'Instalación eléctrica + generación + trámite en una sola empresa.' },
      ]}
      faqs={[
        { q: '¿Qué pasa si instalo paneles sin declararlos?', a: 'No podrías inyectar a la red legalmente ni recibir el descuento por net billing, y la instalación quedaría fuera de norma. Por eso la declaración TE4 ante la SEC es parte del trabajo.' },
        { q: '¿Qué ley regula el net billing?', a: 'La Ley 21.118, que modificó la Ley 20.571 de generación distribuida, es el marco vigente para inyectar a la red y descontar de la cuenta.' },
        { q: '¿Ustedes hacen el trámite o solo instalan?', a: 'Hacemos ambos: instalamos el sistema y realizamos la declaración TE4 ante la SEC, dejando el net billing operativo.' },
        { q: '¿Cuánto me descuentan por lo que inyecto?', a: 'El valor de la energía inyectada lo define la normativa y tu distribuidora; no es un dato que inventemos. Te explicamos cómo funciona según tu caso al cotizar.' },
      ]}
      waText="Hola InnVolt, quiero inyectar a la red (net billing) y declarar mi instalación solar"
    />
  );
}
