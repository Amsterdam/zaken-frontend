import { Button, Heading, themeSpacing } from "@amsterdam/asc-ui"
import { useTaskComplete, useCaseWorkflows, useCase } from "app/state/rest"
import StyledTable from "./components/StyledTable"
import styled from "styled-components"
import getColumns from "./columns"
import { LoadingRows } from "@amsterdam/wonen-ui"
import usePollingRefetch from "app/state/rest/hooks/usePollingRefetch"

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
  const [data, { isBusy, execGet }] = useCaseWorkflows(id)
  const [caseData] = useCase(id)

  const workflows = data?.results ?? []
  const columns = getColumns(execPost)
  const isClosed = caseData?.end_date !== null

  const shouldPoll = !isClosed || workflows.length > 0
  const isPolling = usePollingRefetch(workflows, execGet, shouldPoll)

  if ((isBusy || isPolling) && workflows.length === 0) {
    return <LoadingRows numRows={2} />
  }

  const onClickLink = (e: React.MouseEvent) => {
    e.preventDefault()
    execGet()
  }

  return (
    <>
      {workflows.length > 0 ? (
        workflows.map(({ state, tasks, information }, index) => (
          <Wrap key={`${ state.name }_${ index }`}>
            <Div>
              <Heading as="h4">{state.name}</Heading>
              {information && <p>{information}</p>}
            </Div>
            <StyledTable
              columns={columns}
              lastColumnFixed
              data={tasks || []}
              pagination={false}
            />
          </Wrap>
        ))
      ) : (
        <>
          <>{isClosed ? "Deze zaak is afgesloten, er zijn op dit moment geen open taken." : "Geen taken beschikbaar."} </>
          <Button variant="textButton" onClick={onClickLink}>
            Herlaad taken.
          </Button>
        </>
      )}
    </>
  )
}

export default Workflow
