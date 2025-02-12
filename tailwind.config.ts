import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}','./src/**/**/*.{html,js,svelte,ts}','./src/**/**/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      fontFamily: {
        sans: ['"Segoe UI"', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
      },
      colors: {
        primary: '#0c52aa',
        gradient: {
          start: '#4b9bd8',
          end: '#7158be'
        }
      }
    }
  },

  plugins: []
} satisfies Config;
