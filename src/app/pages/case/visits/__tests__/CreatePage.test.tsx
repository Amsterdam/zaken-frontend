// First, like the app does: the page imports the layout, which imports the
// routes, which import this page (circular).
import "@/router/routes"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { MemoryRouter, Route, Routes, useLocation } from "react-router"
import { ToastProvider } from "@/components/toasts/ToastProvider"
import CreatePage from "../CreatePage"

const createVisit = vi.fn()

vi.mock("@/api/hooks", () => ({
  useUsersMe: () => ({ data: { permissions: ["perform_task"] } }),
  useCase: () => ({
    data: {
      id: 12,
      theme: { id: 1, name: "Vakantieverhuur" },
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
  useUsers: () => ({
    data: {
      results: [
        { id: "a1", full_name: "Anna Bakker" },
        { id: "b2", full_name: "Bram de Wit" },
      ],
    },
  }),
  useCreateVisit: () => ({ mutateAsync: createVisit, isPending: false }),
}))

vi.mock("@/hooks/useHasPermission", () => ({ default: () => [true, false] }))

vi.mock("react-oidc-context", () => ({
  useAuth: () => ({ signoutRedirect: vi.fn() }),
}))

vi.mock("@/app/state/auth/oidc/useDecodedToken", () => ({
  useDecodedToken: () => ({ given_name: "Jan" }),
}))

const Location = () => <output>{useLocation().pathname}</output>

const renderPage = () => {
  // The breadcrumbs read the path from window.location.
  window.history.pushState({}, "", "/zaken/12/huisbezoek/34")
  return render(
    <MemoryRouter initialEntries={["/zaken/12/huisbezoek/34"]}>
      <ToastProvider>
        <Routes>
          <Route
            path="/zaken/:id/huisbezoek/:caseUserTaskId"
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
  fireEvent.click(screen.getByRole("button", { name: "Toevoegen" }))
const location = () => screen.getByText(/^\/zaken/, { selector: "output" })
const type = (label: RegExp, value: string) =>
  fireEvent.change(screen.getByLabelText(label), { target: { value } })

describe("the page to add the result of a visit by hand", () => {
  beforeEach(() => {
    createVisit.mockReset().mockResolvedValue({})
  })

  it("warns not to use it, and starts at the current time", () => {
    renderPage()

    expect(
      screen.getByRole("heading", { level: 1, name: "Resultaat bezoek" }),
    ).toBeTruthy()
    expect(
      screen.getByRole("heading", { name: "Dit formulier niet gebruiken" }),
    ).toBeTruthy()
    expect(
      screen.getByLabelText<HTMLInputElement>(/^Starttijd onderzoek/).value,
    ).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)
  })

  it("needs two different inspectors and the situation", async () => {
    renderPage()
    submit()

    for (const message of [
      "Kies toezichthouder 1.",
      "Kies toezichthouder 2.",
      "Kies een situatie.",
    ]) {
      expect(await screen.findByRole("link", { name: message })).toBeTruthy()
    }

    type(/^Toezichthouder 1/, "a1")
    type(/^Toezichthouder 2/, "a1")
    expect(
      await screen.findByRole("link", {
        name: "Kies twee verschillende toezichthouders.",
      }),
    ).toBeTruthy()
    expect(createVisit).not.toHaveBeenCalled()
  })

  it("saves only what is filled in, and goes back to the case", async () => {
    renderPage()
    type(/^Toezichthouder 1/, "a1")
    type(/^Toezichthouder 2/, "b2")
    type(/^Starttijd onderzoek/, "2026-10-04T14:30")
    fireEvent.click(screen.getByLabelText("Niemand aanwezig"))
    submit()

    await waitFor(() =>
      expect(createVisit).toHaveBeenCalledWith({
        case: 12,
        task: "34",
        top_visit_id: 42,
        completed: true,
        author_ids: ["a1", "b2"],
        start_time: "2026-10-04T14:30",
        situation: "nobody_present",
        observations: [],
      }),
    )
    await waitFor(() => expect(location().textContent).toBe("/zaken/12"))
    expect(screen.getByText("Het resultaat is verwerkt.")).toBeTruthy()
  })

  it("saves a whole visit", async () => {
    renderPage()
    type(/^Toezichthouder 1/, "a1")
    type(/^Toezichthouder 2/, "b2")
    type(/^Starttijd onderzoek/, "2026-10-04T14:30")
    fireEvent.click(screen.getByLabelText("Toegang verleend"))
    fireEvent.click(screen.getByLabelText("Hotelmatig ingericht"))
    fireEvent.click(screen.getByLabelText("Leegstand"))
    fireEvent.click(screen.getByLabelText("Nee, tegenhouden"))
    type(/^Toelichting bij het uitzetten/, "Eerst overleg.")
    fireEvent.click(screen.getByLabelText("Weekend"))
    type(/^Toelichting bij de suggestie/, "Zaterdagochtend.")
    type(/^Opmerkingen/, "Koffers in de gang.")
    submit()

    await waitFor(() =>
      expect(createVisit).toHaveBeenCalledWith({
        case: 12,
        task: "34",
        top_visit_id: 42,
        completed: true,
        author_ids: ["a1", "b2"],
        start_time: "2026-10-04T14:30",
        situation: "access_granted",
        observations: ["hotel_furnished", "vacant"],
        can_next_visit_go_ahead: false,
        can_next_visit_go_ahead_description: "Eerst overleg.",
        suggest_next_visit: "weekend",
        suggest_next_visit_description: "Zaterdagochtend.",
        notes: "Koffers in de gang.",
      }),
    )
  })

  it("stays on the form when saving fails", async () => {
    createVisit.mockRejectedValue(new Error("500"))
    renderPage()
    type(/^Toezichthouder 1/, "a1")
    type(/^Toezichthouder 2/, "b2")
    fireEvent.click(screen.getByLabelText("Niemand aanwezig"))
    submit()

    await waitFor(() => expect(createVisit).toHaveBeenCalled())
    expect(location().textContent).toBe("/zaken/12/huisbezoek/34")
  })
})
