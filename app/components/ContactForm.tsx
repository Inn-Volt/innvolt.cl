'use client';

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactForm({ dark = false }: { dark?: boolean }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    setFormStatus('loading');
    const serviceID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE  || 'service_2eu64xv';
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE || 'template_yq0u1gc';
    const publicKey  = process.env.NEXT_PUBLIC_EMAILJS_KEY      || '06SfJx0u03W8m5lC-';
    try {
      await emailjs.sendForm(serviceID, templateID, formRef.current, publicKey);
      formRef.current.reset();
      setFormStatus('success');
      setTimeout(() => setFormStatus('idle'), 5000);
    } catch {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  const inputBase: React.CSSProperties = {
    width: '100%', borderRadius: '8px', padding: '0.85rem 1rem',
    fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box',
    fontFamily: "'DM Sans', sans-serif", transition: 'border-color 0.2s',
    background: dark ? 'rgba(255,255,255,0.05)' : '#f8fafc',
    border: dark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(13,21,32,0.1)',
    color: dark ? '#f1f5f9' : '#0d1520',
  };

  const labelBase: React.CSSProperties = {
    display: 'block', fontSize: '0.6rem', fontWeight: 700,
    textTransform: 'uppercase' as const, letterSpacing: '0.15em',
    color: dark ? 'rgba(255,255,255,0.3)' : '#94a3b8',
    marginBottom: '0.4rem', fontFamily: "'Space Mono', monospace",
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelBase}>Nombre *</label>
          <input name="user_name" required type="text" placeholder="Tu nombre" style={inputBase} />
        </div>
        <div>
          <label style={labelBase}>Empresa</label>
          <input name="user_company" type="text" placeholder="Opcional" style={inputBase} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelBase}>Correo *</label>
          <input name="user_email" required type="email" placeholder="tu@correo.cl" style={inputBase} />
        </div>
        <div>
          <label style={labelBase}>Teléfono</label>
          <input name="user_phone" type="tel" placeholder="+56 9..." style={inputBase} />
        </div>
      </div>

      <div>
        <label style={labelBase}>Servicio</label>
        <select name="user_subject" style={{ ...inputBase, color: dark ? 'rgba(255,255,255,0.6)' : '#475569' }}>
          <option>Electricidad General / SEC</option>
          <option>Domótica y Automatización</option>
          <option>Redes y Cámaras</option>
          <option>Otro servicio</option>
        </select>
      </div>

      <div>
        <label style={labelBase}>Mensaje *</label>
        <textarea name="message" required rows={4} placeholder="Cuéntanos sobre tu proyecto..."
          style={{ ...inputBase, resize: 'vertical' }} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <button type="submit" disabled={formStatus === 'loading'}
          style={{ background: '#ffc600', color: '#0d1520', fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.9rem', borderRadius: '8px', border: 'none', cursor: formStatus === 'loading' ? 'not-allowed' : 'pointer', opacity: formStatus === 'loading' ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.2s' }}>
          {formStatus === 'loading' ? 'Enviando...' : '✉ Enviar'}
        </button>
        <a href="https://wa.me/56989203902" target="_blank" rel="noopener noreferrer"
          style={{ background: '#25D366', color: '#fff', fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.9rem', borderRadius: '8px', textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.2s' }}>
          <img src="/whatsapp.svg" alt="" width={14} height={14} style={{ filter: 'brightness(0) invert(1)' }} />
          WhatsApp
        </a>
      </div>

      {formStatus === 'success' && (
        <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.25)', borderRadius: '8px', padding: '0.9rem 1rem', color: '#86efac', fontSize: '0.85rem', fontWeight: 600 }}>
          ✓ Mensaje enviado. Te contactamos a la brevedad.
        </div>
      )}
      {formStatus === 'error' && (
        <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '8px', padding: '0.9rem 1rem', color: '#fca5a5', fontSize: '0.85rem', fontWeight: 600 }}>
          Error al enviar. Escríbenos por <a href="https://wa.me/56989203902" style={{ color: '#ffc600' }}>WhatsApp</a>.
        </div>
      )}
    </form>
  );
}
