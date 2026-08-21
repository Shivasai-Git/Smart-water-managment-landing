export interface FailureItem {
  tag: string;
  title: string;
  body: string;
}

export const failures: FailureItem[] = [
  {
    tag: 'Overflow',
    title: 'The overflowing tank',
    body: 'The motor is switched on and forgotten. Clean, pumped, sometimes paid-for water runs down the outside wall for twenty minutes — somewhere in every building, most weeks.',
  },
  {
    tag: 'Empty',
    title: 'The dry tank',
    body: 'Nobody checked, the supply hour was missed, and now it’s a bucket-and-mug day. The opposite failure, equally preventable.',
  },
  {
    tag: 'Damage',
    title: 'The burnt motor',
    body: 'A pump that runs dry damages itself. That’s a repair bill and a day without water — from a fault a five-rupee sensor decision could have prevented.',
  },
  {
    tag: 'Hidden',
    title: 'The leak nobody sees',
    body: 'A slow leak in a concealed line shows up months later as a damp wall, a swollen bill, or a repair that means breaking tile.',
  },
  {
    tag: 'Quality',
    title: 'Water you can’t judge',
    body: 'Hardness that ruins a geyser. A filter cartridge long past its life. Quality that’s fine one week and questionable the next — with no way to tell which week you’re in.',
  },
  {
    tag: 'Energy',
    title: 'The geyser left on',
    body: 'Not strictly a water problem — but the same root cause: a device that runs with nobody watching, wasting energy and shortening its own life.',
  },
];
