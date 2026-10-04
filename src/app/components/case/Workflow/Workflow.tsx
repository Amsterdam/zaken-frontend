import {
  Button,
  Column,
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
 * The open tasks of a case in one table, each with the state of the case it
 * belongs to. A task can be
 * assigned, get another due date and be completed here.
 */
const Workflow: React.FC<Props> = ({ id }) => {
  const { mutateAsync } = useCompleteTask(id)
  const completeTask = (payload: CompleteTaskPayload) => mutateAsync(payload)
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

  // One row per task, with the state of the case it belongs to: one table,
  // so the columns line up and there are no heading rows in between.
  const rows = workflows.flatMap(({ state, tasks, information }) =>
    (tasks ?? []).map((task) => ({
      ...task,
      state: state.name,
      information: information || undefined,
    })),
  )

  return (
    <Table
      columns={getColumns(completeTask, rows, caseData?.theme.id)}
      data={rows}
      pagination={false}
      verticalAlign="middle"
    />
  )
}

export default Workflow
