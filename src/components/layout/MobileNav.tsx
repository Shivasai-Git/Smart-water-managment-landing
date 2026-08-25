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
      className="lg:hidden absolute top-full inset-x-0 bg-[#031014]/95 backdrop-blur-lg border-b border-white/10 px-5 py-5"
      aria-label="Mobile navigation"
    >
      <div className="max-w-shell mx-auto grid gap-1 font-mono text-[11px] tracking-[.14em] uppercase text-steel">
        <a
          href="#problem"
          onClick={onClose}
          className="py-3 border-b border-white/8 hover:text-mist"
        >
          The Problem
        </a>
        <a
          href="#how-it-works"
          onClick={onClose}
          className="py-3 border-b border-white/8 hover:text-mist"
        >
          How It Works
        </a>
        <a
          href="#capabilities"
          onClick={onClose}
          className="py-3 border-b border-white/8 hover:text-mist"
        >
          Capabilities
        </a>
        <a
          href="#dashboard"
          onClick={onClose}
          className="py-3 border-b border-white/8 hover:text-mist"
        >
          Dashboard
        </a>
        <a
          href="#audience"
          onClick={onClose}
          className="py-3 hover:text-mist"
        >
          Who It Is For
        </a>
        <a
          href="#capabilities"
          onClick={onClose}
          className="mt-3 inline-flex justify-center px-5 py-3 rounded-full bg-aqua text-ink font-medium shadow-[0_0_15px_rgba(24,191,242,0.3)]"
        >
          Explore the System
        </a>
      </div>
    </nav>
  );
};
