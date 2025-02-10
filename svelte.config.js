import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import path from 'path';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		proxy: {
			'/api': {
			  target: 'https://depps.leadagro.net',
			  changeOrigin: true,
			  rewrite: (path) => path.replace(/^\/api/, '')
			}
		  },
		alias: {
			$components: path.resolve('./src/components'),
			// Ajoutez d'autres alias si nécessaire
		  },
		  prerender: {
			crawl: true, // Active ou désactive le crawl des liens internes
			entries: ['*'] // Prérend toutes les routes
		  }
		 
	},

};

export default config;
