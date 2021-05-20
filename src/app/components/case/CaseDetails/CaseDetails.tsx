import DefinitionList from "app/components/shared/DefinitionList/DefinitionList"
import { useCase } from "app/state/rest"
import useValues from "./hooks/useValues"

type Props = {
  caseId: Components.Schemas.Case["id"]
}

const CaseDetails: React.FC<Props> = ({ caseId }) => {

  const [data, { isBusy }] = useCase(caseId)
  const values = useValues(data)

  return (
    <DefinitionList
      isLoading={ isBusy }
      numLoadingRows={ 3 }
      values={ values }
    />
  )
}

export default CaseDetails
