import { fireEvent, render, screen, within } from "@testing-library/react"
import { ToastProvider } from "@/components/toasts/ToastProvider"
import { Feedback } from "../Feedback"

const sendFeedback = vi.fn()

vi.mock("@/api/hooks", () => ({
  useSendFeedback: () => ({ mutate: sendFeedback, isPending: false }),
}))

const open = () =>
  fireEvent.click(screen.getByRole("button", { name: "Feedback" }))

describe("the old feedback button", () => {
  beforeEach(() => {
    sendFeedback.mockReset()
  })

  it("opens the feedback dialog, which says where the link is now", () => {
    render(
      <ToastProvider>
        <Feedback />
      </ToastProvider>,
    )
    expect(screen.queryByRole("dialog")).toBeNull()
    open()

    const dialog = within(screen.getByRole("dialog"))
    expect(dialog.getByText(/onderaan elke pagina/)).toBeTruthy()
    fireEvent.change(dialog.getByLabelText(/^Wat wil je ons laten weten/), {
      target: { value: "De knop doet het niet" },
    })
    fireEvent.click(dialog.getByRole("button", { name: "Versturen" }))

    expect(sendFeedback).toHaveBeenCalledWith(
      "De knop doet het niet",
      expect.anything(),
    )
  })
})
