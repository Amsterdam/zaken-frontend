import "@/router/routes"
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react"
import { MemoryRouter, Route, Routes, useLocation } from "react-router"
import type { ImportRowResult } from "@/api/hooks"
import ImportAddressesPage from "../ImportAddressesPage"

const caseData = { themeId: 2 }
const mutate = vi.fn()
const reset = vi.fn()

let check: {
  isPending: boolean
  isSuccess: boolean
  isError: boolean
  data?: { case_data: ImportRowResult[] }
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
  useCheckImportFile: () => ({ ...check, mutate, reset }),
}))

vi.mock("react-oidc-context", () => ({
  useAuth: () => ({ signoutRedirect: vi.fn() }),
}))

// The state of the route the page went to, with the File as it is.
const seeState = vi.fn()
const Location = () => {
  const { pathname, state } = useLocation()
  seeState(state)
  return <output aria-label="Pad">{pathname}</output>
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

const ok: ImportRowResult = {
  row_number: 3,
  address: "Hemonystraat 66-3, 1074BT",
  bag_id: "0363010000000001",
  success: true,
  error: null,
  case_id: null,
}
const wrong: ImportRowResult = {
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

    expect(screen.getByRole("status", { name: "Pad" }).textContent).toBe(
      "/zaken/importeren",
    )
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
    expect(screen.getByText(/Kies het Excel-bestand/).textContent).toContain(
      "voor het thema Kamerverhuur",
    )
  })

  it("has a link to download the example file", () => {
    renderPage()

    const link = screen.getByRole("link", {
      name: "Download het voorbeeldbestand",
    })
    expect(link.getAttribute("href")).toBe(
      "/downloads/voorbeeld-zaken-importeren.xlsx",
    )
    expect(link.hasAttribute("download")).toBe(true)
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
    expect(screen.getByRole("status", { name: "Pad" }).textContent).toBe(
      "/zaken/importeren/controleren",
    )
  })

  it("checks the addresses as soon as you choose a file", () => {
    renderPage()

    chooseFile()

    expect(mutate).toHaveBeenCalledWith({ file, caseData })
  })

  it("turns the button off while checking, and says so", () => {
    check = { ...check, isPending: true }
    renderPage()

    const button = screen.getByRole("button", {
      name: "Bezig met controleren…",
    })
    expect((button as HTMLButtonElement).disabled).toBe(true)
    // Read out by a screen reader: the skeleton is aria-hidden.
    expect(
      screen
        .getByText("De adressen worden gecontroleerd…")
        .getAttribute("role"),
    ).toBe("status")
  })

  it("says in a success alert when all addresses are good", () => {
    check = { ...check, isSuccess: true, data: { case_data: [ok, ok] } }
    renderPage()

    expect(
      screen.getByRole("heading", {
        name: "Alle adressen kunnen geïmporteerd worden",
      }),
    ).toBeTruthy()
    expect(
      screen.getByText(/Alle 2 adressen zijn gecontroleerd en zonder fouten/),
    ).toBeTruthy()
    expect(
      screen.queryByText("Niet alle adressen kunnen geïmporteerd worden"),
    ).toBeNull()
  })

  it("says in an alert when some addresses are not good", () => {
    check = { ...check, isSuccess: true, data: { case_data: [ok, wrong] } }
    renderPage()

    expect(
      screen.getByText("Niet alle adressen kunnen geïmporteerd worden"),
    ).toBeTruthy()
    expect(screen.getByText("1 van de 2 adressen")).toBeTruthy()
  })

  it("shows only the addresses with errors in a table", () => {
    check = { ...check, isSuccess: true, data: { case_data: [ok, wrong] } }
    renderPage()

    expect(
      screen.getByRole("heading", { level: 3, name: "Fouten" }),
    ).toBeTruthy()
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
    const openCase: ImportRowResult = {
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
    expect(
      screen.getAllByRole("link", { name: /^Adres bekijken/ }),
    ).toHaveLength(1)
  })

  it("shows no table when all addresses are good", () => {
    check = { ...check, isSuccess: true, data: { case_data: [ok, ok] } }
    renderPage()

    expect(screen.queryByRole("table")).toBeNull()
  })

  it("says in an error alert when checking failed", async () => {
    const error = { status: 400, error: "Bestand heeft ongeldige kolommen." }
    check = { ...check, isError: true, error }
    renderPage()

    expect(
      screen.getByRole("heading", { name: "Controleren is niet gelukt" }),
    ).toBeTruthy()
    expect(
      screen.getByText(
        /Bestand heeft ongeldige kolommen\. Pas het bestand aan/,
      ),
    ).toBeTruthy()

    // After "Volgende stap": what to do, at the field and in the list above.
    chooseFile()
    check = { ...check, isError: true, error }
    fireEvent.click(screen.getByRole("button", { name: "Volgende stap" }))
    const message = "Kies het bestand opnieuw om de adressen te controleren."
    await waitFor(() => expect(screen.getAllByText(message)).toHaveLength(2))
    expect(screen.getByRole("status", { name: "Pad" }).textContent).toBe(
      "/zaken/importeren/controleren",
    )
  })

  it("goes to step 3 with the theme and the file", async () => {
    check = { ...check, isSuccess: true, data: { case_data: [ok, wrong] } }
    renderPage()

    chooseFile()
    fireEvent.click(screen.getByRole("button", { name: "Volgende stap" }))

    await waitFor(() =>
      expect(screen.getByRole("status", { name: "Pad" }).textContent).toBe(
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
    expect(screen.getByRole("status", { name: "Pad" }).textContent).toBe(
      "/zaken/importeren/controleren",
    )
  })

  it("says in an error alert when no address is good, and why", () => {
    check = { ...check, isSuccess: true, data: { case_data: [wrong] } }
    renderPage()

    expect(
      screen.getByRole("heading", {
        name: "Geen enkel adres kan geïmporteerd worden",
      }),
    ).toBeTruthy()
    expect(
      screen.getByText(/Voor geen van de 1 adressen kan een zaak/),
    ).toBeTruthy()
    // Why, in the table.
    expect(screen.getByText(wrong.address)).toBeTruthy()
    // Not at the field yet: only after "Volgende stap".
    expect(
      screen.queryByText("Kies een bestand met ten minste één goed adres."),
    ).toBeNull()
  })

  it("does not go on when no address is good", async () => {
    check = { ...check, isSuccess: true, data: { case_data: [wrong] } }
    renderPage()

    chooseFile()
    fireEvent.click(screen.getByRole("button", { name: "Volgende stap" }))

    const message = "Kies een bestand met ten minste één goed adres."
    await waitFor(() => expect(screen.getAllByText(message)).toHaveLength(2))
    expect(screen.getByRole("status", { name: "Pad" }).textContent).toBe(
      "/zaken/importeren/controleren",
    )
  })

  it("says in an error alert when the file has no addresses", () => {
    check = { ...check, isSuccess: true, data: { case_data: [] } }
    renderPage()

    expect(
      screen.getByRole("heading", {
        name: "Geen enkel adres kan geïmporteerd worden",
      }),
    ).toBeTruthy()
    expect(
      screen.getByText(/Er staan geen adressen in het bestand/),
    ).toBeTruthy()
    expect(
      screen.queryByRole("heading", {
        name: "Alle adressen kunnen geïmporteerd worden",
      }),
    ).toBeNull()
  })

  it("goes back to step 1 with the chosen theme", () => {
    renderPage()

    // A link above the heading, not a button next to "Volgende stap".
    expect(screen.queryByRole("button", { name: "Vorige stap" })).toBeNull()
    fireEvent.click(screen.getByRole("link", { name: "Vorige stap" }))

    expect(screen.getByRole("status", { name: "Pad" }).textContent).toBe(
      "/zaken/importeren",
    )
    expect(seeState).toHaveBeenLastCalledWith({ caseData })
  })
})
