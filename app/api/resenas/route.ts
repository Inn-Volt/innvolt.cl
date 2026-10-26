import { SITE } from '../../_site/content';
import type { Resena, Resenas } from '../../_site/resenas';

/*
  Reseñas de Google de la ficha de InnVolt (Places API New → Place Details).
  La clave va solo en el servidor: variable GOOGLE_PLACES_API_KEY en Netlify.
  Las políticas de Google no permiten guardar ni cachear reseñas: se piden en cada consulta (no-store).
  Para limitar el gasto, poner una cuota diaria a la API en Google Cloud.
*/
export const dynamic = 'force-dynamic';

const NO_STORE = { 'Cache-Control': 'no-store' };

type GReview = {
  rating?: number;
  relativePublishTimeDescription?: string;
  publishTime?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  googleMapsUri?: string;
  authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
};

export async function GET() {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  if (!key) return Response.json({ ok: false }, { status: 503, headers: NO_STORE });

  try {
    const r = await fetch(`https://places.googleapis.com/v1/places/${SITE.googlePlaceId}?languageCode=es&regionCode=CL`, {
      headers: { 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': 'rating,userRatingCount,reviews,googleMapsUri' },
      cache: 'no-store',
      signal: AbortSignal.timeout(6000),
    });
    if (!r.ok) return Response.json({ ok: false }, { status: 502, headers: NO_STORE });

    const d: { rating?: number; userRatingCount?: number; googleMapsUri?: string; reviews?: GReview[] } = await r.json();
    const url = d.googleMapsUri || SITE.googleProfile;
    const resenas: Resena[] = (d.reviews ?? [])
      .map(rv => ({
        autor: rv.authorAttribution?.displayName || 'Cliente de Google',
        autorUrl: rv.authorAttribution?.uri || null,
        foto: rv.authorAttribution?.photoUri || null,
        estrellas: Math.round(rv.rating ?? 0),
        cuando: rv.relativePublishTimeDescription || '',
        texto: (rv.originalText?.text || rv.text?.text || '').trim(),
        url: rv.googleMapsUri || url,
      }))
      .filter(rv => rv.texto);

    const body: Resenas = { ok: true, rating: d.rating ?? null, total: d.userRatingCount ?? 0, url, resenas };
    return Response.json(body, { headers: NO_STORE });
  } catch {
    return Response.json({ ok: false }, { status: 502, headers: NO_STORE });
  }
}
