'use client';

import React, { useState } from 'react';
import { ShieldCheck, Clock, FileCheck, Wrench, Phone, Mail, Instagram, MapPin, ArrowRight, ChevronRight } from 'lucide-react';
import ProyectosGaleria from './components/ProyectosGaleria';
import ContactForm from './components/ContactForm';

/* ══════════════════════════════════════
   LOGO SVG — fiel a la marca InnVolt
══════════════════════════════════════ */
function Logo({ height = 36 }: { height?: number }) {
  const boltH = height;
  const boltW = boltH * 0.6;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
      <svg width={boltW} height={boltH} viewBox="0 0 18 30" fill="none">
        <path d="M11 0L1 17H9L8 30L17 13H9L11 0Z" fill="#ffc600"/>
        <path d="M11 0L1 17H9L8 30L17 13H9L11 0Z" fill="url(#g3d)" opacity="0.25"/>
        <defs>
          <linearGradient id="g3d" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fff"/>
            <stop offset="100%" stopColor="#000"/>
          </linearGradient>
        </defs>
      </svg>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 900,
        fontSize: height * 0.72,
        letterSpacing: '-0.02em',
        lineHeight: 1,
        color: '#fff',
        textTransform: 'none',
      }}>
        Inn<span style={{ color: '#ffc600' }}>Volt</span>
      </span>
    </div>
  );
}

/* ══════════════════════════════════════
   SECCIÓN HEADER (label + título)
══════════════════════════════════════ */
function SectionHeader({ label, title, light = false }: { label: string; title: React.ReactNode; light?: boolean }) {
  return (
    <div style={{ marginBottom: '3rem' }}>
      <p className="label" style={{ marginBottom: '0.75rem' }}>— {label}</p>
      <h2 className="display" style={{ fontSize: 'clamp(2.4rem,5vw,4rem)', color: light ? '#000' : '#fff' }}>{title}</h2>
    </div>
  );
}

