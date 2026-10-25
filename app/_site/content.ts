import type { LucideIcon } from 'lucide-react';
import {
  Zap, Gauge, Wrench, FileCheck, Sun, Leaf, ClipboardCheck, Cpu, Camera, Network, MonitorPlay,
  ArrowUpFromLine, SunMedium, BatteryCharging, PlugZap, Siren, MapPin,
} from 'lucide-react';

/* ── Datos del negocio (fuente única) ── */
export const SITE = {
  name: 'InnVolt',
  legalName: 'InnVolt SpA',
  url: 'https://innvolt.cl',
  phone: '+56966575447',
  phoneLabel: '+56 9 6657 5447',
  email: 'innvolt.cl@gmail.com',
  instagram: 'https://instagram.com/inn.volt',
  instagramLabel: '@inn.volt',
  /* Google Business Profile (zona de servicio, sin dirección pública) */
  googleProfile: 'https://www.google.com/maps?cid=1778810802144558114',
  googleReview: 'https://g.page/r/CSI8dAAAm68YEBM/review',
};

/*
  Interruptor del simulador solar (/simulador-solar).
  false → la página existe pero está oculta: sin enlaces, fuera del sitemap y con noindex (revisión interna).
  true  → se publica: aparecen los botones en las páginas solares, entra al sitemap y Google puede indexarla.
*/
export const SIMULADOR_PUBLICO = false;

/* Cobertura: se comunica por región, sin listar comunas */
export const ZONA_CORTA = 'Región Metropolitana · Villarrica y alrededores';
export const ZONA_LARGA = 'Región Metropolitana y alrededores, y la zona de Villarrica y alrededores en la Región de La Araucanía.';

/* Punto de enfoque de cada foto vertical al recortarla en marcos horizontales */
const FOCUS: Record<string, string> = {
  '/fotos/instalacion-tda.jpg': 'center 35%',
  '/fotos/tablero-medicion.jpg': 'center 40%',
  '/fotos/termografia-tablero.jpg': 'center 45%',
  '/fotos/empalme-poste.jpg': 'center 35%',
  '/fotos/empalme-poste-abierto.jpg': 'center 28%',
  '/fotos/medicion-pinza.jpg': 'center 62%',
  '/domotica-1.jpg': 'center 60%',
  '/acceso-1.jpg': 'center 48%',
};
export const focus = (src?: string | null) => (src && FOCUS[src]) || 'center';

export type Faq = { q: string; a: string };
export type Step = { t: string; d: string };
export type ArtKind = 'solar' | 'bateria' | 'ev';

export type Service = {
  slug: string;
  line: 'energia' | 'tecnologia' | 'zona';
  featured?: boolean;
  name: string;
  title: string;
  metaTitle: string;
  metaDesc: string;
  intro: string;
  icon: LucideIcon;
  img: string | null;
  imgAlt: string;
  art?: ArtKind;
  problems: string[];
  works: string[];
  body?: { title: string; paras: string[] };
  process: Step[];
  note?: string;
  faqs: Faq[];
  related: string[];
  wa: string;
  cta?: string; // título de la banda de cierre, si el genérico no suena bien
};

const TECH_NOTE = 'Línea complementaria: el alcance y los equipos se definen según la evaluación de cada proyecto.';
const TECH_PROCESS: Step[] = [
  { t: 'Evaluación', d: 'Revisamos el lugar, lo que necesitas resolver y la instalación existente.' },
  { t: 'Propuesta', d: 'Definimos equipos, alcance y presupuesto con supuestos claros.' },
  { t: 'Instalación y configuración', d: 'Instalamos, configuramos y te dejamos el sistema funcionando.' },
];

