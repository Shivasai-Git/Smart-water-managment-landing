import React from 'react';

interface StreamNodeProps {
  ratio: string | number;
  className?: string;
}

export const StreamNode: React.FC<StreamNodeProps> = ({ ratio, className = '' }) => {
  return <div data-node={String(ratio)} className={`absolute ${className}`} />;
};
