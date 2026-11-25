import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const previewHost = process.env.PREVIEW_HOST;

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3002,
    strictPort: true,
    allowedHosts: previewHost ? [previewHost] : [],
  },
});
