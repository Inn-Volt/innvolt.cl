import type { Metadata } from 'next';
import ServiceLanding from '../components/ServiceLanding';

export const metadata: Metadata = {
  title: 'Mantención Eléctrica en Santiago | Preventiva y Correctiva',
  description: 'Mantención eléctrica preventiva y correctiva en Santiago para empresas, edificios y hogares. Revisión de tableros, termografía, reparación de fallas y contratos de mantención. Técnicos SEC.',
  alternates: { canonical: '/mantencion-electrica' },
  openGraph: {
    title: 'Mantención Eléctrica en Santiago | INNVOLT',
    description: 'Mantención preventiva y correctiva de instalaciones eléctricas para empresas, edificios y hogares.',
    url: 'https://innvolt.cl/mantencion-electrica',
    type: 'website',
  },
};

export default function Page() {
  return (
    <ServiceLanding
      slug="mantencion-electrica"
      serviceName="Mantención eléctrica preventiva y correctiva en Santiago"
      label="Mantención eléctrica"
      title={<>MANTENCIÓN<br />ELÉCTRICA</>}
      intro="Mantención eléctrica preventiva y correctiva para empresas, edificios, comercios y hogares en Santiago. Anticipamos fallas, reducimos riesgos y mantenemos tu instalación operativa y segura."
      bullets={[
        'Mantención preventiva programada',
        'Reparación de fallas y cortes (correctiva)',
        'Revisión y ajuste de tableros y protecciones',
        'Termografía para detectar puntos calientes',
        'Medición de consumos y eficiencia',
        'Contratos de mantención para empresas y comunidades',
      ]}
      bodyTitle="En qué consiste"
      body={[
        'La mayoría de las fallas eléctricas se pueden evitar. Una instalación sin mantención acumula conexiones flojas, protecciones desgastadas y puntos calientes que terminan en cortes, daño de equipos o incendios. La mantención preventiva detecta esos problemas antes de que ocurran.',
        'En INNVOLT ofrecemos planes de mantención para empresas, edificios, comunidades y hogares: revisamos tableros, medimos cargas, ajustamos conexiones, aplicamos termografía para detectar recalentamientos y dejamos un informe con el estado de tu instalación y recomendaciones. También atendemos mantención correctiva cuando ya hay una falla.',
        'Para clientes empresariales trabajamos con contratos de mantención periódica, con visitas programadas y prioridad de respuesta ante emergencias, para que tu operación no se detenga.',
      ]}
      features={[
        { title: 'Prevención real', desc: 'Detectamos fallas antes de que corten tu energía o dañen equipos.' },
        { title: 'Informe claro', desc: 'Entregamos estado de la instalación y recomendaciones priorizadas.' },
        { title: 'Respuesta rápida', desc: 'Atención el mismo día y prioridad para clientes con contrato.' },
        { title: 'Continuidad', desc: 'Coordinamos las visitas para no detener tu operación.' },
      ]}
      faqs={[
        { q: '¿Cada cuánto conviene hacer mantención?', a: 'Depende del uso. En hogares, una revisión anual es razonable; en empresas, comercios e industria conviene un plan periódico (trimestral o semestral) según la carga y criticidad de la instalación.' },
        { q: '¿Qué es la termografía y para qué sirve?', a: 'Es una inspección con cámara térmica que detecta puntos calientes en tableros y conexiones (señal de sobrecarga o conexión floja) antes de que provoquen una falla o un incendio.' },
        { q: '¿Ofrecen contratos de mantención para empresas?', a: 'Sí. Diseñamos planes con visitas programadas, informes y prioridad de respuesta ante emergencias, adaptados a tu instalación.' },
        { q: '¿Atienden comunidades y edificios?', a: 'Sí, realizamos mantención de espacios comunes, tableros generales, iluminación y bombas para comunidades y administraciones.' },
      ]}
      photos={['/mantencion-1.jpg']}
      waText="Hola InnVolt, quiero cotizar mantención eléctrica en Santiago"
    />
  );
}
