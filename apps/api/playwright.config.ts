import { defineConfig } from '@playwright/test';

// 从环境变量读取端口，或默认为 3000
const PORT = process.env.PORT || 3000;

export default defineConfig({
  // 指定新的 Playwright 测试文件存放目录
  testDir: './tests',

  webServer: {
    command: `pnpm dev`,
    stdout: "pipe",
    url: `http://localhost:${PORT}/api/ping`,
    reuseExistingServer: !process.env.CI,
  },
  
  use: {
    baseURL: `http://localhost:${PORT}`,
  },
});