export const SERVICES: Service[] = [
  /* ═══════════ ELECTRICIDAD Y ENERGÍA — principales ═══════════ */
  {
    slug: 'instalaciones-electricas',
    line: 'energia',
    featured: true,
    name: 'Instalaciones eléctricas',
    title: 'Instalaciones eléctricas',
    metaTitle: 'Instalaciones eléctricas para hogar y empresa',
    metaDesc: 'Instalaciones eléctricas nuevas, ampliaciones y modificaciones para hogares, comercios y empresas. Instaladores autorizados SEC en la RM y Villarrica.',
    intro: 'Ejecutamos instalaciones eléctricas nuevas, ampliaciones y modificaciones para viviendas, locales comerciales, oficinas y empresas. Somos instaladores autorizados por la SEC y dejamos tu instalación ordenada, segura y en regla.',
    icon: Zap,
    img: '/fotos/instalacion-tda.jpg',
    imgAlt: 'Instalación eléctrica nueva con tablero y canalizaciones rotuladas',
    problems: [
      'Necesitas más enchufes, circuitos o iluminación y la instalación actual no da abasto.',
      'Vas a remodelar, ampliar o habilitar un local y requieres una instalación nueva.',
      'Tu instalación es antigua, tiene uniones improvisadas o se calienta.',
      'Necesitas dejar la instalación en regla para vender, arrendar o regularizar.',
    ],
    works: [
      'Instalaciones domiciliarias, comerciales e industriales',
      'Ampliaciones y modificaciones de circuitos',
      'Canalizaciones, alumbrado y fuerza',
      'Circuitos dedicados para equipos de mayor consumo',
      'Aumento de capacidad y cambio de empalme, según corresponda',
      'Declaración TE1 ante la SEC cuando corresponde',
    ],
    body: {
      title: 'Una instalación bien hecha no se nota',
      paras: [
        'Una instalación eléctrica bien ejecutada es la base de un hogar o negocio seguro. Partimos dimensionando la carga, definiendo los circuitos y las protecciones (automáticos y diferenciales), y dejamos todo ordenado y rotulado. Trabajamos en viviendas, departamentos, locales comerciales y oficinas.',
        'Realizamos instalaciones nuevas, ampliaciones (más enchufes, iluminación, cocina eléctrica) y la regularización de instalaciones antiguas que ya no cumplen la normativa. Como instaladores autorizados, realizamos la declaración TE1 ante la SEC cuando el trabajo lo requiere, dejando tu instalación declarada y en regla.',
        'Entregamos un presupuesto claro, con boleta o factura, y coordinamos los cortes de energía para minimizar el impacto en tu casa o en tu operación.',
      ],
    },
    process: [
      { t: 'Levantamiento', d: 'Revisamos la instalación existente y lo que necesitas conectar.' },
      { t: 'Propuesta', d: 'Te enviamos el alcance, los materiales y los plazos acordados.' },
      { t: 'Ejecución y entrega', d: 'Ejecutamos, probamos los circuitos y te entregamos la instalación funcionando.' },
    ],
    faqs: [
      { q: '¿Hacen instalaciones en casas y también en locales comerciales?', a: 'Sí. Trabajamos en viviendas, locales, oficinas, comunidades y empresas. El alcance y los materiales se definen según el tipo de inmueble y su uso.' },
      { q: '¿La instalación queda certificada?', a: 'Somos instaladores autorizados por la SEC. Cuando el trabajo lo requiere, realizamos la declaración de la instalación (TE1) ante la SEC.' },
      { q: '¿Necesito una visita técnica para cotizar?', a: 'Depende del trabajo. Algunos casos se pueden evaluar con fotos por WhatsApp; otros requieren una visita para dimensionar bien la instalación.' },
    ],
    related: ['tableros-electricos', 'certificacion-te1', 'aumento-de-capacidad-empalme'],
    wa: 'Hola, quisiera cotizar una instalación eléctrica.',
  },
  {
    slug: 'tableros-electricos',
    line: 'energia',
    featured: true,
    name: 'Tableros eléctricos',
    title: 'Tableros eléctricos',
    metaTitle: 'Tableros eléctricos: instalación y normalización',
    metaDesc: 'Instalación, normalización y renovación de tableros eléctricos con protecciones bien dimensionadas para hogares, comercios y empresas.',
    intro: 'El tablero es el corazón de la instalación: si está mal dimensionado, envejecido o sin las protecciones adecuadas, aparecen cortes, sobrecalentamientos y riesgos. Instalamos, normalizamos y renovamos tableros eléctricos con protecciones acordes a tu consumo.',
    icon: Gauge,
    img: '/fotos/tablero-medicion.jpg',
    imgAlt: 'Revisión de un tablero general con pinza amperimétrica',
    problems: [
      'El automático salta seguido o se corta la luz sin razón aparente.',
      'El tablero se calienta, tiene olor a quemado o cables a la vista.',
      'Faltan protecciones diferenciales o están mal dimensionadas.',
      'Agregaste equipos y el tablero ya no da abasto.',
    ],
    works: [
      'Instalación de tableros nuevos',
      'Normalización de tableros existentes',
      'Renovación de protecciones (automáticos y diferenciales)',
      'Ordenamiento, rotulado y separación de circuitos',
      'Tableros para locales comerciales y empresas',
      'Diagnóstico de tableros con fallas',
    ],
    body: {
      title: 'Por qué el tablero importa',
      paras: [
        'El tablero eléctrico distribuye la energía y protege a las personas y a los equipos ante sobrecargas, cortocircuitos y fugas. Un tablero mal dimensionado, sin diferencial o con protecciones vencidas es una de las causas más frecuentes de fallas e incendios de origen eléctrico.',
        'Revisamos el estado de tu tablero, medimos la carga real y dimensionamos las protecciones según la normativa vigente. Instalamos tableros nuevos, normalizamos los existentes, separamos circuitos, agregamos diferenciales y dejamos todo rotulado y ordenado. Cuando el trabajo lo requiere, realizamos la declaración ante la SEC.',
        'Trabajamos en viviendas, edificios, oficinas, locales comerciales e instalaciones industriales, coordinando los cortes de energía para minimizar el impacto en tu operación.',
      ],
    },
    process: [
      { t: 'Diagnóstico', d: 'Revisamos el tablero, las protecciones y la carga de cada circuito.' },
      { t: 'Propuesta', d: 'Definimos qué se normaliza o reemplaza, con un presupuesto claro.' },
      { t: 'Ejecución', d: 'Dejamos el tablero ordenado, rotulado y con las protecciones correctas.' },
    ],
    faqs: [
      { q: '¿Cuándo conviene revisar el tablero?', a: 'Si notas cortes frecuentes, calor u olor a quemado, si agregaste equipos de alto consumo o si la instalación es antigua. En empresas, lo ideal es incluirlo en una mantención periódica.' },
      { q: '¿Qué significa normalizar un tablero?', a: 'Dejarlo conforme a la normativa vigente: protecciones bien dimensionadas, diferenciales donde corresponde, circuitos separados y rotulados, y conexiones seguras.' },
      { q: '¿Pueden cambiar solo las protecciones?', a: 'Sí, si el tablero está en buen estado. Si no lo está, te recomendaremos renovarlo y te explicaremos por qué.' },
    ],
    related: ['mantencion-electrica', 'aumento-de-capacidad-empalme', 'certificacion-te1'],
    wa: 'Hola, necesito revisar o normalizar un tablero eléctrico.',
  },
  {
    slug: 'mantencion-electrica',
    line: 'energia',
    featured: true,
    name: 'Mantención eléctrica',
    title: 'Mantención y reparación eléctrica',
    metaTitle: 'Mantención eléctrica preventiva y correctiva',
    metaDesc: 'Mantención eléctrica preventiva y correctiva para empresas, edificios y hogares: revisión de tableros, medición de temperatura, diagnóstico y reparación de fallas.',
    intro: 'Una instalación sin mantención termina fallando en el peor momento. Hacemos mantención preventiva para anticipar problemas y mantención correctiva para diagnosticar y reparar fallas eléctricas de forma segura.',
    icon: Wrench,
    img: '/fotos/termografia-tablero.jpg',
    imgAlt: 'Medición de temperatura en un tablero durante una mantención preventiva',
    problems: [
      'Cortes, chispazos o enchufes que dejaron de funcionar.',
      'Conexiones sueltas, calentamiento o marcas de quemado.',
      'Un local o empresa que no puede detener su operación por una falla.',
      'Instalaciones que nunca han tenido una revisión.',
    ],
    works: [
      'Diagnóstico y reparación de fallas eléctricas',
      'Mantención preventiva de tableros e instalaciones',
      'Medición de cargas y de temperatura en tableros',
      'Revisión de conexiones, protecciones y puesta a tierra',
      'Reemplazo de componentes dañados',
      'Planes de mantención para comercios y empresas',
    ],
    body: {
      title: 'Prevenir sale más barato que reparar',
      paras: [
        'La mayoría de las fallas eléctricas se pueden evitar. Una instalación sin mantención acumula conexiones flojas, protecciones desgastadas y puntos calientes que terminan en cortes, daño de equipos o incendios. La mantención preventiva detecta esos problemas antes de que ocurran.',
        'Revisamos tableros, medimos cargas, ajustamos conexiones y medimos la temperatura de los componentes para detectar recalentamientos. Al terminar, te entregamos el estado de tu instalación y las recomendaciones priorizadas. También atendemos mantención correctiva cuando ya hay una falla.',
        'Para empresas, edificios y comunidades definimos planes de mantención periódica con visitas programadas, para que tu operación no se detenga.',
      ],
    },
    process: [
      { t: 'Diagnóstico', d: 'Identificamos el origen de la falla o los puntos de riesgo antes de intervenir.' },
      { t: 'Reparación', d: 'Reparamos o reemplazamos lo necesario, de forma segura.' },
      { t: 'Recomendaciones', d: 'Te indicamos qué conviene mejorar para evitar nuevas fallas.' },
    ],
    faqs: [
      { q: '¿Atienden fallas eléctricas?', a: 'Sí. Escríbenos por WhatsApp contándonos qué pasa y, si puedes, envía fotos del tablero o de la falla para coordinar la atención.' },
      { q: '¿Ofrecen mantención periódica para empresas?', a: 'Sí. Definimos un plan de mantención según el tipo de instalación y la operación de tu negocio.' },
      { q: '¿Qué hago si el tablero huele a quemado?', a: 'Si es seguro hacerlo, corta la energía desde el automático general, no toques conexiones dañadas y contáctanos para revisarlo.' },
    ],
    related: ['tableros-electricos', 'urgencias-electricas-santiago', 'eficiencia-energetica'],
    wa: 'Hola, necesito una mantención o revisión eléctrica.',
  },
  {
    slug: 'certificacion-te1',
    line: 'energia',
    featured: true,
    name: 'Certificación SEC (TE1)',
    title: 'Certificación SEC y declaración TE1',
    metaTitle: 'Certificación eléctrica SEC y declaración TE1',
    metaDesc: 'Instaladores autorizados SEC: revisión, regularización y declaración TE1 de tu instalación eléctrica. Para arriendo, venta, empalmes y locales.',
    intro: 'La declaración TE1 es el trámite con el que una instalación eléctrica interior queda declarada ante la Superintendencia de Electricidad y Combustibles (SEC). Como instaladores autorizados, revisamos tu instalación, corregimos lo necesario y realizamos la declaración.',
    icon: FileCheck,
    img: '/fotos/te1-planos.jpg',
    imgAlt: 'Certificado TE1 y diagrama unilineal de una instalación eléctrica',
    problems: [
      'Necesitas el certificado para vender, arrendar o recibir una propiedad.',
      'Tu instalación nunca fue declarada o tuvo modificaciones.',
      'La distribuidora te pide la declaración para un empalme nuevo.',
      'Vas a abrir un local y necesitas la instalación en regla.',
    ],
    works: [
      'Revisión de la instalación existente',
      'Correcciones para cumplir la normativa',
      'Planos y documentación de la instalación',
      'Declaración TE1 ante la SEC',
      'Regularización de instalaciones modificadas',
    ],
    body: {
      title: 'Qué es la certificación TE1',
      paras: [
        'El TE1 es la declaración de una instalación eléctrica interior que un instalador autorizado presenta ante la SEC. Con ella, el profesional declara, bajo su responsabilidad, que la instalación cumple la normativa eléctrica vigente en Chile: el Reglamento de Instalaciones de Consumo de Energía Eléctrica (RIC) y sus pliegos técnicos.',
        'Se requiere, entre otros casos, para solicitar un empalme nuevo a la distribuidora y para regularizar una instalación existente, y suele exigirse en arriendos, ventas y recepciones de obra.',
        'Revisamos tu instalación, realizamos las correcciones necesarias y tramitamos el TE1. Si la instalación es nueva, la ejecutamos y la declaramos; si es antigua, la normalizamos antes de declararla.',
      ],
    },
    process: [
      { t: 'Revisión', d: 'Inspeccionamos la instalación y te indicamos qué cumple y qué no.' },
      { t: 'Correcciones', d: 'Si hace falta, corregimos antes de declarar.' },
      { t: 'Declaración', d: 'Preparamos la documentación y realizamos la declaración TE1.' },
    ],
    faqs: [
      { q: '¿Qué es el TE1?', a: 'Es la declaración de una instalación eléctrica interior ante la SEC, realizada por un instalador autorizado.' },
      { q: '¿Mi instalación puede declararse tal como está?', a: 'Depende de su estado. Primero la revisamos; si hay puntos que no cumplen la normativa, te proponemos las correcciones necesarias.' },
      { q: '¿Atienden casas y locales comerciales?', a: 'Sí: viviendas, locales, oficinas y empresas.' },
    ],
    related: ['instalaciones-electricas', 'tableros-electricos', 'proyectos-electricos'],
    wa: 'Hola, necesito la certificación TE1 de mi instalación.',
  },
  {
    slug: 'paneles-solares-santiago',
    line: 'energia',
    featured: true,
    name: 'Energía solar',
    title: 'Paneles solares y energía fotovoltaica',
    metaTitle: 'Paneles solares: instalación fotovoltaica',
    metaDesc: 'Evaluación e instalación de paneles solares para hogares y empresas: inversores, baterías y monitoreo según tu consumo. Instaladores autorizados SEC.',
    intro: 'Un sistema solar bien dimensionado te permite generar parte de la energía que consumes. Pero cada inmueble es distinto: por eso partimos evaluando tu consumo, tu techo y tu instalación eléctrica antes de proponer cualquier equipo.',
    icon: Sun,
    img: null,
    imgAlt: '',
    art: 'solar',
    problems: [
      'Tu cuenta de luz es alta y quieres generar parte de tu energía.',
      'Quieres saber si tu techo y tu instalación sirven para paneles.',
      'Te interesa tener respaldo ante cortes con baterías.',
      'Recibiste cotizaciones y no sabes cuál conviene.',
    ],
    works: [
      'Evaluación de consumo y del inmueble',
      'Dimensionamiento del sistema fotovoltaico',
      'Instalación de paneles e inversores',
      'Integración de baterías y respaldo, cuando corresponde',
      'Monitoreo de la generación',
      'Net billing y declaración TE4 ante la SEC, según corresponda',
    ],
    body: {
      title: 'Cómo funciona',
      paras: [
        'Un sistema fotovoltaico genera electricidad a partir del sol y la entrega a tu instalación, reduciendo lo que compras a la red. Con net billing, los excedentes que no usas se inyectan a la red y se descuentan de tu cuenta.',
        'Partimos por tu consumo real (tus boletas) para dimensionar el sistema que necesitas, ni de más ni de menos. Instalamos paneles, inversor y protecciones, y la instalación de generación se declara ante la SEC (formulario TE4) bajo la Ley 21.118, requisito para inyectar a la red.',
        'La ventaja de hacerlo con instaladores eléctricos autorizados: la parte eléctrica (tablero, protecciones y conexión) queda bien hecha y en regla, no como un añadido suelto. Y el sistema es ampliable: más adelante puedes sumar baterías o un cargador de auto eléctrico.',
      ],
    },
    process: [
      { t: 'Evaluación', d: 'Analizamos tus boletas, el techo (orientación y sombras) y la instalación existente.' },
      { t: 'Propuesta', d: 'Te presentamos el sistema recomendado, sus componentes y su costo, con supuestos claros.' },
      { t: 'Instalación', d: 'Instalamos, conectamos y dejamos el monitoreo funcionando.' },
    ],
    note: 'No prometemos porcentajes de ahorro ni plazos de retorno sin un cálculo con tus datos reales. La viabilidad técnica y económica depende de cada inmueble.',
    faqs: [
      { q: '¿Cuánto voy a ahorrar con paneles solares?', a: 'Depende de tu consumo, tu tarifa, la orientación del techo y el tamaño del sistema. Lo estimamos en la propuesta con tus datos reales, no con cifras genéricas.' },
      { q: '¿Qué es el net billing?', a: 'Es el sistema que permite inyectar a la red los excedentes de energía que generas y recibir un descuento por ellos (Ley 21.118). La instalación debe declararse ante la SEC.' },
      { q: '¿Necesito baterías?', a: 'No siempre. Un sistema conectado a la red ya reduce tu compra de energía. Las baterías sirven para respaldo ante cortes o para usar energía de noche; evaluamos si se justifican en tu caso.' },
      { q: '¿Sirve para empresas y condominios?', a: 'Sí. Dimensionamos sistemas para casas, condominios, comercios y empresas, integrados con su instalación eléctrica.' },
    ],
    related: ['paneles-solares-netbilling', 'baterias-almacenamiento-energia', 'eficiencia-energetica'],
    wa: 'Hola, quisiera evaluar un proyecto de energía solar para mi vivienda o empresa.',
  },
  {
    slug: 'eficiencia-energetica',
    line: 'energia',
    featured: true,
    name: 'Eficiencia energética',
    title: 'Eficiencia y gestión de energía',
    metaTitle: 'Eficiencia energética y gestión de energía',
    metaDesc: 'Medición de consumo, iluminación eficiente y gestión de energía para hogares, comercios y empresas. Detectamos dónde se pierde energía y cómo reducirla.',
    intro: 'Antes de generar energía, conviene dejar de perderla. Medimos tu consumo, identificamos los equipos y hábitos que más pesan y te proponemos mejoras concretas: desde iluminación eficiente hasta monitoreo y gestión de cargas.',
    icon: Leaf,
    img: '/fotos/medicion-pinza.jpg',
    imgAlt: 'Medición de consumo eléctrico con pinza amperimétrica',
    problems: [
      'No sabes en qué se va tu consumo eléctrico.',
      'Tu local o empresa tiene equipos encendidos innecesariamente.',
      'La iluminación es antigua y consume más de lo necesario.',
      'Quieres preparar tu instalación antes de un proyecto solar.',
    ],
    works: [
      'Medición y análisis de consumo',
      'Recambio a iluminación eficiente',
      'Monitoreo de energía',
      'Gestión y control de cargas (horarios, sensores, apagado automático)',
      'Recomendaciones de mejora priorizadas',
    ],
    body: {
      title: 'La energía más barata es la que no se gasta',
      paras: [
        'Antes de pensar en generar más, conviene reducir y ordenar el consumo: cambiar la iluminación por LED, controlar luces y equipos para que no queden encendidos de más, y medir para saber exactamente dónde se va la energía.',
        'Instalamos sistemas de monitoreo de consumo, iluminación eficiente y control de cargas en hogares, comercios, oficinas e industria liviana. Con los datos de consumo detectamos los puntos que más gastan y proponemos mejoras concretas.',
        'La eficiencia se potencia con la energía solar: primero bajamos tu consumo y luego dimensionamos los paneles sobre ese consumo optimizado, para que la inversión rinda más.',
      ],
    },
    process: [
      { t: 'Medición', d: 'Registramos el consumo y revisamos los principales equipos.' },
      { t: 'Diagnóstico', d: 'Identificamos dónde se pierde energía y qué conviene mejorar primero.' },
      { t: 'Implementación', d: 'Ejecutamos las mejoras acordadas y dejamos el monitoreo funcionando.' },
    ],
    faqs: [
      { q: '¿Sirve la eficiencia energética si ya tengo paneles?', a: 'Sí. Reducir el consumo hace que tu sistema solar cubra una mayor parte de tu demanda.' },
      { q: '¿Pueden monitorear el consumo de mi negocio?', a: 'Sí. Instalamos medición y monitoreo para que veas cómo y cuándo consumes energía.' },
      { q: '¿Qué conviene hacer primero?', a: 'Normalmente, medir. Con datos reales se priorizan las mejoras que más impacto tienen.' },
    ],
    related: ['paneles-solares-santiago', 'mantencion-electrica', 'domotica-santiago'],
    wa: 'Hola, quisiera mejorar la eficiencia energética de mi vivienda o empresa.',
  },
  {
    slug: 'proyectos-electricos',
    line: 'energia',
    featured: true,
    name: 'Proyectos eléctricos',
    title: 'Evaluación y proyectos eléctricos',
    metaTitle: 'Proyectos eléctricos y levantamientos técnicos',
    metaDesc: 'Levantamientos técnicos, evaluación de instalaciones y proyectos eléctricos para locales, oficinas, comunidades y empresas: diseño, ejecución y declaración SEC.',
    intro: 'Hay trabajos que no se pueden cotizar a ojo. Para locales, oficinas, comunidades y empresas hacemos levantamientos técnicos y desarrollamos el proyecto eléctrico antes de ejecutar, para que el alcance y el presupuesto queden claros desde el inicio.',
    icon: ClipboardCheck,
    img: '/fotos/empalme-poste.jpg',
    imgAlt: 'Empalme y caja de protección instalados en poste',
    problems: [
      'Vas a habilitar o remodelar un local, oficina o bodega.',
      'Tu comunidad o empresa necesita evaluar el estado de su instalación.',
      'Necesitas aumentar la capacidad eléctrica por equipos nuevos.',
      'Requieres un proyecto para tramitar ante la SEC o la distribuidora.',
    ],
    works: [
      'Levantamiento técnico de instalaciones',
      'Evaluación del estado y la capacidad de la instalación',
      'Diseño, planos y dimensionamiento',
      'Aumento de capacidad y cambio de empalme, según corresponda',
      'Ejecución y declaración SEC, según el alcance',
    ],
    body: {
      title: 'Un solo responsable, del diseño a la entrega',
      paras: [
        'Un proyecto eléctrico bien hecho parte del diseño: definir cargas, circuitos, tableros y protecciones según el uso real del espacio y la normativa vigente. Elaboramos los planos y el dimensionamiento, y coordinamos la ejecución para que la obra avance sin improvisaciones.',
        'Ejecutamos instalaciones para oficinas, locales, bodegas e industria liviana: canalizaciones, tableros de distribución, iluminación, fuerza y respaldo. Al terminar, realizamos la declaración SEC que deja la instalación en regla.',
        'Al ser los mismos que diseñan, ejecutan y declaran, tienes un solo responsable del resultado, sin coordinar varios proveedores.',
      ],
    },
    process: [
      { t: 'Levantamiento', d: 'Visitamos el lugar y registramos la instalación existente y las necesidades.' },
      { t: 'Proyecto', d: 'Definimos la solución, los materiales y las etapas.' },
      { t: 'Ejecución', d: 'Coordinamos la obra y la entrega según el alcance acordado.' },
    ],
    faqs: [
      { q: '¿Trabajan con empresas y comunidades?', a: 'Sí. Además de viviendas, atendemos locales, oficinas, comunidades y empresas.' },
      { q: '¿Pueden ejecutar el proyecto además de diseñarlo?', a: 'Sí. Desarrollamos el proyecto y lo ejecutamos, coordinando las etapas según el alcance acordado.' },
      { q: '¿Qué necesito para empezar?', a: 'Contarnos qué quieres hacer y, si tienes, planos o fotos de la instalación actual. Con eso coordinamos el levantamiento.' },
    ],
    related: ['instalaciones-electricas', 'certificacion-te1', 'aumento-de-capacidad-empalme'],
    wa: 'Hola, quisiera evaluar un proyecto eléctrico para mi local o empresa.',
  },

  /* ═══════════ ELECTRICIDAD Y ENERGÍA — complementarios ═══════════ */
  {
    slug: 'aumento-de-capacidad-empalme',
    line: 'energia',
    name: 'Aumento de capacidad',
    title: 'Aumento de capacidad y cambio de empalme',
    metaTitle: 'Aumento de capacidad y cambio de empalme',
    metaDesc: 'Aumento de capacidad y cambio de empalme: más potencia para cocina eléctrica, cargador de auto o nuevos equipos, con gestión ante la distribuidora.',
    intro: '¿Tu instalación se quedó corta de potencia? Aumentamos la capacidad eléctrica y cambiamos tu empalme para que puedas sumar cocina eléctrica, cargador de auto, climatización o más equipos sin que salten los automáticos.',
    icon: ArrowUpFromLine,
    img: '/fotos/empalme-poste-abierto.jpg',
    imgAlt: 'Caja de empalme abierta con protección y puesta a tierra',
    problems: [
      'Los automáticos saltan cuando usas varios equipos a la vez.',
      'Vas a instalar cocina o calefón eléctrico, aire acondicionado o un cargador de auto.',
      'Tu empalme es antiguo o está en mal estado.',
      'Tu negocio creció y la instalación ya no da abasto.',
    ],
    works: [
      'Evaluación del consumo y del empalme',
      'Aumento de la potencia disponible',
      'Cambio y normalización de empalme',
      'Nuevos circuitos y adecuación del tablero',
      'Coordinación con la distribuidora',
      'Declaración SEC cuando corresponde',
    ],
    body: {
      title: 'Cuándo lo necesitas',
      paras: [
        'Si los automáticos saltan cuando enchufas varios equipos, o si vas a instalar una cocina o calefón eléctrico, aire acondicionado o un cargador de auto, probablemente tu instalación necesita más capacidad. Aumentarla significa subir la potencia disponible y adecuar el empalme, el tablero y los circuitos para soportarla con seguridad.',
        'Evaluamos tu consumo real y el estado del empalme y del tablero, dimensionamos la nueva capacidad y realizamos los cambios. Coordinamos con la distribuidora lo que corresponda y, cuando el trabajo lo requiere, realizamos la declaración ante la SEC.',
      ],
    },
    process: [
      { t: 'Diagnóstico', d: 'Medimos tu consumo y revisamos el empalme y el tablero.' },
      { t: 'Propuesta', d: 'Definimos la capacidad necesaria y los cambios, con un presupuesto claro.' },
      { t: 'Ejecución y gestión', d: 'Realizamos los cambios y coordinamos con la distribuidora lo que corresponda.' },
    ],
    faqs: [
      { q: '¿Cómo sé si necesito aumentar la capacidad?', a: 'Señales típicas: los automáticos saltan al usar varios equipos, o quieres instalar cocina o calefón eléctrico, aire acondicionado o un cargador de auto. Lo evaluamos y te decimos la capacidad adecuada.' },
      { q: '¿Ustedes gestionan con la empresa eléctrica?', a: 'Sí. Coordinamos con la distribuidora lo que corresponda al cambio de empalme y de potencia.' },
      { q: '¿Sirve para instalar un cargador de auto eléctrico?', a: 'Sí. Muchas veces un cargador requiere más capacidad y un circuito dedicado; dejamos todo dimensionado para eso.' },
    ],
    related: ['cargador-auto-electrico', 'tableros-electricos', 'instalaciones-electricas'],
    wa: 'Hola, necesito aumentar la capacidad eléctrica o cambiar mi empalme.',
  },
  {
    slug: 'paneles-solares-netbilling',
    line: 'energia',
    name: 'Net billing',
    title: 'Net billing: inyecta tu energía a la red',
    metaTitle: 'Net billing: inyección a la red y declaración TE4',
    metaDesc: 'Net billing: inyecta a la red la energía solar que no usas y descuéntala de tu cuenta. Instalación y declaración TE4 ante la SEC (Ley 21.118).',
    intro: 'El net billing te permite inyectar a la red la energía solar que no consumes y recibir un descuento en tu cuenta de luz. Para acogerte, la instalación debe estar bien conectada y declarada ante la SEC.',
    icon: SunMedium,
    img: null,
    imgAlt: '',
    art: 'solar',
    problems: [
      'Tienes o quieres paneles solares y aprovechar los excedentes.',
      'Instalaste paneles y nunca se declararon ante la SEC.',
      'No sabes qué requisitos pide la distribuidora para inyectar.',
    ],
    works: [
      'Diseño y conexión del sistema fotovoltaico',
      'Protecciones y medidor bidireccional',
      'Declaración de la instalación de generación ante la SEC (TE4)',
      'Gestión para habilitar la inyección a la red',
      'Para casas, comercios y empresas',
    ],
    body: {
      title: 'Qué es y cómo se tramita',
      paras: [
        'El net billing es el mecanismo legal en Chile que permite a quien genera su propia energía, por ejemplo con paneles solares, inyectar los excedentes a la red y recibir un descuento en su cuenta. Está regulado por la Ley 21.118, que modificó la Ley 20.571 de generación distribuida.',
        'Para acogerte, la instalación de generación debe declararse ante la SEC mediante el formulario TE4 y contar con las protecciones y el medidor bidireccional correspondientes. Una instalación solar sin esta declaración no puede inyectar a la red de forma legal.',
        'Dejamos el sistema bien conectado y gestionamos la declaración para que tu net billing quede operativo y en regla. Si aún no tienes paneles, también los instalamos.',
      ],
    },
    process: [
      { t: 'Revisión', d: 'Evaluamos tu sistema solar (o el proyecto) y la instalación existente.' },
      { t: 'Adecuación', d: 'Instalamos o ajustamos protecciones, conexión y medición.' },
      { t: 'Declaración', d: 'Preparamos la documentación y la declaración TE4 ante la SEC.' },
    ],
    faqs: [
      { q: '¿Qué pasa si instalo paneles sin declararlos?', a: 'No podrías inyectar a la red legalmente ni recibir el descuento del net billing, y la instalación quedaría fuera de norma.' },
      { q: '¿Qué ley regula el net billing?', a: 'La Ley 21.118, que modificó la Ley 20.571 de generación distribuida.' },
      { q: '¿Cuánto me descuentan por lo que inyecto?', a: 'El valor de la energía inyectada lo define la normativa y tu distribuidora; te explicamos cómo funciona en tu caso al cotizar.' },
    ],
    related: ['paneles-solares-santiago', 'baterias-almacenamiento-energia', 'certificacion-te1'],
    wa: 'Hola, quisiera inyectar a la red (net billing) y declarar mi instalación solar.',
  },
  {
    slug: 'baterias-almacenamiento-energia',
    line: 'energia',
    name: 'Baterías y respaldo',
    title: 'Baterías y respaldo de energía',
    metaTitle: 'Baterías y respaldo de energía solar',
    metaDesc: 'Baterías de almacenamiento y sistemas solares híbridos: respaldo ante cortes de luz y uso de tu energía solar de noche, dimensionados según lo que necesitas respaldar.',
    intro: 'Agrega baterías a tu sistema solar para tener respaldo ante cortes de luz y usar tu propia energía de noche. Instalamos sistemas híbridos (solar + batería) dimensionados según lo que realmente quieres respaldar.',
    icon: BatteryCharging,
    img: null,
    imgAlt: '',
    art: 'bateria',
    problems: [
      'Los cortes de luz afectan tu casa o tu negocio.',
      'Generas energía de día y quieres usarla de noche.',
      'Tienes equipos críticos que no pueden apagarse.',
    ],
    works: [
      'Sistemas híbridos (solar + batería)',
      'Respaldo automático de circuitos definidos',
      'Dimensionamiento según lo que quieres respaldar',
      'Integración con tu instalación e inversor',
      'Ampliación de sistemas solares existentes',
    ],
    body: {
      title: 'Para qué sirven',
      paras: [
        'Un sistema solar conectado a la red se apaga por seguridad cuando hay un corte de luz. Al sumar baterías con el equipo adecuado, almacenas la energía que no usas para aprovecharla de noche y mantienes funcionando los circuitos que definas cuando se corta la electricidad.',
        'Dimensionamos la batería según lo que quieres respaldar (iluminación, refrigerador, equipos críticos) y la integramos con tu instalación y tu inversor. Podemos instalar un sistema híbrido completo o agregar baterías a un sistema solar que ya tengas.',
      ],
    },
    process: [
      { t: 'Definición', d: 'Identificamos qué circuitos y equipos quieres respaldar.' },
      { t: 'Dimensionamiento', d: 'Calculamos la capacidad de batería e inversor necesarios.' },
      { t: 'Instalación', d: 'Integramos el sistema, separamos los circuitos de respaldo y lo probamos.' },
    ],
    faqs: [
      { q: '¿Las baterías me dejan sin cortes de luz?', a: 'Con el equipo adecuado, mantienes funcionando los circuitos que definas durante un corte. El alcance depende de la capacidad de la batería, que dimensionamos contigo.' },
      { q: '¿Puedo agregar baterías a mis paneles actuales?', a: 'En muchos casos sí, según tu inversor. Evaluamos tu sistema y te decimos si conviene agregar baterías o cambiar a un inversor híbrido.' },
      { q: '¿Sirven sin paneles solares?', a: 'Se pueden usar para respaldo, pero su mayor valor está en combinarlas con generación solar. Te asesoramos según tu caso.' },
    ],
    related: ['paneles-solares-santiago', 'paneles-solares-netbilling', 'eficiencia-energetica'],
    wa: 'Hola, quisiera cotizar baterías o un sistema solar híbrido.',
  },
  {
    slug: 'cargador-auto-electrico',
    line: 'energia',
    name: 'Cargador de auto eléctrico',
    title: 'Instalación de cargador de auto eléctrico',
    metaTitle: 'Instalación de cargador de auto eléctrico',
    metaDesc: 'Instalación de cargador de auto eléctrico (wallbox) en casas y empresas: circuito dedicado, protecciones, evaluación del empalme y declaración ante la SEC (TE6).',
    intro: 'Instalamos tu cargador de auto eléctrico (wallbox) en casa o en tu empresa, con circuito dedicado y protecciones adecuadas, para que cargues de forma rápida y segura.',
    icon: PlugZap,
    img: null,
    imgAlt: '',
    art: 'ev',
    problems: [
      'Compraste un auto eléctrico y cargas en un enchufe común.',
      'No sabes si tu empalme soporta un cargador.',
      'Tu edificio o empresa necesita puntos de carga.',
    ],
    works: [
      'Instalación de wallbox doméstico y comercial',
      'Circuito dedicado y protecciones',
      'Evaluación de la capacidad del empalme',
      'Declaración de la infraestructura de carga ante la SEC (TE6), según corresponda',
      'Integración con paneles solares',
    ],
    body: {
      title: 'Qué incluye la instalación',
      paras: [
        'Cargar un auto eléctrico en un enchufe común es lento y exige mucha corriente durante horas. Un cargador dedicado carga más rápido y de forma segura, pero requiere un circuito propio, protecciones adecuadas y, muchas veces, revisar la capacidad del empalme.',
        'Evaluamos tu instalación, dimensionamos el circuito, instalamos las protecciones y conectamos el cargador. Si hace falta más capacidad, la resolvemos, y la infraestructura de carga se declara ante la SEC cuando corresponde. También podemos integrarla con paneles solares para que cargues con tu propia energía.',
      ],
    },
    process: [
      { t: 'Evaluación', d: 'Revisamos tu empalme, tu tablero y el lugar de instalación.' },
      { t: 'Propuesta', d: 'Definimos el circuito, las protecciones y si se necesita más capacidad.' },
      { t: 'Instalación', d: 'Instalamos el cargador, probamos la carga y dejamos todo en regla.' },
    ],
    faqs: [
      { q: '¿Puedo cargar en un enchufe normal?', a: 'Se puede en una emergencia, pero para uso diario es lento y exige demasiado a la instalación. Un cargador con circuito dedicado es más rápido y seguro.' },
      { q: '¿Necesito aumentar la capacidad eléctrica?', a: 'A veces sí. Revisamos tu empalme y tu tablero y, si hace falta, dejamos la capacidad lista.' },
      { q: '¿Puedo cargar con paneles solares?', a: 'Sí. Podemos integrar el cargador con un sistema fotovoltaico.' },
    ],
    related: ['aumento-de-capacidad-empalme', 'paneles-solares-santiago', 'tableros-electricos'],
    wa: 'Hola, quisiera instalar un cargador de auto eléctrico.',
  },
  {
    slug: 'urgencias-electricas-santiago',
    line: 'energia',
    name: 'Urgencias eléctricas',
    title: 'Urgencias eléctricas',
    metaTitle: 'Urgencias eléctricas: diagnóstico y reparación',
    metaDesc: 'Urgencias eléctricas: cortes de luz, cortocircuitos, automáticos que saltan u olor a quemado. Diagnóstico y reparación por instaladores autorizados SEC.',
    intro: '¿Se cortó la luz, hay olor a quemado o el tablero está caliente? Son señales de riesgo. Escríbenos o llámanos: te damos indicaciones de seguridad, coordinamos la atención y dejamos la falla resuelta.',
    icon: Siren,
    img: '/fotos/medicion-pinza.jpg',
    imgAlt: 'Diagnóstico de una falla con pinza amperimétrica en un tablero',
    problems: [
      'Cortes de luz totales o parciales.',
      'Cortocircuitos y automáticos que saltan una y otra vez.',
      'Olor a quemado, chispas o enchufes recalentados.',
      'Fallas después de una lluvia o una sobretensión.',
    ],
    works: [
      'Diagnóstico de la causa real de la falla',
      'Reparación de circuitos, enchufes y conexiones',
      'Reemplazo de automáticos y protecciones dañadas',
      'Revisión de empalmes y tableros',
      'Recomendaciones para evitar que se repita',
    ],
    body: {
      title: 'Cuándo pedir ayuda de inmediato',
      paras: [
        'Una falla eléctrica no siempre puede esperar. Un corte total, un tablero que salta una y otra vez, olor a quemado, enchufes recalentados o chispas son señales de riesgo: detrás puede haber un problema que termine en daño de equipos o en un incendio.',
        'Cuando nos contactas, primero te damos indicaciones de seguridad, coordinamos la atención y diagnosticamos la falla para resolverla y dejar la instalación segura. No solo reponemos el automático: buscamos la causa.',
        'Por seguridad, ante chispas, olor a quemado o cables calientes, evita manipular la instalación y corta la energía desde el automático general.',
      ],
    },
    process: [
      { t: 'Contacto', d: 'Nos cuentas qué pasa por WhatsApp o teléfono y te damos indicaciones de seguridad.' },
      { t: 'Diagnóstico', d: 'Identificamos la causa de la falla antes de intervenir.' },
      { t: 'Reparación', d: 'Resolvemos la falla y te indicamos qué conviene mejorar.' },
    ],
    faqs: [
      { q: '¿Qué hago si hay olor a quemado o chispas?', a: 'Corta la energía desde el automático general, no manipules la instalación y contáctanos. Son señales de riesgo que deben revisarse cuanto antes.' },
      { q: '¿Por qué me saltan los automáticos seguido?', a: 'Suele ser una sobrecarga, un cortocircuito o una protección dañada. Diagnosticamos la causa real y la corregimos.' },
      { q: '¿Cómo pido la atención?', a: 'Escríbenos por WhatsApp o llámanos al +56 9 6657 5447 contándonos qué ocurre; si puedes, envía fotos del tablero.' },
    ],
    related: ['mantencion-electrica', 'tableros-electricos', 'instalaciones-electricas'],
    wa: 'Hola, tengo una URGENCIA eléctrica y necesito ayuda.',
    cta: '¿Tienes una urgencia eléctrica?',
  },

  /* ═══════════ PÁGINAS POR ZONA ═══════════ */
  {
    slug: 'electricista-santiago',
    line: 'zona',
    name: 'Electricista en Santiago',
    title: 'Electricista autorizado SEC en Santiago',
    metaTitle: 'Electricista autorizado SEC en Santiago',
    metaDesc: 'Electricista autorizado SEC en Santiago y la Región Metropolitana: instalaciones domiciliarias e industriales, tableros, empalmes, certificación TE1 y energía solar.',
    intro: 'Somos instaladores eléctricos autorizados por la SEC en Santiago y toda la Región Metropolitana. Realizamos instalaciones domiciliarias, comerciales e industriales, tableros, empalmes y protecciones, y la declaración TE1 para dejar tu instalación en regla.',
    icon: MapPin,
    img: '/fotos/tablero-medicion.jpg',
    imgAlt: 'Revisión de un tablero eléctrico en Santiago',
    problems: [
      'Necesitas un electricista autorizado, no un maestro informal.',
      'Tu instalación tiene fallas, se calienta o los automáticos saltan.',
      'Vas a ampliar, remodelar o habilitar un local.',
      'Necesitas el certificado TE1 para arrendar, vender o un empalme.',
    ],
    works: [
      'Instalaciones eléctricas domiciliarias e industriales',
      'Certificación SEC y declaración TE1',
      'Tableros, empalmes y protecciones',
      'Proyectos eléctricos y planos',
      'Reparación de fallas y cortes',
      'Paneles solares y eficiencia energética',
    ],
    body: {
      title: 'Por qué un electricista autorizado',
      paras: [
        'Como instaladores autorizados por la SEC, ejecutamos instalaciones nuevas y regularizamos las existentes en hogares, comercios e industria de la Región Metropolitana: dimensionamiento de circuitos y protecciones, tableros, empalmes y la declaración TE1 cuando corresponde.',
        'Una instalación bien hecha no se nota, pero una mal ejecutada se paga caro: automáticos que saltan, equipos dañados, riesgo de incendio y problemas para arrendar o vender. Por eso trabajamos con materiales de calidad, bajo la normativa vigente y con boleta o factura.',
        'Atendemos desde una ampliación en tu casa hasta proyectos eléctricos completos para empresas, coordinando los cortes de energía para no detener tu operación.',
      ],
    },
    process: [
      { t: 'Contacto', d: 'Nos cuentas qué necesitas por WhatsApp o el formulario.' },
      { t: 'Evaluación y propuesta', d: 'Visita técnica o evaluación con fotos, y presupuesto claro.' },
      { t: 'Ejecución', d: 'Ejecutamos y declaramos ante la SEC cuando corresponde.' },
    ],
    faqs: [
      { q: '¿Son electricistas autorizados por la SEC?', a: 'Sí. Somos instaladores eléctricos autorizados y realizamos la declaración TE1 que deja tu instalación en regla.' },
      { q: '¿Hacen trabajos para empresas e industria?', a: 'Sí. Ejecutamos proyectos domiciliarios, comerciales e industriales, coordinando los trabajos para minimizar el impacto en tu operación.' },
      { q: '¿Emiten boleta o factura?', a: 'Sí, emitimos boleta o factura por todos nuestros trabajos.' },
    ],
    related: ['instalaciones-electricas', 'certificacion-te1', 'tableros-electricos'],
    wa: 'Hola, necesito un electricista autorizado en Santiago.',
  },
  {
    slug: 'electricista-villarrica',
    line: 'zona',
    name: 'Electricista en Villarrica',
    title: 'Electricista autorizado SEC en Villarrica y alrededores',
    metaTitle: 'Electricista autorizado SEC en Villarrica',
    metaDesc: 'Electricista autorizado SEC en Villarrica y alrededores: instalaciones, tableros, certificación TE1 y paneles solares para casas, cabañas y negocios.',
    intro: 'Instaladores eléctricos autorizados por la SEC en Villarrica y alrededores. Realizamos instalaciones eléctricas, tableros, certificación TE1 y paneles solares para casas, cabañas, negocios y proyectos en la Región de La Araucanía.',
    icon: MapPin,
    img: '/fotos/empalme-poste.jpg',
    imgAlt: 'Empalme rural instalado en poste en la zona sur',
    problems: [
      'Tu casa de veraneo o cabaña necesita una instalación segura y en regla.',
      'Necesitas el certificado TE1 para arrendar o vender.',
      'Los cortes de energía en la zona afectan tu casa o negocio.',
      'Tu hotel, restaurante o local necesita tableros bien dimensionados.',
    ],
    works: [
      'Instalaciones eléctricas domiciliarias y comerciales',
      'Certificación SEC y declaración TE1',
      'Tableros, empalmes y protecciones',
      'Instalaciones para cabañas y arriendos turísticos',
      'Paneles solares y respaldo con baterías',
      'Diagnóstico y reparación de fallas',
    ],
    body: {
      title: 'Cobertura en La Araucanía',
      paras: [
        'Atendemos Villarrica y alrededores en la Región de La Araucanía. Somos instaladores eléctricos autorizados por la SEC, así que dejamos tu instalación segura, declarada y en regla.',
        'La zona tiene necesidades muy concretas: casas de veraneo, cabañas y arriendos turísticos que requieren instalaciones seguras y, en muchos casos, el certificado TE1 para funcionar, vender o arrendar. Además, los cortes de energía hacen especialmente atractiva la energía solar con respaldo de baterías.',
        'También trabajamos con hoteles, restaurantes y locales que necesitan tableros bien dimensionados y respaldo ante fallas.',
      ],
    },
    process: [
      { t: 'Contacto', d: 'Nos cuentas tu proyecto por WhatsApp o el formulario.' },
      { t: 'Evaluación', d: 'Coordinamos una visita en la zona o evaluamos con fotos.' },
      { t: 'Ejecución', d: 'Ejecutamos y declaramos ante la SEC cuando corresponde.' },
    ],
    faqs: [
      { q: '¿Qué zona de La Araucanía atienden?', a: 'Villarrica y alrededores. Si tu localidad está cerca, escríbenos y coordinamos.' },
      { q: '¿Certifican instalaciones de cabañas y arriendos?', a: 'Sí. Realizamos y regularizamos la instalación eléctrica y la declaración TE1, muy solicitada para arriendos turísticos y para vender o arrendar.' },
      { q: '¿Instalan paneles solares en la zona?', a: 'Sí. Evaluamos tu consumo y tu techo para proponer un sistema solar, con respaldo de baterías si lo necesitas.' },
    ],
    related: ['certificacion-te1', 'paneles-solares-santiago', 'baterias-almacenamiento-energia'],
    wa: 'Hola, necesito un electricista autorizado en Villarrica.',
  },

  /* ═══════════ TECNOLOGÍA (línea complementaria) — recuperan sus URLs anteriores ═══════════ */
  {
    slug: 'domotica-santiago',
    line: 'tecnologia',
    name: 'Automatización y domótica',
    title: 'Automatización y domótica',
    metaTitle: 'Automatización y domótica',
    metaDesc: 'Automatización de portones, iluminación y equipos, domótica e integración de dispositivos inteligentes para hogares y empresas.',
    intro: 'Integramos automatización a la instalación eléctrica para que puedas controlar portones, accesos, iluminación y equipos desde el celular o de forma programada.',
    icon: Cpu,
    img: '/domotica-1.jpg',
    imgAlt: 'Apertura de portón desde el celular con un sistema instalado por InnVolt',
    problems: [
      'Quieres abrir el portón o controlar accesos desde el celular.',
      'Necesitas programar iluminación o equipos.',
      'Buscas integrar dispositivos inteligentes en un solo sistema.',
    ],
    works: [
      'Automatización de portones y accesos',
      'Control de iluminación y equipos',
      'Domótica residencial',
      'Integración de sensores y dispositivos IoT',
      'Automatización de procesos y control, según evaluación',
    ],
    process: TECH_PROCESS,
    note: TECH_NOTE,
    faqs: [
      { q: '¿Se puede integrar a mi instalación actual?', a: 'En la mayoría de los casos sí. Lo revisamos en la evaluación para definir qué equipos y cambios se necesitan.' },
      { q: '¿Puedo controlar todo desde el celular?', a: 'Depende de los equipos; cuando el proyecto lo permite, dejamos el control remoto configurado.' },
    ],
    related: ['camaras-cctv-santiago', 'redes-cableado-estructurado', 'eficiencia-energetica'],
    wa: 'Hola, quisiera cotizar automatización (portón, iluminación o domótica).',
  },
  {
    slug: 'camaras-cctv-santiago',
    line: 'tecnologia',
    name: 'CCTV y control de acceso',
    title: 'Cámaras CCTV y control de acceso',
    metaTitle: 'Cámaras CCTV y control de acceso',
    metaDesc: 'Videovigilancia CCTV, control de acceso electrónico y biométrico, control de asistencia y alarmas para hogares, comunidades y empresas.',
    intro: 'Instalamos sistemas de videovigilancia y control de acceso para viviendas, comunidades y empresas, integrados con una instalación eléctrica segura.',
    icon: Camera,
    img: '/acceso-1.jpg',
    imgAlt: 'Instalación de un control de acceso biométrico',
    problems: [
      'Necesitas registrar y controlar quién entra a tu empresa o comunidad.',
      'Quieres ver tus cámaras desde el celular.',
      'Tu sistema actual falla o quedó obsoleto.',
    ],
    works: [
      'Cámaras CCTV y videovigilancia',
      'Control de acceso electrónico y biométrico',
      'Control de asistencia',
      'Alarmas y soluciones de seguridad',
      'Alimentación y respaldo de energía de los equipos',
    ],
    process: TECH_PROCESS,
    note: TECH_NOTE,
    faqs: [
      { q: '¿Instalan control de acceso para empresas?', a: 'Sí, incluyendo lectores biométricos y controladoras, según la cantidad de accesos y usuarios.' },
      { q: '¿Puedo ver las cámaras desde el celular?', a: 'Sí, cuando el sistema y la conexión a internet lo permiten; lo dejamos configurado.' },
    ],
    related: ['redes-cableado-estructurado', 'domotica-santiago', 'instalaciones-electricas'],
    wa: 'Hola, quisiera cotizar CCTV o control de acceso.',
  },
  {
    slug: 'redes-cableado-estructurado',
    line: 'tecnologia',
    name: 'Redes y cableado',
    title: 'Redes, cableado estructurado y Wi-Fi',
    metaTitle: 'Redes, cableado estructurado y Wi-Fi',
    metaDesc: 'Cableado estructurado, Wi-Fi profesional, racks y conectividad para oficinas, comercios y empresas. Redes ordenadas, rotuladas y con soporte.',
    intro: 'Una red ordenada evita cortes y problemas difíciles de rastrear. Instalamos cableado estructurado, Wi-Fi profesional y racks para oficinas, comercios y empresas.',
    icon: Network,
    img: '/redes-1.jpg',
    imgAlt: 'Gabinete con controladora y cableado de datos ordenado',
    problems: [
      'El Wi-Fi no llega a todos los sectores.',
      'El cableado está desordenado o sin rotular.',
      'Vas a habilitar una oficina o local y necesitas red.',
    ],
    works: [
      'Cableado estructurado',
      'Wi-Fi profesional',
      'Racks y ordenamiento',
      'Conectividad entre equipos y sectores',
      'Soporte e integración de equipos',
    ],
    process: TECH_PROCESS,
    note: TECH_NOTE,
    faqs: [
      { q: '¿Ordenan cableado existente?', a: 'Sí, podemos ordenar, rotular y normalizar el cableado de red existente.' },
      { q: '¿Instalan Wi-Fi para oficinas?', a: 'Sí. Dimensionamos los puntos de acceso según la superficie y la cantidad de usuarios.' },
    ],
    related: ['camaras-cctv-santiago', 'domotica-santiago', 'proyectos-electricos'],
    wa: 'Hola, quisiera cotizar redes o Wi-Fi para mi oficina o local.',
  },
  {
    slug: 'pantallas-led',
    line: 'tecnologia',
    name: 'Pantallas LED',
    title: 'Pantallas LED y señalética digital',
    metaTitle: 'Pantallas LED y señalética digital',
    metaDesc: 'Pantallas LED publicitarias, señalética digital e integración de sistemas para comercios, galerías y empresas.',
    intro: 'Instalamos pantallas LED y señalética digital para comercios y galerías, incluyendo la alimentación eléctrica, las protecciones y la configuración del contenido.',
    icon: MonitorPlay,
    img: '/pantallas-1.jpg',
    imgAlt: 'Pantalla LED instalada en el acceso de una galería comercial',
    problems: [
      'Quieres destacar tu local o galería con un letrero digital.',
      'Necesitas mostrar contenido que cambie fácilmente.',
      'Tu pantalla actual tiene fallas de alimentación o configuración.',
    ],
    works: [
      'Pantallas LED publicitarias',
      'Señalética digital',
      'Alimentación eléctrica y protecciones de la pantalla',
      'Configuración de controladoras y contenido',
      'Integración con otros sistemas',
    ],
    process: TECH_PROCESS,
    note: TECH_NOTE,
    faqs: [
      { q: '¿Incluyen la instalación eléctrica de la pantalla?', a: 'Sí. La alimentación y las protecciones de la pantalla son parte del proyecto.' },
      { q: '¿Puedo cambiar el contenido yo mismo?', a: 'Sí. Configuramos el sistema y te mostramos cómo actualizar el contenido.' },
    ],
    related: ['domotica-santiago', 'redes-cableado-estructurado', 'instalaciones-electricas'],
    wa: 'Hola, quisiera cotizar una pantalla LED para mi negocio.',
  },
];

