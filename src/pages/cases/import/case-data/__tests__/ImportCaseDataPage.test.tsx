import "@/router/routes"
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react"
import { MemoryRouter, Route, Routes, useLocation } from "react-router"
import ImportCaseDataPage from "../ImportCaseDataPage"

const caseData = { themeId: 2 }
const file = new File(["xlsx"], "adressen.xlsx")
const mutate = vi.fn()

let importState: { isPending: boolean; isError: boolean; error?: unknown }

vi.mock("@/api/hooks", async (importOriginal) => ({
  ...(await importOriginal<object>()),
  useUsersMe: () => ({ data: { permissions: [] } }),
  useCaseThemes: () => ({
    data: {
      results: [
        { id: 2, name: "Leegstand" },
        { id: 3, name: "Kamerverhuur" },
      ],
    },
  }),
  useReasons: () => ({
    data: {
      results: [
        { id: 11, name: "Leegstandsmelding eigenaar" },
        { id: 12, name: "Project" },
        { id: 13, name: "MMA" },
        { id: 14, name: "SIG melding" },
        { id: 15, name: "Digitaal toezicht" },
      ],
    },
  }),
  useProjects: () => ({ data: { results: [{ id: 21, name: "Project A" }] } }),
  useSubjects: () => ({ data: { results: [{ id: 31, name: "Onderwerp A" }] } }),
  useAllowedJumpWorkflows: () => ({
    // Not on alphabet, as the backend may give them.
    data: [
      {
        value: "unoccupied",
        label: "Leegstandsmelding",
        themes: ["Leegstand"],
      },
      {
        value: "debrief",
        label: "Debrief",
        themes: null,
      },
    ],
  }),
  useImportBulkImportFile: () => ({ ...importState, mutate }),
}))

vi.mock("react-oidc-context", () => ({
  useAuth: () => ({ signoutRedirect: vi.fn() }),
}))

const seeState = vi.fn()
const Location = () => {
  const { pathname, state } = useLocation()
  seeState(state)
  return <output>{pathname}</output>
}

const renderPage = (
  state: unknown = { caseData, file, goodAddressCount: 29 },
) =>
  render(
    <MemoryRouter
      initialEntries={[{ pathname: "/zaken/importeren/zaakgegevens", state }]}
    >
      <Routes>
        <Route path="*" element={<Location />} />
        <Route
          path="/zaken/importeren/zaakgegevens"
          element={
            <>
              <ImportCaseDataPage />
              <Location />
            </>
          }
        />
      </Routes>
    </MemoryRouter>,
  )

const submit = () =>
  fireEvent.click(screen.getByRole("button", { name: "Zaken importeren" }))

