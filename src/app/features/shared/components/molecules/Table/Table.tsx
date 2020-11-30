import React from "react"

import { themeColor } from "@datapunt/asc-ui"
import styled from "styled-components"

import SmallSkeleton from "app/features/shared/components/atoms/Skeleton/SmallSkeleton"

import TableCell from "./components/TableCell/TableCell"
import TableHeading from "./components/TableHeading/TableHeading"
import FixedTableCell from "./components/TableCell/FixedTableCell"

type CellContent = React.ReactNode

type Props = {
  numLoadingRows?: number
  loading?: boolean
  hasFixedColumn?: boolean
  columns: Array<{header?: CellContent, minWidth: number}>
  data?: Array<Array<CellContent>>
  noValuesPlaceholder: React.ReactNode
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
  margin-right: ${ (props) => `${ props.fixedColumnWidth }px` ?? "auto" }; 
`

const StyledTable = styled.table`  
  border-spacing: 0px;
  width: 100%; 
`

const Row = styled.tr`
  &:nth-child(odd) td {
    background-color: ${ themeColor("tint", "level1") };     
  }
  &:nth-child(even) td {
    background-color: ${ themeColor("tint", "level2") };     
  }
  &:hover td {
    background-color: ${ themeColor("tint", "level3") };
  }
`

const NoValuesPlaceholder = styled(TableCell)`
  font-style: italic; 
`

const createLoadingData = (numColumns: number, numRows: number = 5) =>
  [...Array(numRows)].map(_ => [...Array(numColumns)].map(_ => ""))

const Table: React.FC<Props> = ({ columns, loading, numLoadingRows, hasFixedColumn, noValuesPlaceholder, className, ...restProps }) => {
  const data = loading
    ? createLoadingData(columns.length, numLoadingRows)
    : restProps.data

  const fixedColumnWidth = hasFixedColumn
    ? columns[columns.length - 1].minWidth
    : undefined

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
          { data?.map( (row, index) =>
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
