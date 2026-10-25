import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Shell } from '../_site/ui';
import { SITE } from '../_site/content';

/*
  Aviso de privacidad redactado según la Ley 19.628 y la Ley 21.719 (protección de datos personales,
  vigente desde el 1 de diciembre de 2026). Recomendación: que un abogado lo revise antes de la entrada
  en vigencia de la Ley 21.719, y actualizar la razón social cuando cambie (InnVolt Chile SpA).
*/

const ACTUALIZADO = '25 de octubre de 2026';

export const metadata: Metadata = {
  title: 'Política de privacidad',
  description: 'Cómo InnVolt trata los datos personales que nos entregas a través del sitio web, el formulario de contacto y WhatsApp.',
  alternates: { canonical: '/privacidad' },
};

export default function Page() {
  return (
    <Shell>
      <section className="iv-page-hero">
        <div className="iv-container">
          <Link href="/" className="iv-crumb"><ArrowLeft size={13} /> Inicio</Link>
          <h1>Política de privacidad</h1>
          <p className="iv-lead">Última actualización: {ACTUALIZADO}.</p>
        </div>
      </section>

      <section className="iv-section">
        <div className="iv-container iv-prose">
          <h3>1. Quién es responsable de tus datos</h3>
          <p>
            {SITE.legalName} («InnVolt») es responsable del tratamiento de los datos personales que nos entregas a través de
            innvolt.cl. Puedes contactarnos en <a href={`mailto:${SITE.email}`}>{SITE.email}</a> o al {SITE.phoneLabel}.
          </p>

          <h3>2. Qué datos recopilamos</h3>
          <ul>
            <li><strong>Formulario de contacto:</strong> nombre, empresa (opcional), correo electrónico, teléfono, comuna, tipo de proyecto y el mensaje que nos escribas.</li>
            <li><strong>WhatsApp, correo o teléfono:</strong> la información que decidas enviarnos, incluidas fotos de tu instalación.</li>
            <li><strong>Navegación:</strong> si usamos herramientas de medición (como Google Analytics), datos técnicos y de uso del sitio, de forma agregada.</li>
          </ul>

          <h3>3. Para qué los usamos</h3>
          <ul>
            <li>Responder tus consultas y preparar cotizaciones.</li>
            <li>Coordinar visitas técnicas y la ejecución de los trabajos que contrates.</li>
            <li>Cumplir obligaciones legales y tributarias, como la emisión de boletas y facturas.</li>
            <li>Mejorar el sitio web a partir de estadísticas de uso agregadas.</li>
          </ul>
          <p>No vendemos ni cedemos tus datos a terceros, y no los usamos para enviarte publicidad sin tu consentimiento.</p>

          <h3>4. Base para tratarlos</h3>
          <p>
            Tratamos tus datos con tu consentimiento, que entregas al enviar el formulario o al escribirnos, y en la medida necesaria
            para preparar y ejecutar los servicios que nos solicitas.
          </p>

          <h3>5. Con quién los compartimos</h3>
          <p>
            Usamos proveedores que nos prestan servicios tecnológicos y que pueden tratar datos por cuenta nuestra, en algunos casos
            fuera de Chile: EmailJS (envío de los mensajes del formulario), Google (correo electrónico y, si está activa, analítica
            web), Netlify (alojamiento del sitio) y WhatsApp (mensajería). Solo acceden a lo necesario para prestar su servicio.
          </p>

          <h3>6. Cuánto tiempo los conservamos</h3>
          <p>
            Durante el tiempo necesario para responder tu solicitud y gestionar la relación comercial, y luego por el plazo que exijan
            las obligaciones legales y tributarias aplicables.
          </p>

          <h3>7. Tus derechos</h3>
          <p>
            Puedes solicitar el acceso, la rectificación, la supresión de tus datos u oponerte a su tratamiento. Desde la entrada en
            vigencia de la Ley 21.719 también podrás ejercer los derechos de portabilidad y de bloqueo. Para hacerlo, escríbenos a{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a> indicando tu solicitud; te responderemos dentro de los plazos legales.
          </p>

          <h3>8. Seguridad</h3>
          <p>Aplicamos medidas razonables para proteger tus datos frente a accesos no autorizados, pérdida o alteración.</p>

          <h3>9. Cambios a esta política</h3>
          <p>Podemos actualizar esta política. Publicaremos la versión vigente en esta página, con su fecha de actualización.</p>
        </div>
      </section>
    </Shell>
  );
}
