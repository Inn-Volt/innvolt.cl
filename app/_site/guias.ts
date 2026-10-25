import type { Faq } from './content';

/*
  Guías del blog (/guias). Contenido educativo para atraer búsquedas reales.
  Regla: solo datos verificables, con su fuente oficial en `sources`. Sin precios ni promesas.
*/

export type Block =
  | { type: 'h2'; text: string }
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }
  | { type: 'note'; text: string };

export type Guide = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDesc: string;
  category: string;
  published: string; // ISO
  updated: string;   // ISO
  readMin: number;
  intro: string;
  blocks: Block[];
  faqs: Faq[];
  services: string[]; // slugs de servicios relacionados (enlazan en ambos sentidos)
  sources: { label: string; url: string }[];
  cta: { title: string; wa: string };
};

export const GUIDES: Guide[] = [
  {
    slug: 'que-es-el-te1',
    title: '¿Qué es el TE1 y cuándo lo necesitas?',
    metaTitle: 'Qué es el TE1 y cuándo lo necesitas: guía práctica',
    metaDesc: 'Qué es la declaración TE1 ante la SEC, cuándo la piden (empalme, aumento de potencia, regularización, arriendo o venta), quién puede hacerla y cómo es el trámite.',
    category: 'Certificación SEC',
    published: '2026-10-25',
    updated: '2026-10-25',
    readMin: 6,
    intro: 'Si vas a pedir un empalme, aumentar la potencia de tu casa o local, o te piden "el certificado eléctrico" para arrendar o vender, casi seguro estás hablando del TE1. Te explicamos qué es, cuándo se necesita y cómo es el proceso, sin tecnicismos.',
    blocks: [
      { type: 'h2', text: 'Qué es el TE1' },
      { type: 'p', text: 'El TE1 es la declaración de una instalación eléctrica interior ante la Superintendencia de Electricidad y Combustibles (SEC). La presenta un instalador eléctrico autorizado por la SEC a través del sistema en línea e-Declarador, y con ella declara, bajo su responsabilidad, que la instalación cumple la normativa vigente: el reglamento de seguridad de las instalaciones de consumo de energía eléctrica y sus pliegos técnicos (conocidos como RIC).' },
      { type: 'p', text: 'Aunque en la práctica se le dice "certificado TE1", técnicamente es una declaración: la SEC la inscribe y, una vez inscrita, se puede imprimir el certificado desde el sistema.' },
      { type: 'h2', text: 'Cuándo se necesita' },
      { type: 'p', text: 'Estos son los casos más habituales en que te lo van a pedir:' },
      { type: 'ul', items: [
        'Empalme nuevo: la distribuidora suele exigir la declaración de la instalación interior como antecedente para conectar una vivienda o local.',
        'Aumento de potencia o cambio de monofásico a trifásico, cuando la instalación existente no admite la nueva carga.',
        'Regularización de instalaciones antiguas que nunca se declararon o que fueron modificadas.',
        'Arriendo, venta o recepción de una propiedad o local comercial, donde suele solicitarse como respaldo de que la instalación está en regla.',
      ] },
      { type: 'h2', text: 'Quién puede hacerlo' },
      { type: 'p', text: 'Solo un instalador eléctrico autorizado por la SEC, con la licencia que corresponda al tipo de instalación. Un "maestro" sin autorización no puede presentar la declaración, y una instalación declarada sin cumplir la normativa queda bajo responsabilidad del instalador que la firmó.' },
      { type: 'h2', text: 'Cómo es el proceso, paso a paso' },
      { type: 'ol', items: [
        'Revisión de la instalación: el instalador inspecciona tableros, protecciones, circuitos y puesta a tierra, y te indica qué cumple y qué no.',
        'Correcciones: si hay puntos fuera de norma, se corrigen antes de declarar. Este es el paso que más varía de una casa a otra.',
        'Planos y memoria explicativa: se preparan los documentos de la instalación que exige el sistema.',
        'Declaración en e-Declarador: el instalador ingresa el formulario y adjunta los documentos.',
        'Inscripción: según la SEC, el trámite de un TE1 se resuelve en un plazo de 10 días hábiles; al terminar se notifica y el certificado queda disponible para imprimir.',
      ] },
      { type: 'note', text: 'El trámite ante la SEC no tiene costo. Lo que se paga es el trabajo del instalador: la revisión, las correcciones necesarias y la preparación de los planos y documentos.' },
      { type: 'h2', text: '¿El TE1 vence?' },
      { type: 'p', text: 'Las declaraciones inscritas en e-Declarador no tienen fecha de vencimiento. Pero si después modificas la instalación (agregas circuitos, cambias el tablero o aumentas la potencia), la declaración deja de reflejar lo que realmente hay y corresponde actualizarla.' },
      { type: 'h2', text: 'Errores comunes' },
      { type: 'ul', items: [
        'Pedir "solo el papel" sin revisar la instalación: si no cumple, el problema sigue ahí, y la responsabilidad también.',
        'Usar planos antiguos que no corresponden a lo que hay instalado hoy.',
        'Dejar el trámite para el último día antes de un arriendo o una venta, sin considerar el tiempo de las correcciones.',
      ] },
    ],
    faqs: [
      { q: '¿Cuánto demora el TE1?', a: 'La SEC informa un plazo de 10 días hábiles para el trámite en e-Declarador. A eso se suma el tiempo de revisión y, si hace falta, de corrección de la instalación.' },
      { q: '¿El trámite tiene costo en la SEC?', a: 'No. El trámite en e-Declarador no tiene costo; se paga el trabajo del instalador autorizado.' },
      { q: '¿Puedo hacer el TE1 yo mismo?', a: 'No. Debe presentarlo un instalador eléctrico autorizado por la SEC, con la licencia que corresponda.' },
    ],
    services: ['certificacion-te1', 'instalaciones-electricas', 'aumento-de-capacidad-empalme'],
    sources: [
      { label: 'ChileAtiende: Declaración de instalaciones a través de e-Declarador (SEC)', url: 'https://www.chileatiende.gob.cl/fichas/2656-declaracion-de-instalaciones-a-traves-de-e-declarador' },
      { label: 'Superintendencia de Electricidad y Combustibles (SEC)', url: 'https://www.sec.cl' },
    ],
    cta: { title: '¿Necesitas el TE1 de tu instalación?', wa: 'Hola, leí la guía del TE1 y necesito la certificación de mi instalación.' },
  },
  {
    slug: 'net-billing-chile',
    title: 'Net billing en Chile: cómo funciona y quién puede acogerse',
    metaTitle: 'Net billing en Chile: cómo funciona (Ley 21.118)',
    metaDesc: 'Qué es el net billing, cómo se descuentan los excedentes de tus paneles solares, el límite de 300 kW de la Ley 21.118 y qué se necesita para conectarte legalmente.',
    category: 'Energía solar',
    published: '2026-10-25',
    updated: '2026-10-25',
    readMin: 6,
    intro: 'El net billing es lo que permite que la energía solar que no alcanzas a usar no se pierda: se inyecta a la red y se descuenta de tu cuenta. Te explicamos cómo funciona en Chile, qué dice la ley y qué pasos hay que cumplir para conectarte en regla.',
    blocks: [
      { type: 'h2', text: 'Qué es el net billing' },
      { type: 'p', text: 'Es el esquema de generación distribuida para autoconsumo: generas tu propia energía, normalmente con paneles solares, la usas en tu casa o negocio y los excedentes que no consumes en el momento se inyectan a la red de la distribuidora. Esa energía inyectada se valoriza y se descuenta de tu boleta.' },
      { type: 'p', text: 'Lo regula la Ley General de Servicios Eléctricos, modificada por la Ley 21.118 (publicada el 17 de noviembre de 2018), que actualizó el esquema que había creado la Ley 20.571. Su reglamento es el de Generación Distribuida para Autoconsumo (DS N° 57).' },
      { type: 'h2', text: 'Qué cambió con la Ley 21.118' },
      { type: 'ul', items: [
        'El tope de capacidad instalada por inmueble o instalación subió a 300 kW (antes era 100 kW).',
        'Se permite la propiedad conjunta de los equipos de generación, lo que abre la puerta a comunidades y edificios.',
        'Se incorporaron reglas para los remanentes de inyecciones, es decir, la energía inyectada que no alcanzas a descontar en tu cuenta.',
      ] },
      { type: 'h2', text: 'Cómo se valoriza lo que inyectas' },
      { type: 'p', text: 'Este es el punto que más confunde: la energía que inyectas no se paga al mismo precio que la que compras. El valor de la energía inyectada lo define la normativa y depende de tu distribuidora y tu tarifa. Por eso, en la práctica, un sistema solar rinde más cuando usas directamente la mayor parte de lo que genera y deja menos excedentes.' },
      { type: 'note', text: 'Por esta razón conviene dimensionar los paneles según tu consumo real y no "lo más grande posible": inyectar mucho no siempre se traduce en ahorro proporcional.' },
      { type: 'h2', text: 'Qué se necesita para conectarte legalmente' },
      { type: 'ol', items: [
        'Evaluar el consumo y el inmueble para dimensionar el sistema.',
        'Gestionar con la distribuidora las solicitudes que exige el procedimiento de conexión.',
        'Instalar paneles, inversor y protecciones según la normativa.',
        'Declarar la instalación de generación ante la SEC (declaración TE4, de energías renovables).',
        'Coordinar con la distribuidora la conexión y el medidor que registra tanto el consumo como la inyección.',
      ] },
      { type: 'p', text: 'Un sistema que se instala sin declararse ante la SEC no puede inyectar a la red de forma legal ni recibir los descuentos.' },
      { type: 'h2', text: '¿Me conviene?' },
      { type: 'p', text: 'Depende de tu consumo, de cuánto de ese consumo ocurre de día, de la orientación y las sombras de tu techo y de tu tarifa. Un buen análisis parte por tus boletas de los últimos meses y por revisar la instalación eléctrica existente, que a veces necesita adecuaciones antes de sumar generación.' },
    ],
    faqs: [
      { q: '¿Cuál es el límite de potencia para el net billing?', a: 'La Ley 21.118 fijó un tope de 300 kW de capacidad instalada por inmueble o instalación.' },
      { q: '¿Me pagan la energía que inyecto al mismo precio que la compro?', a: 'No. La energía inyectada se valoriza según la normativa y suele valer menos que la energía que compras. Por eso conviene usar directamente la mayor parte de lo que generas.' },
      { q: '¿Pueden acogerse comunidades o edificios?', a: 'La Ley 21.118 permite la propiedad conjunta de los equipos de generación, lo que facilita proyectos de comunidades y copropiedades.' },
    ],
    services: ['paneles-solares-netbilling', 'paneles-solares-santiago', 'baterias-almacenamiento-energia'],
    sources: [
      { label: 'Biblioteca del Congreso Nacional: Ley 21.118', url: 'https://www.bcn.cl/leychile/Navegar?idNorma=1125560' },
      { label: 'SEC: texto de la Ley 21.118 (PDF)', url: 'https://www.sec.cl/sitio-web/wp-content/uploads/2020/10/Ley-21118_17-NOV-2018.pdf' },
      { label: 'Ministerio de Energía: Reglamento de Generación Distribuida para Autoconsumo', url: 'https://energia.gob.cl/consultas-publicas/reglamento-de-generacion-distribuida-para-autoconsumo' },
    ],
    cta: { title: '¿Quieres evaluar paneles solares con net billing?', wa: 'Hola, leí la guía de net billing y quisiera evaluar paneles solares.' },
  },
  {
    slug: 'por-que-salta-el-automatico',
    title: '¿Por qué salta el automático? Causas y qué hacer',
    metaTitle: '¿Por qué salta el automático? Causas y qué hacer',
    metaDesc: 'Las causas más comunes de que salte el automático o el diferencial (sobrecarga, cortocircuito, fuga a tierra, humedad) y cómo detectarlas de forma segura.',
    category: 'Seguridad eléctrica',
    published: '2026-10-25',
    updated: '2026-10-25',
    readMin: 5,
    intro: 'Que salte el automático es la forma en que tu instalación te avisa que algo no anda bien. A veces es algo simple, como muchos equipos enchufados a la vez; otras veces es una falla que conviene revisar pronto. Te explicamos cómo distinguirlo de forma segura.',
    blocks: [
      { type: 'h2', text: 'Automático y diferencial: no son lo mismo' },
      { type: 'p', text: 'En tu tablero hay dos tipos de protección. El automático (interruptor termomagnético) protege los cables: se dispara cuando circula más corriente de la que el circuito soporta, por sobrecarga o por cortocircuito. El diferencial protege a las personas: se dispara cuando detecta que parte de la corriente se está "escapando" a tierra, por ejemplo a través de un equipo dañado o de una persona.' },
      { type: 'p', text: 'Fíjate cuál es el que salta: eso ya te da una pista de la causa.' },
      { type: 'h2', text: 'Las causas más comunes' },
      { type: 'ul', items: [
        'Sobrecarga: demasiados equipos de alto consumo en el mismo circuito al mismo tiempo (hervidor, estufa, horno, secador). Suele saltar después de unos segundos o minutos.',
        'Cortocircuito: contacto directo entre conductores, por un cable dañado o un equipo con falla. Salta de inmediato, a veces con un chispazo.',
        'Fuga a tierra: un equipo con aislación dañada o humedad en un enchufe o caja. Lo que salta es el diferencial.',
        'Humedad o filtraciones: típico después de lluvias, en enchufes exteriores, terrazas o baños.',
        'Un equipo defectuoso: si salta cada vez que enchufas el mismo artefacto, el problema probablemente está en el artefacto.',
        'Protección envejecida o mal dimensionada: automáticos o diferenciales gastados, o calculados para una carga menor a la que hoy tienes.',
        'Conexiones sueltas o calentamiento en el tablero, que además son un riesgo de incendio.',
      ] },
      { type: 'h2', text: 'Cómo identificar la causa de forma segura' },
      { type: 'ol', items: [
        'Desenchufa los equipos del circuito afectado.',
        'Sube el automático o el diferencial. Si vuelve a saltar sin nada enchufado, la falla está en la instalación: no insistas y pide una revisión.',
        'Si se mantiene arriba, vuelve a enchufar los equipos de a uno. Si salta al conectar uno en particular, ese equipo probablemente está fallando.',
        'Si salta solo cuando usas varios equipos a la vez, es una sobrecarga: reparte los consumos o evalúa nuevos circuitos.',
      ] },
      { type: 'note', text: 'Si sientes olor a quemado, ves chispas, marcas negras o el tablero está caliente, corta la energía desde el automático general, no manipules la instalación y llama a un electricista autorizado.' },
      { type: 'h2', text: 'Lo que nunca debes hacer' },
      { type: 'ul', items: [
        'Cambiar el automático por uno "más grande" para que no salte: el automático está calculado para proteger el cable, y uno mayor puede dejar que el cable se sobrecaliente.',
        'Puentear o anular el diferencial: es la protección que evita accidentes por electrocución.',
        'Subir el automático una y otra vez cuando salta de inmediato: es señal de cortocircuito.',
      ] },
      { type: 'h2', text: 'Cuándo llamar a un electricista' },
      { type: 'p', text: 'Si salta sin nada enchufado, si salta con frecuencia aunque repartas los consumos, si el problema empezó después de lluvias o si notas calor u olor en el tablero. Un electricista autorizado puede medir los circuitos, encontrar la causa real y corregirla, en vez de solo volver a subir el automático.' },
    ],
    faqs: [
      { q: '¿Es peligroso que salte el automático seguido?', a: 'El automático está cumpliendo su función de proteger la instalación, pero si salta seguido hay una causa que conviene revisar: puede ser una sobrecarga permanente o una falla.' },
      { q: '¿Por qué salta el diferencial cuando llueve?', a: 'Normalmente por humedad en enchufes, cajas o equipos exteriores, que provoca una fuga de corriente a tierra. Conviene revisar y sellar esos puntos.' },
      { q: '¿Puedo poner un automático más grande?', a: 'No. Debe corresponder a la sección del cable del circuito. Uno mayor puede permitir que el cable se sobrecaliente sin que la protección actúe.' },
    ],
    services: ['urgencias-electricas-santiago', 'tableros-electricos', 'mantencion-electrica'],
    sources: [
      { label: 'Superintendencia de Electricidad y Combustibles (SEC)', url: 'https://www.sec.cl' },
    ],
    cta: { title: '¿El automático sigue saltando?', wa: 'Hola, leí la guía del automático: me sigue saltando y necesito una revisión.' },
  },
];

export const getGuide = (slug: string) => GUIDES.find(g => g.slug === slug);
export const guidesForService = (serviceSlug: string) => GUIDES.filter(g => g.services.includes(serviceSlug));

export const fmtDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });
