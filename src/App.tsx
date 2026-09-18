// src/App.tsx
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from './state/auth';
import { ScenarioProvider } from './state/scenario';

import MarketingPage from './features/marketing/MarketingPage';
import LoginPage from './features/auth/LoginPage';
import AppShell from './features/app-shell/AppShell';
import AdminShell from './features/app-shell/AdminShell';

import DashboardPage from './features/dashboard/DashboardPage';
import SectionsPage from './features/sections/SectionsPage';
import SectionDetailPage from './features/sections/SectionDetailPage';
import UsagePage from './features/usage/UsagePage';
import TankPage from './features/tank/TankPage';
import QualityPage from './features/quality/QualityPage';
import AlertsPage from './features/alerts/AlertsPage';
import PumpPage from './features/pump/PumpPage';
import ValvesPage from './features/valves/ValvesPage';
import InsightsPage from './features/insights/InsightsPage';
import ReportsPage from './features/reports/ReportsPage';
import DevicesPage from './features/devices/DevicesPage';

import AdminOverviewPage from './features/admin/AdminOverviewPage';
import AdminCustomersPage from './features/admin/AdminCustomersPage';
import AdminDevicesPage from './features/admin/AdminDevicesPage';
import AdminAlertsPage from './features/admin/AdminAlertsPage';
import AdminAuditPage from './features/admin/AdminAuditPage';

function RequireRole({ role, children }: { role: 'customer' | 'admin'; children: React.ReactNode }) {
  const { role: currentRole, signedIn } = useAuth();
  if (!signedIn) return <Navigate to="/login" replace />;
  if (currentRole !== role) return <Navigate to={role === 'admin' ? '/app/dashboard' : '/admin/overview'} replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScenarioProvider>
          <Routes>
            <Route path="/" element={<MarketingPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route
              path="/app"
              element={
                <RequireRole role="customer">
                  <AppShell />
                </RequireRole>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="sections" element={<SectionsPage />} />
              <Route path="sections/:sectionId" element={<SectionDetailPage />} />
              <Route path="usage" element={<UsagePage />} />
              <Route path="tank" element={<TankPage />} />
              <Route path="quality" element={<QualityPage />} />
              <Route path="alerts" element={<AlertsPage />} />
              <Route path="pump" element={<PumpPage />} />
              <Route path="valves" element={<ValvesPage />} />
              <Route path="insights" element={<InsightsPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="devices" element={<DevicesPage />} />
            </Route>

            <Route
              path="/admin"
              element={
                <RequireRole role="admin">
                  <AdminShell />
                </RequireRole>
              }
            >
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="overview" element={<AdminOverviewPage />} />
              <Route path="customers" element={<AdminCustomersPage />} />
              <Route path="devices" element={<AdminDevicesPage />} />
              <Route path="alerts" element={<AdminAlertsPage />} />
              <Route path="audit" element={<AdminAuditPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ScenarioProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
