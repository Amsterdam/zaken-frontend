import React from "react"
import { themeColor } from "@datapunt/asc-ui"
import styled from "styled-components"

import TableCell from "./components/TableCell/TableCell"
import TableHeading from "./components/TableHeading/TableHeading"
import SmallSkeleton from "../../atoms/Skeleton/SmallSkeleton"

type CellContent = string | number| JSX.Element

type Props = {
  fixedColumnWidth?: string
  columns: Array<CellContent>
  data: Array<Array<CellContent>>
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

const Table: React.FC<Props> = ({ columns, data, fixedColumnWidth }) => (
  <Wrap>
    <HorizontalScrollContainer fixedColumnWidth={ fixedColumnWidth }>
      <StyledTable>
        <thead>
          <Row>
            { columns.map( (column, index) =>
              <TableHeading key={index} fixedWidth={fixedWidth(columns.length - 1 === index, fixedColumnWidth)}>
                { column }
              </TableHeading>
            ) }
          </Row>
        </thead>
        <tbody>
          { data.map( row =>
            <Row>
              { row.map( (cell, index) =>
                <TableCell key={index} fixedWidth={fixedWidth(row.length - 1 === index, fixedColumnWidth)}>
                  { cell }
                </TableCell>
              ) }
            </Row>
          ) }
        </tbody>
      </StyledTable>
    </HorizontalScrollContainer>
  </Wrap>
)


export default Table
