import "@/router/routes"
import { render, screen } from "@testing-library/react"
import { createMemoryRouter, RouterProvider } from "react-router"
import type {
  ImportStatusResponse,
  ImportRowResult,
} from "@/api/hooks"
import ImportResultPage from "../ImportResultPage"

let status: {
  isError: boolean
  error: unknown
  data?: ImportStatusResponse
}

vi.mock("@/api/hooks", async (importOriginal) => ({
  ...(await importOriginal<object>()),
  useUsersMe: () => ({ data: { permissions: [] } }),
  useImportStatus: () => status,
}))

vi.mock("react-oidc-context", () => ({
  useAuth: () => ({ signoutRedirect: vi.fn() }),
}))

const renderPage = () =>
  render(
    <RouterProvider
      router={createMemoryRouter(
        [
          {
            path: "/zaken/importeren/resultaat/:taskId",
            element: <ImportResultPage />,
          },
        ],
        { initialEntries: ["/zaken/importeren/resultaat/abc-123"] },
      )}
    />,
  )

const created: ImportRowResult = {
  row_number: 3,
  address: "Kerkstraat 27-D, 1017 GB",
  bag_id: "0363010000000002",
  success: true,
  error: null,
  case_id: 42,
}
const notFound: ImportRowResult = {
  row_number: 4,
  address: "Rozenstraat 260-3, 1016 VV",
  bag_id: null,
  success: false,
  error: "Adres niet gevonden.",
  case_id: null,
}

const done = (case_data: ImportRowResult[]) => ({
  isError: false,
  error: null,
  data: {
    task_id: "abc-123",
    status: "SUCCESS",
    result: {
      total_processed: case_data.length,
      total_created: case_data.filter(({ success }) => success).length,
      dry_run: false,
      case_data,
    },
    error: null,
  },
})

describe("ImportResultPage", () => {
  beforeEach(() => {
    status = { isError: false, error: null }
  })

  it("says that the cases are being made, until they are", () => {
    status = {
      ...status,
      data: { task_id: "abc-123", status: "PENDING", result: null, error: null },
    }
    renderPage()

    expect(screen.getByText(/De zaken worden aangemaakt/)).toBeTruthy()
    expect(screen.getByRole("status").textContent).toMatch(
      /^De zaken worden aangemaakt/,
    )
    // The table of the cases, with rows that are loading.
    expect(
      screen.getByRole("heading", { name: "Aangemaakte zaken" }),
    ).toBeTruthy()
    expect(screen.getByRole("table")).toBeTruthy()
    // Nothing technical: no task id or state.
    expect(screen.queryByText(/abc-123|PENDING/)).toBeNull()
  })

  it("says when all cases are made, and links to them", () => {
    status = done([created])
    renderPage()

    expect(screen.getByText("Alle 1 zaken zijn aangemaakt.")).toBeTruthy()
    expect(screen.queryByRole("heading", { name: "Fouten" })).toBeNull()
    const link = screen.getByRole("link", {
      name: "Zaakdetails van zaak 42, Kerkstraat 27-D, 1017 GB",
    })
    expect(link.getAttribute("href")).toBe("/zaken/42")
  })

  it("shows the rows without a case, and why", () => {
    status = done([created, notFound])
    renderPage()

    expect(screen.getByText("Niet alle zaken zijn aangemaakt")).toBeTruthy()
    expect(screen.getByText("1 van de 2 adressen")).toBeTruthy()
    expect(screen.getByRole("heading", { name: "Fouten" })).toBeTruthy()
    expect(screen.getByText("Adres niet gevonden.")).toBeTruthy()
    expect(
      screen.getByRole("heading", { name: "Aangemaakte zaken" }),
    ).toBeTruthy()
  })

  it("puts the outcome above the result, below the title", () => {
    status = done([created, notFound])
    renderPage()

    const alert = screen.getByRole("heading", {
      level: 2,
      name: "Niet alle zaken zijn aangemaakt",
    })
    const result = screen.getByRole("heading", { level: 2, name: "Resultaat" })
    expect(
      alert.compareDocumentPosition(result) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy()
    // In the grey area: not in the white one of the result.
    expect(alert.closest(".ams-grid__cell")).not.toBe(
      result.closest(".ams-grid__cell"),
    )
  })

  it("says when no case is made", () => {
    status = done([notFound])
    renderPage()

    expect(screen.getByText("Er zijn geen zaken aangemaakt")).toBeTruthy()
    expect(screen.queryByRole("heading", { name: "Aangemaakte zaken" })).toBeNull()
  })

  it("says when the import failed, with the number to name", () => {
    status = {
      ...status,
      data: {
        task_id: "abc-123",
        status: "FAILURE",
        result: null,
        error: "Import failed. Contact support with the task ID.",
      },
    }
    renderPage()

    expect(screen.getByText("Importeren is niet gelukt")).toBeTruthy()
    expect(screen.getByText(/noem dit nummer: abc-123/)).toBeTruthy()
    // Not the English message of the backend.
    expect(screen.queryByText(/Contact support/)).toBeNull()
    expect(screen.queryByRole("status")).toBeNull()
  })

  it("says when the result is not found (anymore)", () => {
    status = { isError: true, error: { status: 404 } }
    renderPage()

    expect(screen.getByText("Resultaat niet gevonden")).toBeTruthy()
    expect(screen.queryByRole("status")).toBeNull()
  })
})
