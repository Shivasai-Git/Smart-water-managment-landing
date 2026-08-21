import React, { type ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: string;
}

export const Reveal: React.FC<RevealProps> = ({ children, className = '', id, delay }) => {
  return (
    <div
      id={id}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: delay } : undefined}
    >
      {children}
    </div>
  );
};
