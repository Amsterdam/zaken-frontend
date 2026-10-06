import { fireEvent, render, screen, within } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import HelpPage from "../HelpPage"

vi.mock("@/api/hooks", () => ({
  useUsersMe: () => ({ data: { permissions: [] } }),
}))

vi.mock("react-oidc-context", () => ({
  useAuth: () => ({ signoutRedirect: vi.fn() }),
}))

vi.mock("@/hooks/useDecodedToken", () => ({
  useDecodedToken: () => ({ given_name: "Jan" }),
}))

describe("HelpPage", () => {
  it("shows the help topics with the contact addresses", () => {
    // The breadcrumbs read the path from window.location.
    window.history.pushState({}, "", "/hulp")
    render(
      <MemoryRouter initialEntries={["/hulp"]}>
        <HelpPage />
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

  it("shows the explanation on its own tab", () => {
    render(
      <MemoryRouter initialEntries={["/hulp"]}>
        <HelpPage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole("tab", { name: "Contact", selected: true }),
    ).toBeTruthy()
    expect(
      screen.queryByRole("button", { name: "Processen (BPMN)" }),
    ).toBeNull()

    fireEvent.click(screen.getByRole("tab", { name: "Uitleg" }))

    expect(
      screen.getByRole("tab", { name: "Uitleg", selected: true }),
    ).toBeTruthy()
    expect(
      screen.getByRole("button", { name: "Processen (BPMN)" }),
    ).toBeTruthy()
    expect(screen.getByRole("button", { name: "Zoeken" })).toBeTruthy()
    expect(
      screen.getByRole("button", { name: "Taken- en zakenoverzicht" }),
    ).toBeTruthy()
    expect(screen.queryByRole("button", { name: "Support" })).toBeNull()
    // The menu has a link "BPMN" too.
    expect(
      within(screen.getByRole("tabpanel"))
        .getByRole("link", { name: "BPMN" })
        .getAttribute("href"),
    ).toBe("/bpmn")
  })

  it("opens the tab from the URL", () => {
    render(
      <MemoryRouter initialEntries={["/hulp?tab=uitleg"]}>
        <HelpPage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole("tab", { name: "Uitleg", selected: true }),
    ).toBeTruthy()
  })
})
