# Plan de Google Ads — InnVolt (actualizado nov 2026)

Objetivo: aparecer cuando alguien busca **ahora** un electricista, un TE1 o paneles solares, y llevarlo a la página del servicio, que ya trae WhatsApp, llamada y un formulario corto (solo nombre y teléfono).

> **Antes de gastar:** en GA4 marca como *eventos clave* `generate_lead`, `whatsapp_click` y `call_click` (Administrar → Eventos → activar "Marcar como evento clave"), y vincula GA4 con Google Ads. Sin eso no sabes qué aviso trae clientes.

> **Reglas de contenido (las mismas del sitio):** no prometer tiempos ("24 horas", "mismo día", "al tiro"), no ofrecer garantía, no inventar cifras ni precios. "Presupuesto sin costo" solo si de verdad lo ofrecen.

---

## 1. Estructura

| Campaña | Grupo de anuncios | Página de destino |
|---|---|---|
| **RM · Electricidad** (Búsqueda) | Electricista / instalaciones | `https://innvolt.cl/instalaciones-electricas` |
| | Tableros y fallas | `https://innvolt.cl/tableros-electricos` |
| | Certificación TE1 | `https://innvolt.cl/certificacion-te1` |
| **RM · Energía solar** (Búsqueda) | Paneles solares | `https://innvolt.cl/paneles-solares-santiago` |
| | Baterías / respaldo | `https://innvolt.cl/baterias-almacenamiento-energia` |
| **Villarrica** (Búsqueda, aparte) | Electricista + solar | `https://innvolt.cl/electricista-villarrica` |

- Ubicación: **Región Metropolitana** en las campañas RM; **Villarrica y alrededores** (radio desde Villarrica) en la otra. Opción: "Presencia: personas que están o están habitualmente en la zona".
- Idioma: español. Horario: cuando puedan contestar el teléfono y WhatsApp.
- Nunca enviar avisos a la portada: cada grupo va a su página.

## 2. Palabras clave (concordancia de frase "…" o exacta […])

**Electricista / instalaciones:** "electricista santiago", "electricista autorizado sec", "electricista certificado", "instalación eléctrica casa", "instalación eléctrica local comercial", "ampliación eléctrica"

**Tableros y fallas:** "tablero eléctrico", "cambiar tablero eléctrico", "salta el automático", "se corta la luz en mi casa", "normalizar instalación eléctrica"

**TE1:** "certificado te1", "declaración te1", "te1 sec", "certificado eléctrico sec", "regularizar instalación eléctrica"

**Paneles solares:** "paneles solares santiago", "instalación paneles solares", "paneles solares casa", "net billing", "sistema fotovoltaico"

**Baterías:** "baterías paneles solares", "respaldo energía cortes de luz", "sistema solar híbrido"

**Villarrica:** "electricista villarrica", "electricista pucón", "paneles solares villarrica", "paneles solares araucanía"

## 3. Palabras clave negativas (agrégalas en todas las campañas)
gratis, curso, cursos, capacitación, estudiar, carrera, empleo, trabajo, sueldo, se necesita, vacante, cv, tutorial, "cómo hacer", youtube, pdf, manual, usado, segunda mano, mercado libre, sodimac, easy, precio panel, venta paneles, mayorista

## 4. Textos de anuncio (Responsive Search Ads)
Títulos: máx. 30 caracteres. Descripciones: máx. 90. Todos revisados con las reglas de arriba.

**Electricidad — títulos:** Electricista Autorizado SEC · Instalaciones Eléctricas RM · Tableros y Normalización · Certificación TE1 ante la SEC · Evaluación Técnica en Terreno · Propuesta Clara y Detallada · Boleta y Factura · Hogares, Comercios y Empresas · Escríbenos por WhatsApp · InnVolt · Electricidad

**Energía solar — títulos:** Paneles Solares en Santiago · Instaladores Autorizados SEC · Net Billing y Declaración TE4 · Baterías y Respaldo Solar · Dimensionado a tu Consumo · Sistemas con Red o Aislados · Propuesta Clara y Detallada · Hogares y Empresas · InnVolt · Energía Solar

**TE1 — títulos:** Certificado TE1 en Santiago · Declaración TE1 ante la SEC · Instaladores Autorizados SEC · Planos y Diagrama Unilineal · Regulariza tu Instalación · Para Empalmes y Ampliaciones · Revisamos tu Instalación · Boleta y Factura

**Descripciones (elige 3–4 por grupo):**
- Instaladores eléctricos autorizados SEC en la Región Metropolitana. Pide tu evaluación.
- Evaluamos tu instalación y te entregamos una propuesta con el alcance definido.
- Cotiza por WhatsApp: envíanos fotos de tu tablero o instalación y te orientamos.
- Paneles solares dimensionados según tu boleta y tu techo. Gestionamos net billing y TE4.
- Preparamos y declaramos tu TE1 ante la SEC con planos y diagrama unilineal.
- Con red, híbridos o aislados, con baterías. Evaluamos tu consumo antes de proponer.

## 5. Recursos (antes "extensiones")
- **Llamada:** +56 9 6657 5447.
- **Mensaje / WhatsApp:** el mismo número.
- **Enlaces de sitio:** Certificación TE1 (`/certificacion-te1`), Paneles solares (`/paneles-solares-santiago`), Tableros (`/tableros-electricos`), Proyectos (`/proyectos`).
- **Textos destacados:** Autorizados SEC · Boleta y factura · Evaluación técnica · Propuesta detallada.
- **Ubicación:** vincula el Perfil de Empresa de Google (InnVolt).
- **Imágenes:** las fotos reales de `public/fotos/` (solar-techo, tablero-medicion, instalacion-tda…).

## 6. Presupuesto y pujas para partir
- Arranque: **Maximizar clics** 1–2 semanas (con puja máxima por clic) para juntar datos; luego **Maximizar conversiones** cuando haya al menos ~15 conversiones.
- Presupuesto de prueba sugerido: **$8.000–$15.000 CLP/día** repartido entre Electricidad y Solar. Villarrica con menos (ej. $3.000/día).
- Cada semana: revisa **Términos de búsqueda**, agrega negativas y pausa palabras que gastan sin convertir.
- Dale al menos 3–4 semanas antes de juzgar.

## 7. Errores a evitar
- Mandar los avisos a la portada.
- No poner negativas (te llenas de gente buscando empleo, cursos o comprar paneles sueltos).
- No medir conversiones.
- Prometer en el aviso algo que el sitio no dice (Google y el cliente lo notan).

**Orden recomendado:** 1) Perfil de Google completo (ver `GUIA-GOOGLE-BUSINESS.md`) → 2) primeras 5–10 reseñas reales → 3) Ads con presupuesto chico y escalar lo que convierte.
