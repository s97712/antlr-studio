import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173', // Vite开发服务器默认端口
    setupNodeEvents(on, config) {
      // 在这里可以添加Node事件监听器，例如用于模拟Netlify Functions
      // 或者处理其他后端相关的测试设置
    }
  }
})