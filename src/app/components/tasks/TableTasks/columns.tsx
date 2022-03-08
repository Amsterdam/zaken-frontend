import DueDate from "app/components/shared/DueDate/DueDate"
import TableAction from "app/components/shared/TableAction/TableAction"
import to from "app/routing/utils/to"
import SelectTask from "./SelectTask/SelectTask"

// If user is owner, move item to top.
// const sortUserUp = (a: any, b: any, myId: string) => {
//   if (a.owner === myId && b.owner === myId) {
//     // If a and b both have the user id, sort by ascending due date.
//     return new Date(a?.due_date).getTime() - new Date(b?.due_date).getTime()
//   }
//   if (a.owner === myId) {
//     return -1
//   }
//   if (b.owner === myId) return 1
//   return a?.owner?.localeCompare(b?.owner)
// }

// const sortOwners = (a: any, b: any) => myId ? sortUserUp(a, b, myId) : a?.localeCompare(b)

export default (sorting: any, myId?: string) => ([
  {
    header: "Opgepakt door",
    dataIndex: "owner",
    // sorter: sortOwners,
    // sortOrder: sorting.dataIndex === "owner" && sorting.order,
    render: (owner: any, record: any) => <SelectTask taskId={ record.id } taskOwner={ owner }/>
  }, {
    header: "Adres",
    dataIndex: "case.address.full_address",
    minWidth: 150,
    sorter: (a: any, b: any) => a?.case?.address?.full_address.localeCompare(b?.case.address?.full_address),
    sortOrder: sorting.dataIndex === "case.address.full_address" && sorting.order
  }, {
    header: "Open taak",
    dataIndex: "name",
    minWidth: 100,
    sorter: (a: any, b: any) => a?.name?.localeCompare(b?.name),
    sortOrder: sorting.dataIndex === "name" && sorting.order
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
