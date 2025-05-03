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
        target: 'http://92.243.181.50:5555',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
});
