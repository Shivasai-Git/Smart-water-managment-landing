import { Outlet } from 'react-router-dom';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import StitchSidebar from './StitchSidebar';
import { TopBar } from './m3';

/** One shell for every admin page: a collapsible sidebar, a sticky top bar and a single content column. */
export default function AdminShell() {
  return (
    <SidebarProvider className="stitch-app min-h-screen bg-background font-body-md text-on-surface antialiased">
      <StitchSidebar variant="admin" />
      <SidebarInset>
        <div className="px-4 sm:px-6 lg:px-8">
          <TopBar crumb="Fleet operations" code="ADMIN" />
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
