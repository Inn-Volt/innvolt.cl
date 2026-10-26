'use client';

import { useEffect, useRef, useState } from 'react';

/*
  Técnico que aparece junto al botón de WhatsApp (escritorio) o sobre la barra inferior (móvil)
  y lo señala con un globo de texto. Se puede cerrar y queda cerrado en ese navegador.
  La entrada es solo CSS (con retraso), así que no afecta la carga de la página.
*/
const KEY = 'iv-guia-off';

export default function WaGuide({ href }: { href: string }) {
  const [off, setOff] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Si ya lo cerró antes, se oculta antes de que alcance a aparecer (la entrada parte a los 2,5 s)
  useEffect(() => {
    try { if (localStorage.getItem(KEY) && ref.current) ref.current.hidden = true; } catch {}
  }, []);

  if (off) return null;

  function close() {
    setOff(true);
    try { localStorage.setItem(KEY, '1'); } catch {}
  }

  return (
    <div className="iv-tech" ref={ref}>
      <div className="iv-tech-bubble">
        <a href={href} target="_blank" rel="noopener noreferrer">
          ¿Te ayudamos con tu proyecto? <strong>Escríbenos por WhatsApp</strong>
        </a>
        <button type="button" className="iv-tech-x" onClick={close} aria-label="Cerrar el aviso de WhatsApp">×</button>
      </div>
      <a href={href} target="_blank" rel="noopener noreferrer" className="iv-tech-fig" tabIndex={-1} aria-hidden="true">
        <svg viewBox="0 0 132 150" width="100%" height="100%">
          {/* Cuerpo: chaqueta de trabajo con franja reflectante */}
          <path d="M16 150 C16 122 30 106 60 104 C90 106 104 122 104 150 Z" fill="#1a1813" />
          <rect x="18" y="128" width="84" height="7" fill="#F6C21C" />
          <path d="M52 104 L60 118 L68 104 Z" fill="#f6f4ee" />
          <path d="M84 113 l-6 9 h5 l-2 8 7 -10 h-5 l3 -7 z" fill="#F6C21C" />
          {/* Cuello y cabeza */}
          <rect x="53" y="88" width="14" height="18" rx="5" fill="#c98f68" />
          <circle cx="36.5" cy="73" r="5" fill="#c98f68" />
          <circle cx="83.5" cy="73" r="5" fill="#c98f68" />
          <ellipse cx="60" cy="72" rx="23" ry="25" fill="#d9a07a" />
          <g className="iv-tech-eyes">
            <ellipse cx="51.5" cy="74" rx="2.6" ry="3.2" fill="#1a1813" />
            <ellipse cx="68.5" cy="74" rx="2.6" ry="3.2" fill="#1a1813" />
          </g>
          <path d="M47 67.5 q4.5 -3 9 -0.5 M64 67 q4.5 -2.5 9 0.5" stroke="#1a1813" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M52 85 q8 6 16 0" stroke="#1a1813" strokeWidth="2.4" fill="none" strokeLinecap="round" />
          {/* Casco con el rayo de InnVolt */}
          <path d="M34 60 C34 38 47 30 60 30 C73 30 86 38 86 60 Z" fill="#F6C21C" stroke="#1a1813" strokeWidth="2" />
          <rect x="28" y="57" width="64" height="7" rx="3.5" fill="#F6C21C" stroke="#1a1813" strokeWidth="2" />
          <path d="M57 32 v24 M63 32 v24" stroke="#1a1813" strokeWidth="1.6" opacity=".35" />
          <path d="M63 38 l-8 11 h6 l-3 8 9 -12 h-6 l4 -7 z" fill="#1a1813" />
          {/* Brazo que señala el botón */}
          <g className="iv-tech-arm">
            <path d="M88 116 C98 110 108 106 118 104" stroke="#1a1813" strokeWidth="13" strokeLinecap="round" fill="none" />
            <circle cx="120" cy="103.5" r="6.5" fill="#d9a07a" />
            <rect x="121" y="100.5" width="10" height="4.6" rx="2.3" fill="#d9a07a" />
          </g>
        </svg>
      </a>
    </div>
  );
}
