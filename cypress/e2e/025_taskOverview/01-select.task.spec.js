import address from "../../fixtures/address.json";
import debrief from "../../fixtures/debrief.json";
import roles from "../../fixtures/roles.json";

beforeEach(() => {
  cy.kcloginAsPm();
  cy.visit("/");
  cy.get("a").should("contain", "Amsterdamse Zaak Administratie");
});

describe("Test select.task.spec", () => {
  it("Pick up task and put away in Takenoverzicht", () => {
    const urlTasks = `${Cypress.env("baseUrlAcc")}tasks/*`;
    cy.intercept(urlTasks).as("getTasks");
    cy.visit("/taken");
    cy.wait("@getTasks").then(() => {
      cy.get("h1").contains("Takenoverzicht");
    });

    const urlTasksUpdate = `${Cypress.env("baseUrlAcc")}tasks/*/`;
    cy.intercept(urlTasksUpdate).as("updateTask");
    const checkBox = cy.get('[type="checkbox"][title="Beschikbaar"]').first();
    checkBox.check();
    cy.wait("@updateTask").then((e) => {
      cy.get(`[type="checkbox"][data-testid="${e.response.body.id}"]`);
      checkBox.should("be.checked");
      checkBox.uncheck();
    });
  });
});
