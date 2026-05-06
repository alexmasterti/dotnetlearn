import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Curriculum data is ~700KB and changes often. Splitting it into its
    // own chunk keeps the main app bundle small and fast to parse, and
    // lets the browser fetch both in parallel.
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('csharp-curriculum')) return 'curriculum'
          if (id.includes('node_modules/@codemirror')) return 'codemirror'
          if (id.includes('node_modules/codemirror')) return 'codemirror'
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
})
