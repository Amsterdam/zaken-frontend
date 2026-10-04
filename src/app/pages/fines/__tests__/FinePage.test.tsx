// First, like the app does: the page imports the layout, which imports the
// routes, which import this page (circular).
import "app/routing/routes"
import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import FinePage from "../FinePage"

type Fine = { identificatienummer: string; dagtekening: string }
let fines: Fine[] = []
const useFine = vi.fn((id?: string) => ({
  data: id === undefined ? undefined : { items: fines },
  isLoading: false,
}))

vi.mock("@/api/hooks", () => ({
  useUsersMe: () => ({ data: { permissions: [] } }),
  useFine: (id?: string) => useFine(id),
}))

vi.mock("react-oidc-context", () => ({
  useAuth: () => ({ signoutRedirect: vi.fn() }),
}))

vi.mock("app/state/auth/oidc/useDecodedToken", () => ({
  useDecodedToken: () => ({ given_name: "Jan" }),
}))

const search = (query: string) => {
  render(
    <MemoryRouter>
      <FinePage />
    </MemoryRouter>,
  )
  const input = screen.getByRole<HTMLInputElement>("searchbox")
  fireEvent.change(input, { target: { value: query } })
  fireEvent.submit(input.form!)
}

describe("FinePage", () => {
  beforeEach(() => {
    fines = []
    window.history.replaceState({}, "", "/invorderingen")
  })

  it("shows nothing below the search field before you search", () => {
    render(
      <MemoryRouter>
        <FinePage />
      </MemoryRouter>,
    )

    expect(
      screen.queryByRole("heading", { name: "Resultaat invorderingscheck" }),
    ).toBeNull()
  })

  it("shows the fine that was found, and keeps the query in the URL", () => {
    fines = [
      {
        identificatienummer: "12345_6_78",
        invorderingstatus: "X",
        dagtekening: "2026-03-09T00:00:00Z",
      } as Fine,
    ]
    search(" 12345_6_78 ")

    expect(useFine).toHaveBeenLastCalledWith("12345_6_78")
    expect(window.location.search).toBe("?zoekterm=12345_6_78")
    expect(screen.getByText("12345_6_78")).toBeTruthy()
    expect(screen.getByText("Opgepakt")).toBeTruthy()
    expect(screen.getByText("09-03-2026")).toBeTruthy()
  })

  it("explains it when the fine is not known yet", () => {
    search("999")

    expect(screen.getByText(/nog niet bekend bij belastingen/)).toBeTruthy()
  })
})
