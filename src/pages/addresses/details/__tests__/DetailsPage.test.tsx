// First, like the app does: the page imports the layout, which imports the
// routes, which import this page (circular).
import "@/router/routes"
import { fireEvent, render, screen, within } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router"
import DetailsPage from "../DetailsPage"

const BAG_ID = "0363010000000001"
const address = {
  adresseerbaarobject_id: BAG_ID,
  weergavenaam: "Amstel 1-H, 1011PN Amsterdam",
  postcode: "1011PN",
  huisnummer: 1,
}

vi.mock("@/api/hooks", () => ({
  useUsersMe: () => ({ data: { permissions: [] } }),
  useBagPdokByBagId: () => ({
    data: { response: { docs: [address] } },
    isLoading: false,
  }),
  useBagPdok: () => ({ data: { response: { docs: [address] } } }),
  useAddress: () => ({ data: undefined, isFetched: false }),
  useBenkAgg: () => ({
    data: {
      _embedded: {
        adresseerbareobjecten: [
          {
            gebruiksdoelOmschrijvingen: ["woonfunctie"],
            verblijfsobjectOppervlakte: 75,
            verblijfsobjectAantalBouwlagen: 1,
            toegangOmschrijvingen: ["Trap", "Lift"],
            openbareruimteNaam: "Amstel",
            huisnummer: 1,
            huisletter: null,
            huisnummertoevoeging: "H",
            adresseerbaarObjectPuntGeometrieWgs84: {
              type: "Point",
              coordinates: [4.8993, 52.3676],
            },
            typeAdres: "Hoofdadres",
            typeAdresseerbaarObjectOmschrijving: "Verblijfsobject",
            verblijfsobjectStatusOmschrijving: "Verblijfsobject in gebruik",
            verblijfsobjectVerdiepingToegang: 0,
            verblijfsobjectEigendomsverhoudingOmschrijving: null,
            gebiedenStadsdeelNaam: "Nieuw-West",
            gebiedenWijkNaam: "Slotervaart-Zuid",
            gebiedenBuurtNaam: "Jacques Veltmanbuurt",
            panden: [
              '{"bouwjaar Pand":1958,"type woonobject Pand":"Meerdere woningen"}',
              "geen json",
            ],
          },
        ],
      },
    },
    isLoading: false,
  }),
  useCasesByBagId: () => ({
    data: {
      results: [
        { advertisements: [{ id: 1, link: "https://a.example/1" }] },
        { advertisements: [{ id: 2, link: "https://a.example/1" }] },
      ],
    },
    isLoading: false,
  }),
  usePermitDetails: () => ({
    data: {
      permits: [
        { permit_type: "Vakantieverhuur", permit_granted: "GRANTED" },
        { permit_type: "B&B", permit_granted: "NOT_GRANTED" },
      ],
    },
    isLoading: false,
  }),
}))

vi.mock("@/hooks/useHasPermission", () => ({ default: () => [true, false] }))

vi.mock("@/hooks/usePanoramaByBagId", () => ({
  default: () => ({ data: { url: "https://pano.example/1.jpg" } }),
}))

vi.mock("react-oidc-context", () => ({
  useAuth: () => ({ signoutRedirect: vi.fn() }),
}))

vi.mock("@/hooks/useDecodedToken", () => ({
  useDecodedToken: () => ({ given_name: "Jan" }),
}))

describe("the tab Adresdetails of an address", () => {
  it("shows the object, its area, the panorama and the map", () => {
    // The breadcrumbs read the path from window.location.
    window.history.pushState({}, "", `/adres/${BAG_ID}/details`)
    render(
      <MemoryRouter initialEntries={[`/adres/${BAG_ID}/details`]}>
        <Routes>
          <Route path="/adres/:bagId/details" element={<DetailsPage />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Amstel 1-H, 1011PN Amsterdam",
      }),
    ).toBeTruthy()
    const tabs = screen.getByRole("navigation", {
      name: "Pagina's van dit adres",
    })
    expect(
      within(tabs)
        .getByRole("link", { name: "Adresdetails" })
        .getAttribute("aria-current"),
    ).toBe("page")

    // The tabs are the navigation here: no breadcrumbs.
    expect(screen.queryByRole("navigation", { name: "Kruimelpad" })).toBeNull()

    expect(screen.getByText("75m²")).toBeTruthy()
    expect(screen.getByText("Trap, Lift")).toBeTruthy()
    // The map with the marker on the address.
    expect(
      screen.getByRole("region", { name: "Kaart van Amstel 1-H" }),
    ).toBeTruthy()
    expect(screen.getByAltText("Amstel 1-H")).toBeTruthy()

    // More from the BAG: the kind of address, the building and the area.
    const description = (label: string) =>
      screen.getByText(label, { selector: "dt" }).nextElementSibling
        ?.textContent
    // The BAG's "woonfunctie" gets a capital.
    expect(description("Gebruiksdoel")).toBe("Woonfunctie")
    expect(description("Type adres")).toBe("Hoofdadres")
    expect(description("Verdieping")).toBe("Begane grond")
    expect(description("Bouwjaar")).toBe("1958")
    expect(description("Type woonobject")).toBe("Meerdere woningen")
    expect(description("Buurt")).toBe("Jacques Veltmanbuurt")
    // An empty value is left out.
    expect(screen.queryByText("Eigendomsverhouding")).toBeNull()
    expect(screen.queryByText("Aantal kamers")).toBeNull()
    // The panorama loads out of sight, behind a skeleton, and is shown once
    // it is there.
    expect(screen.queryByRole("img", { name: /^Panorama preview/ })).toBeNull()
    fireEvent.load(document.querySelector("img[hidden]") as HTMLImageElement)
    expect(
      screen
        .getByRole("img", { name: /^Panorama preview/ })
        .getAttribute("src"),
    ).toBe("https://pano.example/1.jpg")
  })
})
