import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static',
  site: 'https://fianser.com',
  integrations: [
    tailwind(),
  ],
});
