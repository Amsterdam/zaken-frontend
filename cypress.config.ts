import { defineConfig } from "cypress"

export default defineConfig({
  projectId: "tbpt8b",
  chromeWebSecurity: false,
  screenshotOnRunFailure: false,
  video: true,
  viewportWidth: 1280,
  viewportHeight: 1024,
  defaultCommandTimeout: 10000,
  requestTimeout: 10000,

  env: {
    baseUrlAcc: "https://acc.api.wonen.zaken.amsterdam.nl/api/v1/",
    baseUrlData: "https://api.data.amsterdam.nl/",
    userHh: "handhaver-noreply@amsterdam.nl",
    userHhj: "handhavingsjurist-noreply@amsterdam.nl",
    userPm: "projectmedewerker-noreply@amsterdam.nl",
    userTh: "toezichthouder-noreply@amsterdam.nl"
  },

  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require("./cypress/plugins/index.js")(on, config)
    },
    baseUrl: "http://localhost:2999/",
    specPattern: [
      "cypress/e2e/010_addCase/themes/vakantieverhuur/add.case.anonymous.no.ad.spec.js",
      "cypress/e2e/020_visit/visit.plan.spec.js",
      "cypress/e2e/020_visit/visit.result.access.granted.spec.js",
      "cypress/e2e/025_taskOverview/*.js",
      "cypress/e2e/030_debrief/01-debrief.no.violation.spec.js",
      "cypress/e2e/030_debrief/03-report.short.spec.js",
      "cypress/e2e/060_closeCase/*.js"
    ]
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack"
    }
  }
})
