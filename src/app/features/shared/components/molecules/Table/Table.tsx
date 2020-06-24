import React from "react"
import { themeColor } from "@datapunt/asc-ui"
import styled from "styled-components"

import TableCell from "./components/TableCell/TableCell"
import TableHeading from "./components/TableHeading/TableHeading"
import SmallSkeleton from "../../atoms/Skeleton/SmallSkeleton"

type CellContent = string | number| JSX.Element

type Props = {
  loading?: boolean
  fixedColumnWidth?: string
  columns: Array<CellContent>
  data?: Array<Array<CellContent>>
}

const Wrap = styled.div`
  position: relative;
`

const HorizontalScrollContainer = styled.div<Pick<Props, "fixedColumnWidth">>`  
  overflow-x: scroll; 
  margin-right: ${ (props) => props.fixedColumnWidth ?? "auto" }; 
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

const fixedWidth = (isLastColumn: boolean, fixedColumnWidth?: string) =>
  isLastColumn && fixedColumnWidth !== undefined
    ? fixedColumnWidth
    : undefined

const createLoadingData = (numColumns: number, numRows: number = 15) =>
  [...Array(numRows)].map(_ => [...Array(numColumns)].map(_ => 1))

const Table: React.FC<Props> = ({ columns, loading, fixedColumnWidth, ...restProps }) => {
  const data = loading
    ? createLoadingData(columns.length)
    : restProps.data

  return (
    <Wrap>
      <HorizontalScrollContainer fixedColumnWidth={ !loading ? fixedColumnWidth : undefined }>
        <StyledTable>
          <thead>
          <Row>
            { columns.map( (column, index) =>
              <TableHeading key={index} fixedWidth={fixedWidth(!loading && columns.length - 1 === index, fixedColumnWidth)}>
                { column }
              </TableHeading>
            ) }
          </Row>
          </thead>
          <tbody>
          { data?.map( (row, index) =>
            <Row key={index}>
              { row.map( (cell, index) =>
                <TableCell key={index} fixedWidth={fixedWidth(!loading && row.length - 1 === index, fixedColumnWidth)}>
                  { loading ? <SmallSkeleton /> : cell }
                </TableCell>
              ) }
            </Row>
          ) }
          </tbody>
        </StyledTable>
      </HorizontalScrollContainer>
    </Wrap>
  )
}


export default Table
