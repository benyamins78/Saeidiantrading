import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import netlify from '@astrojs/netlify';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },

  i18n: {
    locales: ['en', 'fa', 'ur'],
    defaultLocale: 'fa', // Changed to Farsi
    routing: {
      prefixDefaultLocale: false
    }
  }

  adapter: netlify()
});