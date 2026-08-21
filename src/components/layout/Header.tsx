import React from 'react';
import { useMobileNav } from '../../hooks/useMobileNav';
import { MobileNav } from './MobileNav';

export const Header: React.FC = () => {
  const { isOpen, toggle, close } = useMobileNav();

  return (
    <header className="fixed top-0 inset-x-0 z-50 glass border-b border-white/5">
      <div className="nav-shell max-w-shell mx-auto px-6 h-16 flex items-center justify-between gap-3">
        <a href="#top" className="flex items-center gap-2.5">
          <span className="relative w-2.5 h-2.5 rounded-full bg-aqua">
            <span className="absolute inset-0 rounded-full bg-aqua animate-ping opacity-60"></span>
          </span>
          <span className="brand-label font-display font-semibold tracking-tight text-[15px] whitespace-nowrap">
            Smart Water Flow
          </span>
        </a>
        <nav className="hidden lg:flex items-center gap-7 font-mono text-[11px] tracking-[.14em] uppercase text-steel">
          <a href="#cost" className="hover:text-mist transition-colors">
            The cost
          </a>
          <a href="#system" className="hover:text-mist transition-colors">
            The system
          </a>
          <a href="#loop" className="hover:text-mist transition-colors">
            How it flows
          </a>
          <a href="#tracks" className="hover:text-mist transition-colors">
            Two tracks
          </a>
          <a href="#roadmap" className="hover:text-mist transition-colors">
            Roadmap
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="#close"
            className="hidden sm:inline-flex font-mono text-[11px] tracking-[.12em] uppercase px-4 py-2 rounded-full bg-aqua text-ink font-medium hover:bg-mist transition-colors"
          >
            See the system
          </a>
          <button
            id="menuBtn"
            type="button"
            className="lg:hidden w-10 h-10 rounded-full border border-white/15 flex flex-col items-center justify-center gap-1.5 hover:border-aqua/60 transition-colors"
            aria-expanded={isOpen}
            aria-controls="mobileNav"
            aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
            onClick={toggle}
          >
            <span className="menu-line block w-4 h-px bg-mist"></span>
            <span className="menu-line block w-4 h-px bg-mist"></span>
          </button>
        </div>
      </div>
      <MobileNav isOpen={isOpen} onClose={close} />
    </header>
  );
};
