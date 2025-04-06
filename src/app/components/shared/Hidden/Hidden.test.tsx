import { render } from "@testing-library/react"
import { Hidden } from "./Hidden"
import styles from "./Hidden.module.css"

describe("Hidden component", () => {
  it("should apply the correct minBreakpoint class", () => {
    const { container } = render(
      <Hidden minBreakpoint="mobileM">Test Content</Hidden>
    )

    const element = container.querySelector("span")

    // Check if the className contains the expected class
    expect(element?.className).toContain(styles["hideUntil-mobileM"])
  })

  it("should apply the correct maxBreakpoint class", () => {
    const { container } = render(
      <Hidden maxBreakpoint="tabletS">Test Content</Hidden>
    )

    const element = container.querySelector("span")

    // Check if the className contains the expected class
    expect(element?.className).toContain(styles["hideFrom-tabletS"])
  })

  it("should apply both minBreakpoint and maxBreakpoint classes", () => {
    const { container } = render(
      <Hidden minBreakpoint="mobileM" maxBreakpoint="laptop">
        Test Content
      </Hidden>
    )

    const element = container.querySelector("span")

    // Check if both classes are applied
    expect(element?.className).toContain(styles["hideUntil-mobileM"])
    expect(element?.className).toContain(styles["hideFrom-laptop"])
  })

  it("should not apply any class when no breakpoints are provided", () => {
    const { container } = render(<Hidden>Test Content</Hidden>)
    const element = container.querySelector("span")

    // Check if no classes are applied
    expect(element?.className).toBe("")
  })

  it("should render children correctly", () => {
    const { container } = render(<Hidden>Test Content</Hidden>)
    const element = container.querySelector("span")

    // Check if the children are rendered as expected
    expect(element?.textContent).toBe("Test Content")
  })
})
