'use client';

import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Bolt, ShieldCheck, Zap, Factory, CheckCircle, ArrowRight, Phone, Mail, Instagram, Linkedin, HardHat, MapPin, MessageCircle } from 'lucide-react';

export default function InnVoltPro() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    // 1. Recopilar datos para WhatsApp
    const formData = new FormData(formRef.current);
    const nombre = formData.get('user_name');
    const empresa = formData.get('user_company');
    const asunto = formData.get('user_subject');
    const mensaje = formData.get('message');

    // 2. Configuración EmailJS (Reemplaza con tus IDs reales de EmailJS)
    const serviceID = 'service_2eu64xv';
    const templateID = 'template_yq0u1gc';
    const publicKey = '06SfJx0u03W8m5lC-';

    try {
      // Enviar Correo
      await emailjs.sendForm(serviceID, templateID, formRef.current, publicKey);
      
      // 3. Abrir WhatsApp con los datos formateados
      const textoWA = `*NUEVO PROYECTO INNVOLT*%0A%0A*Nombre:* ${nombre}%0A*Empresa:* ${empresa}%0A*Servicio:* ${asunto}%0A*Mensaje:* ${mensaje}`;
      const urlWA = `https://wa.me/56989203902?text=${textoWA}`;
      
      window.open(urlWA, '_blank');
      
      formRef.current.reset();
      alert("¡Mensaje enviado con éxito! Se ha abierto el chat de WhatsApp para atención inmediata.");
    } catch (error) {
      console.error('Error:', error);
      alert("Hubo un error al enviar el correo, pero puedes contactarnos directamente al WhatsApp +56989203902");
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-[#ffc600]">
      
      {/* 1. BOTÓN FLOTANTE WHATSAPP */}
      <a 
        href="https://wa.me/56989203902" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-8 right-8 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2"
      >
        <img 
          src="/whatsapp.svg" 
          alt="WhatsApp" 
          width={28} 
          height={28} 
        />
        <span className="hidden md:block font-black text-sm text-black">WhatsApp</span>
      </a>

      {/* 2. NAV CON RAYO */}
      <nav className="fixed w-full z-50 bg-[#1e293b]/95 backdrop-blur-md border-b border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3"> 
            <Zap className="text-[#ffc600] fill-[#ffc600]" size={28} />
            <div className="flex flex-col">
              <span className="text-2xl font-black text-white tracking-tighter italic leading-none">
                INN<span className="text-[#ffc600]">VOLT</span>
              </span>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-widest text-slate-300">
            <a href="#servicios" className="hover:text-[#ffc600] transition-all">Servicios</a>
            <a href="#nosotros" className="hover:text-[#ffc600] transition-all">Nosotros</a>
            <a href="#contacto" className="bg-[#ffc600] text-[#1e293b] px-6 py-2.5 rounded-xl hover:bg-white transition-all font-black">
              SOLICITAR PRESUPUESTO
            </a>
          </div>
        </div>
      </nav>

      {/* 3. HERO SECTION */}
      <section className="relative min-h-screen flex items-center pt-20 bg-[#1e293b] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1e293b] via-[#1e293b]/80 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop" 
            className="w-full h-full object-cover opacity-30"
            alt="InnVolt Hero"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-20 w-full">
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#ffc600] text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck size={14} /> Instaladores Certificados SEC
            </div>
            <h1 className="text-5xl md:text-[70px] font-black text-white leading-[0.85] tracking-tighter">
              <span className="text-[#ffc600] italic"> INNOVACIÓN</span> <br />
              ELECTRICIDAD, AUTOMATIZACIÓN Y CONTROL <br />
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-lg leading-relaxed font-medium italic">
              "Soluciones en electricidad, automatización y redes, orientadas a la seguridad, eficiencia energética y conectividad."
            </p>
            <div className="flex flex-wrap gap-5">
              <a href="#contacto" className="bg-[#ffc600] text-[#1e293b] px-10 py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl hover:bg-white transition-all flex items-center gap-3">
                EMPEZAR AHORA <ArrowRight size={18} />
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#1e293b]/60 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 shadow-2xl">
              <h3 className="text-[#ffc600] font-black text-xl mb-8 uppercase tracking-tighter italic">Nuestros Servicios</h3>
              <ul className="space-y-4">
                {["Instalaciones Eléctricas Integrales", "Proyectos de Ingeniería y Planos", "Certificación SEC y Trámites TE1", "Automatización e Iluminación Inteligente",  "Control de Accesos y Portones","Redes de Datos y Videovigilancia"].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-white font-bold text-sm">
                    <CheckCircle size={18} className="text-[#ffc600] shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
                 <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Línea Directa 24/7</p>
                 <p className="text-white text-xl font-black">+56 9 8920 3902</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SERVICIOS */}
      <section id="servicios" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
             <h2 className="text-[12px] font-black text-[#00000] uppercase tracking-[0.5em]">Lo que hacemos</h2>
             <h3 className="text-4xl md:text-6xl font-black text-[#FFC600] tracking-tighter italic">Servicios</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <ServiceCardImage 
              img="https://img.freepik.com/fotos-premium/ciencia-tecnologia-electronica-impresion-planos-ingenieria-electrica-disyuntor-mulyimeter-desarrollo-cientifico_113913-573.jpg"
              title="Electricidad General"
              desc="Soluciones eléctricas integrales para entornos domiciliarios, comerciales e industriales, desde instalaciones base hasta certificación SEC, con respaldo técnico y cumplimiento normativo."
            />
            <ServiceCardImage 
              img="https://plus.unsplash.com/premium_photo-1728831285095-63346794b6ad?q=80&w=827&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              title="Domótica y Automatización"
              desc="Iluminación inteligente, control de accesos y automatización de instalaciones eléctricas, optimizando la seguridad, eficiencia energética y gestión remota de cada espacio."
            />
            <ServiceCardImage 
              img="https://media.istockphoto.com/id/1311084163/es/foto/guardia-de-seguridad-observando-el-sistema-de-seguridad-de-monitoreo-de-v%C3%ADdeo.webp?a=1&b=1&s=612x612&w=0&k=20&c=UVJbBXQuaQEOQQ1OkhXGJ5fE8_yZmrXblL6-TBTk8D0="
              title="Redes y Seguridad"
              desc="Implementación de infraestructura de redes, cableado estructurado y sistemas de videovigilancia de alta definición para entornos residenciales, comerciales e industriales."
            />
          </div>
        </div>
      </section>

      {/* 5.5 SECCIÓN NOSOTROS */}
      <section id="nosotros" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-4 border-l-4 border-[#ffc600]" />
              <img 
                src="/unnamed.jpg" 
                alt="Equipo InnVolt" 
                className="rounded-[3rem] shadow-2xl relative z-10"
              />
              <div className="absolute -bottom-6 -right-6 bg-[#ffc600] p-8 rounded-3xl z-20 hidden md:block">
                <p className="text-[#1e293b] font-black text-4xl italic">+5</p>
                <p className="text-[#1e293b] text-[10px] font-bold uppercase tracking-widest">Años de <br />Experiencia</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-[12px] font-black text-slate-400 uppercase tracking-[0.5em]">Nuestra Identidad</h2>
                <h3 className="text-4xl md:text-5xl font-black text-[#1e293b] tracking-tighter italic uppercase">
                  Ingeniería y solución <br />
                  <span className="text-[#ffc600]">eléctrica y automatización</span>
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed text-lg italic">
                En <span className="font-bold text-[#1e293b]">INNVOLT</span>, desarrollamos instalaciones eléctricas, automatización y sistemas de control con altos estándares técnicos y normativos. Nuestro equipo certificado ejecuta proyectos para entornos domiciliarios, comerciales e industriales, asegurando seguridad, eficiencia energética y continuidad operativa.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="border-l-2 border-[#ffc600] pl-4">
                  <p className="font-black text-sm uppercase tracking-wider text-[#1e293b]">Misión</p>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Diseñar e implementar soluciones eléctricas, automatización y control que garanticen seguridad, eficiencia y confiabilidad en cada instalación.
                  </p>
                </div>
                <div className="border-l-2 border-[#ffc600] pl-4">
                  <p className="font-black text-sm uppercase tracking-wider text-[#1e293b]">Visión</p>
                  <p className="text-xs text-slate-500 mt-1 font-medium">
                    Ser referente en soluciones eléctricas y automatización inteligente para hogares, comercios e industria a nivel nacional.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SECCIÓN CONTACTO */}
      <section id="contacto" className="py-32 bg-[#1e293b] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div className="space-y-12">
              <div className="space-y-4">
                <h2 className="text-[#ffc600] font-black text-xs uppercase tracking-[0.4em]">Hablemos</h2>
                <h3 className="text-5xl font-black text-white tracking-tighter italic">¿TIENES UN <br />PROYECTO?</h3>
                <p className="text-slate-400 max-w-md leading-relaxed">
                  Estamos listos para asesorarte en tus instalaciones eléctricas, proyectos de domótica o seguridad. 
                  Contáctanos y obtén una cotización técnica profesional.
                </p>
              </div>
              <div className="space-y-6">
                <ContactInfo Icon={Phone} title="Teléfono" content={<a href="tel:+56989203902" className="hover:text-[#ffc600]">+56 9 8920 3902</a>} />
                <ContactInfo Icon={Mail} title="Email" content={<a href="mailto:inn-volt@outlook.cl" className="hover:text-[#ffc600]">inn-volt@outlook.cl</a>} />
                <ContactInfo Icon={Instagram} title="Instagram" content={<a href="https://instagram.com/inn.volt" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffc600]">@inn.volt</a>} />
                <ContactInfo Icon={MapPin} title="Ubicación" content={<a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffc600]">Santiago, Región Metropolitana</a>} />
              </div>
            </div>

            <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-2xl">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Nombre</label>
                    <input name="user_name" required type="text" className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#ffc600] outline-none transition-all" placeholder="Tu nombre" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Empresa</label>
                    <input name="user_company" type="text" className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#ffc600] outline-none transition-all" placeholder="Nombre de empresa" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Asunto</label>
                  <select name="user_subject" className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#ffc600] outline-none transition-all text-slate-500">
                    <option>Electricidad General / SEC</option>
                    <option>Domótica y Automatización</option>
                    <option>Redes y Cámaras</option>
                    <option>Otro servicio</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Mensaje</label>
                  <textarea name="message" required rows={4} className="w-full bg-slate-50 border-none rounded-2xl p-4 focus:ring-2 focus:ring-[#ffc600] outline-none transition-all resize-none" placeholder="Cuéntanos sobre tu proyecto..."></textarea>
                </div>
                <button type="submit" className="w-full bg-[#1e293b] text-white font-black uppercase py-5 rounded-2xl tracking-[0.2em] hover:bg-[#ffc600] hover:text-[#1e293b] transition-all shadow-xl">
                  Enviar mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 bg-[#1e293b] border-t border-white/5 text-center">
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
          © 2026 INNVOLT SpA - Todos los derechos reservados
        </p>
      </footer>
    </div>
  );
}

function ContactInfo({ Icon, title, content }: any) {
  return (
    <div className="flex items-center gap-6 group">
      <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-[#ffc600] group-hover:scale-110 transition-transform">
        <Icon size={24} />
      </div>
      <div>
        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{title}</p>
        <p className="text-white font-bold">{content}</p>
      </div>
    </div>
  );
}

function ServiceCardImage({ img, title, desc }: any) {
  return (
    <div className="group relative h-[450px] rounded-[3rem] overflow-hidden shadow-2xl transition-all hover:-translate-y-2">
      <img src={img} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={title} />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] via-[#1e293b]/40 to-transparent" />
      <div className="absolute bottom-5 left-10 right-10">
        <h4 className="text-white text-2xl font-black uppercase italic mb-3">{title}</h4>
        <p className="text-slate-300 text-sm font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {desc}
        </p>
        <div className="w-12 h-1 bg-[#ffc600] mt-4" />
      </div>
    </div>
  );
}