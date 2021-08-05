import StyledHeader from "./StyledHeader"
import Sorter from "./Sorter"

type SortOrderEnum = "DESCEND" | "ASCEND"

type Props = {
  hasFixedColumn?: boolean
  columns: { 
    header?: React.ReactNode 
    minWidth?: number 
    sorter?: any
    defaultSortOrder?: SortOrderEnum
  }[]
  onChangeSorting: (sorting?: any) => void
  sorting: any
}

const TableHeader: React.FC<Props> = ({ columns, hasFixedColumn, onChangeSorting, sorting }) => (
  <thead>
    <tr>
      { columns.map(({ header, minWidth, sorter, ...restprops }, index) =>
        <StyledHeader 
          key={ index } 
          minWidth={ minWidth } 
          isFixed={ hasFixedColumn && index === columns.length - 1 }
        >
          { sorter ? 
            <Sorter header={ header } sorting={ sorting } onChangeSorting={ onChangeSorting } index={ index }  { ...restprops }/> : (
              header ?? <>&nbsp;</>
            )
          }
        </StyledHeader>
      ) }
    </tr>
  </thead>
)

export default TableHeader
