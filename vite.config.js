import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  exclude: ['react-dropzone', 'react-bootstrap', 'react-router', 'react-tabs', 'primereact', '@mui/icons-material'],
})
