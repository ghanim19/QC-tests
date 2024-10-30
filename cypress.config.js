const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'yj6g9v',
  video: true,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
