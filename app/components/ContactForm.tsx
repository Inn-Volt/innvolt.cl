'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import emailjs from '@emailjs/browser';

/*
  ────────────────────────────────────────────────────────────────
  ENVÍO DEL FORMULARIO — EmailJS (https://www.emailjs.com)
  Plantillas en la cuenta de innvolt.cl@gmail.com. Variables disponibles:
    {{nombre}} {{empresa}} {{correo}} {{telefono}} {{telefono_wsp}} {{servicio}} {{comuna}} {{mensaje}}
  La comuna también va al inicio de {{mensaje}}, para que llegue aunque la plantilla no use {{comuna}}.
  Seguridad: en EmailJS → Account → Security, dejar permitido solo el dominio innvolt.cl.
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
  const d = String(raw || '').replace(/\D/g, '');
  if (!d) return '';
  if (d.startsWith('56')) return d;
  if (d.length === 9 && d.startsWith('9')) return '56' + d;
  if (d.length === 8) return '569' + d;
  return d;
}

const TIPOS: { grupo: string; items: string[] }[] = [
  {
    grupo: 'Electricidad y energía',
    items: [
      'Instalación eléctrica', 'Tablero eléctrico', 'Mantención o reparación', 'Certificación SEC (TE1)',
      'Energía solar', 'Eficiencia energética', 'Evaluación / proyecto eléctrico', 'Aumento de capacidad / empalme',
      'Baterías / respaldo de energía', 'Cargador de auto eléctrico', 'Urgencia eléctrica',
    ],
  },
  { grupo: 'Tecnología', items: ['Automatización / domótica', 'CCTV / control de acceso', 'Redes / Wi-Fi', 'Pantallas LED'] },
];

export default function ContactForm({ defaultService }: { defaultService?: string }) {
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
      return;
    }

    const correo = String(fd.get('correo') || '');
    const telefono = String(fd.get('telefono') || '');
    const comuna = String(fd.get('comuna') || '').trim();
    const mensaje = String(fd.get('mensaje') || '');

    const params = {
      nombre: fd.get('nombre'),
      empresa: fd.get('empresa'),
      correo,
      telefono,
      telefono_wsp: toWaNumber(telefono),
      servicio: fd.get('servicio'),
      comuna,
      mensaje: comuna ? `Comuna: ${comuna}\n\n${mensaje}` : mensaje,
      reply_to: correo,
    };

    setSt('sending');
    try {
      // 1) Notificación a INNVOLT (crítico)
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, params, { publicKey: EMAILJS_PUBLIC_KEY });
      // 2) Auto-respuesta al cliente (best-effort: si falla, no afecta el éxito del envío)
      emailjs.send(EMAILJS_SERVICE, EMAILJS_AUTOREPLY_TEMPLATE, params, { publicKey: EMAILJS_PUBLIC_KEY }).catch(() => {});

      ref.current.reset();
      setSt('ok');
      window.gtag?.('event', 'generate_lead', { method: 'form', service: String(params.servicio || '') });
    } catch {
      setSt('err');
    }
  }

  return (
    <form ref={ref} onSubmit={send} className="iv-form" noValidate={false}>
      {/* Honeypot anti-spam: oculto para humanos, los bots lo rellenan */}
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />

      <div className="iv-row">
        <Field label="Nombre *" name="nombre" required placeholder="Tu nombre" autoComplete="name" />
        <Field label="Empresa" name="empresa" placeholder="Opcional" autoComplete="organization" />
      </div>
      <div className="iv-row">
        <Field label="Correo *" name="correo" type="email" required placeholder="tu@correo.cl" autoComplete="email" />
        <Field label="Teléfono / WhatsApp" name="telefono" type="tel" placeholder="+56 9..." autoComplete="tel" />
      </div>
      <div className="iv-row">
        <Field label="Comuna" name="comuna" placeholder="Ej: Maipú, Villarrica" autoComplete="address-level2" />
        <div className="iv-field">
          <label className="iv-label" htmlFor="cf-servicio">Tipo de proyecto</label>
          <select id="cf-servicio" name="servicio" className="iv-input" defaultValue={defaultService}>
            {TIPOS.map(g => (
              <optgroup key={g.grupo} label={g.grupo}>
                {g.items.map(i => <option key={i}>{i}</option>)}
              </optgroup>
            ))}
            <option>Otro servicio</option>
          </select>
        </div>
      </div>

      <div className="iv-field">
        <label className="iv-label" htmlFor="cf-mensaje">Mensaje *</label>
        <textarea id="cf-mensaje" name="mensaje" required rows={4} placeholder="Cuéntanos sobre tu proyecto..." className="iv-input" />
        <p className="iv-hint">¿Tienes fotos de la instalación? Envíalas por WhatsApp: nos ayudan a evaluar más rápido.</p>
      </div>

      <div className="iv-form-actions">
        <button type="submit" disabled={st === 'sending'} className="iv-btn">
          {st === 'sending' ? 'Enviando…' : 'Enviar solicitud'}
        </button>
        <a href="https://wa.me/56966575447" target="_blank" rel="noopener noreferrer" className="iv-btn iv-btn-wa">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/whatsapp.svg" alt="" width={15} height={15} /> WhatsApp
        </a>
      </div>

      <p className="iv-legal">
        Al enviar aceptas que InnVolt use tus datos solo para responder tu solicitud. No los compartimos con terceros.
        Más información en nuestra <Link href="/privacidad">política de privacidad</Link>.
      </p>

      <div aria-live="polite">
        {st === 'ok' && <div className="iv-alert iv-alert-ok">✓ Mensaje enviado. Te contactaremos a la brevedad.</div>}
        {st === 'err' && (
          <div className="iv-alert iv-alert-err">
            No pudimos enviar el mensaje. Escríbenos por <a href="https://wa.me/56966575447">WhatsApp</a> o a innvolt.cl@gmail.com.
          </div>
        )}
      </div>
    </form>
  );
}

function Field({ label, name, type = 'text', required = false, placeholder = '', autoComplete }: {
  label: string; name: string; type?: string; required?: boolean; placeholder?: string; autoComplete?: string;
}) {
  return (
    <div className="iv-field">
      <label className="iv-label" htmlFor={`cf-${name}`}>{label}</label>
      <input id={`cf-${name}`} name={name} type={type} required={required} placeholder={placeholder} autoComplete={autoComplete} className="iv-input" />
    </div>
  );
}
