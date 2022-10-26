import { DateDisplay } from "@amsterdam/wonen-ui"
import DueDate from "app/components/shared/DueDate/DueDate"
import TableAction from "app/components/shared/TableAction/TableAction"
import to from "app/routing/utils/to"
import SelectTask from "./SelectTask/SelectTask"

export default (sorting: any, myId?: string, isEnforcement?: boolean) => ([
  {
    header: "Opgepakt door",
    dataIndex: "owner",
    render: (owner: any, record: any) => (
      <SelectTask taskId={ record.id } taskOwner={ owner } isEnforcement={ !!isEnforcement }/>
    )
  }, {
    header: "Straat",
    dataIndex: "case.address.street_name",
    sorter: (a: any, b: any) => a?.case?.address?.full_address.localeCompare(b?.case?.address?.full_address),
    sortOrder: sorting.dataIndex === "case.address.street_name" && sorting.order,
    minWidth: 200,
    render: (text: any, record: any) => {
      const { number, suffix, suffix_letter } = record.case.address
      return `${ text } ${ number }${ suffix ? "-" : "" }${ suffix || "" }${ suffix_letter ? "-" : "" }${ suffix_letter || "" }`
    }
  }, {
    header: "Postcode",
    dataIndex: "case.address.postal_code",
    sorter: (a: any, b: any) => a?.case?.address?.postal_code.localeCompare(b?.case?.address?.postal_code),
    sortOrder: sorting.dataIndex === "case.address.postal_code" && sorting.order
  }, {
    header: "Open taak",
    dataIndex: "name",
    minWidth: 200,
    sorter: (a: any, b: any) => a?.name?.localeCompare(b?.name),
    sortOrder: sorting.dataIndex === "name" && sorting.order
  }, {
    header: "Startdatum",
    dataIndex: "case.start_date",
    sorter: (a: any, b: any) => new Date(a.case.start_date).getTime() - new Date(b.case.start_date).getTime(),
    sortOrder: sorting.dataIndex === "start_date" && sorting.order,
    minWidth: 100,
    render: (text: any) => <DateDisplay date={ text } emptyText="-" />
  }, {
    header: "Slotdatum",
    dataIndex: "due_date",
    minWidth: 50,
    sorter: (a: any, b: any) => new Date(a?.due_date).getTime() - new Date(b?.due_date).getTime(),
    sortOrder: sorting.dataIndex === "due_date" && sorting.order,
    render: (due_date: any) => <DueDate date={ due_date ?? undefined } emptyText="-" />
  }, {
    dataIndex: "case.id",
    minWidth: 140,
    render: (id: any) => <TableAction to={ to("/zaken/:id", { id }) }>Zaakdetails</TableAction>
  }
])
