import type { Metadata } from 'next';
import ServiceLanding from '../components/ServiceLanding';

export const metadata: Metadata = {
  title: 'Proyectos Eléctricos en Santiago | Ingeniería y Ejecución | InnVolt',
  description: 'Proyectos eléctricos para empresas y constructoras en Santiago: diseño, planos, ejecución y certificación SEC. Instalaciones comerciales e industria liviana con un solo responsable.',
  alternates: { canonical: '/proyectos-electricos' },
  openGraph: {
    title: 'Proyectos Eléctricos en Santiago | InnVolt',
    description: 'Diseño, planos, ejecución y certificación SEC de proyectos eléctricos para empresas.',
    url: 'https://innvolt.cl/proyectos-electricos',
    type: 'website',
  },
};

export default function Page() {
  return (
    <ServiceLanding
      slug="proyectos-electricos"
      serviceName="Proyectos eléctricos en Santiago"
      label="Electricidad · Proyectos"
      title={<>PROYECTOS<br />ELÉCTRICOS</>}
      intro="Desarrollamos proyectos eléctricos para empresas, oficinas, comercio e industria liviana en Santiago: desde el diseño y los planos hasta la ejecución y la certificación SEC, con un solo responsable de principio a fin."
      photos={['/proyecto-1.jpg']}
      bullets={[
        'Diseño y planos de instalaciones eléctricas',
        'Ejecución de proyectos comerciales e industriales',
        'Tableros de distribución y protecciones',
        'Memorias de cálculo y dimensionamiento',
        'Coordinación de obra y plazos',
        'Certificación SEC y recepción',
      ]}
      bodyTitle="Cómo trabajamos un proyecto"
      body={[
        'Un proyecto eléctrico bien hecho parte del diseño: definir cargas, circuitos, tableros y protecciones según el uso real del espacio y la normativa vigente. Elaboramos los planos y el dimensionamiento, y coordinamos la ejecución para que la obra avance en plazo y sin improvisaciones.',
        'Ejecutamos instalaciones para oficinas, locales, bodegas e industria liviana: canalizaciones, tableros de distribución, iluminación, fuerza y respaldo. Al terminar, tramitamos la certificación SEC que deja la instalación declarada y en regla.',
        'Al ser los mismos que diseñan, ejecutan y certifican, tienes un solo responsable del resultado, sin tener que coordinar varios proveedores.',
      ]}
      features={[
        { title: 'De la idea a la obra', desc: 'Diseño, planos, ejecución y certificación con un solo responsable.' },
        { title: 'Bien dimensionado', desc: 'Memorias de cálculo y protecciones acordes al uso real.' },
        { title: 'En plazo', desc: 'Coordinamos la obra para cumplir los tiempos acordados.' },
        { title: 'En regla', desc: 'Certificación SEC y recepción de la instalación.' },
      ]}
      faqs={[
        { q: '¿Hacen los planos y el proyecto, no solo la instalación?', a: 'Sí. Desarrollamos el diseño, los planos y el dimensionamiento, y luego ejecutamos y certificamos. También podemos ejecutar proyectos ya diseñados por terceros.' },
        { q: '¿Trabajan con constructoras y empresas?', a: 'Sí, realizamos proyectos para constructoras, oficinas, comercio e industria liviana, coordinando la obra y los plazos.' },
        { q: '¿Incluye la certificación SEC?', a: 'Sí, al terminar tramitamos la certificación correspondiente para dejar la instalación declarada y en regla.' },
        { q: '¿Pueden integrar energía solar al proyecto?', a: 'Sí. Si el proyecto lo requiere, integramos generación solar, baterías o puntos de carga de autos eléctricos como parte de la misma instalación.' },
      ]}
      waText="Hola InnVolt, necesito un proyecto eléctrico para mi empresa en Santiago"
    />
  );
}
