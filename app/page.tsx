import Link from 'next/link';
import { ArrowRight, ArrowUpRight, MapPin, Phone, Zap } from 'lucide-react';
import { Shell, Photo, SecSeal, TrustStrip, Art, FaqList, CtaBand, ReviewsCta, waElec } from './_site/ui';
import GoogleReviews from './_site/GoogleReviews';
import { CATEGORIES, TECNOLOGIA, ENERGIA_MAS, HOME_FAQS, ZONA_CORTA, SITE } from './_site/content';

export default function Page() {
  return (
    <Shell active="Inicio">
      {/* HERO */}
      <section className="iv-hero iv-hero-home">
        <span className="iv-hero-bolt" aria-hidden="true">
          <svg width="360" height="460" viewBox="0 0 50 64" fill="none"><path d="M28 2 L4 36 H17 L14 62 L46 25 H29 L36 2 Z" fill="#1a1813" /></svg>
        </span>
        <div className="iv-container iv-hero-grid">
          <div>
            <span className="iv-pill"><MapPin size={13} /> {ZONA_CORTA}</span>
            <h1 className="iv-h1">Electricidad y energía,<br />pensadas para <span className="iv-mark">durar</span>.</h1>
            <p className="iv-lead">
              Soluciones eléctricas y energéticas para hogares, comercios y empresas. Desde instalaciones y tableros
              hasta proyectos de energía solar y eficiencia energética.
            </p>
            <div className="iv-cta-row">
              <Link href="/contacto" className="iv-btn">Solicitar cotización <ArrowRight size={16} /></Link>
              <Link href="/servicios" className="iv-btn iv-btn-ghost">Conocer servicios</Link>
            </div>
            <div><SecSeal /></div>
            <a href={waElec} target="_blank" rel="noopener noreferrer" className="iv-wa"><Phone size={14} /> {SITE.phoneLabel} · WhatsApp directo</a>
          </div>
          <div className="iv-hero-media">
            <div className="iv-frame">
              <Photo src="/fotos/tablero-medicion.jpg" alt="Técnico de InnVolt revisando un tablero general con pinza amperimétrica" sizes="(max-width: 980px) 92vw, 520px" priority />
            </div>
            <span className="iv-sticker"><Zap size={16} /> Evaluación + propuesta clara</span>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* SERVICIOS PRINCIPALES */}
      <section className="iv-section">
        <div className="iv-container">
          <div className="iv-head">
            <h2 className="iv-h2"><span className="iv-kicker">Servicios principales</span>Electricidad y energía</h2>
            <p className="iv-head-note">Nuestra especialidad. Elige tu necesidad y conoce cómo trabajamos.</p>
          </div>
          <div className="iv-serv-grid">
            {CATEGORIES.map(c => {
              const Icon = c.icon;
              return (
                <Link key={c.slug} href={`/${c.slug}`} className="iv-card iv-serv">
                  <div className="iv-serv-media">
                    {c.img ? <Photo src={c.img} alt={c.title} sizes="(max-width: 760px) 92vw, 560px" /> : <Art kind="solar" />}
                    <span className="iv-badge"><Icon size={18} /></span>
                  </div>
                  <div className="iv-serv-body">
                    <h3>{c.title}</h3>
                    <p>{c.desc}</p>
                    <span className="iv-link">Ver servicio <ArrowUpRight size={14} /></span>
                  </div>
                </Link>
              );
            })}
          </div>

          <h3 className="iv-group-title">También resolvemos</h3>
          <div className="iv-mini-grid">
            {ENERGIA_MAS.map(s => {
              const Icon = s.icon;
              return (
                <Link key={s.slug} href={`/${s.slug}`} className="iv-card iv-mini">
                  <span className="iv-badge iv-badge-sm"><Icon size={17} /></span>{s.name}<ArrowUpRight size={16} />
                </Link>
              );
            })}
            <Link href="/servicios" className="iv-card iv-mini">Ver todos los servicios<ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>

      {/* OTRAS SOLUCIONES (línea complementaria) */}
      <section className="iv-section iv-alt">
        <div className="iv-container iv-teaser">
          <div>
            <span className="iv-kicker">Otras soluciones InnVolt</span>
            <h2 className="iv-h2">También integramos tecnología, automatización y seguridad</h2>
            <div className="iv-chips">
              {TECNOLOGIA.map(t => {
                const Icon = t.icon;
                return <Link key={t.slug} href={`/${t.slug}`} className="iv-chip"><Icon size={15} /> {t.name}</Link>;
              })}
            </div>
          </div>
          <Link href="/tecnologia" className="iv-btn iv-btn-dark">Explorar soluciones tecnológicas <ArrowUpRight size={15} /></Link>
        </div>
      </section>

      {/* QUIÉNES SOMOS */}
      <section className="iv-section">
        <div className="iv-container iv-nos">
          <div>
            <span className="iv-kicker">Quiénes somos</span>
            <h2 className="iv-h2">Electricidad y energía, con respaldo</h2>
          </div>
          <div>
            <p className="iv-lead">
              En InnVolt resolvemos la electricidad y la energía de tu hogar, comercio o empresa con trabajos
              certificados SEC, seguros y bajo normativa. Somos especialistas en instalaciones eléctricas y en
              energía solar fotovoltaica: evaluamos tu caso, te entregamos un presupuesto claro y ejecutamos con respaldo.
            </p>
            <Link href="/proyectos" className="iv-link" style={{ marginTop: '1rem' }}>Ver trabajos realizados <ArrowUpRight size={14} /></Link>
          </div>
        </div>
        <div className="iv-container" style={{ marginTop: '2.5rem' }}>
          <GoogleReviews><ReviewsCta /></GoogleReviews>
        </div>
      </section>

      {/* PREGUNTAS FRECUENTES */}
      <section className="iv-section iv-alt">
        <div className="iv-container">
          <h2 className="iv-h2" style={{ marginBottom: '2rem' }}><span className="iv-kicker">Preguntas frecuentes</span>Antes de cotizar</h2>
          <FaqList faqs={HOME_FAQS} />
        </div>
      </section>

      <CtaBand
        id="contacto"
        title="¿Necesitas una solución eléctrica o energética?"
        text="Cuéntanos tu proyecto y te preparamos una propuesta con el alcance definido."
      />
    </Shell>
  );
}
