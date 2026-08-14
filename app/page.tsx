'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Clock, Wrench, Phone, Mail, Instagram, MapPin, ArrowRight, ChevronRight, ArrowUp } from 'lucide-react';
import ContactForm from './components/ContactForm';
import Logo from './components/Logo';
import SiteFooter from './components/SiteFooter';

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
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#000' }}>

      {/* ── VOLVER ARRIBA ── */}
      <button
        className={`to-top ${showTop ? 'show' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Volver arriba"
      >
        <ArrowUp size={18} />
      </button>

      {/* ── BARRA DE ACCIÓN MÓVIL ── */}
      <div className="mobile-cta-bar">
        <a href="https://wa.me/56966575447?text=Hola%20InnVolt%2C%20quiero%20cotizar%20un%20proyecto" target="_blank" rel="noopener noreferrer" className="mcta mcta-wsp">
          <img src="/whatsapp.svg" alt="" width={16} height={16} style={{ filter: 'brightness(0) invert(1)' }} /> WhatsApp
        </a>
        <a href="#contacto" className="mcta mcta-quote">Cotizar</a>
      </div>

      {/* ── WHATSAPP FAB ── */}
      <a href="https://wa.me/56966575447?text=Hola%20InnVolt%2C%20quiero%20cotizar%20un%20proyecto" target="_blank" rel="noopener noreferrer" className="wsp-fab" aria-label="Escríbenos por WhatsApp">
        <img src="/whatsapp.svg" alt="" width={20} height={20} />
        <span className="wsp-label">WHATSAPP</span>
      </a>

      {/* ── NAV ── */}
      <nav className="nav"> 
        <div className="container">
          <div className="nav-inner">
            <Logo height={80} />

            {/* Desktop links */}
            <div className="nav-links">
              <a href="#servicios" className="nav-link">Servicios</a>
              <a href="#nosotros" className="nav-link">Nosotros</a>
              <a href="tel:+56966575447" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--y)' }}>
                <Phone size={13} /> +56 9 6657 5447
              </a>
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
        <a href="#nosotros" onClick={() => setMenuOpen(false)}>Nosotros</a>
        <a href="tel:+56966575447" onClick={() => setMenuOpen(false)}>Llamar · +56 9 6657 5447</a>
        <a href="#contacto" onClick={() => setMenuOpen(false)} style={{ color: 'var(--y)' }}>→ Solicitar Presupuesto</a>
      </div>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-gridbg" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-badge anim-up d1">
            <span className="dot" /> Tecnología integral · Certificados SEC · Santiago
          </div>

          <Image
            src="/innvolt.png"
            alt="InnVolt — Electricidad, Seguridad y Tecnología en Santiago"
            width={2000}
            height={1000}
            priority
            className="hero-logo anim-up d2"
          />

          <h1 className="hero-h1 anim-up d3">
            Electricidad, seguridad y tecnología<br />para tu <span className="hl">hogar</span> y tu <span className="hl">empresa</span>
          </h1>
          <p className="hero-p anim-up d3">
            Integramos electricidad, seguridad y automatización con estándar profesional. Certificados SEC, respuesta el mismo día y garantía por escrito.
          </p>
          <div className="hero-btns anim-up d4">
            <a href="#contacto" className="btn btn-primary">SOLICITAR COTIZACIÓN <ArrowRight size={15} /></a>
            <a href="https://wa.me/56966575447?text=Hola%20InnVolt%2C%20tengo%20una%20consulta%20el%C3%A9ctrica" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <img src="/whatsapp.svg" alt="" width={15} height={15} style={{ filter: 'brightness(0) invert(1)' }} /> WHATSAPP DIRECTO
            </a>
          </div>
          <div className="hero-stats anim-up d5">
            {[['+ 5','Años de experiencia'],['100%','Proyectos SEC'],['24 / 7','Soporte técnico']].map(([n,l]) => (
              <div key={n}><p className="stat-num">{n}</p><p className="stat-label">{l}</p></div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BANDA CONFIANZA ── */}
      <div className="trust-band">
        <div className="container">
          <div className="trust-band-inner">
            {/* ⚠️ Cambia 'Reseñas en Google' por tu puntaje REAL, ej: '4.9 ★ en Google' */}
            {[
              { icon:'⭐', text:'Reseñas en Google' },
              { icon:'⚡', text:'SEC Autorizado' },
              { icon:'📋', text:'Certificación TE1' },
              { icon:'🧾', text:'Boleta y Factura' },
              { icon:'🛡', text:'Garantía incluida' },
              { icon:'🕐', text:'Respuesta 24 hrs' },
            ].map(item => (
              <div key={item.text} className="trust-band-item">
                <span aria-hidden="true">{item.icon}</span>
                <span className="trust-band-text">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FRANJA DE URGENCIAS ── */}
      <div className="urgent-band">
        <div className="container">
          <div className="urgent-inner">
            <div className="urgent-left">
              <span className="urgent-dot" aria-hidden="true" />
              <div>
                <p className="urgent-title">¿Emergencia eléctrica?</p>
                <p className="urgent-sub">Cortes, fallas, olor a quemado o tablero caliente: te atendemos hoy.</p>
              </div>
            </div>
            <div className="urgent-ctas">
              <a href="tel:+56966575447" className="btn btn-ghost" style={{ padding: '0.75rem 1.4rem', fontSize: '0.72rem' }}>
                <Phone size={14} /> LLAMAR AHORA
              </a>
              <a href="https://wa.me/56966575447?text=Hola%20InnVolt%2C%20tengo%20una%20URGENCIA%20el%C3%A9ctrica" target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ padding: '0.75rem 1.4rem', fontSize: '0.72rem' }}>
                <img src="/whatsapp.svg" alt="" width={14} height={14} /> WHATSAPP URGENTE
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── MÁS QUE ELECTRICISTAS (posicionamiento integral) ── */}
      <section id="tecnologia" className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <SectionHeader label="Tecnología integral" title={<>MÁS QUE<br />ELECTRICISTAS</>} />
          <p className="body-sm" style={{ maxWidth: 640, marginTop: '-1.5rem', marginBottom: '2.5rem', fontSize: '1rem' }}>
            Empezamos en la electricidad, pero hoy integramos mucho más. <strong style={{ color: '#fff', fontWeight: 600 }}>Una sola empresa para toda la tecnología</strong> de tu hogar o tu empresa: de la instalación eléctrica al software que la vuelve inteligente.
          </p>
          <div className="tile-grid tile-grid-3">
            {[
              ['Electricidad', 'Instalaciones certificadas SEC y corrientes débiles'],
              ['Redes y datos', 'Cableado estructurado y conectividad'],
              ['Seguridad', 'Cámaras CCTV y control de acceso'],
              ['Pantallas LED', 'Novastar y señalética digital'],
              ['Automatización', 'Control, domótica e integración'],
              ['Software e IoT', 'Monitoreo inteligente y tecnología a medida'],
            ].map(([t, d]) => (
              <div key={t} style={{ background: 'var(--bg)', padding: '1.6rem 1.4rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.05rem', textTransform: 'uppercase', color: '#fff', marginBottom: '0.45rem' }}>{t}</h3>
                <p className="body-sm" style={{ fontSize: '0.82rem' }}>{d}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: '1.5rem', fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--muted)' }}>
            De la energía <span style={{ color: 'var(--y)' }}>→</span> a la inteligencia
          </p>
        </div>
      </section>

      {/* ── SERVICIOS ── */}
      <section id="servicios" className="section" style={{ background: 'var(--bg2)' }}>
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
                href: '/electricista-santiago',
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--y)" strokeWidth="2" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
                items: ['Instalaciones domiciliarias e industriales', 'Certificación SEC y Trámites TE1', 'Tableros, empalmes y protecciones', 'Proyectos de ingeniería y planos'],
              },
              {
                num: '02',
                title: 'Domótica & Automatización',
                href: '/domotica-santiago',
                icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--y)" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1" fill="var(--y)"/></svg>,
                items: ['Iluminación inteligente', 'Control de accesos y portones', 'Automatización de ambientes', 'Gestión energética remota'],
              },
              {
                num: '03',
                title: 'Redes & Seguridad',
                href: '/camaras-cctv-santiago',
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
                  <Link href={s.href} className="service-link">
                    Ver más <ChevronRight size={13} />
                  </Link>
                  <div className="service-bar" />
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <Link href="/servicios" className="btn btn-ghost">VER TODOS LOS SERVICIOS <ArrowRight size={15} /></Link>
          </div>
        </div>
      </section>

      {/* ── SECTORES ── */}
      <section id="sectores" className="section" style={{ background: '#000' }}>
        <div className="container">
          <SectionHeader label="A quién servimos" title={<>SECTORES QUE<br />ATENDEMOS</>} />
          <p className="body-sm" style={{ maxWidth: 620, marginTop: '-1.5rem', marginBottom: '2.5rem', fontSize: '1rem' }}>
            Desde tu casa hasta una industria: adaptamos la solución a cada tipo de cliente.
          </p>
          <div className="tile-grid tile-grid-4">
            {[
              'Hogar y comunidades', 'Empresas y oficinas', 'Industria', 'Construcción',
              'Retail y comercio', 'Centros logísticos', 'Colegios', 'Clínicas y salud',
            ].map(s => (
              <div key={s} style={{ background: '#000', padding: '1.4rem 1.3rem', display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
                <span style={{ width: 6, height: 6, background: 'var(--y)', flexShrink: 0 }} />
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.92rem', textTransform: 'uppercase', letterSpacing: '0.02em', color: '#fff' }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CASOS DE USO ── */}
      <section id="casos" className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <SectionHeader label="Qué resolvemos" title={<>SOLUCIONES POR<br />OBJETIVO</>} />
          <div className="tile-grid tile-grid-3">
            {[
              { t: 'Moderniza tu instalación', d: 'Tableros, empalmes, ampliaciones y certificación SEC para dejar todo en regla y seguro.' },
              { t: 'Protege tu propiedad', d: 'Cámaras CCTV, control de acceso y monitoreo para cuidar tu hogar o negocio 24/7.' },
              { t: 'Controla y automatiza', d: 'Iluminación, portones, climatización y ambientes que responden solos o desde tu celular.' },
              { t: 'Monitorea a distancia', d: 'Mira y gestiona tus cámaras y sistemas desde cualquier lugar, en tiempo real.' },
              { t: 'Comunica con impacto', d: 'Pantallas LED profesionales (Novastar) para retail, eventos y espacios corporativos.' },
              { t: 'Digitaliza tu operación', d: 'Software, IoT e integración de sistemas para que tu empresa opere de forma inteligente.' },
            ].map(c => (
              <div key={c.t} style={{ background: 'var(--bg)', padding: '1.9rem 1.6rem' }}>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.15rem', textTransform: 'uppercase', color: '#fff', marginBottom: '0.6rem' }}>{c.t}</h3>
                <p className="body-sm" style={{ fontSize: '0.85rem' }}>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARATIVA: INFORMAL vs CERTIFICADO ── */}
      <section id="comparacion" className="section" style={{ background: '#000' }}>
        <div className="container">
          <SectionHeader label="Lo barato sale caro" title={<>INFORMAL VS<br /><span style={{ color: 'var(--y)' }}>CERTIFICADO</span></>} />
          <div className="compare-grid">

            {/* Informal */}
            <div className="compare-card compare-bad">
              <p className="compare-head">El maestro informal</p>
              <ul className="compare-list">
                {[
                  'Sin certificación SEC ni trámite TE1',
                  'No entrega boleta ni factura',
                  'Sin garantía: si algo falla, es tu problema',
                  'Precio “barato” con sorpresas al final',
                  'Riesgo de incendio por mala instalación',
                  'Ante un siniestro, tu seguro puede no cubrir',
                ].map(t => (
                  <li key={t}><span className="compare-x" aria-hidden="true">✕</span>{t}</li>
                ))}
              </ul>
            </div>

            {/* InnVolt */}
            <div className="compare-card compare-good">
              <p className="compare-head" style={{ color: 'var(--y)' }}>INNVOLT certificado</p>
              <ul className="compare-list">
                {[
                  'Certificado SEC + TE1 incluido',
                  'Boleta y factura en todos los trabajos',
                  'Garantía por escrito sobre el trabajo',
                  'Precio justo y presupuesto claro',
                  'Instalación segura y bajo normativa',
                  'Respaldo formal ante cualquier problema',
                ].map(t => (
                  <li key={t}><span className="compare-check" aria-hidden="true">✓</span>{t}</li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <a href="#contacto" className="btn btn-primary">QUIERO HACERLO BIEN <ChevronRight size={14} /></a>
          </div>
        </div>
      </section>

      {/* ── POR QUÉ ELEGIRNOS ── */}
      <section id="garantias" className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <SectionHeader label="Sin inventos" title={<>¿POR QUÉ<br />ELEGIRNOS?</>} />

          <div className="guarantees-grid">
            {[
              { icon: <ShieldCheck size={18} color="var(--y)" />, num: '01', title: 'Certificación SEC', desc: 'Emitimos certificados TE1 y gestionamos todos los trámites normativos.' },
              { icon: <Clock size={18} color="var(--y)" />, num: '02', title: 'Respuesta 24 hrs', desc: 'Cotización el mismo día hábil y atención de urgencias eléctricas cuando más lo necesitas.' },
              { icon: <Wrench size={18} color="var(--y)" />, num: '03', title: 'Precio justo y garantía', desc: 'Presupuesto claro sin sorpresas, con boleta o factura y garantía por escrito sobre materiales y mano de obra.' },
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

          {/* CTA de conversión */}
          <div style={{
            background: '#000',
            border: '1px solid var(--border)',
            padding: 'clamp(2rem, 5vw, 3.5rem)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, var(--y), transparent)' }} />
            <p className="label" style={{ marginBottom: '1rem' }}>Respuesta el mismo día · Sin compromiso</p>
            <h4 className="display" style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', marginBottom: '0.75rem', color: '#fff' }}>
              CUÉNTANOS TU PROYECTO<br />Y TE COTIZAMOS <span style={{ color: 'var(--y)' }}>HOY</span>
            </h4>
            <p className="body-sm" style={{ maxWidth: '420px', margin: '0 auto 2rem' }}>
              Respondemos por WhatsApp el mismo día hábil. Sin letra chica: presupuesto claro, con boleta o factura y garantía.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a href="#contacto" className="btn btn-primary">SOLICITAR COTIZACIÓN <ChevronRight size={14} /></a>
              <a href="https://wa.me/56966575447?text=Hola%20InnVolt%2C%20quiero%20cotizar%20un%20proyecto" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                POR WHATSAPP
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── TECNOLOGÍAS ── */}
      <section id="tecnologias" className="section" style={{ background: '#000' }}>
        <div className="container">
          <SectionHeader label="Autoridad técnica" title={<>TECNOLOGÍAS QUE<br />DOMINAMOS</>} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginTop: '-1rem' }}>
            {[
              'Certificación SEC', 'Trámite TE1', 'Novastar (LED)', 'CCTV IP',
              'Control de acceso', 'Domótica / KNX', 'Redes estructuradas', 'Automatización',
              'IoT', 'Integración de sistemas',
            ].map(t => (
              <span key={t} style={{ border: '1px solid var(--border)', background: 'var(--bg2)', padding: '0.6rem 1.1rem', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CÓMO TRABAJAMOS ── */}
      <section id="proceso" className="section" style={{ background: 'var(--bg)' }}>
        <div className="container">
          <SectionHeader label="Simple y sin vueltas" title={<>CÓMO<br />TRABAJAMOS</>} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2px', background: 'rgba(255,198,0,0.05)' }}>
            {[
              { n: '01', t: 'Contáctanos', d: 'Escríbenos por WhatsApp o el formulario y cuéntanos qué necesitas. Respondemos el mismo día hábil.' },
              { n: '02', t: 'Evaluación y cotización', d: 'Coordinamos visita técnica o evaluación a distancia y te entregamos un presupuesto claro y detallado.' },
              { n: '03', t: 'Ejecución', d: 'Ejecutamos el trabajo con técnicos certificados SEC y materiales de primera calidad, en los plazos acordados.' },
              { n: '04', t: 'Certificado y garantía', d: 'Entregamos el certificado TE1 cuando corresponde y garantía sobre materiales y mano de obra.' },
            ].map(s => (
              <div key={s.n} style={{ background: 'var(--bg)', padding: '2.25rem 1.75rem', position: 'relative' }}>
                <p className="display" style={{ fontSize: '2.6rem', color: 'var(--y)', lineHeight: 1, marginBottom: '1rem' }}>{s.n}</p>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.15rem', textTransform: 'uppercase', letterSpacing: '0.02em', color: '#fff', marginBottom: '0.6rem' }}>{s.t}</h3>
                <p className="body-sm" style={{ fontSize: '0.83rem' }}>{s.d}</p>
                <div style={{ width: 22, height: 2, background: 'var(--y)', marginTop: '1.25rem' }} />
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <a href="#contacto" className="btn btn-primary">EMPEZAR AHORA <ChevronRight size={14} /></a>
          </div>
        </div>
      </section>

      {/* ── NOSOTROS ── */}
      <section id="nosotros" className="section" style={{ background: '#000' }}>
        <div className="container">
          <div className="about-grid">

            <div className="about-img-wrap">
              <Image
                src="/nosotros.jpg"
                alt="Equipo de técnicos eléctricos certificados de InnVolt en Santiago"
                width={612}
                height={408}
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{ width: '100%', height: 'auto' }}
              />
              <div className="about-badge">
                <p className="about-badge-num">+5</p>
                <p className="about-badge-label">AÑOS</p>
              </div>
            </div>

            <div>
              <SectionHeader label="Nuestra Identidad" title={<>TU SOCIO<br />EN<br /><span style={{ color: 'var(--y)' }}>TECNOLOGÍA</span></>} />
              <p className="body-sm" style={{ marginBottom: '1rem' }}>
                En <strong style={{ color: '#fff', fontWeight: 600 }}>INNVOLT</strong> integramos electricidad, seguridad, automatización y software para que hogares y empresas operen mejor. Nacimos en la electricidad certificada SEC y evolucionamos hacia soluciones tecnológicas integrales, con un solo responsable del resultado.
              </p>
              <div className="about-mvs">
                {[
                  ['Misión', 'Diseñar, instalar e integrar soluciones tecnológicas —de la energía al software— que hagan operar mejor a hogares y empresas.'],
                  ['Visión', 'Ser referente en integración tecnológica para empresas, uniendo infraestructura, automatización e inteligencia.'],
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

      {/* ── FAQ ── */}
      <section id="faq" className="section" style={{ background: 'var(--bg2)' }}>
        <div className="container">
          <SectionHeader label="Antes de escribirnos" title={<>PREGUNTAS<br />FRECUENTES</>} />
          <div style={{ maxWidth: 820, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              ['¿Están certificados por la SEC?', 'Sí. Somos instaladores eléctricos autorizados y emitimos el certificado TE1 ante la Superintendencia de Electricidad y Combustibles (SEC), dejando tu instalación 100% en regla.'],
              ['¿Cómo es el proceso de cotización?', 'Nos cuentas tu proyecto por el formulario o directo por WhatsApp y te respondemos el mismo día hábil. Según el caso, coordinamos una visita técnica o una evaluación a distancia.'],
              ['¿Entregan boleta y factura?', 'Sí, emitimos boleta y factura por todos nuestros trabajos, con respaldo de materiales y mano de obra.'],
              ['¿En qué zonas trabajan?', 'Cubrimos Santiago y toda la Región Metropolitana: Providencia, Las Condes, Ñuñoa, La Florida, Maipú, Puente Alto, Santiago Centro y comunas aledañas, tanto para hogares como para empresas e industria.'],
              ['¿Atienden urgencias eléctricas?', 'Sí. Contamos con soporte técnico y respuesta dentro de 24 horas para fallas, cortes y emergencias eléctricas.'],
              ['¿Qué garantía entregan?', 'Todos nuestros proyectos incluyen garantía sobre materiales y mano de obra. Trabajamos con productos de primera calidad y bajo normativa vigente.'],
            ].map(([q, a]) => (
              <details key={q} style={{ background: '#000', border: '1px solid var(--border)', padding: '1.1rem 1.4rem' }}>
                <summary style={{ cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', letterSpacing: '0.02em', color: '#fff', textTransform: 'uppercase' }}>
                  {q}
                  <span style={{ color: 'var(--y)', fontSize: '1.4rem', lineHeight: 1, flexShrink: 0 }}>+</span>
                </summary>
                <p className="body-sm" style={{ marginTop: '0.85rem' }}>{a}</p>
              </details>
            ))}
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
Cuéntanos tu proyecto y te asesoramos, sea para tu hogar o tu empresa. Respondemos por WhatsApp el mismo día hábil.
              </p>

              <div className="contact-info-list">
                {[
                  { Icon: Phone,    label: 'WhatsApp / Teléfono', value: '+56 9 6657 5447',          href: 'https://wa.me/56966575447' },
                  { Icon: Mail,     label: 'Email',                value: 'innvolt.cl@gmail.com',     href: 'mailto:innvolt.cl@gmail.com' },
                  { Icon: Instagram,label: 'Instagram',            value: '@inn.volt',                href: 'https://instagram.com/inn.volt' },
                  { Icon: MapPin,   label: 'Ubicación',            value: 'Santiago, RM',             href: 'https://www.google.com/maps/search/?api=1&query=InnVolt+electricista+Santiago' },
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
      <SiteFooter />
    </div>
  );
}
