// src/App.tsx
import { useEffect } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './state/auth';

import MarketingPage from './features/marketing/MarketingPage';
import LoginPage from './features/auth/LoginPage';
import AppShell from './features/app-shell/AppShell';
import AdminShell from './features/app-shell/AdminShell';

import DashboardScreen from './screens/DashboardScreen';
import HomeSpatialScreen from './screens/HomeSpatialScreen';
import UsageScreen from './screens/UsageScreen';
import TankScreen from './screens/TankScreen';
import QualityScreen from './screens/QualityScreen';
import AlertsScreen from './screens/AlertsScreen';
import PumpValveScreen from './screens/PumpValveScreen';
import InsightsPage from './features/insights/InsightsPage';
import ReportsScreen from './screens/ReportsScreen';
import DevicesPage from './features/devices/DevicesPage';
import SectionDetailPage from './features/sections/SectionDetailPage';

import AdminOverviewPage from './features/admin/AdminOverviewPage';
import AdminCustomersPage from './features/admin/AdminCustomersPage';
import AdminDevicesPage from './features/admin/AdminDevicesPage';
import AdminAlertsPage from './features/admin/AdminAlertsPage';
import AdminAuditPage from './features/admin/AdminAuditPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function RequireRole({ role, children }: { role: 'customer' | 'admin'; children: React.ReactNode }) {
  const { role: currentRole, signedIn } = useAuth();
  if (!signedIn) return <Navigate to="/login" replace />;
  if (currentRole !== role) return <Navigate to={role === 'admin' ? '/app/dashboard' : '/admin/overview'} replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
          <Routes>
            <Route path="/" element={<MarketingPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route
              path="/app"
              element={
                <RequireRole role="customer">
                  <Outlet />
                </RequireRole>
              }
            >
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route element={<AppShell />}>
                <Route path="dashboard" element={<DashboardScreen />} />
                <Route path="reports" element={<ReportsScreen />} />
                <Route path="sections" element={<HomeSpatialScreen />} />
                <Route path="sections/:sectionId" element={<SectionDetailPage />} />
                <Route path="usage" element={<UsageScreen />} />
                <Route path="tank" element={<TankScreen />} />
                <Route path="quality" element={<QualityScreen />} />
                <Route path="alerts" element={<AlertsScreen />} />
                <Route path="pump" element={<PumpValveScreen />} />
                <Route path="valves" element={<PumpValveScreen />} />
                <Route path="insights" element={<InsightsPage />} />
                                <Route path="devices" element={<DevicesPage />} />
              </Route>
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
      </AuthProvider>
    </BrowserRouter>
  );
}
