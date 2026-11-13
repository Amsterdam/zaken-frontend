import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, useLocation } from "react-router"
import ImportAddressesPage from "../ImportAddressesPage"

const validateMutate = vi.fn()
const validateReset = vi.fn()
const importMutate = vi.fn()
const importReset = vi.fn()

const caseData = {
  themeId: 1,
  reasonId: 11,
  subjectIds: [31],
  jumpTo: null,
}

const Location = () => {
  const { pathname } = useLocation()
  return (
    <output>{pathname}</output>
  )
}

let validateState = {
  isPending: false,
  isSuccess: false,
  isError: false,
  data: undefined as
    | {
        total_processed: number
        total_created: number
        dry_run: boolean
        case_data: Array<{ success: boolean; msg: string }>
      }
    | undefined,
  error: undefined as unknown,
}

let importState = {
  isPending: false,
  isError: false,
  error: undefined as unknown,
}

vi.mock("@/api/hooks", async (importOriginal) => ({
  ...(await importOriginal<object>()),
  useUsersMe: () => ({ data: { permissions: [] } }),
  useValidateBulkImportFile: () => ({
    ...validateState,
    mutate: validateMutate,
    reset: validateReset,
  }),
  useImportBulkImportFile: () => ({
    ...importState,
    mutate: importMutate,
    reset: importReset,
  }),
}))

vi.mock("react-oidc-context", () => ({
  useAuth: () => ({ signoutRedirect: vi.fn() }),
}))

const renderPage = () =>
  render(
    <MemoryRouter
      initialEntries={[
        {
          pathname: "/zaken/importeren/controleren",
          state: { caseData },
        },
      ]}
    >
      <ImportAddressesPage />
      <Location />
    </MemoryRouter>,
  )

const renderPageWithoutCaseData = () =>
  render(
    <MemoryRouter initialEntries={["/zaken/importeren/controleren"]}>
      <ImportAddressesPage />
    </MemoryRouter>,
  )

describe("ImportAddressesPage", () => {
  beforeEach(() => {
    validateMutate.mockReset()
    validateReset.mockReset()
    importMutate.mockReset()
    importReset.mockReset()

    validateState = {
      isPending: false,
      isSuccess: false,
      isError: false,
      data: undefined,
      error: undefined,
    }
    importState = {
      isPending: false,
      isError: false,
      error: undefined,
    }
  })

  it("sends the chosen case data for checking and importing", () => {
    validateState = {
      ...validateState,
      isSuccess: true,
      data: {
        total_processed: 2,
        total_created: 0,
        dry_run: true,
        case_data: [
          {
            success: true,
            msg: "Creating case for address=Hemonystraat 66-3, 1074BT: OK",
          },
          {
            success: false,
            msg: "No such address found: Linneausstraat 49-2, 1093EH !",
          },
        ],
      },
    }

    const file = new File(["csv"], "adressen.xlsx", { type: "text/csv" })

    validateMutate.mockImplementation((payload, options) => {
      expect(payload).toEqual({ file, caseData })
      options?.onSuccess?.(undefined)
    })
    importMutate.mockImplementation((payload, options) => {
      expect(payload).toEqual({ file, caseData })
      options?.onSuccess?.({ task_id: "abc-123" })
    })

    renderPage()

    fireEvent.change(screen.getByLabelText("Bestand kiezen voor import"), {
      target: { files: [file] },
    })

    fireEvent.click(
      screen.getByRole("button", { name: "Bestand controleren" }),
    )

    expect(
      screen.getByText("Zaken importeerbaar: 1 | niet importeerbaar: 1"),
    ).toBeTruthy()
    expect(
      screen
        .getByText("Creating case for address=Hemonystraat 66-3, 1074BT: OK")
        .classList.contains("import-case-results__item--success"),
    ).toBe(true)
    expect(
      screen
        .getByText("No such address found: Linneausstraat 49-2, 1093EH !")
        .classList.contains("import-case-results__item--error"),
    ).toBe(true)

    fireEvent.click(
      screen.getByRole("button", {
        name: "Zaken importeren",
      }),
    )
    expect(screen.getByRole("status").textContent).toBe("/zaken/importeren/resultaat/abc-123")
  })

  it("shows an error when validate fails", () => {
    validateState = {
      ...validateState,
      isError: true,
      error: { message: "Mislukt" },
    }

    renderPage()

    expect(screen.getByText("Mislukt")).toBeTruthy()
  })

  it("shows backend payload error for 400/500 responses", () => {
    validateState = {
      ...validateState,
      isError: true,
      error: { status: 400, error: "Bestand heeft ongeldige kolommen" },
    }

    renderPage()

    expect(screen.getByText("Bestand heeft ongeldige kolommen")).toBeTruthy()
  })

  it("shows an error when no case type was chosen", () => {
    renderPageWithoutCaseData()

    expect(screen.getByText("Geen soort zaak gekozen")).toBeTruthy()
  })
})



