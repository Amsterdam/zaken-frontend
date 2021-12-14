import styled from "styled-components"
import { DefinitionList } from "@amsterdam/wonen-ui"
import { useCase } from "app/state/rest"
import useValues from "./hooks/useValues"

type Props = {
  caseId: Components.Schemas.Case["id"]
  isClosed: boolean
}

const Div = styled.div`
  display: flex;
  width: 100%;
  > div {
    flex: 1;
  }
`

const CaseDetails: React.FC<Props> = ({ caseId, isClosed }) => {

  const [data, { isBusy }] = useCase(caseId)
  const values = useValues(isClosed, data)
  const filteredValues: any = (filterValues: string[]) => Object.keys(values)
    .filter(key => filterValues.includes(key))
    .reduce((obj: any, key: string) => {
      obj[key] = values[key]
      return obj
    }, {})

  return (
    <Div>
      <DefinitionList
        loading={ isBusy }
        numLoadingRows={ 2 }
        hasRowsSeperated={ false }
        data={ filteredValues([Object.keys(values)[0], Object.keys(values)[1], Object.keys(values)[2]]) }
      />
      <DefinitionList
        loading={ isBusy }
        numLoadingRows={ 2 }
        hasRowsSeperated={ false }
        data={ filteredValues([Object.keys(values)[3], Object.keys(values)[4]]) }
      />
    </Div>
  )
}

export default CaseDetails
