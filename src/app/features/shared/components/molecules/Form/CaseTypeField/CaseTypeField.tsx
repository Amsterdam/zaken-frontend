import React from "react"
import { SelectField } from "amsterdam-react-final-form"

export type CaseTypeFieldProps = Omit<React.ComponentProps<typeof SelectField>, "options">

const options = { "foo": "foo", "bar": "bar" }

const CaseTypeField: React.FC<CaseTypeFieldProps> = (props) => <SelectField options={options} {...props} />

export default CaseTypeField
