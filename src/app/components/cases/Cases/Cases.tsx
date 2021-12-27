import { useEffect, useState } from "react"
import { Pagination } from "@amsterdam/asc-ui"
import { Row, Column } from "app/components/layouts/Grid"
import TableCases from "app/components/cases/TableCases/TableCases"
import CasesFilter from "app/components/cases/CasesFilter/CasesFilter"
import { getDate, createOptions } from "app/components/cases/CasesFilter/scaffoldDate"
import { useCases, useCaseThemes } from "app/state/rest"
import useURLState from "app/hooks/useURLState/useURLState"
import useHasPermission, { SENSITIVE_CASE_PERMISSION } from "app/state/rest/custom/usePermissions/useHasPermission"

const PAGE_SIZE = 10
type dataType = {
  results?: Components.Schemas.Case[]
  count?: number
}

const parseDate = (value: string | null) => {
  const options = Object.keys(createOptions())
  return value !== null && options.includes(value) ? value : getDate()[0]
}

const Cases: React.FC = () => {
  const [data, setData] = useState<dataType>({})
  // const [page, setPage] = useURLState("page")
  const [page, setPage] = useState(1)
  const [theme, setTheme] = useURLState("theme")
  const [date, setDate] = useURLState("from_start_date", parseDate, true)
  const [caseThemes] = useCaseThemes()
  const [dataSource, { isBusy }] = useCases(
    Number(page) || 1,
    PAGE_SIZE,
    theme,
    date
  )
  const [hasPermission] = useHasPermission(SENSITIVE_CASE_PERMISSION)

  useEffect(() => {
    // dataSource can be undefined and therefore pagination will dissapear.
    setTimeout(() => {
      setPage(5)
    }, 10000)
    if (dataSource !== undefined) {
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
    setPage(1)
  }

  const onChangeTheme = (item: string) => {
    resetPage()
    setTheme(item)
  }

  const onChangeTable = (pagination: any, sorting: any) => {
    console.log("pagination", pagination)
    // console.log("sorter", sorting)
    setPage(pagination.page)
  }

  console.log("PAGE", page)
  return (
    <Row>
      <Column spanLarge={ 72 }>
        <TableCases
          data={ sensitiveData }
          isBusy={ isBusy }
          onChange={onChangeTable}
          pagination={{
            page,
            pageSize: PAGE_SIZE,
            collectionSize: data?.count || 1
          }}
        />
        <Pagination
          page={page}
          pageSize={PAGE_SIZE}
          collectionSize={data?.count || 1}
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
