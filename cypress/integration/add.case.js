Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  console.log("Error ", err)
  return false
})

describe("Try to login", () => {

  it("Login user", () => {
    cy.loginAsPm()
  })
})

describe("Find address", () => {
  //TODO implement fixture with dummy data
  // before( () => {
  //   cy.fixture('addcase').then( (addcase) => {
  //       this.addcase = addcase
  //   })
  // })
  
  it("Search query", () => {
    //type searchquery
    cy.get("#2")
      .should("be.visible")
      .type("1018VN113")
      .wait(1000)
  })

  it("Go to first adress searchresults", () => {
    cy.get("tbody>tr").eq(0)
      .should("be.visible")
      .click()
  })
  
  it("Goto create case page", () => {
    cy.get("span[data-e2e-id=btn_add_case]")
      .should("be.visible")
      .click()
  })
})
  
describe("Add case to address", () => {

  //TODO implement fixture with dummy data
  // before(function () {
  //   cy.fixture('addCase').then(function (addCase) {
  //       this.addCase = addCase
  //   })
  // })

  it("Select Vakantieverhuur", () => {
    cy.get("#theme_1")
      .should("be.visible")
      .check({force: true})
  })
  
  it("Select Melding", () => {
    cy.get("#reason_0")
      .should("be.visible")
      .check({force: true})
  })
  
  it("Select anonieme melder", () => {
    cy.get('[data-e2e-id="yes"]')
      .should("be.visible")
      .check({force: true})
  })

  it("Set SIA id", () => {
    cy.get('[data-e2e-id="identification"]')
    .type("123456")
  })

  it("Set SIA description", () => {
    cy.get('[data-e2e-id="description_citizenreport"]')
    .type("description citizenreport")
  })

  it("Set advertisement no", () => {
    cy.get("#advertisement_no")
      .should("be.visible")
      .check({force: true})
  })
  it("Set general description", () => {
    cy.get('[data-e2e-id="description"]')
    .type("general description")
  })

  it("Send form", () => {
    cy.get(`[data-e2e-id="submit"]`)
      .click()

    cy.get(`[role="dialog"]`)
      .find(`button`)
      .contains("Zaak aanmaken")
      .should("be.visible")
      .click()
  })


  //TODO check modal for the right content (with use of fixture)


  // Check for CaseDetail page
  it("Show CaseDetail page", () => {
    cy.get("h1")
    .contains("Zaakdetails")

    //TODO check if it's the right address (fixture)
  })

})