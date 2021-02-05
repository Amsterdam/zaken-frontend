import React, { useMemo } from "react"
import DateDisplay from "app/components/shared/components/atoms/DateDisplay/DateDisplay"
import DefinitionList from "app/components/shared/components/molecules/DefinitionList/DefinitionList"

type Props = {
  data: Components.Schemas.Fine
}

const FinesSearchResult: React.FC<Props> = ( data ) => {
  const fine = data.data
  const values = useMemo(() => ({
    "Kenmerk": fine.identificatienummer,
    "Status": fine.invorderingstatus !== undefined ? "Opgepakt" : "Onbekend",
    "Datum": fine.dagtekening ? <DateDisplay date={ fine.dagtekening } /> : "-"
  }),[fine])

  return (
    <DefinitionList
    numInitialVisibleRows={3}
    values={ values }
    headingSize="h3"
  />
  )
}
export default FinesSearchResult
