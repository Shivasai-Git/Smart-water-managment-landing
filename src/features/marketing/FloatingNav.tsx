import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const LINKS = [
  { id: 'top', label: 'Overview' },
  { id: 'interactive-preview', label: 'Live Preview' },
  { id: 'features', label: 'Features' },
  { id: 'topology', label: 'Topology' },
  { id: 'comparison', label: 'Compare' },
  { id: 'contact', label: 'Contact' },
];

/** Floating glass pill nav with a sliding active indicator and scroll-spy. */
export default function FloatingNav() {
  const [active, setActive] = useState('top');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [pill, setPill] = useState({ left: 0, width: 0 });
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
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

  useEffect(() => {
    const measure = () => {
      const el = listRef.current?.querySelector<HTMLElement>(`[data-nav="${active}"]`)?.parentElement;
      if (el) setPill({ left: el.offsetLeft, width: el.offsetWidth });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [active]);

  const go = (id: string) => {
    setOpen(false);
    if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-3 inset-x-0 z-50 px-3 sm:px-6 pointer-events-none">
      <div
        className={`pointer-events-auto mx-auto max-w-6xl rounded-[28px] border border-white/70 bg-surface/80 backdrop-blur-xl transition-shadow duration-300 ${
          scrolled ? 'shadow-[0_10px_40px_rgba(0,0,0,0.10)]' : 'shadow-[0_2px_12px_rgba(0,0,0,0.05)]'
        }`}
      >
        <div className="flex items-center justify-between gap-3 h-14 pl-3 pr-2">
          <Link className="flex items-center gap-2 group shrink-0" to="/" onClick={() => go('top')}>
            <span className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center group-hover:scale-95 transition-transform">
              <span className="material-symbols-outlined text-[20px]">water_drop</span>
            </span>
            <span className="hidden sm:flex flex-col leading-none">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight">SMART WATER FLOW</span>
              <span className="font-label-uppercase text-label-uppercase text-secondary tracking-widest mt-1">
                RESIDENTIAL MVP • PROTOTYPE
              </span>
            </span>
          </Link>

          <nav aria-label="Page sections" className="hidden lg:block">
            <ul ref={listRef} className="relative flex items-center rounded-full bg-surface-container/70 p-1">
              <span
                aria-hidden
                className="absolute top-1 bottom-1 rounded-full bg-primary shadow-md transition-all duration-300 ease-out"
                style={{ left: pill.left, width: pill.width }}
              />
              {LINKS.map((l) => (
                <li key={l.id} className="relative">
                  <button
                    data-nav={l.id}
                    onClick={() => go(l.id)}
                    aria-current={active === l.id ? 'true' : undefined}
                    className={`relative px-4 py-1.5 rounded-full font-label-button text-label-button transition-colors duration-300 ${
                      active === l.id ? 'text-on-primary' : 'text-on-surface-variant hover:text-primary'
                    }`}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="inline-flex px-5 py-2 rounded-full font-label-button text-label-button bg-primary text-on-primary hover:bg-primary-container active:scale-[0.97] transition-all whitespace-nowrap"
            >
              Sign In
            </Link>
            <button
              className="lg:hidden w-10 h-10 rounded-full bg-surface-container flex items-center justify-center"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((o) => !o)}
            >
              <span className="material-symbols-outlined">{open ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>

        <div
          className={`lg:hidden grid transition-[grid-template-rows,opacity] duration-300 ease-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 pointer-events-none'}`}
          aria-hidden={!open}
        >
          <ul className="min-h-0 overflow-hidden px-3">
            {LINKS.map((l) => (
              <li key={l.id}>
                <button
                  onClick={() => go(l.id)}
                  className={`w-full text-left px-4 py-3 rounded-2xl font-label-button text-label-button ${
                    active === l.id ? 'bg-primary text-on-primary' : 'text-on-surface hover:bg-surface-container'
                  }`}
                >
                  {l.label}
                </button>
              </li>
            ))}
            <li className="h-2" />
          </ul>
        </div>
      </div>
    </header>
  );
}
