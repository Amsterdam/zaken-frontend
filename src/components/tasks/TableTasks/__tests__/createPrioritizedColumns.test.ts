import getColumns from "../columns"
import createPrioritizedColumns from "../createPrioritizedColumns"

const headersAt = (windowWidth: number) =>
  createPrioritizedColumns(getColumns(false), windowWidth).map(
    ({ dataIndex }) => dataIndex,
  )

describe("createPrioritizedColumns", () => {
  it("shows the assignee but not the week on a small screen", () => {
    expect(headersAt(800)).toEqual([
      "owner",
      "case.address.street_name",
      "name",
      "case.id",
    ])
  })

  it("shows the week from 900px on, without the start date", () => {
    const columns = headersAt(1200)

    expect(columns).toContain("week_number")
    expect(columns).not.toContain("case.start_date")
    expect(columns).toHaveLength(7)
  })

  it("shows every column on a wide screen", () => {
    expect(headersAt(1600)).toHaveLength(8)
  })
})
