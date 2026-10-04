// First, like the app does: the page imports the layout, which imports the
// routes, which import this page (circular).
import "app/routing/routes"
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react"
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom"
import { ToastProvider } from "@/components/toasts/ToastProvider"
import CreatePage from "../CreatePage"

const createDebriefing = vi.fn()
let themeName = "Vakantieverhuur"

vi.mock("@/api/hooks", () => ({
  useUsersMe: () => ({ data: { permissions: ["perform_task"] } }),
  useCase: () => ({
    data: {
      id: 12,
      theme: { id: 1, name: themeName },
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
  useViolationTypes: () => ({
    data: {
      results: [
        { id: 1, key: "NO", value: "Geen overtreding" },
        { id: 2, key: "YES", value: "Overtreding" },
        {
          id: 3,
          key: "SEND_TO_OTHER_THEME",
          value: "Naar ander thema",
        },
      ],
    },
  }),
  useCaseThemes: () => ({
    data: {
      results: [
        { id: 1, name: "Vakantieverhuur" },
        { id: 2, name: "Kamerverhuur" },
        { id: 3, name: "Goed verhuurderschap" },
      ],
    },
  }),
  useCreateDebriefing: () => ({
    mutateAsync: createDebriefing,
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
  window.history.pushState({}, "", "/zaken/12/debriefing/34")
  return render(
    <MemoryRouter initialEntries={["/zaken/12/debriefing/34"]}>
      <ToastProvider>
        <Routes>
          <Route
            path="/zaken/:id/debriefing/:caseUserTaskId"
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
  fireEvent.click(
    screen.getByRole("button", { name: "Terugkoppeling toevoegen" }),
  )
const location = () => screen.getByText(/^\/zaken/, { selector: "output" })
const explain = (text: string) =>
  fireEvent.change(screen.getByLabelText(/^Korte toelichting/), {
    target: { value: text },
  })

describe("the page to give the feedback of a debrief", () => {
  beforeEach(() => {
    themeName = "Vakantieverhuur"
    createDebriefing.mockReset().mockResolvedValue({})
  })

  it("asks the outcome of the visit", () => {
    renderPage()

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Debrief terugkoppeling geven",
      }),
    ).toBeTruthy()
    expect(screen.getByText("Wat is de uitkomst van het bezoek?")).toBeTruthy()
    expect(screen.getByLabelText("Geen overtreding")).toBeTruthy()
    // Only asked when the case goes to another theme.
    expect(screen.queryByLabelText(/^Naar welk thema overdragen/)).toBeNull()
  })

  it("asks the outcome of the debrief for Goed verhuurderschap, without nuisance", () => {
    themeName = "Goed verhuurderschap"
    renderPage()

    expect(
      screen.getByText("Wat is de uitkomst van het debriefen?"),
    ).toBeTruthy()
    // Nuisance is only asked for Vakantieverhuur.
    expect(screen.queryByLabelText(/^Overlast geconstateerd/)).toBeNull()
  })

  it("explains what to choose when the violation is not clear", () => {
    renderPage()

    fireEvent.click(
      screen.getByRole("button", {
        name: "Niet duidelijk of er een overtreding is?",
      }),
    )
    const dialog = within(screen.getByRole("dialog"))
    expect(dialog.getByText("Nader intern onderzoek nodig")).toBeTruthy()

    // Closing the explanation does not send the form.
    // (The close button in the heading of the dialog has the same name.)
    const closeButtons = dialog.getAllByRole("button", { name: "Sluiten" })
    fireEvent.click(closeButtons[closeButtons.length - 1])
    expect(screen.queryByRole("dialog")).toBeNull()
    expect(
      screen.queryByRole("link", { name: "Kies een uitkomst." }),
    ).toBeNull()
  })

  it("lists what is wrong when saved empty", async () => {
    renderPage()
    submit()

    expect(
      await screen.findByRole("link", { name: "Kies een uitkomst." }),
    ).toBeTruthy()
    expect(
      screen.getByRole("link", { name: "Vul een toelichting in." }),
    ).toBeTruthy()
    expect(createDebriefing).not.toHaveBeenCalled()
  })

  it("saves the outcome, with the nuisance, and goes back to the case", async () => {
    renderPage()

    fireEvent.click(screen.getByLabelText("Overtreding"))
    fireEvent.click(screen.getByLabelText(/^Overlast geconstateerd/))
    explain("Toeristen aangetroffen.")
    submit()

    await waitFor(() =>
      expect(createDebriefing).toHaveBeenCalledWith({
        case: 12,
        case_user_task_id: "34",
        violation: "YES",
        nuisance_detected: true,
        feedback: "Toeristen aangetroffen.",
      }),
    )
    await waitFor(() => expect(location().textContent).toBe("/zaken/12"))
    expect(screen.getByText("Het resultaat is verwerkt.")).toBeTruthy()
  })

  it("asks to which theme the case goes, without its own theme", async () => {
    renderPage()

    fireEvent.click(screen.getByLabelText("Naar ander thema"))
    const theme = screen.getByLabelText<HTMLSelectElement>(
      /^Naar welk thema overdragen/,
    )
    expect([...theme.options].map((option) => option.text)).toEqual([
      "Maak een keuze",
      "Goed verhuurderschap",
      "Kamerverhuur",
      "Woningverbetering",
    ])
    explain("Hoort bij kamerverhuur.")
    submit()

    expect(
      await screen.findByRole("link", { name: "Kies een thema." }),
    ).toBeTruthy()

    fireEvent.change(theme, { target: { value: "Kamerverhuur" } })
    submit()

    await waitFor(() =>
      expect(createDebriefing).toHaveBeenCalledWith({
        case: 12,
        case_user_task_id: "34",
        violation: "SEND_TO_OTHER_THEME",
        violation_result: { theme: "Kamerverhuur" },
        nuisance_detected: false,
        feedback: "Hoort bij kamerverhuur.",
      }),
    )
  })

  it("stays on the form when saving fails", async () => {
    createDebriefing.mockRejectedValue(new Error("500"))
    renderPage()

    fireEvent.click(screen.getByLabelText("Geen overtreding"))
    explain("Niets aangetroffen.")
    submit()

    await waitFor(() => expect(createDebriefing).toHaveBeenCalled())
    expect(location().textContent).toBe("/zaken/12/debriefing/34")
  })
})
