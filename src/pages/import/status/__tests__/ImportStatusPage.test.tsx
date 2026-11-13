import { render, screen } from "@testing-library/react"
import { createMemoryRouter, RouterProvider } from "react-router"
import ImportStatusPage from "../ImportStatusPage"

let taskStatusState = {
  isError: false,
  error: undefined as unknown,
  data: undefined as
    | {
        task_id: string
        status: string
        result: unknown
        error: string | null
      }
    | undefined,
}

vi.mock("@/api/hooks", async (importOriginal) => ({
  ...(await importOriginal<object>()),
  useUsersMe: () => ({ data: { permissions: [] } }),
  useBulkImportFileStatus: () => taskStatusState,
}))

vi.mock("react-oidc-context", () => ({
  useAuth: () => ({ signoutRedirect: vi.fn() }),
}))

const renderPage = () => {
  const router = createMemoryRouter(
    [{ path: "/zaken/importeren/resultaat/:taskId", element: <ImportStatusPage /> }],
    { initialEntries: ["/zaken/importeren/resultaat/abc-123"] },
  )

  return render(<RouterProvider router={router} />)
}

describe("ImportStatusPage", () => {
  beforeEach(() => {
    taskStatusState = {
      isError: false,
      error: undefined,
      data: undefined,
    }
  })

  it("shows live status and case results", () => {
    taskStatusState = {
      ...taskStatusState,
      data: {
        task_id: "abc-123",
        status: "PENDING",
        result: {
          case_data: [
            { success: true, msg: "Zaak aangemaakt" },
            { success: false, msg: "Adres niet gevonden" },
          ],
        },
        error: null,
      },
    }

    renderPage()

    expect(
      screen.getByText("Bestand wordt verwerkt met task_id=abc-123"),
    ).toBeTruthy()
    expect(
      screen.getByRole("status", { name: "De pagina wordt geladen" }),
    ).toBeTruthy()
    expect(screen.getByText("Status: PENDING")).toBeTruthy()
    expect(
      screen.getByText("Zaken geïmporteerd: 1 | niet importeerbaar: 1"),
    ).toBeTruthy()
    expect(
      screen
        .getByText("Zaak aangemaakt")
        .classList.contains("import-case-results__item--success"),
    ).toBe(true)
    expect(
      screen
        .getByText("Adres niet gevonden")
        .classList.contains("import-case-results__item--error"),
    ).toBe(true)
  })

  it("shows task error from response", () => {
    taskStatusState = {
      ...taskStatusState,
      data: {
        task_id: "abc-123",
        status: "FAILURE",
        result: null,
        error: "Geen geldige records",
      },
    }

    renderPage()

    expect(screen.getByText("Import mislukt")).toBeTruthy()
    expect(screen.getByText("Geen geldige records")).toBeTruthy()
    expect(
      screen.queryByRole("status", { name: "De pagina wordt geladen" }),
    ).toBeNull()
  })

  it("shows failed state for REVOKED without task error text", () => {
    taskStatusState = {
      ...taskStatusState,
      data: {
        task_id: "abc-123",
        status: "REVOKED",
        result: null,
        error: null,
      },
    }

    renderPage()

    expect(screen.getByText("Import mislukt")).toBeTruthy()
    expect(
      screen.queryByRole("status", { name: "De pagina wordt geladen" }),
    ).toBeNull()
  })
})



