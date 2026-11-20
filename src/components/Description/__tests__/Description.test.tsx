import { render, screen } from "@testing-library/react"
import { Description } from "../Description"

describe("Description", () => {
  it.each([undefined, 5])("renders loading rows (%s)", (numLoadingRows) => {
    const { container } = render(
      <Description
        data={[{ label: "Datum", value: "3 nov 2011" }]}
        loading
        numLoadingRows={numLoadingRows}
      />,
    )

    const terms = container.querySelectorAll("dt")
    const descriptions = container.querySelectorAll("dd")
    expect(terms).toHaveLength(numLoadingRows ?? 3)
    expect(descriptions).toHaveLength(numLoadingRows ?? 3)
    for (const cell of [...terms, ...descriptions]) {
      expect(cell.querySelector(".ams-skeleton")).not.toBeNull()
    }
    expect(screen.queryByText("Datum")).toBeNull()
  })

  it("keeps a custom class next to dense", () => {
    const { container } = render(
      <Description data={[]} className="custom" dense />,
    )

    const list = container.querySelector("dl.ams-description-list")
    expect(list?.classList.contains("custom")).toBe(true)
    expect(list?.className).toMatch(/dense/)
  })

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
          { label: "Onbekend", value: undefined },
          { label: "Aantal", value: 0 },
          { label: "Datum", value: "3 nov 2011" },
        ]}
      />,
    )

    expect(screen.queryByText("Toelichting")).toBeNull()
    expect(screen.queryByText("Onbekend")).toBeNull()
    expect(screen.getByText("Datum")).toBeTruthy()
    expect(screen.getByText("0")).toBeTruthy()
  })
})
