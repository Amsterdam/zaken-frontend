import { useState } from "react"
import { Button } from "@amsterdam/design-system-react"
import { CloseIcon, FilterIcon } from "@amsterdam/design-system-react-icons"
import dayjs from "dayjs"
import { MultiSelectFilter } from "@/components/filters/MultiSelectFilter"
import { type Option, SelectFilter } from "@/components/filters/SelectFilter"
import filterStyles from "@/components/filters/filters.module.css"
import { initialState } from "@/app/state/context/initialState"
import CasesSorting from "../CasesSorting/CasesSorting"
import SearchBarCases from "../SearchBarCases/SearchBarCases"
import { useFilterHandler } from "./useFilterHandler"

type NamedOption = { id?: number | string; name: string }

type Props = {
  date: string
  corporations?: components["schemas"]["HousingCorporation"][]
  corporationIsNull: boolean
  districts: components["schemas"]["District"][]
  districtNames: components["schemas"]["District"]["name"][]
  openCases: string
  pageSize: string
  projects?: components["schemas"]["CaseProject"][]
  reason: string
  searchString: string
  sorting: TABLE.Schemas.Sorting
  // The API returns the names of the reasons.
  reasons?: (string | { name: string })[]
  selectedCorporations: string[]
  selectedProjects: string[]
  selectedSubjects: string[]
  selectedTags: string[]
  subjects?: components["schemas"]["Subject"][]
  tags?: components["schemas"]["Tag"][]
  theme: string
  themes: components["schemas"]["CaseTheme"][]
}

const DATE_FORMAT = "YYYY-MM-DD"
const daysAgo = (days: number) =>
  dayjs().subtract(days, "days").format(DATE_FORMAT)

const getDateOptions = (): Option[] => [
  { value: "", label: "Alle" },
  { value: daysAgo(0), label: "Vandaag" },
  { value: daysAgo(1), label: "Gisteren" },
  { value: daysAgo(7), label: "Laatste 7 dagen" },
  { value: daysAgo(30), label: "Laatste 30 dagen" },
]

const openCasesOptions: Option[] = [
  { value: "open", label: "Open zaken" },
  { value: "closed", label: "Gesloten zaken" },
  { value: "all", label: "Alle zaken" },
]

const pageSizeOptions: Option[] = ["10", "25", "100"].map((size) => ({
  value: size,
  label: size,
}))

const byName = (options: { name: string }[] = []): Option[] =>
  options.map(({ name }) => ({ value: name, label: name }))

const byId = (options: NamedOption[] = []): Option[] =>
  options.map(({ id, name }) => ({ value: String(id), label: name }))

// The option for cases on an address without a housing corporation.
const NO_CORPORATION = "none"
const noCorporationOption: Option = {
  value: NO_CORPORATION,
  label: "Zonder corporatie",
}

const defaults = initialState.cases

/**
 * The search, the sorting and the filters of the cases overview, in one
 * wrapping row above the table (after zwd-frontend). A filter applies as soon
 * as you change it. The less used ones are behind
 * "Alle filters".
 */
const CasesFilter: React.FC<Props> = ({
  corporations,
  corporationIsNull,
  date,
  districtNames,
  districts,
  openCases,
  pageSize,
  projects,
  reason,
  reasons,
  searchString,
  sorting,
  selectedCorporations,
  selectedProjects,
  selectedSubjects,
  selectedTags,
  subjects,
  tags,
  theme,
  themes,
}) => {
  const {
    onChangeFilter,
    onChangeCorporations,
    onChangePageSize,
    onChangeSorting,
    onResetFilters,
  } = useFilterHandler()

  // Choosing "Zonder corporatie" drops the corporations, and the other way around.
  const onChangeCorporationFilter = (value: string[]) => {
    const choseNoCorporation =
      value.includes(NO_CORPORATION) && !corporationIsNull
    onChangeCorporations(
      choseNoCorporation ? [] : value.filter((id) => id !== NO_CORPORATION),
      choseNoCorporation,
    )
  }

  const hasMoreFiltersActive =
    date !== defaults.fromStartDate ||
    corporationIsNull !== defaults.housingCorporationIsNull ||
    selectedCorporations.length > 0 ||
    selectedProjects.length > 0 ||
    selectedSubjects.length > 0 ||
    selectedTags.length > 0 ||
    openCases !== defaults.openCases
  const hasFiltersActive =
    hasMoreFiltersActive ||
    theme !== defaults.theme ||
    reason !== defaults.reason ||
    searchString !== defaults.addressSearch ||
    districtNames.length > 0

  const [showAllFilters, setShowAllFilters] = useState(hasMoreFiltersActive)
  // The search field keeps what you type itself; a new key empties it.
  const [resetCount, setResetCount] = useState(0)

  const onClickReset = () => {
    onResetFilters()
    setResetCount((count) => count + 1)
  }

  // Projects, subjects and tags belong to a theme: no theme, no options.
  const themeFilters = [
    {
      key: "projects",
      label: "Projecten",
      options: projects,
      selected: selectedProjects,
    },
    {
      key: "subjects",
      label: "Onderwerpen",
      options: subjects,
      selected: selectedSubjects,
    },
    { key: "tags", label: "Tags", options: tags, selected: selectedTags },
  ].filter(({ options }) => options !== undefined && options.length > 0)

  return (
    <div className={filterStyles.filters}>
      <SearchBarCases key={resetCount} searchString={searchString} />
      <SelectFilter
        label="Thema"
        options={[{ value: "", label: "Alle" }, ...byName(themes)]}
        value={theme}
        onChange={(value) => onChangeFilter("theme", value)}
      />
      <SelectFilter
        label="Aanleiding"
        options={[
          { value: "", label: "Alle" },
          ...byName(
            reasons?.map((item) =>
              typeof item === "string" ? { name: item } : item,
            ),
          ),
        ]}
        value={reason}
        disabled={reasons === undefined}
        onChange={(value) => onChangeFilter("reason", value)}
      />
      <MultiSelectFilter
        label="Stadsdelen"
        options={byName(districts)}
        value={districtNames}
        onChange={(value) => onChangeFilter("districtNames", value)}
      />
      {showAllFilters && (
        <>
          {themeFilters.map(({ key, label, options, selected }) => (
            <MultiSelectFilter
              key={key}
              label={label}
              options={byId(options)}
              value={selected}
              onChange={(value) => onChangeFilter(key, value)}
            />
          ))}
          <MultiSelectFilter
            label="Corporaties"
            options={[noCorporationOption, ...byId(corporations)]}
            value={corporationIsNull ? [NO_CORPORATION] : selectedCorporations}
            onChange={onChangeCorporationFilter}
          />
          <SelectFilter
            label="Startdatum"
            options={getDateOptions()}
            value={date}
            onChange={(value) => onChangeFilter("fromStartDate", value)}
          />
          <SelectFilter
            label="Toon zaken"
            options={openCasesOptions}
            value={openCases}
            onChange={(value) => onChangeFilter("openCases", value)}
          />
        </>
      )}
      {/* The settings of the view come after the filters. */}
      <CasesSorting sorting={sorting} onChange={onChangeSorting} />
      <SelectFilter
        label="Items per pagina"
        options={pageSizeOptions}
        value={pageSize}
        onChange={onChangePageSize}
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
          onClick={onClickReset}
        >
          Wis alle filters
        </Button>
      )}
    </div>
  )
}

export default CasesFilter
