import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react"
import { MemoryRouter, useLocation } from "react-router"
import { ToastProvider } from "@/components/toasts/ToastProvider"
import CaseStatus from "../CaseStatus"

const startWorkflowProcess = vi.fn()
const refreshWorkflowsSoon = vi.fn()
let permissions: string[] = []
let workflows: unknown[] = []
const useCaseWorkflowInstances = vi.fn((caseId: number) => ({
  data: [
    {
      id: 2,
      workflow_type: "sub_workflow",
      workflow_version: "0.10.0",
      completed: false,
      current_task_specs: ["task_a", "task_b"],
    },
    {
      id: 1,
      workflow_type: "director",
      workflow_version: "0.1.0",
      completed: true,
      current_task_specs: [],
      case: caseId,
    },
  ],
  isLoading: false,
}))

vi.mock("@/api/hooks", () => ({
  useCase: () => ({ data: { id: 12, end_date: null, theme: { id: 1 } } }),
  useCaseWorkflows: () => ({
    data: { results: workflows },
    isLoading: false,
    isPolling: false,
    refetch: vi.fn(),
  }),
  useCompleteTask: () => ({ mutateAsync: vi.fn() }),
  useCaseWorkflowInstances: (caseId: number) =>
    useCaseWorkflowInstances(caseId),
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
vi.mock("@/components/tasks/TableTasks/AssignTask/AssignTask", () => ({
  default: () => <span>avatar</span>,
}))
vi.mock("@/components/case/tasks/ChangeDueDate/ChangebleDueDate", () => ({
  default: ({ dueDate }: { dueDate: string }) => <span>{dueDate}</span>,
}))
vi.mock(
  "@/components/case/Workflow/components/UpdateSchedule/UpdateSchedule",
  () => ({ default: () => <span>Machtiging</span> }),
)
vi.mock("@/components/case/tasks/CompleteTask/CompleteTaskDialog", () => ({
  default: () => null,
}))

const Search = () => <span data-testid="search">{useLocation().search}</span>

const renderStatus = (search = "") =>
  render(
    <MemoryRouter initialEntries={[`/zaken/12${search}`]}>
      <ToastProvider>
        <CaseStatus id={12} />
      </ToastProvider>
      <Search />
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
    useCaseWorkflowInstances.mockClear()
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

    // One table, a row per task. Few columns, so it fits on a laptop.
    expect(screen.getAllByRole("table")).toHaveLength(1)
    expect(
      screen.getAllByRole("columnheader").map((header) => header.textContent),
    ).toEqual(["Taak", "Proces", "Toegewezen", "Slotdatum", ""])
    const [, first, second] = screen.getAllByRole("row")
    // Who may do the task is below it, in the same cell.
    const [task, state] = within(first).getAllByRole("cell")
    expect(within(task).getByText("Bepalen processtap")).toBeTruthy()
    expect(within(task).getByText("Projectmedewerker")).toBeTruthy()
    expect(state.textContent).toBe("Inplannen Huisbezoek")
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

  it("shows the urgency of a visit below the state, only for that task", () => {
    workflows = [
      {
        state: { name: "Huisbezoek" },
        information: "",
        tasks: [
          {
            case: 12,
            case_user_task_id: "ghi",
            name: "Huisbezoek inplannen",
            task_name: "task_create_visit",
            roles: ["Toezichthouder"],
            owner: null,
            due_date: "2026-10-08",
            user_has_permission: true,
            form: [],
          },
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
        ],
      },
    ]
    renderStatus()

    expect(screen.queryByRole("columnheader", { name: "Urgentie" })).toBeNull()
    const [, visit, other] = screen.getAllByRole("row")
    expect(within(visit).getAllByRole("cell")[1].textContent).toBe(
      "HuisbezoekUrgentie: Machtiging",
    )
    expect(within(other).getAllByRole("cell")[1].textContent).toBe("Huisbezoek")
  })

  it("shows the processes on their own tab, fetched when you open it", () => {
    renderStatus()

    expect(
      screen.getByRole("tab", { name: "Open taken", selected: true }),
    ).toBeTruthy()
    expect(useCaseWorkflowInstances).not.toHaveBeenCalled()

    fireEvent.click(screen.getByRole("tab", { name: "Processen" }))

    expect(useCaseWorkflowInstances).toHaveBeenCalledWith(12)
    expect(
      screen.getAllByRole("columnheader").map((header) => header.textContent),
    ).toEqual(["Proces", "Omschrijving", "Versie", "Status", ""])
    const [, active, completed] = screen.getAllByRole("row")
    expect(
      within(active)
        .getAllByRole("cell")
        .map((cell) => cell.textContent),
    ).toEqual([
      "Sub workflow",
      "Deelproces",
      "0.10.0",
      "Actief",
      "Bekijk huidige processtap",
    ])
    // The link leads to the diagram, with the open tasks to highlight.
    expect(
      within(active)
        .getByRole("link", {
          name: "Bekijk huidige processtap: Sub workflow 0.10.0",
        })
        .getAttribute("href"),
    ).toBe("/bpmn?model=sub_workflow&versie=0.10.0&taken=task_a%2Ctask_b")
    expect(within(completed).getByText("Afgerond")).toBeTruthy()
    expect(
      within(completed)
        .getByRole("link", { name: "Bekijk het proces: Director 0.1.0" })
        .getAttribute("href"),
    ).toBe("/bpmn?model=director&versie=0.1.0")
  })

  it("keeps the open tab in the URL", () => {
    renderStatus("?tab=processen")

    expect(
      screen.getByRole("tab", { name: "Processen", selected: true }),
    ).toBeTruthy()
    expect(useCaseWorkflowInstances).toHaveBeenCalledWith(12)

    fireEvent.click(screen.getByRole("tab", { name: "Open taken" }))
    expect(screen.getByTestId("search").textContent).toBe("")

    fireEvent.click(screen.getByRole("tab", { name: "Processen" }))
    expect(screen.getByTestId("search").textContent).toBe("?tab=processen")
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
    expect(
      screen.getByRole("heading", { name: "Taken en processen" }),
    ).toBeTruthy()
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
