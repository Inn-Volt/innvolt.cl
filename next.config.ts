import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sirve formatos modernos más livianos cuando el navegador los soporta.
    formats: ["image/avif", "image/webp"],
  },
  // Reenfoque Electricidad + Energía renovable: las líneas retiradas redirigen con 301.
  async redirects() {
    return [
      { source: "/camaras-cctv-santiago", destination: "/servicios", permanent: true },
      { source: "/control-de-acceso", destination: "/servicios", permanent: true },
      { source: "/redes-cableado-estructurado", destination: "/servicios", permanent: true },
      { source: "/pantallas-led", destination: "/servicios", permanent: true },
      // Domótica: la parte de gestión energética se absorbe en Eficiencia energética.
      { source: "/domotica-santiago", destination: "/eficiencia-energetica", permanent: true },
    ];
  },
};

export default nextConfig;
