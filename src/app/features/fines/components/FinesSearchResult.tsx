import React, { useMemo } from "react"
import DateDisplay from "app/features/shared/components/atoms/DateDisplay/DateDisplay"
import DefinitionList from "app/features/shared/components/molecules/DefinitionList/DefinitionList"

type Props = {
  data: Components.Schemas.Fine
}

const FinesSearchResult: React.FC<Props> = ( data ) => {
    const fine = data.data
  
const values = useMemo(() => ({
    "Kenmerk": fine.vorderingnummer,
    "Status": fine.invorderingstatus ,
    "Datum": fine.dagtekening ? <DateDisplay date={ fine.dagtekening } /> : "-"
  }),[fine])

const info = {
  infoTitle:"Invorderingsbesluit",
  infoText: "Uitleg invorderingsbesluit"
}

  return (
    <DefinitionList
    numInitialVisibleRows={3}
    title= { "Invorderingsbesluit" }
    extraInfo={ info }
    values={ values }
    headingSize="h3"
  />
  )
}
export default FinesSearchResult
