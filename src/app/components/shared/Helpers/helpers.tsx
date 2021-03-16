import { themeSpacing } from "@amsterdam/asc-ui"
import React from "react"
import styled from "styled-components"
export const capitalizeString = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

export const appendTimeToDate = (date: string) => {
  if (date === "") return ""
  return `${ date }T12:00:00+0200`
}

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  li {
    padding: 0 0 ${ themeSpacing(1) } 0;
    line-height: 1.15;
  }
`
export const mapArrayToList = (list: any[]) =>
<Ul>
  { list.map((item: any, index: number) =>
      <li key={ index }>{ capitalizeString(item) }</li>
  )}
</Ul>
