import { fireEvent, render, screen, within } from "@testing-library/react"
import { Footer } from "@/components/DefaultLayout/Footer"
import { Feedback } from "../Feedback"

const open = () =>
  fireEvent.click(screen.getByRole("button", { name: "Feedback" }))

describe("the old feedback button", () => {
  it("says the feedback moved to the footer", () => {
    render(<Feedback />)
    expect(screen.queryByRole("dialog")).toBeNull()
    open()

    const dialog = within(screen.getByRole("dialog"))
    expect(dialog.getByText(/verplaatst naar de footer/)).toBeTruthy()
    expect(dialog.queryByRole("textbox")).toBeNull()
  })

  it("points to the link in the footer when closed", () => {
    // jsdom does not scroll.
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {})
    render(
      <>
        <Feedback />
        <Footer />
      </>,
    )
    open()
    // The last one: the button in the footer, not the cross at the top.
    const closeButton = within(screen.getByRole("dialog"))
      .getAllByRole("button", { name: "Sluiten" })
      .at(-1) as HTMLElement
    fireEvent.click(closeButton)

    const link = screen.getByRole("link", { name: "Feedback" })
    expect(scrollTo).toHaveBeenCalledWith(
      expect.objectContaining({ top: document.documentElement.scrollHeight }),
    )
    expect(document.activeElement).toBe(link)
    expect(link.className).toMatch(/highlight/)
  })
})
