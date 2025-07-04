const { defineConfig } = require('cypress')
const port = process.env["PORT"] ?? "5175";

module.exports = defineConfig({
  e2e: {
    baseUrl: `http://localhost:${port}`,
    supportFile: 'cypress/support/e2e.js', // 显式指定支持文件
    setupNodeEvents(on, config) {
      on('task', {
        log(message) {
          console.log(message)
          return null
        },
      })
    }
  }
})