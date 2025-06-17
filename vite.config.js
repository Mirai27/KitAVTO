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
    host: '0.0.0.0',
    // port: 3000,
    proxy: {
      '/api': {
        target: 'http://rntfj-92-243-182-206.a.free.pinggy.link',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        headers: {
          'X-Proxy-Client': 'ViteDevServer',
          'User-Agent': 'ViteProxyCustomUA/1.0' // Эта строка, скорее всего, не сработает
                                                 // для переопределения браузерного User-Agent
                                                 // или будет добавлена как дополнительная.
        }

      }
    }
  },
});
