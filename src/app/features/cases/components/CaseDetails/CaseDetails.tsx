import React, { useMemo } from "react"
import DefinitionList from "app/features/shared/components/molecules/DefinitionList/DefinitionList"
import { useCase } from "app/state/rest"
import { displayDate } from "app/features/shared/components/atoms/DateDisplay/DateDisplay"

type Props = {
  caseId: Components.Schemas.Case["id"]
}

const CaseDetails: React.FC<Props> = ({ caseId }) => {
  const { data } = useCase(caseId)
  const values = useMemo(() => ({
    // TODO-MOCKED use the right ID
    "Zaak-ID": data?.id,
    "Team": data?.team?.title,
    "Startdatum": data?.start_date ? `${ displayDate(data.start_date) }` : "-"
  }), [ data ])
  return <DefinitionList
    numInitialVisibleRows={3}
    values={values}
  />
}

export default CaseDetails
