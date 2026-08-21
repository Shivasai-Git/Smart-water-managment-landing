import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/8">
      <div className="max-w-shell mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-aqua"></span>
          <span className="font-display font-semibold text-sm">Smart Water Flow</span>
        </div>
        <p className="font-mono text-[10px] tracking-[.16em] uppercase text-steel/70">
          Quality thresholds referenced to the national drinking water standard
        </p>
      </div>
    </footer>
  );
};
