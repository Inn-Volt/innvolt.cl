'use client';

import { useState, useEffect, useRef } from 'react';
import { uploadImage, getOptimizedUrl } from '@/lib/cloudinary';
import { Proyecto, Categoria } from '@/types';

const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'innvolt2026';
const CATEGORIAS: Categoria[] = ['Electricidad', 'Domótica', 'Redes y CCTV'];

const C = {
  yellow: '#ffc600', dark: '#1e293b', dark2: '#0f172a', dark3: '#1a2740',
  cardBg: '#162032', border: 'rgba(255,198,0,0.15)', borderDim: 'rgba(255,255,255,0.06)',
  text: '#f1f5f9', muted: '#64748b', dim: '#334155',
};

function ZapIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={C.yellow}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

const emptyForm = {
  titulo: '', descripcion: '', categoria: 'Electricidad' as Categoria,
  ubicacion: '', imagenes: [] as string[], destacado: false, activo: true,
};

interface UploadItem {
  file: File;
  preview: string;
  status: 'pending' | 'uploading' | 'done' | 'error';
  url: string;
}

export default function AdminPanel() {
  const [logged, setLogged]       = useState(false);
  const [pass, setPass]           = useState('');
  const [passError, setPassError] = useState(false);
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading]     = useState(false);
  const [tab, setTab]             = useState<'lista' | 'nuevo' | 'editar'>('lista');
  const [form, setForm]           = useState({ ...emptyForm });
  const [editId, setEditId]       = useState<string | null>(null);
  const [saving, setSaving]       = useState(false);
  const [uploads, setUploads]     = useState<UploadItem[]>([]);
  const [feedback, setFeedback]   = useState<{ msg: string; ok: boolean } | null>(null);
  const [delConfirm, setDelConfirm] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function login() {
    if (pass === ADMIN_PASS) { setLogged(true); setPassError(false); }
    else setPassError(true);
  }

  async function fetchProyectos() {
    setLoading(true);
    const res  = await fetch('/api/proyectos', { headers: { 'x-admin-key': ADMIN_PASS } });
    const data = await res.json();
    setProyectos(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  useEffect(() => { if (logged) fetchProyectos(); }, [logged]);

  /* ── Selección múltiple de archivos ── */
  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const items: UploadItem[] = files.map(f => ({
      file: f,
      preview: URL.createObjectURL(f),
      status: 'pending',
      url: '',
    }));
    setUploads(prev => [...prev, ...items]);
    // Subir todas inmediatamente
    items.forEach((item, idx) => uploadOne(item, uploads.length + idx));
  }

  async function uploadOne(item: UploadItem, idx: number) {
    setUploads(prev => prev.map((u, i) => i === idx ? { ...u, status: 'uploading' } : u));
    try {
      const url = await uploadImage(item.file);
      setUploads(prev => {
        const next = prev.map((u, i) => i === idx ? { ...u, status: 'done', url } : u);
        // Sincronizar URLs al form
        const urls = next.filter(u => u.status === 'done').map(u => u.url);
        setForm(f => ({ ...f, imagenes: urls }));
        return next;
      });
    } catch {
      setUploads(prev => prev.map((u, i) => i === idx ? { ...u, status: 'error' } : u));
      showFeedback('Error al subir una imagen. Intenta de nuevo.', false);
    }
  }

  function removeUpload(idx: number) {
    setUploads(prev => {
      const next = prev.filter((_, i) => i !== idx);
      const urls = next.filter(u => u.status === 'done').map(u => u.url);
      setForm(f => ({ ...f, imagenes: urls }));
      return next;
    });
  }

  function showFeedback(msg: string, ok: boolean) {
    setFeedback({ msg, ok });
    setTimeout(() => setFeedback(null), 4000);
  }

  async function handleSave() {
    if (!form.titulo.trim()) { showFeedback('El título es obligatorio', false); return; }
    if (form.imagenes.length === 0) { showFeedback('Agrega al menos una foto', false); return; }
    const uploading = uploads.some(u => u.status === 'uploading');
    if (uploading) { showFeedback('Espera a que terminen de subir las imágenes', false); return; }

    setSaving(true);
    try {
      const method = editId ? 'PATCH' : 'POST';
      const url    = editId ? `/api/proyectos/${editId}` : '/api/proyectos';
      const res    = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'x-admin-key': ADMIN_PASS },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      showFeedback(editId ? 'Proyecto actualizado ✓' : 'Proyecto publicado ✓', true);
      resetForm();
      setTab('lista');
      fetchProyectos();
    } catch {
      showFeedback('Error al guardar. Revisa Supabase.', false);
    } finally {
      setSaving(false);
    }
  }

  function resetForm() {
    setForm({ ...emptyForm });
    setUploads([]);
    setEditId(null);
  }

  function startEdit(p: Proyecto) {
    setEditId(p.id);
    setForm({
      titulo: p.titulo, descripcion: p.descripcion, categoria: p.categoria,
      ubicacion: p.ubicacion, imagenes: p.imagenes || [],
      destacado: p.destacado, activo: p.activo,
    });
    // Reconstruir previews desde URLs existentes
    setUploads((p.imagenes || []).map(url => ({
      file: new File([], ''),
      preview: url,
      status: 'done',
      url,
    })));
    setTab('editar');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/proyectos/${id}`, {
      method: 'DELETE', headers: { 'x-admin-key': ADMIN_PASS },
    });
    if (res.ok) { fetchProyectos(); showFeedback('Proyecto eliminado', true); }
    else showFeedback('Error al eliminar', false);
    setDelConfirm(null);
  }

  async function toggleActivo(p: Proyecto) {
    await fetch(`/api/proyectos/${p.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': ADMIN_PASS },
      body: JSON.stringify({ activo: !p.activo }),
    });
    fetchProyectos();
  }

  /* ── LOGIN ── */
  if (!logged) return (
    <div style={{ minHeight: '100vh', background: C.dark2, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: '1.5rem', padding: '2.5rem', width: '100%', maxWidth: '380px', textAlign: 'center' }}>
        <ZapIcon size={40} />
        <h1 style={{ color: C.yellow, fontWeight: 900, fontSize: '1.5rem', letterSpacing: '-0.03em', margin: '1rem 0 0.25rem', textTransform: 'uppercase', fontStyle: 'italic' }}>
          INN<span style={{ color: C.text }}>VOLT</span>
        </h1>
        <p style={{ color: C.muted, fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '2rem' }}>Panel Admin</p>
        <input type="password" placeholder="Contraseña" value={pass}
          onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === 'Enter' && login()}
          style={{ width: '100%', background: C.dim, border: `2px solid ${passError ? '#ef4444' : C.borderDim}`, borderRadius: '0.75rem', padding: '0.85rem 1rem', color: C.text, fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box', marginBottom: '0.5rem' }} />
        {passError && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginBottom: '0.75rem' }}>Contraseña incorrecta</p>}
        <button onClick={login} style={{ width: '100%', background: C.yellow, color: C.dark, fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', border: 'none', borderRadius: '0.75rem', padding: '0.9rem', cursor: 'pointer', marginTop: '0.5rem' }}>
          Ingresar
        </button>
      </div>
    </div>
  );

  const isFormTab = tab === 'nuevo' || tab === 'editar';
  const allDone   = uploads.length > 0 && uploads.every(u => u.status === 'done' || u.status === 'error');
  const anyUploading = uploads.some(u => u.status === 'uploading' || u.status === 'pending');

  return (
    <div style={{ minHeight: '100vh', background: C.dark2, color: C.text, fontFamily: 'Inter, sans-serif' }}>

      {/* Header */}
      <div style={{ background: C.dark, borderBottom: `1px solid ${C.borderDim}`, padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <ZapIcon size={26} />
          <span style={{ fontWeight: 900, fontSize: '1.2rem', letterSpacing: '-0.03em', fontStyle: 'italic', textTransform: 'uppercase' }}>
            INN<span style={{ color: C.yellow }}>VOLT</span>
            <span style={{ color: C.muted, fontWeight: 400, fontSize: '0.7rem', letterSpacing: '0.1em', marginLeft: '0.5rem', fontStyle: 'normal' }}>ADMIN</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <a href="/" target="_blank" style={{ background: C.dim, color: C.text, fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0.5rem 1rem', borderRadius: '0.5rem', textDecoration: 'none' }}>Ver sitio ↗</a>
          <button onClick={() => { setLogged(false); setPass(''); }} style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0.5rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>Salir</button>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '1.5rem' }}>

        {feedback && (
          <div style={{ background: feedback.ok ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)', border: `1px solid ${feedback.ok ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'}`, color: feedback.ok ? '#86efac' : '#fca5a5', borderRadius: '0.75rem', padding: '0.8rem 1.2rem', marginBottom: '1.25rem', fontSize: '0.85rem', fontWeight: 600 }}>
            {feedback.msg}
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          {[{ id: 'lista', label: `Proyectos (${proyectos.length})` }, { id: 'nuevo', label: '+ Nuevo proyecto' }].map(t => (
            <button key={t.id} onClick={() => { setTab(t.id as 'lista' | 'nuevo'); if (t.id === 'nuevo') resetForm(); }}
              style={{ padding: '0.6rem 1.2rem', borderRadius: '0.6rem', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', border: 'none', background: tab === t.id ? C.yellow : C.dim, color: tab === t.id ? C.dark : C.muted, transition: 'all 0.2s' }}>
              {t.label}
            </button>
          ))}
          {tab === 'editar' && (
            <span style={{ padding: '0.6rem 1.2rem', borderRadius: '0.6rem', fontWeight: 700, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', background: C.yellow, color: C.dark }}>✏️ Editando</span>
          )}
        </div>

        {/* ── FORMULARIO ── */}
        {isFormTab && (
          <div style={{ background: C.cardBg, border: `1px solid ${C.border}`, borderRadius: '1.5rem', padding: '2rem', marginBottom: '2rem' }}>
            <h2 style={{ color: C.yellow, fontWeight: 900, fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '-0.02em', fontStyle: 'italic', marginBottom: '1.5rem' }}>
              {editId ? 'Editar Proyecto' : 'Nuevo Proyecto'}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>

              {/* Título */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Título *</label>
                <input value={form.titulo} onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))}
                  placeholder="Ej: Instalación eléctrica casa en Las Condes" style={inputStyle} />
              </div>

              {/* Categoría + Ubicación */}
              <div>
                <label style={labelStyle}>Categoría *</label>
                <select value={form.categoria} onChange={e => setForm(f => ({ ...f, categoria: e.target.value as Categoria }))} style={inputStyle}>
                  {CATEGORIAS.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Ubicación</label>
                <input value={form.ubicacion} onChange={e => setForm(f => ({ ...f, ubicacion: e.target.value }))}
                  placeholder="Ej: Las Condes, Santiago" style={inputStyle} />
              </div>

              {/* Descripción */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>Descripción</label>
                <textarea value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))}
                  placeholder="Describe brevemente el trabajo realizado..." rows={3}
                  style={{ ...inputStyle, resize: 'vertical' }} />
              </div>

              {/* ── ZONA DE FOTOS ── */}
              <div style={{ gridColumn: '1 / -1' }}>
                <label style={labelStyle}>
                  Fotos del proyecto * — {uploads.filter(u => u.status === 'done').length} subidas
                  {anyUploading && <span style={{ color: C.yellow, marginLeft: '0.5rem' }}>⏳ Subiendo...</span>}
                </label>

                {/* Drop zone */}
                <div onClick={() => fileRef.current?.click()}
                  style={{ border: `2px dashed ${C.border}`, borderRadius: '1rem', padding: '1.5rem', textAlign: 'center', cursor: 'pointer', background: C.dim, marginBottom: '1rem', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = C.yellow)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = C.border)}>
                  <p style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>📷</p>
                  <p style={{ color: C.text, fontWeight: 700, fontSize: '0.85rem' }}>Haz clic para seleccionar fotos</p>
                  <p style={{ color: C.muted, fontSize: '0.72rem', marginTop: '0.2rem' }}>Puedes seleccionar varias a la vez — JPG, PNG</p>
                </div>
                <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFiles} style={{ display: 'none' }} />

                {/* Grid de previews */}
                {uploads.length > 0 && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.6rem' }}>
                    {uploads.map((u, idx) => (
                      <div key={idx} style={{ position: 'relative', borderRadius: '0.75rem', overflow: 'hidden', aspectRatio: '1', background: C.dark }}>
                        <img src={u.preview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: u.status === 'done' ? 1 : 0.5 }} />
                        {/* Estado overlay */}
                        {u.status === 'uploading' && (
                          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '1.5rem' }}>⏳</span>
                          </div>
                        )}
                        {u.status === 'error' && (
                          <div style={{ position: 'absolute', inset: 0, background: 'rgba(239,68,68,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ fontSize: '1.5rem' }}>❌</span>
                          </div>
                        )}
                        {u.status === 'done' && (
                          <div style={{ position: 'absolute', top: '0.3rem', left: '0.3rem', background: 'rgba(34,197,94,0.9)', borderRadius: '99px', width: '1.2rem', height: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 900 }}>✓</div>
                        )}
                        {/* Botón quitar */}
                        <button onClick={() => removeUpload(idx)}
                          style={{ position: 'absolute', top: '0.3rem', right: '0.3rem', background: 'rgba(0,0,0,0.7)', color: '#fff', border: 'none', borderRadius: '99px', width: '1.4rem', height: '1.4rem', cursor: 'pointer', fontSize: '0.65rem', fontWeight: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          ✕
                        </button>
                        {/* Número de orden */}
                        <div style={{ position: 'absolute', bottom: '0.3rem', left: '0.3rem', background: 'rgba(0,0,0,0.6)', color: C.yellow, borderRadius: '4px', padding: '0 0.3rem', fontSize: '0.6rem', fontWeight: 900 }}>
                          #{idx + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Switches */}
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  <input type="checkbox" checked={form.destacado} onChange={e => setForm(f => ({ ...f, destacado: e.target.checked }))} style={{ width: '1.1rem', height: '1.1rem', accentColor: C.yellow }} />
                  ⭐ Destacado
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700, color: C.muted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  <input type="checkbox" checked={form.activo} onChange={e => setForm(f => ({ ...f, activo: e.target.checked }))} style={{ width: '1.1rem', height: '1.1rem', accentColor: C.yellow }} />
                  👁 Visible
                </label>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
              <button onClick={handleSave} disabled={saving || anyUploading}
                style={{ background: C.yellow, color: C.dark, fontWeight: 900, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.12em', padding: '0.85rem 2rem', borderRadius: '0.75rem', border: 'none', cursor: (saving || anyUploading) ? 'not-allowed' : 'pointer', opacity: (saving || anyUploading) ? 0.6 : 1 }}>
                {anyUploading ? 'Esperando imágenes...' : saving ? 'Guardando...' : editId ? 'Actualizar proyecto' : 'Publicar proyecto'}
              </button>
              <button onClick={() => { resetForm(); setTab('lista'); }}
                style={{ background: C.dim, color: C.muted, fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0.85rem 1.5rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer' }}>
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* ── LISTA ── */}
        {tab === 'lista' && (
          <div>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: C.muted }}>Cargando proyectos...</div>
            ) : proyectos.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', background: C.cardBg, borderRadius: '1.5rem', border: `1px solid ${C.borderDim}` }}>
                <p style={{ fontSize: '3rem' }}>📂</p>
                <p style={{ color: C.muted, fontWeight: 700, textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.1em' }}>No hay proyectos aún</p>
                <button onClick={() => setTab('nuevo')} style={{ marginTop: '1rem', background: C.yellow, color: C.dark, fontWeight: 900, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', padding: '0.75rem 1.5rem', borderRadius: '0.75rem', border: 'none', cursor: 'pointer' }}>
                  + Crear primer proyecto
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                {proyectos.map(p => (
                  <div key={p.id} style={{ background: C.cardBg, border: `1px solid ${p.activo ? C.border : C.borderDim}`, borderRadius: '1.25rem', overflow: 'hidden', opacity: p.activo ? 1 : 0.6 }}>
                    {/* Imagen portada + miniaturas */}
                    <div style={{ position: 'relative', height: '180px', background: C.dim }}>
                      {p.imagenes?.[0] ? (
                        <img src={getOptimizedUrl(p.imagenes[0], 400, 300)} alt={p.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '2.5rem' }}>📷</div>
                      )}
                      {/* Contador de fotos */}
                      {(p.imagenes?.length || 0) > 1 && (
                        <div style={{ position: 'absolute', bottom: '0.5rem', right: '0.5rem', background: 'rgba(0,0,0,0.7)', color: C.yellow, fontSize: '0.65rem', fontWeight: 900, padding: '0.2rem 0.5rem', borderRadius: '99px' }}>
                          📷 {p.imagenes.length} fotos
                        </div>
                      )}
                      <div style={{ position: 'absolute', top: '0.6rem', left: '0.6rem', display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                        <span style={{ background: C.yellow, color: C.dark, fontSize: '0.6rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0.2rem 0.5rem', borderRadius: '99px' }}>{p.categoria}</span>
                        {p.destacado && <span style={{ background: '#1e293b', color: C.yellow, fontSize: '0.6rem', fontWeight: 900, padding: '0.2rem 0.5rem', borderRadius: '99px' }}>⭐</span>}
                        {!p.activo && <span style={{ background: '#7f1d1d', color: '#fca5a5', fontSize: '0.6rem', fontWeight: 900, padding: '0.2rem 0.5rem', borderRadius: '99px' }}>Oculto</span>}
                      </div>
                    </div>

                    {/* Miniaturas */}
                    {(p.imagenes?.length || 0) > 1 && (
                      <div style={{ display: 'flex', gap: '0.3rem', padding: '0.5rem', background: C.dark3, overflowX: 'auto' }}>
                        {p.imagenes.slice(0, 6).map((img, i) => (
                          <img key={i} src={getOptimizedUrl(img, 80, 80)} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '0.35rem', flexShrink: 0, opacity: i === 0 ? 1 : 0.7 }} />
                        ))}
                        {p.imagenes.length > 6 && (
                          <div style={{ width: '40px', height: '40px', background: C.dim, borderRadius: '0.35rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.muted, fontSize: '0.6rem', fontWeight: 900, flexShrink: 0 }}>
                            +{p.imagenes.length - 6}
                          </div>
                        )}
                      </div>
                    )}

                    <div style={{ padding: '1rem' }}>
                      <h3 style={{ fontWeight: 800, fontSize: '0.9rem', color: C.text, marginBottom: '0.25rem', lineHeight: 1.3 }}>{p.titulo}</h3>
                      {p.ubicacion && <p style={{ color: C.muted, fontSize: '0.72rem', fontWeight: 600, marginBottom: '0.5rem' }}>📍 {p.ubicacion}</p>}
                      {p.descripcion && <p style={{ color: C.muted, fontSize: '0.75rem', lineHeight: 1.5, marginBottom: '0.75rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.descripcion}</p>}

                      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                        <button onClick={() => startEdit(p)} style={{ flex: 1, background: C.dim, color: C.text, fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0.5rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>✏️ Editar</button>
                        <button onClick={() => toggleActivo(p)} style={{ flex: 1, background: p.activo ? 'rgba(251,191,36,0.1)' : 'rgba(34,197,94,0.1)', color: p.activo ? '#fbbf24' : '#86efac', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0.5rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>
                          {p.activo ? '👁 Ocultar' : '👁 Mostrar'}
                        </button>
                        <button onClick={() => setDelConfirm(p.id)} style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', fontSize: '0.7rem', fontWeight: 700, padding: '0.5rem 0.75rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>🗑</button>
                      </div>

                      {delConfirm === p.id && (
                        <div style={{ marginTop: '0.75rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '0.75rem', padding: '0.75rem', textAlign: 'center' }}>
                          <p style={{ color: '#fca5a5', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>¿Eliminar este proyecto?</p>
                          <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center' }}>
                            <button onClick={() => handleDelete(p.id)} style={{ background: '#ef4444', color: '#fff', fontSize: '0.7rem', fontWeight: 900, padding: '0.4rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>Eliminar</button>
                            <button onClick={() => setDelConfirm(null)} style={{ background: C.dim, color: C.muted, fontSize: '0.7rem', fontWeight: 700, padding: '0.4rem 1rem', borderRadius: '0.5rem', border: 'none', cursor: 'pointer' }}>Cancelar</button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%', background: '#1e293b', border: '1px solid rgba(255,198,0,0.12)',
  borderRadius: '0.75rem', padding: '0.75rem 1rem', color: '#f1f5f9',
  fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box', fontFamily: 'Inter, sans-serif',
};
const labelStyle: React.CSSProperties = {
  display: 'block', fontSize: '0.68rem', fontWeight: 800, textTransform: 'uppercase',
  letterSpacing: '0.12em', color: '#64748b', marginBottom: '0.4rem',
};
