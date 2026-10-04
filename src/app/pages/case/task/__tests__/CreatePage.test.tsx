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
import FlashMessageProvider from "app/state/flashMessages/FlashMessageProvider"
import CreatePage from "../CreatePage"

const startWorkflowProcess = vi.fn()

vi.mock("@/api/hooks", () => ({
  useUsersMe: () => ({ data: { permissions: [] } }),
  useCase: () => ({
    data: {
      id: 12,
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
  useWorkflowProcesses: () => ({
    data: [
      { id: 3, name: "Huisbezoek inplannen" },
      { id: 4, name: "Debrief" },
    ],
  }),
  useStartWorkflowProcess: () => ({
    mutateAsync: startWorkflowProcess,
    isPending: false,
  }),
}))

vi.mock("react-oidc-context", () => ({
  useAuth: () => ({ signoutRedirect: vi.fn() }),
}))

vi.mock("app/state/auth/oidc/useDecodedToken", () => ({
  useDecodedToken: () => ({ given_name: "Jan" }),
}))

const Location = () => <output>{useLocation().pathname}</output>

const renderPage = () =>
  render(
    <MemoryRouter initialEntries={["/zaken/12/taak"]}>
      <FlashMessageProvider>
        <Routes>
          <Route path="/zaken/:id/taak" element={<CreatePage />} />
          <Route path="*" element={null} />
        </Routes>
        <Location />
      </FlashMessageProvider>
    </MemoryRouter>,
  )

const submit = () =>
  fireEvent.click(screen.getByRole("button", { name: "Taak opvoeren" }))

describe("the form to start a task on a case", () => {
  beforeEach(() => {
    startWorkflowProcess.mockReset()
    startWorkflowProcess.mockResolvedValue({})
  })

  it("says which case it is about", () => {
    renderPage()

    expect(
      screen.getByRole("heading", { level: 1, name: "Taak opvoeren" }),
    ).toBeTruthy()
    expect(screen.getByText("Amstel 1-H, 1011PN Amsterdam")).toBeTruthy()
    expect(screen.getByText("12")).toBeTruthy()
  })

  it("tells what is missing, in the form and in a summary, and doesn't save", async () => {
    renderPage()

    submit()

    const summaryHeading = await screen.findByRole("heading", {
      name: "Verbeter de fouten voor je verder gaat",
    })
    const summary = summaryHeading.closest(".ams-invalid-form-alert")
    expect(
      within(summary as HTMLElement).getByRole("link", {
        name: "Kies een taak.",
      }),
    ).toBeTruthy()
    expect(screen.getByLabelText(/^Taak/).getAttribute("aria-invalid")).toBe(
      "true",
    )
    expect(startWorkflowProcess).not.toHaveBeenCalled()
    expect(screen.getByRole("status").textContent).toBe("/zaken/12/taak")
  })

  it("saves right away, without a confirmation, and goes back to the case", async () => {
    renderPage()

    fireEvent.change(screen.getByLabelText(/^Taak/), { target: { value: "4" } })
    submit()

    await waitFor(() =>
      expect(startWorkflowProcess).toHaveBeenCalledWith({
        workflow_option_id: 4,
      }),
    )
    await waitFor(() =>
      expect(screen.getByRole("status").textContent).toBe("/zaken/12"),
    )
  })

  it("stays on the form when saving fails", async () => {
    startWorkflowProcess.mockRejectedValue(new Error("500"))
    renderPage()

    fireEvent.change(screen.getByLabelText(/^Taak/), { target: { value: "3" } })
    submit()

    await waitFor(() => expect(startWorkflowProcess).toHaveBeenCalled())
    expect(screen.getByRole("status").textContent).toBe("/zaken/12/taak")
  })

  it("goes back to the case with Annuleren", () => {
    renderPage()

    fireEvent.click(screen.getByRole("button", { name: "Annuleren" }))

    expect(screen.getByRole("status").textContent).toBe("/zaken/12")
  })
})
