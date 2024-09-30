import dummyData from "../../../../fixtures/addcase.json";
import address from "../../../../fixtures/address.json";
import roles from "../../../../fixtures/visitResult.json";

beforeEach(() => {
  cy.kcloginAsPm();
  cy.visit("/");
  cy.get("a").should("contain", "Amsterdamse Zaak Administratie");
});

describe("Test add.case.anonymous.no.ad.spec", () => {
  it("Select address and create case", () => {
    cy.createCaseForAddress(
      address.queryString,
      `${address.street}, ${address.zipCode}`
    );

    cy.intercept("**/reasons/").as("getReasons");
    cy.intercept("**/subjects/").as("getSubjects");

    cy.get("span")
      .contains(/^Vakantieverhuur$/)
      .siblings()
      .find("input")
      .check({ force: true });

    cy.wait(["@getReasons", "@getSubjects"]).then(() => {
      cy.get("span")
        .contains(/^SIG melding$/)
        .siblings()
        .find("input")
        .check({ force: true });

      cy.get("span")
        .contains(dummyData.subject)
        .siblings()
        .find("input")
        .check({ force: true });
    });

    cy.get('[data-testid="yes"]').check({ force: true });

    cy.get('[data-testid="identification"]').type(dummyData.sigIdentification);

    cy.get('[data-testid="description_citizenreport"]').type(
      dummyData.sigDescription
    );

    cy.get("#advertisement_no").check({ force: true });

    cy.get('[data-testid="description"]').type(dummyData.description);

    cy.get(`[data-testid="submit"]`).click();

    cy.get(`[role="dialog"]`).should("have.length", 1);

    cy.get(`[role="dialog"]`)
      .should("contain", "Vakantieverhuur")
      .and("contain", "SIG melding")
      .and("contain", "Ja, de melder is anoniem")
      .and("contain", "Nee, er is geen advertentie")
      .and("contain", dummyData.subject)
      .and("contain", dummyData.sigIdentification)
      .and("contain", dummyData.sigDescription)
      .and("contain", dummyData.description)
      .find("button")
      .contains("Zaak aanmaken")
      .click();

    // Set caseId to use in the next tests.
    cy.setCaseId();

    cy.url().should("include", "/zaken/");
  });

  it("ZaakDetail has address and history", () => {
    cy.goToCaseDetailPage();

    cy.get("h2").contains(`${address.street}, ${address.zipCode}`);

    cy.history("SIG melding verwerken", roles.PM);
  });
});
