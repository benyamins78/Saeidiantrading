import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import netlify from '@astrojs/netlify';

export default defineConfig({
  output: 'server',
  adapter: netlify(),
  vite: {
    plugins: [tailwindcss()]
  },
  i18n: {
    locales: ['en', 'fa', 'ur'],
    defaultLocale: 'fa',
    routing: {
      prefixDefaultLocale: false
    }
  }
});