'use client';

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { CheckCircle, Mail } from 'lucide-react';

export default function ContactForm() {
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
    } catch (error) {
      console.error('Error:', error);
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 5000);
    }
  };

  return (
    <div className="bg-white rounded-[2rem] md:rounded-[3rem] p-6 md:p-12 lg:p-16 shadow-2xl">
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 md:space-y-5">

        {/* Nombre + Empresa */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Nombre *</label>
            <input name="user_name" required type="text"
              className="w-full bg-slate-50 border-none rounded-xl md:rounded-2xl p-3 md:p-4 text-sm focus:ring-2 focus:ring-[#ffc600] outline-none transition-all"
              placeholder="Tu nombre" />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Empresa</label>
            <input name="user_company" type="text"
              className="w-full bg-slate-50 border-none rounded-xl md:rounded-2xl p-3 md:p-4 text-sm focus:ring-2 focus:ring-[#ffc600] outline-none transition-all"
              placeholder="Nombre de empresa" />
          </div>
        </div>

        {/* Correo + Teléfono */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Correo *</label>
            <input name="user_email" required type="email"
              className="w-full bg-slate-50 border-none rounded-xl md:rounded-2xl p-3 md:p-4 text-sm focus:ring-2 focus:ring-[#ffc600] outline-none transition-all"
              placeholder="tu@correo.cl" />
          </div>
          <div className="space-y-2">
            <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Teléfono</label>
            <input name="user_phone" type="tel"
              className="w-full bg-slate-50 border-none rounded-xl md:rounded-2xl p-3 md:p-4 text-sm focus:ring-2 focus:ring-[#ffc600] outline-none transition-all"
              placeholder="+56 9 1234 5678" />
          </div>
        </div>

        {/* Servicio */}
        <div className="space-y-2">
          <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Servicio</label>
          <select name="user_subject"
            className="w-full bg-slate-50 border-none rounded-xl md:rounded-2xl p-3 md:p-4 text-sm focus:ring-2 focus:ring-[#ffc600] outline-none transition-all text-slate-500">
            <option>Electricidad General / SEC</option>
            <option>Domótica y Automatización</option>
            <option>Redes y Cámaras</option>
            <option>Otro servicio</option>
          </select>
        </div>

        {/* Mensaje */}
        <div className="space-y-2">
          <label className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Mensaje *</label>
          <textarea name="message" required rows={4}
            className="w-full bg-slate-50 border-none rounded-xl md:rounded-2xl p-3 md:p-4 text-sm focus:ring-2 focus:ring-[#ffc600] outline-none transition-all resize-none"
            placeholder="Cuéntanos sobre tu proyecto..." />
        </div>

        {/* Botones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="submit"
            disabled={formStatus === 'loading'}
            className="w-full bg-[#1e293b] text-white font-black uppercase py-4 rounded-xl md:rounded-2xl text-[10px] md:text-xs tracking-[0.2em] hover:bg-[#ffc600] hover:text-[#1e293b] transition-all shadow-xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Mail size={14} />
            {formStatus === 'loading' ? 'Enviando...' : 'Enviar correo'}
          </button>

          <a
            href="https://wa.me/56989203902"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] text-white font-black uppercase py-4 rounded-xl md:rounded-2xl text-[10px] md:text-xs tracking-[0.2em] hover:bg-[#1ebe5d] transition-all shadow-xl flex items-center justify-center gap-2"
          >
            <img src="/whatsapp.svg" alt="WhatsApp" width={14} height={14} className="w-4 h-4 brightness-0 invert" />
            WhatsApp
          </a>
        </div>

        {formStatus === 'success' && (
          <div className="flex items-center gap-3 bg-green-500/10 border border-green-500/30 rounded-2xl p-4">
            <CheckCircle size={20} className="text-green-500 shrink-0" />
            <div>
              <p className="text-green-600 font-black text-xs uppercase tracking-wider">¡Correo enviado!</p>
              <p className="text-slate-500 text-xs mt-0.5">Te contactaremos a la brevedad.</p>
            </div>
          </div>
        )}

        {formStatus === 'error' && (
          <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-2xl p-4">
            <div className="w-5 h-5 rounded-full border-2 border-red-400 flex items-center justify-center shrink-0">
              <span className="text-red-400 text-xs font-black">!</span>
            </div>
            <div>
              <p className="text-red-500 font-black text-xs uppercase tracking-wider">Error al enviar</p>
              <p className="text-slate-500 text-xs mt-0.5">
                Contáctanos por{' '}
                <a href="https://wa.me/56989203902" target="_blank" rel="noopener noreferrer" className="font-bold text-[#1e293b] hover:text-green-600 underline">WhatsApp</a>.
              </p>
            </div>
          </div>
        )}

      </form>
    </div>
  );
}
