import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // relative base so the build works at any path (e.g. s3rj.com/nudl/)
  base: './',
  plugins: [react()],
});
