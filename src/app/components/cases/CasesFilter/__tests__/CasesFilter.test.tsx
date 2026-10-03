import { fireEvent, render, screen } from "@testing-library/react"
import { MemoryRouter, useLocation } from "react-router-dom"
import { useCasesFilters } from "../../useCasesFilters"
import CasesFilter from "../CasesFilter"

type Props = Parameters<typeof CasesFilter>[0]

// The filters and the URL, as text, to see what a change does.
const State = () => {
  const { filters } = useCasesFilters()
  return (
    <>
      <output>{JSON.stringify(filters)}</output>
      <p data-testid="search">{useLocation().search}</p>
    </>
  )
}
const state = () => JSON.parse(screen.getByRole("status").textContent ?? "{}")

// Renders the filter with the values of the URL, like the overview does.
const Filter = (props: Partial<Props>) => {
  const cases = useCasesFilters().filters
  return (
    <CasesFilter
      date={cases.fromStartDate}
      corporations={[{ id: 7, name: "Ymere" }] as Props["corporations"]}
      corporationIsNull={cases.housingCorporationIsNull}
      districts={[{ name: "Centrum" }, { name: "Noord" }] as Props["districts"]}
      districtNames={cases.districtNames}
      openCases={cases.openCases}
      pageSize={String(cases.pagination.pageSize)}
      projects={
        cases.theme
          ? ([{ id: 3, name: "Hotline" }] as Props["projects"])
          : undefined
      }
      reason={cases.reason}
      reasons={["Melding", "Project"]}
      searchString={cases.addressSearch}
      sorting={cases.sorting}
      selectedCorporations={cases.housingCorporations}
      selectedProjects={cases.projects}
      selectedSubjects={cases.subjects}
      selectedTags={cases.tags}
      theme={cases.theme}
      themes={[{ id: 1, name: "Vakantieverhuur" }] as Props["themes"]}
      {...props}
    />
  )
}

const renderFilter = (props: Partial<Props> = {}) =>
  render(
    <MemoryRouter initialEntries={["/zaken"]}>
      <Filter {...props} />
      <State />
    </MemoryRouter>,
  )

const choose = (label: string, value: string) =>
  fireEvent.change(screen.getByLabelText(label), { target: { value } })

// react-select: open the menu and click the option.
const chooseMulti = (label: string, option: string) => {
  const input = screen.getByLabelText(label)
  fireEvent.focus(input)
  fireEvent.keyDown(input, { key: "ArrowDown", code: "ArrowDown" })
  fireEvent.click(screen.getByText(option))
}

describe("CasesFilter", () => {
  beforeEach(() => window.sessionStorage.clear())

  it("keeps the filters in the URL", () => {
    renderFilter()

    choose("Thema", "Vakantieverhuur")
    chooseMulti("Stadsdelen", "Noord")
    chooseMulti("Stadsdelen", "Centrum")
    choose("Items per pagina", "100")

    expect(screen.getByTestId("search").textContent).toBe(
      "?thema=Vakantieverhuur&stadsdeel=Noord&stadsdeel=Centrum&perPagina=100",
    )
  })

  it("applies a filter as soon as you choose, and goes back to page 1", () => {
    renderFilter()

    fireEvent.click(screen.getByRole("button", { name: "Alle filters" }))
    choose("Toon zaken", "closed")
    choose("Items per pagina", "100")

    expect(state().openCases).toBe("closed")
    expect(state().pagination).toEqual({ page: 1, pageSize: 100 })
  })

  it("has the search and the sorting in the same row", () => {
    renderFilter()

    choose("Sorteren op", "address.street_name:ASCEND")
    expect(state().sorting).toEqual({
      dataIndex: "address.street_name",
      order: "ASCEND",
    })

    const search = screen.getByRole("searchbox", { name: /^Zoeken/ })
    fireEvent.change(search, { target: { value: " Amstel " } })
    fireEvent.submit(search)
    expect(state().addressSearch).toBe("Amstel")
  })

  it("orders the row from which cases to how they are shown", () => {
    renderFilter()
    fireEvent.click(screen.getByRole("button", { name: "Alle filters" }))

    const labels = Array.from(document.querySelectorAll("label"))
      .map((label) => label.textContent?.trim())
      .filter(Boolean)
    expect(labels).toEqual([
      "Zoeken",
      // The search field's own label, for screen readers.
      "Zoek op straat of postcode",
      "Thema",
      "Aanleiding",
      "Stadsdelen",
      "Corporaties",
      "Startdatum",
      "Toon zaken",
      "Sorteren op",
      "Items per pagina",
    ])
  })

  it("chooses several districts in the multiselect", () => {
    renderFilter()

    chooseMulti("Stadsdelen", "Noord")
    chooseMulti("Stadsdelen", "Centrum")

    expect(state().districtNames).toEqual(["Noord", "Centrum"])
  })

  it("clears the filters of a theme when the theme changes", () => {
    renderFilter()
    choose("Thema", "Vakantieverhuur")
    choose("Aanleiding", "Project")
    fireEvent.click(screen.getByRole("button", { name: "Alle filters" }))
    chooseMulti("Projecten", "Hotline")
    expect(state().projects).toEqual(["3"])

    choose("Thema", "")

    expect(state()).toMatchObject({ theme: "", reason: "", projects: [] })
    // No theme, no projects to choose from.
    expect(screen.queryByLabelText("Projecten")).toBeNull()
  })

  it("keeps the less used filters behind a button", () => {
    renderFilter()
    expect(screen.queryByLabelText("Corporaties")).toBeNull()
    expect(screen.queryByLabelText("Toon zaken")).toBeNull()

    fireEvent.click(screen.getByRole("button", { name: "Alle filters" }))
    chooseMulti("Corporaties", "Ymere")

    expect(state().housingCorporations).toEqual(["7"])
  })

  it("has 'Zonder corporatie' in the corporations, excluding the others", () => {
    renderFilter()
    fireEvent.click(screen.getByRole("button", { name: "Alle filters" }))

    chooseMulti("Corporaties", "Ymere")
    chooseMulti("Corporaties", "Zonder corporatie")
    expect(state()).toMatchObject({
      housingCorporations: [],
      housingCorporationIsNull: true,
    })

    chooseMulti("Corporaties", "Ymere")
    expect(state()).toMatchObject({
      housingCorporations: ["7"],
      housingCorporationIsNull: false,
    })
  })

  it("counts the search as a filter: the reset button empties it", () => {
    renderFilter()
    const search = () => screen.getByRole<HTMLInputElement>("searchbox")

    fireEvent.change(search(), { target: { value: "Amstel" } })
    fireEvent.submit(search())
    fireEvent.click(screen.getByRole("button", { name: "Wis alle filters" }))

    expect(state().addressSearch).toBe("")
    expect(search().value).toBe("")
    expect(
      screen.queryByRole("button", { name: "Wis alle filters" }),
    ).toBeNull()
  })

  it("resets the filters, but not the page size", () => {
    renderFilter()
    expect(
      screen.queryByRole("button", { name: "Wis alle filters" }),
    ).toBeNull()

    choose("Items per pagina", "100")
    choose("Thema", "Vakantieverhuur")
    chooseMulti("Stadsdelen", "Noord")
    fireEvent.click(screen.getByRole("button", { name: "Wis alle filters" }))

    expect(state()).toMatchObject({
      theme: "",
      districtNames: [],
      openCases: "open",
      pagination: { page: 1, pageSize: 100 },
    })
  })
})
