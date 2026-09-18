import { NavLink, useNavigate } from 'react-router-dom';
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

const BASE = 'flex items-center px-3 py-2 rounded-full font-body-md text-body-md transition-colors';
const IDLE = 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface';
const ACTIVE = 'bg-primary text-on-primary font-medium';

export default function StitchSidebar({ variant = 'customer', open = false, onClose }: { variant?: 'customer' | 'admin'; open?: boolean; onClose?: () => void }) {
  const { switchRole, signOut } = useAuth();
  const admin = variant === 'admin';
  const GROUPS = admin ? ADMIN_GROUPS : CUSTOMER_GROUPS;
  const navigate = useNavigate();

  return (
    <>
    {open && <div className="fixed inset-0 z-40 bg-inverse-surface/40 backdrop-blur-sm lg:hidden" onClick={onClose} aria-hidden="true" />}
    <aside
      aria-label="Primary"
      className={`fixed left-0 top-0 bottom-0 w-72 bg-surface-container-lowest border-r border-surface-container-high z-50 flex-col justify-between p-5 lg:flex ${open ? 'flex' : 'hidden'}`}
    >
      <div className="flex flex-col space-y-space-md">
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-on-primary text-[20px]">water_drop</span>
          </div>
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight leading-tight">Smart Water Flow</span>
            <span className="font-label-uppercase text-label-uppercase text-on-surface-variant tracking-wider">{admin ? 'ADMIN CONSOLE • FLEET' : 'v2.4.0 • ENTERPRISE IOT'}</span>
          </div>
        </div>
        <div className="space-y-space-sm overflow-y-auto max-h-[calc(100vh-280px)] pr-1">
          {GROUPS.map((group, gi) => (
            <div key={group.title} className={gi === 0 ? 'space-y-1' : 'space-y-1 pt-2'}>
              <div className="px-3 py-1 font-label-uppercase text-label-uppercase text-on-surface-variant uppercase tracking-wider">{group.title}</div>
              <nav className="space-y-1" aria-label={group.title}>
                {group.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `${BASE} ${item.badge ? 'justify-between' : 'gap-3'} ${isActive ? ACTIVE : IDLE}`
                    }
                  >
                    {({ isActive }) =>
                      item.badge ? (
                        <>
                          <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                            <span>{item.label}</span>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded-full font-body-sm text-body-sm font-medium ${
                              isActive ? 'bg-primary-container text-on-primary-container' : 'bg-surface-container-high text-on-surface-variant'
                            }`}
                          >
                            {item.badge}
                          </span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                          <span>{item.label}</span>
                        </>
                      )
                    }
                  </NavLink>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </div>
      <div className="p-3 bg-surface-container-low rounded-2xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-secondary"></div>
              <div className="absolute w-3 h-3 rounded-full bg-secondary-fixed-dim/40 animate-ping"></div>
            </div>
            <div className="flex flex-col">
              <span className="font-label-button text-label-button text-on-surface leading-tight">{admin ? 'Fleet operations' : 'Founder residence'}</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">{admin ? '3 customers • Online' : 'FR-0814 • Online'}</span>
            </div>
          </div>
        </div>
        <div className="pt-2 flex flex-col gap-1.5">
          <button
            type="button"
            onClick={() => {
              switchRole();
              navigate(admin ? '/app/dashboard' : '/admin/overview');
            }}
            className="flex items-center justify-between px-3 py-2 rounded-full font-body-sm text-body-sm text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
          >
            <span>{admin ? 'Switch to customer view' : 'Switch to admin view'}</span>
            <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
          </button>
          <button
            type="button"
            onClick={() => {
              signOut();
              navigate('/');
            }}
            className="flex items-center justify-between px-3 py-2 rounded-full font-body-sm text-body-sm text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
          >
            <span>Sign out</span>
            <span className="material-symbols-outlined text-[16px]">logout</span>
          </button>
        </div>
      </div>
    </aside>
    </>
  );
}
