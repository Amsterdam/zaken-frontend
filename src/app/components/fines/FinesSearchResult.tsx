import useValues from "./hooks/useValues"
import DefinitionList from "app/components/shared/DefinitionList/DefinitionList"

type Props = {
  fine: Components.Schemas.Fine
}

const FinesSearchResult: React.FC<Props> = ({ fine }) => {

  const values = useValues(fine)

  return (
    <DefinitionList
      numInitialVisibleRows={ 3 }
      values={ values }
    />
  )
}
export default FinesSearchResult
