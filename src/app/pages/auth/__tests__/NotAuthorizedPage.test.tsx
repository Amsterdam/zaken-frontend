// First, like the app does: the page imports the layout, which imports the
// routes, which import this page (circular).
import "@/router/routes"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import NotAuthorizedPage from "../NotAuthorizedPage"

vi.mock("@/api/hooks", () => ({
  useUsersMe: () => ({ data: { permissions: [] } }),
}))

vi.mock("react-oidc-context", () => ({
  useAuth: () => ({ signoutRedirect: vi.fn() }),
}))

vi.mock("app/state/auth/oidc/useDecodedToken", () => ({
  useDecodedToken: () => ({ given_name: "Jan" }),
}))

describe("NotAuthorizedPage", () => {
  it("tells you that you have no access, with a way back", () => {
    render(
      <MemoryRouter>
        <NotAuthorizedPage />
      </MemoryRouter>,
    )

    expect(screen.getByRole("heading", { level: 1, name: /^403/ })).toBeTruthy()
    expect(screen.getByText(/niet geautoriseerd/)).toBeTruthy()
    expect(
      screen.getByRole("button", { name: "Terug naar de startpagina" }),
    ).toBeTruthy()
  })
})
