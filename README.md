<<<<<<< HEAD
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
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> 60c11a8cb62944ae79e5955fccc63ad6b8e1d0e1
