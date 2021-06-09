import { useMemo } from "react"
import { Spinner, Heading, ErrorMessage, themeSpacing } from "@amsterdam/asc-ui"

import { useCaseTasks, useTaskComplete } from "app/state/rest"
import mapTaskData from "./utils/mapTaskData"
import StyledTable from "./components/StyledTable"
import styled from "styled-components"

type Props = {
  id: Components.Schemas.Case["id"]
}

const Wrap = styled.div`
  margin-bottom: ${ themeSpacing(12) };
  &:last-child {
    margin-bottom: 0;
  }
`

const Div = styled.div`
  margin-bottom: ${ themeSpacing(4) };
`

const columns = [
  { minWidth: 50 },
  { header: "Actuele taken", minWidth: 420 },
  { header: "Uitvoerder", minWidth: 240 },
  { header: "Slotdatum" },
  { header: "Verwerking taak", minWidth: 280 }
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
      { mappedData.length > 0 ?
        mappedData.map(([title, information, tasks], index) =>
          <Wrap key={ `${ title }_${ index }` }>
            <Div>
              <Heading as="h4">{ title }</Heading>
              { information && <p>{ information }</p> }
            </Div>
            <StyledTable
              columns={ columns }
              hasFixedColumn
              data={ tasks }
            />
          </Wrap>
        ) :
        <>Geen taken beschikbaar. <a href={ window.location.pathname }>Herlaad</a></>
      }
      </> :
    hasErrors ?
      <ErrorMessage message="Laden van taken mislukt" /> :
      null
  )
}

export default Workflow