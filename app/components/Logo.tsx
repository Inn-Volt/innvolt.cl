import Image from 'next/image';

const RATIO = 500 / 206; // proporción real del logo

/* Logo de marca InnVolt (imagen con fondo transparente) */
export default function Logo({ height = 36 }: { height?: number }) {
  return (
    <Image
      src="/innvolt.png"
      alt="InnVolt"
      width={Math.round(height * RATIO)}
      height={height}
      priority
      style={{ height, width: 'auto', display: 'block' }}
    />
  );
}
