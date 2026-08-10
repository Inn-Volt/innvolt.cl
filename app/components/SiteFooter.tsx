import Link from 'next/link';
import { Phone, Mail, Instagram, MapPin } from 'lucide-react';
import Logo from './Logo';

export default function SiteFooter() {
  return (
    <footer style={{ background: '#000', borderTop: '1px solid var(--border)' }}>
      <div className="container" style={{ paddingTop: '3rem', paddingBottom: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem', marginBottom: '2.5rem' }}>

          <div>
            <Logo height={30} />
            <p className="body-sm" style={{ marginTop: '1rem', fontSize: '0.82rem', maxWidth: 280 }}>
              Electricistas certificados SEC en Santiago. Electricidad, domótica y seguridad para hogar, empresa e industria.
            </p>
          </div>

          <div>
            <p className="label" style={{ marginBottom: '1rem' }}>Servicios</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li><Link href="/electricista-santiago" className="footer-link">Instalaciones eléctricas</Link></li>
              <li><Link href="/tableros-electricos" className="footer-link">Tableros eléctricos</Link></li>
              <li><Link href="/certificacion-te1" className="footer-link">Certificación TE1</Link></li>
              <li><Link href="/camaras-cctv-santiago" className="footer-link">Cámaras CCTV</Link></li>
              <li><Link href="/control-de-acceso" className="footer-link">Control de acceso</Link></li>
              <li><Link href="/servicios" className="footer-link" style={{ color: 'var(--y)' }}>Ver todos →</Link></li>
            </ul>
          </div>

          <div>
            <p className="label" style={{ marginBottom: '1rem' }}>Más servicios</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li><Link href="/mantencion-electrica" className="footer-link">Mantención eléctrica</Link></li>
              <li><Link href="/domotica-santiago" className="footer-link">Domótica</Link></li>
              <li><Link href="/redes-cableado-estructurado" className="footer-link">Redes y cableado</Link></li>
              <li><Link href="/pantallas-led" className="footer-link">Pantallas LED</Link></li>
              <li><Link href="/urgencias-electricas-santiago" className="footer-link">Urgencias 24h</Link></li>
              <li><Link href="/#contacto" className="footer-link">Contacto</Link></li>
            </ul>
          </div>

          <div>
            <p className="label" style={{ marginBottom: '1rem' }}>Contacto</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li><a href="tel:+56989203902" className="footer-link"><Phone size={13} style={{ verticalAlign: -2, marginRight: 6 }} />+56 9 8920 3902</a></li>
              <li><a href="mailto:innvolt.cl@gmail.com" className="footer-link"><Mail size={13} style={{ verticalAlign: -2, marginRight: 6 }} />innvolt.cl@gmail.com</a></li>
              <li><a href="https://instagram.com/inn.volt" target="_blank" rel="noopener noreferrer" className="footer-link"><Instagram size={13} style={{ verticalAlign: -2, marginRight: 6 }} />@inn.volt</a></li>
              <li><span className="footer-link" style={{ cursor: 'default' }}><MapPin size={13} style={{ verticalAlign: -2, marginRight: 6 }} />Santiago, RM</span></li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border2)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <p style={{ fontFamily: 'var(--font-display)', color: 'rgba(255,255,255,0.25)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            © 2026 INNVOLT SpA · Santiago, Chile
          </p>
          <p style={{ fontFamily: 'var(--font-display)', color: 'rgba(255,255,255,0.25)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Instaladores Certificados SEC
          </p>
        </div>
      </div>
    </footer>
  );
}
