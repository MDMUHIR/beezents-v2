import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const proxyTarget = env.VITE_API_PROXY_TARGET || env.VITE_API_BASE_URL || 'http://localhost:8000';

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        // Static-host SPA fallback: emit the built index.html as 404.html so
        // deep links like /services/ai-agents resolve on hosts without a
        // rewrite rule (Netlify, Vercel, GitHub Pages, S3, etc.).
        name: 'spa-404-fallback',
        apply: 'build',
        closeBundle() {
          const indexFile = path.resolve(__dirname, 'dist/index.html');
          if (fs.existsSync(indexFile)) {
            fs.copyFileSync(indexFile, path.resolve(__dirname, 'dist/404.html'));
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      proxy: {
        '/backend': {
          target: proxyTarget,
          changeOrigin: true,
          secure: false,
          rewrite: (requestPath: string) => requestPath.replace(/^\/backend/, ''),
        },
      },
    },
    build: {
      // Cache-friendly vendor splitting: stable chunks for the framework,
      // animation, and icon libraries instead of one ~870 kB bundle.
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            motion: ['motion', 'motion/react'],
            icons: ['lucide-react'],
          },
        },
      },
    },
  };
});