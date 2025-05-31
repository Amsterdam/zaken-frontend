import { useEffect, useContext } from "react"
import { Heading } from "@amsterdam/asc-ui"
import TableCases from "app/components/cases/TableCases/TableCases"
import CasesFilter from "app/components/cases/CasesFilter/CasesFilter"
import {
  useCases, useCaseThemes, useTasksReasons, useDistricts,
  useCorporations, useSubjects, useProjects, useTags
} from "app/state/rest"
import useHasPermission, { SENSITIVE_CASE_PERMISSION } from "app/state/rest/custom/usePermissions/useHasPermission"
import { ContextValues } from "app/state/context/ValueProvider"
import { RowWithColumn } from "app/components/layouts/Grid"
import getThemeId from "app/components/tasks/utils/getThemeId"
import SearchBarCases from "app/components/cases/SearchBarCases/SearchBarCases"
import styles from "./Cases.module.css"

type Item = string | Components.Schemas.District["name"][]

const EMPTY_TEXT_NO_PERMISSION = "Helaas, u bent niet geautoriseerd om deze zaken te bekijken."
const EMPTY_TEXT = "Er zijn momenteel geen open zaken voor de gekozen filters."
const ONDERMIJNING = "Ondermijning"

const Cases: React.FC = () => {
  const {
    count, districtNames, fromStartDate, housingCorporations, openCases, pagination, projects,
    reason, results, sorting, streetName, subjects, tags, theme, updateContextCases
  } = useContext(ContextValues)["cases"]
  const [hasPermission] = useHasPermission([SENSITIVE_CASE_PERMISSION])
  const [caseThemes] = useCaseThemes()
  const [reasons] = useTasksReasons(theme)
  const themeId = getThemeId(caseThemes?.results, theme)
  const [projectsTheme] = useProjects(themeId)
  const [subjectsTheme] = useSubjects(themeId)
  const [tagsTheme] = useTags(themeId)
  const [caseDistricts] = useDistricts()
  const [corporationData] = useCorporations()
  const [dataSource, { isBusy }] = useCases(
    hasPermission,
    pagination,
    sorting,
    theme,
    fromStartDate,
    openCases,
    projects,
    reason,
    streetName,
    subjects,
    tags,
    districtNames,
    housingCorporations
  )

  useEffect(() => {
    updateContextCases(dataSource ?? { results: [], count: 0 })
  }, [dataSource, updateContextCases])

  const onChangeFilter = (key: string, item: Item) => {
    const casesContextItem = {
      [key]: item,
      pagination: {
        ...pagination,
        page: 1
      }
    }

    /*
     ** When theme is set we need to reset the selection for reason and
     ** housingCorporations to avoid a stale selection:
     */
    if (key === "theme") {
      casesContextItem.reason = ""
      casesContextItem.projects = []
      casesContextItem.subjects = []
      casesContextItem.tags = []
    }
    updateContextCases(casesContextItem)
  }

  const onChangePageSize = (pageSize: string) => {
    updateContextCases({
      pagination: {
        ...pagination,
        pageSize: parseInt(pageSize),
        page: 1
      }
    })
  }

  const onChangeTable = (pagination: TABLE.Schemas.Pagination, sorting: TABLE.Schemas.Sorting) => {
    updateContextCases({ pagination, sorting })
  }

  const themes = caseThemes?.results || []
  const underminingId = themes.find((e) => e.name === ONDERMIJNING)?.id
  const districts = caseDistricts?.results || []
  const emptyPlaceholder = hasPermission === false && theme === underminingId?.toString()
    ? EMPTY_TEXT_NO_PERMISSION : EMPTY_TEXT

  return (
    <div className={styles.Test}>
      <RowWithColumn bottomSpacing={6}>
        <Heading>Zakenoverzicht ({count})</Heading>
      </RowWithColumn>
      <RowWithColumn bottomSpacing={6}>
        <SearchBarCases
          onChange={(value: string) => onChangeFilter("streetName", value)}
          searchString={streetName}
      />
      </RowWithColumn>
      <div className={styles.Grid}>
        <TableCases
          data={results || []}
          isBusy={isBusy}
          onChange={onChangeTable}
          pagination={{
            page: pagination.page,
            pageSize: pagination.pageSize,
            collectionSize: count || 1
          }}
          sorting={sorting}
          emptyPlaceholder={emptyPlaceholder}
        />
        <div className={styles.Filter}>
          <CasesFilter
            date={fromStartDate}
            corporations={corporationData?.results}
            districts={districts}
            districtNames={districtNames}
            pageSize={pagination.pageSize?.toString() || "10"}
            openCases={openCases}
            projects={projectsTheme?.results}
            reason={reason}
            reasons={reasons}
            selectedCorporations={housingCorporations}
            selectedProjects={projects}
            selectedSubjects={subjects}
            selectedTags={tags}
            setDate={(value: string) => onChangeFilter("fromStartDate", value)}
            setDistrictNames={(value: Components.Schemas.District["name"][]) => onChangeFilter("districtNames", value)}
            setPageSize={onChangePageSize}
            setOpenCases={(value: string) => onChangeFilter("openCases", value)}
            setReason={(value: string) => onChangeFilter("reason", value)}
            setSelectedCorporations={(value: string[]) => onChangeFilter("housingCorporations", value)}
            setSelectedProjects={(value: string[]) => onChangeFilter("projects", value)}
            setSelectedSubjects={(value: string[]) => onChangeFilter("subjects", value)}
            setSelectedTags={(value: string[]) => onChangeFilter("tags", value)}
            setTheme={(value: string) => onChangeFilter("theme", value)}
            subjects={subjectsTheme?.results}
            tags={tagsTheme?.results}
            theme={theme}
            themes={themes}
          />
        </div>
      </div>
    </div>
  )
}

export default Cases
