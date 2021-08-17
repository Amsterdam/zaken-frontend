import { DateDisplay } from "@amsterdam/wonen-ui"
import TableAction from "app/components/shared/Table/components/TableAction/TableAction"
import to from "app/routing/utils/to"

export default (tasks?: Components.Schemas.CamundaTaskList[]) =>
  tasks?.map((task: Components.Schemas.CamundaTaskList) => {
    const { name, due_date, case: { address: { full_address }, id } } = task
    return [
      full_address ?? "-",
      name,
      <DateDisplay date={ due_date ?? undefined } emptyText="-" />,
      <TableAction to={ to("/zaken/:id", { id }) }>Zaakdetails</TableAction>,
      id
    ]
  })
