'use client';

import { useState, useEffect, useCallback } from 'react';
import { Proyecto } from '@/types';
import { getOptimizedUrl } from '@/lib/cloudinary';
import { supabase } from '@/lib/supabase';
import { MapPin, ChevronLeft, ChevronRight, X } from 'lucide-react';

const CATEGORIAS = ['Todos', 'Electricidad', 'Domótica', 'Redes y CCTV'];

export default function ProyectosGaleria() {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [filtro,    setFiltro]    = useState('Todos');
  const [modal,     setModal]     = useState<Proyecto | null>(null);
  const [photoIdx,  setPhotoIdx]  = useState(0);

  /* ── Carga inicial ── */
  async function fetchProyectos() {
    const { data } = await supabase
      .from('proyectos')
      .select('*')
      .eq('activo', true)
      .order('created_at', { ascending: false });
    setProyectos(data || []);
    setLoading(false);
  }

  /* ── Tiempo real con Supabase Realtime ── */
  useEffect(() => {
    fetchProyectos();

    const channel = supabase
      .channel('proyectos-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'proyectos' }, () => {
        fetchProyectos(); // Re-fetch al detectar cualquier cambio
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, []);

  /* ── Navegación fotos en modal ── */
  const prevPhoto = useCallback(() => {
    if (!modal) return;
    setPhotoIdx(i => (i - 1 + modal.imagenes.length) % modal.imagenes.length);
  }, [modal]);

  const nextPhoto = useCallback(() => {
    if (!modal) return;
    setPhotoIdx(i => (i + 1) % modal.imagenes.length);
  }, [modal]);

  /* ── Teclado ── */
  useEffect(() => {
    if (!modal) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft')  prevPhoto();
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'Escape')     { setModal(null); setPhotoIdx(0); }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modal, prevPhoto, nextPhoto]);

  function openModal(p: Proyecto) {
    setModal(p);
    setPhotoIdx(0);
  }

  const filtrados = filtro === 'Todos'
    ? proyectos
    : proyectos.filter(p => p.categoria === filtro);

  return (
    <section id="proyectos" className="py-16 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="text-center mb-10 md:mb-16 space-y-4">
          <h2 className="text-[10px] md:text-[12px] font-black text-slate-400 uppercase tracking-[0.5em]">Trabajo real</h2>
          <h3 className="text-4xl md:text-6xl font-black text-[#1e293b] tracking-tighter italic uppercase">
            Nuestros <span className="text-[#ffc600]">Proyectos</span>
          </h3>
          <p className="text-slate-500 text-sm md:text-base max-w-lg mx-auto">
            Cada instalación ejecutada con estándares técnicos certificados.
          </p>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10 md:mb-14">
          {CATEGORIAS.map(cat => (
            <button key={cat} onClick={() => setFiltro(cat)}
              className={`px-5 py-2 rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest transition-all border-2 ${
                filtro === cat
                  ? 'bg-[#ffc600] border-[#ffc600] text-[#1e293b]'
                  : 'bg-white border-slate-200 text-slate-500 hover:border-[#ffc600] hover:text-[#1e293b]'
              }`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Skeleton loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {[1,2,3].map(i => <div key={i} className="h-[280px] md:h-[340px] rounded-[1.5rem] bg-slate-200 animate-pulse" />)}
          </div>
        )}

        {/* Vacío */}
        {!loading && filtrados.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">
              {proyectos.length === 0 ? 'Pronto publicaremos nuestros proyectos' : 'No hay proyectos en esta categoría'}
            </p>
          </div>
        )}

        {/* Grid */}
        {!loading && filtrados.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {filtrados.map(p => (
              <button key={p.id} onClick={() => openModal(p)}
                className="group relative h-[280px] md:h-[360px] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl text-left w-full">
                <img
                  src={getOptimizedUrl(p.imagenes?.[0] || '', 600, 450)}
                  alt={p.titulo}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1e293b] via-[#1e293b]/20 to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
                  <span className="bg-[#ffc600] text-[#1e293b] text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                    {p.categoria}
                  </span>
                  {p.destacado && <span className="bg-[#1e293b]/80 text-[#ffc600] text-[9px] font-black px-2 py-1 rounded-full">⭐</span>}
                </div>

                {/* Contador fotos */}
                {(p.imagenes?.length || 0) > 1 && (
                  <div className="absolute top-4 right-4 bg-black/60 text-white text-[9px] font-black px-2 py-1 rounded-full flex items-center gap-1">
                    📷 {p.imagenes.length}
                  </div>
                )}

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                  <h4 className="text-white font-black text-base md:text-lg uppercase italic leading-tight mb-1">{p.titulo}</h4>
                  {p.ubicacion && (
                    <p className="text-slate-300 text-[10px] font-bold flex items-center gap-1 mt-1">
                      <MapPin size={11} className="text-[#ffc600]" /> {p.ubicacion}
                    </p>
                  )}
                  <div className="w-8 h-[3px] bg-[#ffc600] mt-3" />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── MODAL ── */}
      {modal && (
        <div
          className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-2 md:p-6"
          onClick={() => { setModal(null); setPhotoIdx(0); }}
        >
          <div
            className="bg-[#0f172a] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden w-full max-w-4xl max-h-[95vh] flex flex-col shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            {/* Foto principal */}
            <div className="relative bg-black" style={{ height: 'clamp(220px, 50vh, 520px)' }}>
              <img
                key={photoIdx}
                src={getOptimizedUrl(modal.imagenes[photoIdx] || '', 1200, 800)}
                alt={modal.titulo}
                className="w-full h-full object-contain"
                style={{ animation: 'fadeIn 0.2s ease' }}
              />

              {/* Flechas navegación */}
              {modal.imagenes.length > 1 && (
                <>
                  <button onClick={prevPhoto}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#ffc600] text-white hover:text-[#1e293b] w-10 h-10 rounded-full flex items-center justify-center transition-all">
                    <ChevronLeft size={20} />
                  </button>
                  <button onClick={nextPhoto}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-[#ffc600] text-white hover:text-[#1e293b] w-10 h-10 rounded-full flex items-center justify-center transition-all">
                    <ChevronRight size={20} />
                  </button>
                  {/* Contador */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-[10px] font-black px-3 py-1 rounded-full">
                    {photoIdx + 1} / {modal.imagenes.length}
                  </div>
                </>
              )}

              {/* Cerrar */}
              <button onClick={() => { setModal(null); setPhotoIdx(0); }}
                className="absolute top-3 right-3 bg-black/60 hover:bg-white text-white hover:text-[#1e293b] w-9 h-9 rounded-full flex items-center justify-center transition-all">
                <X size={16} />
              </button>

              {/* Badge categoría */}
              <span className="absolute top-3 left-3 bg-[#ffc600] text-[#1e293b] text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                {modal.categoria}
              </span>
            </div>

            {/* Grid de miniaturas */}
            {modal.imagenes.length > 1 && (
              <div className="flex gap-2 p-3 bg-[#1e293b] overflow-x-auto">
                {modal.imagenes.map((img, i) => (
                  <button key={i} onClick={() => setPhotoIdx(i)}
                    className="shrink-0 transition-all"
                    style={{ width: '64px', height: '64px', borderRadius: '0.5rem', overflow: 'hidden', border: `2px solid ${i === photoIdx ? '#ffc600' : 'transparent'}`, opacity: i === photoIdx ? 1 : 0.5 }}>
                    <img src={getOptimizedUrl(img, 120, 120)} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Info del proyecto */}
            <div className="p-5 md:p-8 overflow-y-auto">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-black text-white uppercase italic tracking-tighter leading-tight">
                    {modal.titulo}
                  </h3>
                  {modal.ubicacion && (
                    <p className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest">
                      <MapPin size={12} className="text-[#ffc600]" /> {modal.ubicacion}
                    </p>
                  )}
                  {modal.descripcion && (
                    <p className="text-slate-400 text-sm leading-relaxed pt-1">{modal.descripcion}</p>
                  )}
                </div>
                <a href="https://wa.me/56989203902" target="_blank" rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-2 bg-[#ffc600] text-[#1e293b] font-black uppercase text-[10px] tracking-widest px-5 py-3 rounded-xl hover:bg-white transition-all whitespace-nowrap">
                  Quiero esto →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0.4; } to { opacity: 1; } }
      `}</style>
    </section>
  );
}
