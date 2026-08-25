import React from 'react';

export const IndustrialBackground: React.FC = () => {
  return (
    <div
      id="industrial-bg"
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transform-gpu"
    >
      {/* Precision Engineered Base Gradient: #031014 -> #061B21 -> #020A0D */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #031014 0%, #061B21 28%, #031014 62%, #020A0D 100%)',
        }}
      />

      {/* Engineered Technical Blueprint Grid: 48px Fine Grid (Zero-cost CSS pattern) */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(24, 191, 242, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(24, 191, 242, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Controlled Soft Local Lighting (Pure CSS radial gradients, NO expensive blurs) */}
      <div
        className="absolute w-[600px] h-[600px] top-[10%] right-[-100px] lg:right-[8%] rounded-full opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(24,191,242,0.3) 0%, rgba(8,126,168,0.12) 45%, transparent 70%)',
        }}
      />

      <div
        className="absolute w-[500px] h-[500px] top-[60%] left-[-80px] rounded-full opacity-15 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(8,126,168,0.25) 0%, rgba(3,16,20,0.1) 60%, transparent 75%)',
        }}
      />
    </div>
  );
};