export const getService = (slug: string) => SERVICES.find(s => s.slug === slug);
export const ENERGIA = SERVICES.filter(s => s.line === 'energia');
export const ENERGIA_PRINCIPAL = ENERGIA.filter(s => s.featured);
export const ENERGIA_MAS = ENERGIA.filter(s => !s.featured);
export const TECNOLOGIA = SERVICES.filter(s => s.line === 'tecnologia');
export const ZONAS = SERVICES.filter(s => s.line === 'zona');

/* Las 4 categorías de la portada — fotos sin repetir entre sí ni con el hero */
export const CATEGORIES = [
  { slug: 'instalaciones-electricas', title: 'Instalaciones eléctricas', desc: 'Domiciliarias, comerciales e industriales: nuevas, ampliaciones y modificaciones.', img: '/fotos/instalacion-tda.jpg', icon: Zap },
  { slug: 'mantencion-electrica', title: 'Tableros, mantención y normalización', desc: 'Tableros bien dimensionados, mantención preventiva y reparación de fallas.', img: '/fotos/termografia-tablero.jpg', icon: Gauge },
  { slug: 'paneles-solares-santiago', title: 'Energía solar y eficiencia', desc: 'Proyectos fotovoltaicos y gestión de energía, según la evaluación de tu consumo.', img: null, icon: Sun },
  { slug: 'proyectos-electricos', title: 'Evaluación y proyectos', desc: 'Levantamientos técnicos, proyectos eléctricos y certificación SEC (TE1).', img: '/fotos/te1-planos.jpg', icon: ClipboardCheck },
];

