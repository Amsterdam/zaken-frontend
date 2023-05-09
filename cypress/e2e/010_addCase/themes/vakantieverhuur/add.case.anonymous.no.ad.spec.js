import dummyData from "../../../../fixtures/addcase.json"
import address from "../../../../fixtures/address.json"

beforeEach(() =>  {
  cy.kcloginAsPm();
  cy.visit('/');
  cy.get('a')
    .should('contain', 'Amsterdamse Zaak Administratie');
});
// afterEach(() =>  {
//   cy.kcLogout();
// });


describe("Test add.case.anonymous.no.ad.spec", () => {

  it("Select address and create case", () => {
    cy.createCaseForAddress(address.queryString, `${address.street}, ${address.zipCode}`)

    cy.intercept("**/reasons/").as("getReasons")
    cy.intercept("**/subjects/").as("getSubjects")

    cy.get("span")
      .contains(/^Vakantieverhuur$/)
      .siblings()
      .find("input")
      .check({force: true})

    cy.wait(["@getReasons", "@getSubjects"]).then(() => {
      cy.get("span")
        .contains(/^SIA melding$/)
        .siblings()
        .find("input")
        .check({force: true})

      cy.get("span")
        .contains(dummyData.subject)
        .siblings()
        .find("input")
        .check({force: true})
    })

    cy.get('[data-e2e-id="yes"]')
      .check({force: true})

    cy.get('[data-e2e-id="identification"]')
      .type(dummyData.siaIdentification)

    cy.get('[data-e2e-id="description_citizenreport"]')
      .type(dummyData.siaDescription)

    cy.get("#advertisement_no")
      .check({force: true})

    cy.get('[data-e2e-id="description"]')
      .type(dummyData.description)

    cy.get(`[data-e2e-id="submit"]`)
      .click()

    cy.get(`[role="dialog"]`).should("have.length", 1)

    cy.get(`[role="dialog"]`)
      .should("contain", "Vakantieverhuur")
      .and("contain", "SIA melding")
      .and("contain", "Ja, de melder is anoniem")
      .and("contain", "Nee, er is geen advertentie")
      .and("contain", dummyData.subject)
      .and("contain", dummyData.siaIdentification)
      .and("contain", dummyData.siaDescription)
      .and("contain", dummyData.description)
      .find("button")
      .contains("Zaak aanmaken")
      .click()

    // Set caseId to use in the next tests.
    cy.setCaseId()

    cy.url()
      .should("include", "/zaken/")
  })

  it("ZaakDetail has address and history", () => {
    cy.goToCaseDetailPage()

    cy.get("h2")
      .contains(`${address.street}, ${address.zipCode}`)

    cy.history("SIA melding verwerken", "Projectmedewerker")
  })
})
