import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import FlashMessageProvider from "app/state/flashMessages/FlashMessageProvider"
import HelpPage from "../HelpPage"

vi.mock("@/api/hooks", () => ({
  useUsersMe: () => ({ data: { permissions: [] } }),
}))

vi.mock("react-oidc-context", () => ({
  useAuth: () => ({ signoutRedirect: vi.fn() }),
}))

vi.mock("app/state/auth/oidc/useDecodedToken", () => ({
  useDecodedToken: () => ({ given_name: "Jan" }),
}))

describe("HelpPage", () => {
  it("shows the help topics with the contact addresses", () => {
    // The breadcrumbs read the path from window.location.
    window.history.pushState({}, "", "/hulp")
    render(
      <MemoryRouter initialEntries={["/hulp"]}>
        <FlashMessageProvider>
          <HelpPage />
        </FlashMessageProvider>
      </MemoryRouter>,
    )

    expect(screen.getByRole("heading", { level: 1, name: "Hulp" })).toBeTruthy()
    // A page directly below home has no breadcrumbs.
    expect(screen.queryByRole("navigation", { name: "Kruimelpad" })).toBeNull()
    const topics = ["Werkproces", "Algemeen gebruik", "Support", "Feedback"]
    topics.forEach((name) =>
      expect(screen.getByRole("button", { name })).toBeTruthy(),
    )
    expect(screen.getByText("ivdesk@amsterdam.nl").getAttribute("href")).toBe(
      "mailto:ivdesk@amsterdam.nl",
    )
  })
})
