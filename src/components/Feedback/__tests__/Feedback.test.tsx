import { fireEvent, render, screen, within } from "@testing-library/react"
import { Footer } from "@/components/DefaultLayout/Footer"
import { Feedback } from "../Feedback"

const open = () =>
  fireEvent.click(screen.getByRole("button", { name: "Feedback" }))

const spotlight = () => document.querySelector('[class*="spotlight"]')

describe("the old feedback button", () => {
  afterEach(() => {
    vi.useRealTimers()
    spotlight()?.remove()
  })

  it("says the feedback moved to the footer", () => {
    render(<Feedback />)
    expect(screen.queryByRole("dialog")).toBeNull()
    open()

    const dialog = within(screen.getByRole("dialog"))
    expect(dialog.getByText(/verplaatst naar de footer/)).toBeTruthy()
    expect(dialog.queryByRole("textbox")).toBeNull()
  })

  it("points to the link in the footer when closed", () => {
    vi.useFakeTimers()
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

    // The spotlight comes when the scroll is done, and goes on a click.
    expect(spotlight()).toBeNull()
    vi.runAllTimers()
    expect(spotlight()).toBeTruthy()
    fireEvent.pointerDown(document.body)
    expect(spotlight()).toBeNull()
  })
})
