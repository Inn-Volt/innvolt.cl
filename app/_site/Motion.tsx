'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/*
  Aparición suave al hacer scroll: títulos, tarjetas, preguntas y la banda final.
  Solo anima lo que está bajo el pliegue al cargar (lo visible nunca se oculta),
  sin JS o con "reducir movimiento" todo se ve normal, y al terminar se quitan las
  clases para que el hover de las tarjetas vuelva a su velocidad.
*/
const SEL = '.iv-head, .iv-group-title, .iv-card, .iv-faq details, .iv-ctaband .iv-container > *, .iv-nos > *';

export default function Motion() {
  const path = usePathname();

  useEffect(() => {
    if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        const el = e.target as HTMLElement;
        io.unobserve(el);
        el.classList.add('iv-in');
        const done = (ev: TransitionEvent) => {
          if (ev.target !== el) return;                          // ignorar transiciones de elementos internos
          el.removeEventListener('transitionend', done);
          el.classList.remove('iv-rv', 'iv-in');
          el.style.removeProperty('--iv-d');
        };
        el.addEventListener('transitionend', done);
      }
    }, { rootMargin: '0px 0px -8% 0px' });

    const start = () => {
    const fold = window.innerHeight * 0.95;
    document.querySelectorAll<HTMLElement>(`main :is(${SEL})`).forEach(el => {
      if (el.parentElement?.closest(SEL)) return;               // no animar dentro de algo que ya se anima
      if (el.getBoundingClientRect().top < fold) return;        // ya visible al cargar
      const sibs = Array.from(el.parentElement?.children ?? []).filter(c => c.matches(SEL));
      el.style.setProperty('--iv-d', `${(Math.max(0, sibs.indexOf(el)) % 4) * 80}ms`);
      el.classList.add('iv-rv');
      io.observe(el);
    });
    };

    // Después de la carga inicial, para no competir con lo que se ve primero
    const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1));
    const cic = window.cancelIdleCallback ?? window.clearTimeout;
    const id = ric(start, { timeout: 600 });

    return () => { cic(id); io.disconnect(); };
  }, [path]);

  return null;
}
