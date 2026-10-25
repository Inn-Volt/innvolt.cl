'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Sun, Zap, LayoutGrid, Percent, Wallet, ChevronDown } from 'lucide-react';

/*
  Producción solar por kWp instalado (kWh), mes a mes, de enero a diciembre.
  Fuente: PVGIS v5.2 (Comisión Europea, JRC), base de radiación PVGIS-ERA5 2005–2020.
  Supuestos: paneles fijos orientados al norte, inclinación 30°, pérdidas del sistema 14 %.
  Consultado el 25-10-2026: https://re.jrc.ec.europa.eu/api/v5_2/PVcalc
*/
const ZONAS = {
  rm: { label: 'Región Metropolitana', coords: '-33,45; -70,66', mensual: [184, 166, 177, 148, 117, 96, 108, 126, 146, 166, 171, 182] },
  villarrica: { label: 'Villarrica y alrededores', coords: '-39,28; -72,23', mensual: [169, 145, 137, 99, 71, 50, 63, 78, 111, 132, 143, 160] },
} as const;
type ZonaKey = keyof typeof ZONAS;

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const nf = new Intl.NumberFormat('es-CL', { maximumFractionDigits: 0 });
const nf1 = new Intl.NumberFormat('es-CL', { maximumFractionDigits: 1 });
const clp = (n: number) => `$${nf.format(Math.round(n / 100) * 100)}`;

