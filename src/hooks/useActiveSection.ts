import { useState, useEffect } from 'react';

export type SectionState =
  | 'hero'
  | 'problem'
  | 'how-it-works'
  | 'capabilities'
  | 'dashboard'
  | 'audience'
  | 'vision';

export function useActiveSection(): SectionState {
  const [activeSection, setActiveSection] = useState<SectionState>('hero');

  useEffect(() => {
    const sectionIds: { id: string; state: SectionState }[] = [
      { id: 'top', state: 'hero' },
      { id: 'problem', state: 'problem' },
      { id: 'how-it-works', state: 'how-it-works' },
      { id: 'capabilities', state: 'capabilities' },
      { id: 'dashboard', state: 'dashboard' },
      { id: 'audience', state: 'audience' },
      { id: 'vision', state: 'vision' },
    ];

    const observers: IntersectionObserver[] = [];

    sectionIds.forEach(({ id, state }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(state);
            }
          });
        },
        {
          rootMargin: '-30% 0px -40% 0px',
          threshold: 0.1,
        }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return activeSection;
}
