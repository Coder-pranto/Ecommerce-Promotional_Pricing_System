import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://www.discounthut-bd.com/",
  server: {
    port: 3000,
  },
});
