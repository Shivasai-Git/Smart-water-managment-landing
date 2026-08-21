import React, { type ReactNode } from 'react';
import { useTilt } from '../../hooks/useTilt';

interface TiltPanelProps {
  children: ReactNode;
  className?: string;
  id?: string;
  delay?: string;
}

export const TiltPanel: React.FC<TiltPanelProps> = ({ children, className = '', id, delay }) => {
  const tiltHandlers = useTilt();

  return (
    <div
      id={id}
      className={`tilt reveal panel ${className}`}
      style={delay ? { transitionDelay: delay } : undefined}
      {...tiltHandlers}
    >
      {children}
    </div>
  );
};
