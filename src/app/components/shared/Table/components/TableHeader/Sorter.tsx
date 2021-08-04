import styled from "styled-components"
import { Icon, themeSpacing, themeColor } from "@amsterdam/asc-ui"
import * as Assets from "app/components/shared/Icons"

type Props = {
  header?: React.ReactNode
  sorting?: any
  onChangeSorting: (sorting?: any) => void
  dataIndex?: string
}

type LabelProps = {
  shouldHover: boolean 
}

type IconProps = {
  visibility?: string 
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
  visibility: ${ props => props.visibility };
  color: ${ themeColor("tint", "level6") };
  // animation: rotate 10.3s ease 0s;
  // @-webkit-keyframes rotate {
  //   0% { -webkit-transform: rotate(0deg); }
  //   100% { -webkit-transform: rotate(360deg); }
  // }
  // @keyframes rotate {
  //   0% { transform: rotate(0deg); }
  //   100% { transform: rotate(360deg); }
  }                     
`

const Sorter: React.FC<Props> = ({ header, dataIndex, sorting, onChangeSorting }) => {
  const isSelected = sorting.columnKey === dataIndex
    // Only show arrow down icon when order is "descend" and sorting is already selected.
    const iconType = isSelected && sorting.order === "descend" ? "ArrowDownward" : "ArrowUpward" 
    const Asset = Assets[iconType] 

  const onSorterClick = () => {
    const newOrder = isSelected && sorting.order === "ascend" ? "descend" : "ascend"
    onChangeSorting({ columnKey: dataIndex, order: newOrder })
  }
  
  return (
    <StyledLabel shouldHover={!isSelected} onClick={ onSorterClick }>
      { header ?? <>&nbsp;</> }
      <StyledIcon visibility={ isSelected ? "visible" : "hidden"} ><Asset /></StyledIcon>
    </StyledLabel>
  )
}

export default Sorter