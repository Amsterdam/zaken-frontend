import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react"
import { ToastProvider } from "@/components/toasts/ToastProvider"
import CaseDetails from "../CaseDetails"

const updateCase = vi.fn()
const updateAddress = vi.fn()
const setCaseData = vi.fn()
let permissions: string[] = []

const caseItem = {
  id: 12,
  sensitive: false,
  is_enforcement_request: false,
  state: "TOEZICHT",
  start_date: "2026-03-09",
  previous_case: null,
  theme: { id: 1, name: "Vakantieverhuur" },
  reason: { name: "Melding" },
  subjects: [{ id: 4, name: "Doorzon" }],
  tags: [{ id: 3, name: "Mol 2.0" }],
  address: { bag_id: "0363", housing_corporation: 7 },
}

vi.mock("@/api/hooks", () => ({
  useCase: () => ({ data: caseItem, isLoading: false }),
  useTags: () => ({
    data: {
      results: [
        { id: 3, name: "Mol 2.0" },
        { id: 5, name: "Spoed" },
      ],
    },
  }),
  useCorporations: () => ({
    data: {
      results: [
        { id: 7, name: "Ymere" },
        { id: 8, name: "Eigen Haard" },
      ],
    },
  }),
  useCaseThemes: () => ({
    data: {
      results: [
        { id: 1, name: "Vakantieverhuur" },
        { id: 2, name: "Kamerverhuur" },
      ],
    },
  }),
  useSubjects: (themeId?: number) => ({
    data:
      themeId === 1
        ? {
            results: [
              { id: 4, name: "Doorzon" },
              { id: 6, name: "Hotel" },
            ],
          }
        : { results: [{ id: 9, name: "Onderhuur" }] },
  }),
  useUpdateCase: () => ({ mutateAsync: updateCase, isPending: false }),
  useUpdateAddress: () => ({ mutateAsync: updateAddress, isPending: false }),
  useSetCaseData: () => setCaseData,
}))

vi.mock("@/hooks/useHasPermission", () => ({
  default: (names: string[]) => [
    names.every((name) => permissions.includes(name)),
    false,
  ],
  CAN_PERFORM_TASK: "perform_task",
}))

const renderDetails = () =>
  render(
    <ToastProvider>
      <CaseDetails caseId={12} />
    </ToastProvider>,
  )

const dialog = () => within(screen.getByRole("dialog"))
const save = () =>
  fireEvent.click(dialog().getByRole("button", { name: "Opslaan" }))

