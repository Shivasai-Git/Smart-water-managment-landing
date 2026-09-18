import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import StitchSidebar from './StitchSidebar';
import { TopBar } from './m3';

/** One shell for every admin page: a rail flush to the left edge, a sticky top bar and a single content column. */
export default function AdminShell() {
  const [open, setOpen] = useState(false);
  return (
    <div className="stitch-app min-h-screen bg-background font-body-md text-on-surface antialiased">
      <StitchSidebar variant="admin" open={open} onClose={() => setOpen(false)} />
      <div className="lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">
          <TopBar crumb="Fleet operations" code="ADMIN" onMenu={() => setOpen(true)} />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
