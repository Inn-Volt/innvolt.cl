import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, Receipt, ClipboardCheck, FileText, Plus, ArrowRight } from 'lucide-react';
import Nav from './Nav';
import { SITE, ZONA_CORTA, ENERGIA_PRINCIPAL, ENERGIA_MAS, TECNOLOGIA, ZONAS, focus, type Faq, type ArtKind } from './content';

/* ── WhatsApp ── */
export const waLink = (msg: string) => `https://wa.me/${SITE.phone.replace('+', '')}?text=${encodeURIComponent(msg)}`;
export const WA_DEFAULT = 'Hola, quisiera solicitar una cotización para un proyecto eléctrico.';
export const waElec = waLink(WA_DEFAULT);
export const waSolar = waLink('Hola, quisiera evaluar un proyecto de energía solar para mi vivienda o empresa.');

export const STEPS = [
  { n: '01', t: 'Nos cuentas qué necesitas', d: 'Por WhatsApp o formulario. Coordinamos los próximos pasos.' },
  { n: '02', t: 'Evaluamos y proponemos', d: 'Revisamos el proyecto y preparamos una propuesta con alcance definido.' },
  { n: '03', t: 'Coordinamos la ejecución', d: 'Ejecutamos y entregamos según el alcance acordado.' },
];

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/* Foto que llena su marco, recortada según su punto de enfoque */
export function Photo({ src, alt, sizes, priority = false }: { src: string; alt: string; sizes: string; priority?: boolean }) {
  return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} style={{ objectFit: 'cover', objectPosition: focus(src) }} />;
}

/* Sello de autorización SEC (texto propio, sin usar el logo de la SEC) */
export function SecSeal() {
  return (
    <div className="iv-seal">
      <span className="iv-seal-ico"><ShieldCheck size={20} /></span>
      <span>
        <strong>Instaladores autorizados SEC</strong>
        <small>Superintendencia de Electricidad y Combustibles</small>
      </span>
    </div>
  );
}

export function TrustStrip() {
  const items = [
    { icon: ShieldCheck, t: 'Autorizados SEC' },
    { icon: ClipboardCheck, t: 'Evaluación técnica' },
    { icon: FileText, t: 'Propuesta clara y detallada' },
    { icon: Receipt, t: 'Boleta y factura' },
  ];
  return (
    <div className="iv-trust">
      <div className="iv-container iv-trust-inner">
        {items.map(({ icon: Icon, t }) => (
          <span key={t} className="iv-trust-item"><Icon size={18} /> {t}</span>
        ))}
      </div>
    </div>
  );
}

const INK = '#1a1813';

/* Ilustraciones para servicios sin foto real (no se presentan como proyectos) */
export function Art({ kind }: { kind: ArtKind }) {
  return (
    <div className="iv-art" aria-hidden="true">
      {kind === 'solar' && (
        <svg viewBox="0 0 320 170" fill="none">
          <circle cx="262" cy="44" r="21" fill="#ffc400" stroke={INK} strokeWidth="2.5" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(a => {
            const r = (a * Math.PI) / 180;
            return <line key={a} x1={262 + Math.cos(r) * 29} y1={44 + Math.sin(r) * 29} x2={262 + Math.cos(r) * 38} y2={44 + Math.sin(r) * 38} stroke={INK} strokeWidth="2.5" strokeLinecap="round" />;
          })}
          <line x1="20" y1="154" x2="300" y2="154" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
          <line x1="112" y1="140" x2="118" y2="154" stroke={INK} strokeWidth="3" />
          <line x1="160" y1="140" x2="166" y2="154" stroke={INK} strokeWidth="3" />
          <polygon points="40,140 110,60 250,60 180,140" fill="#23384f" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
          <g stroke="#7fa6c9" strokeWidth="1.6">
            <line x1="75" y1="140" x2="145" y2="60" /><line x1="110" y1="140" x2="180" y2="60" /><line x1="145" y1="140" x2="215" y2="60" />
            <line x1="57.5" y1="120" x2="197.5" y2="120" /><line x1="75" y1="100" x2="215" y2="100" /><line x1="92.5" y1="80" x2="232.5" y2="80" />
          </g>
        </svg>
      )}
      {kind === 'bateria' && (
        <svg viewBox="0 0 320 170" fill="none">
          <rect x="86" y="38" width="148" height="104" rx="12" fill="#fff" stroke={INK} strokeWidth="2.5" />
          <rect x="234" y="72" width="14" height="36" rx="4" fill={INK} />
          <rect x="100" y="52" width="36" height="76" rx="5" fill="#ffc400" stroke={INK} strokeWidth="2" />
          <rect x="142" y="52" width="36" height="76" rx="5" fill="#ffc400" stroke={INK} strokeWidth="2" />
          <rect x="184" y="52" width="36" height="76" rx="5" fill="#f3efe3" stroke={INK} strokeWidth="2" strokeDasharray="5 4" />
          <path d="M160 18 L148 36 H158 L154 50 L170 30 H160 Z" fill="#ffc400" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
          <line x1="40" y1="156" x2="280" y2="156" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )}
      {kind === 'ev' && (
        <svg viewBox="0 0 320 170" fill="none">
          <rect x="34" y="30" width="58" height="98" rx="10" fill="#fff" stroke={INK} strokeWidth="2.5" />
          <rect x="46" y="44" width="34" height="22" rx="4" fill="#23384f" />
          <path d="M63 76 L55 90 H63 L60 102 L71 86 H63 Z" fill="#ffc400" stroke={INK} strokeWidth="1.8" strokeLinejoin="round" />
          <path d="M92 104 C 120 104, 120 132, 150 128" stroke={INK} strokeWidth="3" strokeLinecap="round" />
          <path d="M140 116 L 160 94 H 236 L 268 116 H 286 V 136 H 128 V 116 Z" fill="#ffc400" stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M168 98 L 184 112 H 206 V 98 Z M 214 98 V 112 H 250 L 232 98 Z" fill="#23384f" />
          <circle cx="166" cy="138" r="13" fill="#fff" stroke={INK} strokeWidth="2.5" />
          <circle cx="250" cy="138" r="13" fill="#fff" stroke={INK} strokeWidth="2.5" />
          <line x1="20" y1="153" x2="300" y2="153" stroke={INK} strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      )}
    </div>
  );
}

