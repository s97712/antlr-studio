const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5175',
    supportFile: 'cypress/support/e2e.js', // 显式指定支持文件
    setupNodeEvents(on, config) {
      // 添加Node事件监听器
    }
  }
})