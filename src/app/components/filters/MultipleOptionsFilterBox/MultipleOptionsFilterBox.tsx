import { useState } from "react"
import { Checkbox, Label } from "@amsterdam/asc-ui"
import FilterCard from "./FilterCard"
import FilterSearch from "./FilterSearch"
import { FilterWrapper, StyledLabel } from "../FilterStyle"

type Option = { id?: number, name: string }

type Props = {
  label: string
  options?: Option[]
  selectedOptions: string[]
  setSelectedOptions: (value: string[]) => void
  byId?: boolean
}

const MultipleOptionsFilterBox: React.FC<Props> = ({ label, options, selectedOptions, setSelectedOptions, byId = false }) => {
  const [isFocussed, setIsFocussed] = useState(false)
  const [searchedOptions, setSearchedOptions] = useState<Option[] | undefined>(undefined)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target
    let newSelectedOptions = [...selectedOptions]
    if (checked) {
      newSelectedOptions.push(value)
    } else {
      newSelectedOptions = selectedOptions.filter((selectedOption) => selectedOption !== value)
    }
    setSelectedOptions(newSelectedOptions)
  }

  const onBlurFilterSearch = () => {
    // onBlur is set before props are updated so use a timeout
    setTimeout(() => {
      setIsFocussed(false)
     }, 150)
  }

  const onChangeFilterSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchString = e.target.value
    if (searchString) {
      const result = options?.filter((s) => s.name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()))
      setSearchedOptions(result)
    } else {
      setSearchedOptions(undefined)
    }
  }

  const visibleOptions = searchedOptions ?? options
  return (
    <>
      <FilterWrapper>
        <StyledLabel label={ label } />
        <FilterSearch
          onChange={ onChangeFilterSearch }
          onFocus={ () => setIsFocussed(true) }
          onBlur={ onBlurFilterSearch }
        />
        <FilterCard
          isVisible={ isFocussed || selectedOptions.length > 0 }
          hasItems={ !!(visibleOptions && visibleOptions?.length > 0) }
        >
          { visibleOptions?.map((option) => {
            const value = byId && option?.id ? option?.id?.toString() : option.name
            return (
              <Label
                htmlFor={ option.name }
                label={ option.name }
                key={ option.name }
                style={{ width: "100%" }}
              >
                <Checkbox
                  id={ option.name }
                  data-testid={ option.name }
                  defaultValue={ value }
                  onChange={ onChange }
                  checked={ selectedOptions.includes(value) }
                />
              </Label>
            ) })
          }
        </FilterCard>
      </FilterWrapper>
    </>
  )
}

export default MultipleOptionsFilterBox
