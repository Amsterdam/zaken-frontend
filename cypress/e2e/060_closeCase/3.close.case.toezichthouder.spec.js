import address from "../../fixtures/address.json";
import roles from "../../fixtures/roles.json";

// Toezichthouder
beforeEach(() => {
  cy.kcloginAsTh();
  cy.visit("/");
  cy.get("a").should("contain", "Amsterdamse Zaak Administratie");
});

describe("Select Next Step - closing case as toezichthouder", () => {
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

  it("Handhaver should not be able to close the case", () => {
    cy.goToCaseDetailPage();

    cy.get("tbody>tr>td").eq(2).should("contain", roles.PM);

    const url = `${Cypress.env("baseUrlAcc")}themes/*/case-close-reasons/`;
    cy.intercept(url).as("getCloseReasons");

    cy.get("tbody>tr").contains("td", "Zaak afsluiten").click();

    cy.wait("@getCloseReasons").then(() => {
      cy.get("h1").contains("Zaak afronden");
    });

    cy.get("[data-testid=1]").check({ force: true });

    cy.get('button[data-testid="submit"]')
      .contains("Verwerken")
      .should("be.disabled");
  });
});
