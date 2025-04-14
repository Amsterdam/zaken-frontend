import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import LinkButton from "./LinkButton"

vi.mock("app/components/help/HelpContent/CustomTooltip", () => ({
  default: ({ children }: any) => <div data-testid="tooltip">{children}</div>
}))
vi.mock("app/components/shared/CustomIcon/CustomIcon", () => ({
  default: ({ name }: any) => <span data-testid="icon">{name}</span>
}))
vi.mock("app/components/shared/Hidden/Hidden", () => ({
  default: ({ children }: any) => <span data-testid="hidden">{children}</span>
}))

describe("LinkButton", () => {
  it("renders a disabled button with tooltip when disabled is true", () => {
    render(<LinkButton text="Test Text" path="/test-path" disabled />, { wrapper: MemoryRouter })

    const tooltip = screen.queryByTestId("tooltip")
    const button = screen.getByRole("button")
    const icon = screen.getByTestId("icon")
    const hidden = screen.getByTestId("hidden")

    expect(tooltip).not.toBeNull()
    expect(button.hasAttribute("disabled")).toBe(true)  // Check if the 'disabled' attribute is present
    expect(icon.textContent).toBe("ChevronRight")  // Check the icon's textContent
    expect(hidden.textContent).toBe("Test Text") 
  })

  it("renders a link when disabled is false", () => {
    render(<LinkButton text="Test Text" path="/test-path" />, { wrapper: MemoryRouter })

    const link = screen.getByRole("link")
    const icon = screen.getByTestId("icon")
    const hidden = screen.getByTestId("hidden")

    expect(link.getAttribute("href")).toBe("/test-path")  // Check if the link has the correct href attribute
    expect(icon.textContent).toBe("ChevronRight")  // Check the icon's textContent
    expect(hidden.textContent).toBe("Test Text")
  })
})
