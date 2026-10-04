import { fireEvent, render, screen, within } from "@testing-library/react"
import { MemoryRouter, useLocation } from "react-router-dom"
import TableCases from "../TableCases"

type Case = components["schemas"]["Case"]

const cases = [
  {
    id: 12,
    address: {
      street_name: "Amstel",
      number: 1,
      suffix: "H",
      suffix_letter: null,
      postal_code: "1011PN",
    },
    workflows: [
      { state: { name: "Huisbezoek" } },
      { state: { name: "Huisbezoek" } },
      { state: { name: "Debrief" } },
    ],
    reason: { name: "Project" },
    project: { name: "Hotline" },
    start_date: "2026-03-09",
    last_updated: "2026-04-01T10:00:00Z",
  },
  {
    id: 13,
    address: {
      street_name: "Dam",
      number: 2,
      suffix: null,
      suffix_letter: null,
      postal_code: "1012JS",
    },
    workflows: [],
    reason: { name: "Melding" },
    start_date: null,
    end_date: "2026-05-01",
    last_updated: "2026-05-01T10:00:00Z",
  },
] as unknown as Case[]

const Location = () => <output>{useLocation().pathname}</output>

const renderTable = (props: Partial<Parameters<typeof TableCases>[0]> = {}) => {
  // All columns are shown from 1600px.
  window.innerWidth = 1920
  const onChange = vi.fn()
  render(
    <MemoryRouter>
      <TableCases
        data={cases}
        isBusy={false}
        onChange={onChange}
        pagination={{ page: 1, pageSize: 10, collectionSize: 25 }}
        emptyPlaceholder="Geen zaken"
        {...props}
      />
      <Location />
    </MemoryRouter>,
  )
  return onChange
}

const cells = (rowIndex: number) =>
  within(screen.getAllByRole("row")[rowIndex])
    .getAllByRole("cell")
    .map((cell) => cell.textContent)

describe("TableCases", () => {
  it("shows a case per row", () => {
    renderTable()

    expect(cells(1)).toEqual([
      "12",
      "Amstel 1-H",
      "1011PN",
      "Huisbezoek, Debrief",
      "Hotline",
      "09-03-2026",
      "01-04-2026",
      "Zaakdetails",
    ])
    // A case without workflows that has ended, and without a start date.
    expect(cells(2).slice(3, 6)).toEqual(["Afgerond", "Melding", "-"])
  })

  it("asks the API for another page", () => {
    const onChange = renderTable()

    fireEvent.click(screen.getByRole("link", { name: "Volgende pagina" }))

    expect(onChange).toHaveBeenLastCalledWith({
      page: 2,
      pageSize: 10,
      collectionSize: 25,
    })
  })

  it("shows as many loading rows as a page has", () => {
    renderTable({ isBusy: true })

    // The header and one row per case of the page size.
    expect(screen.getAllByRole("row")).toHaveLength(11)
  })

  it("opens the case from the link in the last column", () => {
    renderTable()

    const link = screen.getByRole("link", {
      name: "Zaakdetails van zaak 12, Amstel 1-H",
    })
    expect(link.getAttribute("href")).toBe("/zaken/12")
    fireEvent.click(link)

    expect(screen.getByRole("status").textContent).toBe("/zaken/12")
  })

  it("does not open the case from the rest of the row", () => {
    renderTable()

    fireEvent.click(screen.getByText("1011PN"))

    expect(screen.getByRole("status").textContent).toBe("/")
  })
})
