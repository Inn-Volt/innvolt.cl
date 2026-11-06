'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { sendLead } from './emailjs';

/*
  Cotización rápida al final de cada página de servicio: solo nombre y teléfono obligatorios
  (sin correo), para quien llega desde Google y no quiere ir a otra página ni escribir mucho.
*/
export default function QuickQuote({ servicio, pagina }: { servicio: string; pagina: string }) {
  const ref = useRef<HTMLFormElement>(null);
  const [st, setSt] = useState<'idle' | 'sending' | 'ok' | 'err'>('idle');

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!ref.current) return;
    const fd = new FormData(ref.current);
    if (fd.get('company_website')) { ref.current.reset(); setSt('ok'); return; }   // honeypot

    setSt('sending');
    try {
      const detalle = String(fd.get('detalle') || '').trim();
      await sendLead({
        nombre: String(fd.get('nombre') || ''),
        telefono: String(fd.get('telefono') || ''),
        comuna: String(fd.get('comuna') || ''),
        servicio,
        mensaje: `Cotización rápida desde ${pagina}\n\n${detalle || '(Sin detalle: pidió que lo contactemos)'}`,
      });
      ref.current.reset();
      setSt('ok');
      window.gtag?.('event', 'generate_lead', { method: 'quick_form', service: servicio });
    } catch {
      setSt('err');
    }
  }

  return (
    <form ref={ref} onSubmit={send} className="iv-card iv-qq-form">
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
      <div className="iv-row">
        <div className="iv-field">
          <label className="iv-label" htmlFor="qq-nombre">Nombre *</label>
          <input id="qq-nombre" name="nombre" required autoComplete="name" className="iv-input" placeholder="Tu nombre" />
        </div>
        <div className="iv-field">
          <label className="iv-label" htmlFor="qq-telefono">Teléfono / WhatsApp *</label>
          <input id="qq-telefono" name="telefono" type="tel" required autoComplete="tel" inputMode="tel"
            pattern="[\d\s+()\-]{8,}" title="Escribe un teléfono de al menos 8 dígitos" className="iv-input" placeholder="+56 9 ..." />
        </div>
      </div>
      <div className="iv-field">
        <label className="iv-label" htmlFor="qq-comuna">Comuna</label>
        <input id="qq-comuna" name="comuna" autoComplete="address-level2" className="iv-input" placeholder="Ej: Maipú, Villarrica" />
      </div>
      <div className="iv-field">
        <label className="iv-label" htmlFor="qq-detalle">¿Qué necesitas? <span className="iv-opt">(opcional)</span></label>
        <textarea id="qq-detalle" name="detalle" rows={3} className="iv-input" placeholder="Cuéntanos brevemente tu caso" />
      </div>
      <button type="submit" disabled={st === 'sending'} className="iv-btn">
        {st === 'sending' ? 'Enviando…' : 'Quiero que me contacten'}
      </button>
      <p className="iv-legal">
        Usamos tus datos solo para responder tu solicitud. <Link href="/privacidad">Política de privacidad</Link>.
      </p>
      <div aria-live="polite">
        {st === 'ok' && <div className="iv-alert iv-alert-ok">✓ Recibimos tus datos. Te contactaremos para coordinar.</div>}
        {st === 'err' && <div className="iv-alert iv-alert-err">No pudimos enviarlo. Escríbenos por WhatsApp al +56 9 6657 5447.</div>}
      </div>
    </form>
  );
}
