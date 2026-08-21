import React from 'react';

const WAVE_PATH =
  'M0 34 Q180 10 360 34 T720 34 T1080 34 T1440 34 T1800 34 T2160 34 T2520 34 T2880 34 L2880 60 L0 60 Z';

export const WaveSeparator: React.FC = () => {
  return (
    <div className="wavesep">
      <svg className="w1" viewBox="0 0 2880 60" preserveAspectRatio="none">
        <path d={WAVE_PATH} fill="rgba(63,169,240,.07)" />
      </svg>
      <svg className="w2" viewBox="0 0 2880 60" preserveAspectRatio="none">
        <path d={WAVE_PATH} fill="rgba(140,211,255,.045)" />
      </svg>
    </div>
  );
};
