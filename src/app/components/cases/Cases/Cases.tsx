import { useEffect, useState } from "react"
import { Row, Column } from "app/components/layouts/Grid"
import TableCases from "app/components/cases/TableCases/TableCases"
import CasesFilter from "app/components/cases/CasesFilter/CasesFilter"
import { getDate, createOptions } from "app/components/cases/CasesFilter/scaffoldDate"
import { useCases, useCaseThemes } from "app/state/rest"
import useURLState from "app/hooks/useURLState/useURLState"
import useHasPermission, { SENSITIVE_CASE_PERMISSION } from "app/state/rest/custom/usePermissions/useHasPermission"

const PAGE_SIZE = 10
const sortingOrder = {
  ASCEND: "ASCEND",
  DESCEND: "DESCEND"
}
const dataIndexMapping: any = {
  "address.full_address": "address__street_name",
  "last_updated": "last_updated"
}
type dataType = {
  results?: Components.Schemas.Case[]
  count?: number
}
type Sorting = {
  dataIndex?: string
  order?: "ASCEND" | "DESCEND"
}

const EMPTY_TEXT_NO_PERMISSION = "Helaas, u bent niet geautoriseerd om deze zaken te bekijken."
const EMPTY_TEXT = "Er zijn momenteel geen open zaken voor de gekozen filters."
const UNDERMINING = "Ondermijning"

const parseDate = (value: string | null) => {
  const options = Object.keys(createOptions())
  return value !== null && options.includes(value) ? value : getDate()[0]
}

const Cases: React.FC = () => {
  const [data, setData] = useState<dataType>({})
  const [page, setPage] = useURLState("page", "1")
  const [theme, setTheme] = useURLState("theme")
  const [ordering, setOrdering] = useURLState("ordering", "last_updated")
  const [sortedInfo, setSortedInfo] = useState<Sorting>({})
  const [date, setDate] = useURLState("from_start_date", "", parseDate, true)
  const [caseThemes] = useCaseThemes()
  const [hasPermission] = useHasPermission(SENSITIVE_CASE_PERMISSION)
  const [dataSource, { isBusy }] = useCases(
    Number(page) || 1,
    PAGE_SIZE,
    theme,
    hasPermission,
    date,
    ordering
  )

  useEffect(() => {
    if (dataSource === undefined) {
      setData({
        results: [],
        count: 0
      })
    } else {
      setData(dataSource)
    }
  }, [dataSource])

  const resetPage = () => {
    setPage("1")
  }

  const onChangeTheme = (item: string) => {
    resetPage()
    setTheme(item)
  }

  // /cases?open_status=4&open_status=2&ordering=-id,adress
  const setSortingAsOrdering = (sorting: Sorting) => {
    let value = ""
    if (sorting?.dataIndex) {
      value = dataIndexMapping[sorting.dataIndex]
    }
    if (sorting.order === sortingOrder.DESCEND) {
      value = `-${ value }`
    }
    setSortedInfo(sorting)
    setOrdering(value)
  }

  const onChangeTable = (pagination: any, sorting: any) => {
    console.log("pagination", pagination)
    setPage(pagination.page.toString())
    setSortingAsOrdering(sorting)
  }

  const themes = caseThemes?.results || []
  const underminingId = themes.find((e) => e.name === UNDERMINING)?.id
  const emptyPlaceholder = hasPermission === false && theme === underminingId?.toString()
    ? EMPTY_TEXT_NO_PERMISSION : EMPTY_TEXT

  return (
    <Row>
      <Column spanLarge={ 72 }>
        <TableCases
          data={ data }
          isBusy={ isBusy }
          onChange={onChangeTable}
          pagination={{
            page: Number(page),
            pageSize: PAGE_SIZE,
            collectionSize: data?.count || 1
          }}
          sorting={ sortedInfo }
          emptyPlaceholder={ emptyPlaceholder }
        />
      </Column>
      <Column spanLarge={ 28 }>
        <CasesFilter
          date={ date }
          setDate={ setDate }
          theme={ theme }
          themes={ themes }
          setTheme={ onChangeTheme }
        />
      </Column>
    </Row>
  )
}
export default Cases
