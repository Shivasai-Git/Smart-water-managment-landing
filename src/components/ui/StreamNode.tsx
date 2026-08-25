import React from 'react';
import type { PipeNode } from '../../lib/industrialPipes';

interface StreamNodeProps {
  node?: PipeNode;
  ratio?: string | number;
  className?: string;
}

export const StreamNode: React.FC<StreamNodeProps> = ({ node, ratio, className = '' }) => {
  if (!node) {
    return <div data-node={String(ratio)} className={`absolute ${className}`} />;
  }

  const isActive = node.status === 'active';

  return (
    <div
      id={node.id}
      className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none select-none z-[5] ${className}`}
      style={{ left: `${node.x}px`, top: `${node.y}px` }}
    >
      {/* Sensor / Pump Center Pulse Puck */}
      <div className="relative flex items-center justify-center">
        <div
          className={`w-3.5 h-3.5 rounded-full border ${
            isActive
              ? 'bg-aqua/20 border-aqua text-aqua shadow-[0_0_8px_#18bff2]'
              : 'bg-[#061B21] border-steel/40 text-steel'
          }`}
        />
        {isActive && (
          <div className="absolute inset-0 rounded-full bg-aqua/40 animate-ping" />
        )}
      </div>

      {/* Floating Precision Label */}
      <div className="hidden md:flex flex-col bg-[#041419]/90 border border-white/10 rounded-md px-2 py-0.5 backdrop-blur-sm shadow-md">
        <span className="font-mono text-[9px] uppercase tracking-[.14em] text-mist font-semibold">
          {node.label}
        </span>
        {node.sublabel && (
          <span className="font-mono text-[7.5px] uppercase tracking-wider text-steel/70">
            {node.sublabel}
          </span>
        )}
      </div>
    </div>
  );
};
