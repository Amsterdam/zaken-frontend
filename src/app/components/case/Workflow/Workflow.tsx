import { Heading, themeSpacing } from "@amsterdam/asc-ui"
import { useTaskComplete } from "app/state/rest"
import StyledTable from "./components/StyledTable"
import styled from "styled-components"
import getColumns from "./columns"

type Props = {
  workflows: Components.Schemas.Case["workflows"]
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

const Workflow: React.FC<Props> = ({ workflows }) => {
  const [, { execPost }] = useTaskComplete({ lazy: true })

  const columns = getColumns(execPost)

  if (workflows !== undefined) {
    return (
      <>
        { workflows.length > 0 ? (
            workflows.map(({ state, tasks, information }, index) => (
              <Wrap key={ `${ state.name }_${ index }` }>
                <Div>
                  <Heading as="h4">{ state.name }</Heading>
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
  return null
}

export default Workflow