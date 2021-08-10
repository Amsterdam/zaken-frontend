import { DefinitionList } from "@amsterdam/wonen-ui"
import useValues from "./hooks/useValues"

type Props = {
  fine: Components.Schemas.Fine
}

const FinesSearchResult: React.FC<Props> = ({ fine }) => {

  const values = useValues(fine)

  return (
    <DefinitionList
      numLoadingRows={ 3 }
      data={ values }
    />
  )
}
export default FinesSearchResult
