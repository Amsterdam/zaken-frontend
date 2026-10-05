// First, like the app does: the page imports the layout, which imports the
// routes, which import this page (circular).
import "@/router/routes"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { MemoryRouter, Route, Routes, useLocation } from "react-router"
import { ToastProvider } from "@/components/toasts/ToastProvider"
import CreatePage from "../CreatePage"

const createDecision = vi.fn()

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
      workflows: [],
    },
    isLoading: false,
  }),
  useDecisionTypes: () => ({
    data: {
      results: [
        { id: 2, name: "Boete", is_sanction: true },
        { id: 3, name: "Last onder dwangsom", is_sanction: false },
        { id: 9, name: "Geen besluit", is_sanction: false },
      ],
    },
  }),
  useSummonsByCaseId: () => ({ data: { results: [] }, isLoading: false }),
  useCreateDecision: () => ({ mutateAsync: createDecision, isPending: false }),
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
  window.history.pushState({}, "", "/zaken/12/besluit/34")
  return render(
    <MemoryRouter initialEntries={["/zaken/12/besluit/34"]}>
      <ToastProvider>
        <Routes>
          <Route
            path="/zaken/:id/besluit/:caseUserTaskId"
            element={<CreatePage />}
          />
          <Route path="*" element={null} />
        </Routes>
        <Location />
      </ToastProvider>
    </MemoryRouter>,
  )
}

const submit = () =>
  fireEvent.click(screen.getByRole("button", { name: "Resultaat verwerken" }))
const location = () => screen.getByText(/^\/zaken/, { selector: "output" })
const choose = (value: string) =>
  fireEvent.change(screen.getByLabelText(/^Welk besluit is opgesteld/), {
    target: { value },
  })
const amount = () => screen.queryByLabelText(/^Wat is het opgelegde bedrag/)

describe("the page to process a decision", () => {
  beforeEach(() => {
    createDecision.mockReset().mockResolvedValue({})
  })

  it("asks which decision, and the amount only for a sanction", () => {
    renderPage()

    expect(
      screen.getByRole("heading", { level: 1, name: "Resultaat besluit" }),
    ).toBeTruthy()
    expect(screen.getByText("Geen aanschrijving aanwezig")).toBeTruthy()
    expect(amount()).toBeNull()

    choose("2")
    expect(amount()).toBeTruthy()

    choose("3")
    expect(amount()).toBeNull()
  })

  it("only takes digits as the amount", async () => {
    renderPage()
    choose("2")
    submit()

    expect(
      await screen.findByRole("link", { name: "Vul het bedrag in." }),
    ).toBeTruthy()

    fireEvent.change(amount() as HTMLElement, { target: { value: "1.500" } })
    expect(
      await screen.findByRole("link", {
        name: "Vul alleen cijfers in, geen punten, komma's of tekens.",
      }),
    ).toBeTruthy()
    expect(createDecision).not.toHaveBeenCalled()
  })

  it("saves a sanction with its amount, and goes back to the case", async () => {
    renderPage()
    choose("2")
    fireEvent.change(amount() as HTMLElement, { target: { value: "1500" } })
    submit()

    await waitFor(() =>
      expect(createDecision).toHaveBeenCalledWith({
        case: 12,
        case_user_task_id: "34",
        decision_type: 2,
        sanction_amount: "1500",
      }),
    )
    await waitFor(() => expect(location().textContent).toBe("/zaken/12"))
    expect(screen.getByText("Het resultaat is verwerkt.")).toBeTruthy()
  })

  it("saves a decision without a sanction without an amount", async () => {
    renderPage()
    // An amount typed for another decision is not sent.
    choose("2")
    fireEvent.change(amount() as HTMLElement, { target: { value: "1500" } })
    choose("3")
    fireEvent.change(screen.getByLabelText(/^Korte toelichting/), {
      target: { value: "Zie het dossier." },
    })
    submit()

    await waitFor(() =>
      expect(createDecision).toHaveBeenCalledWith({
        case: 12,
        case_user_task_id: "34",
        decision_type: 3,
        sanction_amount: null,
        description: "Zie het dossier.",
      }),
    )
  })

  it("needs an explanation for the decision type that asks for one", async () => {
    renderPage()
    choose("9")
    submit()

    expect(
      await screen.findByRole("link", { name: "Vul een toelichting in." }),
    ).toBeTruthy()
    expect(createDecision).not.toHaveBeenCalled()

    fireEvent.change(screen.getByLabelText(/^Korte toelichting/), {
      target: { value: "Overtreding beëindigd." },
    })
    submit()

    await waitFor(() => expect(createDecision).toHaveBeenCalled())
    expect(createDecision.mock.calls[0][0]).toMatchObject({
      decision_type: 9,
      description: "Overtreding beëindigd.",
    })
  })

  it("stays on the form when saving fails", async () => {
    createDecision.mockRejectedValue(new Error("500"))
    renderPage()
    choose("3")
    submit()

    await waitFor(() => expect(createDecision).toHaveBeenCalled())
    expect(location().textContent).toBe("/zaken/12/besluit/34")
  })
})
