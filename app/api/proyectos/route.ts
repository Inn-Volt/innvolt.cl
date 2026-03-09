import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const adminKey  = req.headers.get('x-admin-key');
  const isAdmin   = adminKey === process.env.ADMIN_PASSWORD;
  const categoria = searchParams.get('categoria');

  let query = supabase.from('proyectos').select('*').order('created_at', { ascending: false });
  if (!isAdmin) query = query.eq('activo', true);
  if (categoria && categoria !== 'Todos') query = query.eq('categoria', categoria);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const adminKey = req.headers.get('x-admin-key');
  if (adminKey !== process.env.ADMIN_PASSWORD)
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });

  const body = await req.json();
  const { data, error } = await supabase.from('proyectos').insert([body]).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data, { status: 201 });
}
