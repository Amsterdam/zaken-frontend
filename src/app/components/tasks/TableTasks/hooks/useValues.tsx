import DueDate from "app/components/shared/DueDate/DueDate"
import TableAction from "app/components/shared/TableAction/TableAction"
import to from "app/routing/utils/to"
import SelectTask from "../SelectTask/SelectTask"

export default (tasks?: Components.Schemas.CamundaTaskList[]) =>
  tasks?.map((task: Components.Schemas.CamundaTaskList) => {
    const { id, owner, name, due_date, case: { address: { full_address }, id: caseId } } = task

    return [
      {
        value: owner,
        node: <SelectTask id={ id } owner={ owner }/>
      },
      full_address ?? "-",
      name,
      {
        value: due_date,
        node: <DueDate date={ due_date ?? undefined } emptyText="-" />
      },
      <TableAction to={ to("/zaken/:id", { id: caseId }) }>Zaakdetails</TableAction>,
      id
    ]
  })
