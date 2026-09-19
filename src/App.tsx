// src/App.tsx
import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './state/auth';

import MarketingPage from './features/marketing/MarketingPage';
const LoginPage = lazy(() => import('./features/auth/LoginPage'));
const AppShell = lazy(() => import('./features/app-shell/AppShell'));
const AdminShell = lazy(() => import('./features/app-shell/AdminShell'));

const DashboardScreen = lazy(() => import('./screens/DashboardScreen'));
const HomeSpatialScreen = lazy(() => import('./screens/HomeSpatialScreen'));
const UsageScreen = lazy(() => import('./screens/UsageScreen'));
const TankScreen = lazy(() => import('./screens/TankScreen'));
const QualityScreen = lazy(() => import('./screens/QualityScreen'));
const AlertsScreen = lazy(() => import('./screens/AlertsScreen'));
const PumpValveScreen = lazy(() => import('./screens/PumpValveScreen'));
const InsightsPage = lazy(() => import('./features/insights/InsightsPage'));
const ReportsScreen = lazy(() => import('./screens/ReportsScreen'));
const DevicesPage = lazy(() => import('./features/devices/DevicesPage'));
const SectionDetailPage = lazy(() => import('./features/sections/SectionDetailPage'));

const AdminOverviewPage = lazy(() => import('./features/admin/AdminOverviewPage'));
const AdminCustomersPage = lazy(() => import('./features/admin/AdminCustomersPage'));
const AdminDevicesPage = lazy(() => import('./features/admin/AdminDevicesPage'));
const AdminAlertsPage = lazy(() => import('./features/admin/AdminAlertsPage'));
const AdminAuditPage = lazy(() => import('./features/admin/AdminAuditPage'));

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
          <Suspense fallback={null}>
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
          </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}