/* Trabajos con fotos reales de InnVolt (sin duplicados) */
export const PROJECTS = [
  { img: '/fotos/instalacion-tda.jpg', cat: 'Instalación', t: 'Instalación eléctrica en vivienda nueva', href: '/instalaciones-electricas' },
  { img: '/fotos/tablero-medicion.jpg', cat: 'Tableros', t: 'Revisión de tablero general', href: '/tableros-electricos' },
  { img: '/fotos/termografia-tablero.jpg', cat: 'Mantención', t: 'Mantención preventiva con medición de temperatura', href: '/mantencion-electrica' },
  { img: '/fotos/empalme-poste-abierto.jpg', cat: 'Empalme', t: 'Empalme y protección en exterior', href: '/aumento-de-capacidad-empalme' },
  { img: '/fotos/te1-planos.jpg', cat: 'Certificación', t: 'Proyecto y declaración TE1', href: '/certificacion-te1' },
  { img: '/fotos/medicion-pinza.jpg', cat: 'Eficiencia', t: 'Medición de consumo en tablero', href: '/eficiencia-energetica' },
  { img: '/pantallas-1.jpg', cat: 'Tecnología', t: 'Pantalla LED en acceso comercial', href: '/pantallas-led' },
  { img: '/acceso-1.jpg', cat: 'Tecnología', t: 'Control de acceso biométrico', href: '/camaras-cctv-santiago' },
  { img: '/redes-1.jpg', cat: 'Tecnología', t: 'Controladora de accesos y cableado', href: '/redes-cableado-estructurado' },
];

