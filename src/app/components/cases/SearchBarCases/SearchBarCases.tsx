import { useEffect, useId, useMemo, useState } from "react"
import { Field, Label, SearchField } from "@amsterdam/design-system-react"
import filterStyles from "@/components/filters/filters.module.css"
import debounce from "lodash.debounce"
import { useFilterHandler } from "../CasesFilter/useFilterHandler"

type Props = {
  /** What the field starts with; after that it keeps what you type itself. */
  initialValue: string
}

const DELAY = 750

const SearchBarCases: React.FC<Props> = ({ initialValue }) => {
  const { onChangeFilter } = useFilterHandler()
  const [inputValue, setInputValue] = useState(initialValue)
  const id = useId()

  const debouncedSearch = useMemo(
    () =>
      debounce(
        (value: string) => onChangeFilter("addressSearch", value.trim()),
        DELAY,
      ),
    [onChangeFilter],
  )

  // A search that is still waiting must not come back after the field is gone
  // (e.g. after "Wis alle filters").
  useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch])

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
    <Field className={filterStyles.search}>
      <Label htmlFor={id}>Zoeken</Label>
      <SearchField onSubmit={onSubmit}>
        <SearchField.Input
          id={id}
          // Label describes the field for screen readers.
          label="Zoek op straat of postcode"
          placeholder="Zoek op straat of postcode"
          name="addressSearch"
          value={inputValue}
          onChange={onChange}
          autoFocus
        />
        <SearchField.Button />
      </SearchField>
    </Field>
  )
}

export default SearchBarCases
