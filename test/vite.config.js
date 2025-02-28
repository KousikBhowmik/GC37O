import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  server: {
    port: 5174,
    open: true,
  },
  plugins: [tailwindcss()],
});
