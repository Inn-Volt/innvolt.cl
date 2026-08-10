import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Sirve formatos modernos más livianos cuando el navegador los soporta.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
