'use client';

import { useEffect } from 'react';

/*
  Animación de aparición al hacer scroll para toda la página.
  - Usa estilos INLINE (ganan a cualquier conflicto de cascada/capas de Tailwind).
  - Solo oculta lo que está BAJO el fold; lo visible al cargar no se toca (sin parpadeo).
  - SEO-safe: sin JS el contenido queda visible.
  - Respeta prefers-reduced-motion.
*/

const SELECTORS = [
  '.section .container > *',
  '.trust-band-item',
  '.urgent-band .urgent-inner',
  '.tile-grid > *',
  '.services-grid > *',
  '.guarantees-grid > *',
  '.compare-card',
].join(',');

const EASE = 'cubic-bezier(0.16, 1, 0.3, 1)';

export default function ScrollReveal() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const nodes = Array.from(document.querySelectorAll<HTMLElement>(SELECTORS)).filter(
      (el) => !el.closest('.hero') && !el.closest('nav') && !el.closest('footer')
    );

    const vh = window.innerHeight;
    const foldLine = vh * 0.9;
    const toReveal: HTMLElement[] = [];

    nodes.forEach((el) => {
      // Lo que ya está visible al cargar se deja tal cual.
      if (el.getBoundingClientRect().top < foldLine) return;

      let delay = 0;
      const parent = el.parentElement;
      if (parent) {
        const i = Array.from(parent.children).indexOf(el);
        if (i > 0) delay = Math.min(i, 6) * 70;
      }
      el.style.opacity = '0';
      el.style.transform = 'translateY(26px)';
      el.style.transition = `opacity 0.7s ${EASE} ${delay}ms, transform 0.7s ${EASE} ${delay}ms`;
      el.style.willChange = 'opacity, transform';
      toReveal.push(el);
    });

    const reveal = (el: HTMLElement) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            reveal(e.target as HTMLElement);
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    toReveal.forEach((el) => io.observe(el));

    // Failsafe: si algo queda oculto tras 4s (observer no disparó), revelar.
    const failsafe = window.setTimeout(() => {
      toReveal.forEach((el) => {
        if (el.style.opacity === '0') reveal(el);
      });
    }, 4000);

    return () => {
      io.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  return null;
}
