import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type Proyecto = {
  titulo: string;
  categoria: string;
  descripcion: string;
  imagen: string;
  ubicacion?: string;
  video_url?: string;
  slug: string;
};

export function getProyectos(): Proyecto[] {
  const folder = path.join(process.cwd(), 'content/proyectos');

  if (!fs.existsSync(folder)) return [];

  const files = fs.readdirSync(folder).filter(f => f.endsWith('.md'));

  return files.map(filename => {
    const raw = fs.readFileSync(path.join(folder, filename), 'utf-8');
    const { data } = matter(raw);
    return {
      titulo:      data.titulo      || '',
      categoria:   data.categoria   || '',
      descripcion: data.descripcion || '',
      imagen:      data.imagen      || '',
      ubicacion:   data.ubicacion   || '',
      video_url:   data.video_url   || '',
      slug:        filename.replace('.md', ''),
    };
  });
}

export function getTestimonios() {
  const folder = path.join(process.cwd(), 'content/testimonios');

  if (!fs.existsSync(folder)) return [];

  const files = fs.readdirSync(folder).filter(f => f.endsWith('.md'));

  return files.map(filename => {
    const raw = fs.readFileSync(path.join(folder, filename), 'utf-8');
    const { data } = matter(raw);
    return {
      nombre:     data.nombre     || '',
      empresa:    data.empresa    || '',
      testimonio: data.testimonio || '',
      estrellas:  data.estrellas  || 5,
      slug:       filename.replace('.md', ''),
    };
  });
}