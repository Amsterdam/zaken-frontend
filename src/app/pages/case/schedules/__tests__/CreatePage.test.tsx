// First, like the app does: the page imports the layout, which imports the
// routes, which import this page (circular).
import "app/routing/routes"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import dayjs from "dayjs"
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom"
import { ToastProvider } from "@/components/toasts/ToastProvider"
import CreatePage from "../CreatePage"

const createSchedule = vi.fn()
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
  useScheduleTypes: () => ({
    data: {
      actions: [{ id: 5, name: "Huisbezoek" }],
      week_segments: [
        { id: 1, name: "Doordeweeks" },
        { id: 2, name: "Weekend" },
      ],
      day_segments: [
        { id: 1, name: "Overdag" },
        { id: 2, name: "Avond" },
      ],
      priorities: [
        { id: 1, name: "Normaal", weight: 0 },
        { id: 2, name: "Hoog", weight: 1 },
        { id: 3, name: "Machtiging", weight: 2 },
      ],
    },
  }),
  useCreateSchedule: () => ({ mutateAsync: createSchedule, isPending: false }),
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
  window.history.pushState({}, "", "/zaken/12/inplanning/34")
  return render(
    <MemoryRouter initialEntries={["/zaken/12/inplanning/34"]}>
      <ToastProvider>
        <Routes>
          <Route
            path="/zaken/:id/inplanning/:caseUserTaskId"
            element={<CreatePage />}
          />
          <Route path="*" element={null} />
        </Routes>
        <Location />
      </ToastProvider>
    </MemoryRouter>,
  )
}

const inDays = (days: number) => dayjs().add(days, "day").format("YYYY-MM-DD")
const submit = () =>
  fireEvent.click(screen.getByRole("button", { name: "Bezoek inplannen" }))
const location = () => screen.getByText(/^\/zaken/, { selector: "output" })
const select = (label: RegExp) =>
  screen.getByLabelText<HTMLSelectElement>(label)
const choose = (label: RegExp, value: string) =>
  fireEvent.change(select(label), { target: { value } })
const date = () =>
  screen.queryByLabelText<HTMLInputElement>(/^Vanaf welke datum/)

describe("the page to plan a visit", () => {
  beforeEach(() => {
    themeName = "Vakantieverhuur"
    createSchedule.mockReset().mockResolvedValue({})
  })

  it("starts empty, and lists what is wrong when saved so", async () => {
    renderPage()

    expect(
      screen.getByRole("heading", { level: 1, name: "Bezoek inplannen" }),
    ).toBeTruthy()
    expect(select(/^Op welke dagen/).value).toBe("")
    submit()

    for (const message of [
      "Kies de dagen.",
      "Kies een dagdeel.",
      "Kies vanaf wanneer het bezoek gelopen kan worden.",
      "Kies een urgentie.",
    ]) {
      expect(await screen.findByRole("link", { name: message })).toBeTruthy()
    }
    expect(createSchedule).not.toHaveBeenCalled()
  })

  it("plans a visit from today, and goes back to the case", async () => {
    renderPage()
    choose(/^Op welke dagen/, "2")
    choose(/^Tijdens welk dagdeel/, "2")
    fireEvent.click(screen.getByLabelText("Vanaf vandaag"))
    choose(/^Wat is de urgentie/, "2")
    submit()

    await waitFor(() =>
      expect(createSchedule).toHaveBeenCalledWith({
        case: 12,
        case_user_task_id: "34",
        // The kind of visit of the theme.
        action: 5,
        week_segment: 2,
        day_segment: 2,
        priority: 2,
        visit_from_datetime: null,
      }),
    )
    await waitFor(() => expect(location().textContent).toBe("/zaken/12"))
    expect(screen.getByText("Het resultaat is verwerkt.")).toBeTruthy()
  })

  it("plans a visit from a date, that starts on today", async () => {
    renderPage()
    choose(/^Op welke dagen/, "1")
    choose(/^Tijdens welk dagdeel/, "1")
    expect(date()).toBeNull()

    fireEvent.click(screen.getByLabelText("Vanaf een specifieke datum"))
    await waitFor(() => expect(date()?.value).toBe(inDays(0)))

    choose(/^Wat is de urgentie/, "1")
    fireEvent.change(date() as HTMLElement, { target: { value: inDays(-1) } })
    fireEvent.change(screen.getByLabelText(/^Korte toelichting/), {
      target: { value: "Bel eerst aan bij de buren." },
    })
    submit()

    expect(
      await screen.findByRole("link", {
        name: "Kies vandaag of een dag in de toekomst.",
      }),
    ).toBeTruthy()
    expect(createSchedule).not.toHaveBeenCalled()

    fireEvent.change(date() as HTMLElement, { target: { value: inDays(4) } })
    submit()

    await waitFor(() => expect(createSchedule).toHaveBeenCalled())
    expect(createSchedule.mock.calls[0][0]).toMatchObject({
      visit_from_datetime: dayjs(inDays(4)).format(),
      description: "Bel eerst aan bij de buren.",
    })
  })

  it("fills in the usual planning for a case of Ondermijning", async () => {
    themeName = "Ondermijning"
    renderPage()

    await waitFor(() => expect(select(/^Op welke dagen/).value).toBe("1"))
    expect(select(/^Tijdens welk dagdeel/).value).toBe("1")
    expect(select(/^Wat is de urgentie/).value).toBe("3")
    expect(
      screen.getByLabelText<HTMLInputElement>("Vanaf vandaag").checked,
    ).toBe(true)
    submit()

    await waitFor(() => expect(createSchedule).toHaveBeenCalled())
    expect(createSchedule.mock.calls[0][0]).toMatchObject({
      week_segment: 1,
      day_segment: 1,
      priority: 3,
      visit_from_datetime: null,
    })
  })

  it("stays on the form when saving fails", async () => {
    createSchedule.mockRejectedValue(new Error("500"))
    themeName = "Ondermijning"
    renderPage()
    await waitFor(() => expect(select(/^Op welke dagen/).value).toBe("1"))
    submit()

    await waitFor(() => expect(createSchedule).toHaveBeenCalled())
    expect(location().textContent).toBe("/zaken/12/inplanning/34")
  })
})
