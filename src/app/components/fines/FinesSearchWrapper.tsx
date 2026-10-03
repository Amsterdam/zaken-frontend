import { useState } from "react"
import { Column, SearchField } from "@amsterdam/design-system-react"
import FinesSearchResultsList from "@/app/components/fines/FinesSearchResultsList"
import useURLState from "@/app/hooks/useURLState/useURLState"

// The name in the URL is Dutch, like the paths and the overviews.
const SEARCH_PARAM = "zoekterm"

const FinesSearchWrapper: React.FC = () => {
  // The query is kept in the URL, so a result can be shared or reloaded.
  const [searchQuery, setSearchQuery] = useURLState(SEARCH_PARAM)
  const [inputValue, setInputValue] = useState(searchQuery)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSearchQuery(inputValue.trim())
  }

  return (
    <Column gap="large">
      <SearchField onSubmit={onSubmit} style={{ maxWidth: 600 }}>
        <SearchField.Input
          label="Kenmerk van de beschikking"
          placeholder="Vul kenmerk in, bijv. 12345_6_78"
          name={SEARCH_PARAM}
          value={inputValue}
          onChange={(event) => setInputValue(event.currentTarget.value)}
          autoFocus
        />
        <SearchField.Button />
      </SearchField>
      <FinesSearchResultsList searchString={searchQuery} />
    </Column>
  )
}

export default FinesSearchWrapper
