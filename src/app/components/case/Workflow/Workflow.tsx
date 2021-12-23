import { Spinner, Heading, ErrorMessage, themeSpacing } from "@amsterdam/asc-ui"
import { useCaseTasks, useTaskComplete } from "app/state/rest"
import StyledTable from "./components/StyledTable"
import styled from "styled-components"
import getColumns from "./columns"

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

const Workflow: React.FC<Props> = ({ id }) => {
  const [data, { isBusy, hasErrors }] = useCaseTasks(id)
  const [, { execPost }] = useTaskComplete({ lazy: true })

  const columns = getColumns(execPost)

  if (isBusy) return <Spinner />
  const items = data?.results
  if (items !== undefined) {
    return (
      <>
        { items.length > 0 ? (
            items.map(({ state, tasks, information }, index) => (
              <Wrap key={ `${ state.status_name }_${ index }` }>
                <Div>
                  <Heading as="h4">{ state.status_name }</Heading>
                  { information && <p>{ information }</p> }
                </Div>
                <StyledTable
                  columns={ columns }
                  hasFixedColumn
                  data={ tasks || [] }
                  pagination={ false }
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