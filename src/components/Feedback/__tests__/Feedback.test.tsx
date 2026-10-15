import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react"
import { ToastProvider } from "@/components/toasts/ToastProvider"
import { Feedback } from "../Feedback"

type Options = { onSuccess?: () => void }

const sendFeedback = vi.fn()

vi.mock("@/api/hooks", () => ({
  useSendFeedback: () => ({ mutate: sendFeedback, isPending: false }),
}))

const renderFeedback = () =>
  render(
    <ToastProvider>
      <Feedback />
    </ToastProvider>,
  )

const open = () =>
  fireEvent.click(screen.getByRole("button", { name: "Feedback" }))
const dialog = () => within(screen.getByRole("dialog"))
const field = () =>
  dialog().getByLabelText<HTMLTextAreaElement>(/^Wat is je feedback/)
const sendButton = () =>
  dialog().getByRole<HTMLButtonElement>("button", { name: "Versturen" })

describe("the feedback button", () => {
  beforeEach(() => {
    sendFeedback.mockReset()
  })

  it("opens the dialog", () => {
    renderFeedback()
    expect(screen.queryByRole("dialog")).toBeNull()
    open()

    expect(field().value).toBe("")
  })

  it("cannot send without feedback", () => {
    renderFeedback()
    open()

    expect(sendButton().disabled).toBe(true)
    fireEvent.change(field(), { target: { value: "   " } })
    expect(sendButton().disabled).toBe(true)
  })

  it("sends the feedback, with a toast when it worked", async () => {
    sendFeedback.mockImplementation((_feedback: string, options: Options) =>
      options.onSuccess?.(),
    )
    renderFeedback()
    open()
    fireEvent.change(field(), { target: { value: "De knop doet het niet" } })
    fireEvent.click(sendButton())

    expect(sendFeedback).toHaveBeenCalledWith(
      "De knop doet het niet",
      expect.anything(),
    )
    await waitFor(() => expect(screen.queryByRole("dialog")).toBeNull())
    expect(screen.getByText("Bedankt voor je feedback")).toBeTruthy()
  })

  it("stays open with the feedback when sending failed", () => {
    renderFeedback()
    open()
    fireEvent.change(field(), { target: { value: "De knop doet het niet" } })
    fireEvent.click(sendButton())

    expect(sendFeedback).toHaveBeenCalled()
    expect(field().value).toBe("De knop doet het niet")
  })
})
