import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
export default defineConfig({
  plugins: [react()],
  preview: {
    allowedHosts: "app-9cb8c7f8-92a1-44d0-911e-159498a660bf.cleverapps.io",
    port: 8080,
  },
});
