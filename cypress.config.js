const { defineConfig } = require("cypress");
/// <reference types="@shelex/cypress-allure-plugin" />"
const allureWriter = require('@shelex/cypress-allure-plugin/writer');


module.exports = defineConfig({
  projectId: "h2pbjw",
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      allureWriter(on, config);
      return config;
    },
    env:{
      url: "https://rahulshettyacademy.com",
      allureResultsPath:'allure-results',
      //CYPRESS_RECORD_KEY: "ed63325d-d5c4-4f4b-a73b-a8fcfefd373a"
    },
    specPattern: 'cypress/integration/examples/*.js',
    hideXHR: true,
    viewportHeight: 900,
    viewportWidth: 1700,
  
    reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir:"cypress/report",
    charts: true,
    reportPageTitle: 'Basic Cypress Report',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
    //defaultCommandTimeout:5000,
    //chromeWebSecurity: true
    
  },
  
});
