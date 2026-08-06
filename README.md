# INNVOLT — Sitio web

Sitio de captación de clientes para **INNVOLT** (innvolt.cl): electricistas certificados SEC en Santiago (electricidad, domótica y seguridad).

Construido con **Next.js 16** (App Router) + **React 19** + **TypeScript** + **Tailwind v4**.

## Desarrollo

```bash
npm install
npm run dev
```

Abre la URL que muestra la consola (por defecto http://localhost:3000; si está ocupado, Next elige otro puerto).

## Variables de entorno

Copia `.env.example` como `.env.local` y complétalo. Todas son opcionales:

- `NEXT_PUBLIC_GA_ID` — Google Analytics 4. Sin esto, el sitio funciona pero no mide visitas ni conversiones.
- `NEXT_PUBLIC_EMAILJS_*` — envío del formulario de contacto (EmailJS). Si no se definen, se usan las claves por defecto de `app/components/ContactForm.tsx`.
- `NEXT_PUBLIC_SUPABASE_*` — reservado, aún no se usa.

## Estructura

```
app/
  page.tsx              Home (hero, servicios, proyectos, cómo trabajamos,
                        nosotros, testimonios, FAQ, contacto)
  layout.tsx            Metadata SEO + JSON-LD (LocalBusiness, FAQPage) + Analytics
  electricista-santiago/    Página SEO por servicio
  camaras-cctv-santiago/    Página SEO por servicio
  domotica-santiago/        Página SEO por servicio
  sitemap.ts, robots.ts, manifest.ts, not-found.tsx
  components/
    ServiceLanding.tsx  Plantilla reutilizable de página de servicio
    ContactForm.tsx     Formulario (EmailJS + honeypot anti-spam)
    Analytics.tsx       GA4 + rastreo de conversiones (WhatsApp / llamada / lead)
    Logo.tsx
  globals.css           Estilos y sistema de diseño (variables de marca)
public/                 Imágenes y assets
```

## Pendiente de contenido real (buscar `⚠️ PLANTILLA` en el código)

- **Testimonios** (`app/page.tsx`): reemplazar los 3 ejemplos por reseñas reales de Google.
- **Proyectos** (`app/page.tsx`): reemplazar las imágenes de relleno por fotos reales de trabajos (en `/public`).
- **Barra de confianza**: cambiar "Reseñas en Google" por el puntaje real (ej: "4.9 ★").

## Datos de contacto

- WhatsApp / Teléfono: +56 9 8920 3902
- Email: innvolt.cl@gmail.com
- Instagram: @inn.volt

## Build de producción

```bash
npm run build
npm run start
```

## Despliegue

Recomendado **Vercel** (hosting nativo de Next.js; `public/_redirects` se ignora ahí).
En **Netlify** hay que usar `@netlify/plugin-nextjs`. No usar el fallback SPA `/* /index.html`
(rompe el SSR de Next).
