// First, like the app does: the page imports the layout, which imports the
// routes, which import this page (circular).
import "app/routing/routes"
import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import FlashMessageProvider from "app/state/flashMessages/FlashMessageProvider"
import DetailsPage from "../DetailsPage"

type CaseQuery = { data?: unknown; isLoading: boolean; error?: unknown }
let caseQuery: CaseQuery
let permissions: string[] = []

const caseItem = {
  id: 12,
  sensitive: false,
  is_enforcement_request: false,
  has_open_sensitive_case_on_address: true,
  state: "TOEZICHT",
  start_date: "2026-03-09",
  previous_case: null,
  theme: { id: 1, name: "Vakantieverhuur" },
  reason: { name: "Project" },
  project: { name: "Hotline" },
  subjects: [],
  tags: [],
  address: {
    bag_id: "0363010000000001",
    street_name: "Amstel",
    number: 1,
    suffix_letter: null,
    suffix: "H",
    postal_code: "1011PN",
    housing_corporation: null,
  },
}

vi.mock("@/api/hooks", () => ({
  useUsersMe: () => ({ data: { permissions } }),
  useCase: () => caseQuery,
  useCaseEvents: () => ({ data: [] }),
  useCaseWorkflows: () => ({ data: { results: [] } }),
}))

vi.mock("@/hooks/useHasPermission", () => ({
  default: (names: string[]) => [
    names.every((name) => permissions.includes(name)),
    false,
  ],
  SENSITIVE_CASE_PERMISSION: "access_sensitive_dossiers",
  CAN_PERFORM_TASK: "perform_task",
}))

// The parts of the page that are still to be converted, and the editable
// values, have their own data and tests.
vi.mock("app/components/case/CaseStatus/CaseStatus", () => ({
  default: () => <p>Open taken</p>,
}))
vi.mock("app/components/case/CaseTimeline/TimelineContainer", () => ({
  default: () => <p>Tijdlijn</p>,
}))
vi.mock("app/components/case/CaseDetails/EditableTag/EditableTag", () => ({
  default: () => <span>-</span>,
}))
vi.mock(
  "app/components/case/CaseDetails/ChangeSubject/ChangeableSubject",
  () => ({ default: () => <span>-</span> }),
)
vi.mock(
  "app/components/case/CaseDetails/ChangeHousingCorporation/ChangeHousingCorporation",
  () => ({ default: () => <span>-</span> }),
)

vi.mock("react-oidc-context", () => ({
  useAuth: () => ({ signoutRedirect: vi.fn() }),
}))

vi.mock("app/state/auth/oidc/useDecodedToken", () => ({
  useDecodedToken: () => ({ given_name: "Jan" }),
}))

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={["/zaken/12"]}>
      <FlashMessageProvider>
        <Routes>
          <Route path="/zaken/:id" element={<DetailsPage />} />
        </Routes>
      </FlashMessageProvider>
    </MemoryRouter>,
  )

const description = (label: string) =>
  screen.getByText(label, { selector: "dt" }).nextElementSibling?.textContent

describe("the case page", () => {
  beforeEach(() => {
    permissions = []
    caseQuery = { data: caseItem, isLoading: false }
  })

  it("shows the case, with a link to its address", () => {
    renderPage()

    expect(
      screen.getByRole("heading", { level: 1, name: "Zaakdetails" }),
    ).toBeTruthy()
    expect(
      screen
        .getByRole("link", { name: "Amstel 1-H, 1011PN Amsterdam" })
        .getAttribute("href"),
    ).toBe("/adres/0363010000000001")

    expect(description("Zaak ID")).toBe("12")
    expect(description("Status")).toBe("Toezicht")
    expect(description("Startdatum")).toBe("09-03-2026")
    expect(description("Thema")).toBe("Vakantieverhuur")
    expect(description("Aanleiding")).toBe("Project: Hotline")
    // Only for a case that was handed over.
    expect(screen.queryByText("Overgedragen zaak")).toBeNull()

    expect(
      screen.getByRole("heading", { name: "Er loopt een ondermijningszaak" }),
    ).toBeTruthy()
    expect(screen.getByText("Open taken")).toBeTruthy()
    expect(screen.getByText("Tijdlijn")).toBeTruthy()
  })

  it("is the 404 page for a case that doesn't exist", () => {
    caseQuery = { isLoading: false, error: { status: 404 } }
    renderPage()

    expect(screen.getByRole("heading", { level: 1, name: /^404/ })).toBeTruthy()
  })

  it("is the 403 page for a sensitive case without the permission", () => {
    caseQuery = { data: { ...caseItem, sensitive: true }, isLoading: false }
    renderPage()
    expect(screen.getByRole("heading", { level: 1, name: /^403/ })).toBeTruthy()
  })

  it("shows a sensitive case to who may see it", () => {
    permissions = ["access_sensitive_dossiers"]
    caseQuery = { data: { ...caseItem, sensitive: true }, isLoading: false }
    renderPage()

    expect(
      screen.getByRole("heading", { level: 1, name: "Zaakdetails" }),
    ).toBeTruthy()
  })
})
