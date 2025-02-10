import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	
	plugins: [sveltekit()],
	server: {
		proxy: {
			'/api': {
			  target: 'https://depps.leadagro.net',
			  changeOrigin: true,
			  rewrite: (path) => path.replace(/^\/api/, '')
			}
		  },
		fs: {
		  strict: false
		}
	  }

	  

});
