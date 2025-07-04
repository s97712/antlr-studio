// playwright.config.js
import { defineConfig } from '@playwright/test';

// 从环境变量读取端口，或默认为 8889
const PORT = process.env.PORT || 8888;

export default defineConfig({
  // 指定新的 Playwright 测试文件存放目录
  testDir: './playwright-e2e',

  webServer: {
    command: `pnpm run dev:api --port=${PORT}`,
    url: `http://localhost:${PORT}/.netlify/functions/ping`,
    reuseExistingServer: !process.env.CI,
  },
  
  use: {
    baseURL: `http://localhost:${PORT}`,
  },
});