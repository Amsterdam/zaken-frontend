import {
  Button,
  Column,
  Heading,
  Paragraph,
  Skeleton,
} from "@amsterdam/design-system-react"
import {
  useCase,
  useCaseWorkflows,
  useCompleteTask,
  type CompleteTaskPayload,
} from "@/api/hooks"
import { Table } from "@/components/Table/Table"
import getColumns from "./columns"

type Props = {
  id: components["schemas"]["CaseDetail"]["id"]
}

/**
 * The open tasks of a case, a table per state of the case. A task can be
 * assigned, get another due date and be completed here.
 */
const Workflow: React.FC<Props> = ({ id }) => {
  const { mutateAsync } = useCompleteTask(id)
  // Errors are already shown as a flash message; undefined tells the modal it failed.
  const completeTask = (payload: CompleteTaskPayload) =>
    mutateAsync(payload).catch(() => undefined)
  const { data: caseData } = useCase(id)
  // Until the case is loaded, assume it's open: so it may poll and keeps showing it's loading.
  const isClosed = caseData !== undefined && caseData.end_date !== null
  const { data, isLoading, isPolling, refetch } = useCaseWorkflows(id, {
    pollWhileEmpty: !isClosed,
  })

  const workflows = data?.results ?? []

  if ((isLoading || isPolling) && workflows.length === 0) {
    return (
      <Skeleton>
        <Skeleton.Heading />
        <Skeleton.Table rows={2} columns={5} />
      </Skeleton>
    )
  }

  if (workflows.length === 0) {
    return (
      <Column gap="small" alignHorizontal="start">
        <Paragraph>
          {isClosed
            ? "Deze zaak is afgesloten, er zijn op dit moment geen open taken."
            : "Geen taken beschikbaar."}
        </Paragraph>
        <Button variant="secondary" onClick={() => void refetch()}>
          Herlaad taken
        </Button>
      </Column>
    )
  }

  return (
    <Column gap="x-large">
      {workflows.map(({ state, tasks, information }, index) => (
        <Column gap="small" key={`${state.name}_${index}`}>
          <Heading level={3}>{state.name}</Heading>
          {information && <Paragraph>{information}</Paragraph>}
          <Table
            columns={getColumns(completeTask, tasks, caseData?.theme.id)}
            data={tasks ?? []}
            pagination={false}
            verticalAlign="middle"
          />
        </Column>
      ))}
    </Column>
  )
}

export default Workflow
