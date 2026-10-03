// First, like the app does: the page imports the layout, which imports the
// routes, which import this page (circular).
import "app/routing/routes"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import FlashMessageProvider from "app/state/flashMessages/FlashMessageProvider"
import AuthPage from "../AuthPage"

vi.mock("@/api/hooks", () => ({
  useUsersMe: () => ({ data: { permissions: [] } }),
}))

vi.mock("react-oidc-context", () => ({
  useAuth: () => ({ signoutRedirect: vi.fn() }),
}))

vi.mock("app/state/auth/oidc/useDecodedToken", () => ({
  useDecodedToken: () => ({
    given_name: "Jan",
    family_name: "Jansen",
    unique_name: "j.jansen@amsterdam.nl",
  }),
}))

const renderPage = () =>
  render(
    <MemoryRouter>
      <FlashMessageProvider>
        <AuthPage />
      </FlashMessageProvider>
    </MemoryRouter>,
  )

describe("AuthPage", () => {
  it("shows who is signed in", () => {
    renderPage()

    const labels = screen.getAllByRole("term").map((term) => term.textContent)
    expect(labels).toEqual(["Voornaam", "Achternaam", "E-mail"])
    expect(screen.getByText("Jansen")).toBeTruthy()
    expect(screen.getByText("j.jansen@amsterdam.nl")).toBeTruthy()
  })
})
