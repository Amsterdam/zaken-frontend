import { useState } from "react"
import { Button } from "@amsterdam/design-system-react"
import { CloseIcon, FilterIcon } from "@amsterdam/design-system-react-icons"
import { MultiSelectFilter } from "@/components/filters/MultiSelectFilter"
import { type Option, SelectFilter } from "@/components/filters/SelectFilter"
import filterStyles from "@/components/filters/filters.module.css"
import {
  defaultTasksFilters as defaults,
  type TasksFilters,
  useTasksFilters,
} from "../useTasksFilters"

type NamedOption = { id?: number | string; name: string }

type Props = {
  corporations?: components["schemas"]["HousingCorporation"][]
  districts: components["schemas"]["District"][]
  /** Your own role: the role filter starts with it. */
  myRole?: string
  projects?: components["schemas"]["CaseProject"][]
  // The API returns the names of the reasons.
  reasons?: (string | { name: string })[]
  roles?: string[]
  subjects?: components["schemas"]["Subject"][]
  tags?: components["schemas"]["Tag"][]
  taskNames?: components["schemas"]["CaseUserTaskTaskName"][]
  taskOwners?: NamedOption[]
  themes?: components["schemas"]["CaseTheme"][]
}

// The API can sort on these fields.
const sortOptions: { label: string; sorting: TasksFilters["sorting"] }[] = [
  {
    label: "Slotdatum oud-nieuw",
    sorting: { dataIndex: "due_date", order: "ASCEND" },
  },
  {
    label: "Slotdatum nieuw-oud",
    sorting: { dataIndex: "due_date", order: "DESCEND" },
  },
  {
    label: "Startdatum nieuw-oud",
    sorting: { dataIndex: "case.start_date", order: "DESCEND" },
  },
  {
    label: "Startdatum oud-nieuw",
    sorting: { dataIndex: "case.start_date", order: "ASCEND" },
  },
  {
    label: "Straat A-Z",
    sorting: { dataIndex: "case.address.street_name", order: "ASCEND" },
  },
  {
    label: "Straat Z-A",
    sorting: { dataIndex: "case.address.street_name", order: "DESCEND" },
  },
  {
    label: "Postcode oplopend",
    sorting: { dataIndex: "case.address.postal_code", order: "ASCEND" },
  },
  {
    label: "Postcode aflopend",
    sorting: { dataIndex: "case.address.postal_code", order: "DESCEND" },
  },
  { label: "Taak A-Z", sorting: { dataIndex: "name", order: "ASCEND" } },
  { label: "Taak Z-A", sorting: { dataIndex: "name", order: "DESCEND" } },
]
const sortValue = ({ dataIndex, order }: TasksFilters["sorting"]) =>
  `${dataIndex}:${order}`

const pageSizeOptions: Option[] = ["10", "25", "100"].map((size) => ({
  value: size,
  label: size,
}))

const all: Option = { value: "", label: "Alle" }

const byName = (options: { name: string }[] = []): Option[] =>
  options.map(({ name }) => ({ value: name, label: name }))

const byId = (options: NamedOption[] = []): Option[] =>
  options.map(({ id, name }) => ({ value: String(id), label: name }))

// The option for tasks on an address without a housing corporation.
const NO_CORPORATION = "none"
const noCorporationOption: Option = {
  value: NO_CORPORATION,
  label: "Zonder corporatie",
}

const CHOOSE_THEME = "Kies eerst een thema"

const firstPage = ({ pagination }: TasksFilters) => ({
  pagination: { ...pagination, page: 1 },
})

/**
 * The filters and the sorting of the tasks overview, in one wrapping row
 * above the tables (like the cases overview). A filter applies as soon as you
 * change it. The less used ones are behind "Alle filters".
 */
