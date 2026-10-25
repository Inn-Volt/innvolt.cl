'use client';
import Link from 'next/link';
import { useState } from 'react';

const LINKS: [string, string][] = [
  ['Inicio', '/v3'],
  ['Servicios', '/v3/servicios'],
  ['Proyectos', '/v3/proyectos'],
  ['Tecnología', '/v3/tecnologia'],
  ['Contacto', '/v3/contacto'],
];

export default function Nav({ active }: { active?: string }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="v3-nav">
      <div className="v3-container v3-nav-inner">
        <Link href="/v3" className="v3-brand" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/innvolt-5b-claro.svg" alt="InnVolt" className="v3-logo-img" />
        </Link>
        <nav className="v3-nav-links">
          {LINKS.map(([l, h]) => (
            <Link key={h} href={h} className={active === l ? 'is-active' : ''}>{l}</Link>
          ))}
        </nav>
        <Link href="/v3/contacto" className="v3-btn v3-btn-sm v3-nav-cta">Cotizar</Link>
        <button className="v3-burger" aria-label="Menú" aria-expanded={open} onClick={() => setOpen(o => !o)}>
          <span />
        </button>
      </div>
      {open && (
        <div className="v3-mobile">
          {LINKS.map(([l, h]) => (
            <Link key={h} href={h} onClick={() => setOpen(false)}>{l}</Link>
          ))}
          <Link href="/v3/contacto" className="v3-btn" onClick={() => setOpen(false)}>Cotizar</Link>
        </div>
      )}
    </header>
  );
}
