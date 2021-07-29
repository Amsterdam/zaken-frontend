import { useSummonsWithCaseId, useCaseTasks } from "app/state/rest"
import useValues from "../hooks/useValues"
import { DefinitionList } from "@amsterdam/wonen-ui"

type Props = {
  caseId: Components.Schemas.Case["id"]
  camundaTaskId: Components.Schemas.CamundaTask["camunda_task_id"]
}

const DecisionHeader: React.FC<Props> = ({ caseId, camundaTaskId }) => {

  const [summons, { isBusy: isBusySummons }] = useSummonsWithCaseId(caseId)
  const [tasks, { isBusy: isBusyCaseTasks }] = useCaseTasks(caseId)
  const isBusy = isBusySummons || isBusyCaseTasks
  const task = tasks?.map(({ tasks }) => tasks).flat().find(({ camunda_task_id }) => camunda_task_id === camundaTaskId)
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
