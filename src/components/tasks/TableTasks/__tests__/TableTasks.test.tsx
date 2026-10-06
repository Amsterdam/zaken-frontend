import { render, screen, within } from "@testing-library/react"
import { MemoryRouter } from "react-router"
import TableTasks from "../TableTasks"

vi.mock("../AssignTask/AssignTask", () => ({
  default: ({ taskOwner }: { taskOwner?: string | null }) => (
    <span>{taskOwner ?? "niemand"}</span>
  ),
}))

type Task = components["schemas"]["CaseUserTask"]

const tasks = [
  {
    id: 1,
    name: "Huisbezoek inplannen",
    owner: null,
    due_date: "2020-01-15T00:00:00Z",
    case: {
      id: 12,
      start_date: "2019-12-01",
      address: {
        street_name: "Amstel",
        number: 1,
        suffix: "H",
        suffix_letter: null,
        postal_code: "1011PN",
      },
    },
  },
] as unknown as Task[]

describe("TableTasks", () => {
  it("shows a task per row, with a link to its case", () => {
    // All columns are shown from 1600px.
    window.innerWidth = 1920
    render(
      <MemoryRouter>
        <TableTasks
          data={tasks}
          isBusy={false}
          pagination={false}
          emptyPlaceholder="Geen taken"
        />
      </MemoryRouter>,
    )

    const cells = within(screen.getAllByRole("row")[1])
      .getAllByRole("cell")
      .map((cell) => cell.textContent)
    expect(cells).toEqual([
      "niemand",
      "Amstel 1-H",
      "1011PN",
      "Huisbezoek inplannen",
      "01-12-2019",
      "15-01-2020",
      "Zaakdetails",
    ])
    expect(
      screen
        .getByRole("link", { name: "Zaakdetails van zaak 12, Amstel 1-H" })
        .getAttribute("href"),
    ).toBe("/zaken/12")
  })
})
