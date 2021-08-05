import StyledHeader from "./StyledHeader"
import Sorter from "./Sorter"
import { useState } from "react"

type SortOrderEnum = "descend" | "ascend"

type Props = {
  hasFixedColumn?: boolean
  columns: { 
    header?: React.ReactNode 
    minWidth?: number 
    dataIndex?: string
    sorter?: boolean
    defaultSortOrder?: SortOrderEnum
  }[]
  onChangeTableSort: (sorting?: any) => void
}

const TableHeader: React.FC<Props> = ({ columns, hasFixedColumn, onChangeTableSort }) => {
  const [sorting, setSorting] = useState({ columnKey: undefined, order: "descend" })

  const onChangeSorting = (obj: any) => {
    setSorting(obj)
    onChangeTableSort(obj)
  }
 
  return (
    <thead>
      <tr>
        { columns.map(({ header, minWidth, sorter, ...restprops }, index) =>
          <StyledHeader 
            key={ index } 
            minWidth={ minWidth } 
            isFixed={ hasFixedColumn && index === columns.length - 1 }
          >
            { sorter ? 
              <Sorter header={ header } sorting={ sorting } onChangeSorting={ onChangeSorting } { ...restprops }/> : (
                header ?? <>&nbsp;</>
              )
            }
          </StyledHeader>
        ) }
      </tr>
    </thead>
  )
}

export default TableHeader
