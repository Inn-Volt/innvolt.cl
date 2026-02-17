import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Usamos Inter, una fuente más limpia para servicios de ingeniería
const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  title: "INNVOLT | Electricidad, Automatización y Control",
  description: "Especialistas en instalaciones eléctricas integrales, certificación SEC, domótica y redes de seguridad en Santiago de Chile.",
  keywords: ["electricidad", "automatización", "SEC", "TE1", "domótica", "cámaras de seguridad", "Chile"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}