import { useMemo, useState } from "react"
import { SearchField } from "@amsterdam/design-system-react"
import debounce from "lodash.debounce"
import { useFilterHandler } from "../CasesFilter/useFilterHandler"

type Props = {
  searchString: string
}

const DELAY = 750

const SearchBarCases: React.FC<Props> = ({ searchString }) => {
  const { onChangeFilter } = useFilterHandler()
  const [inputValue, setInputValue] = useState(searchString)

  const debouncedSearch = useMemo(
    () =>
      debounce(
        (value: string) => onChangeFilter("addressSearch", value.trim()),
        DELAY,
      ),
    [onChangeFilter],
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
    <SearchField
      onSubmit={onSubmit}
      // Takes the room next to the sort select.
      style={{ flex: "1 1 24rem", maxWidth: 600 }}
    >
      <SearchField.Input
        label="Zoek een zaak"
        placeholder="Zoek een zaak op postcode en huisnummer of straatnaam"
        name="addressSearch"
        value={inputValue}
        onChange={onChange}
        autoFocus
      />
      <SearchField.Button />
    </SearchField>
  )
}

export default SearchBarCases
