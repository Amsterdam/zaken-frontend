import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react"
import { ToastProvider } from "@/components/toasts/ToastProvider"
import SkipVisitButton from "../SkipVisitButton"
import { canSkipVisit, getSkipReasonLabel } from "../skipVisit"

const onSubmit = vi.fn()

const situation = (...values: string[]): Tasks.FormField => ({
  label: "Wat is de situatie?",
  name: "situation",
  type: "select",
  options: values.map((value) => ({ label: value, value })),
})

const reason: Tasks.FormField = {
  label: "Reden overslaan huisbezoek",
  name: "visit_skipped_reason",
  type: "text",
  required: false,
}

const renderButton = (disabled = false) =>
  render(
    <ToastProvider>
      <SkipVisitButton
        taskName="Doorgeven Huisbezoek TOP"
        reasonLabel="Reden overslaan huisbezoek"
        onSubmit={onSubmit}
        disabled={disabled}
      />
    </ToastProvider>,
  )

const button = () =>
  screen.getByRole<HTMLButtonElement>("button", {
    name: "Bezoek overslaan: Doorgeven Huisbezoek TOP",
  })
const dialog = () => within(screen.getByRole("dialog"))
const submitButton = () =>
  dialog().getByRole<HTMLButtonElement>("button", { name: "Bezoek overslaan" })
const fillInReason = (value: string) =>
  fireEvent.change(dialog().getByLabelText(/^Reden overslaan huisbezoek/), {
    target: { value },
  })

describe("whether a visit can be skipped", () => {
  it("can when the workflow of the visit has a route for it", () => {
    expect(
      canSkipVisit({
        task_name: "task_create_visit",
        form: [situation("access_granted", "visit_skipped"), reason],
      }),
    ).toBe(true)
  })

  it("can't for an older workflow or another theme", () => {
    expect(
      canSkipVisit({
        task_name: "task_create_visit",
        form: [situation("nobody_present", "access_granted")],
      }),
    ).toBe(false)
    expect(canSkipVisit({ task_name: "task_create_visit", form: [] })).toBe(
      false,
    )
  })

  it("can't for another task", () => {
    expect(
      canSkipVisit({
        task_name: "task_create_debrief",
        form: [situation("visit_skipped")],
      }),
    ).toBe(false)
  })

  it("calls the reason what the backend calls it", () => {
    expect(getSkipReasonLabel([{ ...reason, label: "Waarom niet?" }])).toBe(
      "Waarom niet?",
    )
    expect(getSkipReasonLabel([])).toBe("Reden overslaan huisbezoek")
  })
})

describe("skipping a visit", () => {
  beforeEach(() => {
    onSubmit.mockReset().mockResolvedValue("ok")
  })

  it("can't be done without the permission", () => {
    renderButton(true)

    expect(button().disabled).toBe(true)
  })

  it("asks for a reason, and sends it", async () => {
    renderButton()
    fireEvent.click(button())

    // Without a reason there is nothing to send, spaces don't count.
    expect(submitButton().disabled).toBe(true)
    fillInReason("   ")
    await waitFor(() =>
      expect(dialog().getByText("Vul een reden in.")).toBeTruthy(),
    )
    expect(submitButton().disabled).toBe(true)

    fillInReason(" De politie is al ter plaatse geweest. ")
    await waitFor(() => expect(submitButton().disabled).toBe(false))
    fireEvent.click(submitButton())

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({
        situation: { value: "visit_skipped" },
        visit_skipped_reason: {
          value: "De politie is al ter plaatse geweest.",
        },
      }),
    )
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull())
    expect(screen.getByText("Bezoek overgeslagen")).toBeTruthy()
  })

  it("stays open when skipping fails, and closes with Annuleren", async () => {
    onSubmit.mockRejectedValue(new Error("400"))
    renderButton()
    fireEvent.click(button())

    fillInReason("Niet meer nodig.")
    await waitFor(() => expect(submitButton().disabled).toBe(false))
    fireEvent.click(submitButton())

    await waitFor(() => expect(onSubmit).toHaveBeenCalled())
    await waitFor(() => expect(submitButton().disabled).toBe(false))
    expect(screen.queryByText("Bezoek overgeslagen")).toBeNull()

    fireEvent.click(dialog().getByRole("button", { name: "Annuleren" }))
    expect(screen.queryByRole("dialog")).toBeNull()
  })
})
