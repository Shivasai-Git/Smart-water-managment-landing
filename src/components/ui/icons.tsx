import type { JSX } from 'react';

type IconProps = { size?: number; className?: string };

function icon(paths: JSX.Element) {
  return function IconComponent({ size = 16, className }: IconProps) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
        {paths}
      </svg>
    );
  };
}

export const IconGrid = icon(<><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>);
export const IconDroplet = icon(<path d="M12 2.5c3.6 4.4 7 8.7 7 12.4a7 7 0 1 1-14 0c0-3.7 3.4-8 7-12.4Z" />);
export const IconAlertTriangle = icon(<><path d="M10.7 3.5 2.3 18a1.6 1.6 0 0 0 1.4 2.4h16.6a1.6 1.6 0 0 0 1.4-2.4L13.3 3.5a1.6 1.6 0 0 0-2.6 0Z" /><line x1="12" y1="9.5" x2="12" y2="13.5" /><circle cx="12" cy="16.7" r=".9" fill="currentColor" stroke="none" /></>);
export const IconGauge = icon(<><path d="M4 15.5a8 8 0 1 1 16 0" /><line x1="12" y1="15.5" x2="15.5" y2="10.5" /><circle cx="12" cy="15.5" r="1.1" fill="currentColor" stroke="none" /></>);
export const IconHouse = icon(<><path d="M4 11.5 12 4l8 7.5" /><path d="M6 10v9.5h12V10" /><path d="M10 19.5v-6h4v6" /></>);
export const IconValve = icon(<><circle cx="12" cy="12" r="8.5" /><path d="M12 4v3M12 17v3M4 12h3M17 12h3M6.5 6.5l2 2M15.5 15.5l2 2M17.5 6.5l-2 2M8.5 15.5l-2 2" /></>);
export const IconBell = icon(<><path d="M6 9.5a6 6 0 0 1 12 0c0 4.5 1.5 6 1.5 6h-15s1.5-1.5 1.5-6Z" /><path d="M10 19a2 2 0 0 0 4 0" /></>);
export const IconSettings = icon(<><circle cx="12" cy="12" r="3" /><path d="M19.4 13.5a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.9 2.9l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V20a2 2 0 1 1-4 0v-.2a1.7 1.7 0 0 0-1.1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.9-2.9l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H4a2 2 0 1 1 0-4h.2a1.7 1.7 0 0 0 1.6-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.9-2.9l.1.1a1.7 1.7 0 0 0 1.9.3H10.5a1.7 1.7 0 0 0 1-1.6V4a2 2 0 1 1 4 0v.2a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.9 2.9l-.1.1a1.7 1.7 0 0 0-.3 1.9V10.5a1.7 1.7 0 0 0 1.6 1H20a2 2 0 1 1 0 4h-.2a1.7 1.7 0 0 0-1.6 1Z" /></>);
export const IconLogout = icon(<><path d="M9 21H5.5A1.5 1.5 0 0 1 4 19.5v-15A1.5 1.5 0 0 1 5.5 3H9" /><path d="M15.5 16 20 12l-4.5-4" /><line x1="20" y1="12" x2="9" y2="12" /></>);
export const IconCheck = icon(<polyline points="4,13 9,18 20,6" />);
export const IconChevronDown = icon(<polyline points="6,9 12,15 18,9" />);
export const IconChevronRight = icon(<polyline points="9,6 15,12 9,18" />);
export const IconFilter = icon(<path d="M4 5h16l-6 7.5V19l-4 2v-8.5Z" />);
export const IconCalendar = icon(<><rect x="3.5" y="5" width="17" height="15.5" rx="2" /><line x1="3.5" y1="9.5" x2="20.5" y2="9.5" /><line x1="8" y1="3" x2="8" y2="6.5" /><line x1="16" y1="3" x2="16" y2="6.5" /></>);
export const IconExport = icon(<><path d="M12 16V4M8 8l4-4 4 4" /><path d="M4 15v3.5A1.5 1.5 0 0 0 5.5 20h13a1.5 1.5 0 0 0 1.5-1.5V15" /></>);
export const IconPlus = icon(<><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>);
export const IconRadio = icon(<><circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" /><path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7M5.3 5.3a9.5 9.5 0 0 0 0 13.4M18.7 5.3a9.5 9.5 0 0 1 0 13.4" /></>);
export const IconFileText = icon(<><path d="M6 3.5h9l4 4v13H6Z" /><line x1="9" y1="12" x2="15" y2="12" /><line x1="9" y1="15.5" x2="15" y2="15.5" /></>);
