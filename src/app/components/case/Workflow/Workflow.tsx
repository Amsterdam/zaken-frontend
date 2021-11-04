import { Spinner, Heading, ErrorMessage, themeSpacing } from "@amsterdam/asc-ui"
import { useCaseTasks, useTaskComplete } from "app/state/rest"
import useMappedData from "./hooks/useMappedData"
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
  { header: "Slotdatum", minWidth: 120 },
  { header: "Verwerking taak", minWidth: 280 }
]

const Workflow: React.FC<Props> = ({ id }) => {

  const [data, { isBusy, hasErrors }] = useCaseTasks(id)
  const [, { execPost }] = useTaskComplete({ lazy: true })
  const mappedData = useMappedData(id, data, execPost)
  console.log("data", data)

  if (isBusy) return <Spinner />
  if (mappedData !== undefined) {
    return (
      <>
        { mappedData.length > 0 ? (
            mappedData.map(([title, information, tasks], index) => (
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
            ))
          ) : (
            <>Geen taken beschikbaar. <a href={ window.location.pathname }>Herlaad</a></>
          )
        }
      </>
    )
  }
  if (hasErrors) return <ErrorMessage message="Laden van taken mislukt" />
  return null
}

export default Workflow