import { render, screen } from "@testing-library/react"
import ApiProvider from "./ApiProvider"

describe("ApiProvider", () => {
  it("should render an ApiContext.Provider with children", () => {
    render(<ApiProvider><span>TEST</span></ApiProvider>)
    const element = screen.getByText("TEST")
    expect(element).toBeTruthy() // This checks that the element is found in the DOM
  })
})
