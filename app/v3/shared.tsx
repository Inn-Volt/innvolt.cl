import Link from 'next/link';
import { Zap, Gauge, Sun, ClipboardCheck, Cpu, Camera, Network, MonitorPlay } from 'lucide-react';
import Nav from './Nav';

export const WA = 'https://wa.me/56966575447';
export const waElec = `${WA}?text=${encodeURIComponent('Hola, quisiera solicitar una cotización para un proyecto eléctrico.')}`;
export const waSolar = `${WA}?text=${encodeURIComponent('Hola, quisiera evaluar un proyecto de energía solar para mi vivienda o empresa.')}`;
export const waTech = `${WA}?text=${encodeURIComponent('Hola, quisiera explorar soluciones tecnológicas (automatización, CCTV, redes).')}`;

/* Rayo rediseñado: geométrico, nítido, con facetas */
export function Bolt({ size = 34, tone = 'brand' }: { size?: number; tone?: 'brand' | 'mono' }) {
  const main = tone === 'mono' ? '#ffffff' : 'url(#boltGrad)';
  const facet = tone === 'mono' ? 'rgba(0,0,0,0.18)' : '#d98a00';
  return (
    <svg width={size} height={size * 1.28} viewBox="0 0 50 64" fill="none" aria-hidden="true" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="boltGrad" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0" stopColor="#FFD64A" />
          <stop offset="1" stopColor="#F2A400" />
        </linearGradient>
      </defs>
      <path d="M28 2 L4 36 H17 L14 62 Z" fill={facet} />
      <path d="M28 2 L4 36 H17 L14 62 L46 25 H29 L36 2 Z" fill={main} />
    </svg>
  );
}

export const SERVICES = [
  { icon: Zap, title: 'Instalaciones eléctricas', desc: 'Domiciliarias, comerciales e industriales. Nuevas, ampliaciones y modificaciones.', img: '/electricista-1.jpg' },
  { icon: Gauge, title: 'Tableros y mantención', desc: 'Instalación y normalización de tableros, mantención preventiva y correctiva.', img: '/tableros-1.jpg' },
  { icon: Sun, title: 'Energía solar y eficiencia', desc: 'Proyectos fotovoltaicos, autoconsumo y eficiencia energética, según evaluación.', img: null },
  { icon: ClipboardCheck, title: 'Evaluación y proyectos', desc: 'Levantamientos técnicos, proyectos eléctricos y tramitación según corresponda.', img: '/te1-1.jpg' },
];

export const WHY = [
  { n: '01', t: 'Evaluación técnica', d: 'Revisamos el alcance real antes de proponer una solución.' },
  { n: '02', t: 'Presupuestos claros', d: 'Propuestas definidas, sin letra chica ni sorpresas.' },
  { n: '03', t: 'Seguridad y normativa', d: 'Trabajos con atención a la seguridad y la normativa aplicable.' },
  { n: '04', t: 'Electricidad + tecnología', d: 'Integramos tecnología cuando el proyecto lo requiere.' },
];

export const PROJECTS = [
  { img: '/proyecto-1.jpg', cat: 'Eléctrico', t: 'Proyecto eléctrico' },
  { img: '/proyecto-2.jpg', cat: 'Tableros', t: 'Normalización de tablero' },
  { img: '/proyecto-3.jpg', cat: 'Instalación', t: 'Instalación comercial' },
];

export const TECH = [
  { icon: Cpu, t: 'Automatización y domótica', d: 'Control de iluminación, climatización y escenas; integración de dispositivos inteligentes.' },
  { icon: Camera, t: 'CCTV y control de acceso', d: 'Videovigilancia, control de acceso electrónico y soluciones de seguridad.' },
  { icon: Network, t: 'Redes e infraestructura', d: 'Cableado estructurado, Wi-Fi profesional, racks y conectividad.' },
  { icon: MonitorPlay, t: 'Pantallas LED e integración', d: 'Señalética digital, pantallas publicitarias e integración de sistemas.' },
];

