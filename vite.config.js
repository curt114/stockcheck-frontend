import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   proxy: {
  //     // Your proxy configuration here
  //     '/api': {
  //       target: 'http://24.1.70.197:80/api/v1', // Replace with your API server
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   },
  // },
  plugins: [react()],
});
