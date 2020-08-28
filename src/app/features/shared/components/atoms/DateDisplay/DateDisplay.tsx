import React from "react"

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

const DateDisplay: React.FC<Props> = ({ date, full = false }) => {
  const d = new Date(date)
  if (!isValidDate(d)) return <>{ invalidDateText }</>
  const str = full ?
    `${ d.getDate() } ${ months[d.getMonth()] } ${ d.getFullYear() }` :
    `${ d.getDate() }-${ d.getMonth() + 1 }-${ d.getFullYear() }`
  return <>{ str }</>
}

export default DateDisplay
