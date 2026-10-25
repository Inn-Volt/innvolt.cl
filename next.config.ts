import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sirve formatos modernos más livianos cuando el navegador los soporta.
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      // La línea tecnológica volvió a sus URLs originales; control de acceso se unió a CCTV.
      { source: "/control-de-acceso", destination: "/camaras-cctv-santiago", permanent: true },

      // Alias útiles
      { source: "/energia-solar", destination: "/paneles-solares-santiago", permanent: true },

      // Muestra de rediseño /v3 → rutas definitivas
      { source: "/v3", destination: "/", permanent: true },
      { source: "/v3/servicios/energia-solar", destination: "/paneles-solares-santiago", permanent: true },
      { source: "/v3/servicios/automatizacion", destination: "/domotica-santiago", permanent: true },
      { source: "/v3/servicios/cctv-control-acceso", destination: "/camaras-cctv-santiago", permanent: true },
      { source: "/v3/servicios/redes-tecnologia", destination: "/redes-cableado-estructurado", permanent: true },
      { source: "/v3/servicios/:slug", destination: "/:slug", permanent: true },
      { source: "/v3/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
