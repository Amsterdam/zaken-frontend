import { useSummonsWithCaseId, useCaseTasks } from "app/state/rest"
import useValues from "../hooks/useValues"
import { DefinitionList } from "@amsterdam/wonen-ui"

type Props = {
  caseId: Components.Schemas.Case["id"]
  caseUserTaskId: Components.Schemas.CaseUserTask["case_user_task_id"]
}

const DecisionHeader: React.FC<Props> = ({ caseId, caseUserTaskId }) => {

  const [summons, { isBusy: isBusySummons }] = useSummonsWithCaseId(caseId)
  const [tasks, { isBusy: isBusyCaseTasks }] = useCaseTasks(caseId)
  console.log()
  const isBusy = isBusySummons || isBusyCaseTasks
  const task = tasks?.map(({ tasks }) => tasks).flat().find(({ case_user_task_id }) => case_user_task_id === caseUserTaskId)
  // TODO: The use of form_variables + hardcoded key `summon_id` is tight-coupling
  const summonId = task?.form_variables.summon_id?.value
  const summon = summons?.results?.find(({ id }) => id === summonId)
  const values = useValues(summon)

  return (
    <DefinitionList
      isLoading={ isBusy }
      numLoadingRows={ 2 }
      title="Besluit naar aanleiding van"
      headingSize="h4"
      data={ values }
      noValuesPlaceholder="Geen aanschrijving aanwezig"
    />
  )
}

export default DecisionHeader
