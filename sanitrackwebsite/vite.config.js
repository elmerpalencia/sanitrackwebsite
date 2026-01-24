import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,          // 🔑 REQUIRED
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: true   // 🔑 REQUIRED for Docker
    }
  }
})