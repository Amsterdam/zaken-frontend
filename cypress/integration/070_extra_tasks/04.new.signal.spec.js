import address from "../../fixtures/address.json"
import roles from "../../fixtures/roles.json"
import extraTasks from "../../fixtures/extraTasks.json"

describe('Add extra task "New signal', () => {

  describe('Go to "Taak opvoeren" form', () => {

    it.skip("Login as projectmedewerker", () => {
      cy.loginAsPm()
    })

    it("Go to Adresoverzicht and check address", () => {
      const url = `${Cypress.env("baseUrlAcc")}addresses/*/cases/`
      cy.intercept(url).as("getCases")
      cy.visit(`/adres/${address.bagId}`)
      cy.wait("@getCases").then(() => {
        cy.get("h1")
          .contains(`${address.street}, ${address.zipCode}`)
      })
    })

    it("Select case by caseId", () => {
      cy.scrollTo(0, 400)
      cy.getCaseId().then((e) => {
        cy.get("tbody>tr")
          .contains("td", e.id)
          .click()
      })
    })

    it("Click button 'Taak opvoeren'", () => {
      cy.get("div")
        .contains("a", "Taak opvoeren")
        .click()
    })

  })

  describe("Submit in form 'Taak opvoeren'", () => {  
    
    it("Select Task Verwerken nieuwe melding", () => {
      const url = `${Cypress.env("baseUrlAcc")}cases/*/processes/`
      cy.intercept(url).as("getProcesses")
      cy.wait("@getProcesses").then(() => {
      cy.get('[data-e2e-id="workflowProcess"]')
        .select("Nieuwe melding")
      cy.get(`[data-e2e-id="submit"]`)
        .click()

      cy.get(`[role="dialog"]`).should("have.length", 1)

      cy.get(`[role="dialog"]`)
        .should("contain", "Nieuwe melding")
        .find("button")
        .contains(extraTasks.label)
        .click()
      })
    })

    it("Request is successfully processed", () => {
      const url = `${Cypress.env("baseUrlAcc")}cases/*/events/`
      cy.intercept(url).as("getEvents")
      cy.wait("@getEvents").then(() => {
        cy.get("h4")
          .contains("Melding")
        cy.get("tbody>tr")
          .contains("td", extraTasks.taskNewSignal)
        cy.testDueDate("tbody>tr>td", 0)
      })
    })
  })

  describe("PM processes New signal", () => {  
    it('PM can finish task "New signal"', () => {
  
      cy.get("tbody>tr>td")
        .eq(1)
        .should("contain",extraTasks.taskNewSignal)
        .siblings('td')
        .contains(roles.PM)
        .parents('td')
        .siblings('td')
        .contains("Melding verwerken")
        .click({force: true})
    })

    it("Melding verwerken page is visible", () => {
      cy.get("h1")
        .contains("Melding verwerken")
      cy.get("dd")
        .contains(address.street)
    })

    it("Logout", () => {
      cy.logout()
    })
  })
})
