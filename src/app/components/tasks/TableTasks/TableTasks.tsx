import { useMemo } from "react"

import to from "app/routing/utils/to"
import Table from "app/components/shared/Table/Table"
import OpenButton from "app/components/shared/OpenButton/OpenButton"
import DueDate from "app/components/shared/DueDate/DueDate"
import navigateTo from "app/routing/navigateTo"

type Props = {
  data?: Components.Schemas.CamundaTaskList[]
  isBusy: boolean
}

const columns = [
  { header: "Adres", minWidth: 150 },
  { header: "Open taak", minWidth: 100 },
  { header: "Slotdatum", minWidth: 50 },
  { minWidth: 140 }
]

const onClick = (id: Components.Schemas.Case["id"]) => (e: React.MouseEvent) => {
  navigateTo("/zaken/:id", { id })
}

const mapData = (data: Components.Schemas.CamundaTaskList) => {

  const { name, due_date, case: { address: { full_address }, id } } = data

  return {
    href: to("/zaken/:id", { id }),
    onClick: onClick(id),
    itemList: [
      full_address ?? "-",
      name,
      due_date ? <DueDate date={ due_date } /> : "-",
      <OpenButton href={ to("/zaken/:id", { id }) } text="Zaakdetails" />
    ]
  }
}

const TableTasks: React.FC<Props> = ({ data, isBusy }) => {

  const mappedData = useMemo(() => data?.map(mapData), [data])

  return (
    <Table
      columns={ columns }
      data={ mappedData }
      loading={ isBusy }
      numLoadingRows={ 10 }
      hasFixedColumn={ true }
      noValuesPlaceholder="Er zijn momenteel geen open taken voor de gekozen filters"
    />
  )
}

export default TableTasks