/* ══════════════════════════════════════
   PÁGINA PRINCIPAL
══════════════════════════════════════ */
export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div style={{ minHeight: '100vh', background: '#000' }}>

      {/* ── WHATSAPP FAB ── */}
      <a href="https://wa.me/56989203902" target="_blank" rel="noopener noreferrer" className="wsp-fab">
        <img src="/whatsapp.svg" alt="WhatsApp" width={20} height={20} />
        <span className="wsp-label">WHATSAPP</span>
      </a>

      {/* ── NAV ── */}
      <nav className="nav">
        <div className="container">
          <div className="nav-inner">
            <Logo height={34} />

            {/* Desktop links */}
            <div className="nav-links">
              <a href="#servicios" className="nav-link">Servicios</a>
              <a href="#proyectos" className="nav-link">Proyectos</a>
              <a href="#nosotros" className="nav-link">Nosotros</a>
              <a href="#contacto" className="btn btn-primary" style={{ padding: '0.55rem 1.4rem', fontSize: '0.7rem' }}>
                PRESUPUESTO
              </a>
            </div>

            {/* Hamburger */}
            <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menú">
              <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
              <span style={{ opacity: menuOpen ? 0 : 1 }} />
              <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <a href="#servicios" onClick={() => setMenuOpen(false)}>Servicios</a>
        <a href="#proyectos" onClick={() => setMenuOpen(false)}>Proyectos</a>
        <a href="#nosotros" onClick={() => setMenuOpen(false)}>Nosotros</a>
        <a href="#contacto" onClick={() => setMenuOpen(false)} style={{ color: 'var(--y)' }}>→ Solicitar Presupuesto</a>
      </div>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg">
          <img src="/SEC.jpg" alt="Electricista InnVolt" />
        </div>
        <div className="hero-stripe" />
        <div className="hero-content">
          <div className="hero-split">

            {/* Izquierda */}
            <div className="hero-left">
              <div className="anim-up d1" style={{ display:'inline-flex', alignItems:'center', gap:'0.5rem', background:'rgba(255,198,0,0.08)', border:'1px solid rgba(255,198,0,0.25)', padding:'0.35rem 1rem', marginBottom:'1.75rem' }}>
                <span style={{ width:6, height:6, background:'var(--y)', borderRadius:'50%', display:'block', flexShrink:0 }} />
                <span className="label" style={{ marginBottom:0, fontSize:'0.6rem' }}>Instaladores Certificados SEC</span>
              </div>
              <h1 className="hero-title display anim-up d2">
                <span>INNVOLT</span>
                <span className="hero-subtitle display"style={{ color: "white" }}>Electricidad<br />Automatización<br />& Control</span>
              </h1>
              <p className="body-sm hero-desc anim-up d3">
                Soluciones eléctricas integrales, domótica y redes de seguridad para hogares, empresas e industria en Santiago.
              </p>
              <div className="hero-btns anim-up d4">
                <a href="#contacto" className="btn btn-primary">SOLICITAR COTIZACIÓN <ArrowRight size={15} /></a>
                <a href="#proyectos" className="btn btn-ghost">VER PROYECTOS</a>
              </div>
              <div className="hero-stats anim-up d5">
                {[['+ 5','Años de experiencia'],['100%','Proyectos SEC'],['24 / 7','Soporte técnico']].map(([n,l]) => (
                  <div key={n}><p className="stat-num">{n}</p><p className="stat-label">{l}</p></div>
                ))}
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* ── BANDA CONFIANZA ── */}
      <div className="trust-band">
        <div className="container">
          <div className="trust-band-inner">
            {[
              { icon:'⚡', text:'SEC Autorizado' },
              { icon:'📋', text:'Certificación TE1' },
              { icon:'🛡', text:'Garantía incluida' },
              { icon:'📍', text:'Santiago, RM' },
              { icon:'🕐', text:'Respuesta 24 hrs' },
              { icon:'💰', text:'Presupuesto sin costo' },
            ].map(item => (
              <div key={item.text} className="trust-band-item">
                <span>{item.icon}</span>
                <span className="trust-band-text">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVICIOS ── */}
      <section id="servicios" className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="section-header-row" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '3rem' }}>
            <SectionHeader label="Lo que hacemos" title={<>NUESTROS<br />SERVICIOS</>} />
            <a href="#contacto" className="btn btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.7rem', alignSelf: 'flex-end' }}>
              PEDIR COTIZACIÓN <ChevronRight size={14} />
            </a>
          </div>

          <div className="services-grid">
            {[
              {
                num: '01',
                title: 'Electricidad General',
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--y)" strokeWidth="2" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
                items: ['Instalaciones domiciliarias e industriales', 'Certificación SEC y Trámites TE1', 'Tableros, empalmes y protecciones', 'Proyectos de ingeniería y planos'],
              },
              {
                num: '02',
                title: 'Domótica & Automatización',
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--y)" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1" fill="var(--y)"/></svg>,
                items: ['Iluminación inteligente', 'Control de accesos y portones', 'Automatización de ambientes', 'Gestión energética remota'],
              },
              {
                num: '03',
                title: 'Redes & Seguridad',
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--y)" strokeWidth="2" strokeLinecap="round"><path d="M23 7l-7 5-7-5v6l7 5 7-5V7z"/><path d="M16 3H8L1 8v8l7 5h8l7-5V8l-7-5z"/></svg>,
                items: ['Cámaras CCTV HD y 4K', 'Cableado estructurado', 'Redes WiFi profesionales', 'Monitoreo remoto 24/7'],
              },
            ].map(s => (
              <div key={s.num} className="service-card">
                <span className="service-num">{s.num}</span>
                <div style={{ position: 'relative' }}>
                  <div className="service-icon">{s.icon}</div>
                  <h3 className="service-title">{s.title}</h3>
                  <div className="service-items">
                    {s.items.map(item => (
                      <div key={item} className="service-item">
                        <span className="service-dot" />
                        <span className="body-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="service-bar" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROYECTOS ── */}
      <ProyectosGaleria />

      {/* ── POR QUÉ ELEGIRNOS ── */}
      <section id="garantias" className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <SectionHeader label="Sin inventos" title={<>¿POR QUÉ<br />ELEGIRNOS?</>} />

          <div className="guarantees-grid">
            {[
              { icon: <ShieldCheck size={18} color="var(--y)" />, num: '01', title: 'Certificación SEC', desc: 'Emitimos certificados TE1 y gestionamos todos los trámites normativos.' },
              { icon: <Clock size={18} color="var(--y)" />, num: '02', title: 'Respuesta 24 hrs', desc: 'Cotización dentro del mismo día hábil, sin vueltas.' },
              { icon: <FileCheck size={18} color="var(--y)" />, num: '03', title: 'Presupuesto gratis', desc: 'Propuesta técnica detallada, sin compromiso ni costos ocultos.' },
              { icon: <Wrench size={18} color="var(--y)" />, num: '04', title: 'Garantía incluida', desc: 'Respaldamos materiales y mano de obra en cada proyecto.' },
            ].map(g => (
              <div key={g.num} className="guarantee-card">
                <span className="guarantee-num">{g.num}</span>
                <div style={{ position: 'relative' }}>
                  <div className="guarantee-icon">{g.icon}</div>
                  <h4 className="guarantee-title">{g.title}</h4>
                  <p className="body-sm" style={{ fontSize: '0.82rem' }}>{g.desc}</p>
                  <div className="guarantee-bar" />
                </div>
              </div>
            ))}
          </div>

          {/* CTA Reviews */}
          <div style={{
            background: '#000',
            border: '1px solid var(--border)',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--y), transparent)' }} />
            <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: '1.25rem' }}>
              {[1,2,3,4,5].map(i => (
                <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="#ffc600"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              ))}
            </div>
            <h4 className="display" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', marginBottom: '0.75rem' }}>
              ¿YA TRABAJASTE<br />CON NOSOTROS?
            </h4>
            <p className="body-sm" style={{ maxWidth: '380px', margin: '0 auto 2rem' }}>
              Tu reseña nos ayuda a crecer y que más clientes nos conozcan.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href="https://g.page/r/CRa4ejtbBBcyEAI/review" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                ⭐ RESEÑA EN GOOGLE
              </a>
              <a href="https://wa.me/56989203902?text=Hola%20InnVolt%2C%20quiero%20dejarte%20un%20testimonio" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                POR WHATSAPP
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── NOSOTROS ── */}
      <section id="nosotros" className="section" style={{ background: '#000' }}>
        <div className="container">
          <div className="about-grid">

            <div className="about-img-wrap">
              <img src="/unnamed.jpg" alt="Equipo InnVolt" />
              <div className="about-badge">
                <p className="about-badge-num">+5</p>
                <p className="about-badge-label">AÑOS</p>
              </div>
            </div>

            <div>
              <SectionHeader label="Nuestra Identidad" title={<>TÉCNICOS<br />CERTIFICADOS<br /><span style={{ color: 'var(--y)' }}>A TU SERVICIO</span></>} />
              <p className="body-sm" style={{ marginBottom: '1rem' }}>
                En <strong style={{ color: '#fff', fontWeight: 600 }}>INNVOLT</strong> ejecutamos proyectos eléctricos, de automatización y control con los más altos estándares técnicos. Equipo certificado SEC, materiales de primera calidad y respaldo en cada trabajo.
              </p>
              <div className="about-mvs">
                {[
                  ['Misión', 'Diseñar e implementar soluciones que garanticen seguridad, eficiencia y confiabilidad en cada instalación.'],
                  ['Visión', 'Ser referente en electricidad y automatización inteligente para hogares, comercios e industria a nivel nacional.'],
                ].map(([t, d]) => (
                  <div key={t} className="about-mv">
                    <p className="about-mv-title">{t}</p>
                    <p className="body-sm" style={{ fontSize: '0.8rem' }}>{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACTO ── */}
      <section id="contacto" className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <div className="contact-grid">

            {/* Info */}
            <div>
              <SectionHeader label="Hablemos" title={<>¿TIENES UN<br /><span style={{ color: 'var(--y)' }}>PROYECTO?</span></>} />
              <p className="body-sm" style={{ marginBottom: '0.5rem' }}>
                Presupuesto técnico sin costo. Respondemos el mismo día hábil.
              </p>

              <div className="contact-info-list">
                {[
                  { Icon: Phone,    label: 'WhatsApp / Teléfono', value: '+56 9 8920 3902',          href: 'https://wa.me/56989203902' },
                  { Icon: Mail,     label: 'Email',                value: 'inn-volt@outlook.cl',      href: 'mailto:inn-volt@outlook.cl' },
                  { Icon: Instagram,label: 'Instagram',            value: '@inn.volt',                href: 'https://instagram.com/inn.volt' },
                  { Icon: MapPin,   label: 'Ubicación',            value: 'Santiago, RM',             href: '#' },
                ].map(c => (
                  <a key={c.label} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="contact-row">
                    <div className="contact-icon">
                      <c.Icon size={16} color="var(--y)" />
                    </div>
                    <div>
                      <p className="form-label" style={{ marginBottom: '0.15rem' }}>{c.label}</p>
                      <p style={{ color: '#fff', fontWeight: 500, fontSize: '0.9rem' }}>{c.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Formulario */}
            <div className="contact-form-wrap">
              <h3 className="display" style={{ fontSize: '1.5rem', marginBottom: '1.75rem' }}>SOLICITAR COTIZACIÓN</h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <Logo height={28} />
        <p style={{
          fontFamily: 'var(--font-display)',
          color: 'rgba(255,255,255,0.2)',
          fontSize: '0.6rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
        }}>
          © 2026 INNVOLT SpA · Santiago, Chile
        </p>
      </footer>
    </div>
  );
}
