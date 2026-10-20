import {
  defaultCasesFilters,
  parseCasesFilters,
  serializeCasesFilters,
} from "../useCasesFilters"

describe("the filters of the cases overview in the URL", () => {
  it("has an empty URL for the defaults", () => {
    expect(serializeCasesFilters(defaultCasesFilters).toString()).toBe("")
    expect(parseCasesFilters(new URLSearchParams())).toEqual(
      defaultCasesFilters,
    )
  })

  it("reads back what it wrote", () => {
    const filters = {
      addressSearch: "Amstel 1",
      districtNames: ["Centrum", "Noord"],
      fromStartDate: "2026-09-26",
      housingCorporations: ["7"],
      housingCorporationIsNull: true,
      openCases: "all",
      pagination: { page: 3, pageSize: 100 },
      projects: ["3"],
      reason: "Project",
      sorting: { dataIndex: "address.street_name", order: "ASCEND" as const },
      subjects: ["4", "5"],
      tags: ["6"],
      theme: "Vakantieverhuur",
    }

    const params = serializeCasesFilters(filters)

    expect(params.toString()).toBe(
      "zoekterm=Amstel+1&vanaf=2026-09-26&aanleiding=Project&thema=Vakantieverhuur" +
        "&stadsdeel=Centrum&stadsdeel=Noord&corporatie=7&project=3" +
        "&onderwerp=4&onderwerp=5&tag=6&zonderCorporatie=ja&toon=alle" +
        "&pagina=3&perPagina=100&sorteer=straat",
    )
    expect(parseCasesFilters(params)).toEqual(filters)
  })

  it("falls back to the default for a value that makes no sense", () => {
    const filters = parseCasesFilters(
      new URLSearchParams(
        "pagina=0&perPagina=7&toon=iets&sorteer=-gewijzigd&thema=Kamerverhuur",
      ),
    )

    expect(filters.pagination).toEqual(defaultCasesFilters.pagination)
    expect(filters.openCases).toBe("open")
    expect(filters.sorting).toEqual({
      dataIndex: "last_updated",
      order: "DESCEND",
    })
    expect(filters.theme).toBe("Kamerverhuur")
  })

  it("ignores a sorting it does not know", () => {
    const filters = parseCasesFilters(new URLSearchParams("sorteer=-kleur"))

    expect(filters.sorting).toEqual(defaultCasesFilters.sorting)
  })
})
