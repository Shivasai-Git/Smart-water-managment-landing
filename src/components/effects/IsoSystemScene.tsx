import React, { useMemo, useRef, useEffect, useCallback } from 'react';
import { buildIsoSvgContent } from '../../lib/isoSceneBuilder';
import { useScrollTick } from '../../hooks/useScrollTick';

export const IsoSystemScene: React.FC = () => {
  const svgHtml = useMemo(() => buildIsoSvgContent(), []);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const shownRef = useRef(false);
  const fillRef = useRef(0);
  const lastRef = useRef(-1);
  const wTopRef = useRef(0);
  const wHRef = useRef(1);

  const measure = useCallback(() => {
    if (!wrapRef.current) return;
    const r = wrapRef.current.getBoundingClientRect();
    wTopRef.current = r.top + window.scrollY;
    wHRef.current = r.height || 1;
  }, []);

  const fitIsoView = useCallback(() => {
    const iso = document.getElementById('iso');
    if (!iso) return;
    const mobile = window.innerWidth < 640;
    iso.setAttribute('viewBox', mobile ? '260 20 520 650' : '0 0 1120 820');
    iso.setAttribute('preserveAspectRatio', 'xMidYMid meet');
  }, []);

  useEffect(() => {
    fitIsoView();
    measure();

    const handleResize = () => {
      setTimeout(() => {
        fitIsoView();
        measure();
      }, 160);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [fitIsoView, measure]);

  const updateFill = useCallback(() => {
    if (!wrapRef.current) return;

    const top = wTopRef.current - window.scrollY;
    const vh = window.visualViewport?.height || window.innerHeight;

    if (top < vh * 0.9 && !shownRef.current) {
      shownRef.current = true;
      wrapRef.current.classList.add('on');
      const bars = Array.from(document.querySelectorAll<HTMLElement>('#iso .bar'));
      bars.forEach((b, i) => {
        const h = [26, 38, 15, 32][i];
        setTimeout(() => {
          b.setAttribute('y', String(520 + 170 - h));
          b.setAttribute('height', String(h));
        }, 1000 + i * 130);
      });
    }

    const travel = Math.max(vh * 0.52, Math.min(wHRef.current * 0.72, vh * 0.78));
    const fill = Math.max(0, Math.min(1, (vh * 0.88 - top) / travel));
    fillRef.current = fill;

    if (Math.abs(fill - lastRef.current) < 0.0015) return;
    lastRef.current = fill;

    const botY = 420 + (2.3 + 2.3) * 15 - 7.5 * 30 - 6;
    const topY = 420 + (2.3 + 2.3) * 15 - 11.3 * 30 + 11;

    const y = botY - fill * (botY - topY);

    const wR = document.getElementById('wRect');
    const wR2 = document.getElementById('wRect2');
    const wS = document.getElementById('wSurf');
    const wRip = document.getElementById('wRipple');
    const gauge = document.getElementById('gauge');
    const gTxt = document.getElementById('gaugeTxt');
    const read = document.getElementById('fillRead');
    const mobilePct = document.getElementById('mobileTankPct');

    if (wR) {
      wR.setAttribute('y', y.toFixed(1));
      wR.setAttribute('height', (botY - y + 70).toFixed(1));
    }
    if (wR2) {
      wR2.setAttribute('y', (y + 3).toFixed(1));
      wR2.setAttribute('height', Math.max(0, botY - y + 67).toFixed(1));
    }
    if (wS) {
      wS.setAttribute('cy', y.toFixed(1));
      wS.setAttribute('opacity', fill > 0.015 ? '0.92' : '0');
    }
    if (wRip) {
      wRip.setAttribute('cy', y.toFixed(1));
      wRip.style.opacity = fill > 0.02 && fill < 0.995 ? '1' : '0';
    }

    const pct = Math.round(fill * 100);
    if (gauge) {
      gauge.style.strokeDashoffset = String(119.4 - 119.4 * fill);
    }
    if (gTxt) gTxt.textContent = pct + '%';
    if (mobilePct) mobilePct.textContent = pct + '%';
    if (read) {
      read.textContent = pct >= 99 ? 'Tank 100% — pump stopped automatically' : `Tank ${pct}% — filling`;
    }
  }, []);

  useScrollTick(updateFill);

  return (
    <div id="isoWrap" ref={wrapRef} className="mt-16 md:mt-24">
      <div id="tankInlet" style={{ position: 'absolute', left: '46.4%', top: '18.3%', width: '1px', height: '1px' }} />
      <div
        id="mobileTankBadge"
        className="hidden absolute top-3 right-2 z-20 items-center gap-2 rounded-full border border-aqua/30 bg-ink/90 px-3 py-2 font-mono text-[10px] tracking-[.12em] uppercase text-steel shadow-lg"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-aqua animate-pulse"></span>
        <span>Tank</span>
        <strong id="mobileTankPct" className="text-aqua text-xs">
          0%
        </strong>
      </div>
      <svg
        id="iso"
        viewBox="0 0 1120 820"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Isometric cutaway of a building showing tank level sensor, pump controller, leak detector, geyser monitor, RO and quality sensor, IoT hub and mobile app connected as one system"
        dangerouslySetInnerHTML={{ __html: svgHtml }}
      />
      <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-6 font-mono text-[10px] tracking-[.16em] uppercase text-steel/70">
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-aqua"></span>Water
        </span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-saffron"></span>Wireless link
        </span>
        <span id="fillRead">Tank 0% — scroll to fill</span>
      </div>
      <div
        className="sm:hidden mt-7 grid grid-cols-2 gap-2 px-1 font-mono text-[9px] tracking-[.08em] uppercase text-steel/80"
        aria-label="System components"
      >
        <span className="panel rounded-lg px-3 py-2.5">Tank sensor</span>
        <span className="panel rounded-lg px-3 py-2.5">Pump control</span>
        <span className="panel rounded-lg px-3 py-2.5">Leak detector</span>
        <span className="panel rounded-lg px-3 py-2.5">Geyser monitor</span>
        <span className="panel rounded-lg px-3 py-2.5">RO &amp; quality</span>
        <span className="panel rounded-lg px-3 py-2.5">IoT hub</span>
        <span className="panel rounded-lg px-3 py-2.5 col-span-2 text-center">One mobile app</span>
      </div>
    </div>
  );
};
