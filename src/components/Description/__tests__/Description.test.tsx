import { render, screen } from "@testing-library/react"
import { Description } from "../Description"

describe("Description", () => {
  it("keeps the line breaks in a value", () => {
    const notes = "Henk:\n\n3 nov 2011\n\nUitgevoerd, maar niet langs geweest"

    render(<Description data={[{ label: "Toelichting", value: notes }]} />)

    const value = screen.getByText(/Uitgevoerd/)
    expect(value.textContent).toBe(notes)
    expect(value.className).toMatch(/value/)
  })

  it("leaves out items without a value", () => {
    render(
      <Description
        data={[
          { label: "Toelichting", value: null },
          { label: "Datum", value: "3 nov 2011" },
        ]}
      />,
    )

    expect(screen.queryByText("Toelichting")).toBeNull()
    expect(screen.getByText("Datum")).toBeTruthy()
  })
})