export const STEPS = [
  { n: '01', t: 'Nos cuentas qué necesitas', d: 'Por WhatsApp o formulario. Coordinamos los próximos pasos.' },
  { n: '02', t: 'Evaluamos y proponemos', d: 'Revisamos el proyecto y preparamos una propuesta con alcance definido.' },
  { n: '03', t: 'Coordinamos la ejecución', d: 'Ejecutamos y entregamos según el alcance acordado.' },
];

export function Footer() {
  return (
    <footer className="v3-footer">
      <div className="v3-container v3-footer-inner">
        <div>
          <div className="v3-brand"><Bolt size={24} tone="mono" /><span className="v3-brand-name">Inn<span className="v3-y">Volt</span></span></div>
          <p className="v3-foot-desc">Soluciones eléctricas y energéticas para hogares, comercios y empresas en Santiago.</p>
        </div>
        <div className="v3-foot-cols">
          <div><p className="v3-foot-h">Electricidad y energía</p><Link href="/v3/servicios">Instalaciones</Link><Link href="/v3/servicios">Tableros y mantención</Link><Link href="/v3/servicios">Energía solar</Link><Link href="/v3/proyectos">Proyectos</Link></div>
          <div><p className="v3-foot-h">Otras soluciones</p><Link href="/v3/tecnologia">Automatización</Link><Link href="/v3/tecnologia">CCTV y accesos</Link><Link href="/v3/tecnologia">Redes</Link><Link href="/v3/tecnologia">Pantallas LED</Link></div>
          <div><p className="v3-foot-h">Contacto</p><a href={waElec} target="_blank" rel="noopener noreferrer">+56 9 6657 5447</a><a href="mailto:innvolt.cl@gmail.com">innvolt.cl@gmail.com</a><a href="https://instagram.com/inn.volt" target="_blank" rel="noopener noreferrer">@inn.volt</a></div>
        </div>
      </div>
      <div className="v3-container v3-foot-legal">© 2026 InnVolt SpA · Santiago, Chile · <span>Muestra de rediseño (/v3)</span></div>
    </footer>
  );
}

export function Shell({ active, children }: { active?: string; children: React.ReactNode }) {
  return (
    <div className="v3">
      <style>{css}</style>
      <Nav active={active} />
      {children}
      <Footer />
    </div>
  );
}

export const css = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&display=swap');
.v3 {
  --ink: #1a1813; --bg: #faf9f5; --alt: #f0eee7; --paper: #fff; --line: #1a1813;
  --y: #ffc400; --yd: #d98a00; --muted: #58544b;
  --fh: 'Archivo','Barlow',sans-serif; --fb: 'Barlow',sans-serif; --r: 10px;
  background: var(--bg); color: var(--ink); font-family: var(--fb); min-height: 100vh;
}
.v3 * { box-sizing: border-box; }
.v3-container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }

/* BRAND */
.v3-brand { display: flex; align-items: center; gap: 0.5rem; text-decoration: none; }
.v3-brand-name { font-family: var(--fh); font-weight: 800; font-size: 1.3rem; letter-spacing: -0.02em; color: var(--ink); }
.v3-y { color: var(--yd); }

