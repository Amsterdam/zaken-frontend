import styled from "styled-components"
import { Icon, themeSpacing, themeColor } from "@amsterdam/asc-ui"
import * as Assets from "app/components/shared/Icons"

type Props = {
  header?: React.ReactNode
  sorting?: any
  onChangeSorting: (sorting?: any) => void
  index?: number
}

type LabelProps = {
  shouldHover: boolean 
}

type IconProps = {
  isSelected: boolean
  sortOrder: string
}

const StyledLabel = styled.div<LabelProps>`
  display: flex;
  cursor: pointer;
  ${ ({ shouldHover }) => shouldHover 
    ? `&:hover {
      opacity: 0.5;
    }
      &:hover span { 
      visibility: visible;
    }` 
    : ""
  }
`

const StyledIcon = styled(Icon)<IconProps>`
  margin: -${ themeSpacing(0.5) } ${ themeSpacing(1) } 0 ${ themeSpacing(2) };
  visibility: ${ ({ isSelected }) => isSelected ? "visible" : "hidden" };
  color: ${ themeColor("tint", "level6") };
  &:active {
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

const Sorter: React.FC<Props> = ({ header, index, sorting, onChangeSorting }) => {
  const isSelected = sorting.columnKey === index
  // Only show arrow down icon when order is "DESCEND" and sorting is already selected.
  const iconType = isSelected && sorting.order === "DESCEND" ? "ArrowDownward" : "ArrowUpward" 
  const Asset = Assets[iconType] 

  const onSorterClick = () => {
    const newOrder = isSelected && sorting.order === "ASCEND" ? "DESCEND" : "ASCEND"
    onChangeSorting({ columnKey: index, order: newOrder })
  }
  
  return (
    <StyledLabel shouldHover={!isSelected} onClick={ onSorterClick }>
      { header ?? <>&nbsp;</> }
      <StyledIcon isSelected={ isSelected } sortOrder={ sorting.order }><Asset /></StyledIcon>
    </StyledLabel>
  )
}

export default Sorter
