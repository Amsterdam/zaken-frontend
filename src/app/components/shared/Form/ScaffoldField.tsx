import React from "react"
import { ScaffoldAvailableFields, ScaffoldField as AmsterdamScaffoldField } from "@amsterdam/amsterdam-react-final-form"

import AutoFillButton, { AutoFillButtonProps } from "./AutoFillButton/AutoFillButton"

export type Field =
// NOTE: add your own custom types here:
  | { type: "AutoFillButton", props: AutoFillButtonProps }
  | ScaffoldAvailableFields

type ScaffoldFieldProps = {
  field: Field
}

const ScaffoldField: React.FC<ScaffoldFieldProps> = ({ field }) => {
  switch (field.type) {
    case "AutoFillButton":
      return <AutoFillButton {...field.props} />
    default:
      return <AmsterdamScaffoldField field={field} />
  }
}

export default ScaffoldField
