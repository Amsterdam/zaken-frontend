// First, like the app does: the page imports the layout, which imports the
// routes, which import this page (circular).
import "@/router/routes"
import { render, screen } from "@testing-library/react"
import { MemoryRouter, useLocation } from "react-router"
import {
  getLastCasesSearch,
  setLastCasesSearch,
} from "@/components/cases/useCasesFilters"
import IndexPage from "../IndexPage"

vi.mock("@/components/DefaultLayout/DefaultLayout", () => ({
  DefaultLayout: ({ children }: { children: React.ReactNode }) => (
    <main>
      <h1>Layout</h1>
      {children}
    </main>
  ),
}))

vi.mock("@/components/cases/Cases/Cases", () => ({
  default: () => <p>Zakenoverzicht</p>,
}))

const Location = () => <output>{useLocation().search}</output>

const renderPage = (url: string) =>
  render(
    <MemoryRouter initialEntries={[url]}>
      <IndexPage />
      <Location />
    </MemoryRouter>,
  )

describe("the cases overview page", () => {
  beforeEach(() => window.sessionStorage.clear())

  it("opens with the filters of the URL", () => {
    setLastCasesSearch("thema=Kamerverhuur")
    renderPage("/zaken?thema=Vakantieverhuur")

    expect(screen.getByRole("status").textContent).toBe(
      "?thema=Vakantieverhuur",
    )
  })

  it("goes back to your last filters from a link without filters", () => {
    setLastCasesSearch("thema=Kamerverhuur&pagina=2")
    renderPage("/zaken")

    // The layout is there all along.
    expect(screen.getByRole("heading", { name: "Layout" })).toBeTruthy()
    expect(screen.getByRole("status").textContent).toBe(
      "?thema=Kamerverhuur&pagina=2",
    )
    expect(screen.getByText("Zakenoverzicht")).toBeTruthy()
  })

  it("opens with the defaults when you had no filters", () => {
    renderPage("/zaken")

    expect(screen.getByRole("status").textContent).toBe("")
  })

  it("remembers the filters of a URL you arrived on", () => {
    renderPage("/zaken?thema=Vakantieverhuur")

    expect(getLastCasesSearch()).toBe("thema=Vakantieverhuur")
  })
})