/* NAV */
.v3-nav { position: sticky; top: 0; z-index: 50; background: rgba(250,249,245,0.92); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border-bottom: 1.5px solid var(--line); }
.v3-nav-inner { display: flex; align-items: center; gap: 1.5rem; height: 68px; }
.v3-nav-links { display: flex; gap: 1.8rem; margin-left: auto; }
.v3-nav-links a { color: var(--ink); text-decoration: none; font-family: var(--fh); font-weight: 600; font-size: 0.86rem; transition: color 0.18s; }
.v3-nav-links a:hover, .v3-nav-links a.is-active { color: var(--yd); }
.v3-nav-cta { margin-left: 0.5rem; }
.v3-burger { display: none; margin-left: auto; width: 42px; height: 42px; border: 1.5px solid var(--line); border-radius: 9px; background: var(--paper); align-items: center; justify-content: center; cursor: pointer; }
.v3-burger span { display: block; width: 18px; height: 2px; background: var(--ink); position: relative; }
.v3-burger span::before, .v3-burger span::after { content: ''; position: absolute; left: 0; width: 18px; height: 2px; background: var(--ink); }
.v3-burger span::before { top: -6px; } .v3-burger span::after { top: 6px; }
.v3-mobile { display: none; flex-direction: column; gap: 0.25rem; padding: 0.75rem 1.5rem 1.25rem; border-bottom: 1.5px solid var(--line); background: var(--bg); }
.v3-mobile a { font-family: var(--fh); font-weight: 600; font-size: 1.05rem; color: var(--ink); text-decoration: none; padding: 0.7rem 0; border-bottom: 1px solid rgba(0,0,0,0.07); }
.v3-mobile .v3-btn { margin-top: 0.8rem; justify-content: center; }

