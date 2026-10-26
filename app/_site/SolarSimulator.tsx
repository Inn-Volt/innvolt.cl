'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Sun, Zap, LayoutGrid, Percent, Wallet, ChevronDown, BatteryCharging, Cpu, Plus, Trash2, Calculator } from 'lucide-react';

/*
  Simulador basado en el método de cálculo de InnVolt (planilla "CÁLCULOS PROYECTO FV"):
    Energía diaria de diseño = energía diaria × (1 + holgura)
    N° de paneles            = energía diaria de diseño (Wh) / (potencia panel × HSP × factor de eficiencia)
    Baterías (Ah)            = energía diaria de diseño × días de autonomía / (voltaje × prof. descarga × eficiencia banco)
  Datos solares: PVGIS v5.2 (Comisión Europea, JRC), base PVGIS-ERA5 2005–2020, paneles al norte a 30°.
    hsp  = irradiación diaria sobre el panel por mes (kWh/m²/día = horas sol pico), de H(i)_m.
    prod = producción por kWp instalado por mes (kWh), modelo completo de PVGIS con 14 % de pérdidas
           (incluye temperatura): se usa para estimar generación y ahorro de forma conservadora.
  Consultado el 25/26-10-2026: https://re.jrc.ec.europa.eu/api/v5_2/PVcalc
*/
const ZONAS = {
  rm: {
    label: 'Región Metropolitana', coords: '-33,45; -70,66',
    hsp: [8.01, 7.96, 7.63, 6.44, 4.84, 4.03, 4.38, 5.15, 6.28, 6.95, 7.53, 7.88],
    prod: [184, 166, 177, 148, 117, 96, 108, 126, 146, 166, 171, 182],
  },
  villarrica: {
    label: 'Villarrica y alrededores', coords: '-39,28; -72,23',
    hsp: [7.11, 6.7, 5.68, 4.12, 2.84, 2.06, 2.47, 3.1, 4.59, 5.36, 6.08, 6.65],
    prod: [169, 145, 137, 99, 71, 50, 63, 78, 111, 132, 143, 160],
  },
} as const;
type ZonaKey = keyof typeof ZONAS;

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
const DIAS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const QUIMICAS = { litio: { label: 'Litio', eta: 0.95 }, plomo: { label: 'Plomo-ácido', eta: 0.8 } } as const;

type Carga = { id: number; nombre: string; w: number; cant: number; horas: number; uso: number; fp: number };
/* Equipos de ejemplo tomados de la planilla de InnVolt (caso sin red) */
const CARGAS_BASE: Carga[] = [
  { id: 1, nombre: 'Freidora de aire', w: 1500, cant: 1, horas: 1, uso: 1, fp: 0.7 },
  { id: 2, nombre: 'Refrigerador', w: 250, cant: 1, horas: 16, uso: 1, fp: 0.8 },
  { id: 3, nombre: 'Televisor', w: 100, cant: 1, horas: 4, uso: 1, fp: 1 },
  { id: 4, nombre: 'Hervidor eléctrico', w: 1500, cant: 1, horas: 0.5, uso: 1, fp: 1 },
  { id: 5, nombre: 'Lavadora', w: 800, cant: 1, horas: 1, uso: 1, fp: 0.8 },
  { id: 6, nombre: 'Computador portátil', w: 150, cant: 1, horas: 5, uso: 1, fp: 1 },
];

const nf = new Intl.NumberFormat('es-CL', { maximumFractionDigits: 0 });
const nf1 = new Intl.NumberFormat('es-CL', { maximumFractionDigits: 1 });
const nf2 = new Intl.NumberFormat('es-CL', { maximumFractionDigits: 2 });
const clp = (n: number) => `$${nf.format(Math.round(n / 100) * 100)}`;
const num = (v: string, min = 0) => Math.max(min, Number(v.replace(',', '.')) || 0);

