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
        const next = prev.map((u, i) => i === idx ? { ...u, status: 'done' as const, url } : u);
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
