import { useSummonsWithCaseId } from "app/state/rest/case"
import useValues from "../hooks/useValues"
import { DefinitionList } from "@amsterdam/wonen-ui"

type Props = {
  caseId: Components.Schemas.Case["id"]
  camundaTaskId: Components.Schemas.CamundaTask["camunda_task_id"]
}

const DecisionHeader: React.FC<Props> = ({ caseId, camundaTaskId }) => {

  const [summons, { isBusy }] = useSummonsWithCaseId(caseId)
  const values = useValues(summons?.results?.find(({ camunda_task_id }) => camunda_task_id === camundaTaskId))

  return (
    <DefinitionList
      title="Besluit naar aanleiding van"
      headingSize="h4"
      isLoading={ isBusy }
      numLoadingRows={ 2 }
      values={ values }
    />
  )
}
export default DecisionHeader
