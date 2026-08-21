import React from 'react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ isOpen, onClose }) => {
  return (
    <nav
      id="mobileNav"
      data-open={isOpen ? 'true' : 'false'}
      className="lg:hidden absolute top-full inset-x-0 glass border-b border-white/8 px-5 py-5"
      aria-label="Mobile navigation"
    >
      <div className="max-w-shell mx-auto grid gap-1 font-mono text-[11px] tracking-[.14em] uppercase text-steel">
        <a href="#cost" onClick={onClose} className="py-3 border-b border-white/8 hover:text-mist">
          The cost
        </a>
        <a href="#system" onClick={onClose} className="py-3 border-b border-white/8 hover:text-mist">
          The system
        </a>
        <a href="#loop" onClick={onClose} className="py-3 border-b border-white/8 hover:text-mist">
          How it flows
        </a>
        <a href="#tracks" onClick={onClose} className="py-3 border-b border-white/8 hover:text-mist">
          Two tracks
        </a>
        <a href="#roadmap" onClick={onClose} className="py-3 hover:text-mist">
          Roadmap
        </a>
        <a
          href="#close"
          onClick={onClose}
          className="mt-3 inline-flex justify-center px-5 py-3 rounded-full bg-aqua text-ink font-medium"
        >
          See the whole system
        </a>
      </div>
    </nav>
  );
};
