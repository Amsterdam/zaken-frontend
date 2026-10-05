import { fireEvent, render, screen } from "@testing-library/react"
import AssignTask from "../AssignTask"

const assignTask = vi.fn()
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
  default: () => [true, false],
  CAN_PERFORM_TASK: "perform_task",
}))

const openPicker = () =>
  fireEvent.click(screen.getByRole("button", { name: /klik om/ }))

describe("AssignTask", () => {
  beforeEach(() => assignTask.mockClear())

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
})
