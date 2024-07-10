import debrief from "../../fixtures/debrief.json";
import roles from "../../fixtures/roles.json";
import address from "../../fixtures/address.json";

beforeEach(() => {
  cy.kcloginAsPm();
  cy.visit("/");
  cy.get("a").should("contain", "Amsterdamse Zaak Administratie");
});

describe("Test report.short.spec", () => {
  it("Go to case details and check dueDate", () => {
    cy.goToCaseDetailPage();
    cy.testDueDate("tbody>tr>td", 3);
  });

  it('PHH can finish task "Uitzetten vervolgstap"', () => {
    cy.goToCaseDetailPage();

    cy.get("tbody>tr")
      .should("have.length", 3)
      .contains(roles.PHH)
      .parents("td")
      .siblings("td")
      .contains("Taak afronden")
      .click({ force: true });

    cy.get(`[role="dialog"]`)
      .should("have.length", 1)
      .contains(debrief.closingTask1);

    cy.get('[data-testid="next_step"]').select(debrief.closingTask2);

    cy.get(`[role="dialog"]`).find("button").contains("Taak afronden").click();

    const url = `**/cases/*/`;
    cy.intercept(url).as("getNextTask");

    cy.wait("@getNextTask").then(() => {
      cy.scrollTo(0, 400);
      cy.get("h4").contains(debrief.closingTask2);
      cy.get("tbody>tr")
        .contains("td", debrief.closingTask4)
        .siblings("td")
        .contains(roles.PM);
    });
  });

  it("Check Uitzetten vervolgstap event in history", () => {
    cy.goToCaseDetailPage();
    cy.history(debrief.closingTask1);
  });
});
