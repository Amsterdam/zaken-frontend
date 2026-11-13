import "@/router/routes"
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react"
import { MemoryRouter, useLocation } from "react-router"
import ImportThemePage from "../ImportThemePage"

vi.mock("@/api/hooks", async (importOriginal) => ({
  ...(await importOriginal<object>()),
  useUsersMe: () => ({ data: { permissions: [] } }),
  useCaseThemes: () => ({
    data: {
      results: [
        { id: 1, name: "Vakantieverhuur" },
        { id: 2, name: "Ondermijning" },
      ],
    },
  }),
}))

vi.mock("react-oidc-context", () => ({
  useAuth: () => ({ signoutRedirect: vi.fn() }),
}))

const Location = () => {
  const { pathname, state } = useLocation()
  return <output>{`${pathname} ${JSON.stringify(state)}`}</output>
}

const renderPage = (state: unknown = null) =>
  render(
    <MemoryRouter initialEntries={[{ pathname: "/zaken/importeren", state }]}>
      <ImportThemePage />
      <Location />
    </MemoryRouter>,
  )

describe("ImportThemePage (step 1)", () => {
  it("explains the three steps", () => {
    renderPage()

    const steps = within(screen.getByRole("main")).getAllByRole("listitem")
    expect(steps.map((step) => step.textContent)).toEqual([
      expect.stringMatching(/^Thema kiezen:/),
      expect.stringMatching(/^Adressen controleren:/),
      expect.stringMatching(/^Zaakgegevens kiezen en importeren:/),
    ])
  })

  it("says which step it is", () => {
    renderPage()

    expect(
      screen.getByRole("heading", { level: 1, name: "Zaken importeren" }),
    ).toBeTruthy()
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Stap 1 van 3: Thema kiezen",
      }),
    ).toBeTruthy()
  })

  it("asks only the theme", () => {
    renderPage()

    expect(screen.getAllByRole("radiogroup")).toHaveLength(1)
    expect(screen.getByRole("radiogroup", { name: "Kies een thema" })).toBeTruthy()
    expect(screen.queryByRole("combobox")).toBeNull()
    expect(screen.queryByRole("checkbox")).toBeNull()
  })

  it("goes to checking the addresses with the chosen theme", async () => {
    renderPage()

    fireEvent.click(screen.getByRole("radio", { name: "Ondermijning" }))
    fireEvent.click(screen.getByRole("button", { name: "Volgende stap" }))

    await waitFor(() =>
      expect(screen.getByRole("status").textContent).toBe(
        '/zaken/importeren/controleren {"caseData":{"themeId":2}}',
      ),
    )
  })

  it("says to choose a theme when you go on without one", async () => {
    renderPage()

    fireEvent.click(screen.getByRole("button", { name: "Volgende stap" }))

    expect(await screen.findAllByText("Kies een thema.")).not.toHaveLength(0)
    expect(screen.getByRole("status").textContent).toBe("/zaken/importeren null")
  })

  it("still has the theme chosen when you come back from step 2", () => {
    renderPage({ caseData: { themeId: 2 } })

    expect(
      (screen.getByRole("radio", { name: "Ondermijning" }) as HTMLInputElement)
        .checked,
    ).toBe(true)
  })
})
