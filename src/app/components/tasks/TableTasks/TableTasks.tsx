import { useMemo } from "react"
import { DateDisplay } from "@amsterdam/wonen-ui"

import to from "app/routing/utils/to"
import Table from "app/components/shared/Table/Table"
import OpenButton from "app/components/shared/OpenButton/OpenButton"

type Props = {
  data?: Components.Schemas.CamundaTaskList[]
  isBusy: boolean
}

const columns = [
  { header: "Adres", minWidth: 300 },
  { header: "Open taak", minWidth: 300 },
  { header: "Slotdatum", minWidth: 100 },
  { minWidth: 140 }
]

const mapData = (data: Components.Schemas.CamundaTaskList) => {

  const { name, due_date, case: { address, id } } = data

  return {
    href: to("/zaken/:id", { id }),
    itemList: [
      address.full_address ?? "-",
      name,
      due_date !== undefined ? <DateDisplay date={ due_date } /> : "-",
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
      numLoadingRows={ 20 }
      hasFixedColumn={ true }
      noValuesPlaceholder="Er zijn geen taken"
    />
  )
}

export default TableTasks
