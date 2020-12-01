import React from "react"

import { themeColor } from "@datapunt/asc-ui"
import styled, { css } from "styled-components"

import SmallSkeleton from "app/features/shared/components/atoms/Skeleton/SmallSkeleton"

import TableCell from "./components/TableCell/TableCell"
import TableHeading from "./components/TableHeading/TableHeading"
import FixedTableCell from "./components/TableCell/FixedTableCell"
import { navigate } from "@reach/router"


type CellContent = React.ReactNode

type TableData = Array<{href?: string, itemList?: React.ReactNode[]}>

type Props = {
  numLoadingRows?: number
  loading?: boolean
  hasFixedColumn?: boolean
  columns: Array<{header?: CellContent, minWidth: number}>
  data?: TableData
  noValuesPlaceholder: React.ReactNode
  className?: string
}

const Wrap = styled.div`
  position: relative;
`

type HorizontalScrollContainerProps = {
  fixedColumnWidth?: number
}

type ClickableRowProps = {
  isClickable?: boolean
}

const HorizontalScrollContainer = styled.div<HorizontalScrollContainerProps>`  
  overflow-x: auto; 
  margin-right: ${ (props) => `${ props.fixedColumnWidth }px` ?? "auto" }; 
`

const StyledTable = styled.table`  
  border-spacing: 0px;
  width: 100%; 
`

const Row = styled.tr<ClickableRowProps>`
${ props  => props.isClickable && css`  
  cursor: ${ props.isClickable ? "pointer" : "cursor" }; 
  &:hover td {
    background-color: ${ themeColor("tint", "level3") };
  }
` }     

  td{
    border-bottom: 1px solid ${ themeColor("tint", "level3") };
  }
` 
  
const NoValuesPlaceholder = styled(TableCell)`
  font-style: italic; 
`

const createLoadingData = (numColumns: number, numRows: number = 5) =>
  [...Array(numRows)].map(_ => [...Array(numColumns)].map(_ => ""))

const Table: React.FC<Props> = ({ columns, loading, numLoadingRows, hasFixedColumn, noValuesPlaceholder, className, ...restProps }) => {
  const { data } = restProps

  const fixedColumnWidth = hasFixedColumn
    ? columns[columns.length - 1].minWidth
    : undefined

const onClick = (href: string | undefined, e: React.MouseEvent<HTMLTableRowElement>) => { 
  if (href) {
    e.stopPropagation()
    navigate(href)
  } 
}    

  return (
    <Wrap className={ className }>
      <HorizontalScrollContainer fixedColumnWidth={ fixedColumnWidth }>
        <StyledTable>
          <thead>
          <Row>
            { columns.map( (column, index) =>
              <TableHeading key={index} minWidth={column.minWidth} isFixed={ hasFixedColumn && index === columns.length - 1 }>
                { column.header ?? <>&nbsp;</> }
              </TableHeading>
            ) }
          </Row>
          </thead>
          <tbody>              
            { !loading && data?.map( (row: {href?: string, itemList?: React.ReactNode[]}, index: number) =>
              <Row key={index} onClick={(e) => onClick( row.href , e )} isClickable={row.href !== undefined } >
                { row.itemList?.map( (cell: CellContent, index: number) => hasFixedColumn && index === (row.itemList?.length ?? 0 ) - 1
                      ? <FixedTableCell key={index} width={ fixedColumnWidth }>{ cell ?? <>&nbsp;</> }</FixedTableCell>
                      : <TableCell key={index}>{ loading ? <SmallSkeleton maxRandomWidth={columns[index].minWidth - 30} /> : cell ?? <>&nbsp;</> }</TableCell>
                ) }
              </Row>
            ) }
            { loading && createLoadingData(columns.length, numLoadingRows).map( (row, index) =>
            <Row key={index}>
              { row.map( (cell, index) => hasFixedColumn && index === row.length - 1
                    ? <FixedTableCell key={index} width={ fixedColumnWidth }>{ cell ?? <>&nbsp;</> }</FixedTableCell>
                    : <TableCell key={index}>{ loading ? <SmallSkeleton maxRandomWidth={columns[index].minWidth - 30} /> : cell ?? <>&nbsp;</> }</TableCell>
              ) }
            </Row>
          ) }
            { (data === undefined || data.length === 0) && (
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
