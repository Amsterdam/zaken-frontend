import styled from "styled-components"
import { Icon, themeSpacing, themeColor } from "@amsterdam/asc-ui"
import * as Assets from "app/components/shared/Icons"

type SortingOrder = "ASCEND" | "DESCEND"
export type Sorting = {
  index: number
  order: SortingOrder
}

type Props = {
  header?: React.ReactNode
  sorting?: Sorting
  onChangeSorting: (sorting: Sorting) => void
  index: number
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

const Sorter: React.FC<Props> = ({ header, index, sorting, onChangeSorting }) => {
  const isSelected = sorting?.index === index
  // Only show arrow down icon when order is "DESCEND" and sorting is already selected.
  const iconType = isSelected && sorting?.order === "DESCEND" ? "ArrowDownward" : "ArrowUpward"
  const Asset = Assets[iconType]

  const onSorterClick = () => {
    const newOrder = isSelected && sorting?.order === "ASCEND" ? "DESCEND" : "ASCEND"
    onChangeSorting({ index: index, order: newOrder })
  }

  return (
    <StyledLabel isSelected={ isSelected } sortOrder={ sorting?.order ?? "ASCEND" } onClick={ onSorterClick }>
      { header ?? <>&nbsp;</> }
      <StyledIcon isSelected={ isSelected }><Asset /></StyledIcon>
    </StyledLabel>
  )
}

export default Sorter
