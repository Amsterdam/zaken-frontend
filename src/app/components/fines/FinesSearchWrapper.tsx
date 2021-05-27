import { useState } from "react"
import { SearchBar } from "@amsterdam/asc-ui"

import { Row, Column, RowWithColumn } from "app/components/layouts/Grid"
import FinesSearchResultsList from "app/components/fines/FinesSearchResultsList"
import useURLState from "app/hooks/useURLState/useURLState"


const FinesSearchWrapper: React.FC = () => {

  const [searchString, setSearchString] = useState("")
  const [searchQuery, setSearchQuery] = useURLState("query")
  const onSubmit = () => setSearchQuery(searchString)
  const onClear = () => setSearchString("")
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearchString(event.target.value.trim())

  return (
    <>
      <RowWithColumn>
        <span>Controleer met de invorderingscheck of de beschikking is opgepakt door belastingen.</span>
      </RowWithColumn>
      <Row>
        <Column spanLarge={50}>
        <form onSubmit={e => {
          e.preventDefault()
          onSubmit()
        }}>
          <SearchBar
            placeholder="Vul kenmerk in, bijv. 12345_6_78"
            value={ searchQuery }
            onChange={ onChange }
            onClear={ onClear }
            autoFocus={ true }
          />
          </form>
        </Column>
      </Row>
      <Row>
        <Column spanLarge={70}>
          <FinesSearchResultsList searchString={ searchQuery } />
        </Column>
      </Row>
    </>
  )
}

export default FinesSearchWrapper
