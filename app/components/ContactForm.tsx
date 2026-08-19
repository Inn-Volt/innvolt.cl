'use client';

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

/*
  ────────────────────────────────────────────────────────────────
  ENVÍO DEL FORMULARIO — EmailJS (https://www.emailjs.com)
  Permite diseñar la plantilla HTML del correo a tu gusto.

  ⚠️ PASOS PARA ACTIVARLO (con tu propia cuenta, para recibir en innvolt.cl@gmail.com):
  1. Crea una cuenta gratis en https://www.emailjs.com con innvolt.cl@gmail.com
  2. Email Services → Add Service → conecta tu Gmail (innvolt.cl@gmail.com). Copia el SERVICE ID.
  3. Email Templates → Create Template:
       - En "To Email" pon: innvolt.cl@gmail.com   ← ESTO define el destino
       - En "Reply To" pon: {{reply_to}}
       - Diseña el cuerpo usando estas variables:
         {{nombre}} {{empresa}} {{correo}} {{telefono}} {{servicio}} {{mensaje}}
       - Copia el TEMPLATE ID.
  4. Account → General → copia la PUBLIC KEY.
  5. Pega los 3 valores abajo (o como NEXT_PUBLIC_EMAILJS_* en .env.local).
  6. En EmailJS: Account → Security → agrega tu dominio (innvolt.cl) a los permitidos.
  ────────────────────────────────────────────────────────────────
*/
const EMAILJS_SERVICE = process.env.NEXT_PUBLIC_EMAILJS_SERVICE || 'service_mlfn0ko';
// Plantilla 1 — notificación a INNVOLT (To Email = innvolt.cl@gmail.com)
const EMAILJS_TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE || 'template_sslbsye';
// Plantilla 2 — auto-respuesta al cliente (To Email = {{correo}})
const EMAILJS_AUTOREPLY_TEMPLATE = process.env.NEXT_PUBLIC_EMAILJS_AUTOREPLY || 'template_831bjze';
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_KEY || '1QTEELvSjsm0CRIff';

// Normaliza un teléfono chileno a formato wa.me (solo dígitos, con código país 56).
function toWaNumber(raw: unknown): string {
  const d = String(raw || '').replace(/\D/g, ''); // deja solo dígitos
  if (!d) return '';
  if (d.startsWith('56')) return d;                      // ya trae código país
  if (d.length === 9 && d.startsWith('9')) return '56' + d; // móvil 9XXXXXXXX
  if (d.length === 8) return '569' + d;                  // 8 dígitos → asume móvil
  return d;                                              // fallback: lo que venga
}

export default function ContactForm() {
  const ref = useRef<HTMLFormElement>(null);
  const [st, setSt] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!ref.current) return;

    const fd = new FormData(ref.current);

    // Anti-spam: si el honeypot viene relleno, es un bot → simulamos éxito y salimos.
    if (fd.get('company_website')) {
      ref.current.reset();
      setSt('ok');
      setTimeout(() => setSt('idle'), 6000);
      return;
    }

    const correo = String(fd.get('correo') || '');
    const telefono = String(fd.get('telefono') || '');

    const params = {
      nombre: fd.get('nombre'),
      empresa: fd.get('empresa'),
      correo,
      telefono,
      telefono_wsp: toWaNumber(telefono), // teléfono listo para wa.me
      servicio: fd.get('servicio'),
      mensaje: fd.get('mensaje'),
      reply_to: correo,
    };

    setSt('sending');
    try {
      // 1) Notificación a INNVOLT (crítico)
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, params, { publicKey: EMAILJS_PUBLIC_KEY });

      // 2) Auto-respuesta al cliente (best-effort: si falla, no afecta el éxito del envío)
      emailjs
        .send(EMAILJS_SERVICE, EMAILJS_AUTOREPLY_TEMPLATE, params, { publicKey: EMAILJS_PUBLIC_KEY })
        .catch(() => {});

      ref.current.reset();
      setSt('ok');
      // Evento de conversión para Google Analytics (si está configurado)
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', { method: 'form' });
      }
      setTimeout(() => setSt('idle'), 6000);
    } catch {
      setSt('err');
      setTimeout(() => setSt('idle'), 6000);
    }
  }

  return (
    <form ref={ref} onSubmit={send} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

      {/* Honeypot anti-spam: oculto para humanos, los bots lo rellenan */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />

      <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <Field label="Nombre *" name="nombre" required placeholder="Tu nombre" />
        <Field label="Empresa" name="empresa" placeholder="Opcional" />
      </div>

      <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <Field label="Correo *" name="correo" type="email" required placeholder="tu@correo.cl" />
        <Field label="Teléfono" name="telefono" type="tel" placeholder="+56 9..." />
      </div>

      <div className="form-group">
        <label className="form-label">Servicio</label>
        <select name="servicio" className="form-input" style={{ color: 'rgba(255,255,255,0.55)' }}>
          <option>Electricidad / Certificación SEC</option>
          <option>Tableros / Mantención eléctrica</option>
          <option>Cámaras CCTV / Control de acceso</option>
          <option>Domótica / Automatización</option>
          <option>Redes / Cableado estructurado</option>
          <option>Pantallas LED</option>
          <option>Otro servicio</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Mensaje *</label>
        <textarea name="mensaje" required rows={4} placeholder="Cuéntanos sobre tu proyecto..."
          className="form-input" style={{ resize: 'vertical' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <button type="submit" disabled={st === 'sending'} className="btn btn-primary"
          style={{ justifyContent: 'center', opacity: st === 'sending' ? 0.65 : 1, cursor: st === 'sending' ? 'not-allowed' : 'pointer' }}>
          {st === 'sending' ? 'ENVIANDO...' : '✉ ENVIAR'}
        </button>
        <a href="https://wa.me/56966575447" target="_blank" rel="noopener noreferrer"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', background: '#25D366', color: '#fff', fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.9rem', textDecoration: 'none', clipPath: 'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))' }}>
          <img src="/whatsapp.svg" alt="" width={14} height={14} style={{ filter: 'brightness(0) invert(1)' }} />
          WHATSAPP
        </a>
      </div>

      <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>
        Al enviar aceptas que InnVolt te contacte para responder tu solicitud. No compartimos tus datos con terceros.
      </p>

      {st === 'ok' && (
        <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', padding: '0.9rem 1rem', color: '#86efac', fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' }}>
          ✓ MENSAJE ENVIADO — TE CONTACTAMOS A LA BREVEDAD
        </div>
      )}
      {st === 'err' && (
        <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', padding: '0.9rem 1rem', color: '#fca5a5', fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' }}>
          ERROR AL ENVIAR — <a href="https://wa.me/56966575447" style={{ color: 'var(--y)' }}>CONTÁCTANOS POR WHATSAPP</a>
        </div>
      )}
    </form>
  );
}

function Field({ label, name, type = 'text', required = false, placeholder = '' }: {
  label: string; name: string; type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input name={name} type={type} required={required} placeholder={placeholder} className="form-input"
        onFocus={e => (e.target as HTMLElement).style.borderColor = 'var(--y)'}
        onBlur={e => (e.target as HTMLElement).style.borderColor = 'rgba(255,198,0,0.08)'} />
    </div>
  );
}
