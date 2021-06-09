import to from "app/routing/utils/to"
import navigateTo from "app/routing/navigateTo"
import DueDate from "app/components/shared/DueDate/DueDate"
import TableAction from "app/components/shared/Table/components/TableAction/TableAction"

const onClick = (id: Components.Schemas.Case["id"]) => (event: React.MouseEvent) => {
  navigateTo("/zaken/:id", { id })
}

export default (tasks?: Components.Schemas.CamundaTaskList[]) =>

  tasks?.map((task: Components.Schemas.CamundaTaskList) => {

    const { name, due_date, case: { address: { full_address }, id } } = task
    const href = to("/zaken/:id", { id })

    return {
      href,
      onClick: onClick(id),
      itemList: [
        full_address ?? "-",
        name,
        due_date ? <DueDate date={ due_date } /> : "-",
        <TableAction to={ href }>Zaakdetails</TableAction>
      ]
    }
  })
