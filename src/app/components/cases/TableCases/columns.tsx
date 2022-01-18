import { DateDisplay, isDate } from "@amsterdam/wonen-ui"
import TableAction from "app/components/shared/TableAction/TableAction"
import to from "app/routing/utils/to"

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

const columns = (sorting: any) => [
  {
    header: "Adres",
    dataIndex: "address.full_address",
    sorter: (a: any, b: any) => a?.address?.full_address.localeCompare(b?.address?.full_address),
    sortOrder: sorting.dataIndex === "address.full_address" && sorting.order,
    minWidth: 300
  }, {
    header: "Status",
    dataIndex: "current_states",
    /*
     ** At the moment current_states can not be sorted in the BE.
     ** For now the sorter is disabled.
     */
    // sorter: (a: any, b: any) => {
    //   const aValue = getStatus(a)
    //   const bValue = getStatus(b)
    //   return aValue.localeCompare(bValue)
    // },
    minWidth: 100,
    render: (current_states: any, record: any) => getStatus(record)
  }, {
    header: "Laatst gewijzigd",
    dataIndex: "last_updated",
    sorter: (a: any, b: any) => new Date(a.last_updated).getTime() - new Date(b.last_updated).getTime(),
    defaultSortOrder: "DESCEND" as const,
    sortOrder: sorting.dataIndex === "last_updated" && sorting.order,
    minWidth: 100,
    render: (text: any) => <DateDisplay date={ text } emptyText="-" />
  }, {
    dataIndex: "id",
    minWidth: 140,
    render: (id: any) => <TableAction to={ to("/zaken/:id", { id }) }>Zaakdetails</TableAction>
  }
]

export default columns
