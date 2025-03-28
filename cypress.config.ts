const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // baseUrl: "https://cheers-react-pie-git-a39dd4-nathan-romasantas-projects-f39eeed6.vercel.app/",
    baseUrl: "http://localhost:3000",
    browser: "chrome",
    supportFile: "cypress/support/e2e.ts",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
