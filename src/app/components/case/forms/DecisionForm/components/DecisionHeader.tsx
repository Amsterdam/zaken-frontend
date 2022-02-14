import { useSummonsWithCaseId, useCaseTasks } from "app/state/rest"
import useValues from "../hooks/useValues"
import { DefinitionList } from "@amsterdam/wonen-ui"

type Props = {
  caseId: Components.Schemas.Case["id"]
  caseUserTaskId: Components.Schemas.CaseUserTaskWorkdflow["case_user_task_id"]
}

const DecisionHeader: React.FC<Props> = ({ caseId, caseUserTaskId }) => {

  const [summons, { isBusy: isBusySummons }] = useSummonsWithCaseId(caseId)
  const [data, { isBusy: isBusyCaseTasks }] = useCaseTasks(caseId)
  const isBusy = isBusySummons || isBusyCaseTasks
  const tasks = data?.results
  const task = tasks?.map(({ tasks }) => tasks).flat().find(({ case_user_task_id }) => case_user_task_id === caseUserTaskId)
  // TODO: The use of form_variables + hardcoded key `summon_id` is tight-coupling
  const summonId = task?.form_variables.summon_id?.value
  const summon = summons?.results?.find(({ id }) => id === summonId)
  const values = useValues(summon)

  return (
    <DefinitionList
      loading={ isBusy }
      numLoadingRows={ 2 }
      title="Besluit naar aanleiding van"
      headingSize="h4"
      data={ values }
      emptyPlaceholder="Geen aanschrijving aanwezig"
    />
  )
}

export default DecisionHeader
