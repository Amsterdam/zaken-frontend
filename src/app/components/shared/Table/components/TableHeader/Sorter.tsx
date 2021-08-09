import styled from "styled-components"
import { Icon, themeSpacing, themeColor } from "@amsterdam/asc-ui"
import * as Assets from "app/components/shared/Icons"
import { SortableColumn } from "../../Table"
import SortDirection from "../../utils/SortDirection"

type Props = {
  header?: React.ReactNode
  direction?: SortDirection
  onChangeSorting: (sortableColumn: SortableColumn) => void
  index: number
  isSelected?: boolean
}

type LabelProps = {
  isSelected: boolean
  sortOrder: string
}

type IconProps = {
  isSelected: boolean
}

const StyledLabel = styled.div<LabelProps>`
  display: flex;
  cursor: pointer;
  ${ ({ isSelected }) => !isSelected
    ? `&:hover {
      opacity: 0.5;
    }
      &:hover span {
      visibility: visible;
    }`
    : ""
  }
  &:active span {
    ${ ({ isSelected, sortOrder }) => isSelected &&
      `animation: ${ sortOrder === "DESCEND" ? "rotate-back" : "rotate" } 0.3s ease 0s;`
    }
  }
  @-webkit-keyframes rotate {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(180deg); }
  }
  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(180deg); }
  }
  @-webkit-keyframes rotate-back {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(-180deg); }
  }
  @keyframes rotate-back {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(-180deg); }
  }
`

const StyledIcon = styled(Icon)<IconProps>`
  margin: -${ themeSpacing(0.5) } ${ themeSpacing(1) } 0 ${ themeSpacing(2) };
  visibility: ${ ({ isSelected }) => isSelected ? "visible" : "hidden" };
  color: ${ themeColor("tint", "level6") };
`

const Sorter: React.FC<Props> = ({ header, index, isSelected = false, direction = "ASCEND", onChangeSorting }) => {

  // Only show arrow down icon when order is "DESCEND" and sorting is already selected.
  const iconType = isSelected && direction === "DESCEND" ? "ArrowDownward" : "ArrowUpward"
  const Asset = Assets[iconType]

  const onClick = () => {
    const newDirection = direction === "ASCEND" ? "DESCEND" : "ASCEND"
    onChangeSorting({ index, direction: newDirection })
  }

  return (
    <StyledLabel isSelected={ isSelected } sortOrder={ direction } onClick={ onClick }>
      { header ?? <>&nbsp;</> }
      <StyledIcon isSelected={ isSelected }><Asset /></StyledIcon>
    </StyledLabel>
  )
}

export default Sorter
