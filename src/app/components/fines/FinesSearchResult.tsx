import useValues from "./hooks/useValues"
import { DefinitionList } from "@amsterdam/wonen-ui"

type Props = {
  fine: Components.Schemas.Fine
}

const FinesSearchResult: React.FC<Props> = ({ fine }) => {

  const values = useValues(fine)

  return (
    <DefinitionList
      numLoadingRows={ 3 }
      values={ values }
    />
  )
}
export default FinesSearchResult
