import { useState } from "react"
import { breakpoint, themeColor } from "@amsterdam/asc-ui"
import styled, { css } from "styled-components"
import { SmallSkeleton } from "@amsterdam/wonen-ui"

import TableCell from "./components/TableCell/TableCell"
import TableHeader from "./components/TableHeader/TableHeader"
import FixedTableCell, { widthMobile as fixedColumnWidthMobile } from "./components/TableCell/FixedTableCell"
import { Sorting } from "./components/TableHeader/Sorter"

export type Value = string | number | boolean | undefined | null | React.ReactNode

type Props<R> = {
  numLoadingRows?: number
  loading?: boolean
  hasFixedColumn?: boolean
  columns: {
    header?: React.ReactNode
    minWidth?: number
    sorter?: (a: Value, b: Value) => number
    render?: (value: Value) => React.ReactNode
  }[]
  data?: R[]
  noValuesPlaceholder?: React.ReactNode
  showHeadWhenEmpty?: boolean
  onClickRow?: (event: React.MouseEvent, index: number, data: R) => void
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

const Table = <R extends Value[]>(props: Props<R>) => {
  const {
    columns,
    loading = false,
    numLoadingRows = 5,
    hasFixedColumn,
    showHeadWhenEmpty = true,
    noValuesPlaceholder = "",
    onClickRow,
    className,
    data
  } = props

  const isEmpty = (data?.length ?? 0) === 0

  const fixedColumnWidth = hasFixedColumn
    ? columns[columns.length - 1].minWidth
    : undefined

  const [sorting, setSorting] = useState<Sorting>()

  const sorter = sorting ? columns[sorting.index].sorter : undefined
  const sortedDataAscend = sorter !== undefined ? data?.sort((a: Value[], b: Value[]) => sorter(a[sorting!.index], b[sorting!.index])) : data
  const sortedData = sorting?.order === "DESCEND" ? sortedDataAscend?.reverse() : sortedDataAscend

  return (
    <Wrap className={ className }>
      <HorizontalScrollContainer fixedColumnWidth={ fixedColumnWidth }>
        <StyledTable>
          { (showHeadWhenEmpty || !isEmpty) &&
            <TableHeader
              columns={ columns }
              hasFixedColumn={ hasFixedColumn }
              onChangeSorting={ setSorting }
              sorting={ sorting }
            />
          }
          <tbody>
            { !loading && sortedData?.map((rowData, index) => (
                <Row key={ index } onClick={ (event: React.MouseEvent) => onClickRow?.(event, index, rowData) } isClickable={ onClickRow !== undefined } >
                  { rowData.map((value: Value, index: number) => {
                      const render = columns[index]?.render
                      const node = (render ? render(value) : value) ?? <>&nbsp;</>

                      return hasFixedColumn && index === (rowData.length) - 1
                        ? <FixedTableCell key={ index } width={ fixedColumnWidth }>{ node }</FixedTableCell>
                        : <TableCell key={ index }>
                            { loading ? <SmallSkeleton maxRandomWidth={ (columns[index].minWidth ?? 30) - 30 } /> : node }
                          </TableCell>

                    }
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
