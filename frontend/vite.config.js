import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import compression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: "gzip",
      ext: ".gz",

      deleteOriginFile: false,
      threshold: 10240,
    }),
  ],
  build: {
    minify: "terser",
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],

          auth: ["./src/contexts/AuthContext.js"],
        },

        assetFileNames: "assets/[name].[hash].[ext]",
      },
    },
  },
});
