import React from "react"
import { Dl, mapArrayToUl } from "./helpers/Helpers"
import type { Field } from "./Events/fields"

type Props = {
  fields: Field[]
  values: Record<string, unknown>
}

const defaultMapValue = (value: unknown) => value
const displayValue = (value: unknown, mapValue = defaultMapValue) => {
  if (Array.isArray(value)) return mapArrayToUl(value.map(mapValue))
  return <>{ mapValue(value) }</>
}

type ValueProps = { value: React.ReactNode, displayItalic?: boolean }
const Value: React.FC<ValueProps> = ({ value, displayItalic = false }) => displayItalic ? <i>{ value }</i> : <>{ value }</>


const EventData: React.FC<Props> = ({ fields, values }) => (
  <Dl>
    { fields.map(field => {
        const value = values[field.key]
        return (
          value != null ?
          <div key={ field.key }>
            <dt>{ field.label ?? "-" }</dt>
            <dd><Value value={ displayValue(value, field.mapValue) } displayItalic={ field.italic } /></dd>
          </div> :
          null
        )
    }) }
  </Dl>
)

export default EventData