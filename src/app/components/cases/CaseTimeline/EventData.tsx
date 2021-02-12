import React from "react"
import { Dl, mapArrayToUl } from "./helpers/Helpers"
import { displayDate } from "app/components/shared/DateDisplay/DateDisplay"

type Props = {
  values: Record<string, any>
  fields: string[]
  labelsMap: Record<string, string>
  showDate?: boolean
}

const italicFields = ["description", "feedback"]
const displayItalic = (field: string) => italicFields.includes(field)
const displayValue = (value: unknown) => {
  if (value === undefined || value === null) return "-"
  if (typeof value === "string") return value
  if (Array.isArray(value)) return mapArrayToUl(value)
  return value as React.ReactNode
}
const display = (field: string, value: any) => {
  const v = displayValue(value)
  return displayItalic(field) ? <i>{ v }</i> : v
}

const EventData: React.FC<Props> = ({ values, fields, labelsMap, showDate = false }) => (
  <Dl>
    { showDate && values.date_added &&
      <div>
        <dt>Datum</dt>
        <dd>{ displayDate(values.date_added) }</dd>
      </div>
    }
    { fields.map(field => (
      <div key={ field }>
        <dt>{ labelsMap[field] ?? "-" }</dt>
        <dd>{ displayValue(values[field]) }</dd>
      </div>
    )) }
  </Dl>
)

export default EventData