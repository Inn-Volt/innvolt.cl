import type { Metadata } from 'next';
import ServiceLanding from '../components/ServiceLanding';

export const metadata: Metadata = {
  title: 'Electricista de Urgencia 24h en Santiago',
  description: 'Electricista de urgencia en Santiago. Atendemos cortes de luz, fallas, cortocircuitos y emergencias eléctricas el mismo día. Técnicos certificados SEC. Llama ahora.',
  alternates: { canonical: '/urgencias-electricas-santiago' },
  openGraph: {
    title: 'Electricista de Urgencia 24h en Santiago | INNVOLT',
    description: 'Cortes, fallas y emergencias eléctricas atendidas el mismo día en Santiago. Certificados SEC.',
    url: 'https://innvolt.cl/urgencias-electricas-santiago',
    type: 'website',
  },
};

export default function Page() {
  return (
    <ServiceLanding
      slug="urgencias-electricas-santiago"
      serviceName="Electricista de urgencia 24h en Santiago"
      label="Urgencias eléctricas · 24h"
      title={<>ELECTRICISTA<br />DE URGENCIA</>}
      intro="¿Se cortó la luz, hay olor a quemado o el tablero está caliente? No lo dejes pasar: son señales de riesgo. Somos electricistas certificados SEC y atendemos urgencias eléctricas en Santiago el mismo día. Llámanos o escríbenos por WhatsApp y resolvemos rápido y seguro."
      bullets={[
        'Cortes de luz totales o parciales',
        'Cortocircuitos y tableros que saltan',
        'Olor a quemado o enchufes recalentados',
        'Fallas tras lluvia o sobretensión',
        'Empalmes y automáticos dañados',
        'Diagnóstico y reparación el mismo día',
      ]}
      features={[
        { title: 'Atención hoy', desc: 'Respondemos rápido por teléfono y WhatsApp, y priorizamos las emergencias.' },
        { title: 'Seguro y certificado', desc: 'Técnicos autorizados SEC: dejamos la falla resuelta y la instalación segura.' },
        { title: 'Precio claro', desc: 'Te decimos qué pasa y cuánto cuesta antes de intervenir. Sin sorpresas.' },
        { title: 'Con garantía', desc: 'Respaldo por escrito sobre la reparación, con boleta o factura.' },
      ]}
      bodyTitle="Cuándo llamar a una urgencia"
      body={[
        'Una falla eléctrica no siempre puede esperar. Un corte total, un tablero que salta una y otra vez, olor a quemado, enchufes recalentados o chispas son señales de riesgo que conviene atender de inmediato, porque detrás puede haber un problema que derive en daño de equipos o incendio.',
        'En INNVOLT atendemos urgencias eléctricas el mismo día en Santiago. Cuando nos escribes o llamas, primero te damos indicaciones de seguridad (por ejemplo, cortar la energía desde el automático principal si hay olor a quemado), coordinamos la atención y diagnosticamos la falla para dejarla resuelta y la instalación segura.',
        'Por seguridad, ante chispas, olor a quemado o cables calientes, evita manipular la instalación y corta la energía desde el tablero mientras llegamos.',
      ]}
      faqs={[
        { q: '¿Atienden el mismo día?', a: 'Sí. Priorizamos las urgencias eléctricas y coordinamos la atención el mismo día. Escríbenos por WhatsApp o llámanos y te indicamos los pasos.' },
        { q: '¿Qué hago si hay olor a quemado o chispas?', a: 'Corta la energía desde el automático principal del tablero, no manipules la instalación y contáctanos de inmediato. Son señales de riesgo que deben revisarse cuanto antes.' },
        { q: '¿Por qué me saltan los automáticos seguido?', a: 'Suele ser sobrecarga (demasiados equipos en un circuito), un cortocircuito o una protección dañada. Diagnosticamos la causa real y la corregimos, no solo reponemos el automático.' },
        { q: '¿Dejan la instalación certificada tras la reparación?', a: 'Cuando el trabajo lo requiere, emitimos la documentación correspondiente y dejamos la instalación segura y conforme a la normativa vigente.' },
      ]}
      photos={['/urgencias-1.jpg']}
      waText="Hola InnVolt, tengo una URGENCIA eléctrica en Santiago"
    />
  );
}
