'use client';
import Link from 'next/link';
import { useState } from 'react';

const LINKS: [string, string][] = [
  ['Inicio', '/'],
  ['Servicios', '/servicios'],
  ['Proyectos', '/proyectos'],
  ['Tecnología', '/tecnologia'],
  ['Contacto', '/contacto'],
];

export default function Nav({ active }: { active?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="iv-nav">
      <div className="iv-container iv-nav-inner">
        <Link href="/" className="iv-brand" aria-label="InnVolt, ir al inicio" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/innvolt-5a-oscuro.svg" alt="InnVolt" className="iv-logo-img" width={186} height={32} />
        </Link>
        <nav className="iv-nav-links" aria-label="Principal">
          {LINKS.map(([l, h]) => (
            <Link key={h} href={h} className={active === l ? 'is-active' : ''} aria-current={active === l ? 'page' : undefined}>{l}</Link>
          ))}
        </nav>
        <Link href="/contacto" className="iv-btn iv-btn-sm iv-nav-cta">Cotizar</Link>
        <button className="iv-burger" aria-label="Abrir menú" aria-expanded={open} aria-controls="menu-movil" onClick={() => setOpen(o => !o)}>
          <span />
        </button>
      </div>
      {open && (
        <nav id="menu-movil" className="iv-mobile" aria-label="Menú móvil">
          {LINKS.map(([l, h]) => (
            <Link key={h} href={h} onClick={() => setOpen(false)} aria-current={active === l ? 'page' : undefined}>{l}</Link>
          ))}
          <Link href="/contacto" className="iv-btn" onClick={() => setOpen(false)}>Cotizar</Link>
        </nav>
      )}
    </header>
  );
}
