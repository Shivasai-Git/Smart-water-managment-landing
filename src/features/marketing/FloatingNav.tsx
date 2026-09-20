import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import StaggeredMenu from '@/components/ui/StaggeredMenu';

const LINKS = [
  { id: 'top', label: 'Overview' },
  { id: 'interactive-preview', label: 'Live Preview' },
  { id: 'features', label: 'Features' },
  { id: 'topology', label: 'Topology' },
  { id: 'comparison', label: 'Compare' },
  { id: 'contact', label: 'Contact' },
];

/** Floating glass bar + staggered slide-in menu (all breakpoints) with scroll-spy. */
export default function FloatingNav() {
  const [active, setActive] = useState('top');

  useEffect(() => {
    const onScroll = () => {
      const probe = window.scrollY + window.innerHeight * 0.35;
      let current = 'top';
      for (const { id } of LINKS) {
        const el = id === 'top' ? null : document.getElementById(id);
        if (el && el.offsetTop <= probe) current = id;
      }
      setActive(current);
    };
    let frame = 0;
    const onScrollThrottled = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        onScroll();
      });
    };
    onScroll();
    window.addEventListener('scroll', onScrollThrottled, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScrollThrottled);
    };
  }, []);

  const go = (id: string) => {
    if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>

    <StaggeredMenu
      position="right"
      colors={['#e5e1e4', '#006c49']}
      accentColor="#006c49"
      items={LINKS.map((l) => ({
        label: l.label,
        ariaLabel: `Go to ${l.label}`,
        link: `#${l.id}`,
        active: active === l.id,
        onSelect: () => go(l.id),
      }))}
      logo={
        <Link className="flex items-center gap-2" to="/" onClick={() => go('top')} aria-label="Smart Water Flow home">
          <span className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">water_drop</span>
          </span>
          <span className="font-headline-sm text-headline-sm text-primary tracking-tight truncate">SMART WATER FLOW</span>
        </Link>
      }
      actions={
        <Link
          to="/login"
          className="inline-flex items-center min-h-[44px] px-5 rounded-full font-label-button text-label-button bg-primary text-on-primary hover:bg-primary-container active:scale-[0.97] transition-all whitespace-nowrap"
        >
          Sign In
        </Link>
      }
      footer={
        <Link to="/login" className="sm-cta">
          Sign In
        </Link>
      }
    />
    </>
  );
}
