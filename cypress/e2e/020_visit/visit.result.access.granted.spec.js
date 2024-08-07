import address from "../../fixtures/address.json";
import visitResult from "../../fixtures/visitResult.json";
import roles from "../../fixtures/roles.json";

const visit = visitResult.accessGranted;

beforeEach(() => {
  cy.kcloginAsPm();
  cy.visit("/");
  cy.get("a").should("contain", "Amsterdamse Zaak Administratie");
});

describe("Test visit.result.access.granted.spec", () => {
  it("Mock TOP result for visit", () => {
    const urlCases = `**/addresses/*/cases/`;
    cy.intercept(urlCases).as("getCases");
    cy.visit(`/adres/${address.bagId}`);
    cy.wait("@getCases").then(() => {
      cy.get("h1").contains(`${address.street}, ${address.zipCode}`);
    });

    const urlCase = `**/cases/*/`;
    cy.intercept(urlCase).as("getCase");

    cy.scrollTo(0, 400);
    cy.getCaseId().then((e) => {
      cy.get("tbody>tr").contains("td", e.id).click();
    });

    cy.wait("@getCase").then(({ response }) => {
      const visit = response?.body?.workflows?.find(
        (e) => e.state?.name === "Huisbezoek"
      );
      const topTask = visit?.tasks?.find(
        (e) => e.name === "Doorgeven Huisbezoek TOP"
      );
      const caseId = topTask?.case;
      const taskId = topTask.case_user_task_id;

      // Check role
      cy.get("tbody>tr>td").eq(2).should("contain", roles.TH);

      cy.testDueDate("tbody>tr>td", 0);

      const url = `**/users/`;
      cy.intercept(url).as("getUsers");

      cy.visit(`/zaken/${caseId}/huisbezoek/${taskId}`);

      // Intercept /users to wait for Toezichthouders next test
      cy.wait("@getUsers").then(() => {
        cy.get("h1").contains("Resultaat bezoek");
      });
    });

    cy.get('[data-testid="author1"] > option')
      .eq(visit.author1)
      .then((element) =>
        cy.get('[data-testid="author1"]').select(element.val())
      );

    cy.get('[data-testid="author2"] > option')
      .eq(visit.author2)
      .then((element) =>
        cy.get('[data-testid="author2"]').select(element.val())
      );

    cy.get('[data-testid="start_time"]')
      .clear()
      .type(new Date().toJSON().substring(0, 16));

    cy.get(`[data-testid=${visit.situation}]`).check({ force: true });

    cy.get('[data-testid="notes"').type(visit.notes);

    const url = `**/cases/*/`;
    cy.intercept(url).as("getDebriefTask");

    cy.get('button[data-testid="submit"]').contains("Toevoegen").click();

    cy.wait("@getDebriefTask").then(() => {
      cy.scrollTo(0, 400);
      cy.get("h4").contains("Debrief");
      cy.get("tbody>tr").contains("td", "Debrief verwerken");
    });
  });
});
