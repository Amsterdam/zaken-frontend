import React from "react"
import { ComplexSelectField } from "amsterdam-react-final-form"

import { useCaseStates } from "app/state/rest/config"

export type CaseStatusFieldProps = Omit<React.ComponentProps<typeof ComplexSelectField>, "options" | "validate" | "optionLabelField" | "withEmptyOption">

/**
 * Requests CaseStatus-data from the API, and use the response to create options.
 */
const CaseStatusField: React.FC<CaseStatusFieldProps> = (props) => {
  const { data } = useCaseStates()

  return (
    <ComplexSelectField<API.State>
      options={data ?? []}
      optionLabelField="statustoelichting"
      withEmptyOption={true}
      {...props}
    />
  )
}

export default CaseStatusField
