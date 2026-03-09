'use client';

import { useState, useEffect, useCallback } from 'react';
import { Proyecto } from '@/types';
import { getOptimizedUrl } from '@/lib/cloudinary';
import { supabase } from '@/lib/supabase';

const CATEGORIAS = ['Todos', 'Electricidad', 'Domótica', 'Redes y CCTV'];

export default function ProyectosGaleria() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [filtro,    setFiltro]    = useState('Todos');
  const [modal,     setModal]     = useState<Proyecto | null>(null);
  const [photoIdx,  setPhotoIdx]  = useState(0);

  async function fetchProyectos() {
    const { data } = await supabase
      .from('proyectos').select('*').eq('activo', true)
      .order('created_at', { ascending: false });
    setProyectos(data || []);
    setLoading(false);
  }

  useEffect(() => {
    fetchProyectos();
    const channel = supabase.channel('proyectos-rt')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'proyectos' }, fetchProyectos)
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, []);

  const prevPhoto = useCallback(() => {
    if (!modal) return;
    setPhotoIdx(i => (i - 1 + modal.imagenes.length) % modal.imagenes.length);
  }, [modal]);

  const nextPhoto = useCallback(() => {
    if (!modal) return;
    setPhotoIdx(i => (i + 1) % modal.imagenes.length);
  }, [modal]);

  useEffect(() => {
    if (!modal) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  prevPhoto();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'Escape')     { setModal(null); setPhotoIdx(0); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modal, prevPhoto, nextPhoto]);

  const filtrados = filtro === 'Todos' ? proyectos : proyectos.filter(p => p.categoria === filtro);

  return (
    <section id="proyectos" style={{ padding: '7rem 0', background: '#0d1520', position: 'relative', overflow: 'hidden' }}>
      {/* Grid bg */}
      <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,198,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,198,0,0.02) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 1 }}>

        {/* Header */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem', marginBottom: '3.5rem' }}>
          <div>
            <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffc600', marginBottom: '1rem' }}>— Trabajo real</p>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#fff', lineHeight: 0.95 }}>
              NUESTROS<br />PROYECTOS
            </h2>
          </div>
          {/* Filtros */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {CATEGORIAS.map(cat => (
              <button key={cat} onClick={() => setFiltro(cat)}
                style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.55rem 1.1rem', borderRadius: '100px', border: '1px solid', cursor: 'pointer', transition: 'all 0.2s',
                  background: filtro === cat ? '#ffc600' : 'transparent',
                  borderColor: filtro === cat ? '#ffc600' : 'rgba(255,255,255,0.12)',
                  color: filtro === cat ? '#0d1520' : 'rgba(255,255,255,0.45)',
                }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skeletons */}
        {loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {[1,2,3].map(i => (
              <div key={i} style={{ height: '340px', borderRadius: '12px', background: 'rgba(255,255,255,0.04)', animation: 'pulse 2s infinite' }} />
            ))}
          </div>
        )}

        {/* Vacío */}
        {!loading && filtrados.length === 0 && (
          <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <p style={{ fontFamily: "'Space Mono', monospace", color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
              {proyectos.length === 0 ? 'Pronto publicaremos nuestros proyectos' : 'Sin proyectos en esta categoría'}
            </p>
          </div>
        )}

        {/* Grid masonry-style */}
        {!loading && filtrados.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {filtrados.map((p, idx) => (
              <button key={p.id} onClick={() => { setModal(p); setPhotoIdx(0); }}
                style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', cursor: 'pointer', border: 'none', padding: 0, background: 'none', textAlign: 'left', display: 'block', width: '100%',
                  height: idx % 5 === 0 ? '420px' : '300px',
                  transition: 'transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.35s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px) scale(1.01)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 24px 60px rgba(0,0,0,0.5)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0) scale(1)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}>

                {/* Imagen */}
                <img src={getOptimizedUrl(p.imagenes?.[0] || '', 700, 500)} alt={p.titulo}
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }} />

                {/* Gradiente */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,21,32,0.95) 0%, rgba(13,21,32,0.3) 50%, transparent 100%)' }} />

                {/* Top badges */}
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', right: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{ fontFamily: "'Space Mono', monospace", background: '#ffc600', color: '#0d1520', fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.3rem 0.7rem', borderRadius: '100px' }}>
                    {p.categoria}
                  </span>
                  {(p.imagenes?.length || 0) > 1 && (
                    <span style={{ fontFamily: "'Space Mono', monospace", background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)', color: 'rgba(255,255,255,0.8)', fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.1em', padding: '0.3rem 0.7rem', borderRadius: '100px' }}>
                      📷 {p.imagenes.length}
                    </span>
                  )}
                </div>

                {/* Bottom info */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.5rem' }}>
                  {p.ubicacion && (
                    <p style={{ fontFamily: "'Space Mono', monospace", color: '#ffc600', fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
                      📍 {p.ubicacion}
                    </p>
                  )}
                  <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", color: '#fff', fontSize: '1.4rem', lineHeight: 1.1, marginBottom: '0.75rem' }}>{p.titulo}</h4>
                  <div style={{ width: '28px', height: '2px', background: '#ffc600' }} />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── MODAL PREMIUM ── */}
      {modal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', animation: 'fadeIn 0.2s ease' }}
          onClick={() => { setModal(null); setPhotoIdx(0); }}>
          <div style={{ background: '#0d1520', borderRadius: '16px', overflow: 'hidden', width: '100%', maxWidth: '1000px', maxHeight: '95vh', display: 'flex', flexDirection: 'column', boxShadow: '0 40px 120px rgba(0,0,0,0.8)', border: '1px solid rgba(255,198,0,0.1)' }}
            onClick={e => e.stopPropagation()}>

            {/* Foto principal */}
            <div style={{ position: 'relative', background: '#000', flexShrink: 0, height: 'clamp(260px, 55vh, 580px)' }}>
              <img key={photoIdx}
                src={getOptimizedUrl(modal.imagenes[photoIdx] || '', 1400, 900)}
                alt={modal.titulo}
                style={{ width: '100%', height: '100%', objectFit: 'contain', animation: 'fadeIn 0.25s ease' }} />

              {/* Flechas */}
              {modal.imagenes.length > 1 && (
                <>
                  <button onClick={prevPhoto}
                    style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(13,21,32,0.8)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,198,0,0.2)', color: '#fff', width: '44px', height: '44px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', transition: 'all 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#ffc600'; (e.currentTarget as HTMLElement).style.color = '#0d1520'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(13,21,32,0.8)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}>
                    ‹
                  </button>
                  <button onClick={nextPhoto}
                    style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(13,21,32,0.8)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,198,0,0.2)', color: '#fff', width: '44px', height: '44px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem', transition: 'all 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#ffc600'; (e.currentTarget as HTMLElement).style.color = '#0d1520'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(13,21,32,0.8)'; (e.currentTarget as HTMLElement).style.color = '#fff'; }}>
                    ›
                  </button>
                  {/* Contador */}
                  <div style={{ position: 'absolute', bottom: '1rem', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', color: 'rgba(255,255,255,0.8)', fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.15em', padding: '0.35rem 0.9rem', borderRadius: '100px' }}>
                    {photoIdx + 1} / {modal.imagenes.length}
                  </div>
                </>
              )}

              {/* Cerrar */}
              <button onClick={() => { setModal(null); setPhotoIdx(0); }}
                style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(13,21,32,0.8)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', width: '36px', height: '36px', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; (e.currentTarget as HTMLElement).style.color = '#0d1520'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(13,21,32,0.8)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)'; }}>
                ✕
              </button>

              {/* Badge categoría */}
              <span style={{ position: 'absolute', top: '1rem', left: '1rem', fontFamily: "'Space Mono', monospace", background: '#ffc600', color: '#0d1520', fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.3rem 0.8rem', borderRadius: '100px' }}>
                {modal.categoria}
              </span>
            </div>

            {/* Miniaturas */}
            {modal.imagenes.length > 1 && (
              <div style={{ display: 'flex', gap: '0.5rem', padding: '0.75rem 1rem', background: '#070e18', overflowX: 'auto', flexShrink: 0 }}>
                {modal.imagenes.map((img, i) => (
                  <button key={i} onClick={() => setPhotoIdx(i)}
                    style={{ flexShrink: 0, width: '72px', height: '54px', borderRadius: '6px', overflow: 'hidden', cursor: 'pointer', border: `2px solid ${i === photoIdx ? '#ffc600' : 'transparent'}`, opacity: i === photoIdx ? 1 : 0.45, transition: 'all 0.2s', padding: 0, background: 'none' }}>
                    <img src={getOptimizedUrl(img, 150, 120)} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </button>
                ))}
              </div>
            )}

            {/* Info + CTA */}
            <div style={{ padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1.5rem', flexWrap: 'wrap', flexShrink: 0 }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.6rem', color: '#fff', lineHeight: 1, marginBottom: '0.4rem' }}>{modal.titulo}</h3>
                {modal.ubicacion && (
                  <p style={{ fontFamily: "'Space Mono', monospace", color: '#ffc600', fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>📍 {modal.ubicacion}</p>
                )}
                {modal.descripcion && (
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', lineHeight: 1.6, fontWeight: 300, maxWidth: '500px' }}>{modal.descripcion}</p>
                )}
              </div>
              <a href="https://wa.me/56989203902" target="_blank" rel="noopener noreferrer"
                style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#ffc600', color: '#0d1520', fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.9rem 1.75rem', borderRadius: '8px', textDecoration: 'none', transition: 'all 0.2s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#fff'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#ffc600'}>
                Quiero esto →
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pulse { 0%,100% { opacity: 0.4; } 50% { opacity: 0.7; } }
      `}</style>
    </section>
  );
}
