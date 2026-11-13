import "@/router/routes"
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react"
import { MemoryRouter, Route, Routes, useLocation } from "react-router"
import type { ProcessedCaseResult } from "@/api/hooks"
import ImportAddressesPage from "../ImportAddressesPage"

const caseData = { themeId: 2 }
const mutate = vi.fn()
const reset = vi.fn()

let check: {
  isPending: boolean
  isSuccess: boolean
  isError: boolean
  data?: { case_data: ProcessedCaseResult[] }
  error?: unknown
}

vi.mock("@/api/hooks", async (importOriginal) => ({
  ...(await importOriginal<object>()),
  useUsersMe: () => ({ data: { permissions: [] } }),
  useCaseThemes: () => ({
    data: {
      results: [
        { id: 1, name: "Vakantieverhuur" },
        { id: 2, name: "Kamerverhuur" },
      ],
    },
  }),
  useValidateBulkImportFile: () => ({ ...check, mutate, reset }),
}))

vi.mock("react-oidc-context", () => ({
  useAuth: () => ({ signoutRedirect: vi.fn() }),
}))

// The state of the route the page went to, with the File as it is.
const seeState = vi.fn()
const Location = () => {
  const { pathname, state } = useLocation()
  seeState(state)
  return <output>{pathname}</output>
}

const page = (state: unknown = { caseData }) => (
    <MemoryRouter
      initialEntries={[{ pathname: "/zaken/importeren/controleren", state }]}
    >
      <Routes>
        <Route path="*" element={<Location />} />
        <Route
          path="/zaken/importeren/controleren"
          element={
            <>
              <ImportAddressesPage />
              <Location />
            </>
          }
        />
      </Routes>
    </MemoryRouter>
)

const renderPage = (state?: unknown) => render(page(state))

const file = new File(["xlsx"], "adressen.xlsx")
const chooseFile = () =>
  fireEvent.change(screen.getByLabelText("Excel-bestand"), {
    target: { files: [file] },
  })

const ok: ProcessedCaseResult = {
  row_number: 3,
  address: "Hemonystraat 66-3, 1074BT",
  bag_id: "0363010000000001",
  success: true,
  error: null,
  case_id: null,
}
const wrong: ProcessedCaseResult = {
  row_number: 9,
  address: "Linneausstraat 49-2, 1093EH",
  bag_id: null,
  success: false,
  error: "Adres niet gevonden.",
  case_id: null,
}

