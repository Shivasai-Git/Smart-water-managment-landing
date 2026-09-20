import { Outlet } from 'react-router-dom';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import StitchSidebar from './StitchSidebar';
import { TopBar } from './m3';

/** One shell for every customer page: a collapsible sidebar, a sticky top bar and a single content column. */
export default function AppShell() {
  return (
    <SidebarProvider className="stitch-app min-h-screen bg-background font-body-md text-on-surface antialiased">
      <StitchSidebar />
      <SidebarInset>
        <div className="px-4 sm:px-6 lg:px-8">
          <TopBar />
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
