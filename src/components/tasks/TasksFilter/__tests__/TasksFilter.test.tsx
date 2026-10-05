import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, useLocation } from "react-router"
import TasksFilter from "../TasksFilter"

type Props = Parameters<typeof TasksFilter>[0]

const Search = () => <output>{useLocation().search}</output>
const search = () => screen.getByRole("status").textContent

const renderFilter = (url = "/taken") =>
  render(
    <MemoryRouter initialEntries={[url]}>
      <TasksFilter
        corporations={[{ id: 7, name: "Ymere" }] as Props["corporations"]}
        districts={
          [{ name: "Centrum" }, { name: "Noord" }] as Props["districts"]
        }
        myRole="Toezichthouder"
        reasons={["Melding"]}
        roles={["Projectmedewerker", "Toezichthouder"]}
        taskNames={[{ name: "Huisbezoek inplannen" }]}
        taskOwners={[{ id: "abc-123", name: "Jan Jansen" }]}
        themes={[{ id: 1, name: "Vakantieverhuur" }] as Props["themes"]}
      />
      <Search />
    </MemoryRouter>,
  )

const select = (label: string) =>
  screen.getByLabelText<HTMLSelectElement>(label)
const choose = (label: string, value: string) =>
  fireEvent.change(select(label), { target: { value } })

// react-select: open the menu and click the option.
const chooseMulti = (label: string, option: string) => {
  const input = screen.getByLabelText(label)
  fireEvent.focus(input)
  fireEvent.keyDown(input, { key: "ArrowDown", code: "ArrowDown" })
  fireEvent.click(screen.getByText(option))
}

describe("TasksFilter", () => {
  beforeEach(() => window.sessionStorage.clear())

  it("starts with your own role, without a filter in the URL", () => {
    renderFilter()

    expect(select("Rol").value).toBe("Toezichthouder")
    expect(search()).toBe("")
    expect(
      screen.queryByRole("button", { name: "Wis alle filters" }),
    ).toBeNull()
  })

  it("keeps the filters in the URL", () => {
    renderFilter()

    chooseMulti("Toegewezen aan", "Jan Jansen")
    choose("Rol", "")
    chooseMulti("Taken", "Huisbezoek inplannen")
    choose("Sorteren op", "name:ASCEND")

    expect(search()).toBe(
      "?toegewezen=abc-123&taak=Huisbezoek+inplannen&rol=alle&sorteer=taak",
    )
  })

  it("clears the chosen tasks when the role or the theme changes", () => {
    renderFilter("/taken?taak=Huisbezoek+inplannen&pagina=3")

    choose("Rol", "Projectmedewerker")

    expect(search()).toBe("?rol=Projectmedewerker")
  })

  it("goes back to your own role with 'Wis alle filters'", () => {
    renderFilter("/taken?rol=alle&stadsdeel=Noord&perPagina=100")
    expect(select("Rol").value).toBe("")

    fireEvent.click(screen.getByRole("button", { name: "Wis alle filters" }))

    expect(select("Rol").value).toBe("Toezichthouder")
    expect(search()).toBe("?perPagina=100")
  })

  it("opens the less used filters when one of them is on", () => {
    renderFilter("/taken?corporatie=7")

    expect(screen.getByLabelText("Corporaties")).toBeTruthy()
    expect(screen.queryByRole("button", { name: "Alle filters" })).toBeNull()
  })
})
