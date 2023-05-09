import address from "../../fixtures/address.json";
import debrief from "../../fixtures/debrief.json";
import roles from "../../fixtures/roles.json";

beforeEach(() => {
  cy.kcloginAsPm();
  cy.visit("/");
  cy.get("a").should("contain", "Amsterdamse Zaak Administratie");
});

describe("Test debrief.no.violation.spec", () => {
  it("Select debrief and submit", () => {
    cy.goToCaseDetailPage();

    cy.get("tbody>tr").contains("td", debrief.taskName).click();

    cy.get("h1").contains(debrief.headerText);

    cy.get('[data-e2e-id="NO"]').check({ force: true });

    cy.get('[data-e2e-id="feedback"]').type(debrief.descriptionNoViolation);

    const url = `${Cypress.env("baseUrlAcc")}cases/*/`;
    cy.intercept(url).as("getNextTask");

    cy.get('button[data-e2e-id="submit"]')
      .contains(debrief.formButtonText)
      .click();

    cy.get(`[role="dialog"]`).should("have.length", 1);

    cy.get(`[role="dialog"]`)
      .should("contain", debrief.labelNo)
      .and("contain", debrief.descriptionNoViolation)
      .find(`button`)
      .contains(debrief.formButtonText)
      .click();

    cy.wait("@getNextTask").then(() => {
      cy.scrollTo(0, 400);
      cy.get("h4").contains("Debrief");
      cy.get("tbody>tr")
        .contains("td", debrief.noViolationNextTask)
        .siblings("td")
        .contains(roles.TH)
        .parents("td")
        .siblings("td")
        .contains("Taak afronden")
        .click({ force: true });

      cy.get(`[role="dialog"]`)
        .should("have.length", 1)
        .contains(debrief.noViolationNextTask);

      cy.get(`[role="dialog"]`).find('input[name="completed"]').first().check();
      cy.get(`[role="dialog"]`)
        .find("button")
        .contains("Taak afronden")
        .click();
    });
  });

  it("Check debrief event in history", () => {
    cy.goToCaseDetailPage();
    cy.history(debrief.noViolationNextTask, roles.PM);
  });
});
