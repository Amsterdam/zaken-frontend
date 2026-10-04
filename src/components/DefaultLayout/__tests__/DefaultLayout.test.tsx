import { render, screen, within } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import NotFoundPage from "app/pages/errors/NotFoundPage"

let permissions: string[] = []

vi.mock("@/api/hooks", () => ({
  useUsersMe: () => ({ data: { permissions } }),
}))

vi.mock("react-oidc-context", () => ({
  useAuth: () => ({ signoutRedirect: vi.fn() }),
}))

vi.mock("app/state/auth/oidc/useDecodedToken", () => ({
  useDecodedToken: () => ({ given_name: "Jan" }),
}))

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={["/bestaat-niet"]}>
      <NotFoundPage />
    </MemoryRouter>,
  )

// The layout renders the menu twice: in the header (narrow) and on the side (wide).
const sideMenu = () =>
  within(document.querySelector(".ams-page__area--menu") as HTMLElement)

describe("DefaultLayout (via the 404 page)", () => {
  beforeEach(() => {
    permissions = []
  })

  it("renders the page with the menu", () => {
    renderPage()

    expect(screen.getByRole("heading", { name: /^404/ })).toBeTruthy()
    const labels = sideMenu()
      .getAllByRole("link")
      // Without the soft hyphens of the long labels.
      .map((link) => link.textContent?.replaceAll("\u00AD", ""))
    expect(labels).toEqual([
      "Zoeken",
      "Takenoverzicht",
      "Zakenoverzicht",
      "Hulp",
      "Uitloggen (Jan)",
    ])
  })

  it("only shows the items you have the permission for", () => {
    permissions = ["access_recovery_check"]
    renderPage()

    expect(sideMenu().getByRole("link", { name: "Invordering" })).toBeTruthy()
  })
})
