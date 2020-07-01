import React, { useMemo } from "react"
import { SelectField } from "amsterdam-react-final-form"

import { useGlobalState } from "app/state/state/globalState"

export type CaseStatusFieldProps = Omit<React.ComponentProps<typeof SelectField>, "options">

/**
 * Requests CaseStatus-data from the API, and use the response to create options.
 */
const CaseStatusField: React.FC<CaseStatusFieldProps> = (props) => {
  const { caseStatuses: { data } } = useGlobalState()

  const options = useMemo(
    () => data?.reduce((acc, caseStatus) => ({ ...acc, [caseStatus.url]: caseStatus.statustoelichting }), { "": "-" }),
    [ data ]
  )

  return <SelectField options={options ?? { "": "-" }} {...props} />
}

export default CaseStatusField
