import { render, screen } from "@testing-library/react"
import AuthorizedPage from "../AuthorizedPage"

let permission: [boolean, boolean] = [true, false]

vi.mock("@/hooks/useHasPermission", () => ({ default: () => permission }))
vi.mock("app/pages/auth/NotAuthorizedPage", () => ({
  default: () => <p>Geen toegang</p>,
}))

const Page = () => <h1>De pagina</h1>

describe("a page you need a permission for", () => {
  it("shows the spinner of Amsterdam while the permissions load", () => {
    permission = [false, true]
    render(<AuthorizedPage page={Page} />)

    expect(
      screen.getByRole("status", { name: "De pagina wordt geladen" }),
    ).toBeTruthy()
    expect(screen.queryByRole("heading")).toBeNull()
  })

  it("shows the page with the permission", () => {
    permission = [true, false]
    render(<AuthorizedPage page={Page} />)

    expect(screen.getByRole("heading", { name: "De pagina" })).toBeTruthy()
    expect(screen.queryByRole("status")).toBeNull()
  })

  it("says so without the permission", () => {
    permission = [false, false]
    render(<AuthorizedPage page={Page} />)

    expect(screen.getByText("Geen toegang")).toBeTruthy()
  })
})
