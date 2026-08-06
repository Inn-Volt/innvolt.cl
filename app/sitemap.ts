import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://innvolt.cl',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://innvolt.cl/#servicios',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
<<<<<<< HEAD
      url: 'https://innvolt.cl/electricista-santiago',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://innvolt.cl/camaras-cctv-santiago',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://innvolt.cl/domotica-santiago',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://innvolt.cl/urgencias-electricas-santiago',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: 'https://innvolt.cl/#nosotros',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: 'https://innvolt.cl/#faq',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
=======
      url: 'https://innvolt.cl/#proyectos',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
>>>>>>> 60c11a8cb62944ae79e5955fccc63ad6b8e1d0e1
    },
    {
      url: 'https://innvolt.cl/#contacto',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
