import Link from 'next/link';
import Logo from './components/Logo';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ textAlign: 'center', maxWidth: 520 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <Logo height={40} />
        </div>
        <p className="display" style={{ fontSize: 'clamp(4rem, 18vw, 9rem)', color: 'var(--y)', lineHeight: 1 }}>404</p>
        <h1 className="display" style={{ fontSize: 'clamp(1.6rem, 5vw, 2.6rem)', color: '#fff', marginTop: '0.5rem', marginBottom: '1rem' }}>
          PÁGINA NO ENCONTRADA
        </h1>
        <p className="body-sm" style={{ maxWidth: 380, margin: '0 auto 2.25rem' }}>
          La página que buscas no existe o cambió de dirección. Volvamos a lo importante: tu proyecto eléctrico.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Link href="/" className="btn btn-primary"><ArrowLeft size={15} /> VOLVER AL INICIO</Link>
          <a href="https://wa.me/56966575447?text=Hola%20InnVolt%2C%20quiero%20cotizar%20un%20proyecto" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            WHATSAPP
          </a>
        </div>
      </div>
    </div>
  );
}
