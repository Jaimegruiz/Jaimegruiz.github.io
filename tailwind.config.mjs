/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts}'],
  theme: {
    extend: {
      colors: {
        dark:           '#0d1520',
        'dark-2':       '#1a2540',
        'dark-3':       '#12202e',
        accent:         '#FF6600',
        'accent-hover': '#CC5200',
        wa:             '#25d366',
        'wa-hover':     '#1da851',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'sans-serif'],
      },
      screens: {
        desk: '960px',
      },
      boxShadow: {
        accent:    '0 4px 18px rgba(255, 102, 0, 0.32)',
        'accent-lg': '0 6px 22px rgba(255, 102, 0, 0.42)',
        wa:        '0 4px 16px rgba(37, 211, 102, 0.35)',
      },
      borderRadius: {
        sm:   '6px',
        md:   '12px',
        lg:   '20px',
        xl:   '32px',
        full: '9999px',
      },
      spacing: {
        nav: '68px',
      },
    },
  },
  plugins: [],
};
