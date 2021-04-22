import { useMemo } from "react"
import { CaseIdDisplay, displayDate } from "@amsterdam/wonen-ui"

import DefinitionList from "app/components/shared/DefinitionList/DefinitionList"
import { useCase } from "app/state/rest"

type Props = {
  caseId: Components.Schemas.Case["id"]
}

const mapData = (data: Components.Schemas.Case) => ({
  "Zaak ID": <CaseIdDisplay id={ data.id } />,
  "Team": data.team.name,
  "Startdatum": data.start_date ? `${ displayDate(data.start_date) }` : "-"
})

const CaseDetails: React.FC<Props> = ({ caseId }) => {
  const [data] = useCase(caseId)
  const values = useMemo(() => data !== undefined ? mapData(data) : {}, [data])

  return <DefinitionList
    isLoading={ data === undefined }
    numInitialVisibleRows={ 3 }
    numLoadingRows={3}
    values={ values }
  />
}

export default CaseDetails
