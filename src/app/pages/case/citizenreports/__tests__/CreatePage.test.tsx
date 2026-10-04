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

const createCitizenReport = vi.fn()
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
  useCreateCitizenReport: () => ({
    mutateAsync: createCitizenReport,
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
  window.history.pushState({}, "", "/zaken/12/melding/34")
  return render(
    <MemoryRouter initialEntries={["/zaken/12/melding/34"]}>
      <ToastProvider>
        <Routes>
          <Route
            path="/zaken/:id/melding/:caseUserTaskId"
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
const type = (label: RegExp, value: string) =>
  fireEvent.change(screen.getByLabelText(label), { target: { value } })
const fillRequired = () => {
  type(/^SIG-nummer/, "123456")
  type(/^Korte samenvatting melding/, "Toeristen met koffers.")
}

describe("the page to process a report of a citizen", () => {
  beforeEach(() => {
    themeName = "Vakantieverhuur"
    createCitizenReport.mockReset().mockResolvedValue({})
  })

  it("lists what is wrong when saved empty", async () => {
    renderPage()

    expect(
      screen.getByRole("heading", { level: 1, name: "Melding verwerken" }),
    ).toBeTruthy()
    submit()

    for (const message of [
      "Kies of de melder anoniem is.",
      "Vul het SIG-nummer in.",
      "Vul een samenvatting van de melding in.",
      "Kies of er een advertentie bekend is.",
    ]) {
      expect(await screen.findByRole("link", { name: message })).toBeTruthy()
    }
    expect(createCitizenReport).not.toHaveBeenCalled()
  })

  it("saves an anonymous report without an advertisement", async () => {
    renderPage()
    fireEvent.click(screen.getByLabelText("Ja, de melder is anoniem"))
    // Nothing to fill in about an anonymous reporter.
    expect(screen.queryByLabelText(/^Naam melder/)).toBeNull()
    fillRequired()
    fireEvent.click(screen.getByLabelText("Nee, er is geen advertentie"))
    submit()

    await waitFor(() =>
      expect(createCitizenReport).toHaveBeenCalledWith({
        case: 12,
        case_user_task_id: "34",
        identification: 123456,
        description_citizenreport: "Toeristen met koffers.",
        nuisance: false,
      }),
    )
    await waitFor(() => expect(location().textContent).toBe("/zaken/12"))
    expect(screen.getByText("Het resultaat is verwerkt.")).toBeTruthy()
  })

  it("saves who reported it, the nuisance and the advertisements", async () => {
    renderPage()
    fireEvent.click(screen.getByLabelText("Nee, de melder is niet anoniem"))
    type(/^Naam melder/, "Mevrouw Jansen")
    type(/^Telefoonnummer melder/, "06123")
    type(/^E-mailadres melder/, "jansen")
    fillRequired()
    fireEvent.click(screen.getByLabelText(/^Betreft overlast/))
    fireEvent.click(screen.getByLabelText("Ja, er is een advertentie"))
    type(/^Link 1/, "airbnb.nl/rooms/1")
    submit()

    // What is filled in wrong, is said.
    for (const message of [
      "Gebruik 10 cijfers zonder spaties of streepjes",
      "Vul een geldig e-mailadres in.",
      "Link 1 is geen geldige url.",
    ]) {
      expect(await screen.findByRole("link", { name: message })).toBeTruthy()
    }
    expect(createCitizenReport).not.toHaveBeenCalled()

    type(/^Telefoonnummer melder/, "0612345678")
    type(/^E-mailadres melder/, "jansen@example.nl")
    type(/^Link 1/, "https://www.airbnb.nl/rooms/1")
    fireEvent.click(screen.getByRole("button", { name: "Link toevoegen" }))
    type(/^Link 2/, "https://www.booking.com/hotel/2")
    submit()

    await waitFor(() =>
      expect(createCitizenReport).toHaveBeenCalledWith({
        case: 12,
        case_user_task_id: "34",
        reporter_name: "Mevrouw Jansen",
        reporter_phone: "0612345678",
        reporter_email: "jansen@example.nl",
        identification: 123456,
        description_citizenreport: "Toeristen met koffers.",
        nuisance: true,
        advertisements: [
          { link: "https://www.airbnb.nl/rooms/1" },
          { link: "https://www.booking.com/hotel/2" },
        ],
      }),
    )
  })

  it("can take a link away again, but not the only one", () => {
    renderPage()
    fireEvent.click(screen.getByLabelText("Ja, er is een advertentie"))
    const links = () =>
      within(screen.getByRole("group", { name: "Link(s) naar de advertentie" }))

    expect(links().queryByRole("button", { name: /verwijderen$/ })).toBeNull()

    fireEvent.click(links().getByRole("button", { name: "Link toevoegen" }))
    type(/^Link 2/, "https://www.booking.com/hotel/2")
    fireEvent.click(links().getByRole("button", { name: "Link 1 verwijderen" }))

    expect(links().queryByLabelText(/^Link 2/)).toBeNull()
    expect(links().getByLabelText<HTMLInputElement>(/^Link 1/).value).toBe(
      "https://www.booking.com/hotel/2",
    )
  })

  it("asks no advertisement or nuisance for a theme without them", async () => {
    themeName = "Kamerverhuur"
    renderPage()

    expect(screen.queryByText("Is er een advertentie bekend?")).toBeNull()
    expect(screen.queryByLabelText(/^Betreft overlast/)).toBeNull()

    fireEvent.click(screen.getByLabelText("Ja, de melder is anoniem"))
    fillRequired()
    submit()

    await waitFor(() => expect(createCitizenReport).toHaveBeenCalled())
  })

  it("stays on the form when saving fails", async () => {
    createCitizenReport.mockRejectedValue(new Error("500"))
    themeName = "Kamerverhuur"
    renderPage()
    fireEvent.click(screen.getByLabelText("Ja, de melder is anoniem"))
    fillRequired()
    submit()

    await waitFor(() => expect(createCitizenReport).toHaveBeenCalled())
    expect(location().textContent).toBe("/zaken/12/melding/34")
  })
})
