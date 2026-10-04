import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { ToastProvider } from "@/components/toasts/ToastProvider"
import CaseStatus from "../CaseStatus"

const startWorkflowProcess = vi.fn()
const refreshWorkflowsSoon = vi.fn()
let permissions: string[] = []
let workflows: unknown[] = []

vi.mock("@/api/hooks", () => ({
  useCase: () => ({ data: { id: 12, end_date: null, theme: { id: 1 } } }),
  useCaseWorkflows: () => ({
    data: { results: workflows },
    isLoading: false,
    isPolling: false,
    refetch: vi.fn(),
  }),
  useCompleteTask: () => ({ mutateAsync: vi.fn() }),
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
  useRefreshCaseWorkflowsSoon: () => refreshWorkflowsSoon,
}))

vi.mock("@/hooks/useHasPermission", () => ({
  default: (names: string[]) => [
    names.every((name) => permissions.includes(name)),
    false,
  ],
  CAN_PERFORM_TASK: "perform_task",
}))

// The cells with their own data and dialogs have their own tests.
vi.mock("app/components/tasks/TableTasks/AssignTask/AssignTask", () => ({
  default: () => <span>avatar</span>,
}))
vi.mock("app/components/case/tasks/ChangeDueDate/ChangebleDueDate", () => ({
  default: ({ dueDate }: { dueDate: string }) => <span>{dueDate}</span>,
}))
vi.mock("app/components/case/tasks/CompleteTask/CompleteTaskDialog", () => ({
  default: () => null,
}))

const renderStatus = () =>
  render(
    <MemoryRouter initialEntries={["/zaken/12"]}>
      <ToastProvider>
        <CaseStatus id={12} />
      </ToastProvider>
    </MemoryRouter>,
  )

const openDialog = () =>
  fireEvent.click(screen.getByRole("button", { name: "Taak opvoeren" }))
const dialog = () => within(screen.getByRole("dialog"))

// The button is off until a task is chosen.
const submitDialog = async () => {
  const button = within(
    screen.getByRole("dialog"),
  ).getByRole<HTMLButtonElement>("button", { name: "Taak opvoeren" })
  await waitFor(() => expect(button.disabled).toBe(false))
  fireEvent.click(button)
}

describe("the open tasks of a case", () => {
  beforeEach(() => {
    permissions = ["perform_task"]
    startWorkflowProcess.mockReset()
    startWorkflowProcess.mockResolvedValue({})
    refreshWorkflowsSoon.mockReset()
    workflows = [
      {
        state: { name: "Inplannen Huisbezoek" },
        information: "",
        tasks: [
          {
            case: 12,
            case_user_task_id: "abc",
            name: "Bepalen processtap",
            task_name: "task_bepalen_processtap",
            roles: ["Projectmedewerker"],
            owner: null,
            due_date: "2026-10-06",
            user_has_permission: true,
            form: [],
          },
          {
            case: 12,
            case_user_task_id: "def",
            name: "Debrief verwerken",
            task_name: "task_create_debrief",
            roles: ["Toezichthouder", "Handhaver"],
            owner: null,
            due_date: "2026-10-07",
            user_has_permission: true,
            form: [],
          },
        ],
      },
    ]
  })

  it("shows the tasks per state, with what you can do with them", () => {
    renderStatus()

    // One table, a row per task, with the state of the case in front.
    expect(screen.getAllByRole("table")).toHaveLength(1)
    const [, first, second] = screen.getAllByRole("row")
    expect(within(first).getByText("Inplannen Huisbezoek")).toBeTruthy()
    expect(within(first).getByText("Bepalen processtap")).toBeTruthy()
    // Who may do the task is below it, in the same cell.
    expect(within(first).getByText("Projectmedewerker")).toBeTruthy()
    expect(
      screen.queryByRole("columnheader", { name: "Uitvoerder" }),
    ).toBeNull()
    // A task without a form of its own is completed here.
    expect(
      within(first).getByRole("button", {
        name: "Taak afronden: Bepalen processtap",
      }),
    ).toBeTruthy()
    // A task with a form of its own links to that form.
    expect(within(second).getByText("Toezichthouder, Handhaver")).toBeTruthy()
    expect(
      within(second)
        .getByRole("link", { name: "Debrief verwerken: Debrief verwerken" })
        .getAttribute("href"),
    ).toBe("/zaken/12/debriefing/def")
  })

  it("says so when there are no tasks", () => {
    workflows = []
    renderStatus()

    expect(screen.getByText("Geen taken beschikbaar.")).toBeTruthy()
    expect(screen.getByRole("button", { name: "Herlaad taken" })).toBeTruthy()
  })

  it("starts a task in a dialog, without leaving the case", async () => {
    renderStatus()
    openDialog()

    fireEvent.change(dialog().getByLabelText(/^Welke taak wil je opvoeren/), {
      target: { value: "4" },
    })
    await submitDialog()

    await waitFor(() =>
      expect(startWorkflowProcess).toHaveBeenCalledWith({
        workflow_option_id: 4,
      }),
    )
    // The dialog is gone, the tasks refresh and a toast says it worked.
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull())
    expect(refreshWorkflowsSoon).toHaveBeenCalled()
    expect(
      within(screen.getByRole("status")).getByText("Taak opgevoerd"),
    ).toBeTruthy()
    expect(screen.getByRole("heading", { name: "Open taken" })).toBeTruthy()
  })

  it("can't be sent before a task is chosen", async () => {
    renderStatus()
    openDialog()
    const submit = () =>
      dialog().getByRole<HTMLButtonElement>("button", { name: "Taak opvoeren" })

    expect(submit().disabled).toBe(true)

    fireEvent.change(dialog().getByLabelText(/^Welke taak wil je opvoeren/), {
      target: { value: "3" },
    })
    await waitFor(() => expect(submit().disabled).toBe(false))
  })

  it("keeps the dialog open when saving fails, and closes it with Annuleren", async () => {
    startWorkflowProcess.mockRejectedValue(new Error("500"))
    renderStatus()
    openDialog()

    fireEvent.change(dialog().getByLabelText(/^Welke taak wil je opvoeren/), {
      target: { value: "3" },
    })
    await submitDialog()
    await waitFor(() => expect(startWorkflowProcess).toHaveBeenCalled())
    expect(screen.getByRole("dialog")).toBeTruthy()

    fireEvent.click(dialog().getByRole("button", { name: "Annuleren" }))
    expect(screen.queryByRole("dialog")).toBeNull()
    expect(refreshWorkflowsSoon).not.toHaveBeenCalled()
  })

  it("has no way to start a task without the permission", () => {
    permissions = []
    renderStatus()

    expect(
      screen.getByRole<HTMLButtonElement>("button", { name: "Taak opvoeren" })
        .disabled,
    ).toBe(true)
  })
})
