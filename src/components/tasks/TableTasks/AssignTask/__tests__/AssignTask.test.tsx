import { fireEvent, render, screen } from "@testing-library/react"
import AssignTask from "../AssignTask"

const assignTask = vi.fn()
let canAssignToOthers = true
const users = [
  { id: "me", first_name: "Jan", last_name: "Jansen", email: "jan@a.nl" },
  { id: "other", first_name: "Piet", last_name: "Pieters", email: "piet@a.nl" },
]

vi.mock("@/api/hooks", () => ({
  useAssignTask: () => ({ mutate: assignTask, isPending: false }),
  useUsersMe: () => ({ data: users[0], isLoading: false }),
  useUsers: () => ({ data: { results: users }, isLoading: false }),
}))

vi.mock("@/hooks/useHasPermission", () => ({
  default: (permissionsToCheck?: string[]) => {
    if (!permissionsToCheck || permissionsToCheck.length === 0) {
      return [true, false]
    }
    if (permissionsToCheck.includes("assign_task_to_others")) {
      return [canAssignToOthers, false]
    }
    return [true, false]
  },
  CAN_ASSIGN_TASK_TO_OTHERS: "assign_task_to_others",
  CAN_PERFORM_TASK: "perform_task",
}))

const openPicker = () =>
  fireEvent.click(screen.getByRole("button", { name: /klik om/ }))

describe("AssignTask", () => {
  beforeEach(() => {
    assignTask.mockClear()
    canAssignToOthers = true
  })

  it("assigns a task that has no owner right away", () => {
    render(<AssignTask taskId={1} taskOwner={null} />)

    openPicker()
    fireEvent.click(screen.getByText("Piet Pieters"))

    expect(assignTask).toHaveBeenCalledWith("other")
    expect(screen.queryByRole("dialog")).toBeNull()
  })

  it("asks to confirm before taking a task from someone else", () => {
    render(<AssignTask taskId={1} taskOwner="other" />)

    openPicker()
    fireEvent.click(screen.getByText(/Jan Jansen/))

    expect(assignTask).not.toHaveBeenCalled()
    expect(
      screen.getByRole("heading", { name: "Toewijzing wijzigen" }),
    ).toBeTruthy()

    fireEvent.click(screen.getByRole("button", { name: "Ja, toewijzen" }))

    expect(assignTask).toHaveBeenCalledWith("me")
    expect(screen.queryByRole("dialog")).toBeNull()
  })

  it("leaves the owner when you cancel", () => {
    render(<AssignTask taskId={1} taskOwner="other" />)

    openPicker()
    fireEvent.click(screen.getByText(/Jan Jansen/))
    fireEvent.click(screen.getByRole("button", { name: "Annuleren" }))

    expect(assignTask).not.toHaveBeenCalled()
    expect(screen.queryByRole("dialog")).toBeNull()
  })

  it("allows users without assign_task_to_others to assign a task only to themselves", () => {
    canAssignToOthers = false
    render(<AssignTask taskId={1} taskOwner={null} />)

    openPicker()
    fireEvent.click(screen.getByText("Piet Pieters"))
    expect(assignTask).not.toHaveBeenCalled()

    fireEvent.click(screen.getByText("Toewijzen aan mijzelf"))
    expect(assignTask).toHaveBeenCalledWith("me")
  })

  it("stays open when the page scrolls or the window resizes", () => {
    render(<AssignTask taskId={1} taskOwner={null} />)

    openPicker()
    fireEvent.scroll(document)
    fireEvent(window, new Event("resize"))

    expect(screen.getByRole("listbox")).toBeTruthy()
  })

  it("closes on a click outside the list", () => {
    render(<AssignTask taskId={1} taskOwner={null} />)

    openPicker()
    fireEvent.mouseDown(document.body)

    expect(screen.queryByRole("listbox")).toBeNull()
  })

  it("closes when the avatar is clicked again", () => {
    render(<AssignTask taskId={1} taskOwner={null} />)

    openPicker()
    openPicker()

    expect(screen.queryByRole("listbox")).toBeNull()
  })

  it("hides unassign option without assign_task_to_others", () => {
    canAssignToOthers = false
    render(<AssignTask taskId={1} taskOwner="other" />)

    openPicker()
    expect(screen.queryByText("Niet toegewezen")).toBeNull()
  })
})
