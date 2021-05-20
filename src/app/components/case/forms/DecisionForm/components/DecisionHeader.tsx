
import { useSummonsWithCaseId } from "app/state/rest/case"
import useValues from "../hooks/useValues"
import DefinitionList from "app/components/shared/DefinitionList/DefinitionList"

type Props = {
  caseId: Components.Schemas.Case["id"]
}

const DecisionHeader: React.FC<Props> = ({ caseId }) => {

  const [summons, { isBusy }] = useSummonsWithCaseId(caseId)
  const values = useValues(summons?.results?.[0])

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
