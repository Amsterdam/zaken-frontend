// First, like the app does: the page imports the layout, which imports the
// routes, which import this page (circular).
import "app/routing/routes"
import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, useLocation } from "react-router-dom"
import FlashMessageProvider from "app/state/flashMessages/FlashMessageProvider"
import HomePage from "../HomePage"

let addresses: Partial<BAGPdokAddress>[] = []
let isError = false
const useBagPdok = vi.fn((searchString?: string) => ({
  data:
    searchString === undefined ? undefined : { response: { docs: addresses } },
  isLoading: false,
  isError,
}))

vi.mock("@/api/hooks", () => ({
  useUsersMe: () => ({ data: { permissions: [] } }),
  useBagPdok: (searchString?: string) => useBagPdok(searchString),
}))

vi.mock("react-oidc-context", () => ({
  useAuth: () => ({ signoutRedirect: vi.fn() }),
}))

vi.mock("app/state/auth/oidc/useDecodedToken", () => ({
  useDecodedToken: () => ({ given_name: "Jan" }),
}))

const Location = () => {
  const { pathname, search } = useLocation()
  return <output>{`${pathname}${search}`}</output>
}

const renderPage = (url = "/") =>
  render(
    <MemoryRouter initialEntries={[url]}>
      <FlashMessageProvider>
        <HomePage />
        <Location />
      </FlashMessageProvider>
    </MemoryRouter>,
  )

const location = () => screen.getByRole("status").textContent

describe("HomePage", () => {
  beforeEach(() => {
    isError = false
    addresses = [
      {
        weergavenaam: "Amstel 1, 1011PN Amsterdam",
        adresseerbaarobject_id: "0363010012143319",
      },
      { weergavenaam: "Zonder bag id" },
    ]
  })

  it("searches when you submit, and keeps the query in the URL", () => {
    renderPage()
    expect(
      screen.getByText("Voer minimaal 3 tekens in om te zoeken."),
    ).toBeTruthy()

    const input = screen.getByRole("searchbox")
    fireEvent.change(input, { target: { value: " Amstel 1 " } })
    fireEvent.submit(input)

    expect(location()).toBe("/?zoekterm=Amstel+1")
    expect(useBagPdok).toHaveBeenLastCalledWith("Amstel 1")
    // Only the address with a bag id.
    expect(screen.getByText(/gevonden voor/).textContent).toBe(
      '1 adres gevonden voor "Amstel 1"',
    )
    expect(screen.queryByText("Zonder bag id")).toBeNull()
    expect(
      screen
        .getByRole("link", { name: "Amstel 1, 1011PN Amsterdam" })
        .getAttribute("href"),
    ).toBe("/adres/0363010012143319")
  })

  it("goes to the address when you click it", () => {
    renderPage("/?zoekterm=Amstel")

    fireEvent.click(screen.getByText("Amstel 1, 1011PN Amsterdam"))

    expect(location()).toBe("/adres/0363010012143319")
  })

  it("does not search with fewer than three characters", () => {
    renderPage("/?zoekterm=Am")

    expect(useBagPdok).toHaveBeenLastCalledWith(undefined)
    expect(screen.queryByText(/gevonden/)).toBeNull()
  })

  it("says so when no address is found", () => {
    addresses = []
    renderPage("/?zoekterm=Bestaatniet")

    expect(screen.getByText("Geen adressen gevonden.")).toBeTruthy()
  })

  it("tells you when PDOK returned the maximum number of addresses", () => {
    addresses = Array.from({ length: 25 }, (_, index) => ({
      weergavenaam: `Amstel ${index + 1}`,
      adresseerbaarobject_id: `${index + 1}`,
    }))
    renderPage("/?zoekterm=Amstel")

    expect(screen.getByText(/gevonden voor/).textContent).toBe(
      '25 adressen gevonden voor "Amstel" (maximaal 25 getoond)',
    )
  })

  it("says so when the search failed", () => {
    isError = true
    renderPage("/?zoekterm=Amstel")

    expect(screen.getByText("Niet gelukt")).toBeTruthy()
    expect(screen.queryByText("Geen adressen gevonden.")).toBeNull()
  })
})
