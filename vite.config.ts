import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    proxy: {
      '/api': {
        target: 'https://prodmydepps.leadagro.net',
        changeOrigin: true,
        secure: false, // Désactiver si le certificat SSL est auto-signé
        rewrite: (path) => path.replace(/^\/api/, '/api') // Garde le préfixe
      }
    }
  }
});
