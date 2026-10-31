import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { assignmentBackendMiddleware } from './src/server/assignmentBackend.js'
import { activityBackendMiddleware } from './src/server/activityBackend.js'
import { assessmentBackendMiddleware } from './src/server/assessmentBackend.js'
import { personalityBackendMiddleware } from './src/server/personalityBackend.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'highorbit-assignment-api-backend',
      configureServer(server) {
        server.middlewares.use(assignmentBackendMiddleware);
        server.middlewares.use(activityBackendMiddleware);
        server.middlewares.use(assessmentBackendMiddleware);
        server.middlewares.use(personalityBackendMiddleware);
      }
    }
  ],
  server: {
    port: 3000,
    host: true
  }
})

