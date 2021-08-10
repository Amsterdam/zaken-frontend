import { useState } from "react"
import { breakpoint, themeColor } from "@amsterdam/asc-ui"
import styled, { css } from "styled-components"
import { SmallSkeleton } from "@amsterdam/wonen-ui"

import TableCell from "./components/TableCell/TableCell"
import TableHeader from "./components/TableHeader/TableHeader"
import FixedTableCell, { widthMobile as fixedColumnWidthMobile } from "./components/TableCell/FixedTableCell"

type Props = {
  numLoadingRows?: number
  loading?: boolean
  hasFixedColumn?: boolean
  columns: {
    header?: React.ReactNode
    minWidth?: number
    sorter?: (a: any, b: any) => number
  }[]
  data?: React.ReactNode[][]
  noValuesPlaceholder?: React.ReactNode
  showHeadWhenEmpty?: boolean
  onClickRow?: (event: React.MouseEvent, index: number, data?: React.ReactNode[]) => void
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

const Row = styled.tr<ClickableRowProps>`
  ${ ({ isClickable }) => isClickable && css`
    cursor: pointer;
    &:hover td {
      background-color: ${ themeColor("tint", "level2") };
    }
  `
  }

  td {
    border-bottom: 1px solid ${ themeColor("tint", "level3") };
  }
`

const NoValuesPlaceholder = styled(TableCell)`
  font-style: italic;
`

const createLoadingData = (numColumns: number, numRows: number) =>
  [...Array(numRows)].map(_ => [...Array(numColumns)].map(_ => ""))

const Table: React.FC<Props> = ({
  columns,
  loading = false,
  numLoadingRows = 5,
  hasFixedColumn,
  showHeadWhenEmpty = true,
  noValuesPlaceholder = "",
  onClickRow,
  className,
  data
}) => {
  const [sorting, setSorting] = useState({ columnKey: undefined, order: "ASCEND" })

  const isEmpty = (data?.length ?? 0) === 0

  const fixedColumnWidth = hasFixedColumn
    ? columns[columns.length - 1].minWidth
    : undefined

  const onChangeSorting = (sortObj: any) => {
    if (loading) return
    if (isEmpty) return
    if (!sortObj) return
    setSorting(sortObj)
  }

  const sortedDataDescend = !isEmpty && sorting.columnKey !== undefined ? data?.sort(columns[sorting.columnKey ?? 0].sorter) : null
  const sortedData = sorting.order === "DESCEND" ? sortedDataDescend?.reverse() : sortedDataDescend
  const dataSource = sortedData ?? data

  return (
    <Wrap className={ className }>
      <HorizontalScrollContainer fixedColumnWidth={ fixedColumnWidth }>
        <StyledTable>
          { (showHeadWhenEmpty || !isEmpty) &&
            <TableHeader
              columns={ columns }
              hasFixedColumn={ hasFixedColumn }
              onChangeSorting={ onChangeSorting }
              sorting={ sorting }
            />
          }
          <tbody>
            { !loading && dataSource?.map((rowData, index) => (
                <Row key={ index } onClick={ (event: React.MouseEvent) => onClickRow?.(event, index, rowData) } isClickable={ onClickRow !== undefined } >
                  { rowData.map((cell: React.ReactNode, index: number) =>
                      hasFixedColumn && index === (rowData.length) - 1
                        ? <FixedTableCell key={ index } width={ fixedColumnWidth }>{ cell ?? <>&nbsp;</> }</FixedTableCell>
                        : <TableCell key={ index }>
                            { loading ? <SmallSkeleton maxRandomWidth={ (columns[index].minWidth ?? 30) - 30 } /> : cell ?? <>&nbsp;</> }
                          </TableCell>
                  ) }
                </Row>
              ))
            }
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
