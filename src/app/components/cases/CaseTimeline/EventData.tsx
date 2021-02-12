import React from "react"
import { Dl, mapArrayToUl } from "./helpers/Helpers"
import { displayDate } from "app/components/shared/DateDisplay/DateDisplay"
import type { Field } from "./Events/fields"

type Props = {
  fields: Field[]
  values: Record<string, unknown>
  date?: string
}

const displayValue = (value: unknown, type: string) => {
  if (value == null) return "-"
  if (type === "string") return value as string
  if (type === "array") return mapArrayToUl(value)
  return <>{ value }</>
}

type ValueProps = { value: React.ReactNode, displayItalic?: boolean }
const Value: React.FC<ValueProps> = ({ value, displayItalic = false }) => displayItalic ? <i>{ value }</i> : <>{ value }</>

const EventData: React.FC<Props> = ({ fields, values, date }) => (
  <Dl>
    { date &&
      <div>
        <dt>Datum</dt>
        <dd>{ displayDate(date) }</dd>
      </div>
    }
    { fields.map(field => {
        const value = values[field.key]
        return (
          value !== undefined ?
          <div key={ field.key }>
            <dt>{ field.label ?? "-" }</dt>
            <dd><Value value={ displayValue(value, field.type) } displayItalic={ field.italic } /></dd>
          </div> :
          null
        )
    }) }
  </Dl>
)

export default EventData