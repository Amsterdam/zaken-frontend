import React from "react"
import { Dl, mapArrayToUl } from "./helpers/Helpers"
import type { Field } from "./Events/fields"

type Props = {
  fields: Field[]
  values: Record<string, unknown>
  isNested?: boolean
}

const defaultMapValue = (value: unknown) => value
const displayValue = (value: unknown, mapValue = defaultMapValue) => {
  if (Array.isArray(value)) return mapArrayToUl(value.map(mapValue))
  return <>{ mapValue(value) }</>
}

type ValueProps = { value: React.ReactNode, displayItalic?: boolean }
const Value: React.FC<ValueProps> = ({ value, displayItalic = false }) => displayItalic ? <i>{ value }</i> : <>{ value }</>

const EventData: React.FC<Props> = ({ fields, values, isNested = false }) => (
  <Dl>
    { fields.map(({ key, label, shouldShow, mapValue, italic }) => {
        const value = values[key]
        return (
          value != null && shouldShow(value, isNested) ?
          <div key={ key }>
            <dt>{ label ?? "-" }</dt>
            <dd><Value value={ displayValue(value, mapValue) } displayItalic={ italic } /></dd>
          </div> :
          null
        )
    }) }
  </Dl>
)

export default EventData