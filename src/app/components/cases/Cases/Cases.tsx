import { useEffect, useContext } from "react"
import styled from "styled-components"
import { Heading } from "@amsterdam/asc-ui"
import TableCases from "app/components/cases/TableCases/TableCases"
import CasesFilter from "app/components/cases/CasesFilter/CasesFilter"
import { useCases, useCaseThemes, useTasksReasons, useDistricts,
  useCorporations, useSubjects
} from "app/state/rest"
import useHasPermission, { SENSITIVE_CASE_PERMISSION } from "app/state/rest/custom/usePermissions/useHasPermission"
import { ContextValues } from "app/state/context/ValueProvider"
import { RowWithColumn } from "app/components/layouts/Grid"
import getThemeId from "app/components/tasks/utils/getThemeId"

type Item = string | Components.Schemas.District["name"][]

const Container = styled.div`
  margin: 0 auto;
  display: grid;
  grid-gap: 1rem;
  @media (min-width: 1600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const FilterContainer = styled.div`
 min-width: 300px;
  max-width: 400px;
`

const EMPTY_TEXT_NO_PERMISSION = "Helaas, u bent niet geautoriseerd om deze zaken te bekijken."
const EMPTY_TEXT = "Er zijn momenteel geen open zaken voor de gekozen filters."
const UNDERMINING = "Ondermijning"

const Cases: React.FC = () => {
  const {
    count, districtNames, fromStartDate, housingCorporations, pagination,
    reason, results, sorting, subjects, theme, updateContextCases
  } = useContext(ContextValues)["cases"]
  const [hasPermission] = useHasPermission([SENSITIVE_CASE_PERMISSION])
  const [caseThemes] = useCaseThemes()
  const [reasons] = useTasksReasons(theme)
  const themeId = getThemeId(caseThemes?.results, theme)
  const [subjectsTheme] = useSubjects(themeId)
  const [caseDistricts] = useDistricts()
  const [corporationData] = useCorporations()
  const [dataSource, { isBusy }] = useCases(
    hasPermission,
    pagination,
    sorting,
    theme,
    fromStartDate,
    reason,
    subjects,
    districtNames,
    housingCorporations
  )

  useEffect(() => {
    if (dataSource === undefined) {
      updateContextCases({
        results: [],
        count: 0
      })
    } else {
      updateContextCases(dataSource)
    }
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
      casesContextItem.housingCorporations = []
      casesContextItem.subjects = []
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
  const underminingId = themes.find((e) => e.name === UNDERMINING)?.id
  const districts = caseDistricts?.results || []
  const emptyPlaceholder = hasPermission === false && theme === underminingId?.toString()
    ? EMPTY_TEXT_NO_PERMISSION : EMPTY_TEXT

  return (
    <>
      <RowWithColumn>
        <Heading>Zakenoverzicht ({ count })</Heading>
      </RowWithColumn>
      <Container>
        <TableCases
          data={ results || [] }
          isBusy={ isBusy }
          onChange={ onChangeTable }
          pagination={ {
            page: pagination.page,
            pageSize: pagination.pageSize,
            collectionSize: count || 1
          } }
          sorting={ sorting }
          emptyPlaceholder={ emptyPlaceholder }
        />
        <FilterContainer>
          <CasesFilter
            date={ fromStartDate }
            corporations={ corporationData?.results }
            districts={ districts }
            districtNames={ districtNames }
            pageSize={ pagination.pageSize?.toString() || "10" }
            reason={ reason }
            reasons={ reasons }
            selectedCorporations={ housingCorporations }
            selectedSubjects={ subjects }
            setDate={ (value: string) => onChangeFilter("fromStartDate", value) }
            setDistrictNames={ (value: Components.Schemas.District["name"][]) => onChangeFilter("districtNames", value) }
            setPageSize={ onChangePageSize }
            setReason={ (value: string) => onChangeFilter("reason", value) }
            setSelectedCorporations={ (value: string[]) => onChangeFilter("housingCorporations", value) }
            setSelectedSubjects={ (value: string[]) => onChangeFilter("subjects", value) }
            setTheme={ (value: string) => onChangeFilter("theme", value) }
            subjects={ subjectsTheme?.results }
            theme={ theme }
            themes={ themes }
          />
        </FilterContainer>
      </Container>
    </>
  )
}

export default Cases
