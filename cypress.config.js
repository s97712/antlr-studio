const { defineConfig } = require('cypress');
const port = process.env["PORT"] ?? "8888";

module.exports = defineConfig({
  e2e: {
    baseUrl: `http://localhost:${port}`,
    specPattern: 'cypress/integration/**/*.spec.js',
    supportFile: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});