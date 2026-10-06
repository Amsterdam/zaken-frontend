import { Column, Heading, Paragraph } from "@amsterdam/design-system-react"
import { useSummonsByCaseId } from "@/api/hooks"
import { formatPersons } from "@/components/CaseEventTimeline/utils/renderValue.formatters"
import { Description } from "@/components/Description/Description"

export type Workflow = {
  tasks: Tasks.WorkflowTask[]
}

type Props = {
  caseId: components["schemas"]["CaseDetail"]["id"]
  caseUserTaskId: string
  workflows: Workflow[]
}

/** The summon a decision follows from: which one, and who it was sent to. */
const DecisionHeader: React.FC<Props> = ({
  caseId,
  caseUserTaskId,
  workflows,
}) => {
  const { data: summons, isLoading } = useSummonsByCaseId(caseId)

  const task = workflows
    ?.flatMap(({ tasks }) => tasks)
    .find((task) => String(task.case_user_task_id) === caseUserTaskId)

  const summonId = task?.form_variables?.summon_id?.value
  const summon = summons?.results?.find(({ id }) => id === summonId)

  return (
    <Column gap="small">
      <Heading level={2}>Besluit naar aanleiding van</Heading>
      {isLoading || summon ? (
        <Description
          termsWidth="narrow"
          loading={isLoading}
          numLoadingRows={2}
          data={[
            { label: "Aanschrijving", value: summon?.type_name },
            {
              label: "Aangeschrevene(n)",
              value: formatPersons(summon?.persons) as string | undefined,
            },
          ]}
        />
      ) : (
        <Paragraph>Geen aanschrijving aanwezig</Paragraph>
      )}
    </Column>
  )
}

export default DecisionHeader
