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
              Electricistas certificados SEC y especialistas en energía solar en Santiago y Villarrica / la Araucanía. Para hogar, empresa e industria liviana.
            </p>
          </div>

          <div>
            <p className="label" style={{ marginBottom: '1rem' }}>Electricidad</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li><Link href="/instalaciones-electricas" className="footer-link">Instalaciones eléctricas</Link></li>
              <li><Link href="/tableros-electricos" className="footer-link">Tableros eléctricos</Link></li>
              <li><Link href="/aumento-de-capacidad-empalme" className="footer-link">Aumento de capacidad</Link></li>
              <li><Link href="/certificacion-te1" className="footer-link">Certificación TE1</Link></li>
              <li><Link href="/mantencion-electrica" className="footer-link">Mantención eléctrica</Link></li>
              <li><Link href="/urgencias-electricas-santiago" className="footer-link">Urgencias eléctricas</Link></li>
            </ul>
          </div>

          <div>
            <p className="label" style={{ marginBottom: '1rem' }}>Energía renovable</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li><Link href="/paneles-solares-santiago" className="footer-link">Paneles solares</Link></li>
              <li><Link href="/paneles-solares-netbilling" className="footer-link">Net billing</Link></li>
              <li><Link href="/baterias-almacenamiento-energia" className="footer-link">Baterías y respaldo</Link></li>
              <li><Link href="/cargador-auto-electrico" className="footer-link">Cargador de auto eléctrico</Link></li>
              <li><Link href="/eficiencia-energetica" className="footer-link">Eficiencia energética</Link></li>
              <li><Link href="/electricista-villarrica" className="footer-link" style={{ color: 'var(--y)' }}>Electricista en Villarrica</Link></li>
            </ul>
          </div>

          <div>
            <p className="label" style={{ marginBottom: '1rem' }}>Contacto</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <li><a href="tel:+56966575447" className="footer-link"><Phone size={13} style={{ verticalAlign: -2, marginRight: 6 }} />+56 9 6657 5447</a></li>
              <li><a href="mailto:innvolt.cl@gmail.com" className="footer-link"><Mail size={13} style={{ verticalAlign: -2, marginRight: 6 }} />innvolt.cl@gmail.com</a></li>
              <li><a href="https://instagram.com/inn.volt" target="_blank" rel="noopener noreferrer" className="footer-link"><Instagram size={13} style={{ verticalAlign: -2, marginRight: 6 }} />@inn.volt</a></li>
              <li><span className="footer-link" style={{ cursor: 'default' }}><MapPin size={13} style={{ verticalAlign: -2, marginRight: 6 }} />Santiago, RM · Villarrica, Araucanía</span></li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border2)', paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
          <p style={{ fontFamily: 'var(--font-display)', color: 'rgba(255,255,255,0.25)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            © 2026 INNVOLT SpA · Santiago y Villarrica, Chile
          </p>
          <p style={{ fontFamily: 'var(--font-display)', color: 'rgba(255,255,255,0.25)', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
            Instaladores Certificados SEC
          </p>
        </div>
      </div>
    </footer>
  );
}
