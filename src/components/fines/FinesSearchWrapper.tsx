import { useState } from "react"
import { useSearchParams } from "react-router"
import { Column, SearchField, Heading } from "@amsterdam/design-system-react"
import FinesSearchResultsList from "@/components/fines/FinesSearchResultsList"

// The name in the URL is Dutch, like the paths and the overviews.
const SEARCH_PARAM = "zoekterm"

const FinesSearchWrapper: React.FC = () => {
  // The query is kept in the URL, so a result can be shared or reloaded.
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get(SEARCH_PARAM) ?? ""
  const [inputValue, setInputValue] = useState(searchQuery)

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const query = inputValue.trim()
    setSearchParams(query ? { [SEARCH_PARAM]: query } : {}, { replace: true })
  }

  return (
    <Column>
      <Heading level={2}>Bekijk een invordering</Heading>
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
