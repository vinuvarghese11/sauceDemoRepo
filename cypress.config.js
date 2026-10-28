const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.saucedemo.com',
    viewportWidth: 1280,
    viewportHeight: 800,
    video: false,
    screenshotOnRunFailure: true,
    reporter: 'mochawesome',
    reporterOptions: {
      reportDir: 'cypress/results/json',
      overwrite: false,
      html: false,
      json: true
    },
    setupNodeEvents(on, config) {
      // Node event listeners if required
    },
  },
  env: {
    standardUser: 'standard_user',
    lockedUser: 'locked_out_user',
    password: 'secret_sauce'
  }
});