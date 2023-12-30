import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '192.168.1.130', // 131 development 130 production
    port: 5001,
    proxy: {
      // Your proxy configuration here
      '/api': {
        target: 'http://192.168.1.130:5000/api/v1', // Replace with your API server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [react()],
});
