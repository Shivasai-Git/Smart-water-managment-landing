import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

/**
 * shadcn-style sidebar primitives (Provider / Sidebar / Group / MenuButton / Badge / Sub / Trigger),
 * styled only with the app's existing Stitch tokens — no separate sidebar palette.
 */

const STORAGE_KEY = 'swf:sidebar-collapsed';
const SIDEBAR_WIDTH = '18rem';
const SIDEBAR_WIDTH_ICON = '5rem';
const DESKTOP_QUERY = '(min-width: 1024px)';

interface SidebarContextValue {
  /** Desktop rail is collapsed to icons. Always false on mobile. */
  collapsed: boolean;
  isMobile: boolean;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  /** Desktop: collapse/expand the rail. Mobile: open/close the drawer. */
  toggleSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error('useSidebar must be used inside <SidebarProvider>');
  return ctx;
}

function readCollapsed() {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function SidebarProvider({ className, children }: { className?: string; children: ReactNode }) {
  const [desktopCollapsed, setDesktopCollapsed] = useState(readCollapsed);
  const [openMobile, setOpenMobile] = useState(false);
  const [isMobile, setIsMobile] = useState(() => !window.matchMedia(DESKTOP_QUERY).matches);

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const onChange = () => {
      setIsMobile(!mq.matches);
      if (mq.matches) setOpenMobile(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggleSidebar = useCallback(() => {
    if (isMobile) {
      setOpenMobile((o) => !o);
      return;
    }
    setDesktopCollapsed((c) => {
      try {
        localStorage.setItem(STORAGE_KEY, c ? '0' : '1');
      } catch {
        /* storage unavailable — state still works for this session */
      }
      return !c;
    });
  }, [isMobile]);

  // Ctrl/Cmd + B, same shortcut as shadcn's sidebar
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'b' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggleSidebar]);

  const collapsed = !isMobile && desktopCollapsed;
  const value = useMemo(
    () => ({ collapsed, isMobile, openMobile, setOpenMobile, toggleSidebar }),
    [collapsed, isMobile, openMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={value}>
      <div
        className={className}
        data-state={collapsed ? 'collapsed' : 'expanded'}
        style={{ '--sidebar-current': collapsed ? SIDEBAR_WIDTH_ICON : SIDEBAR_WIDTH } as CSSProperties}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

/** Page column that leaves room for the fixed sidebar on desktop. */
export function SidebarInset({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn('transition-[padding] duration-300 ease-out lg:pl-[var(--sidebar-current)]', className)}>
      {children}
    </div>
  );
}

export function Sidebar({ label = 'Primary', children }: { label?: string; children: ReactNode }) {
  const { collapsed, isMobile, openMobile, setOpenMobile } = useSidebar();

  useEffect(() => {
    if (!isMobile || !openMobile) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenMobile(false);
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [isMobile, openMobile, setOpenMobile]);

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 z-40 bg-inverse-surface/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
          openMobile ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={() => setOpenMobile(false)}
        aria-hidden="true"
      />
      <aside
        id="app-sidebar"
        aria-label={label}
        data-state={collapsed ? 'collapsed' : 'expanded'}
        inert={isMobile && !openMobile}
        style={{ width: collapsed ? SIDEBAR_WIDTH_ICON : SIDEBAR_WIDTH }}
        className={cn(
          'fixed left-0 top-0 bottom-0 z-50 flex max-w-[85vw] flex-col justify-between border-r border-surface-container-high bg-surface-container-lowest p-5',
          'transition-[transform,width] duration-300 ease-out',
          openMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          collapsed && 'px-3',
        )}
      >
        {children}
      </aside>
    </>
  );
}

export function SidebarHeader({ children }: { children: ReactNode }) {
  return <div className="flex flex-col space-y-space-md">{children}</div>;
}

export function SidebarContent({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-0 flex-1 space-y-space-sm overflow-y-auto overflow-x-hidden pr-1 [scrollbar-width:thin]">
      {children}
    </div>
  );
}

export function SidebarGroup({ title, first, children }: { title: string; first?: boolean; children: ReactNode }) {
  const { collapsed } = useSidebar();
  return (
    <div className={cn('space-y-1', !first && 'pt-2')}>
      {collapsed ? (
        !first && <div className="mx-3 mb-2 h-px bg-surface-container-high" aria-hidden="true" />
      ) : (
        <div className="px-3 py-1 font-label-uppercase text-label-uppercase uppercase tracking-wider text-on-surface-variant">
          {title}
        </div>
      )}
      <nav className="space-y-1" aria-label={title}>
        {children}
      </nav>
    </div>
  );
}

const BASE = 'group/menu-button flex items-center rounded-full font-body-md text-body-md transition-colors outline-none focus-visible:ring-2 focus-visible:ring-primary/40';
const IDLE = 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface';
const ACTIVE = 'bg-primary text-on-primary font-medium';

interface MenuButtonProps {
  to: string;
  icon: string;
  label: string;
  badge?: string;
  /** Match child routes too (default true). */
  end?: boolean;
  onNavigate?: () => void;
}

export function SidebarMenuButton({ to, icon, label, badge, end, onNavigate }: MenuButtonProps) {
  const { collapsed, isMobile, setOpenMobile } = useSidebar();
  return (
    <NavLink
      to={to}
      end={end}
      title={collapsed ? label : undefined}
      aria-label={collapsed ? label : undefined}
      onClick={() => {
        if (isMobile) setOpenMobile(false);
        onNavigate?.();
      }}
      className={({ isActive }) =>
        cn(BASE, isActive ? ACTIVE : IDLE, collapsed ? 'relative h-11 w-full justify-center' : 'gap-3 px-3 py-2')
      }
    >
      {({ isActive }) => (
        <>
          <span className="material-symbols-outlined shrink-0 text-[20px]">{icon}</span>
          {!collapsed && <span className="min-w-0 flex-1 truncate">{label}</span>}
          {badge && (
            <SidebarMenuBadge active={isActive} dot={collapsed}>
              {badge}
            </SidebarMenuBadge>
          )}
        </>
      )}
    </NavLink>
  );
}

export function SidebarMenuBadge({ active, dot, children }: { active?: boolean; dot?: boolean; children: ReactNode }) {
  if (dot) {
    if (children === '0') return null;
    return <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-secondary ring-2 ring-surface-container-lowest" aria-hidden="true" />;
  }
  return (
    <span
      className={cn(
        'rounded-full px-2 py-0.5 font-body-sm text-body-sm font-medium',
        active ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high text-on-surface-variant',
      )}
    >
      {children}
    </span>
  );
}

/** A menu button with an expandable list of sub-links (hidden while the rail is collapsed). */
export function SidebarMenuGroup({
  to,
  icon,
  label,
  active,
  children,
}: {
  to: string;
  icon: string;
  label: string;
  active: boolean;
  children: ReactNode;
}) {
  const { collapsed } = useSidebar();
  const [manual, setManual] = useState<boolean | null>(null);
  const expanded = manual ?? active;

  return (
    <div>
      <div className="flex items-center gap-1">
        <div className="min-w-0 flex-1">
          <SidebarMenuButton to={to} icon={icon} label={label} end={false} />
        </div>
        {!collapsed && (
          <button
            type="button"
            aria-label={`${expanded ? 'Collapse' : 'Expand'} ${label}`}
            aria-expanded={expanded}
            onClick={() => setManual(!expanded)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-on-surface-variant outline-none transition-colors hover:bg-surface-container-high hover:text-on-surface focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            <span className={cn('material-symbols-outlined text-[18px] transition-transform', expanded && 'rotate-90')}>
              chevron_right
            </span>
          </button>
        )}
      </div>
      {!collapsed && (
        <div className={cn('grid transition-[grid-template-rows] duration-300 ease-out', expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]')}>
          <ul className="ml-[1.35rem] min-h-0 space-y-0.5 overflow-hidden border-l border-surface-container-high pl-3" inert={!expanded}>
            {children}
          </ul>
        </div>
      )}
    </div>
  );
}

export function SidebarMenuSubButton({ to, label, status }: { to: string; label: string; status?: 'ok' | 'warn' | 'off' }) {
  const { isMobile, setOpenMobile } = useSidebar();
  return (
    <li>
      <NavLink
        to={to}
        onClick={() => isMobile && setOpenMobile(false)}
        className={({ isActive }) =>
          cn(
            'flex items-center gap-2 rounded-full px-3 py-1.5 font-body-sm text-body-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary/40',
            isActive ? 'bg-surface-container-high font-medium text-on-surface' : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface',
          )
        }
      >
        {status && (
          <span
            aria-hidden="true"
            className={cn('h-1.5 w-1.5 shrink-0 rounded-full', status === 'ok' && 'bg-secondary', status === 'warn' && 'bg-error', status === 'off' && 'bg-outline')}
          />
        )}
        <span className="truncate">{label}</span>
      </NavLink>
    </li>
  );
}

export function SidebarFooter({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}

/** Toolbar button: collapses the desktop rail, opens the mobile drawer. */
export function SidebarTrigger({ className }: { className?: string }) {
  const { collapsed, isMobile, openMobile, toggleSidebar } = useSidebar();
  const expanded = isMobile ? openMobile : !collapsed;
  return (
    <button
      type="button"
      onClick={toggleSidebar}
      aria-label={isMobile ? 'Open navigation' : expanded ? 'Collapse sidebar' : 'Expand sidebar'}
      aria-expanded={expanded}
      aria-controls="app-sidebar"
      title="Toggle sidebar (Ctrl+B)"
      className={cn(
        'flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-container-low text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface',
        className,
      )}
    >
      <span className="material-symbols-outlined text-[20px]">{isMobile ? 'menu' : expanded ? 'left_panel_close' : 'left_panel_open'}</span>
    </button>
  );
}
