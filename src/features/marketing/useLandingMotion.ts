import { useEffect } from 'react';

/** Scroll-triggered reveals for landing sections, with staggered grid children. */
export function useLandingMotion() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>('.stitch-landing main section'));
    const targets: HTMLElement[] = [];
    sections.forEach((sec) => {
      sec.classList.add('reveal');
      targets.push(sec);
      sec.querySelectorAll<HTMLElement>('.grid').forEach((grid) => {
        Array.from(grid.children).forEach((child, i) => {
          const el = child as HTMLElement;
          el.classList.add('reveal-child');
          el.style.setProperty('--reveal-delay', `${Math.min(i, 6) * 80}ms`);
        });
      });
    });
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' },
    );
    targets.forEach((t) => io.observe(t));
    return () => {
      io.disconnect();
      sections.forEach((sec) => {
        sec.classList.remove('reveal', 'is-visible');
        sec.querySelectorAll('.reveal-child').forEach((c) => c.classList.remove('reveal-child'));
      });
    };
  }, []);
}