/* BUTTONS */
.v3-btn { display: inline-flex; align-items: center; gap: 0.5rem; background: var(--y); color: var(--ink); font-family: var(--fh); font-weight: 700; font-size: 0.9rem; padding: 0.78rem 1.4rem; border: 1.5px solid var(--line); border-radius: var(--r); box-shadow: 3px 3px 0 var(--ink); text-decoration: none; cursor: pointer; transition: transform 0.12s, box-shadow 0.12s, background 0.18s; }
.v3-btn:hover { transform: translate(1.5px,1.5px); box-shadow: 1.5px 1.5px 0 var(--ink); background: #ffce2b; }
.v3-btn-sm { padding: 0.5rem 1.05rem; font-size: 0.82rem; box-shadow: 2.5px 2.5px 0 var(--ink); }
.v3-btn-ghost { background: var(--paper); }
.v3-btn-dark { background: var(--ink); color: #fff; box-shadow: 3px 3px 0 rgba(0,0,0,0.25); border-color: var(--ink); }
.v3-btn-dark:hover { background: #000; }

/* PILL / KICKER */
.v3-pill { display: inline-flex; align-items: center; gap: 0.45rem; background: var(--paper); border: 1.5px solid var(--line); border-radius: 999px; padding: 0.34rem 0.85rem; font-family: var(--fh); font-weight: 600; font-size: 0.74rem; letter-spacing: 0.02em; text-transform: uppercase; margin-bottom: 1.4rem; }
.v3-pill svg { color: var(--yd); }
.v3-pill-dark { background: var(--ink); color: #fff; border-color: var(--ink); }
.v3-pill-dark svg { color: var(--y); }
.v3-kicker { display: block; font-family: var(--fh); font-weight: 700; font-size: 0.74rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--yd); margin-bottom: 0.65rem; }

/* TYPO */
.v3-h1 { font-family: var(--fh); font-weight: 800; font-size: clamp(2.4rem, 5.6vw, 4.1rem); line-height: 1.04; letter-spacing: -0.025em; margin: 0 0 1.3rem; }
.v3-mark { position: relative; white-space: nowrap; }
.v3-mark::after { content: ''; position: absolute; left: 0; right: 0; bottom: 0.1em; height: 0.26em; background: var(--y); z-index: -1; }
.v3-h2 { font-family: var(--fh); font-weight: 800; font-size: clamp(1.8rem, 3.4vw, 2.5rem); line-height: 1.1; letter-spacing: -0.02em; margin: 0; }
.v3-lead { color: var(--muted); font-size: 1.04rem; line-height: 1.68; max-width: 50ch; }
.v3-mt { margin-top: 1.3rem; }

/* HERO (home, grande) */
.v3-hero { position: relative; border-bottom: 1.5px solid var(--line); overflow: hidden; }
.v3-hero-home { min-height: calc(100vh - 68px); display: flex; align-items: center; padding: clamp(2.5rem,5vw,4rem) 0; }
.v3-hero-bolt { position: absolute; right: 2%; top: 50%; transform: translateY(-50%) rotate(6deg); opacity: 0.05; pointer-events: none; z-index: 0; }
.v3-hero-grid { position: relative; z-index: 1; display: grid; grid-template-columns: 1.08fr 0.92fr; gap: clamp(2rem, 5vw, 4rem); align-items: center; width: 100%; }
.v3-cta-row { display: flex; gap: 0.85rem; flex-wrap: wrap; margin-top: 2rem; }
.v3-wa { display: inline-flex; align-items: center; gap: 0.5rem; margin-top: 1.4rem; color: var(--muted); font-size: 0.9rem; text-decoration: none; }
.v3-wa:hover { color: var(--yd); }
.v3-hero-media { position: relative; }
.v3-frame { position: relative; aspect-ratio: 4/3.3; border: 2px solid var(--line); border-radius: 14px; overflow: hidden; box-shadow: 7px 7px 0 var(--ink); background: #eee; }
.v3-sticker { position: absolute; bottom: -16px; left: 16px; display: inline-flex; align-items: center; gap: 0.45rem; background: var(--paper); border: 1.5px solid var(--line); border-radius: 8px; box-shadow: 2.5px 2.5px 0 var(--ink); padding: 0.5rem 0.9rem; font-family: var(--fh); font-weight: 600; font-size: 0.8rem; }
.v3-sticker svg { color: var(--yd); }

/* PAGE HERO (internas) */
.v3-page-hero { padding: clamp(2.5rem,5vw,4rem) 0 clamp(2rem,4vw,3rem); border-bottom: 1.5px solid var(--line); background: var(--alt); }
.v3-crumb { display: inline-flex; align-items: center; gap: 0.4rem; font-family: var(--fh); font-weight: 600; font-size: 0.78rem; letter-spacing: 0.04em; text-transform: uppercase; color: var(--yd); text-decoration: none; margin-bottom: 1rem; }
.v3-crumb:hover { color: var(--ink); }
.v3-page-hero h1 { font-family: var(--fh); font-weight: 800; font-size: clamp(2.2rem,5vw,3.4rem); letter-spacing: -0.025em; line-height: 1.05; margin: 0 0 0.9rem; }

/* SECTIONS */
.v3-section { padding: clamp(3rem, 6vw, 5rem) 0; }
.v3-alt { background: var(--alt); border-top: 1.5px solid var(--line); border-bottom: 1.5px solid var(--line); }
.v3-head { display: flex; align-items: flex-end; justify-content: space-between; gap: 1.5rem; margin-bottom: 2.6rem; flex-wrap: wrap; }
.v3-head-note { color: var(--muted); font-size: 0.92rem; max-width: 28ch; }

/* CARD base */
.v3-card { background: var(--paper); border: 1.5px solid var(--line); border-radius: var(--r); box-shadow: 4px 4px 0 var(--ink); }

/* QUICK access (home) */
.v3-quick-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.4rem; }
.v3-quick { display: flex; flex-direction: column; gap: 0.6rem; padding: 1.6rem 1.5rem; text-decoration: none; color: var(--ink); transition: transform 0.14s, box-shadow 0.14s; }
.v3-quick:hover { transform: translate(-1.5px,-1.5px); box-shadow: 6px 6px 0 var(--ink); }
.v3-quick h3 { font-family: var(--fh); font-weight: 700; font-size: 1.25rem; letter-spacing: -0.01em; margin: 0; display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; }
.v3-quick p { color: var(--muted); font-size: 0.92rem; line-height: 1.5; margin: 0; }

/* SERVICIOS */
.v3-serv-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
.v3-serv { overflow: hidden; text-decoration: none; color: var(--ink); display: flex; flex-direction: column; transition: transform 0.14s, box-shadow 0.14s; }
.v3-serv:hover { transform: translate(-1.5px,-1.5px); box-shadow: 6px 6px 0 var(--ink); }
.v3-serv-media { position: relative; aspect-ratio: 16/8; border-bottom: 1.5px solid var(--line); background: #ece9df; }
.v3-ph { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; color: var(--yd); }
.v3-ph span { font-family: var(--fh); font-weight: 600; font-size: 0.8rem; color: var(--muted); }
.v3-badge { position: absolute; left: 16px; bottom: -19px; width: 44px; height: 44px; display: flex; align-items: center; justify-content: center; background: var(--y); color: var(--ink); border: 1.5px solid var(--line); border-radius: 9px; box-shadow: 2px 2px 0 var(--ink); }
.v3-badge-sm { position: static; width: 38px; height: 38px; border-radius: 8px; box-shadow: none; flex-shrink: 0; }
.v3-serv-body { padding: 1.9rem 1.5rem 1.6rem; }
.v3-serv-body h3 { font-family: var(--fh); font-weight: 700; font-size: 1.28rem; letter-spacing: -0.01em; margin: 0 0 0.5rem; }
.v3-serv-body p { color: var(--muted); font-size: 0.93rem; line-height: 1.55; margin: 0 0 1rem; }
.v3-link { display: inline-flex; align-items: center; gap: 0.35rem; color: var(--yd); font-family: var(--fh); font-weight: 700; font-size: 0.86rem; }

/* WHY */
.v3-why-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.4rem; }
.v3-why { padding: 1.5rem 1.4rem; }
.v3-why-n { display: inline-flex; font-family: var(--fh); font-weight: 800; font-size: 0.9rem; background: var(--y); border: 1.5px solid var(--line); border-radius: 6px; padding: 0.1rem 0.5rem; }
.v3-why h3 { font-family: var(--fh); font-weight: 700; font-size: 1.16rem; letter-spacing: -0.01em; margin: 0.8rem 0 0.4rem; }
.v3-why p { color: var(--muted); font-size: 0.9rem; line-height: 1.5; margin: 0; }

/* PROYECTOS */
.v3-proj-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
.v3-proj { overflow: hidden; margin: 0; }
.v3-proj-img { position: relative; aspect-ratio: 4/3.2; border-bottom: 1.5px solid var(--line); }
.v3-proj figcaption { display: flex; flex-direction: column; gap: 0.4rem; padding: 1rem 1.2rem 1.2rem; }
.v3-proj-cat { align-self: flex-start; background: var(--y); border: 1.5px solid var(--line); border-radius: 5px; font-family: var(--fh); font-weight: 700; font-size: 0.66rem; letter-spacing: 0.06em; text-transform: uppercase; padding: 0.1rem 0.45rem; }
.v3-proj-t { font-family: var(--fh); font-weight: 700; font-size: 1.08rem; letter-spacing: -0.01em; }

/* TECH */
.v3-tech-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: clamp(2rem, 5vw, 4rem); align-items: center; }
.v3-tech-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 1rem; }
.v3-tech-item { display: flex; gap: 1rem; padding: 1.25rem 1.3rem; }
.v3-tech-item h3 { font-family: var(--fh); font-weight: 700; font-size: 1.12rem; margin: 0 0 0.3rem; letter-spacing: -0.01em; }
.v3-tech-item p { color: var(--muted); font-size: 0.9rem; line-height: 1.5; margin: 0; }

/* STEPS */
.v3-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
.v3-step { padding: 1.7rem 1.5rem; }
.v3-step-n { display: inline-flex; font-family: var(--fh); font-weight: 800; font-size: 1.4rem; color: var(--ink); background: var(--y); border: 1.5px solid var(--line); border-radius: 9px; width: 50px; height: 50px; align-items: center; justify-content: center; box-shadow: 2px 2px 0 var(--ink); }
.v3-step h3 { font-family: var(--fh); font-weight: 700; font-size: 1.2rem; letter-spacing: -0.01em; margin: 1rem 0 0.5rem; }
.v3-step p { color: var(--muted); font-size: 0.92rem; line-height: 1.55; margin: 0; }

/* CONTACTO */
.v3-contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: clamp(2rem, 5vw, 4rem); align-items: start; }
.v3-info { display: grid; grid-template-columns: 1fr 1fr; gap: 1.2rem; margin-top: 2rem; }
.v3-info div { font-size: 0.92rem; color: var(--muted); }
.v3-info strong { display: block; font-family: var(--fh); font-weight: 700; font-size: 0.72rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--ink); margin-bottom: 0.2rem; }
.v3-form { padding: 2rem; }

