import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/8 bg-[#020A0D]">
      <div className="max-w-shell mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-aqua shadow-[0_0_8px_#18bff2]" />
          <span className="font-display font-semibold text-sm text-mist">Smart Water Flow</span>
        </div>
        <p className="font-mono text-[10px] tracking-[.14em] uppercase text-steel/70 text-center sm:text-right">
          Intelligent Water Monitoring & Automation Platform · 2026
        </p>
      </div>
    </footer>
  );
};
