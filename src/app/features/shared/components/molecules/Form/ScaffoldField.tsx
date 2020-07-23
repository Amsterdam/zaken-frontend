import React from "react"
import { ScaffoldAvailableFields, ScaffoldField as AmsterdamScaffoldField } from "amsterdam-react-final-form"

import CaseTypeField, { CaseTypeFieldProps } from "./CaseTypeField/CaseTypeField"

export type Field =
// NOTE: add your own custom types here:
  | { type: "CaseTypeField", props: CaseTypeFieldProps }
  | ScaffoldAvailableFields

type ScaffoldFieldProps = {
  field: Field
}

const ScaffoldField: React.FC<ScaffoldFieldProps> = ({ field }) => {
  switch (field.type) {
    case "CaseTypeField":
      return <CaseTypeField {...field.props} />
    default:
      return <AmsterdamScaffoldField field={field} />
  }
}

export default ScaffoldField
