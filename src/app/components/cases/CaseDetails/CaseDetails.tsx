import React, { useMemo } from "react"

import DefinitionList from "app/components/shared/components/molecules/DefinitionList/DefinitionList"
import CaseIdDisplay from "../CaseIdDisplay/CaseIdDisplay"
import { useCase } from "app/state/rest"
import { displayDate } from "app/components/shared/components/atoms/DateDisplay/DateDisplay"

type Props = {
  caseId: Components.Schemas.Case["id"]
}

const mapData = (data: Components.Schemas.Case) => ({
  "Zaak Id": <CaseIdDisplay id={ data.identification } />,
  "Team": data.team.name,
  "Startdatum": data.start_date ? `${ displayDate(data.start_date) }` : "-"
})

const CaseDetails: React.FC<Props> = ({ caseId }) => {
  const { data } = useCase(caseId)
  const values = useMemo(() => data !== undefined ? mapData(data) : {}, [data])
  return <DefinitionList
    isLoading={ data === undefined }
    numInitialVisibleRows={ 3 }
    values={ values }
  />
}

export default CaseDetails
