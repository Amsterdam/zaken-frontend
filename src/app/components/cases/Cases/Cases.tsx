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
  "current_states": "current_states"
}
type dataType = {
  results?: Components.Schemas.Case[]
  count?: number
}
type Sorting = {
  dataIndex: string
  order: "ASCEND" | "DESCEND"
}

const parseDate = (value: string | null) => {
  const options = Object.keys(createOptions())
  return value !== null && options.includes(value) ? value : getDate()[0]
}

const Cases: React.FC = () => {
  const [data, setData] = useState<dataType>({})
  const [page, setPage] = useURLState("page")
  const [theme, setTheme] = useURLState("theme")
  const [ordering, setOrdering] = useURLState("ordering")
  const [date, setDate] = useURLState("from_start_date", parseDate, true)
  const [caseThemes] = useCaseThemes()
  console.log("PAGE", page)
  const [dataSource, { isBusy }] = useCases(
    Number(page) || 1,
    PAGE_SIZE,
    theme,
    date,
    ordering
  )
  const [hasPermission] = useHasPermission(SENSITIVE_CASE_PERMISSION)

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

  // Filter cases for sensitive. TODO: implement filter in BE
  let sensitiveData = undefined
  if (hasPermission) {
    sensitiveData = data
  } else {
    const results = data?.results?.filter(e => e.sensitive === false)
    sensitiveData = {
      results,
      count: results?.length
    }
  }

  const resetPage = () => {
    setPage("1")
  }

  const onChangeTheme = (item: string) => {
    resetPage()
    setTheme(item)
  }

  // /cases?open_status=4&open_status=2&ordering=-id,adress
  const setSortingAsOrdering = (sorting: Sorting) => {
    console.log("sorter2", sorting)
    let value = dataIndexMapping[sorting.dataIndex]
    if (sorting.order === sortingOrder.ASCEND) {
      value = `-${ value }`
    }
    setOrdering(value)
  }

  const onChangeTable = (pagination: any, sorting: any) => {
    setPage(pagination.page)
    setSortingAsOrdering(sorting)
  }

  return (
    <Row>
      <Column spanLarge={ 72 }>
        <TableCases
          data={ sensitiveData }
          isBusy={ isBusy }
          onChange={onChangeTable}
          pagination={{
            page: Number(page),
            pageSize: PAGE_SIZE,
            collectionSize: data?.count || 1
          }}
        />
      </Column>
      <Column spanLarge={ 28 }>
        <CasesFilter
          date={ date }
          setDate={ setDate }
          theme={ theme }
          themes={ caseThemes?.results }
          setTheme={ onChangeTheme }
        />
      </Column>
    </Row>
  )
}
export default Cases
