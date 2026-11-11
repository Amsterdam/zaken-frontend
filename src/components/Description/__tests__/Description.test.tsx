import { render, screen } from "@testing-library/react"
import { Description } from "../Description"

describe("Description", () => {
  it("renders labels and values as DataList items", () => {
    const { container } = render(
      <Description data={[{ label: "Datum", value: "3 nov 2011" }]} />,
    )

    const list = container.querySelector("dl.ams-data-list")
    expect(list?.children).toHaveLength(1)
    expect(screen.getByRole("term").textContent).toBe("Datum")
    expect(screen.getByRole("definition").textContent).toBe("3 nov 2011")
    expect(screen.getByRole("term").parentElement?.className).toContain(
      "ams-data-list__item",
    )
  })

  it.each([undefined, 5])("renders loading rows (%s)", (numLoadingRows) => {
    const { container } = render(
      <Description
        data={[{ label: "Datum", value: "3 nov 2011" }]}
        loading
        numLoadingRows={numLoadingRows}
      />,
    )

    const rows = container.querySelectorAll(".ams-data-list__item")
    expect(rows).toHaveLength(numLoadingRows ?? 3)
    for (const row of rows) {
      expect(row.querySelector("dt .ams-skeleton")).not.toBeNull()
      expect(row.querySelector("dd .ams-skeleton")).not.toBeNull()
    }
    expect(screen.queryByText("Datum")).toBeNull()
  })

  it("preserves custom classes", () => {
    const { container } = render(<Description data={[]} className="custom" />)

    const list = container.querySelector("dl.ams-data-list")
    expect(list?.classList.contains("custom")).toBe(true)
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
