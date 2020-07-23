import React from "react"
import { ScaffoldAvailableFields, ScaffoldField as AmsterdamScaffoldField } from "amsterdam-react-final-form"

import CaseTypeField, { CaseTypeFieldProps } from "./CaseTypeField/CaseTypeField"
import AutoFillButton, { AutoFillButtonProps } from "./AutoFillButton/AutoFillButton"

export type Field =
// NOTE: add your own custom types here:
  | { type: "CaseTypeField", props: CaseTypeFieldProps }
  | { type: "AutoFillButton", props: AutoFillButtonProps }
  | ScaffoldAvailableFields

type ScaffoldFieldProps = {
  field: Field
}

const ScaffoldField: React.FC<ScaffoldFieldProps> = ({ field }) => {
  switch (field.type) {
    case "CaseTypeField":
      return <CaseTypeField {...field.props} />
    case "AutoFillButton":
      return <AutoFillButton {...field.props} />
    default:
      return <AmsterdamScaffoldField field={field} />
  }
}

export default ScaffoldField