const TasksFilter: React.FC<Props> = ({
  corporations,
  districts,
  myRole = "",
  projects,
  reasons,
  roles,
  subjects,
  tags,
  taskNames,
  taskOwners,
  themes,
}) => {
  const { filters, update } = useTasksFilters()
  const role = filters.role ?? myRole

  const onChangeFilter = (
    key: keyof TasksFilters,
    item: string | string[] | boolean,
  ) =>
    update((current) => ({
      [key]: item,
      ...firstPage(current),
      // The task names depend on the role and the theme.
      ...((key === "role" || key === "theme") && { taskNames: [] }),
      // The filters that depend on the theme.
      ...(key === "theme" && {
        reason: "",
        projects: [],
        subjects: [],
        tags: [],
      }),
    }))

  // Choosing "Zonder corporatie" drops the corporations, and the other way
  // around: the API combines them with "and", which never matches.
  const onChangeCorporationFilter = (value: string[]) => {
    const choseNoCorporation =
      value.includes(NO_CORPORATION) && !filters.housingCorporationIsNull
    update((current) => ({
      housingCorporations: choseNoCorporation
        ? []
        : value.filter((id) => id !== NO_CORPORATION),
      housingCorporationIsNull: choseNoCorporation,
      ...firstPage(current),
    }))
  }

  // Back to the defaults (your own role); the sorting and the page size stay.
  const onResetFilters = () =>
    update(({ sorting, pagination }) => ({
      ...defaults,
      sorting,
      pagination: { ...pagination, page: 1 },
    }))

  const hasMoreFiltersActive =
    filters.reason !== defaults.reason ||
    filters.housingCorporationIsNull ||
    filters.housingCorporations.length > 0 ||
    filters.projects.length > 0 ||
    filters.subjects.length > 0 ||
    filters.tags.length > 0
  const hasFiltersActive =
    hasMoreFiltersActive ||
    filters.theme !== defaults.theme ||
    role !== myRole ||
    filters.owners.length > 0 ||
    filters.taskNames.length > 0 ||
    filters.districtNames.length > 0

  const [showAllFilters, setShowAllFilters] = useState(hasMoreFiltersActive)

  // Projects, subjects and tags belong to a theme: without a theme they are
  // shown, but there is nothing to choose yet.
  const themeFilters = [
    { key: "projects", label: "Projecten", options: projects },
    { key: "subjects", label: "Onderwerpen", options: subjects },
    { key: "tags", label: "Tags", options: tags },
  ] as const

  return (
    <div className={filterStyles.filters}>
      <MultiSelectFilter
        label="Toegewezen aan"
        options={byId(taskOwners)}
        value={filters.owners}
        onChange={(value) => onChangeFilter("owners", value)}
      />
      <SelectFilter
        label="Thema"
        options={[all, ...byName(themes)]}
        value={filters.theme}
        disabled={themes === undefined}
        onChange={(value) => onChangeFilter("theme", value)}
      />
      <SelectFilter
        label="Rol"
        options={[
          all,
          ...(roles ?? []).map((name) => ({ value: name, label: name })),
        ]}
        value={role}
        disabled={roles === undefined}
        onChange={(value) => onChangeFilter("role", value)}
      />
      <MultiSelectFilter
        label="Taken"
        options={byName(taskNames)}
        value={filters.taskNames}
        onChange={(value) => onChangeFilter("taskNames", value)}
      />
      <MultiSelectFilter
        label="Stadsdelen"
        options={byName(districts)}
        value={filters.districtNames}
        onChange={(value) => onChangeFilter("districtNames", value)}
      />
      {showAllFilters && (
        <>
          <SelectFilter
            label="Aanleiding"
            options={[
              all,
              ...byName(
                reasons?.map((item) =>
                  typeof item === "string" ? { name: item } : item,
                ),
              ),
            ]}
            value={filters.reason}
            disabled={reasons === undefined}
            onChange={(value) => onChangeFilter("reason", value)}
          />
          {themeFilters.map(({ key, label, options }) => (
            <MultiSelectFilter
              key={key}
              label={label}
              options={byId(options)}
              value={filters[key]}
              disabled={filters.theme === ""}
              placeholder={filters.theme === "" ? CHOOSE_THEME : undefined}
              onChange={(value) => onChangeFilter(key, value)}
            />
          ))}
          <MultiSelectFilter
            label="Corporaties"
            options={[noCorporationOption, ...byId(corporations)]}
            value={
              filters.housingCorporationIsNull
                ? [NO_CORPORATION]
                : filters.housingCorporations
            }
            onChange={onChangeCorporationFilter}
          />
        </>
      )}
      {/* The settings of the view come after the filters. */}
      <SelectFilter
        label="Sorteren op"
        options={sortOptions.map(({ label, sorting }) => ({
          label,
          value: sortValue(sorting),
        }))}
        value={sortValue(filters.sorting)}
        onChange={(value) => {
          const option = sortOptions.find(
            ({ sorting }) => sortValue(sorting) === value,
          )
          if (option) {
            update((current) => ({
              sorting: option.sorting,
              ...firstPage(current),
            }))
          }
        }}
      />
      <SelectFilter
        label="Items per pagina"
        options={pageSizeOptions}
        value={String(filters.pagination.pageSize)}
        onChange={(pageSize) =>
          update({ pagination: { page: 1, pageSize: parseInt(pageSize) } })
        }
      />
      {!showAllFilters && (
        <Button
          className={filterStyles.alignBottom}
          icon={FilterIcon}
          iconBefore
          onClick={() => setShowAllFilters(true)}
        >
          Alle filters
        </Button>
      )}
      {hasFiltersActive && (
        <Button
          className={filterStyles.alignBottom}
          icon={CloseIcon}
          iconBefore
          onClick={onResetFilters}
        >
          Wis alle filters
        </Button>
      )}
    </div>
  )
}

export default TasksFilter
