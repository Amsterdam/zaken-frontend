import { useMemo } from "react"
import { Spinner, ErrorMessage } from "@amsterdam/asc-ui"

import { useCaseTasks, useTaskComplete } from "app/state/rest"
import mapTaskData from "./utils/mapTaskData"
import StyledTable from "./components/StyledTable"

type Props = {
  id: Components.Schemas.Case["id"]
}

const columns = [
  { minWidth: 50 },
  { header: "Actuele taken", minWidth: 100 },
  { header: "Uitvoerder", minWidth: 100 },
  { header: "Slotdatum", minWidth: 100 },
  { header: "Verwerking taak", minWidth: 140 }
]

const Workflow: React.FC<Props> = ({ id }) => {

  const [data, { isBusy, hasErrors }] = useCaseTasks(id)
  const [, { execPost }] = useTaskComplete({ lazy: true })
  const mappedData = useMemo(() => data?.map(mapTaskData(id, execPost)), [data, id, execPost])

  const showSpinner = isBusy
  const hasData = mappedData !== undefined

  return (
    showSpinner ?
      <Spinner /> :
    hasData ?
      <StyledTable
        columns={ columns }
        data={ mappedData }
        noValuesPlaceholder={ <>Geen taken beschikbaar. <a href={ window.location.pathname }>Herlaad</a></> }
      /> :
    hasErrors ?
      <ErrorMessage message="Laden van taken mislukt" /> :
      null
  )
}

export default Workflow