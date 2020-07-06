import React, { useMemo } from "react"
import { SelectField } from "amsterdam-react-final-form"

import { useCaseTypes } from "app/state/rest/config"

export type CaseTypeFieldProps = Omit<React.ComponentProps<typeof SelectField>, "options">

/**
 * Requests caseType-data from the API, and use the response to create options.
 */
const CaseTypeField: React.FC<CaseTypeFieldProps> = (props) => {
  const { data } = useCaseTypes()

  const options = useMemo(
    () => data?.reduce((acc, caseType) => ({ ...acc, [caseType.url]: caseType.omschrijving }), { "": "-" }),
    [ data ]
  )

  return <SelectField options={options ?? { "": "-" }} {...props} />
}

export default CaseTypeField