describe("ImportAddressesPage (step 2)", () => {
  beforeEach(() => {
    mutate.mockReset()
    reset.mockReset()
    seeState.mockReset()
    check = { isPending: false, isSuccess: false, isError: false }
  })

  it("starts at step 1 without a chosen theme", () => {
    renderPage(null)

    expect(screen.getByRole("status").textContent).toBe("/zaken/importeren")
  })

  it("says which step it is and for which theme", () => {
    renderPage()

    expect(
      screen.getByRole("heading", { level: 1, name: "Zaken importeren" }),
    ).toBeTruthy()
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "Stap 2 van 3: Adressen controleren",
      }),
    ).toBeTruthy()
    expect(
      screen.getByText(/Kies het Excel-bestand/).textContent,
    ).toContain("voor het thema Kamerverhuur")
  })

  it("lets you choose only an Excel file", () => {
    renderPage()

    expect(screen.getByLabelText("Excel-bestand").getAttribute("accept")).toBe(
      ".xlsx,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    )
  })

  it("does not send a file that is not Excel, and says so", async () => {
    renderPage()

    fireEvent.change(screen.getByLabelText("Excel-bestand"), {
      target: { files: [new File(["png"], "foto.png", { type: "image/png" })] },
    })

    expect(
      await screen.findAllByText("Kies een Excel-bestand (.xlsx)."),
    ).toHaveLength(1)
    expect(mutate).not.toHaveBeenCalled()

    fireEvent.click(screen.getByRole("button", { name: "Volgende stap" }))
    await waitFor(() =>
      expect(
        screen.getAllByText("Kies een Excel-bestand (.xlsx)."),
      ).toHaveLength(2),
    )
    expect(screen.getByRole("status").textContent).toBe(
      "/zaken/importeren/controleren",
    )
  })

  it("checks the addresses as soon as you choose a file", () => {
    renderPage()

    chooseFile()

    expect(mutate).toHaveBeenCalledWith({ file, caseData }, expect.anything())
  })

  it("says when all addresses are good, without an alert", () => {
    check = { ...check, isSuccess: true, data: { case_data: [ok, ok] } }
    renderPage()

    expect(screen.getByText(/Alle 2 adressen zijn gecontroleerd en zonder fouten/)).toBeTruthy()
    expect(screen.queryByRole("heading", { name: /kunnen geïmporteerd worden/ })).toBeNull()
  })

  it("says in an alert when some addresses are not good", () => {
    check = { ...check, isSuccess: true, data: { case_data: [ok, wrong] } }
    renderPage()

    expect(screen.getByText("Niet alle adressen kunnen geïmporteerd worden")).toBeTruthy()
    expect(screen.getByText("1 van de 2 adressen")).toBeTruthy()
  })

  it("shows only the addresses with errors in a table", () => {
    check = { ...check, isSuccess: true, data: { case_data: [ok, wrong] } }
    renderPage()

    expect(screen.getByRole("heading", { level: 3, name: "Fouten" })).toBeTruthy()
    const rows = within(screen.getByRole("table")).getAllByRole("row")
    expect(
      rows.map((row) =>
        [...row.querySelectorAll("th, td")].map((cell) => cell.textContent),
      ),
    ).toEqual([
      ["Rij", "Adres", "Fout", ""],
      ["9", "Linneausstraat 49-2, 1093EH", "Adres niet gevonden.", ""],
    ])
  })

  it("links an address with an open case to its overview, in a new tab", () => {
    const openCase: ProcessedCaseResult = {
      row_number: 4,
      address: "Kerkstraat 27-D, 1017GB",
      bag_id: "0363010000000002",
      success: false,
      error: "Er bestaat al een open zaak met dit thema op dit adres.",
      case_id: null,
    }
    check = {
      ...check,
      isSuccess: true,
      data: { case_data: [ok, wrong, openCase] },
    }
    renderPage()

    const link = screen.getByRole("link", {
      name: "Adres bekijken: Kerkstraat 27-D, 1017GB (opent in een nieuw tabblad)",
    })
    expect(link.getAttribute("href")).toBe("/adres/0363010000000002")
    expect(link.getAttribute("target")).toBe("_blank")
    // Not found in the BAG: no address to go to.
    expect(screen.getAllByRole("link", { name: /^Adres bekijken/ })).toHaveLength(1)
  })

  it("shows no table when all addresses are good", () => {
    check = { ...check, isSuccess: true, data: { case_data: [ok, ok] } }
    renderPage()

    expect(screen.queryByRole("table")).toBeNull()
  })

  it("says once, at the field, when checking failed", async () => {
    const error = { status: 400, error: "Bestand heeft ongeldige kolommen" }
    // Like the request: done after the change of the field.
    mutate.mockImplementation((_, { onError }) =>
      setTimeout(() => {
        check = { ...check, isError: true, error }
        onError(error)
      }),
    )
    const { rerender } = renderPage()

    chooseFile()

    const message =
      "Controleren is niet gelukt: Bestand heeft ongeldige kolommen"
    expect(await screen.findAllByText(message)).toHaveLength(1)
    expect(screen.queryByRole("heading", { name: /niet gelukt/ })).toBeNull()
    // The mock of the request does not render the page again, as React Query does.
    rerender(page())

    // After "Volgende stap" also in the list above the form, that links to it.
    fireEvent.click(screen.getByRole("button", { name: "Volgende stap" }))
    await waitFor(() => expect(screen.getAllByText(message)).toHaveLength(2))
    expect(screen.getByRole("link", { name: message })).toBeTruthy()
  })

  it("goes to step 3 with the theme and the file", async () => {
    check = { ...check, isSuccess: true, data: { case_data: [ok, wrong] } }
    renderPage()

    chooseFile()
    fireEvent.click(screen.getByRole("button", { name: "Volgende stap" }))

    await waitFor(() =>
      expect(screen.getByRole("status").textContent).toBe(
        "/zaken/importeren/zaakgegevens",
      ),
    )
    expect(seeState).toHaveBeenLastCalledWith({
      caseData,
      file,
      goodAddressCount: 1,
    })
  })

  it("does not go on without a file", async () => {
    renderPage()

    fireEvent.click(screen.getByRole("button", { name: "Volgende stap" }))

    expect(
      await screen.findAllByText("Kies een Excel-bestand met adressen."),
    ).not.toHaveLength(0)
    expect(screen.getByRole("status").textContent).toBe(
      "/zaken/importeren/controleren",
    )
  })

  it("says at the field when no address is good, and why", async () => {
    const data = { case_data: [wrong] }
    mutate.mockImplementation((_, { onSuccess }) =>
      setTimeout(() => {
        check = { ...check, isSuccess: true, data }
        onSuccess(data)
      }),
    )
    const { rerender } = renderPage()

    chooseFile()

    expect(
      await screen.findAllByText(
        "Geen van de adressen is goed. Pas het bestand aan en kies het opnieuw.",
      ),
    ).toHaveLength(1)
    rerender(page())
    // Why, in the table: not a second message.
    expect(screen.getByText(wrong.address)).toBeTruthy()
    expect(screen.queryByRole("heading", { name: /kunnen geïmporteerd worden/ })).toBeNull()
  })

  it("goes back to step 1 with the chosen theme", () => {
    renderPage()

    fireEvent.click(screen.getByRole("button", { name: "Vorige stap" }))

    expect(screen.getByRole("status").textContent).toBe("/zaken/importeren")
    expect(seeState).toHaveBeenLastCalledWith({ caseData })
  })
})
