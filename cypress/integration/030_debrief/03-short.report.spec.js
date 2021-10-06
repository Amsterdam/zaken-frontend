import debrief from "../../fixtures/debrief.json"
import roles from "../../fixtures/roles.json"
import address from "../../fixtures/address.json"

describe('Process Short Report Visit"', () => {
    
  it("Go to Adresoverzicht and check address", () => {
    const url = `${Cypress.env("baseUrlAcc")}addresses/*/cases/?open_cases=true`
    cy.intercept(url).as('getCases')
    cy.visit(`/adres/${address.bagId}`)
    cy.wait('@getCases').then(() => {
      cy.get("h1")
        .contains(`${address.street}, ${address.zipCode}`)
    })
  })

  it("Select case by caseId", () => {
    cy.scrollTo(0, 400)
    cy.getCaseId().then((e) => {
      cy.log('caseId =>', e.id)
      cy.get("tbody>tr")
        .contains("td", e.id)
        .click()
    })
  })
  
  it('TH can finish task "Opstellen verkorte rapportage huisbezoek"', () => {
  
    cy.get("tbody>tr")
      .should("have.length", 1)
      .contains(roles.TH)
      .parents('td')
      .siblings('td')
      .contains("Taak afronden")
      .click({force: true})

    cy.get(`[role="dialog"]`)
        .should('have.length', 1)
        .contains(debrief.noViolationNextTask2)
        
    cy.get(`[role="dialog"]`)
        .find('input[name="completed"]')
        .first()
        .check()
    
    cy.get(`[role="dialog"]`)
        .find('button')
        .contains("Taak afronden")
        .click()
  })

  it("Check next task is 'Uitzetten vervolgstap'", () => {
    const url = `${Cypress.env("baseUrlAcc")}cases/*/tasks/`
    cy.intercept(url).as('getNextTask')

    cy.wait('@getNextTask').then(() => {
        
      cy.scrollTo(0, 400)
      cy.get("h4")
        .contains("Vervolgstap")
      cy.get("tbody>tr")
        .contains("td", debrief.closingTask1)
        .siblings("td")
        .contains(roles.PHH)
        .parents('td')
        .siblings('td')
        .contains("Taak afronden")
    })
  })

  it("Check Opstellen verkorte rapportage huisbezoek event in history", () => {
    cy.scrollTo(0, 600)
    cy.get("h2")
      .contains("Zaakhistorie")
    // TODO when double spaces in bpmn are fixed in the backend
    // use cy.history(debrief.noViolationNextTask2)
    cy.get(`button[title="Opstellen  verkorte rapportage huisbezoek "]`)
      .should("have.attr", "aria-expanded", "true")
      .contains(debrief.noViolationNextTask2)
  })
})