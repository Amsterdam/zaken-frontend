import { DateDisplay, isDate } from "@amsterdam/wonen-ui"
import TableAction from "app/components/shared/TableAction/TableAction"
import to from "app/routing/utils/to"
import first from "./utils/first"
import sortByDate from "./utils/sortByDate"

const getStatus = (record: Record<string, any>) => {
  const { current_states, end_date } = record
  if (current_states.length > 0) {
    return current_states.map((status: any) => status.status_name).join(", ")
  }
  if (isDate(end_date)) {
    return "Afgerond"
  }
  return "-"
}

const getDate = (record: Record<string, any>) => {
  const startDate = first(record?.current_states.map((state: any) => state.start_date).sort(sortByDate("DESC")))
  return record.end_date ?? startDate
}

const columns = [
  {
    header: "Adres",
    dataIndex: "address.full_address",
    sorter: (a: any, b: any) => a?.address?.full_address.localeCompare(b?.address?.full_address),
    minWidth: 300
  }, {
    header: "Status",
    dataIndex: "current_states",
    sorter: (a: any, b: any) => {
      const aValue = getStatus(a)
      const bValue = getStatus(b)
      return aValue.localeCompare(bValue)
    },
    minWidth: 100,
    render: (current_states: any, record: any) => getStatus(record)
  }, {
    header: "Laatst gewijzigd",
    dataIndex: "current_states",
    sorter: (a: any, b: any) => {
      const aDate = getDate(a)
      const bDate = getDate(b)
      return new Date(aDate).getTime() - new Date(bDate).getTime()
    },
    defaultSortOrder: "DESCEND" as const,
    minWidth: 100,
    render: (text: any, record: any) => {
      const date = getDate(record)
      return <DateDisplay date={ date } emptyText="-" />
    }
  }, {
    dataIndex: "id",
    minWidth: 140,
    render: (id: any) => <TableAction to={ to("/zaken/:id", { id }) }>Zaakdetails</TableAction>
  }
]

export default columns
