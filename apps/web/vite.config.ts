import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 允许外部访问
    port: 5175, // 更新端口以匹配测试配置
    proxy: {
      '/.netlify/functions': {
        target: 'http://localhost:8888',
        changeOrigin: true,
        secure: false
      }
    },
    fs: {
      // 允许从父目录访问文件
      allow: ['..'],
    },
    // 允许从Docker内部访问
    hmr: {
      host: 'host.docker.internal', // 允许从Docker内部访问
      protocol: 'ws',
    },
    watch: {
      usePolling: true,
    },
    allowedHosts: ['host.docker.internal'], // 允许host.docker.internal
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
  },
  // optimizeDeps: {
  //   include: ['antlr4'], // 强制Vite预构建antlr4
  // }
})
