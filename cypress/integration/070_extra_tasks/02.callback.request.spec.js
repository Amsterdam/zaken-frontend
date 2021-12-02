import address from "../../fixtures/address.json"
import roles from "../../fixtures/roles.json"
import extraTasks from "../../fixtures/extraTasks.json"

describe('Add extra task "Callback request', () => {

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
    
    it("Select Task Terugbelverzoek", () => {
      const url = `${Cypress.env("baseUrlAcc")}cases/*/processes/`
      cy.intercept(url).as("getProcesses")
      cy.wait("@getProcesses").then(() => {
      cy.get('[data-e2e-id="workflowProcess"]')
        .select(extraTasks.taskCallback)
      cy.get(`[data-e2e-id="submit"]`)
        .click()

      cy.get(`[role="dialog"]`).should("have.length", 1)

      cy.get(`[role="dialog"]`)
        .should("contain", extraTasks.taskCallback)
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
          .contains(extraTasks.taskCallback)
        cy.get("tbody>tr")
          .contains("td", extraTasks.taskCallback.toLowerCase())
        cy.testDueDate("tbody>tr>td", 0)
      })
    })
  })

  describe("PHH processes Callbackrequest", () => {  
    it.skip("Login as PHH", () => {
      cy.loginAsHh()
    })

    it("Go to Adresoverzicht and check address", () => {
      const url = `${Cypress.env("baseUrlAcc")}addresses/*/cases/`
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
        cy.get("tbody>tr")
          .contains("td", e.id)
          .click()
      })
    })

    it('PHH can finish task "Callbackrequest"', () => {
  
      cy.get("tbody>tr>td")
        .eq(1)
        .should("contain",extraTasks.taskCallback.toLowerCase())
        .siblings('td')
        .contains(roles.PHH)
        .parents('td')
        .siblings('td')
        .contains("Taak afronden")
        .click({force: true})
  
      cy.get(`[role="dialog"]`)
          .should('have.length', 1)
          .contains("h4", extraTasks.taskCallback.toLowerCase())
          
      cy.get(`[role="dialog"]`)
        .find('[data-e2e-id="callbackrequest_form"]')
        .type(extraTasks.description)
      
      cy.get(`[role="dialog"]`)
          .find('button')
          .contains("Taak afronden")
          .click()
    })
  })

  describe("Check request is processed", () => {  

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

    it("History contains the right items", () => {
      cy.history(`Oppakken ${extraTasks.taskCallback.toLowerCase()}`, "Uitvoerder")
    })
  })
})
