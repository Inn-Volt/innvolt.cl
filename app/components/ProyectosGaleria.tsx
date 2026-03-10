'use client';

import { useState, useEffect, useCallback } from 'react';
import { Proyecto } from '@/types';
import { getOptimizedUrl } from '@/lib/cloudinary';
import { supabase } from '@/lib/supabase';

const CATS = ['Todos', 'Electricidad', 'Domótica', 'Redes y CCTV'];

export default function ProyectosGaleria() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [filtro,    setFiltro]    = useState('Todos');
  const [modal,     setModal]     = useState<Proyecto | null>(null);
  const [idx,       setIdx]       = useState(0);

  async function load() {
    const { data } = await supabase
      .from('proyectos').select('*').eq('activo', true)
      .order('created_at', { ascending: false });
    setProyectos(data || []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    const ch = supabase.channel('pry').on('postgres_changes', { event: '*', schema: 'public', table: 'proyectos' }, load).subscribe();
    return () => { supabase.removeChannel(ch); };
  }, []);

  const prev = useCallback(() => modal && setIdx(i => (i - 1 + modal.imagenes.length) % modal.imagenes.length), [modal]);
  const next = useCallback(() => modal && setIdx(i => (i + 1) % modal.imagenes.length), [modal]);

  useEffect(() => {
    if (!modal) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape') { setModal(null); setIdx(0); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [modal, prev, next]);

  const lista = filtro === 'Todos' ? proyectos : proyectos.filter(p => p.categoria === filtro);

  return (
    <section id="proyectos" className="section" style={{ background: 'var(--bg3)' }}>
      <div className="container">

        {/* Header + filtros */}
        <div className="section-header-row" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem', marginBottom: '3rem' }}>
          <div>
            <p className="label" style={{ marginBottom: '0.75rem' }}>— Trabajo real</p>
            <h2 className="display" style={{ fontSize: 'clamp(2.4rem,5vw,4rem)' }}>NUESTROS<br />PROYECTOS</h2>
          </div>

          {/* Filtros */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
            {CATS.map(cat => (
              <button key={cat} onClick={() => setFiltro(cat)} style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '0.65rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                padding: '0.5rem 1rem',
                border: '1px solid',
                cursor: 'pointer',
                transition: 'all 0.2s',
                background: filtro === cat ? 'var(--y)' : 'transparent',
                borderColor: filtro === cat ? 'var(--y)' : 'rgba(255,255,255,0.15)',
                color: filtro === cat ? '#000' : 'rgba(255,255,255,0.4)',
              }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skeletons */}
        {loading && (
          <div className="projects-grid">
            {[1,2,3].map(i => (
              <div key={i} style={{ height: 300, background: 'rgba(255,255,255,0.04)', animation: 'pulse 2s infinite' }} />
            ))}
          </div>
        )}

        {/* Vacío */}
        {!loading && lista.length === 0 && (
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <p style={{ fontFamily: 'var(--font-display)', color: 'var(--muted)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              {proyectos.length === 0 ? 'Pronto publicaremos nuestros proyectos' : 'Sin proyectos en esta categoría'}
            </p>
          </div>
        )}

        {/* Grid */}
        {!loading && lista.length > 0 && (
          <div className="projects-grid">
            {lista.map(p => (
              <button key={p.id} className="project-card" onClick={() => { setModal(p); setIdx(0); }}>
                <img src={getOptimizedUrl(p.imagenes?.[0] || '', 700, 500)} alt={p.titulo} />
                <div className="project-overlay" />

                {/* Top badges */}
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', right: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span className="project-cat">{p.categoria}</span>
                  {(p.imagenes?.length || 0) > 1 && (
                    <span style={{ fontFamily: 'var(--font-display)', background: 'rgba(0,0,0,0.75)', color: 'rgba(255,255,255,0.8)', fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.1em', padding: '0.2rem 0.6rem' }}>
                      📷 {p.imagenes.length}
                    </span>
                  )}
                </div>

                <div className="project-info">
                  {p.ubicacion && <p className="project-loc">📍 {p.ubicacion}</p>}
                  <h4 className="project-title">{p.titulo}</h4>
                  <div className="project-bar" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── MODAL ── */}
      {modal && (
        <div className="modal-backdrop" onClick={() => { setModal(null); setIdx(0); }}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>

            {/* Foto */}
            <div style={{ position: 'relative', background: '#000', flexShrink: 0, height: 'clamp(260px, 55vh, 560px)' }}>
              <img key={idx}
                src={getOptimizedUrl(modal.imagenes[idx] || '', 1400, 900)}
                alt={modal.titulo}
                style={{ width: '100%', height: '100%', objectFit: 'contain', animation: 'fadeIn 0.25s ease' }} />

              {/* Flechas */}
              {modal.imagenes.length > 1 && (<>
                <button onClick={prev} style={arrowStyle('left')}
                  onMouseEnter={e => arrowHover(e, true)} onMouseLeave={e => arrowHover(e, false)}>‹</button>
                <button onClick={next} style={arrowStyle('right')}
                  onMouseEnter={e => arrowHover(e, true)} onMouseLeave={e => arrowHover(e, false)}>›</button>
                <div style={{ position: 'absolute', bottom: '0.9rem', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.7)', color: 'rgba(255,255,255,0.7)', fontFamily: 'var(--font-display)', fontSize: '0.6rem', letterSpacing: '0.2em', padding: '0.3rem 0.8rem' }}>
                  {idx + 1} / {modal.imagenes.length}
                </div>
              </>)}

              {/* Cerrar */}
              <button onClick={() => { setModal(null); setIdx(0); }} style={closeStyle}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.color = '#000'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(0,0,0,0.7)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; }}>
                ✕
              </button>

              <span style={{ position: 'absolute', top: '1rem', left: '1rem', fontFamily: 'var(--font-display)', background: 'var(--y)', color: '#000', fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.2rem 0.7rem' }}>
                {modal.categoria}
              </span>
            </div>

            {/* Miniaturas */}
            {modal.imagenes.length > 1 && (
              <div style={{ display: 'flex', gap: '2px', padding: '0.5rem', background: '#000', overflowX: 'auto', flexShrink: 0 }}>
                {modal.imagenes.map((img, i) => (
                  <button key={i} onClick={() => setIdx(i)} style={{
                    flexShrink: 0, width: 68, height: 52, overflow: 'hidden',
                    cursor: 'pointer', border: `2px solid ${i === idx ? 'var(--y)' : 'transparent'}`,
                    opacity: i === idx ? 1 : 0.4, transition: 'all 0.2s', padding: 0, background: 'none',
                  }}>
                    <img src={getOptimizedUrl(img, 150, 120)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </button>
                ))}
              </div>
            )}

            {/* Info + CTA */}
            <div style={{ padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap', flexShrink: 0, borderTop: '1px solid var(--border2)' }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <h3 className="display" style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>{modal.titulo}</h3>
                {modal.ubicacion && <p className="label" style={{ marginBottom: '0.4rem', fontSize: '0.6rem' }}>📍 {modal.ubicacion}</p>}
                {modal.descripcion && <p className="body-sm" style={{ fontSize: '0.82rem' }}>{modal.descripcion}</p>}
              </div>
              <a href="https://wa.me/56989203902" target="_blank" rel="noopener noreferrer" className="btn btn-primary"
                style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>
                QUIERO ESTO →
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from{opacity:0}to{opacity:1} }
        @keyframes pulse  { 0%,100%{opacity:0.3}50%{opacity:0.6} }
      `}</style>
    </section>
  );
}

/* ── Estilos modal helpers ── */
function arrowStyle(side: 'left' | 'right'): React.CSSProperties {
  return {
    position: 'absolute', [side]: '0.75rem', top: '50%', transform: 'translateY(-50%)',
    background: 'rgba(0,0,0,0.75)', border: '1px solid rgba(255,198,0,0.25)',
    color: '#fff', width: 44, height: 44, cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '1.3rem', transition: 'all 0.2s', fontFamily: 'sans-serif',
  };
}
function arrowHover(e: React.MouseEvent, on: boolean) {
  const el = e.currentTarget as HTMLElement;
  el.style.background = on ? 'var(--y)' : 'rgba(0,0,0,0.75)';
  el.style.color = on ? '#000' : '#fff';
}
const closeStyle: React.CSSProperties = {
  position: 'absolute', top: '0.75rem', right: '0.75rem',
  background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.1)',
  color: 'rgba(255,255,255,0.7)', width: 36, height: 36, cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: '0.8rem', transition: 'all 0.2s',
};
