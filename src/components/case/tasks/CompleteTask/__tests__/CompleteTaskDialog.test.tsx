import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react"
import { ToastProvider } from "@/components/toasts/ToastProvider"
import TaskButton from "../../TaskButton/TaskButton"

const onSubmit = vi.fn()

const form: Tasks.FormField[] = [
  {
    label: "Wat is de uitkomst?",
    name: "outcome",
    type: "select",
    required: true,
    options: [
      { label: "Doorzetten", value: "continue" },
      { label: "Afsluiten", value: "close" },
    ],
  },
  {
    label: "Is de eigenaar gesproken?",
    name: "spoken",
    type: "checkbox",
    required: false,
  },
  {
    label: "Welke besluiten wil je intrekken?",
    name: "decisions",
    type: "multiselect",
    options: [
      { label: "Boete", value: 4 },
      { label: "Last onder dwangsom", value: 7 },
    ],
  },
  { label: "Hoeveel bewoners?", name: "residents", type: "number" },
  // The backend writes "(niet verplicht)" itself; the field already says it.
  { label: "Toelichting (niet verplicht)", name: "explanation", type: "text" },
]

const renderButton = (taskForm?: Tasks.FormField[], disabled = false) =>
  render(
    <ToastProvider>
      <TaskButton
        taskName="Bepalen processtap"
        form={taskForm}
        onSubmit={onSubmit}
        disabled={disabled}
      />
    </ToastProvider>,
  )

const open = () =>
  fireEvent.click(
    screen.getByRole("button", { name: "Taak afronden: Bepalen processtap" }),
  )
const dialog = () => within(screen.getByRole("dialog"))
const submitButton = () =>
  dialog().getByRole<HTMLButtonElement>("button", { name: "Taak afronden" })

describe("completing a task", () => {
  beforeEach(() => {
    onSubmit.mockReset().mockResolvedValue("ok")
  })

  it("can't be done without the permission", () => {
    renderButton(undefined, true)

    expect(
      screen.getByRole<HTMLButtonElement>("button", {
        name: "Taak afronden: Bepalen processtap",
      }).disabled,
    ).toBe(true)
  })

  it("only asks whether a task without a form is done", async () => {
    renderButton([])
    open()

    expect(dialog().getByText("Bepalen processtap")).toBeTruthy()
    fireEvent.click(submitButton())

    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith({}))
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull())
    expect(screen.getByText("Taak afgerond")).toBeTruthy()
    expect(
      screen.getByText("Bepalen processtap", { selector: "strong" }),
    ).toBeTruthy()
  })

  it("stays open when completing fails, and closes with Annuleren", async () => {
    onSubmit.mockRejectedValue(new Error("500"))
    renderButton()
    open()

    fireEvent.click(submitButton())

    await waitFor(() => expect(onSubmit).toHaveBeenCalled())
    await waitFor(() => expect(submitButton().disabled).toBe(false))
    expect(screen.queryByText("Taak afgerond")).toBeNull()

    fireEvent.click(dialog().getByRole("button", { name: "Annuleren" }))
    expect(screen.queryByRole("dialog")).toBeNull()
  })

  it("asks the questions of the task, and sends the answers", async () => {
    renderButton(form)
    open()

    // Nothing is chosen yet: the required question is still open.
    const outcome =
      dialog().getByLabelText<HTMLSelectElement>(/^Wat is de uitkomst/)
    expect(outcome.value).toBe("")
    expect(submitButton().disabled).toBe(true)
    expect(
      dialog().queryByText(/\(niet verplicht\).*\(niet verplicht\)/),
    ).toBeNull()

    fireEvent.change(outcome, { target: { value: "close" } })
    fireEvent.click(dialog().getByLabelText(/^Is de eigenaar gesproken/))
    fireEvent.click(dialog().getByLabelText("Last onder dwangsom"))
    fireEvent.change(dialog().getByLabelText(/^Hoeveel bewoners/), {
      target: { value: "3" },
    })
    fireEvent.change(dialog().getByLabelText(/^Toelichting/), {
      target: { value: "Zie het verslag." },
    })
    await waitFor(() => expect(submitButton().disabled).toBe(false))
    fireEvent.click(submitButton())

    await waitFor(() =>
      expect(onSubmit).toHaveBeenCalledWith({
        outcome: { value: "close" },
        spoken: { value: true },
        decisions: { value: ["7"] },
        residents: { value: 3 },
        explanation: { value: "Zie het verslag." },
      }),
    )
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull())
    expect(screen.getByText("Taak afgerond")).toBeTruthy()
  })

  it("only takes a number where a number is asked", async () => {
    renderButton([
      { label: "Hoeveel bewoners?", name: "residents", type: "number" },
    ])
    open()
    await waitFor(() => expect(submitButton().disabled).toBe(false))

    fireEvent.change(dialog().getByLabelText(/^Hoeveel bewoners/), {
      target: { value: "veel" },
    })

    expect(await dialog().findByText("Vul een getal in.")).toBeTruthy()
    await waitFor(() => expect(submitButton().disabled).toBe(true))
  })

  it("shows a field without a type as a text to read", async () => {
    renderButton([
      {
        label: "Er zijn geen besluiten in te trekken.",
        name: "geen_besluiten",
      },
    ])
    open()

    expect(
      dialog().getByText("Er zijn geen besluiten in te trekken."),
    ).toBeTruthy()
    expect(dialog().queryByRole("textbox")).toBeNull()
    await waitFor(() => expect(submitButton().disabled).toBe(false))
    fireEvent.click(submitButton())

    await waitFor(() => expect(onSubmit).toHaveBeenCalledWith({}))
  })
})
