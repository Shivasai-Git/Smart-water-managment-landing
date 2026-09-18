import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../state/auth';
import { IconGrid, IconHouse, IconSettings, IconAlertTriangle, IconFileText, IconChevronRight, IconLogout } from '../../components/ui/icons';

const NAV = [
  { to: '/admin/overview', label: 'Overview', icon: IconGrid },
  { to: '/admin/customers', label: 'Customers & Properties', icon: IconHouse },
  { to: '/admin/devices', label: 'Devices', icon: IconSettings },
  { to: '/admin/alerts', label: 'System Alerts', icon: IconAlertTriangle },
  { to: '/admin/audit', label: 'Audit Trail', icon: IconFileText },
];

export default function AdminShell() {
  const { switchRole, signOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-ink flex font-body">
      <aside className="w-64 bg-ink2 border-r border-steel/15 flex flex-col p-4 sticky top-0 h-screen">
        <div className="flex items-center gap-2 px-2 pb-2">
          <span className="w-2 h-2 rounded-full bg-aqua" />
          <span className="font-display font-semibold text-mist text-sm">Smart Water Flow</span>
        </div>
        <p className="px-2 pb-4 text-xs text-steel">Admin console</p>
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
              navigate('/app/dashboard');
            }}
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-steel hover:text-mist hover:bg-ink transition-colors"
          >
            <IconChevronRight size={15} />
            Switch to customer view (demo)
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
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