export default function SolarSimulator() {
  /* ── Entradas ── */
  const [modo, setModo] = useState<'red' | 'aislado'>('red');
  const [zona, setZona] = useState<ZonaKey>('rm');
  const [porMes, setPorMes] = useState(false);
  const [consumo, setConsumo] = useState(450);                       // kWh/mes promedio
  const [meses, setMeses] = useState<number[]>(Array(12).fill(450)); // kWh por mes
  const [boleta, setBoleta] = useState<number | ''>('');
  const [extraDia, setExtraDia] = useState<number | ''>('');         // kWh/día adicionales (ej. auto eléctrico)
  const [criterio, setCriterio] = useState<'anual' | 'invierno'>('anual');
  const [diasRed, setDiasRed] = useState(0);                          // autonomía con red (0 = sin baterías)
  const [diasAislado, setDiasAislado] = useState(1);
  const [cargas, setCargas] = useState<Carga[]>(CARGAS_BASE);
  const [techo, setTecho] = useState<number | ''>('');
  /* Supuestos (valores por defecto de la planilla) */
  const [panelW, setPanelW] = useState(720);
  const [areaPanel, setAreaPanel] = useState(3.2);
  const [eta, setEta] = useState(0.9);
  const [holgura, setHolgura] = useState(10);
  const [hspManual, setHspManual] = useState<number | ''>('');
  const [quimica, setQuimica] = useState<keyof typeof QUIMICAS>('litio');
  const [voltaje, setVoltaje] = useState(48);
  const [dod, setDod] = useState(0.8);
  const [modulo, setModulo] = useState(5);

  const r = useMemo(() => {
    const z = ZONAS[zona];
    const hspAnual = z.hsp.reduce((a, h, i) => a + h * DIAS[i], 0) / 365;
    const hspMin = Math.min(...z.hsp);
    const disenoInvierno = modo === 'aislado' || criterio === 'invierno';
    const hspAuto = disenoInvierno ? hspMin : hspAnual;
    const hsp = hspManual !== '' && hspManual > 0 ? hspManual : hspAuto;

    /* Consumo */
    let mensual: number[];
    let potenciaKw = 0;
    let potenciaKva = 0;
    if (modo === 'red') {
      const base = porMes ? meses : DIAS.map(() => consumo);
      const extra = extraDia === '' ? 0 : extraDia;
      mensual = base.map((m, i) => m + extra * DIAS[i]);
    } else {
      const wh = cargas.reduce((a, c) => a + c.w * c.cant * c.horas * c.uso, 0);
      potenciaKw = cargas.reduce((a, c) => a + c.w * c.cant, 0) / 1000;
      potenciaKva = cargas.reduce((a, c) => a + (c.w * c.cant) / (c.fp > 0 ? c.fp : 1), 0) / 1000;
      mensual = DIAS.map(d => (wh / 1000) * d);
    }
    const consumoAnual = mensual.reduce((a, b) => a + b, 0);
    const diaria = consumoAnual / 365;
    const diariaDiseno = diaria * (1 + holgura / 100);

    /* Paneles (fórmula de la planilla) */
    const panelesExactos = (diariaDiseno * 1000) / (panelW * hsp * eta);
    // Como en la planilla (10,09 → 10): se redondea al entero más cercano si la holgura cubre la diferencia;
    // si no (p. ej. 1,4 → 1 dejaría el consumo sin cubrir), se redondea hacia arriba.
    const redondeado = Math.round(panelesExactos);
    let paneles = Math.max(1, redondeado >= panelesExactos / (1 + holgura / 100) ? redondeado : Math.ceil(panelesExactos));
    let limitadoPorTecho = false;
    if (techo !== '' && techo > 0) {
      const max = Math.floor(techo / areaPanel);
      if (max < paneles) { paneles = Math.max(max, 0); limitadoPorTecho = true; }
    }
    const kwp = (paneles * panelW) / 1000;
    const prodMensual = z.prod.map(p => p * kwp);
    const prodAnual = prodMensual.reduce((a, b) => a + b, 0);
    const cobertura = consumoAnual > 0 ? (prodAnual / consumoAnual) * 100 : 0;

    /* Inversor */
    const inversorKw = modo === 'aislado' ? potenciaKva * (1 + holgura / 100) : kwp;

    /* Baterías (fórmula de la planilla) */
    const dias = modo === 'red' ? diasRed : diasAislado;
    const etaBanco = QUIMICAS[quimica].eta;
    const bateriaAh = dias > 0 ? (diariaDiseno * 1000 * dias) / (voltaje * dod * etaBanco) : 0;
    const bateriaKwh = (voltaje * bateriaAh) / 1000;
    const modulos = bateriaKwh > 0 ? Math.ceil(bateriaKwh / modulo) : 0;

    /* Ahorro referencial (solo con red y si hay boleta) */
    const consumoBoleta = modo === 'red' ? (porMes ? meses.reduce((a, b) => a + b, 0) / 12 : consumo) : 0;
    const precioKwh = modo === 'red' && boleta !== '' && consumoBoleta > 0 ? boleta / consumoBoleta : null;
    const ahorroMensual = precioKwh ? (Math.min(prodAnual, consumoAnual) * precioKwh) / 12 : null;

    return {
      hsp, hspAuto, hspAnual, hspMin, disenoInvierno, mensual, consumoAnual, diaria, diariaDiseno,
      panelesExactos, paneles, limitadoPorTecho, kwp, superficie: paneles * areaPanel, prodMensual, prodAnual, cobertura,
      potenciaKw, potenciaKva, inversorKw, dias, etaBanco, bateriaAh, bateriaKwh, modulos, precioKwh, ahorroMensual,
    };
  }, [modo, zona, porMes, consumo, meses, boleta, extraDia, criterio, diasRed, diasAislado, cargas, techo,
      panelW, areaPanel, eta, holgura, hspManual, quimica, voltaje, dod, modulo]);

  const maxBar = Math.max(...r.prodMensual, ...r.mensual, 1);
  const setMes = (i: number, v: number) => setMeses(ms => ms.map((m, j) => (j === i ? v : m)));
  const setCarga = (id: number, campo: keyof Carga, v: string | number) =>
    setCargas(cs => cs.map(c => (c.id === id ? { ...c, [campo]: v } : c)));
  const nuevaCarga = () =>
    setCargas(cs => [...cs, { id: Math.max(0, ...cs.map(c => c.id)) + 1, nombre: 'Nuevo equipo', w: 100, cant: 1, horas: 1, uso: 1, fp: 1 }]);

  const waMsg =
    `Hola, usé el simulador solar de innvolt.cl. Sistema ${modo === 'red' ? 'conectado a la red' : 'aislado (sin red)'}, zona ${ZONAS[zona].label}. ` +
    `Consumo: ${nf1.format(r.diaria)} kWh/día. Resultado: ${nf1.format(r.kwp)} kWp (${r.paneles} paneles de ${panelW} W)` +
    (r.bateriaKwh > 0 ? `, baterías ${nf1.format(r.bateriaKwh)} kWh` : '') + '. Quiero una evaluación real.';

  return (
    <div className="iv-sim">
      {/* ══════════ ENTRADAS ══════════ */}
      <form className="iv-card iv-sim-form" onSubmit={e => e.preventDefault()}>
        <h2 className="iv-sim-h">1. Tu proyecto</h2>

        <fieldset className="iv-sim-field">
          <legend className="iv-label">Tipo de sistema</legend>
          <div className="iv-seg">
            <button type="button" className={modo === 'red' ? 'is-on' : ''} aria-pressed={modo === 'red'} onClick={() => setModo('red')}>Con red (net billing)</button>
            <button type="button" className={modo === 'aislado' ? 'is-on' : ''} aria-pressed={modo === 'aislado'} onClick={() => setModo('aislado')}>Sin red (aislado)</button>
          </div>
        </fieldset>

        <fieldset className="iv-sim-field">
          <legend className="iv-label">Zona</legend>
          <div className="iv-seg">
            {(Object.keys(ZONAS) as ZonaKey[]).map(k => (
              <button key={k} type="button" className={zona === k ? 'is-on' : ''} aria-pressed={zona === k} onClick={() => setZona(k)}>{ZONAS[k].label}</button>
            ))}
          </div>
        </fieldset>

        {modo === 'red' ? (
          <>
            <fieldset className="iv-sim-field">
              <legend className="iv-label">Consumo eléctrico (kWh, de tu boleta)</legend>
              <div className="iv-seg iv-seg-sm">
                <button type="button" className={!porMes ? 'is-on' : ''} aria-pressed={!porMes} onClick={() => setPorMes(false)}>Promedio mensual</button>
                <button type="button" className={porMes ? 'is-on' : ''} aria-pressed={porMes} onClick={() => { setMeses(Array(12).fill(consumo)); setPorMes(true); }}>Mes a mes</button>
              </div>
              {!porMes ? (
                <div className="iv-sim-range">
                  <input type="range" min={50} max={3000} step={10} value={consumo} onChange={e => setConsumo(Number(e.target.value))} aria-label="Consumo mensual promedio en kWh" />
                  <input className="iv-input iv-sim-num" type="number" min={1} value={consumo} onChange={e => setConsumo(num(e.target.value))} aria-label="Consumo mensual promedio en kWh" />
                </div>
              ) : (
                <div className="iv-months">
                  {MESES.map((m, i) => (
                    <label key={m} className="iv-month">
                      <span>{m}</span>
                      <input className="iv-input" type="number" min={0} value={meses[i]} onChange={e => setMes(i, num(e.target.value))} aria-label={`Consumo de ${m} en kWh`} />
                    </label>
                  ))}
                </div>
              )}
              <p className="iv-hint">Aparece en tu boleta como «consumo» o «energía». Con los 12 meses el cálculo es más preciso.</p>
            </fieldset>

            <div className="iv-row">
              <div className="iv-field">
                <label className="iv-label" htmlFor="sim-boleta">Total boleta ($) <span className="iv-opt">opcional</span></label>
                <input id="sim-boleta" className="iv-input" type="number" min={0} step={1000} placeholder="Ej: 85000" value={boleta}
                  onChange={e => setBoleta(e.target.value === '' ? '' : num(e.target.value))} />
              </div>
              <div className="iv-field">
                <label className="iv-label" htmlFor="sim-extra">Consumo extra (kWh/día) <span className="iv-opt">opcional</span></label>
                <input id="sim-extra" className="iv-input" type="number" min={0} step={0.1} placeholder="Ej: auto eléctrico" value={extraDia}
                  onChange={e => setExtraDia(e.target.value === '' ? '' : num(e.target.value))} />
              </div>
            </div>

            <fieldset className="iv-sim-field" style={{ marginTop: '1.3rem' }}>
              <legend className="iv-label">Criterio de diseño</legend>
              <div className="iv-seg iv-seg-sm">
                <button type="button" className={criterio === 'anual' ? 'is-on' : ''} aria-pressed={criterio === 'anual'} onClick={() => setCriterio('anual')}>Promedio anual</button>
                <button type="button" className={criterio === 'invierno' ? 'is-on' : ''} aria-pressed={criterio === 'invierno'} onClick={() => setCriterio('invierno')}>Peor mes (conservador)</button>
              </div>
              <p className="iv-hint">Con net billing lo habitual es el promedio anual: los excedentes de verano compensan el invierno.</p>
            </fieldset>

            <fieldset className="iv-sim-field">
              <legend className="iv-label">Respaldo con baterías</legend>
              <div className="iv-seg iv-seg-4">
                {[0, 0.5, 1, 2].map(d => (
                  <button key={d} type="button" className={diasRed === d ? 'is-on' : ''} aria-pressed={diasRed === d} onClick={() => setDiasRed(d)}>
                    {d === 0 ? 'Sin baterías' : d === 0.5 ? '½ día' : `${d} día${d > 1 ? 's' : ''}`}
                  </button>
                ))}
              </div>
            </fieldset>
          </>
        ) : (
          <>
            <fieldset className="iv-sim-field">
              <legend className="iv-label">Equipos que quieres alimentar</legend>
              <div className="iv-loads">
                <div className="iv-load iv-load-head" aria-hidden="true">
                  <span>Equipo</span><span>W</span><span>Cant.</span><span>h/día</span><span>Uso</span><span>FP</span><span />
                </div>
                {cargas.map(c => (
                  <div key={c.id} className="iv-load">
                    <input className="iv-input" value={c.nombre} onChange={e => setCarga(c.id, 'nombre', e.target.value)} aria-label="Equipo" />
                    <label className="iv-load-cell"><span className="iv-load-cap">W</span>
                      <input className="iv-input" type="number" min={0} value={c.w} onChange={e => setCarga(c.id, 'w', num(e.target.value))} aria-label={`Potencia de ${c.nombre} en W`} /></label>
                    <label className="iv-load-cell"><span className="iv-load-cap">Cant.</span>
                      <input className="iv-input" type="number" min={0} value={c.cant} onChange={e => setCarga(c.id, 'cant', num(e.target.value))} aria-label={`Cantidad de ${c.nombre}`} /></label>
                    <label className="iv-load-cell"><span className="iv-load-cap">h/día</span>
                      <input className="iv-input" type="number" min={0} max={24} step={0.5} value={c.horas} onChange={e => setCarga(c.id, 'horas', Math.min(24, num(e.target.value)))} aria-label={`Horas de uso diario de ${c.nombre}`} /></label>
                    <label className="iv-load-cell"><span className="iv-load-cap">Uso</span>
                      <input className="iv-input" type="number" min={0} max={1} step={0.1} value={c.uso} onChange={e => setCarga(c.id, 'uso', Math.min(1, num(e.target.value)))} aria-label={`Factor de uso de ${c.nombre}`} /></label>
                    <label className="iv-load-cell"><span className="iv-load-cap">FP</span>
                      <input className="iv-input" type="number" min={0.1} max={1} step={0.05} value={c.fp} onChange={e => setCarga(c.id, 'fp', Math.min(1, num(e.target.value, 0.1)))} aria-label={`Factor de potencia de ${c.nombre}`} /></label>
                    <button type="button" className="iv-load-del" onClick={() => setCargas(cs => cs.filter(x => x.id !== c.id))} aria-label={`Quitar ${c.nombre}`}><Trash2 size={15} /></button>
                  </div>
                ))}
              </div>
              <button type="button" className="iv-btn iv-btn-ghost iv-btn-sm" onClick={nuevaCarga} style={{ alignSelf: 'flex-start', marginTop: '0.4rem' }}><Plus size={14} /> Agregar equipo</button>
              <p className="iv-hint">Uso: fracción del tiempo que el equipo realmente consume (1 = todo el tiempo). FP: factor de potencia.</p>
            </fieldset>

            <fieldset className="iv-sim-field">
              <legend className="iv-label">Días de autonomía (baterías)</legend>
              <div className="iv-seg iv-seg-4">
                {[1, 2, 3].map(d => (
                  <button key={d} type="button" className={diasAislado === d ? 'is-on' : ''} aria-pressed={diasAislado === d} onClick={() => setDiasAislado(d)}>{d} día{d > 1 ? 's' : ''}</button>
                ))}
              </div>
            </fieldset>
          </>
        )}

        <div className="iv-sim-field">
          <label className="iv-label" htmlFor="sim-techo">Superficie de techo disponible (m²) <span className="iv-opt">opcional</span></label>
          <input id="sim-techo" className="iv-input" type="number" min={0} placeholder="Ej: 30" value={techo}
            onChange={e => setTecho(e.target.value === '' ? '' : num(e.target.value))} />
        </div>

        <details className="iv-sim-adv">
          <summary>Supuestos técnicos <ChevronDown size={16} /></summary>
          <div className="iv-row">
            <Num id="sim-panel" label="Potencia por panel (W)" value={panelW} step={5} onChange={v => setPanelW(Math.min(900, Math.max(100, v)))} />
            <Num id="sim-area" label="m² por panel (con separación)" value={areaPanel} step={0.1} onChange={v => setAreaPanel(Math.min(6, Math.max(1, v)))} />
          </div>
          <div className="iv-row" style={{ marginTop: '0.8rem' }}>
            <Num id="sim-eta" label="Factor de eficiencia" value={eta} step={0.01} onChange={v => setEta(Math.min(1, Math.max(0.5, v)))} />
            <Num id="sim-holgura" label="Factor de holgura (%)" value={holgura} step={1} onChange={v => setHolgura(Math.min(50, Math.max(0, v)))} />
          </div>
          <div className="iv-row" style={{ marginTop: '0.8rem' }}>
            <div className="iv-field">
              <label className="iv-label" htmlFor="sim-hsp">HSP de diseño</label>
              <input id="sim-hsp" className="iv-input" type="number" min={0.5} step={0.1} placeholder={`Auto: ${nf2.format(r.hspAuto)}`} value={hspManual}
                onChange={e => setHspManual(e.target.value === '' ? '' : num(e.target.value))} />
            </div>
            <div className="iv-field">
              <label className="iv-label" htmlFor="sim-quim">Tipo de batería</label>
              <select id="sim-quim" className="iv-input" value={quimica} onChange={e => setQuimica(e.target.value as keyof typeof QUIMICAS)}>
                {Object.entries(QUIMICAS).map(([k, q]) => <option key={k} value={k}>{q.label} (eficiencia {q.eta})</option>)}
              </select>
            </div>
          </div>
          <div className="iv-row iv-row-3" style={{ marginTop: '0.8rem' }}>
            <Num id="sim-volt" label="Voltaje banco (V)" value={voltaje} step={12} onChange={v => setVoltaje(Math.max(12, v))} />
            <Num id="sim-dod" label="Prof. de descarga" value={dod} step={0.05} onChange={v => setDod(Math.min(1, Math.max(0.3, v)))} />
            <Num id="sim-mod" label="Módulo batería (kWh)" value={modulo} step={0.5} onChange={v => setModulo(Math.max(0.5, v))} />
          </div>
          <p className="iv-hint">
            HSP automática según PVGIS para {ZONAS[zona].label} con paneles al norte a 30°: {nf2.format(r.hspAnual)} promedio anual y {nf2.format(r.hspMin)} en el peor mes.
            Deja el campo vacío para usar la automática o escribe la de tu proyecto (por ejemplo, la del Explorador Solar).
          </p>
        </details>
      </form>

      {/* ══════════ RESULTADOS ══════════ */}
      <section className="iv-card iv-sim-out" aria-live="polite">
        <h2 className="iv-sim-h">2. Resultado referencial</h2>

        <div className="iv-sim-kpis">
          <Kpi icon={<Sun size={18} />} label="Sistema sugerido" value={`${nf1.format(r.kwp)} kWp`} sub={`${r.paneles} paneles de ${panelW} W`} />
          <Kpi icon={<LayoutGrid size={18} />} label="Techo aproximado" value={`${nf.format(r.superficie)} m²`} sub={r.limitadoPorTecho ? 'Limitado por tu techo' : 'Superficie de paneles'} />
          <Kpi icon={<Zap size={18} />} label="Generación anual" value={`${nf.format(r.prodAnual)} kWh`} sub={`Tu consumo: ${nf.format(r.consumoAnual)} kWh/año`} />
          {modo === 'red'
            ? <Kpi icon={<Percent size={18} />} label="Cubre tu consumo" value={`${nf.format(r.cobertura)}%`} sub="Balance anual" />
            : <Kpi icon={<Zap size={18} />} label="Energía diaria" value={`${nf1.format(r.diaria)} kWh`} sub={`${nf1.format(r.diariaDiseno)} kWh con holgura`} />}
          <Kpi icon={<Cpu size={18} />} label="Inversor" value={`≥ ${nf1.format(r.inversorKw)} ${modo === 'aislado' ? 'kVA' : 'kW'}`}
            sub={modo === 'aislado' ? `Equipos: ${nf1.format(r.potenciaKw)} kW simultáneos` : 'Según la potencia de paneles'} />
          <Kpi icon={<BatteryCharging size={18} />} label="Baterías"
            value={r.bateriaKwh > 0 ? `${nf1.format(r.bateriaKwh)} kWh` : 'Sin baterías'}
            sub={r.bateriaKwh > 0 ? `${r.modulos} módulo${r.modulos > 1 ? 's' : ''} de ${nf1.format(modulo)} kWh · ${QUIMICAS[quimica].label}` : 'Respaldo opcional'} />
        </div>

        {modo === 'red' && (
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
        )}

        {/* Gráfico mensual: consumo vs producción */}
        <figure className="iv-sim-chart">
          <figcaption className="iv-label">Consumo y producción estimada por mes (kWh)</figcaption>
          <svg viewBox="0 0 360 170" role="img" aria-label="Consumo y producción solar estimada por mes">
            {MESES.map((m, i) => {
              const hc = (r.mensual[i] / maxBar) * 128;
              const hp = (r.prodMensual[i] / maxBar) * 128;
              const x = 6 + i * 29.5;
              return (
                <g key={m}>
                  <rect x={x} y={140 - hc} width={11} height={hc} rx={2} fill="#cfcabd" stroke="#1a1813" strokeWidth={1}>
                    <title>{`${m} · consumo: ${nf.format(r.mensual[i])} kWh`}</title>
                  </rect>
                  <rect x={x + 12} y={140 - hp} width={11} height={hp} rx={2} fill="#F6C21C" stroke="#1a1813" strokeWidth={1}>
                    <title>{`${m} · producción: ${nf.format(r.prodMensual[i])} kWh`}</title>
                  </rect>
                  <text x={x + 11.5} y={156} textAnchor="middle" fontSize="9" fill="#5f5b50">{m}</text>
                </g>
              );
            })}
            <line x1={2} x2={358} y1={140} y2={140} stroke="#1a1813" strokeWidth={1.2} />
          </svg>
          <p className="iv-sim-legend"><span className="iv-sim-sw iv-sim-sw-c" /> Consumo <span className="iv-sim-sw iv-sim-sw-y" /> Producción estimada</p>
        </figure>

        {/* Cálculo paso a paso (para validar contra la planilla) */}
        <details className="iv-sim-calc">
          <summary><Calculator size={16} /> Ver el cálculo paso a paso <ChevronDown size={16} /></summary>
          <ol>
            <li>Energía diaria: {nf.format(r.consumoAnual)} kWh/año ÷ 365 = <b>{nf2.format(r.diaria)} kWh/día</b></li>
            <li>Con holgura de {holgura}%: {nf2.format(r.diaria)} × {nf2.format(1 + holgura / 100)} = <b>{nf2.format(r.diariaDiseno)} kWh/día</b></li>
            <li>
              HSP de diseño: <b>{nf2.format(r.hsp)}</b>{' '}
              ({hspManual !== '' ? 'ingresada manualmente' : r.disenoInvierno ? 'peor mes, PVGIS' : 'promedio anual, PVGIS'})
            </li>
            <li>
              Paneles: {nf.format(r.diariaDiseno * 1000)} Wh ÷ ({panelW} W × {nf2.format(r.hsp)} × {nf2.format(eta)}) = {nf2.format(r.panelesExactos)} →{' '}
              <b>{r.paneles} paneles = {nf2.format(r.kwp)} kWp</b>{r.limitadoPorTecho ? ' (limitado por el techo)' : ''}
            </li>
            {r.bateriaKwh > 0 && (
              <li>
                Baterías: {nf.format(r.diariaDiseno * 1000)} Wh × {r.dias} día(s) ÷ ({voltaje} V × {nf2.format(dod)} × {nf2.format(r.etaBanco)}) ={' '}
                <b>{nf.format(r.bateriaAh)} Ah = {nf1.format(r.bateriaKwh)} kWh</b> → {r.modulos} módulo(s) de {nf1.format(modulo)} kWh
              </li>
            )}
            {modo === 'aislado' && (
              <li>Inversor: {nf1.format(r.potenciaKva)} kVA de equipos (W ÷ FP) × {nf2.format(1 + holgura / 100)} = <b>≥ {nf1.format(r.inversorKw)} kVA</b></li>
            )}
            <li>Generación estimada: modelo PVGIS ({nf.format(ZONAS[zona].prod.reduce((a, b) => a + b, 0))} kWh por kWp al año, con pérdidas de temperatura) × {nf2.format(r.kwp)} kWp = <b>{nf.format(r.prodAnual)} kWh/año</b></li>
          </ol>
        </details>

        <div className="iv-cta-row" style={{ marginTop: '1.4rem' }}>
          <a
            href={`https://wa.me/56966575447?text=${encodeURIComponent(waMsg)}`}
            target="_blank" rel="noopener noreferrer" className="iv-btn"
            onClick={() => window.gtag?.('event', 'simulator_cta', { modo, kwp: r.kwp, zona })}
          >
            Pedir evaluación con estos datos
          </a>
          <Link href="/paneles-solares-santiago" className="iv-btn iv-btn-ghost">Cómo trabajamos la energía solar</Link>
        </div>
      </section>

      <p className="iv-note iv-sim-disclaimer">
        <strong>Resultado referencial.</strong> El dimensionamiento sigue el método de cálculo de InnVolt con datos de radiación de PVGIS para tu zona.
        {modo === 'red'
          ? ' El ahorro supone que toda la energía generada reemplaza energía comprada a la red; con net billing, los excedentes se valorizan a un precio menor, por eso se muestra como «hasta».'
          : ' En sistemas aislados el diseño se hace para el mes con menos sol, y la autonomía depende de que el consumo real se parezca al declarado.'}
        {' '}La orientación, la inclinación y las sombras de tu techo cambian la producción real. El proyecto y la inversión definitivos se determinan en una evaluación técnica.
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

function Num({ id, label, value, step, onChange }: { id: string; label: string; value: number; step: number; onChange: (v: number) => void }) {
  return (
    <div className="iv-field">
      <label className="iv-label" htmlFor={id}>{label}</label>
      <input id={id} className="iv-input" type="number" step={step} value={value} onChange={e => onChange(Number(e.target.value.replace(',', '.')) || 0)} />
    </div>
  );
}