describe("ImportCaseDataPage (step 3)", () => {
  beforeEach(() => {
    mutate.mockReset()
    seeState.mockReset()
    importState = { isPending: false, isError: false }
  })

  it("starts at step 1 without a chosen theme", () => {
    renderPage(null)

    expect(screen.getByRole("status").textContent).toBe("/zaken/importeren")
  })

  it("starts at step 2 without a checked file, with the theme", () => {
    renderPage({ caseData })

    expect(screen.getByRole("status").textContent).toBe(
      "/zaken/importeren/controleren",
    )
    expect(seeState).toHaveBeenLastCalledWith({ caseData })
  })

  it("says which step it is and what will be imported", () => {
    renderPage()

    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Stap 3 van 3: Zaakgegevens kiezen en importeren",
      }),
    ).toBeTruthy()
    const summary = screen.getByText(/Er worden zaken aangemaakt/).textContent
    expect(summary).toContain("voor 29 adressen")
    expect(summary).toContain("uit het bestand adressen.xlsx")
    expect(summary).toContain("met het thema Leegstand")
  })

  it("imports with the chosen data and goes to the result", async () => {
    mutate.mockImplementation((_, { onSuccess }) =>
      onSuccess({ task_id: "abc-123" }),
    )
    renderPage()

    fireEvent.click(
      screen.getByRole("radio", { name: "Leegstandsmelding eigenaar" }),
    )
    fireEvent.click(screen.getByRole("checkbox", { name: "Onderwerp A" }))
    fireEvent.change(
      screen.getByRole("textbox", { name: /Korte toelichting/ }),
      { target: { value: "Bulkbeschikking oktober" } },
    )
    fireEvent.click(screen.getByRole("radio", { name: "Debrief" }))
    submit()

    await waitFor(() =>
      expect(screen.getByRole("status").textContent).toBe(
        "/zaken/importeren/resultaat/abc-123",
      ),
    )
    expect(mutate).toHaveBeenCalledWith(
      {
        file,
        caseData: {
          themeId: 2,
          reasonId: 11,
          subjectIds: [31],
          description: "Bulkbeschikking oktober",
          jumpTo: "debrief",
        },
      },
      expect.anything(),
    )
  })

  it("does not send a process or an empty explanation", async () => {
    renderPage()

    fireEvent.click(
      screen.getByRole("radio", { name: "Leegstandsmelding eigenaar" }),
    )
    fireEvent.click(screen.getByRole("checkbox", { name: "Onderwerp A" }))
    submit()

    await waitFor(() => expect(mutate).toHaveBeenCalled())
    expect(mutate.mock.calls[0][0].caseData).not.toHaveProperty("jumpTo")
    // The explanation is optional: without one it is left out.
    expect(mutate.mock.calls[0][0].caseData).not.toHaveProperty("description")
  })

  it("offers no reasons that ask for something of one case", () => {
    renderPage()

    const reasons = within(
      screen.getByRole("radiogroup", { name: "Aanleiding" }),
    )
      .getAllByRole("radio")
      .map((radio) => radio.getAttribute("value"))
    expect(reasons).toEqual(["11", "12"])
  })

  it("asks where the cases start, at the start by default", () => {
    renderPage()

    const group = screen.getByRole("radiogroup", {
      name: "Waar beginnen de zaken?",
    })
    expect(group).toBeTruthy()
    expect(
      (
        screen.getByRole("radio", {
          name: "Aan het begin van het proces",
        }) as HTMLInputElement
      ).checked,
    ).toBe(true)
    expect(screen.getByRole("radio", { name: "Debrief" })).toBeTruthy()
  })

  it("offers the steps on alphabet, after the start", () => {
    renderPage()

    const steps = within(
      screen.getByRole("radiogroup", { name: "Waar beginnen de zaken?" }),
    )
      .getAllByRole("radio")
      .map((radio) => radio.getAttribute("value"))
    expect(steps).toEqual(["start", "debrief", "unoccupied"])
  })

  it("offers a step of one theme only for that theme", () => {
    renderPage()
    expect(screen.getByRole("radio", { name: "Leegstandsmelding" })).toBeTruthy()
  })

  it("does not offer a step of another theme", () => {
    renderPage({ caseData: { themeId: 3 }, file, goodAddressCount: 29 })
    expect(screen.queryByRole("radio", { name: "Leegstandsmelding" })).toBeNull()
  })

  it("asks the project only for the reason Project", async () => {
    renderPage()

    expect(screen.queryByRole("combobox", { name: "Projectnaam" })).toBeNull()
    fireEvent.click(screen.getByRole("radio", { name: "Project" }))
    fireEvent.click(screen.getByRole("checkbox", { name: "Onderwerp A" }))
    submit()

    expect(await screen.findAllByText("Kies een project.")).not.toHaveLength(0)
    expect(mutate).not.toHaveBeenCalled()
  })

  it("asks the reason and the subjects", async () => {
    renderPage()

    submit()

    expect(await screen.findAllByText("Kies een aanleiding.")).not.toHaveLength(
      0,
    )
    expect(
      screen.getAllByText("Kies ten minste één onderwerp."),
    ).not.toHaveLength(0)
    expect(mutate).not.toHaveBeenCalled()
  })

  it("says when importing failed", () => {
    importState = {
      isPending: false,
      isError: true,
      error: { status: 400, error: "Kies een aanleiding." },
    }
    renderPage()

    expect(screen.getByText("Importeren is niet gelukt")).toBeTruthy()
  })

  it("goes back to step 2 with the chosen theme", () => {
    renderPage()

    fireEvent.click(screen.getByRole("button", { name: "Vorige stap" }))

    expect(screen.getByRole("status").textContent).toBe(
      "/zaken/importeren/controleren",
    )
    expect(seeState).toHaveBeenLastCalledWith({ caseData })
  })
})
