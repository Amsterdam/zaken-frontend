import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react"
import dayjs from "dayjs"
import { ToastProvider } from "@/components/toasts/ToastProvider"
import UpdateSchedule from "../UpdateSchedule"

const updateSchedule = vi.fn()
let hasPermission = true
let visitFrom: string | null = null

vi.mock("@/api/hooks", () => ({
  useSchedulesByCaseId: () => ({
    data: [
      {
        id: 1,
        week_segment: 2,
        day_segment: 1,
        priority: { id: 1, name: "Normaal" },
        visit_from_datetime: null,
        date_modified: "2026-01-01T10:00:00+0200",
      },
      // The latest planning is the one that counts.
      {
        id: 2,
        week_segment: 1,
        day_segment: 2,
        priority: { id: 2, name: "Hoog" },
        visit_from_datetime: visitFrom,
        date_modified: "2026-02-01T10:00:00+0200",
      },
    ],
  }),
  useScheduleTypes: () => ({
    data: {
      actions: [],
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
      ],
    },
  }),
  useUpdateSchedule: () => ({ mutateAsync: updateSchedule, isPending: false }),
}))

vi.mock("@/hooks/useHasPermission", () => ({
  default: () => [hasPermission, false],
  CAN_PERFORM_TASK: "perform_task",
}))

const inDays = (days: number) => dayjs().add(days, "day").format("YYYY-MM-DD")

const renderSchedule = () =>
  render(
    <ToastProvider>
      <UpdateSchedule caseId={12} themeId={1} />
    </ToastProvider>,
  )

const open = () =>
  fireEvent.click(
    screen.getByRole("button", { name: "Pas de planning van het bezoek aan" }),
  )
const dialog = () => within(screen.getByRole("dialog"))
const select = (label: RegExp) =>
  dialog().getByLabelText<HTMLSelectElement>(label)
const saveButton = () =>
  dialog().getByRole<HTMLButtonElement>("button", { name: "Opslaan" })
// The button is off until the form is known to be valid.
const save = async () => {
  await waitFor(() => expect(saveButton().disabled).toBe(false))
  fireEvent.click(saveButton())
}

describe("the urgency of the visit of a case", () => {
  beforeEach(() => {
    hasPermission = true
    visitFrom = null
    updateSchedule.mockReset().mockResolvedValue({})
  })

  it("is only the urgency without the permission to perform tasks", () => {
    hasPermission = false
    renderSchedule()

    expect(screen.getByText("Hoog")).toBeTruthy()
    expect(screen.queryByRole("button")).toBeNull()
  })

  it("changes the planning in a dialog, with a toast when it worked", async () => {
    renderSchedule()
    open()

    // The current planning is filled in; the urgency comes first.
    expect(
      dialog()
        .getAllByRole("combobox")
        .map(({ id }) => id),
    ).toEqual(["priority", "week_segment", "day_segment"])
    expect(select(/^Wat is de urgentie/).className).toContain("select")
    expect(select(/^Op welke dagen/).value).toBe("1")
    expect(select(/^Tijdens welk dagdeel/).value).toBe("2")
    expect(select(/^Wat is de urgentie/).value).toBe("2")
    expect(
      dialog().getByLabelText<HTMLInputElement>("Vanaf vandaag").checked,
    ).toBe(true)
    expect(dialog().queryByLabelText(/^Vanaf welke datum/)).toBeNull()

    fireEvent.change(select(/^Op welke dagen/), { target: { value: "2" } })
    fireEvent.change(select(/^Wat is de urgentie/), { target: { value: "1" } })
    await save()

    await waitFor(() =>
      expect(updateSchedule).toHaveBeenCalledWith({
        week_segment: { id: 2, name: "Weekend" },
        day_segment: { id: 2, name: "Avond" },
        priority: { id: 1, name: "Normaal", weight: 0 },
        visit_from_datetime: null,
      }),
    )
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull())
    expect(screen.getByText("Planning gewijzigd")).toBeTruthy()
    expect(screen.getByText("Normaal", { selector: "strong" })).toBeTruthy()
  })

  it("asks for a date when the visit is from a specific date", async () => {
    renderSchedule()
    open()
    await waitFor(() => expect(saveButton().disabled).toBe(false))

    fireEvent.click(dialog().getByLabelText("Vanaf een specifieke datum"))
    const date =
      await dialog().findByLabelText<HTMLInputElement>(/^Vanaf welke datum/)
    // Today is filled in, so there is something to save right away.
    expect(date.value).toBe(inDays(0))
    await waitFor(() => expect(saveButton().disabled).toBe(false))

    fireEvent.change(date, { target: { value: "" } })
    expect(await dialog().findByText("Vul een datum in.")).toBeTruthy()
    await waitFor(() => expect(saveButton().disabled).toBe(true))

    fireEvent.change(date, { target: { value: inDays(-1) } })
    expect(
      await dialog().findByText("Kies vandaag of een dag in de toekomst."),
    ).toBeTruthy()
    expect(saveButton().disabled).toBe(true)

    fireEvent.change(date, { target: { value: inDays(5) } })
    await save()

    await waitFor(() => expect(updateSchedule).toHaveBeenCalled())
    expect(updateSchedule.mock.calls[0][0].visit_from_datetime).toBe(
      dayjs(inDays(5)).format(),
    )
  })

  it("shows the date of the current planning, and can go back to today", async () => {
    visitFrom = `${inDays(5)}T00:00:00+02:00`
    renderSchedule()
    open()

    expect(
      dialog().getByLabelText<HTMLInputElement>(/^Vanaf welke datum/).value,
    ).toBe(dayjs(visitFrom).format("YYYY-MM-DD"))

    fireEvent.click(dialog().getByLabelText("Vanaf vandaag"))
    await save()

    await waitFor(() => expect(updateSchedule).toHaveBeenCalled())
    expect(updateSchedule.mock.calls[0][0].visit_from_datetime).toBeNull()
    // The urgency stayed the same: the toast does not name it.
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull())
    expect(
      screen.getByText("De planning van het bezoek is aangepast."),
    ).toBeTruthy()
  })

  it("keeps the dialog open when saving fails", async () => {
    updateSchedule.mockRejectedValue(new Error("500"))
    renderSchedule()
    open()
    await save()

    await waitFor(() => expect(updateSchedule).toHaveBeenCalled())
    expect(screen.getByRole("dialog")).toBeTruthy()
    expect(screen.queryByText("Planning gewijzigd")).toBeNull()
  })
})
