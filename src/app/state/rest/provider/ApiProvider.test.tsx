import { render, screen } from "@testing-library/react"
import ApiProvider from "./ApiProvider"

describe("ApiProvider", () => {
  it("should render an ApiContext.Provider with children", () => {
    render(<ApiProvider><span>TEST</span></ApiProvider>)
    expect(screen.getByText("TEST")).toBeInTheDocument()
  })
})
