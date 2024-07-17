import { Heading, themeSpacing } from "@amsterdam/asc-ui"
import { useTaskComplete, useCaseWorkflows } from "app/state/rest"
import StyledTable from "./components/StyledTable"
import styled from "styled-components"
import getColumns from "./columns"
import { LoadingRows } from "@amsterdam/wonen-ui"

type Props = {
  id: Components.Schemas.CaseDetail["id"]
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
  const [, { execPost }] = useTaskComplete({ lazy: true })
  const [data, { isBusy }] = useCaseWorkflows(id)

  const workflows = data?.results ?? []
  const columns = getColumns(execPost)

  if (isBusy) {
    return <LoadingRows numRows={ 2 }/>
  }

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
                lastColumnFixed
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

export default Workflow
