import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://ruijieking.github.io',
  integrations: [],
  image: {
    service: {
      entrypoint: 'astro/assets/services/noop'
    }
  }
});
