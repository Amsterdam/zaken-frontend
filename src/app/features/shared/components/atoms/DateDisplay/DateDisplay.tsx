import React from "react"
import styled from "styled-components"

type Props = {
  date: string
  full?: boolean
}

const months = [
  "januari",
  "februari",
  "maart",
  "april",
  "mei",
  "juni",
  "juli",
  "augustus",
  "september",
  "oktober",
  "november",
  "december"
]

const isValidDate = (d: Date) => !Number.isNaN(d.getFullYear())
const invalidDateText = "Ongeldige datum"

const Span = styled.span`
  white-space: nowrap;
`

const DateDisplay: React.FC<Props> = ({ date, full = false }) => {
  const d = new Date(date)
  if (!isValidDate(d)) return <>{ invalidDateText }</>
  const str = full ?
    `${ d.getDate() } ${ months[d.getMonth()] } ${ d.getFullYear() }` :
    `${ d.getDate() }-${ d.getMonth() + 1 }-${ d.getFullYear() }`
  return <Span>{ str }</Span>
}

export default DateDisplay
