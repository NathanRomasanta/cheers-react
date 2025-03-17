const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://cheers-react-pie-git-a39dd4-nathan-romasantas-projects-f39eeed6.vercel.app/",
    browser: "chrome",
    supportFile: 'cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
