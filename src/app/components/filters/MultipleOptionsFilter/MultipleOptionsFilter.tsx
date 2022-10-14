import { useMemo } from "react"
import { Checkbox, Label } from "@amsterdam/asc-ui"
import { FilterWrapper, StyledLabel  } from "../FilterStyle"

type Option = { id: number, name: string }

type Props = {
  label: string
  options?: Option[]
  selectedOptions: string[]
  setSelectedOptions: (value: string[]) => void
  byId?: boolean
}

const MultipleOptionsFilter: React.FC<Props> = ({ label, options, selectedOptions, setSelectedOptions, byId = false }) => {

  const sortedOptions = useMemo(() => (
    options?.sort((a, b) => a.name.localeCompare(b.name))
  ), [options])

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

  return (
    <FilterWrapper>
      <StyledLabel label={ label } />
      { sortedOptions?.map((option) => {
        const value = byId ? option.id.toString() : option.name
        return (
          <Label
            htmlFor={ option.name }
            label={ option.name }
            key={ option.name }
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
    </FilterWrapper>
  )
}

export default MultipleOptionsFilter
