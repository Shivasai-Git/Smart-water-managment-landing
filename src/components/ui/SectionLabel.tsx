import React from 'react';

interface SectionLabelProps {
  children: React.ReactNode;
  color?: 'aqua' | 'saffron' | 'steel';
  className?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ children, color = 'aqua', className = '' }) => {
  const textColor = color === 'saffron' ? 'text-saffron' : color === 'steel' ? 'text-steel' : 'text-aqua';

  return (
    <p className={`font-mono text-[11px] tracking-[.2em] uppercase ${textColor} mb-5 ${className}`}>
      {children}
    </p>
  );
};
