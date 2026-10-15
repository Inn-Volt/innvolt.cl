import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Logo from '../components/Logo';
import SiteFooter from '../components/SiteFooter';

export const metadata: Metadata = {
  title: 'Servicios de Electricidad y Energía Solar en Santiago',
  description: 'Servicios de InnVolt en Santiago: instalaciones eléctricas, tableros, certificación TE1, mantención y urgencias; además paneles solares, net billing, baterías, cargador de auto eléctrico y eficiencia energética.',
  alternates: { canonical: '/servicios' },
  openGraph: {
    title: 'Servicios de Electricidad y Energía Solar en Santiago | InnVolt',
    description: 'Electricidad certificada SEC y energía renovable para tu casa o empresa. Una sola empresa.',
    url: 'https://innvolt.cl/servicios',
    type: 'website',
  },
};

const GROUPS = [
  {
    label: 'Electricidad',
    items: [
      { name: 'Instalaciones eléctricas', slug: 'instalaciones-electricas', desc: 'Residencial, comercial e industria liviana, certificadas SEC.' },
      { name: 'Tableros eléctricos', slug: 'tableros-electricos', desc: 'Instalación, normalización y protecciones bien dimensionadas.' },
      { name: 'Aumento de capacidad', slug: 'aumento-de-capacidad-empalme', desc: 'Más potencia y cambio de empalme para tu casa o negocio.' },
      { name: 'Certificación TE1', slug: 'certificacion-te1', desc: 'Declaración ante la SEC conforme a la normativa vigente.' },
      { name: 'Mantención eléctrica', slug: 'mantencion-electrica', desc: 'Preventiva y correctiva, con contratos para empresas.' },
      { name: 'Proyectos eléctricos', slug: 'proyectos-electricos', desc: 'Diseño, planos, ejecución y certificación para empresas.' },
      { name: 'Urgencias eléctricas', slug: 'urgencias-electricas-santiago', desc: 'Cortes, fallas y emergencias eléctricas el mismo día.' },
    ],
  },
  {
    label: 'Energía renovable',
    items: [
      { name: 'Paneles solares', slug: 'paneles-solares-santiago', desc: 'Instalación fotovoltaica para bajar tu cuenta de luz.' },
      { name: 'Net billing', slug: 'paneles-solares-netbilling', desc: 'Declaración TE4 para inyectar a la red (Ley 21.118).' },
      { name: 'Baterías y respaldo', slug: 'baterias-almacenamiento-energia', desc: 'Sistemas híbridos con respaldo ante cortes de luz.' },
      { name: 'Cargador de auto eléctrico', slug: 'cargador-auto-electrico', desc: 'Instalación de wallbox con circuito dedicado y TE6.' },
      { name: 'Eficiencia energética', slug: 'eficiencia-energetica', desc: 'Monitoreo, iluminación y gestión para gastar menos.' },
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
            En InnVolt trabajamos dos líneas que se potencian: electricidad certificada SEC y energía renovable. Desde la instalación eléctrica, los tableros y la certificación TE1 hasta los paneles solares, el net billing, las baterías y los cargadores de auto eléctrico, resolvemos la energía de tu casa o empresa en Santiago y la Región Metropolitana, con un solo responsable del resultado.
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
