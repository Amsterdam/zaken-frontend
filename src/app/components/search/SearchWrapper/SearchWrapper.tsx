import { useMemo, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { Column, Heading, SearchField } from "@amsterdam/design-system-react"
import debounce from "lodash.debounce"
import SearchResults from "@/app/components/search/SearchResults/SearchResults"

const DELAY = 750

const SearchWrapper: React.FC = () => {
  // The query is kept in the URL, so you return to the same results.
  const [searchParams, setSearchParams] = useSearchParams()
  const searchString = searchParams.get("query") ?? ""
  const [inputValue, setInputValue] = useState(searchString)

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        const query = value.trim()
        setSearchParams(query ? { query } : {}, { replace: true })
      }, DELAY),
    [setSearchParams],
  )

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value
    setInputValue(value)
    debouncedSearch(value)
  }

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    debouncedSearch(inputValue)
    debouncedSearch.flush()
  }

  return (
    <Column>
      <Heading level={2}>Bekijk een adres</Heading>
      <SearchField onSubmit={onSubmit} style={{ maxWidth: 600 }}>
        <SearchField.Input
          label="Adres"
          placeholder="Zoek een adres op basis van postcode en huisnummer of straatnaam."
          name="query"
          value={inputValue}
          onChange={onChange}
          autoFocus
        />
        <SearchField.Button />
      </SearchField>
      <SearchResults searchString={searchString} />
    </Column>
  )
}

export default SearchWrapper
