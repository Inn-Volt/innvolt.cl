import { ShieldCheck, Clock, FileCheck, Wrench, Star, MessageCircle } from 'lucide-react';

const GARANTIAS = [
  { icon: ShieldCheck, num: '01', titulo: 'Certificación SEC', desc: 'Emitimos certificados TE1 y gestionamos todos los trámites normativos exigidos.' },
  { icon: Clock,       num: '02', titulo: 'Respuesta en 24 hrs', desc: 'Cotización y coordinación dentro del mismo día hábil, sin vueltas.' },
  { icon: FileCheck,   num: '03', titulo: 'Presupuesto claro', desc: 'Propuesta técnica detallada, sin compromiso y sin sorpresas.' },
  { icon: Wrench,      num: '04', titulo: 'Garantía incluida', desc: 'Respaldamos materiales y mano de obra en cada proyecto ejecutado.' },
];

export default function PorQueElegirnos() {
  return (
    <section id="garantias" style={{ padding: '6rem 0', background: '#111' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.5rem' }}>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ fontFamily: "'Barlow Condensed',sans-serif", fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#ffc600', marginBottom: '0.5rem' }}>— Sin inventos</p>
            <h2 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 'clamp(2.5rem,5vw,4rem)', color: '#fff', textTransform: 'uppercase', lineHeight: 0.9 }}>
              ¿POR QUÉ<br />ELEGIRNOS?
            </h2>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '2px', background: 'rgba(255,198,0,0.06)', marginBottom: '3rem' }}>
          {GARANTIAS.map(({ icon: Icon, num, titulo, desc }) => (
            <div key={titulo} style={{ background: '#111', padding: '2rem', transition: 'background 0.2s', cursor: 'default', position: 'relative', overflow: 'hidden' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#0a0a0a'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#111'}>
              <span style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: '3rem', color: 'rgba(255,198,0,0.07)', position: 'absolute', top: '1rem', right: '1rem', lineHeight: 1 }}>{num}</span>
              <div style={{ width: '40px', height: '40px', border: '1px solid rgba(255,198,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
                <Icon size={18} color="#ffc600" />
              </div>
              <h4 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: '1.25rem', color: '#fff', textTransform: 'uppercase', marginBottom: '0.6rem', letterSpacing: '0.02em' }}>{titulo}</h4>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', lineHeight: 1.6, fontWeight: 300 }}>{desc}</p>
              <div style={{ width: '20px', height: '2px', background: '#ffc600', marginTop: '1.5rem' }} />
            </div>
          ))}
        </div>

        {/* CTA Reviews */}
        <div style={{ background: '#000', border: '1px solid rgba(255,198,0,0.12)', padding: '3rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #ffc600, transparent)' }} />
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '1.25rem' }}>
            {[1,2,3,4,5].map(i => <Star key={i} size={18} color="#ffc600" fill="#ffc600" />)}
          </div>
          <h4 style={{ fontFamily: "'Barlow Condensed',sans-serif", fontWeight: 900, fontSize: 'clamp(1.8rem,4vw,2.8rem)', color: '#fff', textTransform: 'uppercase', marginBottom: '0.75rem', lineHeight: 0.9 }}>
            ¿YA TRABAJASTE<br />CON NOSOTROS?
          </h4>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.9rem', maxWidth: '380px', margin: '0 auto 2rem', fontWeight: 300, lineHeight: 1.6 }}>
            Tu reseña nos ayuda a crecer y que más clientes nos conozcan.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="https://g.page/r/LINK_GOOGLE_MAPS/review" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: '#ffc600', color: '#000', fontFamily: "'Barlow Condensed',sans-serif", fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.85rem 2rem', textDecoration: 'none', clipPath: 'polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))' }}>
              ⭐ RESEÑA EN GOOGLE
            </a>
            <a href="https://wa.me/56966575447?text=Hola%20InnVolt%2C%20quiero%20dejarte%20un%20testimonio" target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', color: 'rgba(255,255,255,0.6)', fontFamily: "'Barlow Condensed',sans-serif", fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '0.85rem 2rem', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)' }}>
              <MessageCircle size={14} /> POR WHATSAPP
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