export const HOME_FAQS: Faq[] = [
  { q: '¿Están autorizados por la SEC?', a: 'Sí. Somos instaladores eléctricos autorizados por la Superintendencia de Electricidad y Combustibles (SEC) y realizamos la declaración de tu instalación (TE1) cuando corresponde.' },
  { q: '¿En qué zonas trabajan?', a: `Atendemos la ${ZONA_LARGA} Si tu proyecto está en otra zona, escríbenos y lo evaluamos.` },
  { q: '¿Cómo es el proceso de cotización?', a: 'Nos cuentas tu proyecto por WhatsApp o por el formulario. Según el caso, coordinamos una visita técnica o una evaluación a distancia y te enviamos una propuesta con el alcance definido.' },
  { q: '¿Emiten boleta y factura?', a: 'Sí, emitimos boleta o factura por nuestros trabajos.' },
  { q: '¿Instalan paneles solares?', a: 'Sí. Evaluamos tu consumo, el inmueble y la instalación existente para proponer un sistema fotovoltaico adecuado. No prometemos ahorros sin un cálculo con tus datos reales.' },
  { q: '¿También hacen automatización, CCTV o redes?', a: 'Sí, como línea complementaria: automatización y domótica, CCTV y control de acceso, redes y pantallas LED, según el alcance de cada proyecto.' },
];
