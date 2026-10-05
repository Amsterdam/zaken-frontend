import { render, screen } from "@testing-library/react"
import { createMemoryRouter, RouterProvider } from "react-router"
import { routes } from "../routes"

let permissions: string[] = []
let isLoading = false

vi.mock("@/api/hooks", async (importOriginal) => ({
  ...(await importOriginal<object>()),
  useUsersMe: () => ({
    data: isLoading ? undefined : { permissions },
    isLoading,
  }),
  useCase: () => ({ data: undefined }),
  useFine: () => ({ data: undefined, isLoading: false }),
}))

vi.mock("react-oidc-context", () => ({
  useAuth: () => ({
    user: { access_token: "token" },
    signoutRedirect: vi.fn(),
  }),
}))

vi.mock("app/state/auth/oidc/useDecodedToken", () => ({
  useDecodedToken: () => ({ given_name: "Jan" }),
}))

const renderAt = (path: string) =>
  render(
    <RouterProvider
      router={createMemoryRouter(routes, { initialEntries: [path] })}
    />,
  )
const heading = (name: string | RegExp) =>
  screen.getByRole("heading", { level: 1, name })

describe("the routes", () => {
  beforeEach(() => {
    permissions = []
    isLoading = false
  })

  describe("a page you need a permission for (the recovery check)", () => {
    it("shows the spinner of Amsterdam while the permissions load", () => {
      isLoading = true
      renderAt("/invorderingen")

      expect(
        screen.getByRole("status", { name: "De pagina wordt geladen" }),
      ).toBeTruthy()
      expect(screen.queryByRole("heading")).toBeNull()
    })

    it("shows the page with the permission, and its title on the tab", () => {
      permissions = ["access_recovery_check"]
      renderAt("/invorderingen")

      expect(heading("Invorderingscheck")).toBeTruthy()
      expect(document.title).toMatch(/^Invorderingscheck \| /)
    })

    it("shows the 403 page without the permission", () => {
      renderAt("/invorderingen")

      expect(heading(/^403/)).toBeTruthy()
    })
  })

  it("shows a page everyone may see, with its title on the tab", () => {
    renderAt("/hulp")

    expect(heading("Hulp")).toBeTruthy()
    expect(document.title).toMatch(/^Hulp \| /)
  })

  it("has no title of its own for a page without one", () => {
    renderAt("/403")

    expect(heading(/^403/)).toBeTruthy()
    expect(document.title).not.toContain("|")
  })

  it("asks the permission to perform tasks for the forms of a case", () => {
    renderAt("/zaken/12/besluit/34")

    expect(heading(/^403/)).toBeTruthy()
  })

  it("shows the 404 page for a path that does not exist", () => {
    renderAt("/bestaat/niet")

    expect(heading(/^404/)).toBeTruthy()
  })
})
