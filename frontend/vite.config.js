import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),
    compression({
      // Compressão gzip
      algorithm: "gzip",
      ext: ".gz",
      // Compressão brotli
      deleteOriginFile: false,
      threshold: 10240,
    }),
  ],
  build: {
    minify: "terser", // Minificação mais agressiva
    rollupOptions: {
      output: {
        manualChunks: {
          // Separar vendor chunks
          vendor: ["react", "react-dom", "react-router-dom"],
          // Outros chunks específicos
          auth: ["./src/contexts/AuthContext.js"],
        },
        // Compressão de assets
        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
  },
});
