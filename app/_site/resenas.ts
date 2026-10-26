/* Formato de las reseñas que entrega /api/resenas (ver app/api/resenas/route.ts) */
export type Resena = {
  autor: string;
  autorUrl: string | null;
  foto: string | null;
  estrellas: number;
  cuando: string;
  texto: string;
  url: string;
};

export type Resenas = { ok: true; rating: number | null; total: number; url: string; resenas: Resena[] };
