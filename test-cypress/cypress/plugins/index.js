// https://docs.cypress.io/guides/guides/plugins-guide.html

// if you need a custom webpack configuration you can uncomment the following import
// and then use the `file:preprocessor` event
// as explained in the cypress docs
// https://docs.cypress.io/api/plugins/preprocessors-api.html#Examples

/* eslint-disable import/no-extraneous-dependencies, global-require, arrow-body-style */
// const webpack = require('@cypress/webpack-preprocessor')

module.exports = (on, config) => {
  return Object.assign({}, config, {
    baseUrl: process.env.FRONTEND_URL,
    fixturesFolder: "cypress/e2e/fixtures",
    integrationFolder: "cypress/e2e/specs",
    screenshotsFolder: "cypress/e2e/screenshots",
    videosFolder: "cypress/e2e/videos",
    supportFile: "cypress/e2e/support/index.js",
  });
};
