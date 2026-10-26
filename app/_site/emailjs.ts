import emailjs from '@emailjs/browser';

/*
  Envío de solicitudes por EmailJS (cuenta innvolt.cl@gmail.com). Lo usan el formulario de contacto y el simulador solar.
  Plantillas: {{nombre}} {{empresa}} {{correo}} {{telefono}} {{telefono_wsp}} {{servicio}} {{comuna}} {{mensaje}}
  Seguridad: en EmailJS → Account → Security, dejar permitido solo el dominio innvolt.cl.
*/
const SERVICE = process.env.NEXT_PUBLIC_EMAILJS_SERVICE || 'service_mlfn0ko';
const TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE || 'template_sslbsye';          // notificación a InnVolt
const AUTOREPLY = process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY || 'template_831bjze';        // respuesta automática al cliente
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_KEY || '1QTEELvSjsm0CRIff';

export type Lead = {
  nombre: string;
  empresa?: string;
  correo: string;
  telefono?: string;
  servicio: string;
  comuna?: string;
  mensaje: string;
};

// Normaliza un teléfono chileno a formato wa.me (solo dígitos, con código país 56).
export function toWaNumber(raw: unknown): string {
  const d = String(raw || '').replace(/\D/g, '');
  if (!d) return '';
  if (d.startsWith('56')) return d;
  if (d.length === 9 && d.startsWith('9')) return '56' + d;
  if (d.length === 8) return '569' + d;
  return d;
}

/* Envía la notificación a InnVolt (si falla, lanza error) y la respuesta automática al cliente (best-effort). */
export async function sendLead(lead: Lead) {
  const comuna = (lead.comuna || '').trim();
  const params = {
    nombre: lead.nombre,
    empresa: lead.empresa || '',
    correo: lead.correo,
    telefono: lead.telefono || '',
    telefono_wsp: toWaNumber(lead.telefono),
    servicio: lead.servicio,
    comuna,
    // La comuna va también dentro del mensaje para que llegue aunque la plantilla no use {{comuna}}
    mensaje: comuna ? `Comuna: ${comuna}\n\n${lead.mensaje}` : lead.mensaje,
    reply_to: lead.correo,
  };
  await emailjs.send(SERVICE, TEMPLATE, params, { publicKey: PUBLIC_KEY });
  emailjs.send(SERVICE, AUTOREPLY, params, { publicKey: PUBLIC_KEY }).catch(() => {});
}
