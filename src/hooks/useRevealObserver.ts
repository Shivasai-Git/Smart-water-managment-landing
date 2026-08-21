import { useEffect } from 'react';

export function useRevealObserver() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('in');

          if (entry.target.id === 'roadmap') {
            const phaseLine = document.getElementById('phaseLine');
            if (phaseLine) {
              phaseLine.style.width = '100%';
            }
          }

          const fills = entry.target.querySelectorAll('.fill');
          fills.forEach((fill) => fill.classList.add('in'));

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -6% 0px' }
    );

    const elements = document.querySelectorAll('.reveal, #roadmap');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);
}
