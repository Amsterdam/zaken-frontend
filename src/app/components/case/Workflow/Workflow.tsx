import { Button, Heading } from "@amsterdam/asc-ui"
import {
  useCase,
  useCaseWorkflows,
  useCompleteTask,
  type CompleteTaskPayload,
} from "@/api/hooks"
import getColumns from "./columns"
import { LoadingRows, Table } from "@amsterdam/wonen-ui"
import styles from "./Workflow.module.css"

type Props = {
  id: components["schemas"]["CaseDetail"]["id"]
}

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
    return <LoadingRows numRows={2} />
  }

  const onClickLink = (e: React.MouseEvent) => {
    e.preventDefault()
    void refetch()
  }

  return (
    <>
      {workflows.length > 0 ? (
        workflows.map(({ state, tasks, information }, index) => {
          const columns = getColumns(completeTask, tasks, caseData?.theme.id)

          return (
            <div className={styles.wrap} key={`${state.name}_${index}`}>
              <div className={styles.content}>
                <Heading as="h4">{state.name}</Heading>
                {information && <p>{information}</p>}
              </div>
              <Table
                columns={columns}
                lastColumnFixed
                data={tasks || []}
                pagination={false}
              />
            </div>
          )
        })
      ) : (
        <>
          <>
            {isClosed
              ? "Deze zaak is afgesloten, er zijn op dit moment geen open taken."
              : "Geen taken beschikbaar."}{" "}
          </>
          <Button variant="textButton" onClick={onClickLink}>
            Herlaad taken.
          </Button>
        </>
      )}
    </>
  )
}

export default Workflow
