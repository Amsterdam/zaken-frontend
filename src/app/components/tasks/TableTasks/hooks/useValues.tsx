import DueDate from "app/components/shared/DueDate/DueDate"
import TableAction from "app/components/shared/TableAction/TableAction"
import to from "app/routing/utils/to"

export default (tasks?: Components.Schemas.CamundaTaskList[]) =>
  tasks?.map((task: Components.Schemas.CamundaTaskList) => {
    const { name, due_date, case: { address: { full_address }, id } } = task
    return [
      full_address ?? "-",
      name,
      {
        value: due_date,
        node: <DueDate date={ due_date ?? undefined } emptyText="-" />
      },
      <TableAction to={ to("/zaken/:id", { id }) }>Zaakdetails</TableAction>,
      id
    ]
  })
