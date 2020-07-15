import React from "react"
import { ComplexSelectField } from "amsterdam-react-final-form"

import { useCaseTypes } from "app/state/rest/config"

export type CaseTypeFieldProps = Omit<React.ComponentProps<typeof ComplexSelectField>, "validate" | "options">

/**
 * Requests caseType-data from the API, and use the response to create options.
 */
const CaseTypeField: React.FC<CaseTypeFieldProps> = (props) => {
  const { data } = useCaseTypes()
  return <ComplexSelectField<API.CaseType> {...props} options={data?.results ?? []} optionLabelField="name" withEmptyOption={true} />
}

export default CaseTypeField
