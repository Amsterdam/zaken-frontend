import debrief from "../../fixtures/debrief.json";
import roles from "../../fixtures/roles.json";
import address from "../../fixtures/address.json";

// Projectmedewerker
beforeEach(() => {
  cy.kcloginAsPm();
  cy.visit("/");
  cy.get("a").should("contain", "Amsterdamse Zaak Administratie");
});

describe('Close case as projectmedwerker"', () => {
  it('Go to Adresoverzicht and case has task "Afsluiten zaak"', () => {
    const url = `${Cypress.env("baseUrlAcc")}addresses/*/cases/`;
    cy.intercept(url).as("getCases");
    cy.visit(`/adres/${address.bagId}`);
    cy.wait("@getCases").then(() => {
      cy.get("h1").contains(`${address.street}, ${address.zipCode}`);
    });

    cy.scrollTo(0, 400);
    cy.get("tbody>tr").contains("td", "Afsluiten zaak").click();

    cy.get("h1").contains("Zaakdetails");
  });

  it("Intercept Afronding URL and load page", () => {
    cy.goToCaseDetailPage();
    const url = `${Cypress.env("baseUrlAcc")}cases/*/`;
    cy.intercept(url).as("getTasks");

    //force intercept
    cy.reload();

    cy.wait("@getTasks").then(({ response }) => {
      const closingResponse = response?.body?.workflows?.find(
        (e) => e.state?.name === debrief.closingTask2
      );
      const closingTask = closingResponse?.tasks?.find(
        (e) => e.name === debrief.closingTask4
      );
      const caseId = closingTask?.case;
      const taskId = closingTask.case_user_task_id;

      const url = `${Cypress.env("baseUrlAcc")}themes/*/case-close-reasons`;
      cy.intercept(url).as("getCloseReasons");
      cy.get("h4").contains(debrief.closingTask2);
      cy.get("tbody>tr")
        .contains("td", debrief.closingTask4)
        .siblings("td")
        .contains(roles.PM);

      cy.testDueDate("tbody>tr>td", 5);

      cy.visit(`/zaken/${caseId}/afronding/${taskId}`);

      cy.wait("@getCloseReasons").then(() => {
        cy.get("h1").contains("Zaak afronden");
      });
    });

    cy.get("label[for='reason_3']")
      .find('[data-e2e-id="3"]')
      .check({ force: true });

    cy.get('[data-e2e-id="description"]').type(debrief.closingDescription);

    cy.get('button[data-e2e-id="submit"]')
      .contains("Verwerken")
      .should("not.be.disabled")
      .click();

    cy.get(`[role="dialog"]`).should("have.length", 1);

    cy.get(`[role="dialog"]`)
      .should("contain", debrief.closingReason3)
      .and("contain", debrief.closingDescription)
      .find(`button`)
      .contains("Verwerken")
      .click();
  });

  it("Request is successfully processed", () => {
    cy.goToCaseDetailPage();

    cy.history("Zaak afgerond", "Projectmedewerker");
  });
});
