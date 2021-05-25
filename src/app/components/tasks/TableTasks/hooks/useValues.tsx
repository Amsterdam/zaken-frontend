import to from "app/routing/utils/to"
import DueDate from "app/components/shared/DueDate/DueDate"
import OpenButton from "app/components/shared/OpenButton/OpenButton"

export default (tasks?: Components.Schemas.CamundaTaskList[]) =>

  tasks?.map((task: Components.Schemas.CamundaTaskList) => {

    const { name, due_date, case: { address: { full_address }, id } } = task

    return {
      href: to("/zaken/:id", { id }),
      itemList: [
        full_address ?? "-",
        name,
        due_date ? <DueDate date={ due_date } /> : "-",
        <OpenButton href={ to("/zaken/:id", { id }) } text="Zaakdetails" />
      ]
    }
  })
