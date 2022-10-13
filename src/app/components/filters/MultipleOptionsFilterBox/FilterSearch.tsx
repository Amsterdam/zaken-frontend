import styled from "styled-components"
import { themeColor, themeSpacing } from "@amsterdam/asc-ui"

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onFocus?: () => void
  onBlur: () => void
}

const Input = styled.input.attrs({
  type: "search"
})`
  width: 100%;
  height: 100%;
  padding: 8px 12px;
  padding: ${ themeSpacing(2, 4) };
  outline: none;
  border: 1px solid ${ themeColor("tint", "level5") };
  background-color: #ffffff;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  &:hover {
    border: 1px solid ${ themeColor("tint", "level7") };
  }
  :focus {
    border: 1px solid ${ themeColor("tint", "level7") };
  }
  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
    cursor: pointer;
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-left: 10px;
    background:
      linear-gradient(45deg, rgba(0,0,0,0) 0%,rgba(0,0,0,0) 43%,#000 45%,#000 55%,rgba(0,0,0,0) 57%,rgba(0,0,0,0) 100%),
      linear-gradient(135deg, transparent 0%,transparent 43%,#000 45%,#000 55%,transparent 57%,transparent 100%);
  }
`

const FilterSearch: React.FC<Props> = ({ onChange, onFocus, onBlur }) => (
  <Input
    placeholder="Selecteer taak namen..."
    onChange={ onChange }
    onFocus={ onFocus }
    onBlur={ onBlur }
  />
)

export default FilterSearch
