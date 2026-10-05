import {
  defaultTasksFilters,
  parseTasksFilters,
  serializeTasksFilters,
} from "../useTasksFilters"

describe("the filters of the tasks overview in the URL", () => {
  it("has an empty URL for the defaults", () => {
    expect(serializeTasksFilters(defaultTasksFilters).toString()).toBe("")
    expect(parseTasksFilters(new URLSearchParams())).toEqual(
      defaultTasksFilters,
    )
  })

  it("reads back what it wrote", () => {
    const filters = {
      districtNames: ["Centrum", "Noord"],
      housingCorporations: ["7"],
      housingCorporationIsNull: true,
      owners: ["abc-123"],
      pagination: { page: 3, pageSize: 100 },
      projects: ["3"],
      reason: "Project",
      role: "Toezichthouder",
      sorting: { dataIndex: "name", order: "DESCEND" as const },
      subjects: ["4"],
      tags: ["6"],
      taskNames: ["Huisbezoek inplannen"],
      theme: "Vakantieverhuur",
    }

    const params = serializeTasksFilters(filters)

    expect(params.toString()).toBe(
      "aanleiding=Project&thema=Vakantieverhuur&stadsdeel=Centrum&stadsdeel=Noord" +
        "&corporatie=7&toegewezen=abc-123&project=3&onderwerp=4&tag=6" +
        "&taak=Huisbezoek+inplannen&zonderCorporatie=ja&rol=Toezichthouder" +
        "&pagina=3&perPagina=100&sorteer=-taak",
    )
    expect(parseTasksFilters(params)).toEqual(filters)
  })

  it("tells 'all roles' apart from 'no role chosen yet'", () => {
    expect(parseTasksFilters(new URLSearchParams()).role).toBeUndefined()

    const params = serializeTasksFilters({ ...defaultTasksFilters, role: "" })

    expect(params.toString()).toBe("rol=alle")
    expect(parseTasksFilters(params).role).toBe("")
  })
})
