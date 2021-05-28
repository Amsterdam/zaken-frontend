import { useMemo } from "react"
import { Spinner, Heading, ErrorMessage, themeSpacing } from "@amsterdam/asc-ui"

import { useCaseTasks, useTaskComplete } from "app/state/rest"
import mapTaskData from "./utils/mapTaskData"
import StyledTable from "./components/StyledTable"
import styled from "styled-components"

type Props = {
  id: Components.Schemas.Case["id"]
}

const Div = styled.div`
  margin-bottom: ${ themeSpacing(6) };
`

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
  const mappedData = useMemo(
    () => data?.map(
      ({ state: { status_name, information }, tasks }) =>
        [status_name, information, tasks.map(mapTaskData(id, execPost))] as const
    ),
    [data, id, execPost]
  )

  return (
    isBusy ?
      <Spinner /> :
    mappedData !== undefined ?
      <>
      { mappedData.map(([title, information, tasks]) =>
        <>
          <Heading as="h4">{ title }</Heading>
          { information && <Div>{ information }</Div> }
          <StyledTable
            columns={ columns }
            data={ tasks }
            noValuesPlaceholder={
              <>Geen taken beschikbaar. <a href={ window.location.pathname }>Herlaad</a></>
            }
          />
        </>
      ) }
      </> :
    hasErrors ?
      <ErrorMessage message="Laden van taken mislukt" /> :
      null
  )
}

export default Workflow