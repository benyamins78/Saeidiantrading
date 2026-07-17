import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  i18n: {
    locales: ['en', 'fa', 'ur'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false
    }
  }
});