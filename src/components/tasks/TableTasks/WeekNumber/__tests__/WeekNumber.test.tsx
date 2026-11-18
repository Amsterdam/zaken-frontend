import { fireEvent, render, screen } from "@testing-library/react"
import WeekNumber from "../WeekNumber"

const assignTaskWeek = vi.fn()
let mutation: { isPending: boolean; variables?: number | null } = {
  isPending: false,
}

vi.mock("@/api/hooks", () => ({
  useAssignTaskWeek: () => ({ mutate: assignTaskWeek, ...mutation }),
}))

vi.mock("@/components/tasks/weekNumbers", async (importOriginal) => {
  const actual =
    await importOriginal<typeof import("@/components/tasks/weekNumbers")>()
  return { ...actual, getCurrentIsoWeekNumber: () => 47 }
})

const openPicker = () =>
  fireEvent.click(screen.getByRole("button", { name: /Weeknummer voor taak 1/ }))

describe("WeekNumber", () => {
  beforeEach(() => {
    assignTaskWeek.mockClear()
    mutation = { isPending: false }
  })

  it("shows the week as text without permission to change it", () => {
    render(<WeekNumber canEdit={false} taskId={1} value={12} />)

    expect(screen.getByText("12")).toBeTruthy()
    expect(screen.queryByRole("button")).toBeNull()
  })

  it("shows the week as a button, without a list until it is clicked", () => {
    render(<WeekNumber canEdit taskId={1} value={null} />)

    const button = screen.getByRole("button", {
      name: "Weeknummer voor taak 1: geen week, wijzigen",
    })
    expect(button.textContent).toBe("-")
    expect(button.getAttribute("aria-expanded")).toBe("false")
    expect(screen.queryByRole("listbox")).toBeNull()
  })

  it("lists no week and then the weeks from the current week on", () => {
    render(<WeekNumber canEdit taskId={1} value={null} />)

    openPicker()

    const options = screen.getAllByRole("option")
    expect(options).toHaveLength(54)
    expect(options[0].textContent).toBe("Geen week")
    expect(options[1].textContent).toBe("Week 47 (deze week)")
    expect(options[2].textContent).toBe("Week 48")
  })

  it("saves the chosen week and closes the list", () => {
    render(<WeekNumber canEdit taskId={1} value={null} />)

    openPicker()
    fireEvent.click(screen.getByRole("option", { name: "Week 48" }))

    expect(assignTaskWeek).toHaveBeenCalledWith(48)
    expect(screen.queryByRole("listbox")).toBeNull()
  })

  it("removes the week", () => {
    render(<WeekNumber canEdit taskId={1} value={48} />)

    openPicker()
    fireEvent.click(screen.getByRole("option", { name: "Geen week" }))

    expect(assignTaskWeek).toHaveBeenCalledWith(null)
  })

  it("does not save when the same week is chosen", () => {
    render(<WeekNumber canEdit taskId={1} value={48} />)

    openPicker()
    fireEvent.click(screen.getByRole("option", { name: "Week 48" }))

    expect(assignTaskWeek).not.toHaveBeenCalled()
  })

  it("can be used with the keyboard", () => {
    render(<WeekNumber canEdit taskId={1} value={48} />)

    openPicker()
    const selected = screen.getByRole("option", { name: "Week 48" })
    expect(document.activeElement).toBe(selected)
    expect(selected.getAttribute("aria-selected")).toBe("true")

    fireEvent.keyDown(selected, { key: "ArrowDown" })
    fireEvent.keyDown(document.activeElement!, { key: "Enter" })

    expect(assignTaskWeek).toHaveBeenCalledWith(49)
    expect(document.activeElement).toBe(screen.getByRole("button"))
  })

  it("closes with Escape without saving", () => {
    render(<WeekNumber canEdit taskId={1} value={48} />)

    openPicker()
    fireEvent.keyDown(document.activeElement!, { key: "Escape" })

    expect(screen.queryByRole("listbox")).toBeNull()
    expect(assignTaskWeek).not.toHaveBeenCalled()
    expect(document.activeElement).toBe(screen.getByRole("button"))
  })

  it("closes on a click outside the list", () => {
    render(<WeekNumber canEdit taskId={1} value={48} />)

    openPicker()
    fireEvent.mouseDown(document.body)

    expect(screen.queryByRole("listbox")).toBeNull()
  })

  it("shows the chosen week while it is being saved", () => {
    mutation = { isPending: true, variables: 50 }
    render(<WeekNumber canEdit taskId={1} value={48} />)

    const button = screen.getByRole("button", {
      name: "Weeknummer voor taak 1: week 50, opslaan…",
    })
    expect(button.textContent).toBe("50")
    expect(button.getAttribute("aria-busy")).toBe("true")

    fireEvent.click(button)
    expect(screen.queryByRole("listbox")).toBeNull()
  })
})