/* Preguntas frecuentes (acordeón sin JS) + datos estructurados FAQPage */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  const ld = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  return (
    <div className="iv-faq">
      <JsonLd data={ld} />
      {faqs.map(f => (
        <details key={f.q}>
          <summary>{f.q}<Plus size={18} /></summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/* Banda de cierre con mensaje propio por página */
export function CtaBand({ title, text, wa = WA_DEFAULT, id }: { title: string; text?: string; wa?: string; id?: string }) {
  return (
    <section className="iv-ctaband" id={id}>
      <div className="iv-container">
        <h2 className="iv-h2">{title}</h2>
        {text && <p className="iv-lead iv-lead-band">{text}</p>}
        <div className="iv-cta-row">
          <Link href="/contacto" className="iv-btn iv-btn-dark">Solicitar cotización <ArrowRight size={16} /></Link>
          <a href={waLink(wa)} target="_blank" rel="noopener noreferrer" className="iv-btn iv-btn-ghost">WhatsApp directo</a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="iv-footer">
      <div className="iv-container iv-footer-inner">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/innvolt-5a-oscuro.svg" alt="InnVolt" className="iv-logo-img" width={186} height={32} />
          <p className="iv-foot-desc">Electricidad y energía para hogares, comercios y empresas. Instaladores autorizados SEC.</p>
          <p className="iv-foot-zone">{ZONA_CORTA}</p>
        </div>
        <div className="iv-foot-cols">
          <div>
            <p className="iv-foot-h">Electricidad y energía</p>
            {ENERGIA_PRINCIPAL.map(s => <Link key={s.slug} href={`/${s.slug}`}>{s.name}</Link>)}
          </div>
          <div>
            <p className="iv-foot-h">Más servicios</p>
            {ENERGIA_MAS.map(s => <Link key={s.slug} href={`/${s.slug}`}>{s.name}</Link>)}
            {ZONAS.map(s => <Link key={s.slug} href={`/${s.slug}`}>{s.name}</Link>)}
          </div>
          <div>
            <p className="iv-foot-h">Tecnología</p>
            {TECNOLOGIA.map(s => <Link key={s.slug} href={`/${s.slug}`}>{s.name}</Link>)}
            <Link href="/proyectos">Proyectos</Link>
          </div>
          <div>
            <p className="iv-foot-h">Contacto</p>
            <a href={waElec} target="_blank" rel="noopener noreferrer">{SITE.phoneLabel}</a>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">{SITE.instagramLabel}</a>
            <Link href="/contacto">Solicitar cotización</Link>
          </div>
        </div>
      </div>
      <div className="iv-container iv-foot-legal">
        <span>© {new Date().getFullYear()} {SITE.legalName}</span>
        <Link href="/privacidad">Política de privacidad</Link>
      </div>
    </footer>
  );
}

export function Shell({ active, wa = WA_DEFAULT, children }: { active?: string; wa?: string; children: React.ReactNode }) {
  return (
    <div className="iv">
      <a href="#contenido" className="iv-skip">Saltar al contenido</a>
      <Nav active={active} />
      <main id="contenido">{children}</main>
      <Footer />

      {/* WhatsApp flotante (escritorio/tablet) */}
      <a href={waLink(wa)} target="_blank" rel="noopener noreferrer" className="iv-wafab" aria-label="Escríbenos por WhatsApp">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/whatsapp.svg" alt="" width={18} height={18} /> WhatsApp
      </a>

      {/* Barra fija inferior (móvil) */}
      <div className="iv-mbar">
        <a href={waLink(wa)} target="_blank" rel="noopener noreferrer" className="iv-mbar-wa">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/whatsapp.svg" alt="" width={16} height={16} /> WhatsApp
        </a>
        <Link href="/contacto" className="iv-mbar-q">Cotizar</Link>
      </div>
    </div>
  );
}
