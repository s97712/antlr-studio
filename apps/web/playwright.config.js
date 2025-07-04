import { defineConfig } from '@playwright/test';

// 前端测试的配置
export default defineConfig({
  testDir: './playwright-e2e',
  use: {
    // 前端测试的基础 URL
    baseURL: 'http://localhost:5175',
  },
  webServer: [
    {
      command: 'pnpm run dev',
      url: 'http://localhost:5175',
      reuseExistingServer: !process.env.CI,
    },
    {
      command: 'pnpm --dir ../.. run dev:api',
      url: 'http://localhost:8888/.netlify/functions/ping',
      reuseExistingServer: !process.env.CI,
    }
  ],
});