// First, like the app does: the page imports the layout, which imports the
// routes, which import this page (circular).
import "app/routing/routes"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom"
import { ToastProvider } from "@/components/toasts/ToastProvider"
import FlashMessageProvider from "app/state/flashMessages/FlashMessageProvider"
import CreatePage from "../CreatePage"

const createQuickDecision = vi.fn()
let summons: unknown[] = []

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
      workflows: [
        {
          tasks: [
            {
              case_user_task_id: 34,
              form_variables: { summon_id: { value: 5 } },
            },
          ],
        },
      ],
    },
    isLoading: false,
  }),
  useQuickDecisionTypes: () => ({
    data: {
      results: [
        { id: 2, name: "Afzien voornemen" },
        { id: 3, name: "Boete" },
      ],
    },
  }),
  useSummonsByCaseId: () => ({
    data: { results: summons },
    isLoading: false,
  }),
  useCreateQuickDecision: () => ({
    mutateAsync: createQuickDecision,
    isPending: false,
  }),
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
  window.history.pushState({}, "", "/zaken/12/snel-besluit/34")
  return render(
    <MemoryRouter initialEntries={["/zaken/12/snel-besluit/34"]}>
      <FlashMessageProvider>
        <ToastProvider>
          <Routes>
            <Route
              path="/zaken/:id/snel-besluit/:caseUserTaskId"
              element={<CreatePage />}
            />
            <Route path="*" element={null} />
          </Routes>
          <Location />
        </ToastProvider>
      </FlashMessageProvider>
    </MemoryRouter>,
  )
}

const submit = () =>
  fireEvent.click(screen.getByRole("button", { name: "Resultaat verwerken" }))
const location = () => screen.getByText(/^\/zaken/, { selector: "output" })

describe("the page to process a quick decision", () => {
  beforeEach(() => {
    createQuickDecision.mockReset().mockResolvedValue({})
    summons = [
      {
        id: 5,
        type_name: "Voornemen boete",
        persons: [
          {
            first_name: "Jan",
            preposition: "de",
            last_name: "Vries",
            person_role: "PERSON_ROLE_OWNER",
          },
        ],
      },
    ]
  })

  it("shows which case and which summon the decision is about", () => {
    renderPage()

    expect(
      screen.getByRole("heading", { level: 1, name: "Resultaat besluit" }),
    ).toBeTruthy()
    expect(screen.getByText("Amstel 1-H, 1011PN Amsterdam")).toBeTruthy()
    expect(screen.getByText("Voornemen boete")).toBeTruthy()
    expect(screen.getByText(/^Jan de Vries/)).toBeTruthy()
  })

  it("says so when there is no summon", () => {
    summons = []
    renderPage()

    expect(screen.getByText("Geen aanschrijving aanwezig")).toBeTruthy()
  })

  it("lists what is wrong when saved without a decision", async () => {
    renderPage()
    submit()

    // Above the form, with a link to the field, and at the field itself.
    const link = await screen.findByRole("link", { name: "Kies een besluit." })
    expect(link.getAttribute("href")).toBe("#quick_decision_type")
    // The list is above the white area with the form, not inside the form.
    expect(link.closest("form")).toBeNull()
    expect(screen.getAllByText("Kies een besluit.")).toHaveLength(2)
    expect(createQuickDecision).not.toHaveBeenCalled()
  })

  it("saves directly, and goes back to the case with a toast", async () => {
    renderPage()

    fireEvent.change(screen.getByLabelText(/^Welk besluit is opgesteld/), {
      target: { value: "3" },
    })
    submit()

    // Without an explanation the field is left out.
    await waitFor(() =>
      expect(createQuickDecision).toHaveBeenCalledWith({
        case: 12,
        case_user_task_id: "34",
        quick_decision_type: 3,
      }),
    )
    await waitFor(() => expect(location().textContent).toBe("/zaken/12"))
    expect(screen.getByText("Het resultaat is verwerkt.")).toBeTruthy()
  })

  it("sends the explanation when there is one", async () => {
    renderPage()

    fireEvent.change(screen.getByLabelText(/^Welk besluit is opgesteld/), {
      target: { value: "2" },
    })
    fireEvent.change(screen.getByLabelText(/^Korte toelichting/), {
      target: { value: "In overleg." },
    })
    submit()

    await waitFor(() =>
      expect(createQuickDecision).toHaveBeenCalledWith({
        case: 12,
        case_user_task_id: "34",
        quick_decision_type: 2,
        description: "In overleg.",
      }),
    )
  })

  it("stays on the form when saving fails", async () => {
    createQuickDecision.mockRejectedValue(new Error("500"))
    renderPage()

    fireEvent.change(screen.getByLabelText(/^Welk besluit is opgesteld/), {
      target: { value: "3" },
    })
    submit()

    await waitFor(() => expect(createQuickDecision).toHaveBeenCalled())
    expect(location().textContent).toBe("/zaken/12/snel-besluit/34")
    expect(screen.queryByText("Het resultaat is verwerkt.")).toBeNull()
  })

  it("goes back to the case with Annuleren", () => {
    renderPage()

    fireEvent.click(screen.getByRole("button", { name: "Annuleren" }))

    expect(location().textContent).toBe("/zaken/12")
    expect(createQuickDecision).not.toHaveBeenCalled()
  })
})
