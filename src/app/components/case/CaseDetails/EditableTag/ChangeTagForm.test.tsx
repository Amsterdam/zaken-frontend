import { fireEvent, render, screen } from "@testing-library/react"
import { ThemeProvider } from "@amsterdam/asc-ui"
import ChangeTagForm from "./ChangeTagForm"

const mutate = vi.fn()

vi.mock("@/api/hooks", () => ({
  useTags: () => ({ data: { results: [{ id: 3, name: "Spoed" }] } }),
  useUpdateCase: () => ({ mutate, isPending: false }),
}))

describe("ChangeTagForm", () => {
  it("saves the tag and lets the modal close once saving is done", () => {
    const onSaved = vi.fn()
    const caseItem = {
      id: 1,
      theme: { id: 2 },
      tags: [],
    } as unknown as components["schemas"]["CaseCreate"]

    render(
      <ThemeProvider>
        <ChangeTagForm case={caseItem} onCancel={vi.fn()} onSaved={onSaved} />
      </ThemeProvider>,
    )
    fireEvent.click(screen.getByLabelText("Spoed"))
    fireEvent.click(screen.getByText("Opslaan"))

    expect(mutate).toHaveBeenCalledWith(
      { tag_ids: [3] },
      { onSettled: onSaved },
    )
  })
})
