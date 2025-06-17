import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(
    //   {
    //   config: {
    //     content: ["./src/**/*.{html,js,ts,jsx,tsx}", "./src/**/*.css"],
    //     experimental: {
    //       optimizeUniversalDefaults: true,
    //     },
    //   },
    // }
  ),
  ],

  server: {
    host: process.env.VITE_HOST,
    port: process.env.VITE_PORT ? Number(process.env.VITE_PORT) : undefined,
    proxy: {
      '/api': {
        target: process.env.REACT_APP_BACKEND_URL,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        headers: {
          'X-Proxy-Client': 'ViteDevServer',
          'User-Agent': 'ViteProxyCustomUA/1.0'
        }
      }
    }
  },
});
