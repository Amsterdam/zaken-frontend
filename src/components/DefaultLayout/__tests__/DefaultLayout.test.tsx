import { fireEvent, render, screen, within } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import FlashMessageProvider from "app/state/flashMessages/FlashMessageProvider"
import { useFlashMessages } from "app/state/flashMessages/useFlashMessages"
import NotFoundPage from "app/pages/errors/NotFoundPage"

let permissions: string[] = []

vi.mock("@/api/hooks", () => ({
  useUsersMe: () => ({ data: { permissions } }),
}))

// The .env files are not loaded in tests; without a href the item is no link.
vi.mock("app/config/env", () => ({
  env: { VITE_TON_FRONTEND_URL: "https://ton.example/" },
}))

vi.mock("react-oidc-context", () => ({
  useAuth: () => ({ signoutRedirect: vi.fn() }),
}))

vi.mock("app/state/auth/oidc/useDecodedToken", () => ({
  useDecodedToken: () => ({ given_name: "Jan" }),
}))

// Like an API error that arrives after the page is shown (on mount the
// provider clears the messages of the previous page).
const AddErrorButton = () => {
  const { addErrorFlashMessage } = useFlashMessages()
  return (
    <button
      onClick={() =>
        addErrorFlashMessage("Oeps er ging iets mis!", "Het ging fout")
      }
    >
      Fout toevoegen
    </button>
  )
}

const renderPage = (withError = false) =>
  render(
    <MemoryRouter initialEntries={["/bestaat-niet"]}>
      <FlashMessageProvider>
        {withError && <AddErrorButton />}
        <NotFoundPage />
      </FlashMessageProvider>
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
      .map((link) => link.textContent)
    expect(labels).toEqual([
      "Zaken",
      "Taken",
      "Zoeken",
      "Hulp",
      "Uitloggen (Jan)",
    ])
  })

  it("only shows the items you have the permission for", () => {
    permissions = ["access_recovery_check", "access_sigital_surveillance"]
    renderPage()

    expect(sideMenu().getByRole("link", { name: "Invordering" })).toBeTruthy()
    const external = sideMenu().getByRole("link", { name: "Digitaal toezicht" })
    expect(external.getAttribute("href")).toBe("https://ton.example/")
    expect(external.getAttribute("target")).toBe("_blank")
  })

  it("shows flash messages, and closing one removes it", () => {
    renderPage(true)
    fireEvent.click(screen.getByText("Fout toevoegen"))

    expect(screen.getByText("Het ging fout")).toBeTruthy()
    fireEvent.click(screen.getByRole("button", { name: "Sluiten" }))
    expect(screen.queryByText("Het ging fout")).toBeNull()
  })
})
