import React, { useMemo } from "react"
import { DateDisplay } from "@amsterdam/wonen-ui"

import PersonDisplay from "app/components/shared/PersonDisplay/PersonDisplay"
import DefinitionList from "app/components/shared/DefinitionList/DefinitionList"

type Props = {
  resident: Components.Schemas.Resident
  num: number
}

const Resident: React.FC<Props> = ({ resident, num }) => {
  const title = <>{ `${ num }. ` } <PersonDisplay sex={ resident.geslachtsaanduiding } firstName={ `${ resident.voorletters }.` } namePrefix={ resident.voorvoegsel_geslachtsnaam } name={ resident.geslachtsnaam } /></>
  const values = useMemo(() => ({
    "Geboren": <DateDisplay date={ resident.geboortedatum } />,
    "Ingeschreven sinds": <DateDisplay date={ resident.datum_begin_relatie_verblijfadres } />
  }), [resident.geboortedatum, resident.datum_begin_relatie_verblijfadres])

  return <DefinitionList
    numInitialVisibleRows={4}
    title={ title }
    headingSize="h3"
    values={ values }
  />
}
export default Resident
