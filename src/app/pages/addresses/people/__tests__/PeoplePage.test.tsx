// First, like the app does: the page imports the layout, which imports the
// routes, which import this page (circular).
import "@/router/routes"
import { fireEvent, render, screen, within } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router"
import PeoplePage from "../PeoplePage"

const BAG_ID = "0363010000000001"
const address = {
  adresseerbaarobject_id: BAG_ID,
  weergavenaam: "Amstel 1-H, 1011PN Amsterdam",
  postcode: "1011PN",
  huisnummer: 1,
}

let residents: {
  data?: { personen: unknown[] }
  isPending: boolean
  isError: boolean
}

vi.mock("@/api/hooks", () => ({
  useUsersMe: () => ({ data: { permissions: [] } }),
  useBagPdokByBagId: () => ({
    data: { response: { docs: [address] } },
    isLoading: false,
  }),
  useBagPdok: () => ({ data: { response: { docs: [address] } } }),
  useAddress: () => ({ data: undefined, isFetched: false }),
  usePermitDetails: () => ({ data: undefined }),
  useResidents: () => residents,
}))

let environment: string | undefined
vi.mock("app/config/env", () => ({
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

vi.mock("app/state/auth/oidc/useDecodedToken", () => ({
  useDecodedToken: () => ({ given_name: "Jan" }),
}))

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={[`/adres/${BAG_ID}/personen`]}>
      <Routes>
        <Route path="/adres/:bagId/personen" element={<PeoplePage />} />
      </Routes>
    </MemoryRouter>,
  )

describe("the tab Persoonsgegevens of an address", () => {
  beforeEach(() => {
    environment = "PROD"
    residents = {
      isPending: false,
      isError: false,
      data: {
        personen: [
          {
            leeftijd: 34,
            naam: {
              voorletters: "P.",
              geslachtsnaam: "Jong",
              voornamen: "Piet",
            },
            geslacht: { code: "M", omschrijving: "man" },
          },
          {
            leeftijd: 61,
            naam: {
              voorletters: "A.",
              voorvoegsel: "de",
              geslachtsnaam: "Vries",
              voornamen: "Anna",
            },
            geslacht: { code: "V", omschrijving: "vrouw" },
            verblijfplaats: { functieAdres: { omschrijving: "briefadres" } },
            kinderen: [{ naam: { voorletters: "P.", geslachtsnaam: "Jong" } }],
          },
          {
            leeftijd: 90,
            naam: { voorletters: "O.", geslachtsnaam: "Lang" },
            // Died long ago: not shown.
            overlijden: { datum: { langFormaat: "2001-01-01" } },
          },
        ],
      },
    }
  })

  it("shows the residents, oldest first, under the tabs of the address", () => {
    renderPage()

    const tabs = screen.getByRole("navigation", {
      name: "Pagina's van dit adres",
    })
    expect(
      within(tabs)
        .getByRole("link", { name: "Persoonsgegevens" })
        .getAttribute("aria-current"),
    ).toBe("page")
    expect(
      screen.getByRole("heading", { name: "Ingeschreven personen (2)" }),
    ).toBeTruthy()

    const names = screen
      .getAllByRole("button", { name: /^Details van/ })
      .map((button) => button.getAttribute("aria-label"))
    expect(names).toEqual(["Details van A. de Vries", "Details van P. Jong"])
    expect(screen.getByText("Briefadres")).toBeTruthy()
  })

  it("opens the details of a resident", () => {
    renderPage()
    // The details are there, but shut: hidden from everyone.
    const isHidden = () =>
      screen.getByText("Anna").closest('[aria-hidden="true"]') !== null
    expect(isHidden()).toBe(true)

    const button = screen.getByRole("button", {
      name: "Details van A. de Vries",
    })
    fireEvent.click(button)

    expect(button.getAttribute("aria-expanded")).toBe("true")
    expect(isHidden()).toBe(false)
    expect(screen.getByText("Vrouw")).toBeTruthy()
    expect(screen.getByText("Kinderen")).toBeTruthy()

    fireEvent.click(button)
    expect(button.getAttribute("aria-expanded")).toBe("false")
    expect(isHidden()).toBe(true)
  })

  it("says so when nobody is registered, and when it failed", () => {
    residents = { isPending: false, isError: false, data: { personen: [] } }
    const { unmount } = renderPage()
    expect(
      screen.getByText("Geen ingeschreven personen gevonden."),
    ).toBeTruthy()
    // No heading above an empty list: the tab says what this is.
    expect(
      screen.queryByRole("heading", { name: /^Ingeschreven personen/ }),
    ).toBeNull()
    unmount()

    residents = { isPending: false, isError: true }
    renderPage()
    expect(
      screen.getByText("Ingeschreven personen konden niet worden opgehaald."),
    ).toBeTruthy()
  })

  describe("outside production", () => {
    beforeEach(() => {
      environment = "ACC"
    })

    it("shows made-up people when nobody is registered", () => {
      residents = { isPending: false, isError: false, data: { personen: [] } }
      renderPage()

      expect(screen.getByText(/^Voorbeeldgegevens/)).toBeTruthy()
      expect(
        screen.getAllByRole("button", { name: /^Details van/ }).length,
      ).toBeGreaterThan(0)
      expect(
        screen.queryByText("Geen ingeschreven personen gevonden."),
      ).toBeNull()
    })

    it("shows the real people when there are any", () => {
      renderPage()

      expect(
        screen.getByRole("heading", { name: "Ingeschreven personen (2)" }),
      ).toBeTruthy()
      expect(screen.queryByText(/^Voorbeeldgegevens/)).toBeNull()
    })

    it("shows nobody when the request failed", () => {
      residents = { isPending: false, isError: true }
      renderPage()

      expect(
        screen.getByText("Ingeschreven personen konden niet worden opgehaald."),
      ).toBeTruthy()
      expect(screen.queryByRole("button", { name: /^Details van/ })).toBeNull()
    })
  })
})
