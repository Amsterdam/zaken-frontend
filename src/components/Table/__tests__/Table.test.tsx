import { fireEvent, render, screen, within } from "@testing-library/react"
import { Table } from "../Table"
import { type ColumnType } from "../types"

type Row = { id: number; address: { street: string } }

const rows: Row[] = [
  { id: 1, address: { street: "Brink" } },
  { id: 2, address: { street: "Amstel" } },
  { id: 3, address: { street: "Dam" } },
]

const columns: ColumnType<Row>[] = [
  { header: "ID", dataIndex: "id" },
  { header: "Straat", dataIndex: "address.street" },
  { dataIndex: "link", render: (_, { id }) => `Details ${id}` },
]

const streets = () =>
  screen
    .getAllByRole("row")
    .slice(1)
    .map((row) => within(row).getAllByRole("cell")[1].textContent)

describe("Table", () => {
  it("shows the rows, with nested values and rendered cells", () => {
    render(<Table columns={columns} data={rows} />)

    expect(streets()).toEqual(["Brink", "Amstel", "Dam"])
    expect(screen.getByText("Details 2")).toBeTruthy()
  })

  it("pages through its own rows", () => {
    render(<Table columns={columns} data={rows} pagination={{ pageSize: 2 }} />)
    expect(streets()).toEqual(["Brink", "Amstel"])

    fireEvent.click(screen.getByRole("link", { name: "Volgende pagina" }))

    expect(streets()).toEqual(["Dam"])
  })

  it("asks for the next page when the API pages", () => {
    const onChange = vi.fn()
    render(
      <Table
        columns={columns}
        data={rows}
        pagination={{ page: 1, pageSize: 3, collectionSize: 30 }}
        onChange={onChange}
      />,
    )
    expect(streets()).toHaveLength(3)

    fireEvent.click(screen.getByRole("link", { name: "Volgende pagina" }))

    expect(onChange).toHaveBeenLastCalledWith({
      page: 2,
      pageSize: 3,
      collectionSize: 30,
    })
  })

  it("shows loading rows instead of the data", () => {
    render(<Table columns={columns} data={rows} loading numLoadingRows={4} />)

    expect(screen.getAllByRole("row")).toHaveLength(5)
    expect(screen.getAllByTestId("small-skeleton")).toHaveLength(12)
    expect(screen.queryByText("Brink")).toBeNull()
  })

  it("shows the placeholder when there are no rows", () => {
    render(<Table columns={columns} data={[]} emptyPlaceholder="Geen zaken" />)

    expect(screen.getByText("Geen zaken")).toBeTruthy()
    expect(screen.queryByRole("navigation")).toBeNull()
  })
})
