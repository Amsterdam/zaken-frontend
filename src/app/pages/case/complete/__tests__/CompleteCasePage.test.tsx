// First, like the app does: the page imports the layout, which imports the
// routes, which import this page (circular).
import "app/routing/routes"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom"
import { ToastProvider } from "@/components/toasts/ToastProvider"
import CompleteCasePage from "../CompleteCasePage"

const closeCase = vi.fn()

vi.mock("@/api/hooks", () => ({
  useUsersMe: () => ({ data: { permissions: ["perform_task"] } }),
  useCase: () => ({
    data: {
      id: 12,
      theme: { id: 1 },
      address: {
        street_name: "Amstel",
        number: 1,
        suffix_letter: null,
        suffix: "H",
        postal_code: "1011PN",
      },
    },
    isLoading: false,
  }),
  useCaseCloseReasons: () => ({
    data: {
      results: [
        { id: 1, name: "Geen woonfraude", result: false },
        { id: 2, name: "Resultaat na handhaving", result: true },
      ],
    },
  }),
  useCaseCloseResults: () => ({
    data: {
      results: [
        { id: 7, name: "Boete opgelegd" },
        { id: 8, name: "Overtreding beëindigd" },
      ],
    },
  }),
  useCloseCase: () => ({ mutateAsync: closeCase, isPending: false }),
}))

vi.mock("@/hooks/useHasPermission", () => ({ default: () => [true, false] }))

vi.mock("react-oidc-context", () => ({
  useAuth: () => ({ signoutRedirect: vi.fn() }),
}))

vi.mock("app/state/auth/oidc/useDecodedToken", () => ({
  useDecodedToken: () => ({ given_name: "Jan" }),
}))

const Location = () => <output>{useLocation().pathname}</output>

const renderPage = () => {
  // The breadcrumbs read the path from window.location.
  window.history.pushState({}, "", "/zaken/12/afronding/34")
  return render(
    <MemoryRouter initialEntries={["/zaken/12/afronding/34"]}>
      <ToastProvider>
        <Routes>
          <Route
            path="/zaken/:id/afronding/:caseUserTaskId"
            element={<CompleteCasePage />}
          />
          <Route path="*" element={null} />
        </Routes>
        <Location />
      </ToastProvider>
    </MemoryRouter>,
  )
}

const submit = () =>
  fireEvent.click(screen.getByRole("button", { name: "Zaak afronden" }))
const location = () => screen.getByText(/^\/zaken/, { selector: "output" })
const explain = (text: string) =>
  fireEvent.change(screen.getByLabelText(/^Toelichting/), {
    target: { value: text },
  })

describe("the page to close a case", () => {
  beforeEach(() => {
    closeCase.mockReset().mockResolvedValue({})
  })

  it("shows the case and asks why it is closed", () => {
    renderPage()

    expect(
      screen.getByRole("heading", { level: 1, name: "Zaak afronden" }),
    ).toBeTruthy()
    expect(screen.getByText("Amstel 1-H, 1011PN Amsterdam")).toBeTruthy()
    expect(screen.getByLabelText("Geen woonfraude")).toBeTruthy()
    // The result is only asked for a reason that has one.
    expect(screen.queryByText("Wat is het resultaat?")).toBeNull()
  })

  it("lists what is wrong when saved empty", async () => {
    // Like index.html: an element with the name of a field, that is no field.
    const meta = document.createElement("meta")
    meta.name = "description"
    document.head.append(meta)
    renderPage()
    submit()

    expect(
      await screen.findByRole("link", { name: "Kies een reden." }),
    ).toBeTruthy()
    expect(
      screen.getByRole("link", { name: "Vul een toelichting in." }),
    ).toBeTruthy()
    // The link of a group of radio buttons goes to its first one.
    expect(
      screen
        .getByRole("link", { name: "Kies een reden." })
        .getAttribute("href"),
    ).toBe("#reason-0")
    expect(
      screen
        .getByRole("link", { name: "Vul een toelichting in." })
        .getAttribute("href"),
    ).toBe("#description")
    meta.remove()
    expect(closeCase).not.toHaveBeenCalled()
  })

  it("closes the case for a reason without a result", async () => {
    renderPage()

    fireEvent.click(screen.getByLabelText("Geen woonfraude"))
    explain("Bewoner woont er zelf.")
    submit()

    await waitFor(() =>
      expect(closeCase).toHaveBeenCalledWith({
        case: 12,
        case_user_task_id: "34",
        reason: 1,
        result: null,
        description: "Bewoner woont er zelf.",
      }),
    )
    await waitFor(() => expect(location().textContent).toBe("/zaken/12"))
    expect(screen.getByText("Het resultaat is verwerkt.")).toBeTruthy()
  })

  it("asks the result for a reason that has one", async () => {
    renderPage()

    fireEvent.click(screen.getByLabelText("Resultaat na handhaving"))
    explain("Boete betaald.")
    submit()

    // The result is required now.
    expect(
      await screen.findByRole("link", { name: "Kies een resultaat." }),
    ).toBeTruthy()
    expect(closeCase).not.toHaveBeenCalled()

    fireEvent.click(screen.getByLabelText("Boete opgelegd"))
    submit()

    await waitFor(() =>
      expect(closeCase).toHaveBeenCalledWith({
        case: 12,
        case_user_task_id: "34",
        reason: 2,
        result: 7,
        description: "Boete betaald.",
      }),
    )
  })

  it("leaves out a result that was chosen for another reason", async () => {
    renderPage()

    fireEvent.click(screen.getByLabelText("Resultaat na handhaving"))
    fireEvent.click(screen.getByLabelText("Boete opgelegd"))
    fireEvent.click(screen.getByLabelText("Geen woonfraude"))
    explain("Toch geen overtreding.")
    submit()

    await waitFor(() => expect(closeCase).toHaveBeenCalled())
    expect(closeCase.mock.calls[0][0]).toMatchObject({
      reason: 1,
      result: null,
    })
  })

  it("stays on the form when closing fails", async () => {
    closeCase.mockRejectedValue(new Error("500"))
    renderPage()

    fireEvent.click(screen.getByLabelText("Geen woonfraude"))
    explain("Bewoner woont er zelf.")
    submit()

    await waitFor(() => expect(closeCase).toHaveBeenCalled())
    expect(location().textContent).toBe("/zaken/12/afronding/34")
  })
})
