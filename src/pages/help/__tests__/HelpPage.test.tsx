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
  it("shows the explanation first, with searching open", () => {
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
    expect(
      screen.getByRole("tab", { name: "Uitleg", selected: true }),
    ).toBeTruthy()
    const topics = [
      "Zoeken",
      "Taken- en zakenoverzicht",
      "Bezoek overslaan (Ondermijning)",
      "Processen (BPMN)",
    ]
    // Only the first topic is open.
    topics.forEach((name) =>
      expect(
        screen.getByRole("button", { name }).getAttribute("aria-expanded"),
      ).toBe(String(name === "Zoeken")),
    )
    expect(screen.queryByRole("button", { name: "Support" })).toBeNull()
    // The menu has a link "BPMN" too.
    expect(
      within(screen.getByRole("tabpanel"))
        .getByRole("link", { name: "BPMN" })
        .getAttribute("href"),
    ).toBe("/bpmn")
  })

  it("shows the contact addresses on their own tab", () => {
    render(
      <MemoryRouter initialEntries={["/hulp"]}>
        <HelpPage />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole("tab", { name: "Contact" }))

    expect(
      screen.getByRole("tab", { name: "Contact", selected: true }),
    ).toBeTruthy()
    expect(screen.queryByRole("button", { name: "Zoeken" })).toBeNull()
    const topics = [
      "Support",
      "Algemeen gebruik",
      "Werkproces",
      "Vraag of feedback",
    ]
    // Only the first topic is open: most people come for support.
    topics.forEach((name) =>
      expect(
        screen.getByRole("button", { name }).getAttribute("aria-expanded"),
      ).toBe(String(name === "Support")),
    )
    expect(screen.getByText("ivdesk@amsterdam.nl").getAttribute("href")).toBe(
      "mailto:ivdesk@amsterdam.nl",
    )
  })

  it("opens the tab from the URL", () => {
    render(
      <MemoryRouter initialEntries={["/hulp?tab=contact"]}>
        <HelpPage />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole("tab", { name: "Contact", selected: true }),
    ).toBeTruthy()
  })
})
