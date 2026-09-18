/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#04121E',
        ink2: '#0A2135',
        mist: '#E4EFFA',
        steel: '#7C99BA',
        aqua: '#3FA9F0',
        saffron: '#FFA03C',
        good: '#57C2A0',
        danger: '#FF6B5B',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      maxWidth: {
        shell: '1180px',
      },
    },
  },
  plugins: [],
}
