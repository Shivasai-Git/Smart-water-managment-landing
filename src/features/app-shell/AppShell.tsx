import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../state/auth';
import {
  IconGrid, IconHouse, IconDroplet, IconGauge, IconAlertTriangle,
  IconValve, IconChevronRight, IconBell, IconSettings, IconLogout,
} from '../../components/ui/icons';

const NAV = [
  { to: '/app/dashboard', label: 'Dashboard', icon: IconGrid },
  { to: '/app/sections', label: 'My Home', icon: IconHouse },
  { to: '/app/usage', label: 'Water Usage', icon: IconDroplet },
  { to: '/app/tank', label: 'Tank Monitoring', icon: IconGauge },
  { to: '/app/quality', label: 'Water Quality', icon: IconDroplet },
  { to: '/app/alerts', label: 'Leakage & Alerts', icon: IconAlertTriangle },
  { to: '/app/pump', label: 'Pump Control', icon: IconSettings },
  { to: '/app/valves', label: 'Valve Control', icon: IconValve },
  { to: '/app/insights', label: 'AI Insights', icon: IconGrid },
  { to: '/app/reports', label: 'Reports', icon: IconGrid },
  { to: '/app/devices', label: 'Devices & Settings', icon: IconSettings },
];

export default function AppShell() {
  const { switchRole, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-ink flex font-body">
      <aside className="w-64 bg-ink2 border-r border-steel/15 flex flex-col p-4 sticky top-0 h-screen">
        <div className="flex items-center gap-2 px-2 pb-6">
          <span className="w-2 h-2 rounded-full bg-aqua" />
          <span className="font-display font-semibold text-mist text-sm">Smart Water Flow</span>
        </div>
        <nav className="flex flex-col gap-1 flex-1">
          {NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${isActive ? 'bg-aqua/10 text-aqua' : 'text-steel hover:text-mist hover:bg-ink'}`
              }
            >
              <item.icon size={15} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-steel/15 pt-3 flex flex-col gap-1">
          <button
            type="button"
            onClick={() => {
              switchRole();
              navigate('/admin/overview');
            }}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-steel hover:text-mist hover:bg-ink transition-colors"
          >
            <IconChevronRight size={15} />
            Switch to admin view (demo)
          </button>
          <button
            type="button"
            onClick={() => {
              signOut();
              navigate('/');
            }}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-steel hover:text-mist hover:bg-ink transition-colors"
          >
            <IconLogout size={15} />
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-steel/15 flex items-center justify-between px-6">
          <span className="font-body text-sm text-steel">Founder residence</span>
          <button type="button" aria-label="Notifications" className="text-steel hover:text-mist transition-colors">
            <IconBell size={16} />
          </button>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
