import address from "../../fixtures/address.json"
import roles from "../../fixtures/roles.json"
import extraTasks from "../../fixtures/extraTasks.json"

describe('Add extra task "Objection File', () => {

  describe('Go to "Taak opvoeren" form', () => {

    it.skip("Login as projectmedewerker", () => {
      cy.loginAsPm()
    })

    it("Go to Adresoverzicht and check address", () => {
      const url = `**/addresses/*/cases/`
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

    it("Select Task Aanleveren bezwaardossier", () => {
      const url = `**/cases/*/processes/`
      cy.intercept(url).as("getProcesses")
      cy.wait("@getProcesses").then(() => {
      cy.get('[data-testid="workflowProcess"]')
        .select(extraTasks.taskObjectionFile)
      cy.get(`[data-testid="submit"]`)
        .click()

      cy.get(`[role="dialog"]`).should("have.length", 1)

      cy.get(`[role="dialog"]`)
        .should("contain", extraTasks.taskObjectionFile)
        .find("button")
        .contains(extraTasks.label)
        .click()
      })
    })

    it("Request is successfully processed", () => {
      const url = `**/cases/*/events/`
      cy.intercept(url).as("getEvents")
      cy.wait("@getEvents").then(() => {
        cy.get("h4")
          .contains("Bezwaardossier")
        cy.get("tbody>tr")
          .contains("td", extraTasks.taskObjectionFile)
        cy.testDueDate("tbody>tr>td", 0)
      })
    })
  })

  describe("PHH processes ObjectionFile", () => {
    it.skip("Login as PHH", () => {
      cy.loginAsHh()
    })

    it("Go to Adresoverzicht and check address", () => {
      const url = `**/addresses/*/cases/`
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

    it('PHH can finish task "ObjectionFile"', () => {

      cy.get("tbody>tr>td")
        .eq(1)
        .should("contain",extraTasks.taskObjectionFile)
        .siblings('td')
        .contains(roles.PHH)
        .parents('td')
        .siblings('td')
        .contains("Taak afronden")
        .click({force: true})

      cy.get(`[role="dialog"]`)
          .should('have.length', 1)
          .contains("h4", extraTasks.taskObjectionFile)

      cy.get(`[role="dialog"]`)
        .find('input[name="completed"]')
        .first()
        .check()

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
      const url = `**/addresses/*/cases/`
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
      cy.history(extraTasks.taskObjectionFile, "Uitvoerder")
    })
  })
})
