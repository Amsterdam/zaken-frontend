import { useEffect, useContext } from "react"
import styled from "styled-components"
import TableCases from "app/components/cases/TableCases/TableCases"
import CasesFilter from "app/components/cases/CasesFilter/CasesFilter"
import { useCases, useCaseThemes } from "app/state/rest"
import useHasPermission, { SENSITIVE_CASE_PERMISSION } from "app/state/rest/custom/usePermissions/useHasPermission"
import { ContextValues } from "app/state/context/ValueProvider"

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
    results, count, pagination, sorting, fromStartDate, theme, updateContextCases
  } = useContext(ContextValues)["cases"]
  const [caseThemes] = useCaseThemes()
  const [hasPermission] = useHasPermission([SENSITIVE_CASE_PERMISSION])
  const [dataSource, { isBusy }] = useCases(
    hasPermission,
    pagination,
    sorting,
    theme,
    fromStartDate
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

  const onChangeFilter = (key: string, item: string) => {
    updateContextCases({
      [key]: item,
      pagination: {
        ...pagination,
        page: 1
      }
    })
  }

  const onChangePageSize = (pageSize: string) => {
    updateContextCases({
      pagination: {
        ...pagination,
        pageSize: parseInt(pageSize)
      }
    })
  }

  const onChangeTable = (pagination: TABLE.Schemas.Pagination, sorting: TABLE.Schemas.Sorting) => {
    updateContextCases({ pagination, sorting })
  }

  const themes = caseThemes?.results || []
  const underminingId = themes.find((e) => e.name === UNDERMINING)?.id
  const emptyPlaceholder = hasPermission === false && theme === underminingId?.toString()
    ? EMPTY_TEXT_NO_PERMISSION : EMPTY_TEXT

  return (
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
        />
      </FilterContainer>
    </Container>
  )
}

export default Cases
