import adapter from '@sveltejs/adapter-static'; // Utilisez adapter-static
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),

  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html', // Fallback pour les routes dynamiques
      precompress: false,
    }),
    alias: {
      $components: path.resolve('./src/components'),
      // Ajoutez d'autres alias si nécessaire
    },
    prerender: {
      crawl: true, // Active le crawl des liens internes
      entries: ['*'], // Prérend toutes les routes
    },
  },
};

export default config;