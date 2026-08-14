import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Logo from '../components/Logo';
import SiteFooter from '../components/SiteFooter';

export const metadata: Metadata = {
  title: 'Servicios Eléctricos y Tecnológicos en Santiago',
  description: 'Servicios de INNVOLT en Santiago: instalaciones eléctricas, tableros, mantención, certificación TE1, cámaras CCTV, control de acceso, domótica, redes y pantallas LED. Una sola empresa para toda tu tecnología.',
  alternates: { canonical: '/servicios' },
  openGraph: {
    title: 'Servicios Eléctricos y Tecnológicos en Santiago | INNVOLT',
    description: 'Electricidad, seguridad, redes y automatización para hogar y empresa. Una sola empresa para toda tu tecnología.',
    url: 'https://innvolt.cl/servicios',
    type: 'website',
  },
};

const GROUPS = [
  {
    label: 'Electricidad',
    items: [
      { name: 'Instalaciones eléctricas', slug: 'electricista-santiago', desc: 'Domiciliarias, comerciales e industriales, certificadas SEC.' },
      { name: 'Tableros eléctricos', slug: 'tableros-electricos', desc: 'Instalación, normalización y protecciones bien dimensionadas.' },
      { name: 'Mantención eléctrica', slug: 'mantencion-electrica', desc: 'Preventiva y correctiva, con contratos para empresas.' },
      { name: 'Certificación TE1', slug: 'certificacion-te1', desc: 'Declaración ante la SEC conforme a la normativa vigente.' },
      { name: 'Urgencias 24h', slug: 'urgencias-electricas-santiago', desc: 'Cortes, fallas y emergencias eléctricas el mismo día.' },
    ],
  },
  {
    label: 'Seguridad',
    items: [
      { name: 'Cámaras CCTV', slug: 'camaras-cctv-santiago', desc: 'HD y 4K con monitoreo remoto 24/7 para hogar y empresa.' },
      { name: 'Control de acceso', slug: 'control-de-acceso', desc: 'Tarjeta, huella, videoporteros y portones automáticos.' },
    ],
  },
  {
    label: 'Tecnología',
    items: [
      { name: 'Domótica y automatización', slug: 'domotica-santiago', desc: 'Iluminación, accesos y ambientes inteligentes.' },
      { name: 'Redes y cableado estructurado', slug: 'redes-cableado-estructurado', desc: 'Puntos de red, fibra, racks y WiFi profesional.' },
      { name: 'Pantallas LED', slug: 'pantallas-led', desc: 'Interior y exterior con tecnología Novastar.' },
    ],
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://innvolt.cl' },
        { '@type': 'ListItem', position: 2, name: 'Servicios', item: 'https://innvolt.cl/servicios' },
      ],
    },
    {
      '@type': 'ItemList',
      itemListElement: GROUPS.flatMap(g => g.items).map((s, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: s.name,
        url: `https://innvolt.cl/${s.slug}`,
      })),
    },
  ],
};

export default function Page() {
  return (
    <div style={{ minHeight: '100vh', background: '#000' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <nav className="nav">
        <div className="container">
          <div className="nav-inner">
            <Link href="/" aria-label="InnVolt inicio"><Logo height={34} /></Link>
            <div className="nav-links">
              <Link href="/servicios" className="nav-link">Servicios</Link>
              <Link href="/#contacto" className="btn btn-primary" style={{ padding: '0.55rem 1.4rem', fontSize: '0.7rem' }}>PRESUPUESTO</Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="section" style={{ paddingTop: '9rem', background: 'var(--bg)' }}>
        <div className="container">
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--muted)', fontFamily: 'var(--font-display)', fontSize: '0.7rem', letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', marginBottom: '1.5rem' }}>
            <ArrowLeft size={13} /> Volver al inicio
          </Link>
          <p className="label" style={{ marginBottom: '0.75rem' }}>— Nuestros servicios</p>
          <h1 className="display" style={{ fontSize: 'clamp(2.6rem, 7vw, 5rem)', color: '#fff', marginBottom: '1.5rem' }}>SERVICIOS</h1>
          <p className="body-sm" style={{ maxWidth: 680, fontSize: '1rem' }}>
            En INNVOLT integramos electricidad, seguridad y tecnología en una sola empresa. Desde la instalación eléctrica certificada SEC hasta redes, cámaras, control de acceso y automatización, resolvemos toda la infraestructura tecnológica de tu hogar o empresa en Santiago y la Región Metropolitana, con un solo responsable del resultado.
          </p>
        </div>
      </section>

      {GROUPS.map((g, gi) => (
        <section key={g.label} className="section" style={{ background: gi % 2 === 0 ? '#000' : 'var(--bg2)', paddingTop: gi === 0 ? 0 : undefined }}>
          <div className="container">
            <p className="label" style={{ marginBottom: '1.5rem' }}>— {g.label}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
              {g.items.map(s => (
                <Link key={s.slug} href={`/${s.slug}`} style={{ background: 'var(--bg2)', border: '1px solid var(--border)', padding: '1.9rem 1.6rem', textDecoration: 'none', display: 'block' }} className="service-link-card">
                  <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.2rem', textTransform: 'uppercase', color: '#fff', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                    {s.name} <ArrowRight size={16} color="var(--y)" />
                  </h2>
                  <p className="body-sm" style={{ fontSize: '0.86rem' }}>{s.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section" style={{ background: '#000' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="display" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', color: '#fff', marginBottom: '1rem' }}>
            ¿NO SABES QUÉ <span style={{ color: 'var(--y)' }}>NECESITAS?</span>
          </h2>
          <p className="body-sm" style={{ maxWidth: 460, margin: '0 auto 2rem' }}>
            Cuéntanos tu proyecto y te asesoramos. Respondemos el mismo día hábil en Santiago y la Región Metropolitana.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/#contacto" className="btn btn-primary">SOLICITAR COTIZACIÓN <ArrowRight size={15} /></Link>
            <a href="https://wa.me/56966575447?text=Hola%20InnVolt%2C%20quiero%20asesor%C3%ADa%20sobre%20un%20proyecto" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">POR WHATSAPP</a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
