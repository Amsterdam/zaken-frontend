import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react"
import dayjs from "dayjs"
import { ToastProvider } from "@/components/toasts/ToastProvider"
import ChangeableDueDate from "../ChangebleDueDate"

const updateTask = vi.fn()
let hasPermission = true

vi.mock("@/api/hooks", () => ({
  useUpdateTask: () => ({ mutateAsync: updateTask, isPending: false }),
}))

vi.mock("@/hooks/useHasPermission", () => ({
  default: () => [hasPermission, false],
  CAN_PERFORM_TASK: "perform_task",
}))

const inDays = (days: number) => dayjs().add(days, "day")
const dueDate = `${inDays(3).format("YYYY-MM-DD")}T12:00:00+0200`

const renderDueDate = () =>
  render(
    <ToastProvider>
      <ChangeableDueDate caseId={12} caseUserTaskId="34" dueDate={dueDate} />
    </ToastProvider>,
  )

const open = () =>
  fireEvent.click(screen.getByRole("button", { name: "Pas de slotdatum aan" }))
const dialog = () => within(screen.getByRole("dialog"))
const field = () =>
  dialog().getByLabelText<HTMLInputElement>(/^Wat is de nieuwe slotdatum/)
// The button is off until the form is known to be valid.
const save = async () => {
  const button = dialog().getByRole<HTMLButtonElement>("button", {
    name: "Opslaan",
  })
  await waitFor(() => expect(button.disabled).toBe(false))
  fireEvent.click(button)
}
const saveButton = () =>
  dialog().getByRole<HTMLButtonElement>("button", { name: "Opslaan" })

describe("the due date of a task", () => {
  beforeEach(() => {
    hasPermission = true
    updateTask.mockReset().mockResolvedValue({})
  })

  it("is only a date without the permission to perform tasks", () => {
    hasPermission = false
    renderDueDate()

    expect(screen.getByText(inDays(3).format("DD-MM-YYYY"))).toBeTruthy()
    expect(screen.queryByRole("button")).toBeNull()
  })

  it("changes in a dialog, with a toast when it worked", async () => {
    renderDueDate()
    open()

    // The current due date is filled in.
    expect(field().value).toBe(inDays(3).format("YYYY-MM-DD"))
    fireEvent.change(field(), {
      target: { value: inDays(10).format("YYYY-MM-DD") },
    })
    await save()

    await waitFor(() =>
      expect(updateTask).toHaveBeenCalledWith({
        due_date: `${inDays(10).format("YYYY-MM-DD")}T12:00:00+0200`,
      }),
    )
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull())
    expect(screen.getByText("Slotdatum gewijzigd")).toBeTruthy()
    expect(
      screen.getByText(inDays(10).format("DD-MM-YYYY"), { selector: "strong" }),
    ).toBeTruthy()
  })

  it("saves nothing when the date stays the same", async () => {
    renderDueDate()
    open()
    await save()

    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull())
    expect(updateTask).not.toHaveBeenCalled()
  })

  it("asks for a date that is not in the past", async () => {
    renderDueDate()
    open()

    await waitFor(() => expect(saveButton().disabled).toBe(false))

    // What is wrong is said while you fill it in; saving is off.
    fireEvent.change(field(), { target: { value: "" } })
    expect(await dialog().findByText("Vul een datum in.")).toBeTruthy()
    await waitFor(() => expect(saveButton().disabled).toBe(true))

    fireEvent.change(field(), {
      target: { value: inDays(-1).format("YYYY-MM-DD") },
    })
    expect(
      await dialog().findByText(
        "De slotdatum kan niet in het verleden liggen.",
      ),
    ).toBeTruthy()
    await waitFor(() => expect(saveButton().disabled).toBe(true))

    fireEvent.change(field(), {
      target: { value: inDays(1).format("YYYY-MM-DD") },
    })
    await waitFor(() => expect(saveButton().disabled).toBe(false))
    expect(updateTask).not.toHaveBeenCalled()
  })

  it("keeps the dialog open when saving fails", async () => {
    updateTask.mockRejectedValue(new Error("500"))
    renderDueDate()
    open()

    fireEvent.change(field(), {
      target: { value: inDays(10).format("YYYY-MM-DD") },
    })
    await save()

    await waitFor(() => expect(updateTask).toHaveBeenCalled())
    expect(screen.getByRole("dialog")).toBeTruthy()
    expect(screen.queryByText("Slotdatum gewijzigd")).toBeNull()
  })
})
