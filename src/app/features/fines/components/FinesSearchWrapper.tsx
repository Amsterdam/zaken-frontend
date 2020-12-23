import React, { useState } from "react"
import { SearchBar } from "@amsterdam/asc-ui"

import { Row, Column } from "app/features/shared/components/atoms/Grid"
import FinesSearchResultsList from "app/features/fines/components/FinesSearchResultsList"
import useURLState from "app/features/shared/hooks/useURLState/useURLState"


const FinesSearchWrapper: React.FC = () => {
  const [searchString, setSearchString] = useState("")
  const [searchQuery, setSearchQuery] = useURLState("query")
  const onSubmit = () => setSearchQuery(searchString)
  const onClear = () => setSearchString("")
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearchString(event.target.value.trim())

  return (
    <>
      <Row>
        <Column spanLarge={50}>
        <form onSubmit={e => {
          e.preventDefault()
          onSubmit()
        }}>
          <SearchBar
            placeholder="Vul invorderings-ID in"
            value={ searchString }
            onChange={ onChange }
            onClear={ onClear }
            autoFocus={ true }
          />
          </form>
        </Column>
      </Row>
      <Row>
        <Column spanLarge={50}>
          <FinesSearchResultsList searchString={ searchQuery } />
        </Column>
      </Row>
    </>
  )
}

export default FinesSearchWrapper
