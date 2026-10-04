// First, like the app does: the page imports the layout, which imports the
// routes, which import this page (circular).
import "app/routing/routes"
import { fireEvent, render, screen, within } from "@testing-library/react"
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom"
import FlashMessageProvider from "app/state/flashMessages/FlashMessageProvider"
import IndexPage from "app/pages/addresses/index/IndexPage"

let permissions: string[] = []
const address = (id: string, weergavenaam: string) => ({
  adresseerbaarobject_id: id,
  weergavenaam,
  postcode: "1011PN",
  huisnummer: 1,
})
const addresses = [
  address("0363010000000001", "Amstel 1-H, 1011PN Amsterdam"),
  address("0363010000000002", "Amstel 1-1, 1011PN Amsterdam"),
]
const cases = [
  {
    id: 12,
    theme: { name: "Vakantieverhuur" },
    start_date: "2026-03-09",
    end_date: null,
    workflows: [{ state: { name: "Huisbezoek" } }],
    reason: { name: "Melding" },
    advertisements: [
      {
        id: 1,
        link: "https://www.airbnb.nl/rooms/991?check_in=2026-11-03&source=p3",
      },
      {
        id: 2,
        link: "https://www.airbnb.nl/rooms/991?check_in=2026-11-03&source=p3",
      },
    ],
  },
  {
    id: 9,
    theme: { name: "Kamerverhuur" },
    start_date: "2025-01-01",
    end_date: "2025-06-30",
    workflows: [],
    reason: { name: "Project" },
  },
]

vi.mock("@/api/hooks", () => ({
  useUsersMe: () => ({ data: { permissions } }),
  useBagPdokByBagId: (bagId: string) => ({
    data: {
      response: {
        docs: addresses.filter((a) => a.adresseerbaarobject_id === bagId),
      },
    },
    isLoading: false,
  }),
  useBagPdok: () => ({ data: { response: { docs: addresses } } }),
  useAddress: () => ({ data: undefined, isFetched: false }),
  useCasesByBagId: () => ({ data: { results: cases }, isLoading: false }),
  usePermitDetails: () => ({
    data: {
      permits: [
        { permit_granted: "GRANTED" },
        { permit_granted: "NOT_GRANTED" },
        { permit_granted: "UNKNOWN" },
      ],
    },
  }),
}))

vi.mock("@/hooks/useHasPermission", () => ({
  default: (names: string[]) => [
    names.every((name) => permissions.includes(name)),
    false,
  ],
}))

vi.mock("@/hooks/usePanoramaByBagId", () => ({
  default: () => ({ data: undefined }),
}))

vi.mock("react-oidc-context", () => ({
  useAuth: () => ({ signoutRedirect: vi.fn() }),
}))

vi.mock("app/state/auth/oidc/useDecodedToken", () => ({
  useDecodedToken: () => ({ given_name: "Jan" }),
}))

const Location = () => <output>{useLocation().pathname}</output>

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={["/adres/0363010000000001"]}>
      <FlashMessageProvider>
        <Routes>
          <Route path="/adres/:bagId" element={<IndexPage />} />
          <Route path="*" element={null} />
        </Routes>
        <Location />
      </FlashMessageProvider>
    </MemoryRouter>,
  )

describe("the address overview page", () => {
  beforeEach(() => {
    permissions = ["create_case", "access_personal_data_register"]
  })

  it("shows the address, the links to its pages and its cases", () => {
    renderPage()

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Amstel 1-H, 1011PN Amsterdam",
      }),
    ).toBeTruthy()
    const tabs = within(
      screen.getByRole("navigation", { name: "Pagina's van dit adres" }),
    ).getAllByRole("link")
    expect(tabs.map((tab) => tab.getAttribute("href"))).toEqual([
      "/adres/0363010000000001",
      "/adres/0363010000000001/details",
      "/adres/0363010000000001/personen",
      "/adres/0363010000000001/vergunningen",
    ])
    // The cases are the first tab, and the current one.
    expect(tabs[0].getAttribute("aria-current")).toBe("page")
    expect(tabs[1].getAttribute("aria-current")).toBeNull()
    expect(
      screen.getByRole("link", { name: "Vergunningen (1/2)" }),
    ).toBeTruthy()

    expect(screen.getByRole("heading", { name: "Open zaken (1)" })).toBeTruthy()
    expect(
      screen.getByRole("heading", { name: "Gesloten zaken AZA (1)" }),
    ).toBeTruthy()
    const [openCases, closedCases] = screen.getAllByRole("table")
    expect(within(openCases).getByText("Huisbezoek")).toBeTruthy()
    expect(within(closedCases).getByText("30-06-2025")).toBeTruthy()
    // The same advertisement twice is shown once.
    // And without the search parameters; the link keeps the whole address.
    const ads = screen.getAllByRole("link", {
      name: /^airbnb\.nl\/rooms\/991\s*\(externe website, opent in een nieuw tabblad\)$/,
    })
    expect(ads).toHaveLength(1)
    expect(ads[0].getAttribute("href")).toBe(
      "https://www.airbnb.nl/rooms/991?check_in=2026-11-03&source=p3",
    )
    expect(
      screen
        .getByRole("link", { name: "Zaakdetails van zaak 12" })
        .getAttribute("href"),
    ).toBe("/zaken/12")
  })

  it("goes to another address on the same house number", () => {
    renderPage()

    fireEvent.click(screen.getByRole("button", { name: "Andere adressen (1)" }))
    fireEvent.click(
      screen.getByRole("link", { name: "Amstel 1-1, 1011PN Amsterdam" }),
    )

    expect(screen.getByRole("status").textContent).toBe(
      "/adres/0363010000000002",
    )
    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Amstel 1-1, 1011PN Amsterdam",
      }),
    ).toBeTruthy()
  })

  it("stays on the address when you cancel", () => {
    renderPage()

    fireEvent.click(screen.getByRole("button", { name: "Andere adressen (1)" }))
    fireEvent.click(screen.getByRole("button", { name: "Annuleren" }))

    expect(document.querySelector("dialog")?.open).toBe(false)
    expect(screen.getByRole("status").textContent).toBe(
      "/adres/0363010000000001",
    )
  })

  it("starts a new case, when you may", () => {
    renderPage()

    fireEvent.click(
      screen.getByRole("button", { name: "Nieuwe zaak aanmaken" }),
    )

    expect(screen.getByRole("status").textContent).toBe(
      "/adres/0363010000000001/zaken/nieuw",
    )
  })

  it("hides what you have no permission for", () => {
    permissions = []
    renderPage()

    expect(screen.queryByRole("link", { name: "Persoonsgegevens" })).toBeNull()
    expect(
      screen.getByRole<HTMLButtonElement>("button", {
        name: "Nieuwe zaak aanmaken",
      }).disabled,
    ).toBe(true)
  })
})
