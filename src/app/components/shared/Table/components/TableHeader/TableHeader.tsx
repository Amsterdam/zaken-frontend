import StyledHeader from "./StyledHeader"
import Sorter from "./Sorter"
import { SortableColumn } from "../../Table"

type Props = {
  hasFixedColumn?: boolean
  columns: {
    header?: React.ReactNode
    minWidth?: number
    sorter?: (a: any, b: any) => number
  }[]
  onChangeSorting: (sorting?: any) => void
  sortedColumn?: SortableColumn
}

const TableHeader: React.FC<Props> = ({ columns, hasFixedColumn, onChangeSorting, sortedColumn }) => (
  <thead>
    <tr>
      { columns.map(({ header, minWidth, sorter }, index) =>
        <StyledHeader
          key={ index }
          minWidth={ minWidth }
          isFixed={ hasFixedColumn && index === columns.length - 1 }
        >
          { sorter ?
            <Sorter header={ header } direction={ sortedColumn?.direction } onChangeSorting={ onChangeSorting } index={ index } isSelected={ sortedColumn?.index === index } /> : (
              header ?? <>&nbsp;</>
            )
          }
        </StyledHeader>
      ) }
    </tr>
  </thead>
)

export default TableHeader
