import DueDate from "app/components/shared/DueDate/DueDate"
import TableAction from "app/components/shared/TableAction/TableAction"
import to from "app/routing/utils/to"
import SelectTask from "./SelectTask/SelectTask"

// If user is owner, move item to top.
const sortUserUp = (a: any, b: any, myId: string) => {
  if (a.owner === myId && b.owner === myId) {
    // If a and b both have the user id, sort by ascending due date.
    return new Date(a?.due_date).getTime() - new Date(b?.due_date).getTime()
  }
  if (a.owner === myId) {
    return -1
  }
  if (b.owner === myId) return 1
  return a?.owner?.localeCompare(b?.owner)
}

export default (myId?: string) => {
  const sortOwners = (a: any, b: any) => myId ? sortUserUp(a, b, myId) : a?.localeCompare(b)
  return [
    {
      header: "Opgepakt door",
      dataIndex: "owner",
      sorter: sortOwners,
      render: (owner: any, record: any) => <SelectTask id={ record.id } owner={ owner }/>
    }, {
      header: "Adres",
      dataIndex: "case.address.full_address",
      minWidth: 150,
      sorter: (a: any, b: any) => a?.case?.address?.full_address.localeCompare(b?.case.address?.full_address)
    }, {
      header: "Open taak",
      dataIndex: "name",
      minWidth: 100,
      sorter: (a: any, b: any) => a?.name?.localeCompare(b?.name)
    }, {
      header: "Slotdatum",
      dataIndex: "due_date",
      minWidth: 50,
      sorter: (a: any, b: any) => new Date(a?.due_date).getTime() - new Date(b?.due_date).getTime(),
      defaultSortOrder: "ASCEND" as const,
      render: (due_date: any) => <DueDate date={ due_date ?? undefined } emptyText="-" />
    }, {
      dataIndex: "case.id",
      minWidth: 140,
      render: (id: any) => <TableAction to={ to("/zaken/:id", { id }) }>Zaakdetails</TableAction>
    }
  ]
}
