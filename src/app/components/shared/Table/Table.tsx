import { useState } from "react"
import { breakpoint, themeColor } from "@amsterdam/asc-ui"
import styled, { css } from "styled-components"
import { SmallSkeleton } from "@amsterdam/wonen-ui"

import TableCell from "./components/TableCell/TableCell"
import TableHeader from "./components/TableHeader/TableHeader"
import FixedTableCell, { widthMobile as fixedColumnWidthMobile } from "./components/TableCell/FixedTableCell"
import SortDirection from "./utils/SortDirection"
import { Sorter, invertedSorter } from "./utils/sorter"

type TableData = {
  onClick?: (event: React.MouseEvent) => void
  itemList: React.ReactNode[]
}[]

type Props = {
  numLoadingRows?: number
  loading?: boolean
  hasFixedColumn?: boolean
  columns: {
    header?: React.ReactNode
    minWidth?: number
    sorter?: Sorter
  }[]
  data?: TableData
  noValuesPlaceholder?: React.ReactNode
  showHeadWhenEmpty?: boolean
  className?: string
}

const Wrap = styled.div`
  position: relative;
`

type HorizontalScrollContainerProps = {
  fixedColumnWidth?: number
}

const HorizontalScrollContainer = styled.div<HorizontalScrollContainerProps>`
  overflow-x: auto;
  margin-right: ${ fixedColumnWidthMobile }px;
  @media screen and ${ breakpoint("min-width", "laptopM") } {
    margin-right: ${ ({ fixedColumnWidth }) => fixedColumnWidth ? `${ fixedColumnWidth }px` : "auto" };
  }
`

const StyledTable = styled.table`
  border-spacing: 0px;
  width: 100%;
`

type ClickableRowProps = {
  isClickable?: boolean
}

export type SortableColumn = {
  index: number
  direction: SortDirection
}

const Row = styled.tr<ClickableRowProps>`
  ${ ({ isClickable }) => isClickable && css`
    cursor: pointer;
    &:hover td {
      background-color: ${ themeColor("tint", "level2") };
    }
  `
  }

  td{
    border-bottom: 1px solid ${ themeColor("tint", "level3") };
  }
`

const NoValuesPlaceholder = styled(TableCell)`
  font-style: italic;
`

const createLoadingData = (numColumns: number, numRows: number = 5) =>
  [...Array(numRows)].map(_ => [...Array(numColumns)].map(_ => ""))

const Table: React.FC<Props> = ({
  columns,
  loading = false,
  numLoadingRows,
  hasFixedColumn,
  showHeadWhenEmpty = true,
  noValuesPlaceholder = "",
  className,
  data
}) => {

  const isEmpty = (data?.length ?? 0) === 0

  const fixedColumnWidth = hasFixedColumn
    ? columns[columns.length - 1].minWidth
    : undefined

  const [sortedColumn, setSortedColumn] = useState<SortableColumn>()

  const onChangeSorting = (column?: SortableColumn) => {
    if (loading) return
    if (isEmpty) return
    if (column === undefined) return
    setSortedColumn(column)
  }

  const index = sortedColumn?.index ?? 0
  const sorter = sortedColumn !== undefined ? columns[index].sorter : undefined
  const directedSorter = sorter !== undefined && sortedColumn?.direction === "DESCEND" ? invertedSorter(sorter) : sorter
  if (directedSorter !== undefined) data?.sort((a, b) => directedSorter(a.itemList[index], b.itemList[index]))

  return (
    <Wrap className={ className }>
      <HorizontalScrollContainer fixedColumnWidth={ fixedColumnWidth }>
        <StyledTable>
          { (showHeadWhenEmpty || !isEmpty) &&
            <TableHeader
              columns={ columns }
              hasFixedColumn={ hasFixedColumn }
              onChangeSorting={ onChangeSorting }
              sortedColumn={ sortedColumn }
            />
          }
          <tbody>
            { !loading && data?.map(({ onClick, itemList }, index) =>
              <Row key={ index } onClick={ onClick ?? (() => {}) } isClickable={ onClick !== undefined } >
                { itemList?.map((cell: React.ReactNode, index: number) =>
                    hasFixedColumn && index === (itemList?.length ?? 0) - 1
                      ? <FixedTableCell key={ index } width={ fixedColumnWidth }>{ cell ?? <>&nbsp;</> }</FixedTableCell>
                      : <TableCell key={ index }>
                          { loading ? <SmallSkeleton maxRandomWidth={ (columns[index].minWidth ?? 30) - 30 } /> : cell ?? <>&nbsp;</> }
                        </TableCell>
                ) }
              </Row>
            ) }
            { loading && createLoadingData(columns.length, numLoadingRows).map( (row, index) =>
              <Row key={index}>
                { row.map( (cell, index) => hasFixedColumn && index === row.length - 1
                    ? <FixedTableCell key={index} width={ fixedColumnWidth }>{ cell ?? <>&nbsp;</> }</FixedTableCell>
                    : <TableCell key={index}>{ loading ? <SmallSkeleton maxRandomWidth={ (columns[index].minWidth ?? 30) - 30} /> : cell ?? <>&nbsp;</> }</TableCell>
                ) }
              </Row>
            ) }
            { !loading && isEmpty && (
              <tr>
                <NoValuesPlaceholder colSpan={columns.length}>
                  { noValuesPlaceholder }
                </NoValuesPlaceholder>
              </tr>
            ) }
          </tbody>
        </StyledTable>
      </HorizontalScrollContainer>
    </Wrap>
  )
}

export default Table
