import { Column, Paragraph, Skeleton } from "@amsterdam/design-system-react"
import { useCaseWorkflowInstances } from "@/api/hooks"
import { Table } from "@/components/Table/Table"
import columns from "./columns"

type Props = {
  caseId: components["schemas"]["CaseDetail"]["id"]
}

/**
 * The workflows (processes) that were started on a case, each with a link to
 * its BPMN diagram. After zwd-frontend.
 */
const WorkflowInstances: React.FC<Props> = ({ caseId }) => {
  const { data, isLoading } = useCaseWorkflowInstances(caseId)

  if (isLoading) {
    return (
      <Skeleton>
        <Skeleton.Paragraph lines={2} />
        <Skeleton.Table rows={2} columns={5} />
      </Skeleton>
    )
  }

  return (
    <Column gap="small">
      <Paragraph>
        Dit overzicht toont alle processen die op deze zaak zijn gestart,
        inclusief afgeronde processen. Als een zaak wordt afgesloten, worden
        alle processen verwijderd.
      </Paragraph>
      <Table
        columns={columns}
        data={data}
        pagination={false}
        verticalAlign="middle"
        emptyPlaceholder="Geen processen beschikbaar."
      />
    </Column>
  )
}

export default WorkflowInstances
