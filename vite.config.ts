import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MikanUI',
      fileName: 'mikanui'
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
    outDir: resolve(__dirname, 'dist'),
  },
  root: 'playground',
  plugins: [
    {
      name: 'mikanui-plugin',
      
    }
  ]
})
