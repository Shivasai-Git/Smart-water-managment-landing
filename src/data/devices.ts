export interface DeviceItem {
  title: string;
  description: string;
}

export const devices: DeviceItem[] = [
  {
    title: 'Tank level sensors',
    description: 'Know exactly how much water you have, right now, without climbing anywhere or guessing.',
  },
  {
    title: 'Pump control',
    description: 'Starts when it should, stops before overflow, and never runs dry. Fully automated.',
  },
  {
    title: 'Water quality monitoring',
    description: 'Hardness, purity, temperature and clarity — tracked continuously, not just when you think to check.',
  },
  {
    title: 'Leak detection',
    description: 'Catches the slow, hidden leaks — not just the obvious burst. Before the wall gets damp.',
  },
  {
    title: 'Geyser & RO integration',
    description: 'The appliances that use water, monitored alongside the water itself. One complete picture.',
  },
];