export default function SolarSimulator() {
  const [zona, setZona] = useState<ZonaKey>('rm');
  const [consumo, setConsumo] = useState(350);      // kWh/mes (de la boleta)
  const [boleta, setBoleta] = useState<number | ''>(''); // $ total de la boleta
  const [cobertura, setCobertura] = useState(80);   // % del consumo a cubrir
  const [techo, setTecho] = useState<number | ''>(''); // m² disponibles (opcional)
  const [panelW, setPanelW] = useState(550);        // potencia por panel (W)
  const [areaPanel, setAreaPanel] = useState(2.7);  // m² por panel, con separación

  const r = useMemo(() => {
    const perfil = ZONAS[zona].mensual;
    const rendimiento = perfil.reduce((a, b) => a + b, 0); // kWh/kWp/año
    const consumoAnual = Math.max(consumo, 0) * 12;
    const objetivo = consumoAnual * (cobertura / 100);
    let paneles = Math.max(1, Math.ceil((objetivo / rendimiento) * 1000 / panelW));
    let limitadoPorTecho = false;
    if (techo !== '' && techo > 0) {
      const max = Math.floor(techo / areaPanel);
      if (max < paneles) { paneles = Math.max(max, 0); limitadoPorTecho = true; }
    }
    const kwp = (paneles * panelW) / 1000;
    const mensual = perfil.map(p => p * kwp);
    const generacionAnual = mensual.reduce((a, b) => a + b, 0);
    const coberturaReal = consumoAnual > 0 ? (generacionAnual / consumoAnual) * 100 : 0;
    const precioKwh = boleta !== '' && consumo > 0 ? boleta / consumo : null;
    const ahorroMensual = precioKwh ? (Math.min(generacionAnual, consumoAnual) * precioKwh) / 12 : null;
    return { kwp, paneles, superficie: paneles * areaPanel, mensual, generacionAnual, coberturaReal, precioKwh, ahorroMensual, limitadoPorTecho, rendimiento };
  }, [zona, consumo, boleta, cobertura, techo, panelW, areaPanel]);

  const maxBar = Math.max(...r.mensual, consumo, 1);
  const waMsg = `Hola, usé el simulador solar de innvolt.cl. Zona: ${ZONAS[zona].label}. Consumo: ${nf.format(consumo)} kWh/mes. ` +
    `Sistema sugerido: ${nf1.format(r.kwp)} kWp (${r.paneles} paneles de ${panelW} W). Quiero una evaluación real.`;

  return (
    <div className="iv-sim">
      {/* ── ENTRADAS ── */}
      <form className="iv-card iv-sim-form" onSubmit={e => e.preventDefault()}>
        <h2 className="iv-sim-h">1. Tus datos</h2>

        <fieldset className="iv-sim-field">
          <legend className="iv-label">Zona</legend>
          <div className="iv-seg">
            {(Object.keys(ZONAS) as ZonaKey[]).map(k => (
              <button key={k} type="button" className={zona === k ? 'is-on' : ''} aria-pressed={zona === k} onClick={() => setZona(k)}>
                {ZONAS[k].label}
              </button>
            ))}
          </div>
        </fieldset>

        <div className="iv-sim-field">
          <label className="iv-label" htmlFor="sim-consumo">Consumo mensual (kWh)</label>
          <div className="iv-sim-range">
            <input id="sim-consumo" type="range" min={50} max={3000} step={10} value={consumo} onChange={e => setConsumo(Number(e.target.value))} />
            <input className="iv-input iv-sim-num" type="number" min={1} value={consumo} onChange={e => setConsumo(Math.max(0, Number(e.target.value)))} aria-label="Consumo mensual en kWh" />
          </div>
          <p className="iv-hint">Aparece en tu boleta como «consumo» o «energía». Si varía mucho, usa un promedio.</p>
        </div>

        <div className="iv-sim-field">
          <label className="iv-label" htmlFor="sim-boleta">Total de tu boleta ($) <span className="iv-opt">opcional</span></label>
          <input id="sim-boleta" className="iv-input" type="number" min={0} step={1000} placeholder="Ej: 85000" value={boleta}
            onChange={e => setBoleta(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))} />
          <p className="iv-hint">Con este dato estimamos tu ahorro usando tu propio precio por kWh.</p>
        </div>

        <div className="iv-sim-field">
          <label className="iv-label" htmlFor="sim-cobertura">¿Cuánto de tu consumo quieres cubrir? <strong>{cobertura}%</strong></label>
          <input id="sim-cobertura" type="range" min={30} max={100} step={5} value={cobertura} onChange={e => setCobertura(Number(e.target.value))} />
        </div>

        <div className="iv-sim-field">
          <label className="iv-label" htmlFor="sim-techo">Superficie de techo disponible (m²) <span className="iv-opt">opcional</span></label>
          <input id="sim-techo" className="iv-input" type="number" min={0} placeholder="Ej: 30" value={techo}
            onChange={e => setTecho(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))} />
        </div>

        <details className="iv-sim-adv">
          <summary>Supuestos técnicos <ChevronDown size={16} /></summary>
          <div className="iv-row">
            <div className="iv-field">
              <label className="iv-label" htmlFor="sim-panel">Potencia por panel (W)</label>
              <input id="sim-panel" className="iv-input" type="number" min={100} max={800} step={5} value={panelW} onChange={e => setPanelW(Math.min(800, Math.max(100, Number(e.target.value))))} />
            </div>
            <div className="iv-field">
              <label className="iv-label" htmlFor="sim-area">m² por panel (con separación)</label>
              <input id="sim-area" className="iv-input" type="number" min={1} max={5} step={0.1} value={areaPanel} onChange={e => setAreaPanel(Math.min(5, Math.max(1, Number(e.target.value))))} />
            </div>
          </div>
          <p className="iv-hint">
            Producción según PVGIS (Comisión Europea) para {ZONAS[zona].label} ({ZONAS[zona].coords}): {nf.format(r.rendimiento)} kWh por kWp al año,
            con paneles al norte a 30° y 14 % de pérdidas.
          </p>
        </details>
      </form>

      {/* ── RESULTADOS ── */}
      <section className="iv-card iv-sim-out" aria-live="polite">
        <h2 className="iv-sim-h">2. Resultado referencial</h2>

        <div className="iv-sim-kpis">
          <Kpi icon={<Sun size={18} />} label="Sistema sugerido" value={`${nf1.format(r.kwp)} kWp`} sub={`${r.paneles} paneles de ${panelW} W`} />
          <Kpi icon={<LayoutGrid size={18} />} label="Techo aproximado" value={`${nf.format(r.superficie)} m²`} sub={r.limitadoPorTecho ? 'Limitado por tu techo' : 'Superficie de paneles'} />
          <Kpi icon={<Zap size={18} />} label="Generación anual" value={`${nf.format(r.generacionAnual)} kWh`} sub={`≈ ${nf.format(r.generacionAnual / 12)} kWh al mes`} />
          <Kpi icon={<Percent size={18} />} label="Cubre tu consumo" value={`${nf.format(r.coberturaReal)}%`} sub="Promedio anual" />
        </div>

        <div className="iv-sim-save">
          <span className="iv-sim-save-ico"><Wallet size={20} /></span>
          {r.ahorroMensual !== null ? (
            <div>
              <p className="iv-sim-save-v">Hasta {clp(r.ahorroMensual)} <small>al mes</small></p>
              <p className="iv-hint">≈ {clp(r.ahorroMensual * 12)} al año, con tu precio de ${nf.format(r.precioKwh ?? 0)} por kWh (total de la boleta ÷ consumo).</p>
            </div>
          ) : (
            <p className="iv-hint" style={{ margin: 0 }}>Ingresa el total de tu boleta para estimar tu ahorro.</p>
          )}
        </div>

        {/* Gráfico mensual */}
        <figure className="iv-sim-chart">
          <figcaption className="iv-label">Generación estimada vs. tu consumo, por mes (kWh)</figcaption>
          <svg viewBox="0 0 360 170" role="img" aria-label="Generación solar mensual estimada comparada con el consumo">
            {r.mensual.map((v, i) => {
              const h = (v / maxBar) * 130;
              return (
                <g key={MESES[i]}>
                  <rect x={8 + i * 29} y={140 - h} width={20} height={h} rx={3} fill="#F6C21C" stroke="#1a1813" strokeWidth={1.2}>
                    <title>{`${MESES[i]}: ${nf.format(v)} kWh`}</title>
                  </rect>
                  <text x={18 + i * 29} y={156} textAnchor="middle" fontSize="9" fill="#58544b">{MESES[i]}</text>
                </g>
              );
            })}
            <line x1={4} x2={356} y1={140 - (consumo / maxBar) * 130} y2={140 - (consumo / maxBar) * 130} stroke="#1a1813" strokeWidth={1.5} strokeDasharray="5 4" />
            <line x1={4} x2={356} y1={140} y2={140} stroke="#1a1813" strokeWidth={1.2} />
          </svg>
          <p className="iv-sim-legend"><span className="iv-sim-sw iv-sim-sw-y" /> Generación <span className="iv-sim-sw iv-sim-sw-l" /> Tu consumo mensual</p>
        </figure>

        <div className="iv-cta-row" style={{ marginTop: '1.4rem' }}>
          <a
            href={`https://wa.me/56966575447?text=${encodeURIComponent(waMsg)}`}
            target="_blank" rel="noopener noreferrer" className="iv-btn"
            onClick={() => window.gtag?.('event', 'simulator_cta', { kwp: r.kwp, zona })}
          >
            Pedir evaluación con estos datos
          </a>
          <Link href="/paneles-solares-santiago" className="iv-btn iv-btn-ghost">Cómo trabajamos la energía solar</Link>
        </div>
      </section>

      <p className="iv-note iv-sim-disclaimer">
        <strong>Resultado referencial.</strong> Supone que toda la energía generada reemplaza energía comprada a la red. Con net billing, los excedentes que
        inyectas se valorizan a un precio menor, y la producción real depende de la orientación, la inclinación y las sombras de tu techo. Por eso el ahorro
        se muestra como «hasta». El dimensionamiento y la inversión definitivos se determinan en una evaluación técnica.
      </p>
    </div>
  );
}

function Kpi({ icon, label, value, sub }: { icon: React.ReactNode; label: string; value: string; sub: string }) {
  return (
    <div className="iv-kpi">
      <span className="iv-kpi-l">{icon} {label}</span>
      <span className="iv-kpi-v">{value}</span>
      <span className="iv-kpi-s">{sub}</span>
    </div>
  );
}
