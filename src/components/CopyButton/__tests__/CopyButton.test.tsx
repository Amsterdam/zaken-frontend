import { fireEvent, render, screen } from "@testing-library/react"
import { ToastProvider } from "@/components/toasts/ToastProvider"
import { CopyButton } from "../CopyButton"

const writeText = vi.fn()

const renderButton = () =>
  render(
    <ToastProvider>
      <CopyButton
        text="Amstel 1-H, 1011 PN Amsterdam"
        label="Adres kopiëren"
        copiedTitle="Adres gekopieerd"
      />
    </ToastProvider>,
  )

describe("CopyButton", () => {
  beforeEach(() => {
    writeText.mockReset()
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    })
  })

  it("copies the text and says so", async () => {
    writeText.mockResolvedValue(undefined)
    renderButton()

    fireEvent.click(screen.getByRole("button", { name: "Adres kopiëren" }))

    expect(writeText).toHaveBeenCalledWith("Amstel 1-H, 1011 PN Amsterdam")
    expect(await screen.findByText("Adres gekopieerd")).toBeTruthy()
  })

  it("says what to do when the browser doesn't allow copying", async () => {
    writeText.mockRejectedValue(new Error("Not allowed"))
    renderButton()

    fireEvent.click(screen.getByRole("button", { name: "Adres kopiëren" }))

    expect(await screen.findByText("Kopiëren is mislukt")).toBeTruthy()
  })
})
