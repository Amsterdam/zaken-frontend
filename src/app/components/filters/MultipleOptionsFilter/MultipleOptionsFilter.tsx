import { useMemo } from "react"
import styled, { css } from "styled-components"
import { Checkbox, Label, themeSpacing } from "@amsterdam/asc-ui"

type Option = { id: number, name: string }

type Props = {
  label: string
  options?: Option[]
  selectedOptions: string[]
  setSelectedOptions: (value: string[]) => void
  byId?: boolean
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${ themeSpacing(5) };
`

const style = css`
  line-height: 18px;
  font-size: 18px;
  font-weight: 600;
  width: 100%;

  span {
    margin: ${ themeSpacing(2) } 0;
    align-items: center;
    display: flex;
  }
`

const StyledLabel = styled(Label)`
  ${ style }
`

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
    <StyledDiv>
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
    </StyledDiv>
  )
}

export default MultipleOptionsFilter
