'use client';

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactForm() {
  const ref  = useRef<HTMLFormElement>(null);
  const [st, setSt] = useState<'idle'|'sending'|'ok'|'err'>('idle');

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!ref.current) return;
<<<<<<< HEAD

    // Anti-spam: si el honeypot viene relleno, es un bot → simulamos éxito y salimos.
    const trap = ref.current.querySelector<HTMLInputElement>('input[name="company_website"]');
    if (trap && trap.value) {
      ref.current.reset();
      setSt('ok');
      setTimeout(() => setSt('idle'), 6000);
      return;
    }

=======
>>>>>>> 60c11a8cb62944ae79e5955fccc63ad6b8e1d0e1
    setSt('sending');
    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE  || 'service_2eu64xv',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE || 'template_yq0u1gc',
        ref.current,
        process.env.NEXT_PUBLIC_EMAILJS_KEY      || '06SfJx0u03W8m5lC-'
      );
      ref.current.reset();
      setSt('ok');
<<<<<<< HEAD
      // Evento de conversión para Google Analytics (si está configurado)
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', { method: 'form' });
      }
=======
>>>>>>> 60c11a8cb62944ae79e5955fccc63ad6b8e1d0e1
      setTimeout(() => setSt('idle'), 6000);
    } catch {
      setSt('err');
      setTimeout(() => setSt('idle'), 6000);
    }
  }

  return (
    <form ref={ref} onSubmit={send} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

<<<<<<< HEAD
      {/* Honeypot anti-spam: oculto para humanos, los bots lo rellenan */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }}
      />

=======
>>>>>>> 60c11a8cb62944ae79e5955fccc63ad6b8e1d0e1
      <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <Field label="Nombre *" name="user_name" required placeholder="Tu nombre" />
        <Field label="Empresa" name="user_company" placeholder="Opcional" />
      </div>

      <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <Field label="Correo *" name="user_email" type="email" required placeholder="tu@correo.cl" />
        <Field label="Teléfono" name="user_phone" type="tel" placeholder="+56 9..." />
      </div>

      <div className="form-group">
        <label className="form-label">Servicio</label>
        <select name="user_subject" className="form-input" style={{ color: 'rgba(255,255,255,0.55)' }}>
          <option>Electricidad General / SEC</option>
          <option>Domótica y Automatización</option>
          <option>Redes y Cámaras</option>
          <option>Otro servicio</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Mensaje *</label>
        <textarea name="message" required rows={4} placeholder="Cuéntanos sobre tu proyecto..."
          className="form-input" style={{ resize: 'vertical' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <button type="submit" disabled={st === 'sending'} className="btn btn-primary"
          style={{ justifyContent: 'center', opacity: st === 'sending' ? 0.65 : 1, cursor: st === 'sending' ? 'not-allowed' : 'pointer' }}>
          {st === 'sending' ? 'ENVIANDO...' : '✉ ENVIAR'}
        </button>
<<<<<<< HEAD
        <a href="https://wa.me/56989203902" target="_blank" rel="noopener noreferrer"
=======
        <a href="https://wa.me/56966575447" target="_blank" rel="noopener noreferrer"
>>>>>>> 60c11a8cb62944ae79e5955fccc63ad6b8e1d0e1
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', background: '#25D366', color: '#fff', fontFamily: 'var(--font-display)', fontSize: '0.8rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.9rem', textDecoration: 'none', clipPath: 'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))' }}>
          <img src="/whatsapp.svg" alt="" width={14} height={14} style={{ filter: 'brightness(0) invert(1)' }} />
          WHATSAPP
        </a>
      </div>

<<<<<<< HEAD
      <p style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', lineHeight: 1.5 }}>
        Al enviar aceptas que InnVolt te contacte para responder tu solicitud. No compartimos tus datos con terceros.
      </p>

=======
>>>>>>> 60c11a8cb62944ae79e5955fccc63ad6b8e1d0e1
      {st === 'ok' && (
        <div style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', padding: '0.9rem 1rem', color: '#86efac', fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' }}>
          ✓ MENSAJE ENVIADO — TE CONTACTAMOS A LA BREVEDAD
        </div>
      )}
      {st === 'err' && (
        <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', padding: '0.9rem 1rem', color: '#fca5a5', fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em' }}>
<<<<<<< HEAD
          ERROR AL ENVIAR — <a href="https://wa.me/56989203902" style={{ color: 'var(--y)' }}>CONTÁCTANOS POR WHATSAPP</a>
=======
          ERROR AL ENVIAR — <a href="https://wa.me/56966575447" style={{ color: 'var(--y)' }}>CONTÁCTANOS POR WHATSAPP</a>
>>>>>>> 60c11a8cb62944ae79e5955fccc63ad6b8e1d0e1
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
