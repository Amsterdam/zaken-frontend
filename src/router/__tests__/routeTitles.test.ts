import { getPageTitle, getTitledRoutes } from "../routeTitles"

vi.mock("react-oidc-context", () => ({ useAuth: () => ({}) }))

const titles = (pathname: string) =>
  getTitledRoutes(pathname).map(({ title, href }) => [title, href])

describe("the titles of the routes", () => {
  it("gives the path to a page, from the start page down", () => {
    expect(titles("/zaken/12/besluit/34")).toEqual([
      ["Home", "/"],
      ["Zakenoverzicht", "/zaken"],
      ["Zaakdetails", "/zaken/12"],
      ["Resultaat besluit", "/zaken/12/besluit/34"],
    ])
    expect(titles("/adres/0363010001004479/zaken/nieuw")).toEqual([
      ["Home", "/"],
      ["Adresoverzicht", "/adres/0363010001004479"],
      ["Nieuwe zaak aanmaken", "/adres/0363010001004479/zaken/nieuw"],
    ])
  })

  it("gives the title of a page", () => {
    expect(getPageTitle("/")).toBe("Home")
    expect(getPageTitle("/zaken")).toBe("Zakenoverzicht")
    expect(getPageTitle("/zaken/12/")).toBe("Zaakdetails")
    expect(getPageTitle("/adres/0363010001004479/personen")).toBe(
      "Persoonsgegevens",
    )
  })

  it("has no title for a page without one", () => {
    expect(getPageTitle("/auth")).toBeUndefined()
    expect(getPageTitle("/bestaat/niet")).toBeUndefined()
  })
})
