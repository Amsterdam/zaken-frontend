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

describe("Add case to address", () => {

  it("Search query", () => {
    //type searchquery
    cy.get("#2")
      .should("be.visible")
      .type("1072tt1")
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
    cy.get("advertisement_no")
      .should("be.visible")
      .check({force: true})
  })
  
})

describe("Try to logout", () => {

  it("Logout user", () => {
    cy.logout()
  })
})
