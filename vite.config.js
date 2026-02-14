//import { defineConfig } from 'vite'
//import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
//export default defineConfig({
//  plugins: [react()],
//})
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: true,         // Listen on all local IPs (0.0.0.0)
    strictPort: true,   // Keeps the port consistent for ngrok
    allowedHosts: ['unwailing-mutteringly-birgit.ngrok-free.dev',
                    '.ngrok-free.app', '.ngrok.io'
    ]
  }
})