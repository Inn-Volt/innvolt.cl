'use client';

import { useState, useEffect, useRef } from 'react';
import { uploadImage, getOptimizedUrl } from '@/lib/cloudinary';
import { Proyecto, Categoria } from '@/types';

const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'innvolt2026';
const CATEGORIAS: Categoria[] = ['Electricidad', 'Domótica', 'Redes y CCTV'];

function ZapIcon({ size = 24, color = '#ffc600' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
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
  const [logged, setLogged]         = useState(false);
  const [pass, setPass]             = useState('');
  const [passError, setPassError]   = useState(false);
  const [proyectos, setProyectos]   = useState<Proyecto[]>([]);
  const [loading, setLoading]       = useState(false);
  const [tab, setTab]               = useState<'lista' | 'nuevo' | 'editar'>('lista');
  const [form, setForm]             = useState({ ...emptyForm });
  const [editId, setEditId]         = useState<string | null>(null);
  const [saving, setSaving]         = useState(false);
  const [uploads, setUploads]       = useState<UploadItem[]>([]);
  const [feedback, setFeedback]     = useState<{ msg: string; ok: boolean } | null>(null);
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

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const items: UploadItem[] = files.map(f => ({
      file: f, preview: URL.createObjectURL(f), status: 'pending', url: '',
    }));
    setUploads(prev => [...prev, ...items]);
    items.forEach((item, idx) => uploadOne(item, uploads.length + idx));
  }

  async function uploadOne(item: UploadItem, idx: number) {
    setUploads(prev => prev.map((u, i) => i === idx ? { ...u, status: 'uploading' } : u));
    try {
      const url = await uploadImage(item.file);
      setUploads(prev => {
        const next = prev.map((u, i) => i === idx ? { ...u, status: 'done', url } : u);
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
    if (uploads.some(u => u.status === 'uploading')) { showFeedback('Espera a que terminen de subir las imágenes', false); return; }
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
      resetForm(); setTab('lista'); fetchProyectos();
    } catch {
      showFeedback('Error al guardar. Revisa Supabase.', false);
    } finally { setSaving(false); }
  }

  function resetForm() { setForm({ ...emptyForm }); setUploads([]); setEditId(null); }

  function startEdit(p: Proyecto) {
    setEditId(p.id);
    setForm({ titulo: p.titulo, descripcion: p.descripcion, categoria: p.categoria,
      ubicacion: p.ubicacion, imagenes: p.imagenes || [], destacado: p.destacado, activo: p.activo });
    setUploads((p.imagenes || []).map(url => ({ file: new File([], ''), preview: url, status: 'done', url })));
    setTab('editar');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleDelete(id: string) {
    const res = await fetch(`/api/proyectos/${id}`, { method: 'DELETE', headers: { 'x-admin-key': ADMIN_PASS } });
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

  const anyUploading = uploads.some(u => u.status === 'uploading' || u.status === 'pending');
  const isFormTab    = tab === 'nuevo' || tab === 'editar';

  /* ────────────────── LOGIN ────────────────── */
  if (!logged) return (
    <>
      <style>{loginStyles}</style>
      <div className="admin-login-wrap">
        <div className="admin-login-card">
          {/* Acento top */}
          <div className="card-accent" />

          {/* Logo */}
          <div className="login-logo">
            <ZapIcon size={32} />
            <h1 className="login-brand">
              INN<span>VOLT</span>
            </h1>
          </div>
          <p className="login-subtitle label">Panel de Administración</p>

          <div className="login-form">
            <label className="label" style={{ marginBottom: '0.5rem', display: 'block' }}>Contraseña</label>
            <input
              type="password"
              placeholder="••••••••••"
              value={pass}
              onChange={e => setPass(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && login()}
              className={`admin-input ${passError ? 'input-error' : ''}`}
            />
            {passError && <p className="error-msg">Contraseña incorrecta</p>}
            <button onClick={login} className="btn btn-primary login-btn">
              <ZapIcon size={14} color="#000" />
              Ingresar
            </button>
          </div>
        </div>
      </div>
    </>
  );

  /* ────────────────── PANEL PRINCIPAL ────────────────── */
  return (
    <>
      <style>{panelStyles}</style>

      <div className="admin-wrap">

        {/* ── NAV / HEADER ── */}
        <nav className="admin-nav">
          <div className="admin-nav-inner">
            <div className="admin-brand">
              <ZapIcon size={22} />
              <span className="admin-brand-text">
                INN<span>VOLT</span>
                <span className="admin-brand-sub">ADMIN</span>
              </span>
            </div>
            <div className="admin-nav-actions">
              <a href="/" target="_blank" className="btn btn-ghost btn-sm">
                Ver sitio ↗
              </a>
              <button onClick={() => { setLogged(false); setPass(''); }} className="btn btn-danger btn-sm">
                Salir
              </button>
            </div>
          </div>
        </nav>

        {/* ── CONTENIDO ── */}
        <main className="admin-main">

          {/* Feedback toast */}
          {feedback && (
            <div className={`admin-toast ${feedback.ok ? 'toast-ok' : 'toast-err'}`}>
              {feedback.ok ? '✓' : '✕'} {feedback.msg}
            </div>
          )}

          {/* ── TABS ── */}
          <div className="admin-tabs">
            {[
              { id: 'lista', label: `Proyectos (${proyectos.length})` },
              { id: 'nuevo', label: '+ Nuevo proyecto' },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => { setTab(t.id as 'lista' | 'nuevo'); if (t.id === 'nuevo') resetForm(); }}
                className={`admin-tab ${tab === t.id ? 'tab-active' : ''}`}
              >
                {t.label}
              </button>
            ))}
            {tab === 'editar' && (
              <span className="admin-tab tab-active">✏ Editando</span>
            )}
          </div>

          {/* ── FORMULARIO ── */}
          {isFormTab && (
            <div className="admin-card">
              <div className="card-accent" />
              <h2 className="form-title display">
                {editId ? 'Editar Proyecto' : 'Nuevo Proyecto'}
              </h2>

              <div className="form-grid">

                {/* Título */}
                <div className="col-full">
                  <label className="label">Título *</label>
                  <input
                    value={form.titulo}
                    onChange={e => setForm(f => ({ ...f, titulo: e.target.value }))}
                    placeholder="Ej: Instalación eléctrica casa en Las Condes"
                    className="admin-input"
                  />
                </div>

                {/* Categoría */}
                <div>
                  <label className="label">Categoría *</label>
                  <select
                    value={form.categoria}
                    onChange={e => setForm(f => ({ ...f, categoria: e.target.value as Categoria }))}
                    className="admin-input"
                  >
                    {CATEGORIAS.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>

                {/* Ubicación */}
                <div>
                  <label className="label">Ubicación</label>
                  <input
                    value={form.ubicacion}
                    onChange={e => setForm(f => ({ ...f, ubicacion: e.target.value }))}
                    placeholder="Ej: Las Condes, Santiago"
                    className="admin-input"
                  />
                </div>

                {/* Descripción */}
                <div className="col-full">
                  <label className="label">Descripción</label>
                  <textarea
                    value={form.descripcion}
                    onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))}
                    placeholder="Describe brevemente el trabajo realizado..."
                    rows={3}
                    className="admin-input"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                {/* Fotos */}
                <div className="col-full">
                  <label className="label">
                    Fotos del proyecto * —{' '}
                    <span style={{ color: '#ffc600' }}>
                      {uploads.filter(u => u.status === 'done').length} subidas
                    </span>
                    {anyUploading && <span style={{ color: '#ffc600', marginLeft: '0.5rem' }}>⏳ Subiendo...</span>}
                  </label>

                  {/* Drop zone */}
                  <div
                    className="drop-zone"
                    onClick={() => fileRef.current?.click()}
                  >
                    <div className="drop-icon">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffc600" strokeWidth="1.5">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                    <p className="drop-title">Haz clic para seleccionar fotos</p>
                    <p className="drop-sub body-sm">Puedes seleccionar varias a la vez — JPG, PNG</p>
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFiles} style={{ display: 'none' }} />

                  {/* Grid previews */}
                  {uploads.length > 0 && (
                    <div className="upload-grid">
                      {uploads.map((u, idx) => (
                        <div key={idx} className="upload-thumb">
                          <img src={u.preview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: u.status === 'done' ? 1 : 0.45 }} />
                          {u.status === 'uploading' && (
                            <div className="thumb-overlay">
                              <span style={{ fontSize: '1.4rem' }}>⏳</span>
                            </div>
                          )}
                          {u.status === 'error' && (
                            <div className="thumb-overlay" style={{ background: 'rgba(239,68,68,0.7)' }}>
                              <span style={{ fontSize: '1.4rem' }}>✕</span>
                            </div>
                          )}
                          {u.status === 'done' && (
                            <div className="thumb-badge thumb-ok">✓</div>
                          )}
                          <button className="thumb-remove" onClick={() => removeUpload(idx)}>✕</button>
                          <div className="thumb-num">#{idx + 1}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Switches */}
                <div className="switches">
                  <label className="switch-label">
                    <input type="checkbox" checked={form.destacado} onChange={e => setForm(f => ({ ...f, destacado: e.target.checked }))} className="switch-check" />
                    <span>⭐ Destacado</span>
                  </label>
                  <label className="switch-label">
                    <input type="checkbox" checked={form.activo} onChange={e => setForm(f => ({ ...f, activo: e.target.checked }))} className="switch-check" />
                    <span>◎ Visible</span>
                  </label>
                </div>
              </div>

              {/* Acciones */}
              <div className="form-actions">
                <button
                  onClick={handleSave}
                  disabled={saving || anyUploading}
                  className="btn btn-primary"
                  style={{ opacity: (saving || anyUploading) ? 0.5 : 1, cursor: (saving || anyUploading) ? 'not-allowed' : 'pointer' }}
                >
                  <ZapIcon size={14} color="#000" />
                  {anyUploading ? 'Esperando imágenes...' : saving ? 'Guardando...' : editId ? 'Actualizar proyecto' : 'Publicar proyecto'}
                </button>
                <button onClick={() => { resetForm(); setTab('lista'); }} className="btn btn-ghost">
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* ── LISTA ── */}
          {tab === 'lista' && (
            <div>
              {loading ? (
                <div className="list-empty">
                  <ZapIcon size={32} />
                  <p className="label" style={{ marginTop: '1rem' }}>Cargando proyectos...</p>
                </div>
              ) : proyectos.length === 0 ? (
                <div className="list-empty admin-card">
                  <div className="card-accent" />
                  <span style={{ fontSize: '3rem' }}>📂</span>
                  <p className="label" style={{ marginTop: '1rem' }}>No hay proyectos aún</p>
                  <button onClick={() => setTab('nuevo')} className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
                    <ZapIcon size={14} color="#000" />+ Crear primer proyecto
                  </button>
                </div>
              ) : (
                <div className="projects-list-grid">
                  {proyectos.map(p => (
                    <div key={p.id} className={`proj-card ${!p.activo ? 'proj-hidden' : ''}`}>
                      {/* Imagen */}
                      <div className="proj-img-wrap">
                        {p.imagenes?.[0] ? (
                          <img src={getOptimizedUrl(p.imagenes[0], 400, 300)} alt={p.titulo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div className="proj-img-empty">📷</div>
                        )}
                        {/* Badges */}
                        <div className="proj-badges">
                          <span className="proj-cat">{p.categoria}</span>
                          {p.destacado && <span className="proj-badge-star">⭐</span>}
                          {!p.activo && <span className="proj-badge-hidden">Oculto</span>}
                        </div>
                        {(p.imagenes?.length || 0) > 1 && (
                          <div className="proj-photo-count">📷 {p.imagenes.length}</div>
                        )}
                      </div>

                      {/* Miniaturas */}
                      {(p.imagenes?.length || 0) > 1 && (
                        <div className="proj-thumbs">
                          {p.imagenes.slice(0, 6).map((img, i) => (
                            <img key={i} src={getOptimizedUrl(img, 80, 80)} alt="" className="proj-thumb" style={{ opacity: i === 0 ? 1 : 0.6 }} />
                          ))}
                          {p.imagenes.length > 6 && (
                            <div className="proj-thumb-more">+{p.imagenes.length - 6}</div>
                          )}
                        </div>
                      )}

                      {/* Info */}
                      <div className="proj-info">
                        <div className="service-bar" style={{ marginBottom: '0.75rem' }} />
                        <h3 className="proj-title">{p.titulo}</h3>
                        {p.ubicacion && <p className="proj-loc">📍 {p.ubicacion}</p>}
                        {p.descripcion && <p className="proj-desc">{p.descripcion}</p>}

                        <div className="proj-actions">
                          <button onClick={() => startEdit(p)} className="proj-btn">✏ Editar</button>
                          <button onClick={() => toggleActivo(p)} className={`proj-btn ${p.activo ? 'proj-btn-warn' : 'proj-btn-ok'}`}>
                            {p.activo ? '◎ Ocultar' : '◎ Mostrar'}
                          </button>
                          <button onClick={() => setDelConfirm(p.id)} className="proj-btn proj-btn-del">🗑</button>
                        </div>

                        {delConfirm === p.id && (
                          <div className="del-confirm">
                            <p className="del-confirm-msg">¿Eliminar este proyecto?</p>
                            <div style={{ display: 'flex', gap: '0.4rem', justifyContent: 'center' }}>
                              <button onClick={() => handleDelete(p.id)} className="btn btn-danger btn-sm">Eliminar</button>
                              <button onClick={() => setDelConfirm(null)} className="btn btn-ghost btn-sm">Cancelar</button>
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
        </main>
      </div>
    </>
  );
}

/* ═══════════════════════════════════════════
   ESTILOS — replican el design system del sitio
   ═══════════════════════════════════════════ */

const loginStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

  .admin-login-wrap {
    min-height: 100vh;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
    font-family: 'Barlow', sans-serif;
  }
  .admin-login-card {
    position: relative;
    background: #0e0e0e;
    border: 1px solid rgba(255,198,0,0.15);
    padding: 2.5rem 2.5rem 3rem;
    width: 100%;
    max-width: 400px;
    text-align: center;
  }
  .card-accent {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: #ffc600;
  }
  .login-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  .login-brand {
    font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
    font-weight: 900;
    font-size: 2rem;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    color: #ffc600;
    line-height: 1;
  }
  .login-brand span { color: #fff; }
  .login-subtitle {
    margin: 0.6rem 0 2rem;
    color: rgba(255,255,255,0.4);
  }
  .login-form { text-align: left; }
  .login-btn {
    width: 100%;
    justify-content: center;
    margin-top: 1rem;
  }
  .label {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 0.65rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #ffc600;
    display: block;
    margin-bottom: 0.4rem;
  }
  .admin-input {
    width: 100%;
    background: #141414;
    border: 1px solid rgba(255,255,255,0.08);
    padding: 0.85rem 1rem;
    color: #fff;
    font-family: 'Barlow', sans-serif;
    font-size: 0.9rem;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.2s;
  }
  .admin-input:focus { border-color: rgba(255,198,0,0.4); }
  .input-error { border-color: #ef4444 !important; }
  .error-msg {
    color: #f87171;
    font-size: 0.75rem;
    font-weight: 600;
    margin: 0.4rem 0 0;
  }
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 0.8rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
    text-decoration: none;
  }
  .btn-primary {
    background: #ffc600;
    color: #000;
    padding: 0.9rem 2rem;
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
  }
  .btn-primary:hover { background: #fff; transform: translateY(-2px); }
  .btn-ghost {
    background: transparent;
    color: rgba(255,255,255,0.4);
    padding: 0.9rem 1.5rem;
    border: 1px solid rgba(255,255,255,0.1);
  }
  .btn-ghost:hover { border-color: #ffc600; color: #ffc600; }
  .btn-danger {
    background: rgba(239,68,68,0.12);
    color: #f87171;
    padding: 0.9rem 1.5rem;
    border: 1px solid rgba(239,68,68,0.2);
  }
  .btn-danger:hover { background: rgba(239,68,68,0.2); }
  .btn-sm { padding: 0.5rem 1rem; font-size: 0.7rem; clip-path: none; }
`;

const panelStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800;900&family=Barlow:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap');

  * { box-sizing: border-box; }

  .admin-wrap {
    min-height: 100vh;
    background: #000;
    color: #fff;
    font-family: 'Barlow', sans-serif;
  }

  /* ── NAV ── */
  .admin-nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(0,0,0,0.95);
    backdrop-filter: blur(20px);
    border-bottom: 1px solid rgba(255,198,0,0.1);
  }
  .admin-nav-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }
  .admin-brand {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }
  .admin-brand-text {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 1.25rem;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    color: #fff;
    font-style: italic;
  }
  .admin-brand-text span:first-child { color: #ffc600; }
  .admin-brand-sub {
    font-family: 'Barlow', sans-serif;
    font-weight: 400;
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    color: rgba(255,255,255,0.35);
    margin-left: 0.5rem;
    font-style: normal;
    vertical-align: middle;
  }
  .admin-nav-actions { display: flex; gap: 0.5rem; align-items: center; }

  /* ── MAIN ── */
  .admin-main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1.5rem;
  }

  /* ── TOAST ── */
  .admin-toast {
    padding: 0.85rem 1.5rem;
    margin-bottom: 1.5rem;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 0.85rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border-left: 3px solid;
  }
  .toast-ok {
    background: rgba(34,197,94,0.08);
    border-color: #22c55e;
    color: #86efac;
  }
  .toast-err {
    background: rgba(239,68,68,0.08);
    border-color: #ef4444;
    color: #fca5a5;
  }

  /* ── TABS ── */
  .admin-tabs {
    display: flex;
    gap: 2px;
    margin-bottom: 2rem;
    flex-wrap: wrap;
    background: rgba(255,198,0,0.04);
    border: 1px solid rgba(255,198,0,0.08);
    padding: 2px;
    width: fit-content;
  }
  .admin-tab {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 0.72rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 0.65rem 1.5rem;
    background: transparent;
    color: rgba(255,255,255,0.35);
    border: none;
    cursor: pointer;
    transition: all 0.2s;
  }
  .admin-tab:hover { color: #ffc600; background: rgba(255,198,0,0.06); }
  .tab-active { background: #ffc600 !important; color: #000 !important; cursor: default; }

  /* ── CARD ── */
  .admin-card {
    position: relative;
    background: #0e0e0e;
    border: 1px solid rgba(255,198,0,0.12);
    padding: 2rem;
    margin-bottom: 2rem;
    overflow: hidden;
  }
  .card-accent {
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: #ffc600;
  }
  .form-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 1.4rem;
    text-transform: uppercase;
    color: #ffc600;
    letter-spacing: -0.01em;
    margin-bottom: 1.75rem;
    line-height: 1;
  }

  /* ── FORM GRID ── */
  .form-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.25rem;
  }
  .col-full { grid-column: 1 / -1; }

  .label {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 0.65rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #ffc600;
    display: block;
    margin-bottom: 0.4rem;
  }
  .admin-input {
    width: 100%;
    background: #141414;
    border: 1px solid rgba(255,255,255,0.07);
    padding: 0.8rem 1rem;
    color: #fff;
    font-family: 'Barlow', sans-serif;
    font-size: 0.875rem;
    outline: none;
    box-sizing: border-box;
    transition: border-color 0.2s;
  }
  .admin-input:focus { border-color: rgba(255,198,0,0.35); }
  .admin-input option { background: #141414; }

  /* ── DROP ZONE ── */
  .drop-zone {
    border: 1px dashed rgba(255,198,0,0.25);
    padding: 2rem;
    text-align: center;
    cursor: pointer;
    background: rgba(255,198,0,0.02);
    margin-bottom: 1rem;
    transition: all 0.2s;
  }
  .drop-zone:hover {
    border-color: #ffc600;
    background: rgba(255,198,0,0.05);
  }
  .drop-icon { margin-bottom: 0.5rem; }
  .drop-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 0.9rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #fff;
    margin-bottom: 0.25rem;
  }
  .drop-sub {
    font-size: 0.75rem;
    font-weight: 300;
    color: rgba(255,255,255,0.35);
  }

  /* ── UPLOAD GRID ── */
  .upload-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
    gap: 0.5rem;
  }
  .upload-thumb {
    position: relative;
    aspect-ratio: 1;
    background: #141414;
    overflow: hidden;
  }
  .thumb-overlay {
    position: absolute;
    inset: 0;
    background: rgba(0,0,0,0.65);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .thumb-badge {
    position: absolute;
    top: 0.3rem;
    left: 0.3rem;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.55rem;
    font-weight: 900;
  }
  .thumb-ok { background: rgba(34,197,94,0.9); color: #fff; }
  .thumb-remove {
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    background: rgba(0,0,0,0.75);
    color: #fff;
    border: none;
    width: 1.4rem;
    height: 1.4rem;
    border-radius: 50%;
    cursor: pointer;
    font-size: 0.6rem;
    font-weight: 900;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .thumb-remove:hover { background: #ef4444; }
  .thumb-num {
    position: absolute;
    bottom: 0.25rem;
    left: 0.25rem;
    background: rgba(0,0,0,0.7);
    color: #ffc600;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 0.55rem;
    padding: 0.1rem 0.3rem;
  }

  /* ── SWITCHES ── */
  .switches {
    grid-column: 1 / -1;
    display: flex;
    gap: 2rem;
    align-items: center;
    padding-top: 0.25rem;
  }
  .switch-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 0.75rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.4);
    transition: color 0.2s;
  }
  .switch-label:hover { color: #ffc600; }
  .switch-check { width: 1.1rem; height: 1.1rem; accent-color: #ffc600; }

  /* ── FORM ACTIONS ── */
  .form-actions {
    display: flex;
    gap: 0.75rem;
    margin-top: 2rem;
    flex-wrap: wrap;
    padding-top: 2rem;
    border-top: 1px solid rgba(255,255,255,0.05);
  }

  /* ── SHARED BTN STYLES ── */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 0.8rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
    text-decoration: none;
  }
  .btn-primary {
    background: #ffc600;
    color: #000;
    padding: 0.9rem 2rem;
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
  }
  .btn-primary:hover:not(:disabled) { background: #fff; transform: translateY(-2px); }
  .btn-ghost {
    background: transparent;
    color: rgba(255,255,255,0.4);
    padding: 0.9rem 1.5rem;
    border: 1px solid rgba(255,255,255,0.1);
  }
  .btn-ghost:hover { border-color: #ffc600; color: #ffc600; }
  .btn-danger {
    background: rgba(239,68,68,0.12);
    color: #f87171;
    padding: 0.9rem 1.5rem;
    border: 1px solid rgba(239,68,68,0.2);
  }
  .btn-danger:hover { background: rgba(239,68,68,0.2); }
  .btn-sm { padding: 0.5rem 1rem; font-size: 0.7rem; clip-path: none !important; }

  /* ── LISTA EMPTY ── */
  .list-empty {
    text-align: center;
    padding: 4rem 2rem;
    color: rgba(255,255,255,0.35);
    font-family: 'Barlow Condensed', sans-serif;
  }

  /* ── PROJECTS GRID ── */
  .projects-list-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2px;
    background: rgba(255,198,0,0.04);
  }
  .proj-card {
    background: #0e0e0e;
    border: 1px solid rgba(255,198,0,0.1);
    overflow: hidden;
    transition: border-color 0.2s;
  }
  .proj-card:hover { border-color: rgba(255,198,0,0.3); }
  .proj-hidden { opacity: 0.5; }

  .proj-img-wrap {
    position: relative;
    height: 190px;
    background: #141414;
    overflow: hidden;
  }
  .proj-img-empty {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: 2.5rem;
  }
  .proj-badges {
    position: absolute;
    top: 0.6rem;
    left: 0.6rem;
    display: flex;
    gap: 0.3rem;
    flex-wrap: wrap;
  }
  .proj-cat {
    font-family: 'Barlow Condensed', sans-serif;
    background: #ffc600;
    color: #000;
    font-size: 0.55rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 0.2rem 0.55rem;
  }
  .proj-badge-star {
    background: rgba(0,0,0,0.7);
    padding: 0.2rem 0.4rem;
    font-size: 0.65rem;
  }
  .proj-badge-hidden {
    font-family: 'Barlow Condensed', sans-serif;
    background: rgba(127,29,29,0.9);
    color: #fca5a5;
    font-size: 0.55rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.2rem 0.5rem;
  }
  .proj-photo-count {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    background: rgba(0,0,0,0.75);
    color: #ffc600;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 0.6rem;
    letter-spacing: 0.08em;
    padding: 0.2rem 0.5rem;
  }

  /* Miniaturas */
  .proj-thumbs {
    display: flex;
    gap: 2px;
    padding: 0.4rem;
    background: #080808;
    overflow-x: auto;
  }
  .proj-thumb {
    width: 38px;
    height: 38px;
    object-fit: cover;
    flex-shrink: 0;
  }
  .proj-thumb-more {
    width: 38px;
    height: 38px;
    background: #141414;
    display: flex;
    align-items: center;
    justify-content: center;
    color: rgba(255,255,255,0.4);
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 0.6rem;
    flex-shrink: 0;
  }

  /* Info */
  .proj-info { padding: 1.25rem; }
  .service-bar {
    width: 24px;
    height: 2px;
    background: #ffc600;
    transform-origin: left;
  }
  .proj-title {
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 900;
    font-size: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.02em;
    color: #fff;
    margin-bottom: 0.3rem;
    line-height: 1.2;
  }
  .proj-loc {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #ffc600;
    margin-bottom: 0.5rem;
  }
  .proj-desc {
    font-size: 0.78rem;
    font-weight: 300;
    color: rgba(255,255,255,0.4);
    line-height: 1.5;
    margin-bottom: 1rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  /* Botones de proyecto */
  .proj-actions { display: flex; gap: 2px; flex-wrap: wrap; }
  .proj-btn {
    flex: 1;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 0.65rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 0.55rem 0.5rem;
    border: none;
    cursor: pointer;
    background: #141414;
    color: rgba(255,255,255,0.5);
    border: 1px solid rgba(255,255,255,0.06);
    transition: all 0.2s;
  }
  .proj-btn:hover { color: #fff; border-color: rgba(255,198,0,0.3); }
  .proj-btn-ok  { color: #86efac !important; border-color: rgba(34,197,94,0.2) !important; background: rgba(34,197,94,0.06) !important; }
  .proj-btn-warn { color: #fbbf24 !important; border-color: rgba(251,191,36,0.2) !important; background: rgba(251,191,36,0.06) !important; }
  .proj-btn-del  { flex: 0; padding: 0.55rem 0.75rem; color: #f87171 !important; background: rgba(239,68,68,0.06) !important; border-color: rgba(239,68,68,0.15) !important; }

  /* Confirm delete */
  .del-confirm {
    margin-top: 0.75rem;
    background: rgba(239,68,68,0.06);
    border: 1px solid rgba(239,68,68,0.2);
    padding: 1rem;
    text-align: center;
  }
  .del-confirm-msg {
    color: #fca5a5;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 700;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 0.75rem;
  }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 3px; height: 3px; }
  ::-webkit-scrollbar-track { background: #000; }
  ::-webkit-scrollbar-thumb { background: #ffc600; }

  /* ── SELECTION ── */
  ::selection { background: #ffc600; color: #000; }

  /* Responsive */
  @media (max-width: 640px) {
    .admin-main { padding: 1.25rem 1rem; }
    .admin-card { padding: 1.5rem 1.25rem; }
    .form-grid { grid-template-columns: 1fr; }
    .projects-list-grid { grid-template-columns: 1fr; }
  }
`;
