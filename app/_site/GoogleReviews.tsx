'use client';

import { useEffect, useRef, useState } from 'react';
import type { Resena, Resenas } from './resenas';

/*
  Reseñas reales de Google que van pasando en una cinta (se detiene al pasar el mouse).
  Se piden a /api/resenas recién cuando la sección se acerca a la pantalla, así no pesan en la carga.
  Si no hay clave, no hay reseñas o Google falla, solo se ve lo que viene en `children`
  (la invitación a dejar una reseña), que se muestra siempre debajo.
*/
export default function GoogleReviews({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<Resenas | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting)) return;
      io.disconnect();
      fetch('/api/resenas')
        .then(r => (r.ok ? r.json() : null))
        .then((d: Resenas | null) => { if (d?.ok && d.resenas.length) setData(d); })
        .catch(() => {});
    }, { rootMargin: '600px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const lista = data?.resenas ?? [];
  const cinta = lista.length >= 3;                     // con pocas reseñas, se muestran fijas

  return (
    <div ref={ref}>
      {data && (
        <div className="iv-gr">
          <div className="iv-gr-head">
            <div>
              <span className="iv-kicker">Reseñas de clientes</span>
              <h2 className="iv-h2">Lo que dicen de InnVolt</h2>
            </div>
            <a href={data.url} target="_blank" rel="noopener noreferrer" className="iv-gr-score">
              {data.rating != null && <strong>{data.rating.toLocaleString('es-CL', { minimumFractionDigits: 1, maximumFractionDigits: 1 })}</strong>}
              <span>
                {data.rating != null && <Stars n={data.rating} />}
                <small>{data.total} {data.total === 1 ? 'reseña' : 'reseñas'} en <span className="iv-gr-gm">Google Maps</span></small>
              </span>
            </a>
          </div>

          <div className={cinta ? 'iv-gr-view' : 'iv-gr-view iv-gr-static'}>
            <div className="iv-gr-track" style={cinta ? { animationDuration: `${lista.length * 9}s` } : undefined}>
              {lista.map((r, i) => <Card key={i} r={r} />)}
              {cinta && lista.map((r, i) => <Card key={`d${i}`} r={r} copy />)}
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}

function Card({ r, copy = false }: { r: Resena; copy?: boolean }) {
  const tab = copy ? -1 : undefined;
  return (
    <article className="iv-card iv-gr-card" aria-hidden={copy || undefined}>
      <header className="iv-gr-who">
        {r.foto
          // eslint-disable-next-line @next/next/no-img-element
          ? <img src={r.foto} alt="" width={40} height={40} loading="lazy" referrerPolicy="no-referrer" />
          : <span className="iv-gr-ini" aria-hidden="true">{r.autor.charAt(0)}</span>}
        <span>
          {r.autorUrl
            ? <a href={r.autorUrl} target="_blank" rel="noopener noreferrer" tabIndex={tab}>{r.autor}</a>
            : <b>{r.autor}</b>}
          <small>{r.cuando}</small>
        </span>
      </header>
      <Stars n={r.estrellas} />
      <p>{r.texto}</p>
      <a href={r.url} target="_blank" rel="noopener noreferrer" className="iv-gr-src" tabIndex={tab}>
        Ver en <span className="iv-gr-gm">Google Maps</span>
      </a>
    </article>
  );
}

function Stars({ n }: { n: number }) {
  const pct = Math.max(0, Math.min(100, (n / 5) * 100));
  return (
    <span className="iv-gr-stars" role="img" aria-label={`${n.toLocaleString('es-CL')} de 5 estrellas`}>
      <span aria-hidden="true">★★★★★</span>
      <span aria-hidden="true" style={{ width: `${pct}%` }}>★★★★★</span>
    </span>
  );
}
