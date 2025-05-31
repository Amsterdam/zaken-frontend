import { SearchBar } from "@amsterdam/asc-ui"
import debounce from "lodash.debounce"

type Props = {
  onChange: (value: string) => void
  searchString: string
}

const DELAY = 750

const SearchBarCases: React.FC<Props> = ({ onChange, searchString }) => {
  const debouncedSetSearchString = debounce(onChange, DELAY)

  const onChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    debouncedSetSearchString(event.target.value.trim())
  const onClear = () => debouncedSetSearchString("")

  return (
    <SearchBar
      placeholder="Zoek een zaak op postcode en huisnummer of straatnaam"
      value={searchString}
      onChange={onChangeSearch}
      onClear={onClear}
      autoFocus={true}
      style={{ maxWidth: "500px" }}
    />
  )
}

export default SearchBarCases
