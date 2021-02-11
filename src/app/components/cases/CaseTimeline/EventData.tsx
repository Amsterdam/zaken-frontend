import React from "react"
import { Dl } from "./helpers/Helpers"

type Props = {
  values: Record<string, React.ReactNode>
  fields: string[]
  labelsMap: Record<string, string>
}

const EventData: React.FC<Props> = ({ values, fields, labelsMap }) => (
  <Dl>
    { fields.map(field => (
      <div key={ field }>
        <dt>{ labelsMap[field] ?? "-" }</dt>
        <dd>{ values[field] ?? "-" }</dd>
      </div>
    )) }
  </Dl>
)

export default EventData