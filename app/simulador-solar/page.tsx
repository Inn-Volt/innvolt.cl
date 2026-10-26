import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Shell, FaqList, CtaBand } from '../_site/ui';
import SolarSimulator from '../_site/SolarSimulator';
import { SIMULADOR_PUBLICO } from '../_site/content';

export const metadata: Metadata = {
  title: 'Simulador solar: calcula tus paneles y tu ahorro',
  description: 'Calcula cuántos paneles solares necesitas, cuánta energía generarían y tu ahorro referencial, con tu consumo real y datos de radiación de PVGIS.',
  alternates: { canonical: '/simulador-solar' },
  // Oculta para buscadores mientras está en revisión interna (ver SIMULADOR_PUBLICO en content.ts)
  ...(SIMULADOR_PUBLICO ? {} : { robots: { index: false, follow: false } }),
};

const FAQS = [
  { q: '¿Cómo calculan la cantidad de paneles?', a: 'Con el mismo método que usamos en nuestros proyectos: tomamos tu energía diaria, le sumamos un 10 % de holgura y la dividimos por la producción diaria de cada panel (potencia × horas sol pico × factor de eficiencia de 0,9). En «Ver el cálculo paso a paso» puedes revisar cada número.' },
  { q: '¿De dónde salen los datos de sol?', a: 'De PVGIS, la herramienta de la Comisión Europea que estima la radiación solar con datos satelitales (base ERA5, 2005–2020), para paneles orientados al norte con 30° de inclinación. De ahí salen las horas sol pico de cada mes y la producción estimada.' },
  { q: '¿Qué diferencia hay entre «con red» y «sin red»?', a: 'Con red (net billing) el sistema se conecta a la distribuidora: lo que no usas se inyecta y se descuenta de tu cuenta, por eso se diseña con el promedio anual. Sin red (aislado) dependes solo del sol y de las baterías, por eso se diseña para el mes con menos sol y según los equipos que vas a alimentar.' },
  { q: '¿Cómo se calculan las baterías?', a: 'Energía diaria × días de autonomía, dividido por el voltaje del banco (48 V), la profundidad de descarga (80 %) y la eficiencia de la batería (0,95 en litio, 0,8 en plomo-ácido).' },
  { q: '¿Por qué el ahorro aparece como «hasta»?', a: 'Porque supone que toda la energía generada reemplaza energía comprada a la red. Con net billing, los excedentes que inyectas se pagan a un valor menor, y las sombras u orientación de tu techo pueden reducir la producción.' },
  { q: '¿Por qué no muestra el precio del sistema?', a: 'Porque la inversión depende de los equipos, la estructura, el techo y la instalación eléctrica existente. La calculamos en una evaluación técnica, con tus datos reales.' },
  { q: '¿Dónde encuentro mi consumo en kWh?', a: 'En tu boleta de electricidad, en el detalle del consumo o de la energía del período. Si varía mucho entre meses, usa un promedio de varias boletas.' },
];

export default function Page() {
  return (
    <Shell active="Servicios" wa="Hola, quisiera evaluar un proyecto de energía solar.">
      <section className="iv-page-hero">
        <div className="iv-container">
          <Link href="/paneles-solares-santiago" className="iv-crumb"><ArrowLeft size={13} /> Energía solar</Link>
          <h1>Simulador solar</h1>
          <p className="iv-lead">
            Calcula cuántos paneles y baterías necesitas, con o sin conexión a la red, usando nuestro método de cálculo, el consumo de tu
            boleta o tus equipos, y datos reales de radiación solar.
          </p>
        </div>
      </section>

      <section className="iv-section">
        <div className="iv-container">
          <SolarSimulator />
        </div>
      </section>

      <section className="iv-section iv-alt">
        <div className="iv-container">
          <h2 className="iv-h2" style={{ marginBottom: '2rem' }}><span className="iv-kicker">Sobre el cálculo</span>Preguntas frecuentes</h2>
          <FaqList faqs={FAQS} />
        </div>
      </section>

      <CtaBand title="¿Quieres el cálculo exacto para tu techo?" text="Hacemos la evaluación técnica con tus boletas, tu techo y tu instalación eléctrica." wa="Hola, quisiera una evaluación solar para mi vivienda o empresa." />
    </Shell>
  );
}
