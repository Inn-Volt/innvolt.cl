export type Categoria = 'Electricidad' | 'Domótica' | 'Redes y CCTV';

export interface Proyecto {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: Categoria;
  ubicacion: string;
  imagenes: string[];   // array de URLs
  destacado: boolean;
  activo: boolean;
  created_at?: string;
}
