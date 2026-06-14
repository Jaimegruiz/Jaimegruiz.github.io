import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://tallereselcorcho.es',
  output: 'static',
  integrations: [
    tailwind({ applyBaseStyles: false }),
  ],
  build: {
    format: 'file',
  },
});