/* ContactForm overrides (modo claro) */
.v3 .form-label { color: var(--muted); }
.v3 .form-input { background: #fff; border: 1.5px solid var(--line); border-radius: 8px; color: var(--ink); }
.v3 .form-input:focus { border-color: var(--yd); }
.v3 .form-input::placeholder { color: #9a9488; }
.v3 .btn-primary { background: var(--y); color: var(--ink); border: 1.5px solid var(--ink); border-radius: var(--r); clip-path: none; box-shadow: 3px 3px 0 var(--ink); }
.v3 .btn-primary:hover { background: #ffce2b; box-shadow: 1.5px 1.5px 0 var(--ink); transform: translate(1.5px,1.5px); }
.v3 .btn-ghost { background: #fff; color: var(--ink); border: 1.5px solid var(--ink); border-radius: var(--r); }

/* CTA band */
.v3-ctaband { background: var(--y); border-top: 1.5px solid var(--line); border-bottom: 1.5px solid var(--line); padding: clamp(2.5rem,5vw,4rem) 0; text-align: center; }
.v3-ctaband .v3-cta-row { justify-content: center; }

/* FOOTER */
.v3-footer { background: var(--ink); color: #fff; padding: 3rem 0 1.5rem; }
.v3-footer .v3-brand-name { color: #fff; }
.v3-footer .v3-y { color: var(--y); }
.v3-footer-inner { display: grid; grid-template-columns: 1fr 2fr; gap: 2.5rem; }
.v3-foot-desc { color: rgba(255,255,255,0.6); font-size: 0.92rem; line-height: 1.6; max-width: 34ch; margin-top: 1rem; }
.v3-foot-cols { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
.v3-foot-h { font-family: var(--fh); font-weight: 700; font-size: 0.74rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--y); margin: 0 0 0.8rem; }
.v3-foot-cols a { display: block; color: rgba(255,255,255,0.7); font-size: 0.92rem; text-decoration: none; padding: 0.25rem 0; }
.v3-foot-cols a:hover { color: #fff; }
.v3-foot-legal { margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.5); font-size: 0.82rem; }
.v3-foot-legal span { color: var(--y); }

/* RESPONSIVE */
@media (max-width: 980px) {
  .v3-hero-grid, .v3-tech-grid, .v3-contact-grid { grid-template-columns: 1fr; }
  .v3-serv-grid, .v3-why-grid, .v3-quick-grid { grid-template-columns: 1fr 1fr; }
  .v3-footer-inner { grid-template-columns: 1fr; }
  .v3-hero-home { min-height: auto; }
}
@media (max-width: 760px) {
  .v3-nav-links, .v3-nav-cta { display: none; }
  .v3-burger { display: flex; }
  .v3-serv-grid, .v3-why-grid, .v3-proj-grid, .v3-steps, .v3-quick-grid, .v3-foot-cols, .v3-info { grid-template-columns: 1fr; }
  .v3-head { align-items: flex-start; }
}
`;
