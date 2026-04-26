import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    strictPort: true, // This will fail instead of switching to 5174 if the port is busy
  },
  // ... rest of your config
})