import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import StitchSidebar from './StitchSidebar';
import { TopBar } from './m3';

/** One shell for every customer page: a rail flush to the left edge, a sticky top bar and a single content column. */
export default function AppShell() {
  const [open, setOpen] = useState(false);
  return (
    <div className="stitch-app min-h-screen bg-background font-body-md text-on-surface antialiased">
      <StitchSidebar open={open} onClose={() => setOpen(false)} />
      <div className="lg:pl-72">
        <div className="px-4 sm:px-6 lg:px-8">
          <TopBar onMenu={() => setOpen(true)} />
          <Outlet />
        </div>
      </div>
    </div>
  );
}
