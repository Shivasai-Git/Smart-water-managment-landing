import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
type Gsap = (typeof import('gsap'))['gsap'];
type Timeline = ReturnType<Gsap['timeline']>;
type Tween = ReturnType<Gsap['to']>;

// GSAP is only needed once the menu is opened, so it stays out of the landing bundle until then.
let gsap: Gsap;
let gsapLoading: Promise<Gsap> | null = null;
const loadGsap = () => (gsapLoading ??= import('gsap').then((m) => (gsap = m.gsap)));
import './StaggeredMenu.css';

export interface StaggeredMenuItem {
  label: string;
  ariaLabel?: string;
  /** Href for a real link; omit when `onSelect` handles navigation. */
  link?: string;
  active?: boolean;
  onSelect?: () => void;
}

export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}

interface StaggeredMenuProps {
  position?: 'left' | 'right';
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logo?: ReactNode;
  accentColor?: string;
  closeOnClickAway?: boolean;
  /** Extra content rendered under the list (e.g. a primary CTA). */
  footer?: ReactNode;
  /** Shown in the bar next to the toggle while the menu is closed. */
  actions?: ReactNode;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function StaggeredMenu({
  position = 'right',
  colors = ['#B497CF', '#5227FF'],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logo,
  accentColor = '#5227FF',
  closeOnClickAway = true,
  footer,
  actions,
  onMenuOpen,
  onMenuClose,
}: StaggeredMenuProps) {
  const [open, setOpen] = useState(false);
  const [textLines, setTextLines] = useState(['Menu', 'Close']);
  const openRef = useRef(false);
  const panelRef = useRef<HTMLElement>(null);
  const preLayersRef = useRef<HTMLDivElement>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);
  const plusHRef = useRef<HTMLSpanElement>(null);
  const plusVRef = useRef<HTMLSpanElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const textInnerRef = useRef<HTMLSpanElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const openTlRef = useRef<Timeline | null>(null);
  const closeTweenRef = useRef<Tween | null>(null);
  const spinTweenRef = useRef<Tween | null>(null);
  const textCycleAnimRef = useRef<Tween | null>(null);

  const offscreen = position === 'left' ? -100 : 100;

  const initForRef = useRef<number | null>(null);

  // Mirrors the CSS resting state onto GSAP so its transforms take over cleanly.
  const initGsapState = useCallback(() => {
    if (initForRef.current === offscreen) return;
    const panel = panelRef.current;
    const preContainer = preLayersRef.current;
    if (!panel || !plusHRef.current || !plusVRef.current || !iconRef.current || !textInnerRef.current) return;
    initForRef.current = offscreen;

    preLayerElsRef.current = preContainer ? Array.from(preContainer.querySelectorAll<HTMLElement>('.sm-prelayer')) : [];
    gsap.set([panel, ...preLayerElsRef.current], { x: 0, xPercent: offscreen, opacity: 1 });
    if (preContainer) gsap.set(preContainer, { xPercent: 0, opacity: 1 });
    gsap.set(plusHRef.current, { transformOrigin: '50% 50%', rotate: 0 });
    gsap.set(plusVRef.current, { transformOrigin: '50% 50%', rotate: 90 });
    gsap.set(iconRef.current, { rotate: 0, transformOrigin: '50% 50%' });
    gsap.set(textInnerRef.current, { yPercent: 0 });
  }, [offscreen]);

  // Warm the GSAP chunk shortly after load (also triggered by the first hint of interaction).
  useEffect(() => {
    const id = window.setTimeout(() => void loadGsap(), 5000);
    return () => clearTimeout(id);
  }, []);