describe("changing the facts of a case", () => {
  beforeEach(() => {
    permissions = ["perform_task"]
    updateCase.mockReset().mockResolvedValue({})
    updateAddress.mockReset().mockResolvedValue({ housing_corporation: 8 })
    setCaseData.mockReset()
  })

  it("has no buttons to change anything without the permission", () => {
    permissions = []
    renderDetails()

    expect(screen.queryByRole("button")).toBeNull()
    expect(screen.getByText("Mol 2.0")).toBeTruthy()
    expect(screen.getByText("Ymere")).toBeTruthy()
  })

  it("changes the tag in a dialog, with a toast when it worked", async () => {
    renderDetails()
    fireEvent.click(screen.getByRole("button", { name: "Wijzig tag" }))

    // The current tag is chosen.
    const select = dialog().getByLabelText<HTMLSelectElement>(/^Welke tag/)
    expect(select.value).toBe("3")
    fireEvent.change(select, { target: { value: "5" } })
    save()

    await waitFor(() =>
      expect(updateCase).toHaveBeenCalledWith({ tag_ids: [5] }),
    )
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull())
    expect(screen.getByText("Tag gewijzigd")).toBeTruthy()
    // What changed, with the new value in bold.
    expect(screen.getByText("Spoed", { selector: "strong" })).toBeTruthy()
  })

  it("can take the tag away", async () => {
    renderDetails()
    fireEvent.click(screen.getByRole("button", { name: "Wijzig tag" }))

    fireEvent.change(dialog().getByLabelText(/^Welke tag/), {
      target: { value: "none" },
    })
    save()

    await waitFor(() =>
      expect(updateCase).toHaveBeenCalledWith({ tag_ids: [] }),
    )
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull())
    expect(screen.getByText("De zaak heeft geen tag meer.")).toBeTruthy()
  })

  it("keeps the dialog open when saving fails", async () => {
    updateCase.mockRejectedValue(new Error("500"))
    renderDetails()
    fireEvent.click(screen.getByRole("button", { name: "Wijzig tag" }))

    save()

    await waitFor(() => expect(updateCase).toHaveBeenCalled())
    expect(screen.getByRole("dialog")).toBeTruthy()
    expect(screen.queryByText("Tag gewijzigd")).toBeNull()
  })

  it("changes the housing corporation of the address", async () => {
    renderDetails()
    fireEvent.click(
      screen.getByRole("button", { name: "Wijzig de woningcorporatie" }),
    )

    const select = dialog().getByLabelText<HTMLSelectElement>(
      /^Welke woningcorporatie/,
    )
    expect(select.value).toBe("7")
    fireEvent.change(select, { target: { value: "8" } })
    save()

    await waitFor(() =>
      expect(updateAddress).toHaveBeenCalledWith({ housing_corporation: 8 }),
    )
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull())
    // The case shows the new corporation without a refetch.
    expect(setCaseData).toHaveBeenCalled()
    expect(screen.getByText("Corporatie gewijzigd")).toBeTruthy()
    expect(screen.getByText("Eigen Haard", { selector: "strong" })).toBeTruthy()
  })

  it("can take the housing corporation away", async () => {
    renderDetails()
    fireEvent.click(
      screen.getByRole("button", { name: "Wijzig de woningcorporatie" }),
    )

    fireEvent.change(dialog().getByLabelText(/^Welke woningcorporatie/), {
      target: { value: "none" },
    })
    save()

    await waitFor(() =>
      expect(updateAddress).toHaveBeenCalledWith({ housing_corporation: null }),
    )
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull())
    expect(screen.getByText("Corporatie verwijderd")).toBeTruthy()
    expect(
      screen.getByText("Het adres is niet meer gekoppeld aan een corporatie."),
    ).toBeTruthy()
  })

  it("saves nothing when the corporation stays the same", async () => {
    renderDetails()
    fireEvent.click(
      screen.getByRole("button", { name: "Wijzig de woningcorporatie" }),
    )

    save()

    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull())
    expect(updateAddress).not.toHaveBeenCalled()
  })

  it("changes the subjects, starting from the current ones", async () => {
    renderDetails()
    fireEvent.click(
      screen.getByRole("button", { name: "Wijzig het onderwerp" }),
    )

    // The list has the subjects of the theme of the case.
    expect(
      dialog().getByLabelText<HTMLSelectElement>(/^Thema/).selectedOptions[0]
        .textContent,
    ).toBe("Vakantieverhuur (thema van deze zaak)")
    // react-select: open the list and choose a second subject.
    const chooseSubject = (name: string) => {
      const input = dialog().getByLabelText(/^Onderwerpen/)
      fireEvent.focus(input)
      fireEvent.keyDown(input, { key: "ArrowDown", code: "ArrowDown" })
      fireEvent.click(dialog().getByText(name))
    }
    chooseSubject("Hotel")

    // Another theme: its subjects are in the list, what was chosen stays.
    fireEvent.change(dialog().getByLabelText(/^Thema/), {
      target: { value: "2" },
    })
    chooseSubject("Onderhuur")
    save()

    await waitFor(() =>
      expect(updateCase).toHaveBeenCalledWith({ subject_ids: [4, 6, 9] }),
    )
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull())
    expect(screen.getByText("Onderwerpen gewijzigd")).toBeTruthy()
    expect(
      screen.getByText("Doorzon, Hotel, Onderhuur", { selector: "strong" }),
    ).toBeTruthy()
  })
})
