// First, like the app does: the page imports the layout, which imports the
// routes, which import this page (circular).
import "@/router/routes"
import { fireEvent, render, screen, within } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router"
import PermitsPage from "../PermitsPage"

const BAG_ID = "0363010000000001"
const address = {
  adresseerbaarobject_id: BAG_ID,
  weergavenaam: "Amstel 1-H, 1011PN Amsterdam",
  postcode: "1011PN",
  huisnummer: 1,
}

type Query = { data?: unknown; isPending: boolean; isError: boolean }
const loaded = (data: unknown): Query => ({
  data,
  isPending: false,
  isError: false,
})
let decos: Query
let powerBrowser: Query
let meldingen: Query
let registrations: Query

vi.mock("@/api/hooks", () => ({
  useUsersMe: () => ({ data: { permissions: [] } }),
  useBagPdokByBagId: () => ({
    data: { response: { docs: [address] } },
    isLoading: false,
  }),
  useBagPdok: () => ({ data: { response: { docs: [address] } } }),
  useAddress: () => ({ data: undefined, isFetched: false }),
  usePermitDetails: () => decos,
  usePermitsPowerBrowser: () => powerBrowser,
  useMeldingen: () => meldingen,
  useRegistrations: () => registrations,
}))

let environment: string | undefined
vi.mock("@/config/env", () => ({
  env: {
    get VITE_ENVIRONMENT_SHORT() {
      return environment
    },
  },
}))

vi.mock("@/hooks/useHasPermission", () => ({ default: () => [true, false] }))

vi.mock("react-oidc-context", () => ({
  useAuth: () => ({ signoutRedirect: vi.fn() }),
}))

vi.mock("@/hooks/useDecodedToken", () => ({
  useDecodedToken: () => ({ given_name: "Jan" }),
}))

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={[`/adres/${BAG_ID}/vergunningen`]}>
      <Routes>
        <Route path="/adres/:bagId/vergunningen" element={<PermitsPage />} />
      </Routes>
    </MemoryRouter>,
  )

const heading = (name: string) => screen.getByRole("heading", { name })

describe("the tab Vergunningen of an address", () => {
  beforeEach(() => {
    environment = "PROD"
    decos = loaded({
      permits: [
        {
          permit_granted: "GRANTED",
          permit_type: "Vakantieverhuurvergunning",
          details: { RESULT: "Verleend", DATE_VALID_FROM: "2020-01-01" },
        },
        { permit_granted: "NOT_GRANTED", permit_type: "B&B - vergunning" },
        { permit_granted: "UNKNOWN", permit_type: "Splitsingsvergunning" },
      ],
    })
    powerBrowser = loaded([
      {
        product: "Bed & Breakfast",
        status: "Gereed",
        resultaat: "Verleend",
        kenmerk: "Z/23/1",
        startdatum: "2023-09-25T12:25:44Z",
      },
    ])
    meldingen = loaded({
      fifteenNightsRuleApplicable: true,
      data: [
        {
          startDatum: "2026-03-01",
          eindDatum: "2026-03-04",
          nachten: 3,
          gasten: 2,
          isAangepast: true,
          isVerwijderd: false,
          gemaaktOp: "2026-02-01T10:00:00Z",
        },
        {
          startDatum: "2026-05-01",
          eindDatum: "2026-05-05",
          nachten: 4,
          gasten: 4,
          isAangepast: false,
          isVerwijderd: false,
          gemaaktOp: "2026-04-01T10:00:00Z",
        },
      ],
    })
    registrations = loaded([
      {
        registrationNumber: "0363 201F 1C29",
        requester: {
          personalDetails: {
            firstName: "Anna",
            lastNamePrefix: "de",
            lastName: "Vries",
          },
          email: "anna@example.nl",
        },
        createdAt: "2024-01-15T00:00:00Z",
        agreementDate: "2024-01-20T00:00:00Z",
      },
    ])
  })

  it("shows the permits, the reports and the registrations under the tabs", () => {
    renderPage()

    const tabs = screen.getByRole("navigation", {
      name: "Pagina's van dit adres",
    })
    expect(
      within(tabs)
        .getByRole("link", { name: /^Vergunningen/ })
        .getAttribute("aria-current"),
    ).toBe("page")

    // The permit that Decos doesn't know about is left out.
    expect(heading("Vergunningen Decos (2)")).toBeTruthy()
    expect(screen.getByText("Niet verleend")).toBeTruthy()
    expect(heading("Vergunningen PowerBrowser (1)")).toBeTruthy()
    // In the row and in its (shut) details.
    expect(screen.getAllByText("Gereed").length).toBeGreaterThan(0)
    expect(heading("Meldingen (2)")).toBeTruthy()
    expect(screen.getByText(/^7 nachten sinds/)).toBeTruthy()
    expect(heading("15-nachtenregel van toepassing!")).toBeTruthy()
    expect(heading("Vakantieverhuur (1)")).toBeTruthy()
    expect(screen.getByText("Anna de Vries")).toBeTruthy()
    expect(
      screen.getByRole("link", { name: /Decos Join/ }).getAttribute("target"),
    ).toBe("_blank")
  })

  it("opens the details of a permit", () => {
    renderPage()

    const button = screen.getByRole("button", {
      name: "Details van Bed & Breakfast",
    })
    fireEvent.click(button)

    expect(button.getAttribute("aria-expanded")).toBe("true")
    expect(
      screen.getByText("Z/23/1").closest('[aria-hidden="true"]'),
    ).toBeNull()
  })

  it("says so per part when there is nothing, or when it failed", () => {
    decos = loaded({ permits: [] })
    powerBrowser = { isPending: false, isError: true }
    meldingen = loaded({ fifteenNightsRuleApplicable: false, data: [] })
    registrations = loaded([])
    renderPage()

    expect(screen.getByText("Geen Decos vergunningen gevonden.")).toBeTruthy()
    expect(
      screen.getByText("Vergunningen konden niet worden opgehaald."),
    ).toBeTruthy()
    expect(screen.getByText("Geen meldingen gevonden.")).toBeTruthy()
    expect(screen.getByText("Geen registraties gevonden.")).toBeTruthy()
    expect(screen.queryByText(/^Voorbeeldgegevens/)).toBeNull()
  })

  it("shows made-up data outside production, but not for what failed", () => {
    environment = "ACC"
    decos = loaded({ permits: [] })
    powerBrowser = { isPending: false, isError: true }
    meldingen = loaded({ fifteenNightsRuleApplicable: false, data: [] })
    registrations = loaded([])
    renderPage()

    // Decos, the reports and the registrations; not PowerBrowser.
    expect(screen.getAllByText(/^Voorbeeldgegevens/)).toHaveLength(3)
    expect(
      screen.getByText("Vergunningen konden niet worden opgehaald."),
    ).toBeTruthy()
    expect(screen.queryByText("Geen meldingen gevonden.")).toBeNull()
  })
})
