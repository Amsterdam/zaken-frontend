import React from "react"

type Props = {
  date: string
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

const DateDisplay: React.FC<Props> = ({ date }) => {
  const d = new Date(date)
  if (!isValidDate(d)) return <>{ invalidDateText }</>
  const str = `${ d.getDate() } ${ months[d.getMonth()] } ${ d.getFullYear() }`
  return <>{ str }</>
}

export default DateDisplay
