import { ShieldCheck, Clock, FileCheck, Wrench, Star, MessageCircle } from 'lucide-react';

const GARANTIAS = [
  { icon: ShieldCheck, titulo: 'Certificación SEC', desc: 'Emitimos certificados TE1 y gestionamos todos los trámites normativos.' },
  { icon: Clock,       titulo: 'Respuesta en 24 hrs', desc: 'Cotización y coordinación dentro del día hábil siguiente.' },
  { icon: FileCheck,   titulo: 'Presupuesto sin costo', desc: 'Propuesta técnica detallada, sin compromiso y sin cobros ocultos.' },
  { icon: Wrench,      titulo: 'Garantía incluida', desc: 'Respaldamos materiales y mano de obra en cada proyecto.' },
];

export default function PorQueElegirnos() {
  return (
    <section id="garantias" style={{ padding: '7rem 0', background: '#f8fafc' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>

        <div style={{ marginBottom: '4rem' }}>
          <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffc600', marginBottom: '1rem' }}>— Sin inventos</p>
          <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#0d1520', lineHeight: 0.95 }}>
            ¿POR QUÉ<br />ELEGIRNOS?
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1px', background: 'rgba(13,21,32,0.08)', borderRadius: '16px', overflow: 'hidden', marginBottom: '3rem' }}>
          {GARANTIAS.map(({ icon: Icon, titulo, desc }) => (
            <div key={titulo} style={{ background: '#fff', padding: '2.5rem', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#fffef5'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#fff'}>
              <div style={{ width: '44px', height: '44px', background: 'rgba(255,198,0,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Icon size={20} color="#ffc600" />
              </div>
              <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.3rem', color: '#0d1520', marginBottom: '0.5rem', letterSpacing: '0.02em' }}>{titulo}</h4>
              <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6, fontWeight: 300 }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Google Reviews */}
        <div style={{ background: '#0d1520', borderRadius: '16px', padding: '3.5rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,198,0,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,198,0,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '1.5rem' }}>
              {[1,2,3,4,5].map(i => <Star key={i} size={20} color="#ffc600" fill="#ffc600" />)}
            </div>
            <h4 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', color: '#fff', marginBottom: '1rem', lineHeight: 0.95 }}>
              ¿YA TRABAJASTE<br />CON NOSOTROS?
            </h4>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto 2rem', fontWeight: 300, lineHeight: 1.6 }}>
              Tu reseña nos ayuda a seguir creciendo y que otros clientes nos conozcan.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="https://g.page/r/LINK_GOOGLE_MAPS/review" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#ffc600', color: '#0d1520', fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.9rem 2rem', borderRadius: '8px', textDecoration: 'none' }}>
                ⭐ Reseña en Google
              </a>
              <a href="https://wa.me/56989203902?text=Hola%20InnVolt%2C%20quiero%20dejarte%20un%20testimonio" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.7)', fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.9rem 2rem', borderRadius: '8px', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)' }}>
                <MessageCircle size={14} /> Por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
