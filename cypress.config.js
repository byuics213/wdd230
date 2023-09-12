const { defineConfig } = require('cypress')

module.exports = defineConfig({
  defaultCommandTimeout: 1000,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    supportFile: './cypress/support/support.js',
  },
})
