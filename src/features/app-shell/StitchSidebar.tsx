import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuGroup,
  SidebarMenuSubButton,
  useSidebar,
} from '@/components/ui/sidebar';
import { sections } from '../../data/fixtures/sections';
import type { Section } from '../../data/types';
import { useAuth } from '../../state/auth';

interface NavItem {
  to: string;
  icon: string;
  label: string;
  badge?: string;
}

const ADMIN_GROUPS: { title: string; items: NavItem[] }[] = [
  {
    title: 'Fleet',
    items: [
      { to: '/admin/overview', icon: 'space_dashboard', label: 'Overview' },
      { to: '/admin/customers', icon: 'groups', label: 'Customers & Properties' },
      { to: '/admin/devices', icon: 'memory', label: 'Devices' },
    ],
  },
  {
    title: 'Operations',
    items: [
      { to: '/admin/alerts', icon: 'notification_important', label: 'System Alerts' },
      { to: '/admin/audit', icon: 'history_edu', label: 'Audit Trail' },
    ],
  },
];

const CUSTOMER_GROUPS: { title: string; items: NavItem[] }[] = [
  {
    title: 'Overview',
    items: [
      { to: '/app/dashboard', icon: 'dashboard', label: 'Dashboard' },
      { to: '/app/sections', icon: 'cottage', label: 'My Home' },
      { to: '/app/usage', icon: 'show_chart', label: 'Water Usage' },
    ],
  },
  {
    title: 'Systems',
    items: [
      { to: '/app/tank', icon: 'propane_tank', label: 'Tank Monitoring' },
      { to: '/app/quality', icon: 'sanitizer', label: 'Water Quality' },
      { to: '/app/alerts', icon: 'faucet', label: 'Leakage & Alerts', badge: '0' },
      { to: '/app/pump', icon: 'mode_fan', label: 'Pump Control' },
    ],
  },
  {
    title: 'Intelligence',
    items: [
      { to: '/app/insights', icon: 'auto_awesome', label: 'AI Insights' },
      { to: '/app/reports', icon: 'article', label: 'Reports' },
      { to: '/app/devices', icon: 'settings', label: 'Devices & Settings' },
    ],
  },
];

const SECTION_STATUS: Record<Section['status'], 'ok' | 'warn' | 'off'> = {
  nominal: 'ok',
  idle: 'ok',
  attention: 'warn',
  offline: 'off',
};

function Brand({ admin }: { admin: boolean }) {
  const { collapsed } = useSidebar();
  return (
    <div className={`flex items-center gap-3 py-1 ${collapsed ? 'justify-center' : 'px-2'}`}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary">
        <span className="material-symbols-outlined text-[20px] text-on-primary">water_drop</span>
      </div>
      {!collapsed && (
        <div className="flex min-w-0 flex-col">
          <span className="truncate font-headline-sm text-headline-sm leading-tight tracking-tight text-on-surface">Smart Water Flow</span>
          <span className="truncate font-label-uppercase text-label-uppercase tracking-wider text-on-surface-variant">
            {admin ? 'ADMIN CONSOLE • FLEET' : 'v2.4.0 • ENTERPRISE IOT'}
          </span>
        </div>
      )}
    </div>
  );
}

/** Status row + account menu (switch view / sign out) that opens above the row. */
function AccountMenu({ admin }: { admin: boolean }) {
  const { collapsed } = useSidebar();
  const { switchRole, signOut } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => !ref.current?.contains(e.target as Node) && setOpen(false);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const title = admin ? 'Fleet operations' : 'Founder residence';
  const sub = admin ? '3 customers • Online' : 'FR-0814 • Online';
  const itemCls =
    'flex w-full items-center justify-between rounded-full px-3 py-2 text-left font-body-sm text-body-sm text-on-surface-variant outline-none transition-colors hover:bg-surface-container-high hover:text-on-surface focus-visible:ring-2 focus-visible:ring-primary/40';

  return (
    <div ref={ref} className="relative">
      {open && (
        <div
          role="menu"
          className="absolute bottom-full left-0 z-10 mb-2 w-60 space-y-1 rounded-2xl border border-surface-container-high bg-surface-container-lowest p-2 shadow-[0_10px_40px_rgba(0,0,0,0.10)]"
        >
          <button
            role="menuitem"
            type="button"
            className={itemCls}
            onClick={() => {
              setOpen(false);
              switchRole();
              navigate(admin ? '/app/dashboard' : '/admin/overview');
            }}
          >
            <span>{admin ? 'Switch to customer view' : 'Switch to admin view'}</span>
            <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
          </button>
          <button
            role="menuitem"
            type="button"
            className={itemCls}
            onClick={() => {
              setOpen(false);
              signOut();
              navigate('/');
            }}
          >
            <span>Sign out</span>
            <span className="material-symbols-outlined text-[16px]">logout</span>
          </button>
        </div>
      )}
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={collapsed ? `${title} — account menu` : undefined}
        title={collapsed ? `${title} • ${sub}` : undefined}
        onClick={() => setOpen((o) => !o)}
        className={`flex w-full items-center rounded-2xl bg-surface-container-low outline-none transition-colors hover:bg-surface-container focus-visible:ring-2 focus-visible:ring-primary/40 ${
          collapsed ? 'justify-center p-3' : 'justify-between gap-2 p-3 text-left'
        }`}
      >
        <span className="flex min-w-0 items-center gap-2">
          <span className="relative flex shrink-0 items-center justify-center">
            <span className="h-2 w-2 rounded-full bg-secondary" />
            <span className="absolute h-3 w-3 animate-ping rounded-full bg-secondary-fixed-dim/40" />
          </span>
          {!collapsed && (
            <span className="flex min-w-0 flex-col">
              <span className="truncate font-label-button text-label-button leading-tight text-on-surface">{title}</span>
              <span className="truncate font-body-sm text-body-sm text-on-surface-variant">{sub}</span>
            </span>
          )}
        </span>
        {!collapsed && <span className="material-symbols-outlined text-[18px] text-on-surface-variant">unfold_more</span>}
      </button>
    </div>
  );
}

export default function StitchSidebar({ variant = 'customer' }: { variant?: 'customer' | 'admin' }) {
  const admin = variant === 'admin';
  const groups = admin ? ADMIN_GROUPS : CUSTOMER_GROUPS;
  const { pathname } = useLocation();

  return (
    <Sidebar>
      <div className="flex min-h-0 flex-1 flex-col space-y-space-md pb-4">
        <SidebarHeader>
          <Brand admin={admin} />
        </SidebarHeader>
        <SidebarContent>
          {groups.map((group, gi) => (
            <SidebarGroup key={group.title} title={group.title} first={gi === 0}>
              {group.items.map((item) =>
                item.to === '/app/sections' ? (
                  <SidebarMenuGroup key={item.to} {...item} active={pathname.startsWith('/app/sections')}>
                    {sections.map((s) => (
                      <SidebarMenuSubButton key={s.id} to={`/app/sections/${s.id}`} label={s.name} status={SECTION_STATUS[s.status]} />
                    ))}
                  </SidebarMenuGroup>
                ) : (
                  <SidebarMenuButton key={item.to} {...item} />
                ),
              )}
            </SidebarGroup>
          ))}
        </SidebarContent>
      </div>
      <SidebarFooter>
        <AccountMenu admin={admin} />
      </SidebarFooter>
    </Sidebar>
  );
}
