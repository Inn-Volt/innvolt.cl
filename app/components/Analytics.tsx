'use client';

import Script from 'next/script';
import { useEffect } from 'react';

/*
  Google Analytics 4 + rastreo de conversiones.
  Propiedad "InnVolt" (413358066), flujo web innvolt.cl → ID de medición G-TK9XJFQ2V5.
  El ID es público (va en el HTML); se puede sobrescribir con NEXT_PUBLIC_GA_ID.
  En desarrollo (localhost) no se envían datos, para no ensuciar las estadísticas.

  Eventos que registra automáticamente:
   - 'whatsapp_click'  → cada clic a un enlace wa.me / WhatsApp
   - 'call_click'      → clic a un enlace tel:
   - 'email_click'     → clic a un enlace mailto:
   - 'generate_lead'   → envío exitoso del formulario (disparado desde ContactForm)
*/

const GA_ID = process.env.NODE_ENV === 'production' ? (process.env.NEXT_PUBLIC_GA_ID || 'G-TK9XJFQ2V5') : '';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export default function Analytics() {
  useEffect(() => {
    // Elimina service workers antiguos (p.ej. de un ERP previo en este mismo puerto/dominio)
    // que podrían redirigir a /login o servir contenido cacheado que no corresponde.
    if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations()
        .then(regs => regs.forEach(r => r.unregister()))
        .catch(() => {});
    }

    if (!GA_ID) return;
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.('a');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (/wa\.me|api\.whatsapp\.com|whatsapp/i.test(href)) {
        window.gtag?.('event', 'whatsapp_click', { link_url: href });
      } else if (href.startsWith('tel:')) {
        window.gtag?.('event', 'call_click', { link_url: href });
      } else if (href.startsWith('mailto:')) {
        window.gtag?.('event', 'email_click', { link_url: href });
      }
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
