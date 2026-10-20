import { fireEvent, render, screen } from "@testing-library/react"
import { ConfirmDialog } from "../ConfirmDialog"

const renderDialog = () => {
  const onConfirm = vi.fn()
  const onCancel = vi.fn()
  render(
    <ConfirmDialog
      title="Toewijzing wijzigen"
      confirmText="Ja, toewijzen"
      onConfirm={onConfirm}
      onCancel={onCancel}
    >
      Weet je het zeker?
    </ConfirmDialog>,
  )
  return { onConfirm, onCancel }
}

describe("ConfirmDialog", () => {
  it("opens as a modal with the question", () => {
    renderDialog()

    const dialog = screen.getByRole<HTMLDialogElement>("dialog")
    expect(dialog.open).toBe(true)
    expect(
      screen.getByRole("heading", { name: "Toewijzing wijzigen" }),
    ).toBeTruthy()
    expect(screen.getByText("Weet je het zeker?")).toBeTruthy()
  })

  it("confirms", () => {
    const { onConfirm, onCancel } = renderDialog()

    fireEvent.click(screen.getByRole("button", { name: "Ja, toewijzen" }))

    expect(onConfirm).toHaveBeenCalledTimes(1)
    expect(onCancel).not.toHaveBeenCalled()
  })

  it("cancels with the button, and with the close button", () => {
    const { onConfirm, onCancel } = renderDialog()

    fireEvent.click(screen.getByRole("button", { name: "Annuleren" }))
    expect(onCancel).toHaveBeenCalledTimes(1)

    // Closed now; open it again for the other way out.
    document.querySelector("dialog")?.showModal()
    fireEvent.click(screen.getByRole("button", { name: "Sluiten" }))
    expect(onCancel).toHaveBeenCalledTimes(2)
    expect(onConfirm).not.toHaveBeenCalled()
  })
})
