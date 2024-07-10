import moment from "moment";
import address from "../../fixtures/address.json";
import visit from "../../fixtures/visit.json";

beforeEach(() => {
  cy.kcloginAsPm();
  cy.visit("/");
  cy.get("a").should("contain", "Amsterdamse Zaak Administratie");
});

describe('Test visit.plan.spec', () => {
  it("Go to Adresoverzicht and select address", () => {
    const url = `**/addresses/*/cases/`;
    cy.intercept(url).as("getCases");
    cy.visit(`/adres/${address.bagId}`);
    cy.wait("@getCases").then(() => {
      cy.get("h1").contains(`${address.street}, ${address.zipCode}`);
    });

    cy.scrollTo(0, 400);
    cy.getCaseId().then((e) => {
      cy.get("tbody>tr").contains("td", e.id).click();
    });
  });

  it("Check right dueDate", () => {
    cy.goToCaseDetailPage();
    cy.testDueDate("tbody>tr>td", 0);
  });

  it("Click on task `Bepalen processtap`", () => {
    cy.goToCaseDetailPage();
    cy.get("tbody>tr")
      .contains("td", "Bepalen processtap")
      .siblings("td")
      .contains("Taak afronden")
      .click({ force: true });

    cy.get('[data-testid="visit_next_step"]').select(visit.nextStep);

    cy.get(`[data-testid="submit"]`).click();

    const urlCases = `**/cases/*/`;
    cy.intercept(urlCases).as("getCase");
    cy.wait("@getCase").then(() => {
      cy.get("tbody>tr").contains("td", "Bezoek inplannen");
    });
  });

  it("Schedule `Huisbezoek`", () => {
    cy.goToCaseDetailPage();

    const urlScheduleTypes = "**/themes/*/schedule-types/";
    cy.intercept(urlScheduleTypes).as("getScheduleTypes");

    cy.get("tbody>tr").contains("td", "Bezoek inplannen").click();

    cy.wait("@getScheduleTypes").then(() => {
      cy.get("h1").contains("Bezoek inplannen");
      cy.get("dd").contains(address.street);
    });

    cy.get('[data-testid="week_segment"]').select(visit.weekSegment);

    cy.get('[data-testid="day_segment"]').select(visit.daySegment);

    cy.get('[data-testid="visit_from"]').select(visit.visitFrom);

    cy.get('[data-testid="visit_from_datetime"]').type(
      moment().format("YYYY-MM-DD")
    );

    cy.get('[data-testid="priority"]').select(visit.priority);

    cy.get('[data-testid="description"]').type(visit.description);

    cy.get(`[data-testid="submit"]`).click();

    cy.get("span").contains(visit.weekSegment);
    cy.get("span").contains(visit.daySegment);
    cy.get("span").contains(visit.priority);
    cy.get("span").contains(visit.description);

    cy.get(`[role="dialog"]`)
      .find("button")
      .contains("Bezoek inplannen")
      .click();

    const url = `**/cases/*/events/`;
    cy.intercept(url).as("getEvents");
    cy.wait("@getEvents").then(() => {
      cy.history("Bezoek ingepland", "Datum");
    });
  });
});
