import { useEffect, useContext } from "react"
import styled from "styled-components"
import { Heading } from "@amsterdam/asc-ui"
import TableCases from "app/components/cases/TableCases/TableCases"
import CasesFilter from "app/components/cases/CasesFilter/CasesFilter"
import { useCases, useCaseThemes, useTasksReasons, useDistricts } from "app/state/rest"
import useHasPermission, { SENSITIVE_CASE_PERMISSION } from "app/state/rest/custom/usePermissions/useHasPermission"
import { ContextValues } from "app/state/context/ValueProvider"
import { RowWithColumn } from "app/components/layouts/Grid"

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
  max-width: 400px
`

const EMPTY_TEXT_NO_PERMISSION = "Helaas, u bent niet geautoriseerd om deze zaken te bekijken."
const EMPTY_TEXT = "Er zijn momenteel geen open zaken voor de gekozen filters."
const UNDERMINING = "Ondermijning"

const Cases: React.FC = () => {
  const {
    results, count, pagination, sorting, fromStartDate, theme,
    updateContextCases, reason, districtNames
  } = useContext(ContextValues)["cases"]
  const [hasPermission] = useHasPermission([SENSITIVE_CASE_PERMISSION])
  const [caseThemes] = useCaseThemes()
  const [reasons] = useTasksReasons(theme)
  const [caseDistricts] = useDistricts()
  const [dataSource, { isBusy }] = useCases(
    hasPermission,
    pagination,
    sorting,
    theme,
    fromStartDate,
    reason,
    districtNames
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
    // When theme is set we need to reset the reason dropdown to avoid a stale selection:
    if (key === "theme") {
      casesContextItem.reason = ""
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
          onChange={onChangeTable}
          pagination={{
            page: pagination.page,
            pageSize: pagination.pageSize,
            collectionSize: count || 1
          }}
          sorting={ sorting }
          emptyPlaceholder={ emptyPlaceholder }
          />
        <FilterContainer>
          <CasesFilter
            date={ fromStartDate }
            setDate={ (value: string) => onChangeFilter("fromStartDate", value) }
            theme={ theme }
            themes={ themes }
            setTheme={ (value: string) => onChangeFilter("theme", value) }
            setPageSize={ onChangePageSize }
            pageSize={ pagination.pageSize?.toString() || "10" }
            reason={ reason }
            setReason={ (value: string) => onChangeFilter("reason", value)}
            reasons={ reasons }
            districts={ districts }
            districtNames={ districtNames }
            setDistrictNames={ (value: Components.Schemas.District["name"][]) => onChangeFilter("districtNames", value)}
          />
        </FilterContainer>
      </Container>
    </>
  )
}

export default Cases