  const resetPanelContent = useCallback(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const itemEls = panel.querySelectorAll('.sm-panel-itemLabel');
    const numberEls = panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item');
    const extras = panel.querySelectorAll('.sm-socials-title, .sm-socials-link, .sm-footer');
    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 });
    if (extras.length) gsap.set(extras, { y: 25, opacity: 0 });
  }, []);

  const playOpen = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    openTlRef.current?.kill();
    closeTweenRef.current?.kill();
    closeTweenRef.current = null;

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
    const numberEls = Array.from(panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item'));
    const extras = Array.from(panel.querySelectorAll('.sm-socials-title, .sm-socials-link, .sm-footer'));

    resetPanelContent();

    const tl = gsap.timeline();
    layers.forEach((el, i) => {
      tl.fromTo(el, { xPercent: offscreen }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
    });
    const panelInsertTime = layers.length ? (layers.length - 1) * 0.07 + 0.08 : 0;
    const panelDuration = 0.65;
    tl.fromTo(panel, { xPercent: offscreen }, { xPercent: 0, duration: panelDuration, ease: 'power4.out' }, panelInsertTime);

    const itemsStart = panelInsertTime + panelDuration * 0.15;
    if (itemEls.length) {
      tl.to(itemEls, { yPercent: 0, rotate: 0, duration: 1, ease: 'power4.out', stagger: 0.1 }, itemsStart);
    }
    if (numberEls.length) {
      tl.to(numberEls, { '--sm-num-opacity': 1, duration: 0.6, ease: 'power2.out', stagger: 0.08 }, itemsStart + 0.1);
    }
    if (extras.length) {
      tl.to(extras, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out', stagger: 0.08 }, panelInsertTime + panelDuration * 0.4);
    }

    if (prefersReducedMotion()) tl.timeScale(8);
    openTlRef.current = tl;
  }, [offscreen, resetPanelContent]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    const panel = panelRef.current;
    if (!panel) return;

    closeTweenRef.current?.kill();
    closeTweenRef.current = gsap.to([...preLayerElsRef.current, panel], {
      xPercent: offscreen,
      duration: prefersReducedMotion() ? 0.05 : 0.32,
      ease: 'power3.in',
      overwrite: 'auto',
      onComplete: resetPanelContent,
    });
  }, [offscreen, resetPanelContent]);

  const animateIcon = useCallback((opening: boolean) => {
    if (!iconRef.current) return;
    spinTweenRef.current?.kill();
    spinTweenRef.current = gsap.to(iconRef.current, {
      rotate: opening ? 225 : 0,
      duration: opening ? 0.8 : 0.35,
      ease: opening ? 'power4.out' : 'power3.inOut',
      overwrite: 'auto',
    });
  }, []);

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;
    textCycleAnimRef.current?.kill();

    const current = opening ? 'Menu' : 'Close';
    const target = opening ? 'Close' : 'Menu';
    const seq = [current];
    let last = current;
    for (let i = 0; i < 3; i++) {
      last = last === 'Menu' ? 'Close' : 'Menu';
      seq.push(last);
    }
    if (last !== target) seq.push(target);
    seq.push(target);
    setTextLines(seq);

    gsap.set(inner, { yPercent: 0 });
    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -((seq.length - 1) / seq.length) * 100,
      duration: 0.5 + seq.length * 0.07,
      ease: 'power4.out',
    });
  }, []);

  const setMenu = useCallback(
    async (target: boolean) => {
      if (openRef.current === target) return;
      openRef.current = target;
      setOpen(target);
      if (target) onMenuOpen?.();
      else onMenuClose?.();
      await loadGsap();
      initGsapState();
      if (target) playOpen();
      else playClose();
      animateIcon(target);
      animateText(target);
    },
    [initGsapState, playOpen, playClose, animateIcon, animateText, onMenuOpen, onMenuClose],
  );

  // Click-away, Escape and scroll lock while open
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent | TouchEvent) => {
      const t = e.target as Node;
      if (!panelRef.current?.contains(t) && !toggleBtnRef.current?.contains(t)) setMenu(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenu(false);
        toggleBtnRef.current?.focus();
      }
    };
    if (closeOnClickAway) document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, closeOnClickAway, setMenu]);

  useEffect(
    () => () => {
      openTlRef.current?.kill();
      closeTweenRef.current?.kill();
      spinTweenRef.current?.kill();
      textCycleAnimRef.current?.kill();
    },
    [],
  );

  const layerColors = (() => {
    const raw = colors.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c'];
    const arr = [...raw];
    if (arr.length >= 3) arr.splice(Math.floor(arr.length / 2), 1);
    return arr;
  })();

  return (
    <div
      className={(className ? className + ' ' : '') + 'staggered-menu-wrapper'}
      style={{ '--sm-accent': accentColor } as React.CSSProperties}
      data-position={position}
      data-open={open || undefined}
    >
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
        {layerColors.map((c, i) => (
          <div key={i} className="sm-prelayer" style={{ background: c }} />
        ))}
      </div>

      <header className="staggered-menu-header">
        <div className="sm-bar">
          <div className="sm-logo">{logo}</div>
          <div className="sm-bar-end">
            {actions && <div className="sm-actions">{actions}</div>}
          <button
            ref={toggleBtnRef}
            className="sm-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            onClick={() => void setMenu(!openRef.current)}
            onPointerEnter={() => void loadGsap()}
            onFocus={() => void loadGsap()}
            onTouchStart={() => void loadGsap()}
            type="button"
          >
            <span className="sm-toggle-textWrap" aria-hidden="true">
              <span ref={textInnerRef} className="sm-toggle-textInner">
                {textLines.map((l, i) => (
                  <span className="sm-toggle-line" key={i}>
                    {l}
                  </span>
                ))}
              </span>
            </span>
            <span ref={iconRef} className="sm-icon" aria-hidden="true">
              <span ref={plusHRef} className="sm-icon-line" />
              <span ref={plusVRef} className="sm-icon-line" />
            </span>
          </button>
          </div>
        </div>
      </header>

      <aside
        id="staggered-menu-panel"
        ref={panelRef}
        className="staggered-menu-panel"
        aria-label="Site menu"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="sm-panel-inner">
          <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>
            {items.map((it, idx) => (
              <li className="sm-panel-itemWrap" key={it.label + idx}>
                <a
                  className="sm-panel-item"
                  href={it.link ?? '#'}
                  aria-label={it.ariaLabel}
                  aria-current={it.active ? 'true' : undefined}
                  onClick={(e) => {
                    setMenu(false);
                    if (it.onSelect) {
                      e.preventDefault();
                      // wait for the scroll lock to release before scrolling
                      window.setTimeout(it.onSelect, 60);
                    }
                  }}
                >
                  <span className="sm-panel-itemLabel">{it.label}</span>
                </a>
              </li>
            ))}
          </ul>
          {footer && <div className="sm-footer">{footer}</div>}
          {displaySocials && socialItems.length > 0 && (
            <div className="sm-socials" aria-label="Social links">
              <h3 className="sm-socials-title">Socials</h3>
              <ul className="sm-socials-list" role="list">
                {socialItems.map((s, i) => (
                  <li key={s.label + i}>
                    <a href={s.link} target="_blank" rel="noopener noreferrer" className="sm-socials-link">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}

export default StaggeredMenu;
